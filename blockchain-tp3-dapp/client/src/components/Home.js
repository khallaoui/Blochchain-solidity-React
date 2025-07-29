// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const exercises = [
    { id: 1, title: 'Addition Functions', description: 'Fonctions d\'addition view et pure' },
    { id: 2, title: 'Crypto Conversion', description: 'Conversion Ether ↔ Wei' },
    { id: 3, title: 'String Management', description: 'Gestion des chaînes de caractères' },
    { id: 4, title: 'Positive Number', description: 'Vérification nombre positif' },
    { id: 5, title: 'Parity Check', description: 'Vérification parité' },
    { id: 6, title: 'Array Management', description: 'Gestion de tableaux' },
    { id: 7, title: 'OOP Inheritance', description: 'Héritage et abstraction' },
    { id: 8, title: 'Payment System', description: 'Système de paiement' }
  ];

  return (
    <div>
      <div className="jumbotron bg-primary text-white text-center mb-4 p-4 rounded">
        <h1>Blockchain TP3 - dApp Exercices</h1>
        <p>Application décentralisée pour tester les contrats Solidity</p>
      </div>
      
      <Row>
        {exercises.map(exercise => (
          <Col md={6} lg={4} key={exercise.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Exercice {exercise.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {exercise.title}
                </Card.Subtitle>
                <Card.Text>{exercise.description}</Card.Text>
                <Link to={`/exercise${exercise.id}`}>
                  <Button variant="primary">Accéder à l'exercice</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;