// client/src/components/exercises/Exercise4.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';

const Exercise4 = ({ web3, contract, account }) => {
  const [nombre, setNombre] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState([]);

  const handleEstPositif = async () => {
    try {
      setLoading(true);
      setError('');
      if (nombre === '') {
        setError('Veuillez saisir un nombre');
        return;
      }
      const isPositive = await contract.methods.estPositif(nombre).call();
      setResult(isPositive);
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const runTests = async () => {
    const testCases = [
      { value: 5, expected: true, description: "Nombre positif" },
      { value: -3, expected: false, description: "Nombre négatif" },
      { value: 0, expected: false, description: "Zéro" },
      { value: 100, expected: true, description: "Grand nombre positif" },
      { value: -100, expected: false, description: "Grand nombre négatif" },
      { value: 1, expected: true, description: "Un" },
      { value: -1, expected: false, description: "Moins un" }
    ];

    setLoading(true);
    setError('');
    const results = [];

    try {
      for (const testCase of testCases) {
        const result = await contract.methods.estPositif(testCase.value).call();
        results.push({
          ...testCase,
          actual: result,
          passed: result === testCase.expected
        });
      }
      setTestResults(results);
    } catch (error) {
      setError('Erreur lors des tests: ' + error.message);
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
        <h2>Exercice 4 - Nombre Positif</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Test manuel */}
          <Card className="mb-4">
            <Card.Header>Test de la Fonction estPositif()</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Cette fonction vérifie si un nombre entier est strictement positif (> 0)
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Nombre à tester</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Entrez un nombre entier (ex: 5, -3, 0)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={handleEstPositif}
                    disabled={loading || nombre === ''}
                    className="w-100"
                  >
                    {loading ? 'Test...' : 'Tester'}
                  </Button>
                </Col>
              </Row>
              
              {result !== null && (
                <Alert variant={result ? "success" : "warning"} className="mt-3">
                  <strong>Résultat:</strong> Le nombre {nombre} est {result ? "positif" : "négatif ou nul"}
                  <Badge bg={result ? "success" : "warning"} className="ms-2">
                    {result ? "✓ Positif" : "✗ Non positif"}
                  </Badge>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Tests automatiques */}
          <Card className="mb-4">
            <Card.Header>Tests Automatiques</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Exécute une série de tests pour vérifier le bon fonctionnement de la fonction
              </p>
              <Button 
                variant="info" 
                onClick={runTests}
                disabled={loading}
                className="mb-3"
              >
                {loading ? 'Exécution des tests...' : 'Lancer les Tests'}
              </Button>
              
              {testResults.length > 0 && (
                <div>
                  <h6>Résultats des Tests:</h6>
                  {testResults.map((test, index) => (
                    <Alert 
                      key={index} 
                      variant={test.passed ? "success" : "danger"}
                      className="py-2"
                    >
                      <Row className="align-items-center">
                        <Col md={3}>
                          <strong>Valeur: {test.value}</strong>
                        </Col>
                        <Col md={4}>
                          {test.description}
                        </Col>
                        <Col md={3}>
                          Attendu: {test.expected ? "Positif" : "Non positif"}
                        </Col>
                        <Col md={2}>
                          <Badge bg={test.passed ? "success" : "danger"}>
                            {test.passed ? "✓ PASS" : "✗ FAIL"}
                          </Badge>
                        </Col>
                      </Row>
                    </Alert>
                  ))}
                  <Alert variant="info" className="mt-3">
                    <strong>Résumé:</strong> {testResults.filter(t => t.passed).length}/{testResults.length} tests réussis
                  </Alert>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Exemples et explications */}
          <Card className="mb-4 bg-light">
            <Card.Header>Règles et Exemples</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>✅ Nombres Positifs (retourne true)</h6>
                  <ul className="small">
                    <li>1, 2, 3, 4, 5...</li>
                    <li>10, 100, 1000...</li>
                    <li>Tout nombre > 0</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>❌ Nombres Non Positifs (retourne false)</h6>
                  <ul className="small">
                    <li>0 (zéro)</li>
                    <li>-1, -2, -3, -4, -5...</li>
                    <li>-10, -100, -1000...</li>
                    <li>Tout nombre ≤ 0</li>
                  </ul>
                </Col>
              </Row>
              <hr />
              <p className="text-muted mb-0">
                <strong>Note:</strong> La fonction utilise l'opérateur <code>&gt;</code> (strictement supérieur), 
                donc 0 est considéré comme non positif.
              </p>
            </Card.Body>
          </Card>

          {/* Code Solidity */}
          <Card className="mb-4">
            <Card.Header>Code Solidity</Card.Header>
            <Card.Body>
              <pre className="bg-light p-3 rounded">
                <code>{`function estPositif(int256 nombre) public pure returns (bool) {
    return nombre > 0;
}`}</code>
              </pre>
              <p className="text-muted mt-2">
                Cette fonction pure prend un entier signé en paramètre et retourne un booléen 
                indiquant si le nombre est strictement positif.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <BlockchainInfo web3={web3} />
          
          {/* Raccourcis de test */}
          <Card className="mb-4">
            <Card.Header>Tests Rapides</Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setNombre('5')}
                >
                  Tester: 5 (positif)
                </Button>
                <Button 
                  variant="outline-warning" 
                  size="sm"
                  onClick={() => setNombre('0')}
                >
                  Tester: 0 (zéro)
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => setNombre('-3')}
                >
                  Tester: -3 (négatif)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setNombre('100')}
                >
                  Tester: 100 (grand positif)
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Statistiques */}
          {result !== null && (
            <Card className="mb-4">
              <Card.Header>Dernier Test</Card.Header>
              <Card.Body>
                <p><strong>Valeur testée:</strong> {nombre}</p>
                <p><strong>Résultat:</strong> 
                  <Badge bg={result ? "success" : "warning"} className="ms-2">
                    {result ? "Positif" : "Non positif"}
                  </Badge>
                </p>
                <p className="text-muted small">
                  Type: {parseInt(nombre) > 0 ? "Nombre positif" : parseInt(nombre) === 0 ? "Zéro" : "Nombre négatif"}
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Exercise4;