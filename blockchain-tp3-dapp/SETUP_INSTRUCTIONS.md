# 🔧 Instructions de Configuration

## Problème Résolu ✅

Le problème de copie des contrats a été résolu. Voici les étapes pour démarrer l'application :

## 1. Compilation des Contrats

Avant de démarrer l'application React, vous devez compiler et déployer les contrats Solidity.

### Terminal 1 - Démarrer Ganache
```bash
# Option A: Ganache GUI (recommandé)
# Démarrer Ganache GUI sur le port 7545

# Option B: Ganache CLI
ganache-cli -p 7545
```

### Terminal 2 - Compiler et Déployer
```bash
# Aller dans le dossier du projet
cd "C:\Users\Admin\Desktop\master GL 24.26\blochchain\dApp\blockchain-tp3-dapp"

# Compiler les contrats
truffle compile

# Déployer les contrats
truffle migrate --network development
```

## 2. Démarrer l'Application React

### Terminal 3 - Application React
```bash
# Aller dans le dossier client
cd "C:\Users\Admin\Desktop\master GL 24.26\blochchain\dApp\blockchain-tp3-dapp\client"

# Démarrer l'application
npm start
```

## 3. Configuration MetaMask

1. **Ajouter le réseau Ganache** :
   - Nom du réseau : `Ganache Local`
   - URL RPC : `http://localhost:7545`
   - ID de chaîne : `1337` (ou selon votre configuration Ganache)
   - Symbole de devise : `ETH`

2. **Importer un compte** :
   - Copier une clé privée depuis Ganache
   - Importer dans MetaMask

## 4. Vérification

L'application sera accessible sur : `http://localhost:3000`

### Statut des Contrats

- ✅ **Contrats compilés** : Les fichiers JSON seront automatiquement copiés
- ✅ **Script de copie amélioré** : Fonctionne sur Windows
- ✅ **Gestion d'erreurs** : L'app démarre même sans contrats déployés

## 🔍 Dépannage

### Si l'application ne trouve pas les contrats :

1. **Vérifier la compilation** :
   ```bash
   truffle compile
   ```

2. **Vérifier le déploiement** :
   ```bash
   truffle migrate --network development
   ```

3. **Redémarrer l'application** :
   ```bash
   # Dans le dossier client
   npm start
   ```

### Si les contrats ne se chargent pas :

- Vérifier que Ganache fonctionne sur le port 7545
- Vérifier que MetaMask est connecté au bon réseau
- Consulter la console du navigateur pour les erreurs

## 📱 Fonctionnalités Disponibles

Même sans contrats déployés, l'application affiche :
- ✅ Page d'accueil avec les 8 exercices
- ✅ Navigation entre les exercices
- ✅ Interface utilisateur complète
- ⚠️ Message informatif si les contrats ne sont pas déployés

## 🎯 Prochaines Étapes

1. Compiler et déployer les contrats
2. Configurer MetaMask
3. Tester chaque exercice
4. Consulter la documentation complète dans `README.md`

---

**Note** : Le script de copie des contrats a été amélioré pour fonctionner correctement sur Windows et gère automatiquement les cas où les contrats ne sont pas encore compilés.