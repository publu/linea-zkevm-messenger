require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy')
require('dotenv').config()

const privateKey = process.env.KEY

if (!privateKey) {
  throw new Error('KEY not set')
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'gorli',
  networks: {
    linea_gorli: {
      url: process.env.LINEA_GORLI_RPC || 'https://rpc.goerli.linea.build',
      accounts: [privateKey]
    },
    gorli: {
      url: process.env.GORLI_RPC || 'https://goerli.gateway.tenderly.co',
      accounts: [privateKey]
    },
  },
  solidity: '0.8.19',
};
