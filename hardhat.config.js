require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.24',
	networks: {
		hardhat: {},
		sepolia: {
			url: 'https://sepolia.infura.io/v3/',
			accounts: [''],
		},
		mainet: {
			url: 'https://mainnet.infura.io/v3/',
			accounts: ['ssshshshshshshhshshshshshsh'],
		},
	},
	paths: {
		sources: './src/contracts',
		tests: './src/test',
		cache: './src/cache',
		artifacts: './src/artifacts',
	},
};
