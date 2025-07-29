// contracts/Exercice7.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Forme {
    uint public x;
    uint public y;
    
    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }
    
    function deplacerForme(uint dx, uint dy) public {
        x = dx;
        y = dy;
    }
    
    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }
    
    function afficheInfos() public pure virtual returns (string memory) {
        return "Je suis une forme";
    }
    
    function surface() public view virtual returns (uint);
}

contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur
    
    constructor(uint _x, uint _y, uint _longueur, uint _largeur) 
        Forme(_x, _y) {
        lo = _longueur;
        la = _largeur;
    }
    
    function surface() public view override returns (uint) {
        return lo * la;
    }
    
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }
    
    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
}