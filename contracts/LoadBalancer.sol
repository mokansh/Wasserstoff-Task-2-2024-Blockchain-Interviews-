// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "./library/LoadBalancerStorage.sol";

contract LoadBalancer {

    constructor(address _owner) {
      LoadBalancerStorage.setContractOwner(_owner);
    }

    /**
     * @dev add the '_selector' function for implementation '_address'
     * @param _selector function selector to add
     * @param _address implementation of function selector
     */
    function addFunction(bytes4 _selector, address _address) external {
      LoadBalancerStorage.enforceIsContractOwner();
      LoadBalancerStorage.addFunction(_selector, _address);
    }

    /**
     * @dev remove the '_selector' function for implementation '_address'
     * @param _selector function selector to remove
     * @param _address implementation of function selector
     */
    function removeFunction(bytes4 _selector, address _address) external {
      LoadBalancerStorage.enforceIsContractOwner();
      LoadBalancerStorage.removeFunction(_selector, _address);
    }

    /**
     * @dev update the '_oldSelector' function with '_newSelector'
     * @param _oldSelector function selector to update
     * @param _newSelector function selector that will replace '_oldSelector'
     * @param _address implementation of function selector
     */
    function updateFunction(bytes4 _oldSelector, bytes4 _newSelector, address _address) external {
      LoadBalancerStorage.enforceIsContractOwner();
      LoadBalancerStorage.updateFunction(_oldSelector, _newSelector, _address);
    }

    /**
     * @dev transfer ownership from oldOwner to _newOwner
     * @param _newOwner function selector to update
     */
    function transferOwnership(address _newOwner) external {
      LoadBalancerStorage.enforceIsContractOwner();
      LoadBalancerStorage.setContractOwner(_newOwner);
    }

    /**
     * @dev return the owner of the contract
     */
    function owner() external view returns(address) {
      return LoadBalancerStorage.contractOwner();
    }

    receive() external payable {}

    fallback() external payable {

        LoadBalancerStorage.Storage storage lbs;
        bytes32 position = LoadBalancerStorage.BALANCER_STORAGE_POSITION;
        // get load balancer storage
        assembly {
            lbs.slot := position
        }

        // get facet/implementation from function selector
        address facet = lbs.selectorToFacet[msg.sig];
        require(facet != address(0), "Function not found");

        // Execute external function from facet/implementation using delegatecall and return any value.
        assembly {
            // copy function selector and any arguments
            calldatacopy(0, 0, calldatasize())

            // execute function call using the facet
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            // get any return value
            returndatacopy(0, 0, returndatasize())
            // return any return value or error back to the caller
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }
}
