# MultiCall Example

This is a minimal reproduction of a MultiCall call that simulates both view call
functionality and simulated transaction functionality. The example works
out of the box with the ShimmerEVM Testnet, just run `node example.js` after a
`npm install` to see it work. If you wish to deploy these contracts yourself 
they are provided in the `contracts/` folder.

## Expected outcome of this PoC

### Calls done to MultiCall:

```
[
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0xa87d942c"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0x5b34b966"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    gasLimit: 500000,
    callData: "0xa87d942c"
  }
]
```

### Results from Multicall:

```
[
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0xa87d942c",
    gasUsed: "985",
    success: true,
    result: "0x0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "20979",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "3880",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "3880",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "3880",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "3880",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0x5b34b966",
    gasUsed: "3880",
    success: true,
    result: "0x"
  },
  {
    target: "0x3Ba7B9Ed5dbF0509c6DfbD8d4015D826AdB305d0",
    callData: "0xa87d942c",
    gasUsed: "985",
    success: true,
    result: "0x0000000000000000000000000000000000000000000000000000000000000006"
  }
]
```
