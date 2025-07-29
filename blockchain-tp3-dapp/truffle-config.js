module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Port par défaut de Ganache
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};