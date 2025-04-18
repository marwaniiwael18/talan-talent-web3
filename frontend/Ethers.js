import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const MetaMaskConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [networkName, setNetworkName] = useState("Ethereum Mainnet");
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(error => console.error(error));
    } else {
      alert("MetaMask is not installed");
    }
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
      
      // Get account balance
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance).substring(0, 7));
      } catch (error) {
        console.error("Error getting balance", error);
      }
    } else {
      setAccount(null);
      setIsConnected(false);
      setBalance("0");
    }
  };

  const handleChainChanged = async (chainId) => {
    console.log("Chain changed to: ", chainId);
    
    // Get network name based on chainId
    let name = "Unknown Network";
    switch (chainId) {
      case "0x1":
        name = "Ethereum Mainnet";
        break;
      case "0x5":
        name = "Goerli Testnet";
        break;
      case "0x89":
        name = "Polygon";
        break;
      case "0xa4b1":
        name = "Arbitrum";
        break;
      case "0xa":
        name = "Optimism";
        break;
      default:
        name = `Chain ID: ${chainId}`;
    }
    setNetworkName(name);
    
    // Refresh account info
    window.ethereum.request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch(error => console.error(error));
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get current chain ID
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        handleChainChanged(chainId);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    }
  };

  const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Wavy Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* First wave layer */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-64">
            <path
              fill="#9333ea" 
              fillOpacity="0.4"
              d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,202.7C960,224,1056,224,1152,218.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="15s"
                repeatCount="indefinite"
                values="
                  M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,202.7C960,224,1056,224,1152,218.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L0,320Z;
                  
                  M0,128L48,154.7C96,181,192,235,288,240C384,245,480,203,576,165.3C672,128,768,96,864,112C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L0,320Z;

                  M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,202.7C960,224,1056,224,1152,218.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L0,320Z
                "
              />
            </path>
          </svg>
        </div>
        
        {/* Second wave layer */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-72">
            <path
              fill="#8b5cf6"
              fillOpacity="0.3"
              d="M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,170.7C840,192,960,192,1080,170.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="
                  M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,170.7C840,192,960,192,1080,170.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L0,320Z;
                  
                  M0,64L48,85.3C96,107,192,149,288,186.7C384,224,480,256,576,234.7C672,213,768,139,864,101.3C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,320L0,320Z;
                  
                  M0,160L60,144C120,128,240,96,360,101.3C480,107,600,149,720,170.7C840,192,960,192,1080,170.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L0,320Z
                "
              />
            </path>
          </svg>
        </div>
        
        {/* Third wave layer */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-36">
            <path
              fill="#c4b5fd"
              fillOpacity="0.2"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z;
                  
                  M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,186.7C672,213,768,267,864,266.7C960,267,1056,213,1152,202.7C1248,192,1344,224,1392,240L1440,256L1440,320L0,320Z;
                  
                  M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z
                "
              />
            </path>
          </svg>
        </div>
      </div>

      {/* MetaMask UI */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl p-6 w-full max-w-md text-white"
      >
        {!isConnected ? (
          <div className="flex flex-col items-center">
            <img 
              src="https://uploads-ssl.webflow.com/61ea6bed25cdcd82bdb48af2/61ea6bed25cdcd40b8b48c0e_metamask-logo.svg" 
              alt="MetaMask Logo" 
              className="w-32 h-32 mb-6"
            />
            <h1 className="text-2xl font-bold mb-6">Welcome to Web3</h1>
            <motion.button 
              onClick={connectMetaMask} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#f6851b] hover:bg-[#e2761b] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Connect MetaMask
            </motion.button>
            <p className="mt-4 text-sm text-gray-300 text-center">
              Connect your wallet to interact with decentralized applications
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Network Selection */}
            <div className="relative">
              <div 
                onClick={() => setShowNetworkMenu(!showNetworkMenu)} 
                className="flex items-center justify-between p-3 mb-4 bg-gray-800 bg-opacity-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>{networkName}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {showNetworkMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 w-full bg-gray-800 rounded-lg shadow-lg mt-1"
                >
                  <div className="p-3 hover:bg-gray-700 cursor-pointer">Ethereum Mainnet</div>
                  <div className="p-3 hover:bg-gray-700 cursor-pointer">Polygon</div>
                  <div className="p-3 hover:bg-gray-700 cursor-pointer">Arbitrum</div>
                  <div className="p-3 hover:bg-gray-700 cursor-pointer">Optimism</div>
                </motion.div>
              )}
            </div>
            
            {/* Account Info */}
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Account</span>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-green-400">Connected</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{shortenAddress(account)}</span>
                <button className="text-xs bg-gray-700 p-1 rounded">Copy</button>
              </div>
            </div>
            
            {/* Balance */}
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{balance} ETH</div>
                <div className="text-gray-300 text-sm mt-1">≈ $0.00 USD</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center cursor-pointer hover:bg-gray-800 rounded-lg p-2">
                <div className="bg-blue-500 h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-xs">Buy</span>
              </div>
              <div className="text-center cursor-pointer hover:bg-gray-800 rounded-lg p-2">
                <div className="bg-green-500 h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-xs">Swap</span>
              </div>
              <div className="text-center cursor-pointer hover:bg-gray-800 rounded-lg p-2">
                <div className="bg-purple-500 h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                  </svg>
                </div>
                <span className="text-xs">Send</span>
              </div>
              <div className="text-center cursor-pointer hover:bg-gray-800 rounded-lg p-2">
                <div className="bg-yellow-500 h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <span className="text-xs">Receive</span>
              </div>
            </div>
            
            {/* Promotion Card */}
            <div className="bg-indigo-600 bg-opacity-50 rounded-lg p-4 mb-6">
              <div className="text-sm font-semibold">Enter the $5000 USDC Giveaway!</div>
              <div className="text-xs mt-1">Mint an NFT now for a chance to win</div>
              <button className="bg-white text-indigo-700 text-xs font-medium mt-2 py-1 px-2 rounded">Learn More</button>
            </div>
            
            {/* Tabs */}
            <div className="flex mb-4 border-b border-gray-700">
              <div className="px-4 py-2 border-b-2 border-white">Assets</div>
              <div className="px-4 py-2 text-gray-400">Activity</div>
              <div className="px-4 py-2 text-gray-400">NFTs</div>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-6">
              <div className="text-gray-300 mb-2">Approvisionnez votre portefeuille</div>
              <div className="text-xs text-gray-400">Add or transfer tokens to get started</div>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-sm py-2 px-4 rounded-full">
                Buy ETH
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MetaMaskConnect;
