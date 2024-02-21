// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SampleToken is ERC20, Ownable {
   
   constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {
    _mint(msg.sender, 1000e6 * 10**decimals());
   }

   function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
   }

}
