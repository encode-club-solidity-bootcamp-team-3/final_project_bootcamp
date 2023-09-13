# Group 3 - Encode Solidity Bootcamp - Stefan, Remi and Jordi

## Building a NFT auction + NFT lottery with charity contributions

This repository focuses on the development of a decentralized auction dApp that combines NFT art auctions, a lottery system, and part of the revenue would go to charity.

On one hand, create a bunch of NFTs. In this case, we focused on Capybaras. Then, users can bid for them as an auction system, which would show a list of auctions, time left for the auction, last winners. 

Finally, add a lottery system that gives users a chance to win a selected NFT artwork with a lottery ticket purchase.

For the scope of this project, we were only able to focus on the frontend of the lottery, and the backend of both of them. In this readme file, you will find the expalanation of the whole process.

Charitable Contributions: In a fully implemented version, we would allocate a percentage of the funds raised from NFT art auctions and lottery ticket sales to charitable causes or organizations. Users would ideally choose which charity or cause they want to support with their contributions. This is not implemented in the project though.

### Smart Contracts

1 - CapybaraToken.sol

A ER721 token generated using OpenZeppelin ERC721URIStorage so we could embed image metadata from IPFS.

The CIDs in IPFS would be:

- QmZFx9hLtBDkcRknzfhwLieHiQ6mmFmm8h9rE8yJLH4cdn for Cowboy Capybara.
- QmQ9XqniUyjh8pfCz4C47J1qobD98zvhK9yEs8tekD8jMg for Mexican Capybara.

2 - LotteryToken.sol

Same as the one used in week 5.

3 - Lottery.sol

Pretty much the same as the one used in week 5, but with some modifications:

- We import the CapybaraToken contract 
- When closing the lottery and a winner is selected, when he/she wants to withdraw prize, it transfers NFT.

4 - Auction.sol

Representing the Auction logic.

# Transactions and explanation

We've devided it in two parts: NFT deployment, minting and transfering, and Lottery deployment and actions. The NFTs must be transferred to the lottery contract for it to transfer it to the lottery winner, but the minting of the NFTs can be done after lottery deployment. 

# Part 1: Deploy NFT
 
1/ Deploy NFT [0x1aa1ecf1b6cc5c1e354d3d0931393ba517cc7410cbd35405587e4e64de4badc7](https://sepolia.etherscan.io/tx/0x1aa1ecf1b6cc5c1e354d3d0931393ba517cc7410cbd35405587e4e64de4badc7)  
- NFT contract [0x973cf347cc98b9e264843522e8cdf61d776465ee](https://sepolia.etherscan.io/address/0x973cf347cc98b9e264843522e8cdf61d776465ee)

2/ Mint NFT with tokenID 0 [0xe41acf2de5936303f5c5d0dc1bb105fcaf69f4a9497219f5f260f6e825243e8c](https://sepolia.etherscan.io/tx/0xe41acf2de5936303f5c5d0dc1bb105fcaf69f4a9497219f5f260f6e825243e8c) 

Mint NFT with tokenID 1 [0x0b8c7b8191b793a4c5b61f6f2218cb86365b3c8c48ceb4ddf0aa9f49b54405f0](https://sepolia.etherscan.io/tx/0x0b8c7b8191b793a4c5b61f6f2218cb86365b3c8c48ceb4ddf0aa9f49b54405f0) 

3/ Transfer NFT tokenID = 0 from NFT contract creator to Lottery address [0xc4fe6a5f4c726eafef38eb58dfffac5b80fd3262bc210caaf2ecbbda5dc5e40f](https://sepolia.etherscan.io/tx/0xc4fe6a5f4c726eafef38eb58dfffac5b80fd3262bc210caaf2ecbbda5dc5e40f)

Transfer NFT tokenID = 1 from NFT contract creator to Lottery address [0x9524e4792c20d6ab01f7b61aaabe4b9c720d5027bfe98df888c38f91d8da8cf8](https://sepolia.etherscan.io/tx/0x9524e4792c20d6ab01f7b61aaabe4b9c720d5027bfe98df888c38f91d8da8cf8)

# Part 2: Lottery actions

1/ Deploy Lottery [0xb0cca3163776dbc1566ff6c3a21bfe84fd555d38efcb3103aad31b18057a5cca](https://sepolia.etherscan.io/tx/0xb0cca3163776dbc1566ff6c3a21bfe84fd555d38efcb3103aad31b18057a5cca)
- Lottery contract [0x80e91b9742b2874c0ab3b8d766cbe318b71335eb](https://sepolia.etherscan.io/address/0x80e91b9742b2874c0ab3b8d766cbe318b71335eb)
- Lottery Token contract [0x434be57C2168C0AC839091EB79d25A7Cdbd7088D](https://sepolia.etherscan.io/address/0x434be57C2168C0AC839091EB79d25A7Cdbd7088D)

2/ Purchase 30 tokens [0xfd9286124ea49f16cfe2014d347ed7620a237a3314d916291038eb5abbcb6e50](https://sepolia.etherscan.io/tx/0xfd9286124ea49f16cfe2014d347ed7620a237a3314d916291038eb5abbcb6e50)

3/ Open bets 200 seconds for tokenID 0 [0x8e9f0e259681932868f589c333f09cf34224263e49d197175700f0f7042be97c](https://sepolia.etherscan.io/tx/0x8e9f0e259681932868f589c333f09cf34224263e49d197175700f0f7042be97c)

4/ Close lottery to check that indeed if no one bets, no one gets the NFT 
[0x76eedca2dc00a8c1a904b09fbc6907c2414e0217088472d5756981b9865021e0](https://sepolia.etherscan.io/tx/0x76eedca2dc00a8c1a904b09fbc6907c2414e0217088472d5756981b9865021e0)


