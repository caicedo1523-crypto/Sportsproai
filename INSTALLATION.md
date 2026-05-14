# Installation & Setup Guide

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** 6+ ([Download](https://redis.io/download))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/caicedo1523-crypto/sportsproai.git
cd sportsproai
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Environment Configuration

```bash
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Server
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:5000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/sportsproai
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsproai
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_secret_min_32_chars

# External APIs
API_FOOTBALL_KEY=your_api_football_key_from_rapidapi
SPORTS_DB_KEY=your_sports_db_key
SPORT_MONKS_KEY=your_sport_monks_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4

# Firebase
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
```

#### Database Setup

```bash
# Create PostgreSQL database
creatdb sportsproai

# Run migrations
cd backend
npm run migrate

# (Optional) Seed sample data
npm run seed
```

#### Start Backend Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Environment Configuration

```bash
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Start Frontend Server

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Frontend will run on `http://localhost:3000`

## Service Dependencies

### PostgreSQL

```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql
sudo systemctl start postgresql

# Windows
# Download and run installer from https://www.postgresql.org/download/windows/
```

### Redis

```bash
# macOS (Homebrew)
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis-server

# Windows
# Use Windows Subsystem for Linux (WSL) or Docker
```

### Docker Setup (Alternative)

```bash
# Create docker-compose.yml in root directory
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: sportsproai
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down
```

## API Keys & Credentials

### 1. API-Football (RapidAPI)

1. Go to [RapidAPI](https://rapidapi.com/)
2. Search for "API-Football"
3. Subscribe to the API
4. Copy your API key
5. Add to `.env`: `API_FOOTBALL_KEY=your_key`

### 2. OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account and login
3. Go to API keys section
4. Create new secret key
5. Add to `.env`: `OPENAI_API_KEY=your_key`

### 3. Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication (Email/Password, Google)
4. Get credentials from Project Settings
5. Add credentials to `.env` files

## Verification

### Check Backend

```bash
curl http://localhost:5000/health

# Expected response:
# {"status":"ok","timestamp":"2026-05-14T12:00:00Z","uptime":123.456}
```

### Check Frontend

Visit `http://localhost:3000` in your browser

### Test API Connection

```bash
# Get live matches
curl http://localhost:5000/api/matches/live

# Get match details
curl http://localhost:5000/api/matches/1
```

## Development Workflow

### Directory Structure

```
sportsproai/
├── backend/
│   ├── src/
│   ├── database/
│   ├── tests/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.local
│   └── package.json
├── docs/
├── .gitignore
└── README.md
```

### Running Tests

```bash
# Backend tests
cd backend
npm test
npm run test:watch

# Frontend tests
cd frontend
npm test
```

### Code Quality

```bash
# Linting
cd backend
npm run lint

cd frontend
npm run lint

# Format code
cd backend
npm run format

cd frontend
npm run format
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import GitHub repository
4. Add environment variables
5. Deploy automatically on push

### Backend (Railway/Render)

1. Push code to GitHub
2. Go to [Railway](https://railway.app/) or [Render](https://render.com/)
3. Create new service from GitHub
4. Add PostgreSQL database
5. Add environment variables
6. Deploy

### Production Environment Variables

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=very_long_secure_random_string
OPENAI_API_KEY=sk-...
API_FOOTBALL_KEY=...
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping
# Should return: PONG

# Check connection
redis-cli -h localhost -p 6379
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Key Issues

```bash
# Verify API key is set
echo $OPENAI_API_KEY

# Test API connection
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

## Next Steps

1. ✅ Complete setup following this guide
2. 📚 Read [Architecture Documentation](./ARCHITECTURE.md)
3. 📖 Check [API Documentation](./API.md)
4. 🤖 Review [AI System Documentation](./AI_SYSTEM.md)
5. 🚀 Deploy to production
6. 📊 Monitor performance and metrics

## Support

For issues or questions:

1. Check [GitHub Issues](https://github.com/caicedo1523-crypto/sportsproai/issues)
2. Review documentation
3. Open new issue with:
   - Description of problem
   - Steps to reproduce
   - Error messages/logs
   - Environment details

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Socket.io Guide](https://socket.io/docs/)

---

**Happy coding! 🚀⚽**
