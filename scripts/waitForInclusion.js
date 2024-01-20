const hre = require('hardhat')
require('dotenv').config()

async function main() {
  const l1TxHash = "0x4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184c657420796f75722062616c646e657373207368696e652e000000000000000000000000000000000000000000000000000000000000000000000000"
  const l2BridgeAddress = '0xC499a572640B64eA1C8c194c43Bc3E19940719dC'
  
  // Simpler ABI just for checking the inbox message status
  const bridgeAbi = [
    "function inboxL1L2MessageStatus(bytes32 messageHash) view returns (uint8)"
  ];
  
  const signer = await hre.ethers.getSigner()
  const bridgeContract = new hre.ethers.Contract(l2BridgeAddress, bridgeAbi, signer)

  const messageHash = hre.ethers.utils.solidityKeccak256(['bytes32'], [l1TxHash])

  const checkInclusion = async () => {
    const status = await bridgeContract.inboxL1L2MessageStatus(messageHash)
    if (status === 1) {
      console.log('The message has been included.')
      clearInterval(checkInterval)
    }
  }

  const checkInterval = setInterval(checkInclusion, 10000)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

