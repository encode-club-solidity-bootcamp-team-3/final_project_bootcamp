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

I've devided it in two parts: NFT deployment, minting and transfering, and Lottery deployment and actions. The NFTs must be transferred to the lottery contract for it to transfer it to the lottery winner, but the minting of the NFTs can be done after lottery deployment. 

# Part 1: Deploy NFT
 
1/ Deploy NFT [0x2502c52a02b2f9554bef6d79e17f640cc2d44d87fb4ce53d1754a84bfaf5ccba](https://sepolia.etherscan.io/tx/0x2502c52a02b2f9554bef6d79e17f640cc2d44d87fb4ce53d1754a84bfaf5ccba)  
- NFT contract [0x11fe7c5ceb4547bb504335eedf989d1b02247a80](https://sepolia.etherscan.io/address/0x11fe7c5ceb4547bb504335eedf989d1b02247a80)

2/ Mint NFT with tokenID 200 [0x0a8c441cb3f6d1a37210588b67c0724c0acc7e488aef3ea99ab56703cdf7be9d](https://sepolia.etherscan.io/tx/0x0a8c441cb3f6d1a37210588b67c0724c0acc7e488aef3ea99ab56703cdf7be9d) 

Mint NFT with tokenID 250 [0x7073a455db4e34071269d128727eb75cc49b82f308922c48772b1cfabdd7ee9a](https://sepolia.etherscan.io/tx/0x7073a455db4e34071269d128727eb75cc49b82f308922c48772b1cfabdd7ee9a) 

3/ Transfer NFT tokenID = 200 from NFT contract creator to Lottery address [0xfb7813de04ef59a043a4b20d0c72cf3f59b31b40327b83547cb767e0dcbe00a8](https://sepolia.etherscan.io/tx/0xfb7813de04ef59a043a4b20d0c72cf3f59b31b40327b83547cb767e0dcbe00a8)

Transfer NFT tokenID = 250 from NFT contract creator to Lottery address [0xd46a1af7cf4c7d564b0a4296e78a32e44be5145c228f905a04de36167ff97605](https://sepolia.etherscan.io/tx/0xd46a1af7cf4c7d564b0a4296e78a32e44be5145c228f905a04de36167ff97605)

4/ Transfer NFT Ownership to Lottery address [0xdec89eb7fdb2c4316b14da2718109b0feb272cf18b111641997a22e8adb62de0](https://sepolia.etherscan.io/tx/0xdec89eb7fdb2c4316b14da2718109b0feb272cf18b111641997a22e8adb62de0)


# Part 2: Lottery actions


1/ Deploy Lottery [0xfcca2d514d8713b93fc06f1f341aa604db77e0d0f7dea200366db12301051158](https://sepolia.etherscan.io/tx/0xfcca2d514d8713b93fc06f1f341aa604db77e0d0f7dea200366db12301051158)
- Lottery contract [0xF1f0F0872d8b9643F9AF731792B30c9884BAAeB0](https://sepolia.etherscan.io/address/0xF1f0F0872d8b9643F9AF731792B30c9884BAAeB0)
- Lottery Token contract [0x0715E7485c0D336824f2A77915f543bdC1dCF1fE](https://sepolia.etherscan.io/address/0x0715E7485c0D336824f2A77915f543bdC1dCF1fE)

2/ Purchase 20 tokens [0xed5dcdeb41512b89d33c15a722cc53ad1215607eb7aed1985d18019f76cd3dbf](https://sepolia.etherscan.io/tx/0xed5dcdeb41512b89d33c15a722cc53ad1215607eb7aed1985d18019f76cd3dbf)

3/ Open bets 200 seconds for tokenID 200 [0x63dd3c140053595c9ef265b59cf5dc00dda53125c2b3db3e107a413653f1abc4](https://sepolia.etherscan.io/tx/0x63dd3c140053595c9ef265b59cf5dc00dda53125c2b3db3e107a413653f1abc4)

4/ Close lottery to check that indeed if no one bets, no one gets the NFT 
[0x76eedca2dc00a8c1a904b09fbc6907c2414e0217088472d5756981b9865021e0](https://sepolia.etherscan.io/tx/0x76eedca2dc00a8c1a904b09fbc6907c2414e0217088472d5756981b9865021e0)

5/ Open bets 200 seconds for tokenID 200 again [0x8bcf06100ece65eafc4b3e3a14748cacf54a62d9b6a95940faa67543fc5ba1e8](https://sepolia.etherscan.io/tx/0x8bcf06100ece65eafc4b3e3a14748cacf54a62d9b6a95940faa67543fc5ba1e8)

6/ Place bet with 12 tokens [0x672ebc5a72cc041ff9227eff73fb325f6e70a22b2872e250a73ffee5dfeae2e3](https://sepolia.etherscan.io/tx/0x672ebc5a72cc041ff9227eff73fb325f6e70a22b2872e250a73ffee5dfeae2e3) 

7/ Close lottery, where we see that once it's closed, NFT with tokenID = 105 gets transferred to the winner   [0x3d17f73da90100a64526fe062652f08c73d43f39c94557ecffd676faa4c407f6](https://sepolia.etherscan.io/tx/0x3d17f73da90100a64526fe062652f08c73d43f39c94557ecffd676faa4c407f6) 

6/ Open bets 200 seconds for tokenID 131 [0x5c682bebbc36f8e14aef0646ddbd0e1b742436a58043dcb3847ac1a1d4a1fc83](https://sepolia.etherscan.io/tx/0x5c682bebbc36f8e14aef0646ddbd0e1b742436a58043dcb3847ac1a1d4a1fc83)

7/ Place bet with 12 tokens [0xd1ea99e4798d686d3e691bba91ccc1b0f2fde5bce2dd3bb5ab492ea8d7986c0b](https://sepolia.etherscan.io/tx/0xd1ea99e4798d686d3e691bba91ccc1b0f2fde5bce2dd3bb5ab492ea8d7986c0b) 

8/ Close lottery, where we see that once it's closed, NFT with tokenID = 200 gets transferred to the winner   [0xa6e7f4bf3b94f8072b124965496b3f63cdeca18140be39aaaadf23c433955372](https://sepolia.etherscan.io/tx/0xa6e7f4bf3b94f8072b124965496b3f63cdeca18140be39aaaadf23c433955372) 




