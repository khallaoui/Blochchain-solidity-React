// client/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Exercise1 from './components/exercises/Exercise1';
import Exercise2 from './components/exercises/Exercise2';
import Exercise3 from './components/exercises/Exercise3';
import Exercise4 from './components/exercises/Exercise4';
import Exercise5 from './components/exercises/Exercise5';
import Exercise6 from './components/exercises/Exercise6';
import Exercise7 from './components/exercises/Exercise7';
import Exercise8 from './components/exercises/Exercise8';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState({});

  const initWeb3 = useCallback(async () => {
    try {
      let web3Instance;
      if (window.ethereum) {
        web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        web3Instance = new Web3('http://localhost:7545');
      }

      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      const networkId = await web3Instance.eth.net.getId();
      setAccounts(accounts);

      await loadContracts(web3Instance, networkId);
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Web3:", error);
    }
  }, []);

  useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  const loadContracts = async (web3Instance, networkId) => {
    try {
      const contractsData = {};

      const Exercice1 = require('./contracts/Exercice1.json');
      const Exercice2 = require('./contracts/Exercice2.json');
      const GestionChaines = require('./contracts/GestionChaines.json');
      const Exercice4 = require('./contracts/Exercice4.json');
      const Exercice5 = require('./contracts/Exercice5.json');
      const Exercice6 = require('./contracts/Exercice6.json');
      const Rectangle = require('./contracts/Rectangle.json');
      const Payment = require('./contracts/Payment.json');

      contractsData.exercice1 = new web3Instance.eth.Contract(
        Exercice1.abi,
        Exercice1.networks[networkId]?.address
      );
      contractsData.exercice2 = new web3Instance.eth.Contract(
        Exercice2.abi,
        Exercice2.networks[networkId]?.address
      );
      contractsData.exercice3 = new web3Instance.eth.Contract(
        GestionChaines.abi,
        GestionChaines.networks[networkId]?.address
      );
      contractsData.exercice4 = new web3Instance.eth.Contract(
        Exercice4.abi,
        Exercice4.networks[networkId]?.address
      );
      contractsData.exercice5 = new web3Instance.eth.Contract(
        Exercice5.abi,
        Exercice5.networks[networkId]?.address
      );
      contractsData.exercice6 = new web3Instance.eth.Contract(
        Exercice6.abi,
        Exercice6.networks[networkId]?.address
      );
      contractsData.exercice7 = new web3Instance.eth.Contract(
        Rectangle.abi,
        Rectangle.networks[networkId]?.address
      );
      contractsData.exercice8 = new web3Instance.eth.Contract(
        Payment.abi,
        Payment.networks[networkId]?.address
      );

      setContracts(contractsData);
    } catch (error) {
      console.error("Erreur lors du chargement des contrats:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header accounts={accounts} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/exercise1"
              element={
                <Exercise1
                  web3={web3}
                  contract={contracts.exercice1}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise2"
              element={
                <Exercise2
                  web3={web3}
                  contract={contracts.exercice2}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise3"
              element={
                <Exercise3
                  web3={web3}
                  contract={contracts.exercice3}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise4"
              element={
                <Exercise4
                  web3={web3}
                  contract={contracts.exercice4}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise5"
              element={
                <Exercise5
                  web3={web3}
                  contract={contracts.exercice5}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise6"
              element={
                <Exercise6
                  web3={web3}
                  contract={contracts.exercice6}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise7"
              element={
                <Exercise7
                  web3={web3}
                  contract={contracts.exercice7}
                  account={accounts[0]}
                />
              }
            />
            <Route
              path="/exercise8"
              element={
                <Exercise8
                  web3={web3}
                  contract={contracts.exercice8}
                  account={accounts[0]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;