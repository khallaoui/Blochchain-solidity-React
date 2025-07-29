# Blockchain TP3 - dApp Exercices Solidity

## 📋 Description

Application décentralisée (dApp) développée pour le TP3 du cours de Blockchain. Cette application permet d'interagir avec 8 contrats Solidity différents, chacun illustrant des concepts spécifiques de la programmation blockchain.

## 🛠️ Technologies Utilisées

- **Blockchain**: Solidity ^0.8.0
- **Framework**: Truffle
- **Réseau local**: Ganache
- **Frontend**: React 19.1.1
- **Web3**: Web3.js 4.16.0
- **UI**: Bootstrap 5.3.7 + React Bootstrap 2.10.10
- **Routage**: React Router DOM 6.30.1

## 📁 Structure du Projet

```
blockchain-tp3-dapp/
├── contracts/              # Contrats Solidity
│   ├── Exercice1.sol       # Fonctions d'addition
│   ├── Exercice2.sol       # Conversion Ether/Wei
│   ├── Exercice3.sol       # Gestion des chaînes
│   ├── Exercice4.sol       # Nombre positif
│   ├── Exercice5.sol       # Vérification parité
│   ├── Exercice6.sol       # Gestion tableaux
│   ├── Exercice7.sol       # Héritage POO
│   └── Exercice8.sol       # Système de paiement
├── migrations/             # Scripts de déploiement
├── test/                   # Tests unitaires
├── client/                 # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   │   ├── exercises/  # Composants par exercice
│   │   │   ├── Header.js   # Navigation
│   │   │   ├── Home.js     # Page d'accueil
│   │   │   ├── BlockchainInfo.js
│   │   │   └── TransactionInfo.js
│   │   ├── contracts/      # ABI des contrats
│   │   └── utils/          # Utilitaires Web3
│   └── public/
├── docs/                   # Documentation
├── truffle-config.js       # Configuration Truffle
└── package.json
```

## 🎯 Exercices Implémentés

### Exercice 1 - Fonctions d'Addition
- **Contrat**: `Exercice1.sol`
- **Fonctionnalités**: 
  - Fonction `view` utilisant les variables d'état
  - Fonction `pure` avec paramètres
  - Modification des variables d'état

### Exercice 2 - Conversion Cryptomonnaies
- **Contrat**: `Exercice2.sol`
- **Fonctionnalités**:
  - Conversion Ether → Wei
  - Conversion Wei → Ether
  - Comparaison avec utilitaires Web3.js

### Exercice 3 - Gestion des Chaînes
- **Contrat**: `GestionChaines.sol`
- **Fonctionnalités**:
  - Stockage et modification de messages
  - Concaténation de chaînes
  - Calcul de longueur
  - Comparaison de chaînes

### Exercice 4 - Nombre Positif
- **Contrat**: `Exercice4.sol`
- **Fonctionnalités**:
  - Vérification si un nombre est positif
  - Tests automatiques
  - Interface de test interactive

### Exercice 5 - Vérification de Parité
- **Contrat**: `Exercice5.sol`
- **Fonctionnalités**:
  - Vérification pair/impair
  - Visualisation des nombres
  - Tests automatiques

### Exercice 6 - Gestion des Tableaux
- **Contrat**: `Exercice6.sol`
- **Fonctionnalités**:
  - Ajout d'éléments
  - Recherche par index
  - Calcul de somme
  - Affichage du tableau

### Exercice 7 - Héritage POO
- **Contrat**: `Rectangle.sol` (hérite de `Forme.sol`)
- **Fonctionnalités**:
  - Héritage et abstraction
  - Polymorphisme
  - Visualisation graphique
  - Déplacement de forme

### Exercice 8 - Système de Paiement
- **Contrat**: `Payment.sol`
- **Fonctionnalités**:
  - Réception de paiements
  - Retrait de fonds
  - Gestion des permissions
  - Suivi des soldes

## 🚀 Installation et Déploiement

### Prérequis

```bash
# Node.js version 16+
node --version

# NPM ou Yarn
npm --version

# Git
git --version
```

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd blockchain-tp3-dapp

# Installer les dépendances Truffle
npm install

# Installer les dépendances React
cd client
npm install
cd ..
```

### Installation des outils globaux

```bash
# Truffle
npm install -g truffle

# Ganache CLI (optionnel)
npm install -g ganache-cli
```

### Déploiement Local

#### 1. Démarrer Ganache

**Option A: Ganache GUI**
- Télécharger et installer Ganache
- Créer un nouveau workspace
- Configurer le port 7545

**Option B: Ganache CLI**
```bash
ganache-cli -p 7545 -h 0.0.0.0
```

#### 2. Compiler et Déployer les Contrats

```bash
# Compiler les contrats
truffle compile

# Déployer sur le réseau de développement
truffle migrate --network development

# Redéployer si nécessaire
truffle migrate --reset --network development
```

#### 3. Démarrer l'Application React

```bash
cd client
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🧪 Tests

### Tests Unitaires Truffle

```bash
# Exécuter tous les tests
truffle test

# Test spécifique
truffle test test/TestExercice1.js
```

### Tests Frontend

```bash
cd client
npm test
```

## 📱 Utilisation de l'Application

### Configuration MetaMask

1. Installer l'extension MetaMask
2. Ajouter un réseau personnalisé :
   - **Nom du réseau**: Ganache Local
   - **URL RPC**: http://localhost:7545
   - **ID de chaîne**: 1337 (ou selon votre configuration)
   - **Symbole**: ETH

3. Importer un compte depuis Ganache avec la clé privée

### Navigation

- **Page d'accueil**: Vue d'ensemble des 8 exercices
- **Exercices individuels**: Interface dédiée pour chaque contrat
- **Informations blockchain**: Affichage en temps réel des données
- **Historique des transactions**: Suivi des interactions

## 🔧 Configuration

### Truffle Configuration

Le fichier `truffle-config.js` contient :
- Configuration du réseau de développement (Ganache)
- Version du compilateur Solidity (0.8.19)
- Optimisations du compilateur

### Variables d'Environnement

Créer un fichier `.env` dans le dossier `client/` :

```env
REACT_APP_NETWORK_ID=5777
REACT_APP_GANACHE_URL=http://localhost:7545
```

## 📊 Fonctionnalités Avancées

### Informations Blockchain en Temps Réel
- Numéro de bloc actuel
- Gas limit
- Timestamp
- Solde du compte connecté

### Gestion des Transactions
- Affichage du hash de transaction
- Statut de la transaction
- Gas utilisé
- Numéro de bloc

### Interface Responsive
- Compatible mobile et desktop
- Design Bootstrap moderne
- Navigation intuitive

## 🐛 Dépannage

### Problèmes Courants

**1. Erreur "Contract not deployed"**
```bash
truffle migrate --reset --network development
```

**2. MetaMask ne se connecte pas**
- Vérifier que Ganache est démarré
- Vérifier la configuration du réseau dans MetaMask
- Réinitialiser le compte MetaMask si nécessaire

**3. Erreur de compilation Solidity**
- Vérifier la version du compilateur dans `truffle-config.js`
- S'assurer que tous les contrats ont la bonne licence SPDX

**4. Problèmes de Gas**
- Augmenter la limite de gas dans `truffle-config.js`
- Vérifier que le compte a suffisamment d'ETH

### Logs de Debug

```bash
# Logs Truffle détaillés
truffle migrate --network development --verbose-rpc

# Console Truffle
truffle console --network development
```

## 📈 Améliorations Futures

- [ ] Tests automatisés plus complets
- [ ] Déploiement sur testnet (Sepolia, Goerli)
- [ ] Interface d'administration
- [ ] Graphiques de visualisation des données
- [ ] Support multi-langues
- [ ] Mode sombre
- [ ] Notifications push
- [ ] Historique des transactions persistant

## 👥 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ���‍💻 Auteur

**[Votre Nom]**
- Master GLCC S2 - 2024/2025
- Email: [votre.email@example.com]
- GitHub: [@votre-username]

## 🙏 Remerciements

- Équipe pédagogique du Master GLCC
- Communauté Truffle et Web3.js
- Documentation Solidity
- Contributeurs open source

---

## 📞 Support

Pour toute question ou problème :
1. Consulter la documentation
2. Vérifier les issues GitHub existantes
3. Créer une nouvelle issue avec :
   - Description du problème
   - Étapes pour reproduire
   - Environnement (OS, versions)
   - Logs d'erreur

---

*Dernière mise à jour: Janvier 2025*