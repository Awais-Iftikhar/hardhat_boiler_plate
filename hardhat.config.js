/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

const { NETWORK_PRIVATE_KEY,ALCHEMY_API_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.7",
  networks:{
    goerli:{
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${NETWORK_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
