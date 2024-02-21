// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenTransfer {
    using SafeERC20 for IERC20;  

    function transfer(address token, address to, uint256 amount) external {
      IERC20(token).safeTransfer(to, amount);
    }
}
