# Rapport de Projet - dApp Blockchain TP3

**Université:** Master GLCC S2 - 2024/2025  
**Module:** Blockchain & Web3  
**Professeur:** M. OUALLA  
**Projet:** Développement d'une dApp pour le TP 3

---

## 📋 Résumé Exécutif

Ce projet consiste en le développement d'une application décentralisée (dApp) complète permettant d'interagir avec 8 contrats intelligents Solidity. L'application offre une interface utilisateur intuitive développée en ReactJS, intégrée avec Web3.js pour l'interaction blockchain.

## 🏗️ Architecture du Projet

### Structure Générale
```
blockchain-tp3-dapp/
├── contracts/              # Contrats Solidity (8 exercices)
├── migrations/             # Scripts de déploiement Truffle
├── test/                   # Tests unitaires
├── client/                 # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   │   ├── exercises/  # Pages des 8 exercices
│   │   │   ├── Header.js   # Navigation
│   │   │   ├── Home.js     # Page d'accueil
│   │   │   ├── BlockchainInfo.js
│   │   │   └── TransactionInfo.js
│   │   ├── contracts/      # ABI des contrats
│   │   └── utils/          # Utilitaires Web3
│   └── build/              # Build de production
├── build/                  # Artéfacts Truffle
├── docs/                   # Documentation
└── README.md
```

### Technologies Utilisées
- **Blockchain:** Solidity ^0.8.19
- **Framework:** Truffle Suite
- **Réseau local:** Ganache
- **Frontend:** React 19.1.1
- **Web3:** Web3.js 4.16.0
- **UI Framework:** Bootstrap 5.3.7 + React Bootstrap
- **Routage:** React Router DOM 6.30.1

## 📝 Contrats Intelligents Développés

### 1. Exercice 1 - Fonctions d'Addition
**Fichier:** `Exercice1.sol`
**Fonctionnalités:**
- Variables d'état `nombre1` et `nombre2`
- Fonction `view` : `addition1()` - utilise les variables d'état
- Fonction `pure` : `addition2(uint a, uint b)` - paramètres en entrée
- Fonctions de modification : `setNombre1()`, `setNombre2()`

### 2. Exercice 2 - Conversion Cryptomonnaies
**Fichier:** `Exercice2.sol`
**Fonctionnalités:**
- `etherEnWei(uint256 montantEther)` - conversion Ether vers Wei
- `weiEnEther(uint256 montantWei)` - conversion Wei vers Ether
- Démonstration des unités de base d'Ethereum

### 3. Exercice 3 - Gestion des Chaînes
**Fichier:** `GestionChaines.sol`
**Fonctionnalités:**
- Stockage et modification de messages
- `concatener(string a, string b)` - concaténation de chaînes
- `longueur(string s)` - calcul de longueur
- `comparer(string a, string b)` - comparaison de chaînes

### 4. Exercice 4 - Nombre Positif
**Fichier:** `Exercice4.sol`
**Fonctionnalités:**
- `estPositif(int256 nombre)` - vérification si un nombre est positif
- Gestion des nombres signés

### 5. Exercice 5 - Vérification de Parité
**Fichier:** `Exercice5.sol`
**Fonctionnalités:**
- `estPair(uint256 nombre)` - vérification pair/impair
- Utilisation de l'opérateur modulo

### 6. Exercice 6 - Gestion des Tableaux
**Fichier:** `Exercice6.sol`
**Fonctionnalités:**
- Tableau dynamique `uint[] public nombres`
- `ajouterNombre(uint256)` - ajout d'éléments
- `getElement(uint256 index)` - accès par index
- `calculerSomme()` - calcul de somme totale
- `afficheTableau()` - retour du tableau complet

### 7. Exercice 7 - Héritage POO
**Fichiers:** `Forme.sol` (abstrait), `Rectangle.sol`
**Fonctionnalités:**
- Classe abstraite `Forme` avec propriétés `x`, `y`
- Classe `Rectangle` héritant de `Forme`
- Polymorphisme avec `surface()` virtuelle
- Démonstration de l'héritage en Solidity

### 8. Exercice 8 - Système de Paiement
**Fichier:** `Payment.sol`
**Fonctionnalités:**
- `receivePayment()` payable - réception de paiements
- `withdraw()` - retrait des fonds (destinataire uniquement)
- `getBalance()` - consultation du solde
- Gestion des permissions et sécurité

## 🖥️ Interface Utilisateur

### Page d'Accueil
- **Navigation principale** avec 8 liens vers les exercices
- **Design responsive** avec Bootstrap
- **Informations du projet** et description

### Pages des Exercices
Chaque exercice dispose d'une page dédiée contenant :

#### Composants Communs
- **Header de navigation** avec statut de connexion MetaMask
- **Lien retour** vers le sommaire
- **Zone d'affichage des erreurs** et messages de succès
- **Composant BlockchainInfo** - informations temps réel
- **Composant TransactionInfo** - détails des transactions

#### Fonctionnalités Spécifiques par Exercice

**Exercice 1 - Addition:**
- Formulaires pour modifier les variables d'état
- Boutons pour tester les fonctions view et pure
- Affichage des résultats en temps réel

**Exercice 2 - Conversion:**
- Convertisseurs Ether ↔ Wei
- Comparaison avec utilitaires Web3.js locaux
- Exemples prédéfinis et raccourcis

**Exercice 3 - Chaînes:**
- Gestion du message d'état
- Outils de concaténation et comparaison
- Calculateur de longueur

**Exercice 4 - Nombre Positif:**
- Interface de test interactive
- Suite de tests automatiques
- Visualisation des résultats

**Exercice 5 - Parité:**
- Vérificateur pair/impair
- Visualisation graphique des nombres
- Calculateur local pour comparaison

**Exercice 6 - Tableaux:**
- Affichage dynamique du tableau
- Ajout d'éléments interactif
- Recherche par index et calcul de somme

**Exercice 7 - Héritage:**
- Visualisation graphique du rectangle
- Déplacement interactif
- Démonstration des concepts POO

**Exercice 8 - Paiements:**
- Interface de paiement sécurisée
- Gestion des permissions
- Suivi des soldes en temps réel

## 🔗 Intégration Web3 et MetaMask

### Connexion Automatique
- Détection automatique de MetaMask
- Fallback vers Ganache local (http://localhost:7545)
- Gestion des erreurs de connexion

### Fonctionnalités Web3
- **Récupération des comptes** utilisateur
- **Envoi de transactions** avec gestion du gas
- **Surveillance des événements** blockchain
- **Affichage temps réel** des informations réseau

### Gestion des Contrats
- Chargement automatique des ABI
- Instanciation dynamique des contrats
- Vérification du déploiement
- Gestion des erreurs de réseau

## ���� Composants Utilitaires

### BlockchainInfo Component
- **Numéro de bloc actuel**
- **Gas limit du réseau**
- **Timestamp du dernier bloc**
- **Adresse du compte connecté**
- **Solde du compte**
- **Mise à jour automatique** toutes les 5 secondes

### TransactionInfo Component
- **Hash de transaction**
- **Gas utilisé**
- **Statut de la transaction** (succès/échec)
- **Numéro de bloc**
- **Affichage conditionnel**

## 🧪 Tests et Validation

### Tests Unitaires Truffle
```javascript
// Exemple de test pour Exercice1
contract("Exercice1", (accounts) => {
  it("should initialize with correct values", async () => {
    const instance = await Exercice1.new(10, 20);
    const nombre1 = await instance.nombre1();
    assert.equal(nombre1.toNumber(), 10);
  });
});
```

### Tests d'Interface
- **Tests de navigation** entre les pages
- **Validation des formulaires**
- **Gestion des états de chargement**
- **Tests de responsivité**

## 🚀 Déploiement et Configuration

### Configuration Truffle
```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19"
    }
  }
};
```

### Scripts de Déploiement
- **Script automatisé** de compilation et déploiement
- **Copie automatique** des ABI vers React
- **Gestion des erreurs** et validation
- **Support multi-plateforme** (Windows/Linux/Mac)

### Build de Production
- **Optimisation Webpack** activée
- **Minification** des assets
- **Compression gzip** : 277.27 kB (JS), 31.97 kB (CSS)
- **Serveur statique** prêt pour déploiement

## 📈 Métriques du Projet

### Code Source
- **Contrats Solidity:** 8 fichiers, ~500 lignes
- **Composants React:** 15 fichiers, ~2000 lignes
- **Tests:** 5 fichiers, ~200 lignes
- **Documentation:** 4 fichiers, ~1000 lignes

### Performance
- **Temps de compilation:** < 30 secondes
- **Temps de déploiement:** < 1 minute
- **Taille du build:** 309.24 kB (gzippé)
- **Temps de chargement:** < 2 secondes

## 🔒 Sécurité et Bonnes Pratiques

### Contrats Solidity
- **Vérifications require()** pour la validation
- **Gestion des permissions** (modifier onlyOwner)
- **Protection contre les réentrances**
- **Optimisation du gas**

### Frontend
- **Validation côté client** des entrées
- **Gestion sécurisée** des clés privées
- **Protection XSS** avec React
- **Gestion d'erreurs** robuste

## 🎯 Fonctionnalités Avancées

### Interface Utilisateur
- **Design responsive** Bootstrap
- **Thème professionnel** cohérent
- **Animations** et transitions fluides
- **Feedback visuel** en temps réel

### Expérience Développeur
- **Hot reload** en développement
- **ESLint** pour la qualité du code
- **Scripts automatisés** de déploiement
- **Documentation complète**

### Extensibilité
- **Architecture modulaire**
- **Composants réutilisables**
- **Configuration centralisée**
- **Support multi-réseaux**

## 📸 Captures d'Écran

### Page d'Accueil
![Page d'accueil avec navigation vers les 8 exercices]

### Exercice 1 - Fonctions d'Addition
![Interface de test des fonctions d'addition avec formulaires]

### Exercice 3 - Gestion des Chaînes
![Interface de manipulation des chaînes de caractères]

### Exercice 6 - Gestion des Tableaux
![Affichage dynamique et manipulation des tableaux]

### Exercice 8 - Système de Paiement
![Interface de paiement avec gestion des permissions]

## 🔧 Installation et Utilisation

### Prérequis
- Node.js 16+
- Truffle Suite
- Ganache (GUI ou CLI)
- MetaMask

### Installation
```bash
git clone <repository-url>
cd blockchain-tp3-dapp
npm install
cd client && npm install
```

### Déploiement
```bash
# Terminal 1 - Ganache
ganache-cli -p 7545

# Terminal 2 - Contrats
truffle compile
truffle migrate --network development

# Terminal 3 - Application
cd client && npm start
```

## 🎓 Objectifs Pédagogiques Atteints

### Compétences Techniques
- ✅ **Développement Solidity** - 8 contrats avec concepts avancés
- ✅ **Intégration Web3** - Connexion blockchain complète
- ✅ **Développement React** - Interface moderne et responsive
- ✅ **Architecture dApp** - Structure professionnelle

### Concepts Blockchain
- ✅ **Smart Contracts** - Logique métier décentralisée
- ✅ **Transactions** - Gestion des états et événements
- ✅ **Gas et Optimisation** - Efficacité énergétique
- ✅ **Sécurité** - Bonnes pratiques de développement

### Compétences Transversales
- ✅ **Gestion de projet** - Organisation et planification
- ✅ **Documentation** - Rédaction technique complète
- ✅ **Tests** - Validation et qualité du code
- ✅ **Déploiement** - Mise en production

## 🚀 Perspectives d'Amélioration

### Court Terme
- Tests automatisés plus complets
- Déploiement sur testnet public
- Interface d'administration avancée

### Long Terme
- Support multi-chaînes (Polygon, BSC)
- Intégration IPFS pour le stockage
- Fonctionnalités DeFi avancées

## 📊 Conclusion

Ce projet démontre une maîtrise complète de l'écosystème blockchain moderne, de la conception de contrats intelligents à l'interface utilisateur. L'application développée respecte les standards de l'industrie et offre une expérience utilisateur professionnelle.

Les 8 exercices implémentés couvrent l'ensemble des concepts fondamentaux de Solidity et de la programmation blockchain, offrant une plateforme d'apprentissage complète et interactive.

---

**Développé par:** [Nom de l'étudiant]  
**Date:** Janvier 2025  
**Version:** 1.0.0  
**Statut:** Production Ready ✅