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
 
1/ Deploy NFT [0xad32e87b515612054d77f050a20e306c8a2b970ecb5de5657723a215f5085de7](https://sepolia.etherscan.io/tx/0xad32e87b515612054d77f050a20e306c8a2b970ecb5de5657723a215f5085de7)  
- NFT contract [0x87687a0d0ac168dc66f5819d3e0d56219b693e32](https://sepolia.etherscan.io/address/0x87687a0d0ac168dc66f5819d3e0d56219b693e32)

2/ Mint NFT with tokenID 85 [0xcad53c2a3bddca3d43b7a4c5f3e284e4c514b0bc6f2a3878651938284a895b3e](https://sepolia.etherscan.io/tx/0xcad53c2a3bddca3d43b7a4c5f3e284e4c514b0bc6f2a3878651938284a895b3e) 

3/ Deploy Lottery [0x8141ed32ad6c4ebed8becfe144020bc98b1e99dc58c98e7e202763b893dca25f](https://sepolia.etherscan.io/tx/0x8141ed32ad6c4ebed8becfe144020bc98b1e99dc58c98e7e202763b893dca25f)
- Lottery contract [0xc510e80F833Ed283212DE560b97097392F594323](https://sepolia.etherscan.io/address/0xc510e80F833Ed283212DE560b97097392F594323)
- Lottery Token contract [0x8795C5e3C00d2a464D18d60237B8b0eA16b6fD44](https://sepolia.etherscan.io/address/0x8795C5e3C00d2a464D18d60237B8b0eA16b6fD44)

4/ Purchase 30 tokens [0x031ed68ec2946f2664cc6b1520a2b5a13e5ddb947fc4df7708201d71504e7ab4](https://sepolia.etherscan.io/tx/0x031ed68ec2946f2664cc6b1520a2b5a13e5ddb947fc4df7708201d71504e7ab4)

5/ Transfer NFT tokenID = 85 from NFT contract creator to Lottery address [0x86f2894e256faf8a8a273f5a7b216143aac34f578b14fc46303f68f7abc721b8](https://sepolia.etherscan.io/tx/0x86f2894e256faf8a8a273f5a7b216143aac34f578b14fc46303f68f7abc721b8)

6/ Transfer ownership of NFT from NFT contract creator to Lottery address [0xa363a1212da61fc4017573e3f8ccaba50ba96dcc588533f0ac96093ceb7cba2c](https://sepolia.etherscan.io/tx/0xa363a1212da61fc4017573e3f8ccaba50ba96dcc588533f0ac96093ceb7cba2c)

7/ Open bets 200 seconds [0x12277b6cffb4c69cf97990b61a247a3da75ff5d0fe3afb1815d3e0e3e175d163](https://sepolia.etherscan.io/tx/0x12277b6cffb4c69cf97990b61a247a3da75ff5d0fe3afb1815d3e0e3e175d163)

8/ Place bet with 12 tokens [0xda6e398f002830b333f2b6feef1c6d1d800579dca154ced3903b66fae230cae2](https://sepolia.etherscan.io/tx/0xda6e398f002830b333f2b6feef1c6d1d800579dca154ced3903b66fae230cae2) 

9/ Close lottery, where we see that once it's closed, NFT with tokenID = 85 gets transferred to the winner   [0xb2f9949bf6342e1aa4fb093ca78d08ec250bd8998509dcae07d5c105edefb417](https://sepolia.etherscan.io/tx/0xb2f9949bf6342e1aa4fb093ca78d08ec250bd8998509dcae07d5c105edefb417) 


Next steps and issues regarding NFT lottery part:

As of today, this means that this can only be done once, because the NFT contract creator has to transfer ownership to the lottery in order to execute the transfer. It would be cool to have:

- Any NFT creator has to be able to transfer NFTs to lottery contract
- Once that's done, lottery contract has to be able to transfer NFT to winner
- We could separate owner pool from lottery contract somehow. Now that the winner earns the NFT as a prize and not the tokens, if we were able to differentiate between them, the "prize" in tokens (amount bet by all users) can go to the NFT original owner (the one who has transferred it to lottery), and the fee could be split between "charity" and "revenue".



