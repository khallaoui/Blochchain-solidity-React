// client/src/components/exercises/Exercise8.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';
import TransactionInfo from '../TransactionInfo';

const Exercise8 = ({ web3, contract, account }) => {
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState('0');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);

  const loadContractInfo = useCallback(async () => {
    try {
      const recipientAddress = await contract.methods.recipient().call();
      const contractBalance = await contract.methods.getBalance().call();
      setRecipient(recipientAddress);
      setBalance(web3.utils.fromWei(contractBalance, 'ether'));
    } catch (error) {
      setError('Erreur lors du chargement des informations: ' + error.message);
    }
  }, [contract, web3]);

  useEffect(() => {
    if (contract) {
      loadContractInfo();
    }
  }, [contract, loadContractInfo]);

  const handleReceivePayment = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
        setError('Veuillez saisir un montant valide');
        return;
      }

      const amountInWei = web3.utils.toWei(paymentAmount.toString(), 'ether');
      
      const tx = await contract.methods.receivePayment().send({ 
        from: account,
        value: amountInWei,
        gas: 100000
      });
      
      setLastTransaction(tx);
      await loadContractInfo();
      setPaymentAmount('');
      setSuccess(`Paiement de ${paymentAmount} ETH effectué avec succès!`);
      
    } catch (error) {
      setError('Erreur lors du paiement: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      if (account.toLowerCase() !== recipient.toLowerCase()) {
        setError('Seul le destinataire peut effectuer un retrait');
        return;
      }

      const tx = await contract.methods.withdraw().send({ 
        from: account,
        gas: 100000
      });
      
      setLastTransaction(tx);
      await loadContractInfo();
      setSuccess('Retrait effectué avec succès!');
      
    } catch (error) {
      setError('Erreur lors du retrait: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isRecipient = account && recipient && 
    account.toLowerCase() === recipient.toLowerCase();

  if (!contract) {
    return <div className="text-center">Chargement du contrat...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Exercice 8 - Système de Paiement</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={8}>
          {/* Informations du contrat */}
          <Card className="mb-4">
            <Card.Header>Informations du Contrat</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Destinataire:</strong></p>
                  <small className="text-muted">{recipient}</small>
                  {isRecipient && (
                    <Badge variant="success" className="ml-2">Vous êtes le destinataire</Badge>
                  )}
                </Col>
                <Col md={6}>
                  <p><strong>Solde du contrat:</strong></p>
                  <h4 className="text-primary">{balance} ETH</h4>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Effectuer un paiement */}
          <Card className="mb-4">
            <Card.Header>Effectuer un Paiement</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Envoyez des Ethers vers ce contrat de paiement
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Montant (ETH)</Form.Label>
                    <Form.Control 
                      type="number" 
                      step="0.001"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Montant en ETH (ex: 0.1)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="success" 
                    onClick={handleReceivePayment}
                    disabled={loading || !paymentAmount}
                    className="w-100"
                  >
                    {loading ? 'Envoi...' : 'Envoyer Paiement'}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Retirer les fonds */}
          <Card className="mb-4">
            <Card.Header>
              Retirer les Fonds
              {!isRecipient && (
                <Badge variant="warning" className="ml-2">
                  Réservé au destinataire
                </Badge>
              )}
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                {isRecipient 
                  ? "Vous pouvez retirer tous les fonds du contrat"
                  : "Seul le destinataire peut retirer les fonds"
                }
              </p>
              <Button 
                variant={isRecipient ? "warning" : "secondary"}
                onClick={handleWithdraw}
                disabled={loading || !isRecipient || parseFloat(balance) === 0}
              >
                {loading ? 'Retrait...' : `Retirer ${balance} ETH`}
              </Button>
              {parseFloat(balance) === 0 && (
                <p className="text-muted mt-2">Aucun fonds à retirer</p>
              )}
            </Card.Body>
          </Card>

          {/* Instructions d'utilisation */}
          <Card className="mb-4 bg-light">
            <Card.Header>Instructions d'Utilisation</Card.Header>
            <Card.Body>
              <ol>
                <li>Utilisez la fonction "Effectuer un Paiement" pour envoyer des ETH au contrat</li>
                <li>Le montant sera ajouté au solde du contrat</li>
                <li>Seul le destinataire peut retirer les fonds avec "Retirer les Fonds"</li>
                <li>Le retrait transfère tout le solde vers l'adresse du destinataire</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <BlockchainInfo web3={web3} />
          {lastTransaction && (
            <TransactionInfo transaction={lastTransaction} />
          )}
          
          {/* Informations compte */}
          <Card className="mb-4">
            <Card.Header>Votre Compte</Card.Header>
            <Card.Body>
              <p><strong>Adresse:</strong></p>
              <small className="text-muted">{account}</small>
              <p className="mt-2">
                <strong>Statut:</strong> {' '}
                <Badge variant={isRecipient ? "success" : "info"}>
                  {isRecipient ? "Destinataire" : "Utilisateur"}
                </Badge>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Exercise8;