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
 
1/ Deploy NFT [0x4cffb93029a5a52884ac79f74e4cbd1102bb8c94830ca5a94be84a0c8a64cf88](https://sepolia.etherscan.io/tx/0x4cffb93029a5a52884ac79f74e4cbd1102bb8c94830ca5a94be84a0c8a64cf88)  
- NFT contract [0x153eafb91b08b971121ed74ca61adf3b7d9ba50c](https://sepolia.etherscan.io/address/0x153eafb91b08b971121ed74ca61adf3b7d9ba50c)

2/ Mint NFT with tokenID 105 [0x507fc4bb2057f25f390a3cf2fdb0f31365c76bce10726922a44b5c1561aa0701](https://sepolia.etherscan.io/tx/0x507fc4bb2057f25f390a3cf2fdb0f31365c76bce10726922a44b5c1561aa0701) 

Mint NFT with tokenID 131 [0xa3f46dd9957c061fcbf9d0bc05a203ff3ff035425ddceaf3a0c83353477b47fd](https://sepolia.etherscan.io/tx/0xa3f46dd9957c061fcbf9d0bc05a203ff3ff035425ddceaf3a0c83353477b47fd) 

3/ Transfer NFT tokenID = 105 from NFT contract creator to Lottery address [0xd3afa7a887f642c41c28e91ce849b6a12b34c0e40510193e418c3910221a6c48](https://sepolia.etherscan.io/tx/0xd3afa7a887f642c41c28e91ce849b6a12b34c0e40510193e418c3910221a6c48)

Transfer NFT tokenID = 131 from NFT contract creator to Lottery address [0x24e6fc322230e0f9a0c3ff09b6f787eba1fc17653659839d17ceb615f7a66528](https://sepolia.etherscan.io/tx/0x24e6fc322230e0f9a0c3ff09b6f787eba1fc17653659839d17ceb615f7a66528)

# Part 2: Lottery actions


1/ Deploy Lottery [0x6c0a30ec67a220a39a96145b620cec24770ef3b4d67d5cde12f04adbca806e50](https://sepolia.etherscan.io/tx/0x6c0a30ec67a220a39a96145b620cec24770ef3b4d67d5cde12f04adbca806e50)
- Lottery contract [0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7](https://sepolia.etherscan.io/address/0x30d29200fa4d936ddcf1d36bbfcc3a3781c685a7)
- Lottery Token contract [0x9f89f7b50e7b3ee9429b1d1c9f7d4d47979e1aba](https://sepolia.etherscan.io/address/0x9f89f7b50e7b3ee9429b1d1c9f7d4d47979e1aba)

2/ Purchase 30 tokens [0x507b2f290d19296ba8e0aa0c52f1943d525994187ac9c63d44ce5b2fab13ef01](https://sepolia.etherscan.io/tx/0x507b2f290d19296ba8e0aa0c52f1943d525994187ac9c63d44ce5b2fab13ef01)

3/ Open bets 200 seconds for tokenID 105 [0x18c21e6ec5f3f09fbd0ed8a8d658849abb43ae2899107e24008c296171c75e62](https://sepolia.etherscan.io/tx/0x18c21e6ec5f3f09fbd0ed8a8d658849abb43ae2899107e24008c296171c75e62)

4/ Place bet with 12 tokens [0xde94ce747c45c09ad36f8acbb27b6aaf2e55bded319969853062c37fa9f72f81](https://sepolia.etherscan.io/tx/0xde94ce747c45c09ad36f8acbb27b6aaf2e55bded319969853062c37fa9f72f81) 

5/ Close lottery, where we see that once it's closed, NFT with tokenID = 105 gets transferred to the winner   [0x3d17f73da90100a64526fe062652f08c73d43f39c94557ecffd676faa4c407f6](https://sepolia.etherscan.io/tx/0x3d17f73da90100a64526fe062652f08c73d43f39c94557ecffd676faa4c407f6) 


6/ Open bets 200 seconds for tokenID 131 [0x5c682bebbc36f8e14aef0646ddbd0e1b742436a58043dcb3847ac1a1d4a1fc83](https://sepolia.etherscan.io/tx/0x5c682bebbc36f8e14aef0646ddbd0e1b742436a58043dcb3847ac1a1d4a1fc83)

7/ Place bet with 12 tokens [0xd1ea99e4798d686d3e691bba91ccc1b0f2fde5bce2dd3bb5ab492ea8d7986c0b](https://sepolia.etherscan.io/tx/0xd1ea99e4798d686d3e691bba91ccc1b0f2fde5bce2dd3bb5ab492ea8d7986c0b) 

8/ Close lottery, where we see that once it's closed, NFT with tokenID = 131 gets transferred to the winner   [0xe21b61db34a46101e1844d48c51f417728b7f49e0aceb86520f49520e57c016d](https://sepolia.etherscan.io/tx/0xe21b61db34a46101e1844d48c51f417728b7f49e0aceb86520f49520e57c016d) 




