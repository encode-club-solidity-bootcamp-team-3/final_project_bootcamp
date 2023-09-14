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
 
1/ Deploy NFT [0x6e3d6ca1d912e4d1cb7da50f3624a863e21870b388ce703b150e432b3c5926e5](https://sepolia.etherscan.io/tx/0x6e3d6ca1d912e4d1cb7da50f3624a863e21870b388ce703b150e432b3c5926e5)  
- NFT contract [0x9e78c2453ca42856ca88215a0d30d19f45107715](https://sepolia.etherscan.io/address/0x9e78c2453ca42856ca88215a0d30d19f45107715)

2/ Mint NFT with tokenID 0 [0xd33e4fce59f37b267c04be2f7edb54b34b550629bedd8d776072fac405c70ff7](https://sepolia.etherscan.io/tx/0xd33e4fce59f37b267c04be2f7edb54b34b550629bedd8d776072fac405c70ff7) 

Mint NFT with tokenID 1 [0x9e6f8cc4fdea36345621355135829ffb406291c457ef1e42496ed42b3f9e4691](https://sepolia.etherscan.io/tx/0x9e6f8cc4fdea36345621355135829ffb406291c457ef1e42496ed42b3f9e4691) 

3/ Transfer NFT tokenID = 0 from NFT contract creator to Lottery address [0x33e3da7ae0bf87f1d373cdfad3fd313ee0eea30300fbcbd6129329e5928139b9](https://sepolia.etherscan.io/tx/0x33e3da7ae0bf87f1d373cdfad3fd313ee0eea30300fbcbd6129329e5928139b9)

Transfer NFT tokenID = 1 from NFT contract creator to Lottery address [0x7079113f00b8749fd18b4135f2ec5975d90550a2a8f7266450af2d628d1a0b48](https://sepolia.etherscan.io/tx/0x7079113f00b8749fd18b4135f2ec5975d90550a2a8f7266450af2d628d1a0b48)

This is the image of the Cowboy Capybara:


![Cowboy Capybara](https://github.com/encode-club-solidity-bootcamp-team-3/final_project_bootcamp/blob/main/protocol/pictures/0.png)


And here the Mexican Capybara:


![Mexican Capybara](https://github.com/encode-club-solidity-bootcamp-team-3/final_project_bootcamp/blob/main/protocol/pictures/1.png)


# Part 2: Lottery actions

1/ Deploy Lottery [0x6e3d6ca1d912e4d1cb7da50f3624a863e21870b388ce703b150e432b3c5926e5](https://sepolia.etherscan.io/tx/0x6e3d6ca1d912e4d1cb7da50f3624a863e21870b388ce703b150e432b3c5926e5)
- Lottery contract [0xf377364d038e9053a6750392df1734a3a6ced2d3](https://sepolia.etherscan.io/address/0xf377364d038e9053a6750392df1734a3a6ced2d3)
- Lottery Token contract [0xc60BFd5a59AB4fDd136B28637631947160C25B20](https://sepolia.etherscan.io/address/0xc60BFd5a59AB4fDd136B28637631947160C25B20)

2/ Purchase tokens [0x6b0502be077719750674b68a4215b56c8ba74435622f7bca09ebd449bd0a4b15](https://sepolia.etherscan.io/tx/0x6b0502be077719750674b68a4215b56c8ba74435622f7bca09ebd449bd0a4b15)

3/ Open bets 100 seconds for tokenID 0 [0x8e9f0e259681932868f589c333f09cf34224263e49d197175700f0f7042be97c](https://sepolia.etherscan.io/tx/0x8e9f0e259681932868f589c333f09cf34224263e49d197175700f0f7042be97c)

4/ Close lottery to check that indeed if no one bets, no one gets the NFT 
[0x3de7fee929a3f8bc5f42192b74d4aad2ed653f7b64faf96ff4ba949777760fd4](https://sepolia.etherscan.io/tx/0x3de7fee929a3f8bc5f42192b74d4aad2ed653f7b64faf96ff4ba949777760fd4)

5/ Open bets for 1 hour for tokenID 0 [0x0f918d451cb430d51a938ae44c38e5070ecee9159cf663a6781652964b77953d](https://sepolia.etherscan.io/tx/0x0f918d451cb430d51a938ae44c38e5070ecee9159cf663a6781652964b77953d)


