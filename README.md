# NestJS Template

A production-ready NestJS template featuring Clean Architecture, CQRS pattern, and Domain-Driven Design principles.

## 🚀 Features

- **Clean Architecture**: Organized in layers (Domain, Application, Infrastructure, Presentation)
- **CQRS Pattern**: Command Query Responsibility Segregation with `@nestjs/cqrs`
- **Domain-Driven Design**: Entity-centric domain modeling
- **JWT Authentication**: Secure authentication with refresh token support
- **Redis Caching**: High-performance caching with Redis
- **Swagger Documentation**: Auto-generated API documentation
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **AWS S3 Integration**: File upload and asset management
- **Global Exception Handling**: Standardized error responses
- **Validation**: Request validation with `class-validator`
- **Logging**: Structured logging with Winston
- **Health Checks**: Database and Redis health monitoring
- **Sentry Integration**: Error tracking and monitoring

## 📦 Tech Stack

### Core
- **NestJS** v11 - Progressive Node.js framework
- **TypeScript** v5 - Type-safe JavaScript
- **Prisma** - Modern ORM for PostgreSQL
- **Redis** - In-memory data structure store
- **PostgreSQL** - Relational database

### Authentication & Security
- **Passport JWT** - JWT authentication strategy
- **Bcrypt** - Password hashing
- **Helmet** - Security headers

### Infrastructure
- **AWS SDK** - S3 file storage
- **Sentry** - Error tracking
- **Winston** - Logging
- **Cache Manager** - Caching abstraction

### Development
- **ESLint** - Code linting
- **Jest** - Testing framework
- **pnpm** - Fast package manager

## 📁 Project Structure

```
nestjs-template/
├── packages/
│   ├── api/                    # Main API application
│   │   ├── src/
│   │   │   ├── app/           # Application bootstrap
│   │   │   │   ├── integration/    # Module integrations
│   │   │   │   └── lib/            # Global configurations
│   │   │   ├── common/        # Shared utilities
│   │   │   │   ├── dto/            # Common DTOs
│   │   │   │   ├── filters/        # Exception filters
│   │   │   │   ├── interceptors/   # Response interceptors
│   │   │   │   ├── modules/        # Shared modules (Log, S3, Health, etc.)
│   │   │   │   ├── utils/          # Utility functions
│   │   │   │   └── validation/     # Environment validation
│   │   │   ├── modules/       # Feature modules
│   │   │   │   ├── user/          # User & Auth module
│   │   │   │   │   ├── application/    # Use cases (Commands/Queries)
│   │   │   │   │   ├── domain/         # Business logic & entities
│   │   │   │   │   ├── infrastructure/ # Implementation details
│   │   │   │   │   └── presentation/   # Controllers & DTOs
│   │   │   │   └── asset/         # Asset management module
│   │   │   │       ├── application/
│   │   │   │       ├── domain/
│   │   │   │       ├── infrastructure/
│   │   │   │       └── presentation/
│   │   │   └── main.ts        # Application entry point
│   │   └── test/              # E2E tests
│   └── database/              # Database package
│       ├── prisma/
│       │   ├── migrations/    # Database migrations
│       │   └── schema/        # Prisma schema files
│       └── client/            # Generated Prisma client
├── pnpm-workspace.yaml
└── package.json
```

## 🏗️ Architecture

This template follows **Clean Architecture** principles with clear separation of concerns:

### Domain Layer
- **Entities**: Core business objects
- **Repository Ports**: Interfaces for data access
- **Types & Constants**: Domain-specific definitions

### Application Layer
- **Commands**: Write operations (Create, Update, Delete)
- **Queries**: Read operations (Get, List, Search)
- **Handlers**: Command/Query execution logic
- **Facades**: Simplified interfaces for complex operations

### Infrastructure Layer
- **Repositories**: Data access implementation
- **Mappers**: Convert between domain entities and persistence models
- **Guards**: Authentication and authorization
- **Strategies**: Passport strategies

### Presentation Layer
- **Controllers**: HTTP request handlers
- **DTOs**: Request/Response data transfer objects
- **Decorators**: Custom decorators for routes

## 🚦 Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 10
- **PostgreSQL** >= 14
- **Redis** >= 7

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nestjs-template
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create `.env` file in the root directory:

```env
# Environment
NODE_ENV=local

# Server
PORT=8000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PRISMA_LOG_LEVEL=warn

# Redis
REDIS_URL=redis://localhost:6379
REDIS_FLUSH_ON_START=false

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# CORS
CORS_ORIGIN=http://localhost:3000

# S3 (Optional)
S3_ENABLED=false
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket
S3_ENDPOINT=https://s3.amazonaws.com

# Sentry (Optional)
SENTRY_ENABLED=false
SENTRY_DSN=your-sentry-dsn
```

4. **Run database migrations**
```bash
pnpm database prisma migrate dev
```

5. **Seed the database (optional)**
```bash
pnpm database prisma db seed
```

6. **Start the development server**
```bash
pnpm api dev
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Swagger documentation is automatically generated and available at:

```
http://localhost:8000/api/docs
```

### Authentication

All endpoints except login and refresh token require JWT authentication.

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Use the access token in subsequent requests:**
```bash
Authorization: Bearer <access_token>
```

## 🧪 Testing

```bash
# Unit tests
pnpm api test

# E2E tests
pnpm api test:e2e

# Test coverage
pnpm api test:cov
```

## 📜 Available Scripts

### Root Scripts
```bash
pnpm api <command>      # Run API commands
pnpm database <command> # Run database commands
```

### API Scripts
```bash
pnpm api dev            # Start development server
pnpm api build          # Build for production
pnpm api start:prod     # Start production server
pnpm api lint           # Lint and fix code
pnpm api test           # Run tests
pnpm api typecheck      # Type checking
```

### Database Scripts
```bash
pnpm database prisma migrate dev    # Create and apply migration
pnpm database prisma migrate deploy # Deploy migrations (production)
pnpm database prisma studio         # Open Prisma Studio
pnpm database prisma db seed        # Seed database
pnpm database prisma generate       # Generate Prisma Client
```

## 🔐 Security Features

- **Helmet**: Security headers configuration
- **CORS**: Cross-origin resource sharing control
- **Rate Limiting**: Protection against brute-force attacks
- **JWT**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Validation**: Input validation with class-validator
- **Global Guards**: Protected routes by default with `@Public()` decorator for exceptions

## 📊 Monitoring & Observability

- **Sentry**: Error tracking and performance monitoring
- **Winston**: Structured logging with multiple transports
- **Health Checks**: `/health` endpoint for monitoring
  - Database connectivity
  - Redis connectivity
  - Memory usage
  - Disk space

## 🎯 Response Format

All API responses follow a consistent format:

```json
{
  "status": 200,
  "method": "GET",
  "instance": "/api/users/me",
  "data": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "details": "Success",
  "errors": null,
  "timestamp": "2025-10-12T00:00:00.000Z"
}
```

## 🛠️ Development Guidelines

### Creating a New Module

1. Generate module structure:
```bash
nest g module modules/feature
```

2. Follow Clean Architecture layers:
   - `domain/`: Entities, repository ports, types
   - `application/`: Commands, queries, handlers, facades
   - `infrastructure/`: Repository implementations, mappers
   - `presentation/`: Controllers, DTOs

3. Use CQRS pattern:
   - **Commands** for write operations
   - **Queries** for read operations

### Adding New Endpoints

1. Create DTO classes with validation decorators
2. Implement command/query handlers
3. Create controller methods
4. Add Swagger documentation with `@ApiResponseType()`

### Custom Decorators

- `@Public()`: Skip authentication for endpoint
- `@CurrentUser()`: Get authenticated user from request
- `@ApiResponseType()`: Auto-generate Swagger response schema

## 🐳 Docker Support

```bash
# Build image
docker build -t nestjs-template .

# Run container
docker run -p 8000:8000 --env-file .env nestjs-template
```

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `local` | Environment mode |
| `PORT` | No | `8000` | Server port |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `REDIS_URL` | Yes | - | Redis connection string |
| `JWT_SECRET` | Yes | - | JWT signing secret (min 32 chars) |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Allowed CORS origin |
| `S3_ENABLED` | No | `false` | Enable S3 integration |
| `SENTRY_ENABLED` | No | `false` | Enable Sentry monitoring |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://docs.nestjs.com/recipes/cqrs)

## 📮 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using NestJS

