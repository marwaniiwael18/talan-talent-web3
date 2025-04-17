import { useState } from "react";
import { ethers } from "ethers";
import TalentNFTAbi from "./contract/TalentNFT.json";
import { contractAddress } from "./contract/contractAddress";

function App() {
  const [account, setAccount] = useState(null);
  const [talentName, setTalentName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc);
    } else {
      alert("Install MetaMask first!");
    }
  };

  // Upload metadata to IPFS (optional: you’ll use Pinata later)
  const uploadMetadata = async () => {
    const metadata = {
      name: talentName,
      description: `Talent NFT of ${talentName}`,
      image: imageUrl,
    };

    // Just simulate for now, you’ll use Pinata API later
    const fakeIpfsUrl = "https://ipfs.io/ipfs/QmFakeIpfsHash"; // replace with real
    return fakeIpfsUrl;
  };

  // Mint NFT
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
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🎨 Mint Your Talent NFT</h1>

      {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect MetaMask</button>}

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Your Talent Name"
          value={talentName}
          onChange={(e) => setTalentName(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Image URL (IPFS)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br /><br />
        <button onClick={mintNFT}>Mint Talent NFT</button>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default App;
