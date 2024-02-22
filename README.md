# Proxy Contract for Load Balancing and Function Delegation

This project demonstrates a proxy contract feature that delegates the function call to different implementation based on the function selector of the transaction or calldata.

This project includes Staking, voting and Token transfer implementation contract. In this Voting implementation is inspired from the ERC2535 Diamond Proxy standard.

<h2>How to interact</h2>
This is custom proxy contract, so to interact with proxy contract, we have to design the custom user interface according to the functions that are to be called on proxy contract.

<h2>Stake Contract</h2>
User can stake ABC token for 30, 60 and 90 seconds(on mainnet it will be 30, 60 and 90 days) to earn more ABC tokens in rewards.
<h3>Functions</h3>
1. stake(uint256 _time, uint256 _amount) - User can choose time, that are offered for staking, and token amount to stake.
2. claim(uint256 _txNo) - user can claim the rewards and principal amount by entering the transaction number or id(i.e. first stake has id 1, second stake has id 2, and so on..).

<h2>Voting Contract</h2>
Users can propose items for voting. One vote is allowed per user to vote on any item. Contract contains getWinner() function to see which item has got maximum number of votes.

<h2>Token Transfer Contract</h2>
This is sample contract to transfer tokens to users.


Try running some of the following tasks:

```shell
npx hardhat test
npx hardhat run scripts/deploy.js
```
