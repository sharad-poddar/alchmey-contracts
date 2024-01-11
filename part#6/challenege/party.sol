//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
contract Party{

    uint256 public deposit_amount;
    address[] members;
    mapping(address => bool) isJoined;

    constructor(uint256 _amount){
        deposit_amount = _amount;
    }

    ///@notice joining members
    ///@dev member can only join for fixed amount and if it is unique address
    function rsvp() public payable{
        require(msg.value == deposit_amount);
        require(!isJoined[msg.sender]);
        members.push(msg.sender);
        isJoined[msg.sender] = true;
    }

    ///@notice paying the contract money to bill of order and equally divides among members
    function payBill(address _to, uint _totalBill) public payable{
        require(address(this).balance >= _totalBill);
        (bool sent, ) = payable(_to).call{value: _totalBill}("");
        require(sent);
        uint partsMoney = address(this).balance / members.length; 
        for(uint i=0;i<members.length;i++){
            (bool sentToMember,) = payable(members[i]).call{value: partsMoney}("");
            require(sentToMember);
        }
    }   
    
}