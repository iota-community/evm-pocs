const { ethers } = require('ethers');

// Multicallv2 address, current one exists on the ShimmerEVM Testnet
const multicallAddress = '0x32f20190540CCc55E137928c11d70d24daf52995';

// Simple counter contract deployed on ShimmerEVM Testnet
const testCounterAddress = '0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0';

const multicallABI = [ 
    {   
        inputs: [
            {
                components: [
                    { internalType: 'address', name: 'target', type: 'address' },
                    { internalType: 'uint256', name: 'gasLimit', type: 'uint256' },
                    { internalType: 'bytes', name: 'callData', type: 'bytes' }
                ],
                internalType: 'struct TangleswapInterfaceMulticall.Call[]',
                name: 'calls',
                type: 'tuple[]'
            }
        ],
        name: 'multicall',
        outputs: [
            { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
            {
                components: [
                    { internalType: 'bool', name: 'success', type: 'bool' },
                    { internalType: 'uint256', name: 'gasUsed', type: 'uint256' },
                    { internalType: 'bytes', name: 'returnData', type: 'bytes' }
                ],
                internalType: 'struct TangleswapInterfaceMulticall.Result[]',
                name: 'returnData',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }   
];

// Create a provider instance for the JSON-RPC endpoint
const provider = new ethers.providers.JsonRpcProvider('https://json-rpc.evm.testnet.shimmer.network/');

// Create an instance of the multicall contract
const multicallContract = new ethers.Contract(multicallAddress, multicallABI, provider);


// Simple function to generate the function signature needed for calling multicall
function getFunctionSignature(name) {
  return ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(name)
  ).slice(0, 10);
}

const fsig = getFunctionSignature('incrementCounter()');
const gsig = getFunctionSignature('getCount()');

// Define the calls to be made
let calls = Array(6).fill().map(() => ({
    target: testCounterAddress,
    gasLimit: 500000,
    callData: fsig // function signature of 'incrementCounter()'
}));

// Add a getCount at the start of the multicall
calls.unshift({
    target: testCounterAddress,
    gasLimit: 500000,
    callData: gsig // function signature of 'getCount()'
});

// Add a getCount at the end of the multicall
calls.push({
    target: testCounterAddress,
    gasLimit: 500000,
    callData: gsig // function signature of 'getCount()'
});

console.log('Calls sent to MultiCall:', calls);

// Convenience function to format the return data of MultiCall
async function makeMulticall(multicallContract, calls, callback) {
  const result = await multicallContract.callStatic.multicall(calls);
  const returnData = result.returnData;

  const parsedData = returnData.map((result, i) => {
    const call = calls[i];
    const target = call.target;
    const callData = call.callData;


    return {
      target,
      callData,
      gasUsed: result.gasUsed.toString(),
      success: result.success,
      result: result.returnData
    };
  });

  callback(parsedData);
}

// Calling the multicall convenience function wtih a simple debug callback
makeMulticall(multicallContract, calls, function(data) { console.log(data) });
