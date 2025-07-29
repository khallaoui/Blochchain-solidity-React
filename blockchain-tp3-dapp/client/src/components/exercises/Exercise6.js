// client/src/components/exercises/Exercise6.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';
import TransactionInfo from '../TransactionInfo';

const Exercise6 = ({ web3, contract, account }) => {
  const [tableau, setTableau] = useState([]);
  const [nouveauNombre, setNouveauNombre] = useState('');
  const [indexRecherche, setIndexRecherche] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);

  const loadTableau = useCallback(async () => {
    try {
      const tableauData = await contract.methods.afficheTableau().call();
      setTableau(tableauData.map(n => n.toString()));
    } catch (error) {
      setError('Erreur lors du chargement du tableau: ' + error.message);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      loadTableau();
    }
  }, [contract, loadTableau]);

  const handleAjouterNombre = async () => {
    try {
      setLoading(true);
      setError('');
      if (!nouveauNombre) {
        setError('Veuillez saisir un nombre');
        return;
      }
      const tx = await contract.methods.ajouterNombre(nouveauNombre).send({ 
        from: account,
        gas: 100000
      });
      setLastTransaction(tx);
      await loadTableau();
      setNouveauNombre('');
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetElement = async () => {
    try {
      setLoading(true);
      setError('');
      if (indexRecherche === '') {
        setError('Veuillez saisir un index');
        return;
      }
      const result = await contract.methods.getElement(indexRecherche).call();
      setResults(prev => ({ ...prev, element: result.toString(), index: indexRecherche }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculerSomme = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.calculerSomme().call();
      setResults(prev => ({ ...prev, somme: result.toString() }));
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
        <h2>Exercice 6 - Gestion des Tableaux</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Affichage du tableau */}
          <Card className="mb-4">
            <Card.Header>Tableau Actuel ({tableau.length} éléments)</Card.Header>
            <Card.Body>
              {tableau.length > 0 ? (
                <ListGroup variant="flush">
                  {tableau.map((nombre, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between">
                      <span>Index {index}:</span>
                      <strong>{nombre}</strong>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">Tableau vide</p>
              )}
            </Card.Body>
          </Card>

          {/* Ajouter un nombre */}
          <Card className="mb-4">
            <Card.Header>Ajouter un Nombre</Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Form.Control 
                    type="number" 
                    value={nouveauNombre}
                    onChange={(e) => setNouveauNombre(e.target.value)}
                    placeholder="Nombre à ajouter"
                  />
                </Col>
                <Col md={4}>
                  <Button 
                    variant="primary" 
                    onClick={handleAjouterNombre}
                    disabled={loading || !nouveauNombre}
                    className="w-100"
                  >
                    Ajouter
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Rechercher un élément */}
          <Card className="mb-4">
            <Card.Header>Rechercher un Élément</Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Form.Control 
                    type="number" 
                    value={indexRecherche}
                    onChange={(e) => setIndexRecherche(e.target.value)}
                    placeholder="Index à rechercher"
                    min="0"
                  />
                </Col>
                <Col md={4}>
                  <Button 
                    variant="info" 
                    onClick={handleGetElement}
                    disabled={loading || indexRecherche === ''}
                    className="w-100"
                  >
                    Rechercher
                  </Button>
                </Col>
              </Row>
              {results.element && (
                <Alert variant="success" className="mt-3">
                  Élément à l'index {results.index}: {results.element}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Calculer la somme */}
          <Card className="mb-4">
            <Card.Header>Calculer la Somme</Card.Header>
            <Card.Body>
              <Button 
                variant="success" 
                onClick={handleCalculerSomme}
                disabled={loading}
              >
                Calculer la Somme Totale
              </Button>
              {results.somme && (
                <Alert variant="success" className="mt-3">
                  Somme totale: {results.somme}
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

export default Exercise6;