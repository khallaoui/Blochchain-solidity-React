const fs = require('fs');
const path = require('path');

// Paths
const buildDir = path.join(__dirname, '..', 'build', 'contracts');
const contractsDir = path.join(__dirname, 'src', 'contracts');

console.log('🔄 Copying contract artifacts...');
console.log(`Source: ${buildDir}`);
console.log(`Destination: ${contractsDir}`);

// Create contracts directory if it doesn't exist
if (!fs.existsSync(contractsDir)) {
  fs.mkdirSync(contractsDir, { recursive: true });
  console.log('📁 Created contracts directory');
}

// Check if build directory exists
if (!fs.existsSync(buildDir)) {
  console.log('⚠️  Build directory not found. Please run "truffle compile" first.');
  console.log('   Expected path:', buildDir);
  process.exit(0); // Exit gracefully, not an error
}

try {
  // Read all files in build/contracts
  const files = fs.readdirSync(buildDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  if (jsonFiles.length === 0) {
    console.log('⚠️  No contract artifacts found. Please run "truffle compile" first.');
    process.exit(0);
  }
  
  let copiedCount = 0;
  
  // Copy each JSON file
  jsonFiles.forEach(file => {
    const sourcePath = path.join(buildDir, file);
    const destPath = path.join(contractsDir, file);
    
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file}`);
      copiedCount++;
    } catch (error) {
      console.log(`❌ Failed to copy ${file}:`, error.message);
    }
  });
  
  console.log(`\n🎉 Successfully copied ${copiedCount}/${jsonFiles.length} contract artifacts`);
  
  // List the contracts that were copied
  if (copiedCount > 0) {
    console.log('\n📋 Available contracts:');
    jsonFiles.forEach(file => {
      const contractName = file.replace('.json', '');
      console.log(`   - ${contractName}`);
    });
  }
  
} catch (error) {
  console.error('❌ Error copying contracts:', error.message);
  process.exit(1);
}