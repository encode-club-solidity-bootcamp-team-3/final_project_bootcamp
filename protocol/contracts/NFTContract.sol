// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTContract is ERC721, Ownable {
    constructor() ERC721("MyNFT", "NFT") {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function transferNFT(address to, uint256 tokenId) public onlyOwner {
        require(ownerOf(tokenId) == owner(), "Not the owner of the NFT");
        _transfer(owner(), to, tokenId);
    }
}