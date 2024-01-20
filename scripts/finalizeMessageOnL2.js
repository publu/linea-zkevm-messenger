const hre = require('hardhat')

async function main() {

  /* Message data */
  const _from = '0x50768B7Ecf5513205c513403a1127aA346F8C854';
  const _to = '0x5E6BCf6c94da804d08511cbE928594d7d985ddE2';
  const _fee = 0;
  const _value = 0;
  const _feeRecipient = '0x985A29E88E75394DbDaE41a269409f701ccf6a43';
  const _calldata = '0xA4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184C657420796F75722062616C646E657373207368696E652E0000000000000000';
  const _nonce = 449721;

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

