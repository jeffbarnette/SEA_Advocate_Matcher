# Environment Configuration

This document explains how to set up and configure environment variables for the Solace Advocate Matcher application.

## Quick Start

1. **Automatic Setup** (Recommended):
   ```bash
   npm run setup-env
   ```

2. **Manual Setup**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## Environment Files

### `.env.example`
Template file containing all required environment variables with example values. This file is committed to the repository and serves as documentation.

### `.env.local`
Local development environment file. This file is ignored by git and contains your actual configuration values.

### `.env`
Production environment file (not created by default). Used in production deployments.

## Required Environment Variables

### Database Configuration
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/solaceassignment
```
- **Required**: Yes
- **Description**: PostgreSQL connection string
- **Format**: `postgresql://username:password@host:port/database`

### Application Environment
```bash
NODE_ENV=development
```
- **Required**: Yes
- **Description**: Application environment
- **Values**: `development`, `production`, `test`

### CORS Configuration
```bash
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```
- **Required**: No (defaults to localhost)
- **Description**: Comma-separated list of allowed origins for CORS
- **Production**: Must be set to your actual domain(s)

## Optional Environment Variables

### API Configuration
```bash
API_BASE_URL=http://localhost:3000
LOG_LEVEL=debug
```

### Security (Production Only)
```bash
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
API_KEY=your-api-key-change-this-in-production
```

### Feature Flags
```bash
ENABLE_CORS=true
ENABLE_RATE_LIMITING=false
ENABLE_AUTHENTICATION=false
```

## Environment Validation

The application validates environment variables on startup:

- **Required variables** are checked for presence
- **DATABASE_URL** format is validated
- **NODE_ENV** values are restricted to valid options
- **Production mode** will exit if validation fails

## Development vs Production

### Development
- Uses `.env.local` file
- Relaxed validation (continues with mock database if connection fails)
- Detailed error messages
- Debug logging enabled

### Production
- Uses system environment variables or `.env` file
- Strict validation (exits on failure)
- Generic error messages
- Optimized logging

## Docker Configuration

For Docker deployments, set environment variables in your `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/solaceassignment
      - NODE_ENV=production
      - ALLOWED_ORIGINS=https://yourdomain.com
```

## Troubleshooting

### Common Issues

1. **"DATABASE_URL is required"**
   - Ensure `.env.local` exists and contains `DATABASE_URL`
   - Run `npm run setup-env` to create the file

2. **"Invalid PostgreSQL connection string"**
   - Check DATABASE_URL format: `postgresql://user:pass@host:port/db`
   - Ensure database server is running

3. **"Environment validation failed"**
   - Check all required variables are set
   - Verify NODE_ENV is one of: development, production, test

### Debug Mode

Enable debug logging:
```bash
LOG_LEVEL=debug npm run dev
```

## Security Notes

- Never commit `.env.local` or `.env` files to git
- Use strong, unique secrets in production
- Rotate secrets regularly
- Use environment-specific configurations
- Consider using a secrets management service for production
