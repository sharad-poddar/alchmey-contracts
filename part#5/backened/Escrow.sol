//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
contract Escrow{

    address public depositor;       // contract deployer
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;

    event Approved(uint);

    constructor(address _arbiter, address _beneficiary) payable{
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    function approve() public{
        require(msg.sender == arbiter);
        uint balanceTranfer = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: address(this).balance}("");
        require(sent);
        isApproved = true;
        emit Approved(balanceTranfer);
    }

}