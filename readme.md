# Solidity Learning projects

This repo contains all the solidity projects i built to learn solidity

> :warning: **None of these contracts are supposed to run in production.**:

1. ### [Will contract](Will.sol)

	1. let's an person to create a will for another person
	2. Add family members
	3. signal contract if will owner is deceased
	4. transfer funds to family members


2. ### [Basic coin contract](VeryBasicCoin.sol)

	Basically a dumbed down version of an ERC-20 token

3. ### [staking and rewards smart contract](./staking-contract)

	This folder contains 3 contracts, 2 of them [Mock Tether](./staking-contract/contracts/Tether.sol) and [Reward Token](./staking-contract/contracts/Reward.sol) are ERC-20 tokens and [Bank](./staking-contract/contracts/Bank.sol) is used to stake [Mock Tether](./staking-contract/contracts/Tether.sol) to earn rewards in form of [Reward Token](./staking-contract/contracts/Reward.sol). 

	You can stake a token, un stake the tokens, and admin can send rewards to stakers.

	This folder also contains very poorly written test to make sure above smart contracts are working fine.


	 