import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import TalentNFTAbi from "./contract/TalentNFT.json";
import { contractAddress } from "./contract/contractAddress";

function App() {
  const [account, setAccount] = useState(null);
  const [talentName, setTalentName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc);
    } else {
      alert("Install MetaMask first!");
    }
  };

  const uploadMetadata = async () => {
    const metadata = {
      name: talentName,
      description: `Talent NFT of ${talentName}`,
      image: imageUrl,
    };

    // Replace this with Pinata later
    return "https://ipfs.io/ipfs/QmFakeIpfsHash";
  };

  const mintNFT = async () => {
    try {
      if (!account) return alert("Connect wallet first!");

      const metadataURI = await uploadMetadata();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TalentNFTAbi.abi, signer);

      const tx = await contract.mintTalentNFT(account, metadataURI);
      await tx.wait();

      setStatus("✅ NFT Minted Successfully!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Error minting NFT");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* 🌊 Enhanced Multi-layer Wavy Animated Background */}
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
        
        {/* Third wave layer (faster and smaller) */}
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

      {/* 🧠 Minting Card UI */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full max-w-lg text-white"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">🎨 Mint Your Talent NFT</h1>

        <div className="text-center mb-6">
          {account ? (
            <p className="text-green-300 font-mono">Connected: {account}</p>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
            >
              Connect MetaMask
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Talent Name"
            value={talentName}
            onChange={(e) => setTalentName(e.target.value)}
            className="px-4 py-2 rounded-md bg-white bg-opacity-20 placeholder-white focus:outline-none"
          />

          <input
            type="text"
            placeholder="Image URL (IPFS)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-4 py-2 rounded-md bg-white bg-opacity-20 placeholder-white focus:outline-none"
          />

          <motion.button
            onClick={mintNFT}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Mint Talent NFT
          </motion.button>

          <p className="text-sm text-center mt-2">{status}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
