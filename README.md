# Proxy Contract for Load Balancing and Function Delegation

This project demonstrates a proxy contract feature that delegates the function call to different implementation based on the function selector of the transaction or calldata.

This project includes Staking, voting and Token transfer implementation contract. In this Voting implementation is inspired from the ERC2535 Diamond Proxy standard.

This is custom proxy contract, so to interact with proxy contract, we have to design the custom user interface according to the functions that are to be called on proxy contract.


Try running some of the following tasks:

```shell
npx hardhat test
npx hardhat run scripts/deploy.js
```
