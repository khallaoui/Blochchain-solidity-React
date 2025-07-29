#!/usr/bin/env node

/**
 * Script de déploiement automatisé pour la dApp Blockchain TP3
 * 
 * Ce script automatise le processus de compilation, déploiement et démarrage
 * de l'application décentralisée.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execPromise(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function checkPrerequisites() {
  log('\n🔍 Vérification des prérequis...', 'cyan');
  
  try {
    // Vérifier Node.js
    const nodeVersion = await execPromise('node --version');
    log(`✅ Node.js: ${nodeVersion.stdout.trim()}`, 'green');
    
    // Vérifier NPM
    const npmVersion = await execPromise('npm --version');
    log(`✅ NPM: ${npmVersion.stdout.trim()}`, 'green');
    
    // Vérifier Truffle
    try {
      const truffleVersion = await execPromise('truffle version');
      log(`✅ Truffle installé`, 'green');
    } catch (e) {
      log(`❌ Truffle non installé. Installez avec: npm install -g truffle`, 'red');
      return false;
    }
    
    return true;
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red');
    return false;
  }
}

async function checkGanache() {
  log('\n🔗 Vérification de Ganache...', 'cyan');
  
  try {
    const response = await fetch('http://localhost:7545', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'web3_clientVersion',
        params: [],
        id: 1
      })
    });
    
    if (response.ok) {
      log('✅ Ganache est en cours d\'exécution sur le port 7545', 'green');
      return true;
    }
  } catch (error) {
    log('❌ Ganache n\'est pas accessible sur le port 7545', 'red');
    log('   Démarrez Ganache GUI ou exécutez: ganache-cli -p 7545', 'yellow');
    return false;
  }
  
  return false;
}

async function installDependencies() {
  log('\n📦 Installation des dépendances...', 'cyan');
  
  try {
    // Dépendances racine
    log('Installing root dependencies...', 'blue');
    await execPromise('npm install');
    log('✅ Dépendances racine installées', 'green');
    
    // Dépendances client
    log('Installing client dependencies...', 'blue');
    await execPromise('npm install', './client');
    log('✅ Dépendances client installées', 'green');
    
    return true;
  } catch (error) {
    log(`❌ Erreur lors de l'installation: ${error.stderr}`, 'red');
    return false;
  }
}

async function compileContracts() {
  log('\n🔨 Compilation des contrats...', 'cyan');
  
  try {
    const result = await execPromise('truffle compile');
    log('✅ Contrats compilés avec succès', 'green');
    
    // Vérifier que les fichiers JSON ont été générés
    const buildDir = './build/contracts';
    if (fs.existsSync(buildDir)) {
      const files = fs.readdirSync(buildDir);
      log(`📄 ${files.length} fichiers de contrats générés`, 'blue');
    }
    
    return true;
  } catch (error) {
    log(`❌ Erreur de compilation: ${error.stderr}`, 'red');
    return false;
  }
}

async function deployContracts() {
  log('\n�� Déploiement des contrats...', 'cyan');
  
  try {
    const result = await execPromise('truffle migrate --network development');
    log('✅ Contrats déployés avec succès', 'green');
    
    // Extraire les adresses des contrats du résultat
    const output = result.stdout;
    const contractAddresses = output.match(/contract address:\s+(0x[a-fA-F0-9]{40})/g);
    if (contractAddresses) {
      log('\n📍 Adresses des contrats déployés:', 'magenta');
      contractAddresses.forEach(addr => {
        log(`   ${addr}`, 'blue');
      });
    }
    
    return true;
  } catch (error) {
    log(`❌ Erreur de déploiement: ${error.stderr}`, 'red');
    return false;
  }
}

async function copyContracts() {
  log('\n📋 Copie des ABI vers le client...', 'cyan');
  
  try {
    const buildDir = './build/contracts';
    const clientDir = './client/src/contracts';
    
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }
    
    const files = fs.readdirSync(buildDir);
    let copiedCount = 0;
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const sourcePath = path.join(buildDir, file);
        const destPath = path.join(clientDir, file);
        fs.copyFileSync(sourcePath, destPath);
        copiedCount++;
      }
    });
    
    log(`✅ ${copiedCount} fichiers ABI copiés`, 'green');
    return true;
  } catch (error) {
    log(`❌ Erreur lors de la copie: ${error.message}`, 'red');
    return false;
  }
}

async function startApplication() {
  log('\n🌐 Démarrage de l\'application React...', 'cyan');
  log('L\'application sera accessible sur http://localhost:3000', 'yellow');
  log('Appuyez sur Ctrl+C pour arrêter l\'application', 'yellow');
  
  try {
    // Démarrer l'application React
    const child = exec('npm start', { cwd: './client' });
    
    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    child.on('close', (code) => {
      log(`\n🛑 Application fermée avec le code ${code}`, 'yellow');
    });
    
    // Gérer l'arrêt propre
    process.on('SIGINT', () => {
      log('\n🛑 Arrêt de l\'application...', 'yellow');
      child.kill('SIGINT');
      process.exit(0);
    });
    
  } catch (error) {
    log(`❌ Erreur lors du démarrage: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('🚀 Script de déploiement dApp Blockchain TP3', 'bright');
  log('='.repeat(50), 'blue');
  
  // Vérifier les prérequis
  if (!(await checkPrerequisites())) {
    process.exit(1);
  }
  
  // Vérifier Ganache
  if (!(await checkGanache())) {
    log('\n⚠️  Continuez quand même ? (y/N)', 'yellow');
    // Pour l'instant, on continue sans Ganache pour la démo
  }
  
  // Installer les dépendances
  if (!(await installDependencies())) {
    process.exit(1);
  }
  
  // Compiler les contrats
  if (!(await compileContracts())) {
    process.exit(1);
  }
  
  // Déployer les contrats (seulement si Ganache est disponible)
  const ganacheAvailable = await checkGanache();
  if (ganacheAvailable) {
    if (!(await deployContracts())) {
      process.exit(1);
    }
  } else {
    log('⚠️  Déploiement ignoré - Ganache non disponible', 'yellow');
  }
  
  // Copier les ABI
  if (!(await copyContracts())) {
    process.exit(1);
  }
  
  log('\n✅ Déploiement terminé avec succès!', 'green');
  log('='.repeat(50), 'blue');
  
  // Démarrer l'application
  await startApplication();
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Erreur non gérée: ${reason}`, 'red');
  process.exit(1);
});

// Exécuter le script principal
if (require.main === module) {
  main().catch(error => {
    log(`��� Erreur fatale: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  checkPrerequisites,
  checkGanache,
  installDependencies,
  compileContracts,
  deployContracts,
  copyContracts
};