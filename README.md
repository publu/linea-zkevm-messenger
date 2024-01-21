# Linea zkEVM Messenger L1->L2 Example

> Send a message from Ethereum Goerli testnet to Linea zkEVM testnet.

## Example

There's two contracts; `L2Contract.sol` and `L1Contract.sol`

The L1 contract has a method `sendMessageToL2` that sends a message from Ethereum Goerli to L2 contract to set a greeting message on L2 contract.
It sends the encoded calldata to execute `setGreeting` on L2 which can only be called if the message was sent by the L1 contract.

### Files

- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`deployL2.js`](./script/deployL2.js)
- [`deployL1.js`](./scripts/deployL1.js)
- [`sendL1ToL2Message.js`](./scripts/sendL1ToL2Message.js)
- [`waitForInclusion.js`](./scripts/waitForInclusion.js)
- [`finalizeMessageOnL2.js`](./scripts/finalizeMessageOnL2.js)
- [`getGreetingOnL2.js`](./scripts/getGreetingOnL2.js)

## Install

```sh
git clone https://github.com/publu/linea-zkevm-messenger.git
cd linea-zkevm-messenger
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both Ethereum Goerli and Linea zkEVM testnet. You're welcome to try using the contract I deployed. Anyone can push/claim a message greeting.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L1 Contract

Command

```sh
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
L1Contract deployed to: 0x50768B7Ecf5513205c513403a1127aA346F8C854
```

### Deploy L2 Contract

Command
update the deployL2.js l1ContractAddress variable and then:

```sh
npx hardhat run --network lineazkevm scripts/deployL2.js
```

Output

```sh
L2Contract deployed to: 0x5E6BCf6c94da804d08511cbE928594d7d985ddE2
```

### Send L1->L2 Message

Command replace variables in `sendL2ToL2Message.js` with your contract

```sh
npx hardhat run --network goerli scripts/sendL1ToL2Message.js
```

### Wait for L2 Root Inclusion

You'll need to replace `l1TxHash` with your tx messageHash. Its in the event log. See here https://goerli.etherscan.io/tx/0xf5b4d145d87ca7390346b19a670efc0de6ee0ae4000f7243ec6d57052e3fae9f#eventlog

It says 3:_messageHash and make sure you switch it to HEX view so its easier to copy

ex: '0xf3fc26266e40f948424be972610fcfeed3f6fddcf27c15362a9a124aec8d7eb0'
Command

```sh
npx hardhat run --network linea_gorli scripts/waitForInclusion.js
```

### Finalize Message On L2


Update the variables used in sending the message. If you see it in the previous etherscan link, it says _from, _to, _messageHash, as well as the rest of the values. Update those to be able to claim the correct message.

Command

```sh
npx hardhat run --network linea_gorli scripts/finalizeMessageOnL2.js
```

### Get Greeting on L2

Command

update the L2 Contract if you deployed your own. then run using: 

```sh
npx hardhat run --network linea_gorli scripts/getGreetingOnL2.js
```

## License

Use it at ur own risk. I'm not a qualified financial profressional. pls check over your code before using real money.
