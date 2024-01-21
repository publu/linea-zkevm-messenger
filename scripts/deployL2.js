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
  const L2Contract = await hre.ethers.getContractFactory('L2Contract')
  const l1ContractAddress = "0x50768B7Ecf5513205c513403a1127aA346F8C854"
  const l2BridgeAddress = '0xC499a572640B64eA1C8c194c43Bc3E19940719dC'
  const l2Contract = await L2Contract.deploy(l1ContractAddress, l2BridgeAddress)
  await l2Contract.deployed()

  console.log('L2Contract deployed to:', l2Contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
