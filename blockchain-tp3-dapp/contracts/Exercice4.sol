// contracts/Exercice4.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercice4 {
    function estPositif(int256 nombre) public pure returns (bool) {
        return nombre > 0;
    }
}