// client/src/components/exercises/Exercise1.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';
import TransactionInfo from '../TransactionInfo';

const Exercise1 = ({ web3, contract, account }) => {
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [paramA, setParamA] = useState('');
  const [paramB, setParamB] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);

  const loadContractData = useCallback(async () => {
    try {
      const nombre1 = await contract.methods.nombre1().call();
      const nombre2 = await contract.methods.nombre2().call();
      setResults(prev => ({ ...prev, nombre1, nombre2 }));
    } catch (error) {
      setError('Erreur lors du chargement des données: ' + error.message);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      loadContractData();
    }
  }, [contract, loadContractData]);

  const handleAddition1 = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.addition1().call();
      setResults(prev => ({ ...prev, addition1: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddition2 = async () => {
    try {
      setLoading(true);
      setError('');
      if (!paramA || !paramB) {
        setError('Veuillez saisir les deux paramètres');
        return;
      }
      const result = await contract.methods.addition2(paramA, paramB).call();
      setResults(prev => ({ ...prev, addition2: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetNombre1 = async () => {
    try {
      setLoading(true);
      setError('');
      if (!nombre1) {
        setError('Veuillez saisir un nombre');
        return;
      }
      const tx = await contract.methods.setNombre1(nombre1).send({ 
        from: account,
        gas: 50000
      });
      setLastTransaction(tx);
      await loadContractData();
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetNombre2 = async () => {
    try {
      setLoading(true);
      setError('');
      if (!nombre2) {
        setError('Veuillez saisir un nombre');
        return;
      }
      const tx = await contract.methods.setNombre2(nombre2).send({ 
        from: account,
        gas: 50000
      });
      setLastTransaction(tx);
      await loadContractData();
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return <div className="text-center">Chargement du contrat...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Exercice 1 - Fonctions d'Addition</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Variables d'état */}
          <Card className="mb-4">
            <Card.Header>Variables d'État</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nombre 1: {results.nombre1}</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={nombre1}
                      onChange={(e) => setNombre1(e.target.value)}
                      placeholder="Nouveau nombre 1"
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleSetNombre1}
                      disabled={loading}
                      className="mt-2"
                    >
                      Modifier Nombre 1
                    </Button>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nombre 2: {results.nombre2}</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={nombre2}
                      onChange={(e) => setNombre2(e.target.value)}
                      placeholder="Nouveau nombre 2"
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleSetNombre2}
                      disabled={loading}
                      className="mt-2"
                    >
                      Modifier Nombre 2
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Fonction addition1 (view) */}
          <Card className="mb-4">
            <Card.Header>Addition1() - Fonction View</Card.Header>
            <Card.Body>
              <p>Calcule la somme des variables d'état nombre1 et nombre2</p>
              <Button 
                variant="success" 
                onClick={handleAddition1}
                disabled={loading}
              >
                Calculer Addition1
              </Button>
              {results.addition1 && (
                <Alert variant="info" className="mt-3">
                  Résultat: {results.addition1}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Fonction addition2 (pure) */}
          <Card className="mb-4">
            <Card.Header>Addition2() - Fonction Pure</Card.Header>
            <Card.Body>
              <p>Calcule la somme de deux paramètres passés en entrée</p>
              <Row>
                <Col md={6}>
                  <Form.Control 
                    type="number" 
                    value={paramA}
                    onChange={(e) => setParamA(e.target.value)}
                    placeholder="Paramètre A"
                  />
                </Col>
                <Col md={6}>
                  <Form.Control 
                    type="number" 
                    value={paramB}
                    onChange={(e) => setParamB(e.target.value)}
                    placeholder="Paramètre B"
                  />
                </Col>
              </Row>
              <Button 
                variant="success" 
                onClick={handleAddition2}
                disabled={loading}
                className="mt-3"
              >
                Calculer Addition2
              </Button>
              {results.addition2 && (
                <Alert variant="info" className="mt-3">
                  Résultat: {results.addition2}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <BlockchainInfo web3={web3} />
          {lastTransaction && (
            <TransactionInfo transaction={lastTransaction} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Exercise1;