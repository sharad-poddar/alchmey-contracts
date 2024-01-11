//SPDX-License-Identifier: MIT

///@notice contract related to access control of function
pragma solidity ^0.8.19;
contract Ownable{
    
    address owner;
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function foo() public pure virtual returns (uint) {
        return 10;
    }
}


///@notice change the number
contract MyContract is Ownable{

    uint public x = 123;
    //modifier can be written with brackets or may not be
    function changeNumber(uint _x) public onlyOwner{
        x = _x;
    }

    ///@dev overriden example
    function foo() public pure override returns (uint) {
        return 15;  
    }
}



///@notice token contract
contract Token is Ownable{

    mapping(address => uint) balance;

    function mint(uint _amount) public{
        balance[msg.sender] += _amount;
    }


}