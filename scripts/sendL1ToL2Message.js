// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
require('dotenv').config()

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile')

  // We get the contract to deploy
  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l2ContractAddress = "0x5E6BCf6c94da804d08511cbE928594d7d985ddE2"
  const l1ContractAddress = "0x50768B7Ecf5513205c513403a1127aA346F8C854"
  const greeting = "Let your baldness shine."
  const l1Contract = L1Contract.attach(l1ContractAddress)

  await l1Contract.deployed()

  const l2ContractAbi = require('../artifacts/contracts/L2Contract.sol/L2Contract.json').abi
  const iface = new hre.ethers.utils.Interface(l2ContractAbi)
  const calldata = iface.encodeFunctionData('setGreeting', [greeting])
  const to = l2ContractAddress
  const tx = await l1Contract.sendMessageToL2(to, 0, calldata)
  console.log(`sent tx hash ${tx.hash}`)
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
