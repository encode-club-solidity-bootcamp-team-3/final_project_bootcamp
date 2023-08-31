# Group 3 - Encode Solidity Bootcamp - Stefan, Remi and Jordi

## Building a NFT auction + NFT lottery with charity contributions

This repository focuses on the development of a decentralized auction dApp that combines NFT art auctions, a lottery system, and part of the revenue goes to charity.

On one hand, create a bunch of NFTs. Then, users can bid for them as an auction system, which shows a list of auctions, time left for the auction, last winners. 

Finally, add a sort of lottery system that gives users a chance to win a selected NFT artwork with a lottery ticket purchase.

Charitable Contributions: Allocate a percentage of the funds raised from NFT art auctions and lottery ticket sales to charitable causes or organizations.

Users can choose which charity or cause they want to support with their contributions.

### Smart Contracts

1 - NFTContract.sol

A ER721 token generated via OpenZeppelin wizard, with functions safeMint (in order to mint creating a tokenID), and function transerNFT.

2 - LotteryToken.sol

Same as the one used in week 5.

3 - Lottery.sol

Pretty much the same as the one used in week 5, but with some modifications:

- We import the NFTContract 
- When closing the lottery and a winner is selected, transfer NFT.

4 - AuctionContract.sol

Still in the making.

# First deployment

1/ Deploy NFT [0x56a7d8d610f6a0f840587e960173b0687c22353f1395c5b55d50d9420253497e](https://sepolia.etherscan.io/tx/0x56a7d8d610f6a0f840587e960173b0687c22353f1395c5b55d50d9420253497e)  
- NFT contract [0xc6c08fc1d46103ef9c9afe1d1a690b475715577d](https://sepolia.etherscan.io/address/0xc6c08fc1d46103ef9c9afe1d1a690b475715577d)

2/ Mint NFT with tokenID 55 [0x272bd5c0cb9d56c0c1120de36e607f1c042331a0a20e764a3ac0a67c6a1cc86b](https://sepolia.etherscan.io/tx/0x272bd5c0cb9d56c0c1120de36e607f1c042331a0a20e764a3ac0a67c6a1cc86b) 
- Mint a second NFT with tokenID 65 [0x19b0cff23d3cc0c0119acd6035bcbbd957bf0fd12a74b4782b527f299bd80c16 ](https://sepolia.etherscan.io/tx/0x19b0cff23d3cc0c0119acd6035bcbbd957bf0fd12a74b4782b527f299bd80c16 ) 

3/ Deploy Lottery [0xaf2083bf1e3738bc91308a33f0b03afd14004c35dada3f55397f43c7a8390535](https://sepolia.etherscan.io/tx/0xaf2083bf1e3738bc91308a33f0b03afd14004c35dada3f55397f43c7a8390535)
- Lottery contract [0x8fee3143154bc482305010b3cd9546c7f6f1a667](https://sepolia.etherscan.io/address/0x8fee3143154bc482305010b3cd9546c7f6f1a667)
- Lottery Token contract [0x64b3BC95286A87C06a6aa8FcDc92dD3b2f695496](https://sepolia.etherscan.io/address/0x64b3BC95286A87C06a6aa8FcDc92dD3b2f695496)

4/ open bets 200s [0xa0d2f253e0a62831423b86e238e09e3f92df1631726bf7930eae1034b112f36e](https://sepolia.etherscan.io/tx/0xa0d2f253e0a62831423b86e238e09e3f92df1631726bf7930eae1034b112f36e)

5/ Purchase 100 tokens [0x42af4c5230cdfb7696996b7f10fc23768ace2936f604bd67cae6885b239a27d8](https://sepolia.etherscan.io/tx/0x42af4c5230cdfb7696996b7f10fc23768ace2936f604bd67cae6885b239a27d8)



