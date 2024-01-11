//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
contract MultiSig{

    address[] public owners;
    uint256 public required;    // no of owners to aggress for execution of txn
    uint public transactionCount;

    struct Transaction{
        address to;
        uint256 value;
        bytes data;
        bool executed;
    }

    mapping(uint => Transaction) public transactionFromId;
    mapping(uint => mapping(address => bool)) public confirmations;


    ///@notice require owners and no of confirmation
    ///@dev owner > 0 and noOfConfirmation > 0 and noOfConfirmation < owners
    constructor(address[] memory _owners, uint256 _required){
        require(_owners.length > 0);
        require(_required > 0);
        require(_required < _owners.length);
        owners = _owners;
        required = _required;
    }

    ///@notice helper function
    function addTransaction(address _to, uint256 _amount, bytes memory _data) internal returns(uint){
        transactionFromId[transactionCount] = Transaction(_to, _amount, _data, false);
        transactionCount++;
        return transactionCount - 1;
    }

    ///@notice confirming txn by owners
    function confirmTransaction(uint _transactionId) public{

        address itsOwner;
        for(uint i=0;i<owners.length;i++){
            if(msg.sender == owners[i]){
                itsOwner = msg.sender;
            }
        }
        require(itsOwner == msg.sender);
        confirmations[_transactionId][msg.sender]=true;
        
        if(isConfirmed(_transactionId)){
            executeTransaction(_transactionId);
        }
    }

    ///@notice finding if we have to execute txn or not
    function getConfirmationsCount(uint _transactionId) public view returns(uint256){
        uint256 count = 0;
        for(uint i=0;i<owners.length;i++){
            if(confirmations[_transactionId][owners[i]] == true){
                count++;
            }
        }
        return count;
    }

    ///@notice uploading the transaction data on-chain
    function submitTransaction(address _to, uint _amount, bytes memory _data) external{
        uint transactionId = addTransaction(_to, _amount, _data);
        confirmTransaction(transactionId);
    }

    ///@notice checking if the transaction can be executed or not
    function isConfirmed(uint _transactionId) public view returns(bool){
        uint count = getConfirmationsCount(_transactionId);
        if(count >= required){
            return true;
        }
        return false;
    }

    ///@notice executing the function if it is confirmed 
    function executeTransaction(uint _transactionId) public{
        require(!transactionFromId[_transactionId].executed);
        require(isConfirmed(_transactionId));
        address to =  transactionFromId[_transactionId].to;
        uint256 amount = transactionFromId[_transactionId].value;
        bytes memory data = transactionFromId[_transactionId].data;
        (bool sent,) = payable(to).call{value: amount}(data);
        require(sent);
        transactionFromId[_transactionId].executed = true;
    }

    ///@notice it allows wallet to receive amount, without calling any function
    receive() external payable{}

}