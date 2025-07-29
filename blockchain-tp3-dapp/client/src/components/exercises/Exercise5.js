// client/src/components/exercises/Exercise5.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';

const Exercise5 = ({ web3, contract, account }) => {
  const [nombre, setNombre] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState([]);

  const handleEstPair = async () => {
    try {
      setLoading(true);
      setError('');
      if (nombre === '') {
        setError('Veuillez saisir un nombre');
        return;
      }
      const isPair = await contract.methods.estPair(nombre).call();
      setResult(isPair);
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const runTests = async () => {
    const testCases = [
      { value: 0, expected: true, description: "Zéro (pair)" },
      { value: 2, expected: true, description: "Deux (pair)" },
      { value: 4, expected: true, description: "Quatre (pair)" },
      { value: 10, expected: true, description: "Dix (pair)" },
      { value: 100, expected: true, description: "Cent (pair)" },
      { value: 1, expected: false, description: "Un (impair)" },
      { value: 3, expected: false, description: "Trois (impair)" },
      { value: 5, expected: false, description: "Cinq (impair)" },
      { value: 99, expected: false, description: "Quatre-vingt-dix-neuf (impair)" },
      { value: 1001, expected: false, description: "Mille un (impair)" }
    ];

    setLoading(true);
    setError('');
    const results = [];

    try {
      for (const testCase of testCases) {
        const result = await contract.methods.estPair(testCase.value).call();
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
        <h2>Exercice 5 - Vérification de Parité</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Test manuel */}
          <Card className="mb-4">
            <Card.Header>Test de la Fonction estPair()</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Cette fonction vérifie si un nombre entier positif est pair (divisible par 2)
              </p>
              <Row>
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Nombre à tester</Form.Label>
                    <Form.Control 
                      type="number" 
                      min="0"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Entrez un nombre entier positif (ex: 4, 7, 0)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={handleEstPair}
                    disabled={loading || nombre === ''}
                    className="w-100"
                  >
                    {loading ? 'Test...' : 'Tester'}
                  </Button>
                </Col>
              </Row>
              
              {result !== null && (
                <Alert variant={result ? "success" : "info"} className="mt-3">
                  <strong>Résultat:</strong> Le nombre {nombre} est {result ? "pair" : "impair"}
                  <Badge bg={result ? "success" : "primary"} className="ms-2">
                    {result ? "✓ Pair" : "◯ Impair"}
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
                        <Col md={2}>
                          <strong>{test.value}</strong>
                        </Col>
                        <Col md={4}>
                          {test.description}
                        </Col>
                        <Col md={3}>
                          Attendu: {test.expected ? "Pair" : "Impair"}
                        </Col>
                        <Col md={3}>
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
            <Card.Header>Règles de Parité</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>✅ Nombres Pairs (retourne true)</h6>
                  <ul className="small">
                    <li>0, 2, 4, 6, 8, 10...</li>
                    <li>12, 14, 16, 18, 20...</li>
                    <li>Tout nombre divisible par 2</li>
                    <li>Reste de la division par 2 = 0</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>◯ Nombres Impairs (retourne false)</h6>
                  <ul className="small">
                    <li>1, 3, 5, 7, 9, 11...</li>
                    <li>13, 15, 17, 19, 21...</li>
                    <li>Tout nombre non divisible par 2</li>
                    <li>Reste de la division par 2 = 1</li>
                  </ul>
                </Col>
              </Row>
              <hr />
              <p className="text-muted mb-0">
                <strong>Formule:</strong> Un nombre n est pair si <code>n % 2 == 0</code>
              </p>
            </Card.Body>
          </Card>

          {/* Visualisation */}
          <Card className="mb-4">
            <Card.Header>Visualisation des Nombres</Card.Header>
            <Card.Body>
              <p className="text-muted">Séquence des 20 premiers nombres entiers:</p>
              <div className="d-flex flex-wrap gap-2">
                {Array.from({length: 20}, (_, i) => i).map(num => (
                  <Badge 
                    key={num}
                    bg={num % 2 === 0 ? "success" : "primary"}
                    className="p-2"
                    style={{minWidth: '40px'}}
                  >
                    {num}
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                <small>
                  <Badge bg="success" className="me-2">Pair</Badge>
                  <Badge bg="primary">Impair</Badge>
                </small>
              </div>
            </Card.Body>
          </Card>

          {/* Code Solidity */}
          <Card className="mb-4">
            <Card.Header>Code Solidity</Card.Header>
            <Card.Body>
              <pre className="bg-light p-3 rounded">
                <code>{`function estPair(uint256 nombre) public pure returns (bool) {
    return nombre % 2 == 0;
}`}</code>
              </pre>
              <p className="text-muted mt-2">
                Cette fonction pure utilise l'opérateur modulo (%) pour calculer le reste de la division par 2. 
                Si le reste est 0, le nombre est pair.
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
                  onClick={() => setNombre('0')}
                >
                  Tester: 0 (pair)
                </Button>
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setNombre('4')}
                >
                  Tester: 4 (pair)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setNombre('7')}
                >
                  Tester: 7 (impair)
                </Button>
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setNombre('100')}
                >
                  Tester: 100 (pair)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setNombre('99')}
                >
                  Tester: 99 (impair)
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Calculateur de parité */}
          <Card className="mb-4">
            <Card.Header>Calculateur Local</Card.Header>
            <Card.Body>
              {nombre && (
                <div>
                  <p><strong>Nombre:</strong> {nombre}</p>
                  <p><strong>Division par 2:</strong> {nombre} ÷ 2 = {Math.floor(nombre/2)} reste {nombre % 2}</p>
                  <p><strong>Parité:</strong> 
                    <Badge bg={nombre % 2 === 0 ? "success" : "primary"} className="ms-2">
                      {nombre % 2 === 0 ? "Pair" : "Impair"}
                    </Badge>
                  </p>
                </div>
              )}
              {!nombre && (
                <p className="text-muted">Entrez un nombre pour voir le calcul</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Exercise5;