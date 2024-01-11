//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "./hero.sol";

// actually in inheritance the bytecode is copied
// on override we can create a new way of implementation of virtual fun
// super keyword is used for actuall implementation of virtual fun
contract Mage is Hero{
    
    constructor() Hero(50){}

    function attack(address _enemyContract) public override{
        Enemy enemy = Enemy(_enemyContract);
        enemy.takeAttack(AttackTypes.Spell);
        super.attack(_enemyContract);
    }


}

contract Warrior is Hero{

    constructor() Hero(200){}

    function attack(address _enemyContract) public override{
        Enemy enemy = Enemy(_enemyContract);
        enemy.takeAttack(AttackTypes.Brawl);
        super.attack(_enemyContract);
    }

}