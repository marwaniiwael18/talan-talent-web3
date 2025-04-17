// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TalentNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor(address initialOwner) ERC721("TalanTalentNFT", "TTNFT") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function mintTalentNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}
