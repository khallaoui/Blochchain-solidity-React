// client/src/components/exercises/Exercise2.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';

const Exercise2 = ({ web3, contract, account }) => {
  const [montantEther, setMontantEther] = useState('');
  const [montantWei, setMontantWei] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEtherEnWei = async () => {
    try {
      setLoading(true);
      setError('');
      if (!montantEther) {
        setError('Veuillez saisir un montant en Ether');
        return;
      }
      const result = await contract.methods.etherEnWei(montantEther).call();
      setResults(prev => ({ ...prev, etherEnWei: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWeiEnEther = async () => {
    try {
      setLoading(true);
      setError('');
      if (!montantWei) {
        setError('Veuillez saisir un montant en Wei');
        return;
      }
      const result = await contract.methods.weiEnEther(montantWei).call();
      setResults(prev => ({ ...prev, weiEnEther: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions utilitaires pour la conversion locale
  const convertEtherToWeiLocal = () => {
    if (montantEther && web3) {
      const weiValue = web3.utils.toWei(montantEther.toString(), 'ether');
      setResults(prev => ({ ...prev, localEtherToWei: weiValue }));
    }
  };

  const convertWeiToEtherLocal = () => {
    if (montantWei && web3) {
      const etherValue = web3.utils.fromWei(montantWei.toString(), 'ether');
      setResults(prev => ({ ...prev, localWeiToEther: etherValue }));
    }
  };

  if (!contract) {
    return <div className="text-center">Chargement du contrat...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Exercice 2 - Conversion Cryptomonnaies</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Conversion Ether vers Wei */}
          <Card className="mb-4">
            <Card.Header>Conversion Ether → Wei</Card.Header>
            <Card.Body>
              <p className="text-muted">
                1 Ether = 1,000,000,000,000,000,000 Wei (10^18)
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Montant en Ether</Form.Label>
                    <Form.Control 
                      type="number" 
                      step="0.000000000000000001"
                      value={montantEther}
                      onChange={(e) => setMontantEther(e.target.value)}
                      placeholder="Montant en ETH (ex: 1.5)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={handleEtherEnWei}
                    disabled={loading || !montantEther}
                    className="w-100 mb-2"
                  >
                    Convertir (Contrat)
                  </Button>
                </Col>
              </Row>
              <Button 
                variant="outline-primary" 
                onClick={convertEtherToWeiLocal}
                disabled={!montantEther}
                size="sm"
              >
                Convertir (Web3 Local)
              </Button>
              
              {results.etherEnWei && (
                <Alert variant="success" className="mt-3">
                  <strong>Résultat (Contrat):</strong> {results.etherEnWei} Wei
                </Alert>
              )}
              {results.localEtherToWei && (
                <Alert variant="info" className="mt-2">
                  <strong>Résultat (Web3 Local):</strong> {results.localEtherToWei} Wei
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Conversion Wei vers Ether */}
          <Card className="mb-4">
            <Card.Header>Conversion Wei → Ether</Card.Header>
            <Card.Body>
              <p className="text-muted">
                1,000,000,000,000,000,000 Wei = 1 Ether
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Montant en Wei</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={montantWei}
                      onChange={(e) => setMontantWei(e.target.value)}
                      placeholder="Montant en Wei (ex: 1000000000000000000)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="success" 
                    onClick={handleWeiEnEther}
                    disabled={loading || !montantWei}
                    className="w-100 mb-2"
                  >
                    Convertir (Contrat)
                  </Button>
                </Col>
              </Row>
              <Button 
                variant="outline-success" 
                onClick={convertWeiToEtherLocal}
                disabled={!montantWei}
                size="sm"
              >
                Convertir (Web3 Local)
              </Button>
              
              {results.weiEnEther && (
                <Alert variant="success" className="mt-3">
                  <strong>Résultat (Contrat):</strong> {results.weiEnEther} Ether
                </Alert>
              )}
              {results.localWeiToEther && (
                <Alert variant="info" className="mt-2">
                  <strong>Résultat (Web3 Local):</strong> {results.localWeiToEther} Ether
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Exemples de conversion */}
          <Card className="mb-4 bg-light">
            <Card.Header>Exemples de Conversion</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Ether → Wei</h6>
                  <ul className="small">
                    <li>1 ETH = 1,000,000,000,000,000,000 Wei</li>
                    <li>0.1 ETH = 100,000,000,000,000,000 Wei</li>
                    <li>0.01 ETH = 10,000,000,000,000,000 Wei</li>
                    <li>0.001 ETH = 1,000,000,000,000,000 Wei</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Wei → Ether</h6>
                  <ul className="small">
                    <li>1,000,000,000,000,000,000 Wei = 1 ETH</li>
                    <li>100,000,000,000,000,000 Wei = 0.1 ETH</li>
                    <li>10,000,000,000,000,000 Wei = 0.01 ETH</li>
                    <li>1,000,000,000,000,000 Wei = 0.001 ETH</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Informations techniques */}
          <Card className="mb-4">
            <Card.Header>Informations Techniques</Card.Header>
            <Card.Body>
              <p><strong>Différence entre les méthodes :</strong></p>
              <ul>
                <li><strong>Contrat Solidity :</strong> Utilise les fonctions <code>etherEnWei()</code> et <code>weiEnEther()</code> déployées sur la blockchain</li>
                <li><strong>Web3 Local :</strong> Utilise les utilitaires Web3.js <code>toWei()</code> et <code>fromWei()</code> côté client</li>
              </ul>
              <p className="text-muted">
                Les deux méthodes donnent le même résultat, mais la méthode contrat consomme du gas tandis que la méthode locale est gratuite.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <BlockchainInfo web3={web3} />
          
          {/* Raccourcis de conversion */}
          <Card className="mb-4">
            <Card.Header>Raccourcis</Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setMontantEther('1')}
                >
                  1 ETH
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setMontantEther('0.1')}
                >
                  0.1 ETH
                </Button>
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setMontantWei('1000000000000000000')}
                >
                  1 ETH en Wei
                </Button>
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setMontantWei('100000000000000000')}
                >
                  0.1 ETH en Wei
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Exercise2;