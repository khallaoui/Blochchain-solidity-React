// client/src/components/BlockchainInfo.js

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

const BlockchainInfo = ({ web3 }) => {
  const [blockInfo, setBlockInfo] = useState({
    blockNumber: null,
    gasLimit: null,
    timestamp: null
  });

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  const loadBlockchainInfo = useCallback(async () => {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(blockNumber);

      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const currentAccount = accounts[0];
        const balanceInWei = await web3.eth.getBalance(currentAccount);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');

        setAccount(currentAccount);
        setBalance(parseFloat(balanceInEth).toFixed(4));
      } else {
        setAccount('');
        setBalance('');
      }

      setBlockInfo({
        blockNumber,
        gasLimit: block?.gasLimit ?? 'Indisponible',
        timestamp: block?.timestamp
          ? new Date(block.timestamp * 1000).toLocaleString()
          : 'Indisponible'
      });
    } catch (error) {
      console.error('Erreur lors du chargement des infos blockchain :', error);
    }
  }, [web3]);

  useEffect(() => {
    let intervalId;

    if (web3 && web3.eth) {
      loadBlockchainInfo(); // Charge une fois immédiatement
      intervalId = setInterval(loadBlockchainInfo, 5000); // Met à jour toutes les 5s
    }

    return () => clearInterval(intervalId); // Nettoyage
  }, [web3, loadBlockchainInfo]);

  return (
    <Card className="mb-4">
      <Card.Header>Informations Blockchain</Card.Header>
      <Card.Body>
        <p><strong>Dernier bloc :</strong> {blockInfo.blockNumber ?? 'Chargement...'}</p>
        <p><strong>Gas Limit :</strong> {blockInfo.gasLimit ?? 'Chargement...'}</p>
        <p><strong>Timestamp :</strong> {blockInfo.timestamp ?? 'Chargement...'}</p>
        <p><strong>Compte connecté :</strong> {account || 'Aucun compte détecté'}</p>
        <p><strong>Solde :</strong> {balance ? `${balance} ETH` : 'Chargement...'}</p>
      </Card.Body>
    </Card>
  );
};

export default BlockchainInfo;
