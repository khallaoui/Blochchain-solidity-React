// contracts/Exercice5.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercice5 {
    function estPair(uint256 nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }
}