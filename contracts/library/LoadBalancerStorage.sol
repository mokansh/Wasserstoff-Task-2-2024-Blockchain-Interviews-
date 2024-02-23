//SPDX-License-Identifier:UNLICENSED

pragma solidity 0.8.24;

error InvalidImplementationAddress(address _address);
error FunctionAlreadyAdded(bytes4 _selector, address _address);
error FunctionNotPresent(bytes4 _selector, address _address);
error NotContractOwner(address _user, address _contractOwner);

library LoadBalancerStorage {
    bytes32 constant BALANCER_STORAGE_POSITION =
        keccak256("load.balancer.storage.proxy");

    struct Storage {
        mapping(bytes4 => address) selectorToFacet;
        address contractOwner;
    }

    event FunctionAdded(bytes4 _selector, address _address);
    event FunctionRemoved(bytes4 _selector, address _address);
    event FunctionUpdated(
        bytes4 _oldSelector,
        bytes4 _newSelector,
        address _address
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    function LBStorage() internal pure returns (Storage storage lbs) {
        bytes32 position = BALANCER_STORAGE_POSITION;
        assembly {
            lbs.slot := position
        }
    }

    function addFunction(bytes4 _selector, address _address) internal {
        Storage storage lbs = LBStorage();
        if (_address == address(0))
            revert InvalidImplementationAddress(_address);
        if (lbs.selectorToFacet[_selector] != address(0))
            revert FunctionAlreadyAdded(_selector, _address);

        lbs.selectorToFacet[_selector] = _address;

        emit FunctionAdded(_selector, _address);
    }

    function removeFunction(bytes4 _selector, address _address) internal {
        Storage storage lbs = LBStorage();
        if (_address == address(0))
            revert InvalidImplementationAddress(_address);
        if (lbs.selectorToFacet[_selector] == address(0))
            revert FunctionNotPresent(_selector, _address);

        delete lbs.selectorToFacet[_selector];

        emit FunctionRemoved(_selector, _address);
    }

    function updateFunction(
        bytes4 _oldSelector,
        bytes4 _newSelector,
        address _address
    ) internal {
        Storage storage lbs = LBStorage();
        if (_address == address(0))
            revert InvalidImplementationAddress(_address);
        if (lbs.selectorToFacet[_oldSelector] == address(0))
            revert FunctionNotPresent(_oldSelector, _address);

        delete lbs.selectorToFacet[_oldSelector];
        lbs.selectorToFacet[_newSelector] = _address;

        emit FunctionUpdated(_oldSelector, _newSelector, _address);
    }

    function setContractOwner(address _newOwner) internal {
        Storage storage lbs = LBStorage();
        address previousOwner = lbs.contractOwner;
        lbs.contractOwner = _newOwner;
        emit OwnershipTransferred(previousOwner, _newOwner);
    }

    function contractOwner() internal view returns (address contractOwner_) {
        contractOwner_ = LBStorage().contractOwner;
    }

    function enforceIsContractOwner() internal view {
        if (msg.sender != LBStorage().contractOwner) {
            revert NotContractOwner(msg.sender, LBStorage().contractOwner);
        }
    }
}
