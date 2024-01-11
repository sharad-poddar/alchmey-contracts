//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface Enemy {
	function takeAttack(Hero.AttackTypes attackType) external;
}

///@notice We can also specify abstract contracts where virtual functions do 
///not require an implementation. However, these functions must be implemented 
///at some point by a derived contract.
abstract contract Hero{

    uint public health;
    uint public energy = 10;

    enum AttackTypes { Brawl, Spell }
    
    constructor(uint _health){
        health = _health;
    }

    function takeDamage(uint _damage) external{
        health -= _damage;
    }

    function attack(address) public virtual{
        energy--;
    }

}