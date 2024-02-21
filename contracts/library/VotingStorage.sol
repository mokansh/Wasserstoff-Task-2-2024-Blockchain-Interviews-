//SPDX-License-Identifier:UNLICENSED

pragma solidity 0.8.24;

library VotingStorage {
    bytes32 constant VOTING_STORAGE_POSITION = keccak256("diamond.storage.voting");
    bytes32 constant VOTING_STORAGE_ITEM_POSITION = keccak256("diamond.storage.voting.item");


    
    struct Storage {
        // counter to give item their id
        uint256 itemCount;   

        // item id => particular item data
        mapping(string => Item) itemData;

        // item id => item name;
        mapping(uint256 => string) idToItemName;

        // user => item id => vote
        mapping(address => mapping(uint256 => bool)) userVoteOnId;

        Item[] itemCollection;

    }                 

    struct Item {                          
        string name;
        uint256 id;
        uint256 votes;
    }  

    function votingStorage() internal pure returns(Storage storage vs) {
        bytes32 position = VOTING_STORAGE_POSITION;
        assembly {
            vs.slot := position
        }
    }

    function votingStorageItem() internal pure returns(Item storage vs) {
        bytes32 position = VOTING_STORAGE_ITEM_POSITION;
        assembly {
            vs.slot := position
        }
    }
}
