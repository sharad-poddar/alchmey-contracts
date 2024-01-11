//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract SHA is ERC20{

    ///@notice means only 10 tokens of SHA is generated 
    uint constant _initial_supply = 10 * 10**18;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
        _mint(msg.sender, _initial_supply);
    }

}