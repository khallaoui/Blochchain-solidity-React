// contracts/Exercice8.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Payment {
    address public recipient;
    
    constructor(address _recipient) {
        recipient = _recipient;
    }
    
    function receivePayment() public payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
    }
    
    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer");
        payable(recipient).transfer(address(this).balance);
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}