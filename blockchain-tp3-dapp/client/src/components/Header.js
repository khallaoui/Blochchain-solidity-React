// client/src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ accounts }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🔗 Blockchain TP3 - dApp
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise1">
              Exercice 1
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise2">
              Exercice 2
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise3">
              Exercice 3
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise4">
              Exercice 4
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise5">
              Exercice 5
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise6">
              Exercice 6
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise7">
              Exercice 7
            </Nav.Link>
            <Nav.Link as={Link} to="/exercise8">
              Exercice 8
            </Nav.Link>
          </Nav>
          
          <Nav>
            {accounts && accounts.length > 0 ? (
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="success" className="me-2">
                  Connecté
                </Badge>
                <small className="text-light">
                  {accounts[0].substring(0, 6)}...{accounts[0].substring(38)}
                </small>
              </Nav.Item>
            ) : (
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="warning">
                  Non connecté
                </Badge>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;