// client/src/components/exercises/Exercise3.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';
import TransactionInfo from '../TransactionInfo';

const Exercise3 = ({ web3, contract, account }) => {
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [chaine1, setChaine1] = useState('');
  const [chaine2, setChaine2] = useState('');
  const [chaineAutre, setChaineAutre] = useState('');
  const [chaineTest, setChaineTest] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);

  const loadMessage = useCallback(async () => {
    try {
      const currentMessage = await contract.methods.getMessage().call();
      setMessage(currentMessage);
    } catch (error) {
      setError('Erreur lors du chargement du message: ' + error.message);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      loadMessage();
    }
  }, [contract, loadMessage]);

  const handleSetMessage = async () => {
    try {
      setLoading(true);
      setError('');
      const tx = await contract.methods.setMessage(newMessage).send({ 
        from: account,
        gas: 100000
      });
      setLastTransaction(tx);
      await loadMessage();
      setNewMessage('');
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConcatener = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.concatener(chaine1, chaine2).call();
      setResults(prev => ({ ...prev, concatener: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConcatenerAvec = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.concatenerAvec(chaineAutre).call();
      setResults(prev => ({ ...prev, concatenerAvec: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLongueur = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.longueur(chaineTest).call();
      setResults(prev => ({ ...prev, longueur: result }));
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleComparer = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.comparer(chaine1, chaine2).call();
      setResults(prev => ({ ...prev, comparer: result }));
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
        <h2>Exercice 3 - Gestion des Chaînes</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Message d'état */}
          <Card className="mb-4">
            <Card.Header>Message d'État</Card.Header>
            <Card.Body>
              <p><strong>Message actuel:</strong> "{message}"</p>
              <Form.Group>
                <Form.Control 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Nouveau message"
                />
                <Button 
                  variant="primary" 
                  onClick={handleSetMessage}
                  disabled={loading || !newMessage}
                  className="mt-2"
                >
                  Modifier le Message
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Concaténation */}
          <Card className="mb-4">
            <Card.Header>Concaténation</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Chaîne 1</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={chaine1}
                      onChange={(e) => setChaine1(e.target.value)}
                      placeholder="Première chaîne"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Chaîne 2</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={chaine2}
                      onChange={(e) => setChaine2(e.target.value)}
                      placeholder="Deuxième chaîne"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button 
                variant="success" 
                onClick={handleConcatener}
                disabled={loading || !chaine1 || !chaine2}
                className="me-2"
              >
                Concaténer
              </Button>
              <Button 
                variant="info" 
                onClick={handleComparer}
                disabled={loading || !chaine1 || !chaine2}
              >
                Comparer
              </Button>
              {results.concatener && (
                <Alert variant="success" className="mt-3">
                  Concaténation: "{results.concatener}"
                </Alert>
              )}
              {results.comparer !== undefined && (
                <Alert variant={results.comparer ? "success" : "warning"} className="mt-3">
                  Comparaison: {results.comparer ? "Identiques" : "Différentes"}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Autres fonctions */}
          <Card className="mb-4">
            <Card.Header>Autres Fonctions</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Concaténer avec le message d'état</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={chaineAutre}
                      onChange={(e) => setChaineAutre(e.target.value)}
                      placeholder="Chaîne à ajouter"
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleConcatenerAvec}
                      disabled={loading || !chaineAutre}
                      className="mt-2"
                    >
                      Concaténer avec Message
                    </Button>
                    {results.concatenerAvec && (
                      <Alert variant="info" className="mt-2">
                        Résultat: "{results.concatenerAvec}"
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Calculer la longueur</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={chaineTest}
                      onChange={(e) => setChaineTest(e.target.value)}
                      placeholder="Chaîne à mesurer"
                    />
                    <Button 
                      variant="warning" 
                      onClick={handleLongueur}
                      disabled={loading || !chaineTest}
                      className="mt-2"
                    >
                      Calculer Longueur
                    </Button>
                    {results.longueur && (
                      <Alert variant="info" className="mt-2">
                        Longueur: {results.longueur} caractères
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>
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

export default Exercise3;