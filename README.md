# Proxy Contract for Load Balancing and Function Delegation

This project demonstrates a proxy contract feature that delegates the function call to different implementation based on the function selector of the transaction or calldata.

This project includes Staking, voting and Token transfer implementation contract. In this Voting implementation is inspired from the ERC2535 Diamond Proxy standard.

<b>Challenge</b> - Main challenge was to handle the storage of the proxy contract itself. This was managed by storing the storage of proxy at random slot location pointed at "keccak256("load.balancer.storage.proxy")".

<h2>How to interact</h2>
This is custom proxy contract, so to interact with proxy contract, we have to design the custom user interface according to the functions that are to be called on proxy contract.
<h3>External Functions(called by owner of the contract)</h3>
1. addFunction(bytes4 _selector, address _address) - add the '_selector' function for implementation '_address'.
<br>
2. removeFunction(bytes4 _selector, address _address) - remove the '_selector' function for implementation '_address'.
<br>
3. updateFunction(bytes4 _oldSelector, bytes4 _newSelector, address _address) - update the '_oldSelector' function with '_newSelector'.
<br>
4. transferOwnership(address _newOwner) - transfer ownership from oldOwner to _newOwner
<h3> View Function</h3>
1. owner() - return the owner of the contract

<h1>Implementation Contracts</h1>

<h2>Stake Contract</h2>
User can stake ABC token for 30, 60 and 90 seconds(on mainnet it will be 30, 60 and 90 days) to earn more ABC tokens in rewards.
<h3>External Functions</h3>
1. stake(uint256 _time, uint256 _amount) - User can choose time, that are offered for staking, and token amount to stake.
<br>
2. claim(uint256 _txNo) - user can claim the rewards and principal amount by entering the transaction number or id(i.e. first stake has id 1, second stake has id 2, and so on..).

<h2>Voting Contract</h2>
Users can propose items for voting. One vote is allowed per user to vote on any item. Contract contains getWinner() function to see which item has got maximum number of votes.
<h3>External Functions</h3>
1. proposeItem(string memory _item) - user can propose item to vote upon. First proposed item has id of 1, second item has id of 2, and so on..
<br>
2. voteForItem(uint256 _itemId) - user can vote on the proposed item by their id number.
<h3> View Function</h3>
1. getWinner() - user can call this function to see which item has got maximum votes.

<h2>Token Transfer Contract</h2>
This is sample contract to transfer tokens to users. This contract does not contain the ownership functions, so it can be added as per requirement. Function 'transfer' can be called by anyone.
<h3>External Function</h3>
1. transfer(address token, address to, uint256 amount) - enter the 'token' address, 'to' address and 'amount' to transfer the tokens to user('to' address).
<br>

<h2>How to install and run</h2>
Clone this repository and install node packages. Run the following commands to see the contracts in action.
<br>

Try running some of the following tasks:

```shell
npx hardhat test
npx hardhat run scripts/deploy.js
```
