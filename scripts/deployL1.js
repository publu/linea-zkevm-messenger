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

  const l1BridgeAddress = '0x70BaD09280FD342D02fe64119779BC1f0791BAC2'

  // We get the contract to deploy
  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l1Contract = await L1Contract.deploy(l1BridgeAddress)

  await l1Contract.deployed()

  console.log('L1Contract deployed to:', l1Contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
