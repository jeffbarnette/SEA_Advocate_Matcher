## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
npm i
```

### 2. Set up environment configuration

The application will automatically create a `.env.local` file from the template. For detailed environment setup instructions, see [ENVIRONMENT.md](./ENVIRONMENT.md).

```bash
npm run setup-env
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

The application supports both mock data (for quick development) and a real PostgreSQL database.

### Quick Start (Mock Data)
The app will work out of the box with mock data - no database setup required!

### Full Database Setup

1. **Start PostgreSQL with Docker**
   ```bash
   docker compose up -d
   ```

2. **Set up environment variables**
   ```bash
   npm run setup-env
   # Edit .env.local with your database URL
   ```

3. **Run database migrations**
   ```bash
   npm run migrate:up
   ```

4. **Seed the database**
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

## Environment Configuration

For detailed environment setup, configuration options, and troubleshooting, see [ENVIRONMENT.md](./ENVIRONMENT.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup-env` - Set up environment configuration
- `npm run migrate:up` - Run database migrations
- `npm run seed` - Seed the database
