// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
contract Switch{

    address receipt;
    uint256 startTime;
    address private owner;

    constructor(address _receipt) payable{
        receipt = _receipt;
        startTime = block.timestamp;
        owner = msg.sender;
    }

    ///@dev person can withdraw the amount only after freezing timeperiod
    function withdraw() public{
        require(block.timestamp > startTime + 52 weeks);
        (bool sent, ) = payable(receipt).call{value: address(this).balance}("");
        require(sent);
    }   

    ///@notice owner can change the deployed time or again reset the time of inactivity
    function ping() public{
        require(msg.sender == owner);
        startTime = block.timestamp;
    }

}