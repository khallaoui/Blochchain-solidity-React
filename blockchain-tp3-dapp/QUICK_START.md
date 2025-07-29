# 🚀 Guide de Démarrage Rapide

## Installation Express

### 1. Prérequis
```bash
# Vérifier Node.js (version 16+)
node --version

# Installer Truffle globalement
npm install -g truffle

# Installer Ganache CLI (optionnel)
npm install -g ganache-cli
```

### 2. Installation du Projet
```bash
# Cloner et installer
git clone <repository-url>
cd blockchain-tp3-dapp
npm install
```

### 3. Démarrage Automatique
```bash
# Script de déploiement automatique
npm start
```

**OU**

### 4. Démarrage Manuel

#### Terminal 1 - Ganache
```bash
# Démarrer Ganache
ganache-cli -p 7545
```

#### Terminal 2 - Contrats
```bash
# Compiler et déployer
truffle compile
truffle migrate --network development
```

#### Terminal 3 - Application
```bash
# Démarrer React
cd client
npm install
npm start
```

## 🔧 Configuration MetaMask

1. **Ajouter le réseau Ganache**
   - Nom: `Ganache Local`
   - RPC: `http://localhost:7545`
   - Chain ID: `1337`
   - Symbole: `ETH`

2. **Importer un compte**
   - Copier une clé privée depuis Ganache
   - Importer dans MetaMask

## 📱 Accès à l'Application

- **URL**: http://localhost:3000
- **Navigation**: 8 exercices disponibles
- **Tests**: Interface interactive pour chaque contrat

## 🆘 Dépannage Rapide

### Erreur "Contract not deployed"
```bash
truffle migrate --reset --network development
```

### MetaMask ne se connecte pas
- Vérifier que Ganache fonctionne sur le port 7545
- Réinitialiser le compte MetaMask
- Vérifier la configuration du réseau

### Erreur de compilation
```bash
# Nettoyer et recompiler
rm -rf build/
truffle compile
```

## 📞 Support

- Consulter le [README.md](./README.md) complet
- Vérifier les logs dans la console du navigateur
- S'assurer que tous les services sont démarrés

---

**Temps d'installation estimé**: 5-10 minutes
**Prérequis**: Node.js, Git, MetaMask