const hre = require('hardhat')
require('dotenv').config()

async function main() {
  const l1TxHash = "0xF3FC26266E40F948424BE972610FCFEED3F6FDDCF27C15362A9A124AEC8D7EB0";
  const l2BridgeAddress = '0xC499a572640B64eA1C8c194c43Bc3E19940719dC';

  // Simpler ABI just for checking the inbox message status
  const bridgeAbi = [
    "function inboxL1L2MessageStatus(bytes32 messageHash) view returns (uint8)"
  ];

  const signer = await hre.ethers.getSigner();
  const bridgeContract = new hre.ethers.Contract(l2BridgeAddress, bridgeAbi, signer);

  await new Promise((resolve, reject) => {
    const checkInclusion = async () => {
      try {
        const status = await bridgeContract.inboxL1L2MessageStatus(l1TxHash);
        if (status == 1) {
          console.log('The message has been included.');
          clearInterval(checkInterval);
          resolve();
        } else {
          console.log("The message hasn't been included yet on the L2 Bridge Contract. Current Status: ", status)
        }
      } catch (error) {
        console.error('Error checking message status:', error);
        clearInterval(checkInterval);
        reject(error);
      }
    };

    const checkInterval = setInterval(checkInclusion, 10000);
  });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

