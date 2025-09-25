/**
 * Environment variable validation and configuration
 */

interface EnvConfig {
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  ALLOWED_ORIGINS: string;
  API_BASE_URL: string;
  JWT_SECRET?: string;
  API_KEY?: string;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  ENABLE_CORS: boolean;
  ENABLE_RATE_LIMITING: boolean;
  ENABLE_AUTHENTICATION: boolean;
}

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value || defaultValue!;
}

function getBooleanEnvVar(name: string, defaultValue: boolean = false): boolean {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
}

function getArrayEnvVar(name: string, defaultValue: string[] = []): string[] {
  const value = process.env[name];
  if (!value) return defaultValue;
  return value.split(',').map(item => item.trim()).filter(Boolean);
}

export const env: EnvConfig = {
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  NODE_ENV: (getEnvVar('NODE_ENV', 'development') as EnvConfig['NODE_ENV']),
  ALLOWED_ORIGINS: getEnvVar('ALLOWED_ORIGINS', 'http://localhost:3000'),
  API_BASE_URL: getEnvVar('API_BASE_URL', 'http://localhost:3000'),
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY: process.env.API_KEY,
  LOG_LEVEL: (getEnvVar('LOG_LEVEL', 'info') as EnvConfig['LOG_LEVEL']),
  ENABLE_CORS: getBooleanEnvVar('ENABLE_CORS', true),
  ENABLE_RATE_LIMITING: getBooleanEnvVar('ENABLE_RATE_LIMITING', false),
  ENABLE_AUTHENTICATION: getBooleanEnvVar('ENABLE_AUTHENTICATION', false),
};

// Validation for required environment variables
export function validateEnvironment(): void {
  const requiredVars = ['DATABASE_URL'];
  const missingVars: string[] = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }

  // Validate DATABASE_URL format
  if (!env.DATABASE_URL.startsWith('postgresql://')) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
  }

  // Validate NODE_ENV
  if (!['development', 'production', 'test'].includes(env.NODE_ENV)) {
    throw new Error('NODE_ENV must be one of: development, production, test');
  }
}

// Helper functions
export function isDevelopment(): boolean {
  return env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return env.NODE_ENV === 'production';
}

export function isTest(): boolean {
  return env.NODE_ENV === 'test';
}

export function getAllowedOrigins(): string[] {
  return getArrayEnvVar('ALLOWED_ORIGINS', ['http://localhost:3000']);
}

export default env;
