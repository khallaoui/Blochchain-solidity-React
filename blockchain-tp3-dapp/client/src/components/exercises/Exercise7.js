// client/src/components/exercises/Exercise7.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlockchainInfo from '../BlockchainInfo';
import TransactionInfo from '../TransactionInfo';

const Exercise7 = ({ web3, contract, account }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ longueur: 0, largeur: 0 });
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');
  const [surface, setSurface] = useState(0);
  const [infos, setInfos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);

  const loadContractData = useCallback(async () => {
    try {
      // Charger la position
      const [x, y] = await contract.methods.afficheXY().call();
      setPosition({ x: x.toString(), y: y.toString() });

      // Charger les dimensions
      const [longueur, largeur] = await contract.methods.afficheLoLa().call();
      setDimensions({ 
        longueur: longueur.toString(), 
        largeur: largeur.toString() 
      });

      // Calculer la surface
      const surfaceResult = await contract.methods.surface().call();
      setSurface(surfaceResult.toString());

      // Obtenir les informations
      const infosResult = await contract.methods.afficheInfos().call();
      setInfos(infosResult);

    } catch (error) {
      setError('Erreur lors du chargement des données: ' + error.message);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      loadContractData();
    }
  }, [contract, loadContractData]);

  const handleDeplacerForme = async () => {
    try {
      setLoading(true);
      setError('');
      if (newX === '' || newY === '') {
        setError('Veuillez saisir les nouvelles coordonnées');
        return;
      }
      const tx = await contract.methods.deplacerForme(newX, newY).send({ 
        from: account,
        gas: 100000
      });
      setLastTransaction(tx);
      await loadContractData();
      setNewX('');
      setNewY('');
    } catch (error) {
      setError('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculerSurface = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await contract.methods.surface().call();
      setSurface(result.toString());
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
        <h2>Exercice 7 - Héritage POO (Rectangle)</h2>
        <Link to="/" className="btn btn-outline-secondary">
          ← Retour au Sommaire
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Informations du Rectangle */}
          <Card className="mb-4">
            <Card.Header>
              Informations du Rectangle
              <Badge bg="info" className="ms-2">{infos}</Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Position (héritée de Forme)</h6>
                  <p><strong>X:</strong> {position.x}</p>
                  <p><strong>Y:</strong> {position.y}</p>
                </Col>
                <Col md={6}>
                  <h6>Dimensions (spécifiques au Rectangle)</h6>
                  <p><strong>Longueur:</strong> {dimensions.longueur}</p>
                  <p><strong>Largeur:</strong> {dimensions.largeur}</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={6}>
                  <h6>Surface Calculée</h6>
                  <h4 className="text-primary">{surface} unités²</h4>
                  <small className="text-muted">
                    Formule: Longueur × Largeur = {dimensions.longueur} × {dimensions.largeur}
                  </small>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="success" 
                    onClick={handleCalculerSurface}
                    disabled={loading}
                  >
                    Recalculer la Surface
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Déplacer la forme */}
          <Card className="mb-4">
            <Card.Header>Déplacer le Rectangle</Card.Header>
            <Card.Body>
              <p className="text-muted">
                Utilisez la fonction héritée de la classe Forme pour changer la position
              </p>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Nouvelle position X</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={newX}
                      onChange={(e) => setNewX(e.target.value)}
                      placeholder="Coordonnée X"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Nouvelle position Y</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={newY}
                      onChange={(e) => setNewY(e.target.value)}
                      placeholder="Coordonnée Y"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={handleDeplacerForme}
                    disabled={loading || newX === '' || newY === ''}
                    className="w-100"
                  >
                    Déplacer
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Visualisation */}
          <Card className="mb-4">
            <Card.Header>Visualisation du Rectangle</Card.Header>
            <Card.Body>
              <div 
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '300px',
                  border: '2px solid #dee2e6',
                  backgroundColor: '#f8f9fa',
                  margin: '0 auto'
                }}
              >
                {/* Grille de fond */}
                <svg width="400" height="300" style={{position: 'absolute', top: 0, left: 0}}>
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e9ecef" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Rectangle */}
                <div
                  style={{
                    position: 'absolute',
                    left: `${Math.min(parseInt(position.x) * 10, 350)}px`,
                    top: `${Math.min(parseInt(position.y) * 10, 250)}px`,
                    width: `${Math.min(parseInt(dimensions.longueur) * 10, 100)}px`,
                    height: `${Math.min(parseInt(dimensions.largeur) * 10, 100)}px`,
                    backgroundColor: 'rgba(0, 123, 255, 0.3)',
                    border: '2px solid #007bff',
                    borderRadius: '4px'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#007bff'
                    }}
                  >
                    ({position.x}, {position.y})
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <small className="text-muted">
                  Échelle: 1 unité = 10 pixels | Position: ({position.x}, {position.y}) | 
                  Dimensions: {dimensions.longueur} × {dimensions.largeur}
                </small>
              </div>
            </Card.Body>
          </Card>

          {/* Concepts POO */}
          <Card className="mb-4 bg-light">
            <Card.Header>Concepts de Programmation Orientée Objet</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>🏗️ Héritage</h6>
                  <ul className="small">
                    <li><strong>Classe abstraite Forme:</strong> Définit les propriétés communes (x, y)</li>
                    <li><strong>Classe Rectangle:</strong> Hérite de Forme et ajoute ses spécificités</li>
                    <li><strong>Méthodes héritées:</strong> deplacerForme(), afficheXY()</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>🔄 Polymorphisme</h6>
                  <ul className="small">
                    <li><strong>Fonction virtuelle:</strong> surface() implémentée différemment</li>
                    <li><strong>Override:</strong> afficheInfos() redéfinie dans Rectangle</li>
                    <li><strong>Abstraction:</strong> Forme ne peut pas être instanciée</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Code Solidity */}
          <Card className="mb-4">
            <Card.Header>Structure du Code Solidity</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Classe Abstraite Forme</h6>
                  <pre className="bg-light p-2 rounded small">
                    <code>{`abstract contract Forme {
    uint public x;
    uint public y;
    
    function deplacerForme(uint dx, uint dy) public;
    function afficheXY() public view returns (uint, uint);
    function surface() public view virtual returns (uint);
}`}</code>
                  </pre>
                </Col>
                <Col md={6}>
                  <h6>Classe Rectangle</h6>
                  <pre className="bg-light p-2 rounded small">
                    <code>{`contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur
    
    function surface() public view override returns (uint) {
        return lo * la;
    }
}`}</code>
                  </pre>
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
          
          {/* Raccourcis de position */}
          <Card className="mb-4">
            <Card.Header>Positions Prédéfinies</Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {setNewX('0'); setNewY('0');}}
                >
                  Origine (0, 0)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {setNewX('10'); setNewY('10');}}
                >
                  Centre (10, 10)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {setNewX('5'); setNewY('15');}}
                >
                  Position (5, 15)
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => {setNewX('20'); setNewY('5');}}
                >
                  Position (20, 5)
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Propriétés actuelles */}
          <Card className="mb-4">
            <Card.Header>Propriétés Actuelles</Card.Header>
            <Card.Body>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td><strong>Position X:</strong></td>
                    <td>{position.x}</td>
                  </tr>
                  <tr>
                    <td><strong>Position Y:</strong></td>
                    <td>{position.y}</td>
                  </tr>
                  <tr>
                    <td><strong>Longueur:</strong></td>
                    <td>{dimensions.longueur}</td>
                  </tr>
                  <tr>
                    <td><strong>Largeur:</strong></td>
                    <td>{dimensions.largeur}</td>
                  </tr>
                  <tr>
                    <td><strong>Surface:</strong></td>
                    <td>{surface} unités²</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Exercise7;