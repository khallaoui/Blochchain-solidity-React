// contracts/Exercice1.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercice1 {
    uint256 public nombre1;
    uint256 public nombre2;
    
    constructor(uint256 _nombre1, uint256 _nombre2) {
        nombre1 = _nombre1;
        nombre2 = _nombre2;
    }
    
    // Fonction view qui utilise les variables d'état
    function addition1() public view returns (uint256) {
        return nombre1 + nombre2;
    }
    
    // Fonction pure qui prend des paramètres
    function addition2(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
    
    // Fonctions pour modifier les variables d'état
    function setNombre1(uint256 _nombre1) public {
        nombre1 = _nombre1;
    }
    
    function setNombre2(uint256 _nombre2) public {
        nombre2 = _nombre2;
    }
}