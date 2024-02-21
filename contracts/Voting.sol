// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.24;

import "./library/VotingStorage.sol";

// this is inspired from erc2535 standard-diamond proxy

contract Voting {

    event ItemAdded(string _name, uint256 _id);
    event UserVoted(address user, string name, uint256 id);

    /**
     * @dev add the '_item' for voting
     * @param _item locking token address
     * @return itemId returns the item id of item being added
     * Emits a {ItemAdded} event.
     */
    function proposeItem(string memory _item) external returns(uint256 itemId) {
        require(bytes(_item).length > 0, "INVALID_ITEM_NAME");
        VotingStorage.Storage storage vs = VotingStorage.votingStorage();
        require(bytes(vs.itemData[_item].name).length == 0, "ITEM_ALREADY_ADDED");

        vs.itemCount++;
        vs.idToItemName[vs.itemCount] = _item;
        vs.itemData[_item] = VotingStorage.Item(_item, vs.itemCount, 0);
        vs.itemCollection.push(VotingStorage.Item(_item, vs.itemCount, 0));

        itemId = vs.itemCount;

        emit ItemAdded(_item, vs.itemCount);
    }

     /**
     * @dev user can vote for '_itemId'
     * @param _itemId locking token address
     * Emits a {UserVoted} event.
     */
    function voteForItem(uint256 _itemId) external {

        VotingStorage.Storage storage vs = VotingStorage.votingStorage();

        require(_itemId <= vs.itemCollection.length, "INVALID_ID");
        require(!vs.userVoteOnId[msg.sender][_itemId], "USER_ALREADY_VOTED");

        string memory _itemName = vs.idToItemName[_itemId];

        vs.itemCollection[_itemId -1].votes++;

        vs.itemData[_itemName].votes++;

        vs.userVoteOnId[msg.sender][_itemId] = true;

        emit UserVoted(msg.sender, _itemName, _itemId);
    }

    /**
     * @dev give the item data with maximum votes
     * @return Returns the item data with maximum votes
     */
    function getWinner() external view returns(VotingStorage.Item memory) {           
    // case of items with same vote is not handled. It can be handled as per requirement.

        VotingStorage.Storage storage vs = VotingStorage.votingStorage();


        uint256 maxVote = vs.itemCollection[0].votes;
        uint256 maxVoteItemId = vs.itemCollection[0].id;

        if(vs.itemCollection.length > 1) {
            for(uint i=1; i<vs.itemCollection.length; i++) {

                if(vs.itemCollection[i].votes > maxVote) {
                    maxVote = vs.itemCollection[i].votes;
                    maxVoteItemId = vs.itemCollection[i].id;
                }
            }
        }

        string memory _name = vs.idToItemName[maxVoteItemId];
        return vs.itemData[_name];
        
    }
}