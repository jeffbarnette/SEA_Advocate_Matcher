# Deployment Guide

> **📝 Disclaimer**: This deployment guide serves as an example of comprehensive production deployment documentation. In a real-world scenario, you would customize the deployment strategies, environment configurations, and security measures to match your specific infrastructure and requirements.

This guide covers deploying the Solace Advocate Directory to various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Environment Variables**
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-domain.com
   ```

3. **Deploy**
   - Click "Deploy" - Vercel handles the rest
   - Automatic deployments on git push

### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Add in Netlify dashboard
   - Same variables as Vercel

### Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository

2. **Add Database**
   - Add PostgreSQL service
   - Railway provides `DATABASE_URL` automatically

3. **Deploy**
   - Railway auto-deploys on push

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/solaceassignment
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=solaceassignment
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🗄️ Database Setup

### PostgreSQL Setup

1. **Create Database**
   ```sql
   CREATE DATABASE solaceassignment;
   CREATE USER solace_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE solaceassignment TO solace_user;
   ```

2. **Run Migrations**
   ```bash
   npm run migrate:up
   ```

3. **Seed Data**
   ```bash
   curl -X POST https://your-domain.com/api/seed
   ```

### Database Providers

#### Supabase
- Free tier available
- Built-in PostgreSQL
- Easy connection string

#### PlanetScale
- MySQL-compatible
- Serverless scaling
- Branching for schema changes

#### Neon
- PostgreSQL as a service
- Serverless scaling
- Free tier available

## 🔧 Environment Configuration

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Environment
NODE_ENV=production

# CORS (optional)
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### Optional Variables

```bash
# Logging
LOG_LEVEL=info

# Monitoring
SENTRY_DSN=your-sentry-dsn

# Analytics
GOOGLE_ANALYTICS_ID=your-ga-id
```

## 📊 Monitoring & Analytics

### Health Checks

Add health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await db.select().from(advocates).limit(1);
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}
```

### Performance Monitoring

- **Vercel Analytics**: Built-in with Vercel
- **Sentry**: Error tracking and performance
- **LogRocket**: Session replay and analytics

## 🔒 Security Considerations

### Production Security

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure, random passwords
   - Rotate credentials regularly

2. **Database Security**
   - Use SSL connections
   - Restrict database access
   - Regular backups

3. **API Security**
   - Rate limiting
   - Input validation
   - CORS configuration

4. **Headers**
   ```typescript
   // next.config.js
   const securityHeaders = [
     {
       key: 'X-DNS-Prefetch-Control',
       value: 'on'
     },
     {
       key: 'Strict-Transport-Security',
       value: 'max-age=63072000; includeSubDomains; preload'
     },
     {
       key: 'X-Frame-Options',
       value: 'SAMEORIGIN'
     }
   ];
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Performance Optimization

### Build Optimization

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

### Database Optimization

- **Indexes**: Add indexes for frequently queried fields
- **Connection Pooling**: Use connection pooling
- **Query Optimization**: Monitor slow queries

## 🔄 Backup Strategy

### Database Backups

```bash
# Daily backup script
#!/bin/bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Automated Backups

- **Supabase**: Automatic daily backups
- **Railway**: Automatic backups
- **Custom**: Set up cron jobs for regular backups

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection**
   - Verify `DATABASE_URL` format
   - Check network connectivity
   - Ensure database is running

3. **Environment Variables**
   - Verify all required variables are set
   - Check variable names and values
   - Ensure no typos in variable names

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check environment variables
npm run setup-env
```

---

For more detailed information, see the [README.md](../README.md) and [ENVIRONMENT.md](./ENVIRONMENT.md).
