const hre = require('hardhat')

async function main() {

  /* Message data */
  const _from = '0x5127051fc80ED744CBF427d9bcA50AbBa6BE071e';
  const _to = '0x759D0e8623C5028ED4D447dB25Bbe789FD07A43D';
  const _fee = 0;
  const _value = 0;
  const _feeRecipient = '0x985A29E88E75394DbDaE41a269409f701ccf6a43';
  const _calldata = '0x662a633a00000000000000000000000011fe4b6ae13d2a6055c8d9cf65c55bac32b5d844000000000000000000000000983e54c2f5c8d83b73b80ddee2446dd616de0067000000000000000000000000985a29e88e75394dbdae41a269409f701ccf6a43000000000000000000000000985a29e88e75394dbdae41a269409f701ccf6a430000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
  const _nonce = 449641;

  /* L2 Messenger */
  const l2BridgeAddress = '0xC499a572640B64eA1C8c194c43Bc3E19940719dC';

  // Updated ABI to include the claimMessage function
  const bridgeAbi = [
    "function claimMessage(address _from, address _to, uint256 _fee, uint256 _value, address _feeRecipient, bytes calldata _calldata, uint256 _nonce) external"
  ];

  const signer = await hre.ethers.getSigner();
  const bridgeContract = new hre.ethers.Contract(l2BridgeAddress, bridgeAbi, signer);

  // Call the claimMessage function on the bridge with the provided variables
  try {
    await bridgeContract.claimMessage(_from, _to, _fee, _value, _feeRecipient, _calldata, _nonce);
    console.log('Message claimed on the bridge.');
  } catch (error) {
    console.error('An error occurred while claiming the message on the bridge:', error);
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

