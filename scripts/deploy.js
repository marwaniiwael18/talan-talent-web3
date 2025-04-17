const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const TalentNFT = await ethers.getContractFactory("TalentNFT");

  const talentNFT = await TalentNFT.deploy(deployer.address);
  await talentNFT.waitForDeployment(); // ✅ updated method

  console.log("TalentNFT deployed to:", await talentNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
