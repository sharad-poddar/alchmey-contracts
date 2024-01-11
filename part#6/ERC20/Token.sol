//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

///@notice Events give external applications a way to "listen in" on the 
///happenings inside of the EVM. Events can essentially act as hooks for 
///an application to perform some action.

contract Token{

    string public name = 'SHA';
    string public symbol = 'SHA';
    uint8 public decimals = 18;

    uint public totalSupply;
    mapping(address => uint256) balance;

    constructor(){
        totalSupply = 1000 * 10**18;
        balance[msg.sender] = totalSupply;
    }

    event Transfer(address from, address to, uint256 value);


    function balanceOf(address _accountHolder) public view returns(uint){
        return balance[_accountHolder];
    }

    function transfer(address _receipt, uint _amount) public returns(bool){
        require(balance[msg.sender] > _amount);
        balance[msg.sender]-=_amount;
        balance[_receipt]+=_amount;
        emit Transfer(msg.sender, _receipt, _amount);
        return true;
    }


    




}