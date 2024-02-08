//SPDX-license-Identifier: MIT

pragma solidity ^0.8.19;
import "./IERC20.sol";

contract Chest{

    function plunder(address[] memory _deployedAddress) external{
        for(uint i=0;i<_deployedAddress.length;i++){
            IERC20(_deployedAddress[i]).transfer(msg.sender, IERC20(_deployedAddress[i]).balanceOf(address(this)));
        }
    }

}