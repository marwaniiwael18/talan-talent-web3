🎨 Talan Talent on Web3
Welcome to Talan Talent, an innovative NFT dApp where users can mint NFTs showcasing their hidden talents — music, cooking, art, coding, and more! Built with ❤️ using Solidity, Hardhat, React, Tailwind CSS, Ethers.js, and deployed on a local blockchain network.

🛠 Features
✅ Mint NFTs that represent your personal talents
✅ Smooth UI with glassmorphism + wavy animated background
✅ MetaMask wallet integration
✅ Powered by a local Hardhat blockchain (Chain ID: 31337)
✅ NFT metadata stored securely using Pinata (IPFS)
🚀 Tech Stack
Frontend: React, Tailwind CSS, Framer Motion
Smart Contracts: Solidity (ERC-721)
Blockchain Framework: Hardhat
Wallet Integration: MetaMask, Ethers.js
File Storage: Pinata (IPFS)
⚙️ Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js & npm
MetaMask browser extension
1. Clone the Repository
bash
git clone https://github.com/marwaniiwael18/talan-talent-web3.git
cd talan-talent-web3
2. Install Backend Dependencies & Compile Smart Contracts
bash
npm install
npx hardhat compile
3. Run a Local Hardhat Blockchain
bash
npx hardhat node
This will start a blockchain at http://127.0.0.1:8545 and display test accounts with private keys.

4. Deploy Your Smart Contract
In a new terminal window:

bash
npx hardhat run scripts/deploy.js --network localhost
Copy the deployed contract address for use in the frontend.

5. Set Up the Frontend
bash
cd frontend
npm install
npm start
The app will be live at http://localhost:3000.

🦊 MetaMask Setup
To connect MetaMask to the local blockchain:

Add a New Network Manually:

Network Name: Hardhat Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Import an Account:

Use any private key printed in the terminal when running npx hardhat node.
📦 Future Add-ons
IPFS + Pinata: Store NFT images and metadata securely on Pinata's IPFS service.
NFT Image Preview: Display talent NFTs in a user-friendly gallery.
On-Chain Events / Talent Gallery: Showcase user talents on-chain in a decentralized gallery.

🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.

💜 Acknowledgments
Made with 💜 by Wael Marwani

