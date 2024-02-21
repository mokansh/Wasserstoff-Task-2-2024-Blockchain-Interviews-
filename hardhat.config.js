
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKeyOwner = process.env.ACCOUNT_OWNER_PVT_KEY;
const privateKeyA = process.env.ACCOUNT_A_PVT_KEY;
const privateKeyB = process.env.ACCOUNT_B_PVT_KEY;


// const etherscanAPIkey = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [privateKeyOwner, privateKeyA]
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [privateKeyOwner, privateKeyA]
    },
    goerli: {
      url: process.env.GOERLI_RPC,
      accounts: [privateKeyOwner, privateKeyA]
    },

    bscTestnet: {
      url: process.env.BSCTESTNET_RPC || "",
      accounts: [privateKeyOwner, privateKeyA, privateKeyB]
    },

    mainnet: {
      url: process.env.ETH_RPC || "",
      accounts: [`0x${process.env.PVT_KEY}`]
    },
    bsc: {
      url: process.env.BSC_RPC || "",
      accounts: [`0x${process.env.PVT_KEY}`]
    },
    

  },
  etherscan: {
    apiKey: process.env.BSC_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  }
};