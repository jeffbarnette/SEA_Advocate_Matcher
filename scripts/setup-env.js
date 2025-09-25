#!/usr/bin/env node

/**
 * Environment setup script
 * Copies .env.example to .env.local for development
 */

const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(process.cwd(), '.env.example');
const envLocalPath = path.join(process.cwd(), '.env.local');

function setupEnvironment() {
  console.log('🔧 Setting up environment configuration...');
  
  // Check if .env.example exists
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ .env.example file not found. Please create it first.');
    process.exit(1);
  }
  
  // Check if .env.local already exists
  if (fs.existsSync(envLocalPath)) {
    console.log('⚠️  .env.local already exists. Skipping creation.');
    console.log('   If you want to regenerate it, delete .env.local and run this script again.');
    return;
  }
  
  try {
    // Copy .env.example to .env.local
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envLocalPath, envContent);
    
    console.log('✅ Created .env.local from .env.example');
    console.log('📝 Please review and update the values in .env.local as needed');
    console.log('');
    console.log('🔍 Next steps:');
    console.log('   1. Update DATABASE_URL with your actual database connection string');
    console.log('   2. Set NODE_ENV to "development" for local development');
    console.log('   3. Configure other environment-specific values');
    console.log('');
    console.log('⚠️  Remember: .env.local is ignored by git and should contain your local secrets');
    
  } catch (error) {
    console.error('❌ Failed to create .env.local:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupEnvironment();
