# Blockchain TP3 - Solidity Exercises dApp

## 📋 Description

Decentralized application (dApp) developed for Blockchain course TP3. This application allows interaction with 8 different Solidity contracts, each illustrating specific concepts of blockchain programming.

## 🛠️ Technologies Used

- **Blockchain**: Solidity ^0.8.0
- **Framework**: Truffle
- **Local Network**: Ganache
- **Frontend**: React 19.1.1
- **Web3**: Web3.js 4.16.0
- **UI**: Bootstrap 5.3.7 + React Bootstrap 2.10.10
- **Routing**: React Router DOM 6.30.1

## 📁 Project Structure

```
blockchain-tp3-dapp/
├── contracts/              # Solidity Contracts
│   ├── Exercice1.sol       # Addition functions
│   ├── Exercice2.sol       # Ether/Wei conversion
│   ├── Exercice3.sol       # String management
│   ├── Exercice4.sol       # Positive number check
│   ├── Exercice5.sol       # Parity verification
│   ├── Exercice6.sol       # Array management
│   ├── Exercice7.sol       # OOP inheritance
│   └── Exercice8.sol       # Payment system
├── migrations/             # Deployment scripts
├── test/                   # Unit tests
├── client/                 # React Application
│   ├── src/
│   │   ├── components/     # React Components
│   │   │   ├── exercises/  # Exercise components
│   │   │   ├── Header.js   # Navigation
│   │   │   ├── Home.js     # Home page
│   │   │   ├── BlockchainInfo.js
│   │   │   └── TransactionInfo.js
│   │   ├── contracts/      # Contract ABIs
│   │   └── utils/          # Web3 utilities
│   └── public/
├── docs/                   # Documentation
├── truffle-config.js       # Truffle configuration
└── package.json
```

## 🎯 Implemented Exercises

### Exercise 1 - Addition Functions
- **Contract**: `Exercice1.sol`
- **Features**: 
  - `view` function using state variables
  - `pure` function with parameters
  - State variable modification

### Exercise 2 - Cryptocurrency Conversion
- **Contract**: `Exercice2.sol`
- **Features**:
  - Ether → Wei conversion
  - Wei → Ether conversion
  - Comparison with Web3.js utilities

### Exercise 3 - String Management
- **Contract**: `GestionChaines.sol`
- **Features**:
  - Message storage and modification
  - String concatenation
  - Length calculation
  - String comparison

### Exercise 4 - Positive Number Check
- **Contract**: `Exercice4.sol`
- **Features**:
  - Verify if a number is positive
  - Automated tests
  - Interactive test interface

### Exercise 5 - Parity Verification
- **Contract**: `Exercice5.sol`
- **Features**:
  - Even/odd verification
  - Number visualization
  - Automated tests

### Exercise 6 - Array Management
- **Contract**: `Exercice6.sol`
- **Features**:
  - Element addition
  - Index-based search
  - Sum calculation
  - Array display

### Exercise 7 - OOP Inheritance
- **Contract**: `Rectangle.sol` (inherits from `Forme.sol`)
- **Features**:
  - Inheritance and abstraction
  - Polymorphism
  - Graphical visualization
  - Shape movement

### Exercise 8 - Payment System
- **Contract**: `Payment.sol`
- **Features**:
  - Payment reception
  - Fund withdrawal
  - Permission management
  - Balance tracking

## 🚀 Installation and Deployment

### Prerequisites

```bash
# Node.js version 16+
node --version

# NPM or Yarn
npm --version

# Git
git --version
```

### Installation

```bash
# Clone the project
git clone https://github.com/khallaoui/blockchain-tp3-dapp.git
cd blockchain-tp3-dapp

# Install Truffle dependencies
npm install

# Install React dependencies
cd client
npm install
cd ..
```

### Global Tools Installation

```bash
# Truffle
npm install -g truffle

# Ganache CLI (optional)
npm install -g ganache-cli
```

### Local Deployment

#### 1. Start Ganache

**Option A: Ganache GUI**
- Download and install Ganache
- Create a new workspace
- Configure port 7545

**Option B: Ganache CLI**
```bash
ganache-cli -p 7545 -h 0.0.0.0
```

#### 2. Compile and Deploy Contracts

```bash
# Compile contracts
truffle compile

# Deploy to development network
truffle migrate --network development

# Redeploy if necessary
truffle migrate --reset --network development
```

#### 3. Start React Application

```bash
cd client
npm start
```

The application will be accessible at `http://localhost:3000`

## 🧪 Testing

### Truffle Unit Tests

```bash
# Run all tests
truffle test

# Specific test
truffle test test/TestExercice1.js
```

### Frontend Tests

```bash
cd client
npm test
```

## 📱 Application Usage

### MetaMask Configuration

1. Install MetaMask extension
2. Add a custom network:
   - **Network Name**: Ganache Local
   - **RPC URL**: http://localhost:7545
   - **Chain ID**: 1337 (or according to your configuration)
   - **Symbol**: ETH

3. Import an account from Ganache using the private key

### Navigation

- **Home page**: Overview of the 8 exercises
- **Individual exercises**: Dedicated interface for each contract
- **Blockchain information**: Real-time data display
- **Transaction history**: Interaction tracking

## 🔧 Configuration

### Truffle Configuration

The `truffle-config.js` file contains:
- Development network configuration (Ganache)
- Solidity compiler version (0.8.19)
- Compiler optimizations

### Environment Variables

Create a `.env` file in the `client/` folder:

```env
REACT_APP_NETWORK_ID=5777
REACT_APP_GANACHE_URL=http://localhost:7545
```

## 📊 Advanced Features

### Real-time Blockchain Information
- Current block number
- Gas limit
- Timestamp
- Connected account balance

### Transaction Management
- Transaction hash display
- Transaction status
- Gas used
- Block number

### Responsive Interface
- Mobile and desktop compatible
- Modern Bootstrap design
- Intuitive navigation

## 🐛 Troubleshooting

### Common Issues

**1. "Contract not deployed" error**
```bash
truffle migrate --reset --network development
```

**2. MetaMask won't connect**
- Verify that Ganache is running
- Check network configuration in MetaMask
- Reset MetaMask account if necessary

**3. Solidity compilation error**
- Check compiler version in `truffle-config.js`
- Ensure all contracts have proper SPDX license

**4. Gas issues**
- Increase gas limit in `truffle-config.js`
- Verify account has sufficient ETH

### Debug Logs

```bash
# Detailed Truffle logs
truffle migrate --network development --verbose-rpc

# Truffle console
truffle console --network development
```

## 📈 Future Improvements

- [ ] More comprehensive automated tests
- [ ] Testnet deployment (Sepolia, Goerli)
- [ ] Administration interface
- [ ] Data visualization charts
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Push notifications
- [ ] Persistent transaction history


## 👨‍💻 Author

**KHALLAOUI**
- Master GLCC - 2024/2026
- GitHub: https://github.com/khallaoui

## 🙏 Acknowledgments

- Master GLCC teaching team
- Truffle and Web3.js community
- Solidity documentation
- Open source contributors

