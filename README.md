# 🏢 Alpha Apartments - Estate Management System

A full-stack apartment management platform built with Django REST Framework and Next.js, designed for efficient property management, tenant communication, and maintenance tracking.

![Python](https://img.shields.io/badge/Python-3.12-blue.svg)
![Django](https://img.shields.io/badge/Django-4.2.11-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality

- **🏠 Apartment Management**: Track units, buildings, floors, and tenant assignments
- **👥 User Management**: Multi-role system (Tenants, Maintenance Staff, Administrators)
- **🔐 Authentication**: JWT-based auth with Google OAuth2 integration
- **📝 Issue Tracking**: Report and manage maintenance issues with priority levels
- **⭐ Rating System**: Rate maintenance staff and service quality
- **📊 Reports**: User reporting system with automated notifications
- **💬 Community Posts**: Tenant communication board with upvotes/downvotes and replies
- **📧 Email Notifications**: Automated email alerts for issue assignments and updates
- **🔍 Advanced Filtering**: Filter posts by tags, apartments by building/floor

### Technical Features

- **🔄 Real-time Task Processing**: Celery workers for background tasks
- **📅 Scheduled Jobs**: Celery Beat for periodic reputation updates
- **🌐 RESTful API**: Comprehensive API with Swagger/ReDoc documentation
- **🖼️ Media Management**: Cloudinary integration for image uploads
- **🔒 Security**: Argon2 password hashing, CSRF protection, secure cookies
- **📱 Responsive Design**: Mobile-first Next.js frontend with Tailwind CSS
- **🐳 Docker Support**: Full containerization for development and production

## 🛠️ Tech Stack

### Backend

- **Framework**: Django 4.2.11 with Django REST Framework 3.15
- **Database**: PostgreSQL
- **Task Queue**: Celery 5.3.6 with Redis broker
- **Authentication**: Djoser, Simple JWT, Social Auth (Google OAuth2)
- **Email**: django-celery-email with Mailpit (dev)
- **Media Storage**: Cloudinary
- **API Documentation**: drf-yasg (Swagger/ReDoc)
- **Additional Libraries**:
  - django-filter for advanced filtering
  - django-taggit for tag management
  - django-countries for country fields
  - phonenumber-field for phone validation
  - Pillow for image processing

### Frontend

- **Framework**: Next.js 14.2 with React 18
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **UI Components**: Radix UI primitives (Avatar, Dialog, Dropdown, etc.)
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: Heroicons, Lucide React, Radix Icons

### DevOps & Infrastructure

- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (reverse proxy)
- **Task Monitoring**: Flower
- **Development Tools**:
  - Black (code formatting)
  - ESLint + Prettier (linting)
  - Watchfiles (auto-reload)

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   Next.js App   │────────▶│   Nginx Proxy    │
│   (Port 3000)   │         │   (Port 8080)    │
└─────────────────┘         └──────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │  Django API      │
                            │  (Port 8000)     │
                            └──────────────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                ▼                    ▼                    ▼
        ┌──────────────┐     ┌──────────────┐    ┌──────────────┐
        │  PostgreSQL  │     │    Redis     │    │  Cloudinary  │
        │  (Port 5432) │     │              │    │   (Media)    │
        └──────────────┘     └──────────────┘    └──────────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                ▼                    ▼                    ▼
        ┌──────────────┐     ┌──────────────┐    ┌──────────────┐
        │Celery Worker │     │ Celery Beat  │    │    Flower    │
        │              │     │  (Scheduler) │    │  (Port 5555) │
        └──────────────┘     └──────────────┘    └──────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Git
- Make (optional, for using Makefile commands)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/estate-mngt.git
   cd estate-mngt/api
   ```

2. **Create the Docker network**

   ```bash
   docker network create estate_prod_nw
   ```

3. **Set up environment variables**

   ```bash
   cp .envs/.env.example .envs/.env.local
   ```

   Edit `.envs/.env.local` with your configuration (see [Environment Variables](#-environment-variables))

4. **Build and start the containers**

   ```bash
   make build
   ```

   Or without Make:

   ```bash
   docker compose -f local.yml up --build -d
   ```

5. **Run database migrations**

   ```bash
   make migrate
   ```

6. **Create a superuser**

   ```bash
   make superuser
   ```

7. **Access the application**
   - **Frontend**: http://localhost:8080
   - **API Documentation**: http://localhost:8080/redoc/
   - **Django Admin**: http://localhost:8080/supersecret/ (or your custom admin URL)
   - **Flower (Task Monitor)**: http://localhost:5555
   - **Mailpit (Email Testing)**: http://localhost:8025

## 📁 Project Structure

```
estate-mngt/
├── api/
│   ├── config/                    # Django project configuration
│   │   ├── settings/
│   │   │   ├── base.py           # Base settings
│   │   │   ├── local.py          # Development settings
│   │   │   └── production.py     # Production settings
│   │   ├── urls.py               # URL routing
│   │   ├── celery_app.py         # Celery configuration
│   │   └── wsgi.py
│   │
│   ├── core_apps/                # Django applications
│   │   ├── apartments/           # Apartment management
│   │   ├── common/               # Shared models & utilities
│   │   ├── issues/               # Issue tracking system
│   │   ├── posts/                # Community posts & replies
│   │   ├── profiles/             # User profiles
│   │   ├── ratings/              # User rating system
│   │   ├── reports/              # User reporting system
│   │   └── users/                # Custom user model & auth
│   │
│   ├── client/                   # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/              # Next.js app directory
│   │   │   ├── components/       # React components
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── lib/              # Utilities & helpers
│   │   │   ├── types/            # TypeScript types
│   │   │   └── utils/            # Utility functions
│   │   ├── public/               # Static assets
│   │   └── docker/               # Client Docker configs
│   │
│   ├── docker/                   # Docker configurations
│   │   ├── local/
│   │   │   ├── django/           # Django Dockerfile
│   │   │   ├── nginx/            # Nginx config
│   │   │   └── postgres/         # PostgreSQL init scripts
│   │   └── production/
│   │
│   ├── requirements/             # Python dependencies
│   │   ├── base.txt
│   │   ├── local.txt
│   │   └── production.txt
│   │
│   ├── staticfiles/              # Collected static files
│   ├── local.yml                 # Docker Compose config
│   ├── Makefile                  # Development shortcuts
│   └── manage.py                 # Django management script
│
└── README.md                     # This file
```

## 📚 API Documentation

The API is fully documented using drf-yasg. Once the application is running, you can access:

- **ReDoc Documentation**: http://localhost:8080/redoc/
- Interactive API documentation with schema details

### Main API Endpoints

| Endpoint                    | Method                 | Description          |
| --------------------------- | ---------------------- | -------------------- |
| `/api/v1/auth/users/`       | POST                   | User registration    |
| `/api/v1/auth/jwt/create/`  | POST                   | Login (obtain JWT)   |
| `/api/v1/auth/jwt/refresh/` | POST                   | Refresh JWT token    |
| `/api/v1/profiles/`         | GET, PUT, PATCH        | User profiles        |
| `/api/v1/apartments/`       | GET, POST, PUT, DELETE | Apartment management |
| `/api/v1/issues/`           | GET, POST, PUT, DELETE | Issue tracking       |
| `/api/v1/posts/`            | GET, POST, PUT, DELETE | Community posts      |
| `/api/v1/ratings/`          | GET, POST              | User ratings         |
| `/api/v1/reports/`          | GET, POST              | User reports         |

### Authentication

The API uses **JWT tokens stored in HTTP-only cookies** for authentication:

```javascript
// Login request
POST /
  api /
  v1 /
  auth /
  jwt /
  create /
  {
    email: "user@example.com",
    password: "yourpassword",
  };

// Cookie is automatically set and sent with subsequent requests
```

## 🔑 Environment Variables

Create a `.env.local` file in `.envs/` directory with the following variables:

### Django Settings

```env
SITE_NAME=Alpha Apartments
DJANGO_SECRET_KEY=your-super-secret-key-here
DJANGO_ADMIN_URL=supersecret/
```

### Database

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=your-database-name
POSTGRES_USER=your-username
POSTGRES_PASSWORD=your-db-password
```

### Email Configuration

```env
EMAIL_PORT=1025
EMAIL_HOST=mailpit
DEFAULT_FROM_EMAIL=noreply@alphaapartments.com
```

### Celery & Redis

```env
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0
CELERY_FLOWER_USER=admin
CELERY_FLOWER_PASSWORD=admin123
```

### Security

```env
COOKIE_SECURE=False  # True in production
SIGNING_KEY=your-jwt-signing-key
```

### Cloudinary (Media Storage)

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Google OAuth2

```env
REDIRECT_URIS=http://localhost:3000/auth/callback
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 💻 Development

### Using Make Commands

The project includes a Makefile for common tasks:

```bash
# Build and start all containers
make build

# Start containers
make up

# Stop containers
make down

# Stop and remove volumes
make down-v

# View all logs
make show-logs

# View API logs only
make show-logs-api

# Create migrations
make makemigrations

# Apply migrations
make migrate

# Collect static files
make collectstatic

# Create superuser
make superuser

# Access PostgreSQL shell
make estate-db
```

### Manual Docker Commands

```bash
# Build and start
docker compose -f local.yml up --build -d

# View logs
docker compose -f local.yml logs -f

# Execute Django commands
docker compose -f local.yml run --rm api python manage.py <command>

# Access Django shell
docker compose -f local.yml run --rm api python manage.py shell

# Run tests
docker compose -f local.yml run --rm api python manage.py test
```

### Frontend Development

```bash
# Navigate to client directory
cd client

# Install dependencies (if not using Docker)
npm install

# Run development server (standalone)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Code Quality

**Backend (Python)**

```bash
# Format code with Black
docker compose -f local.yml run --rm api black .

# Check formatting
docker compose -f local.yml run --rm api black --check .
```

**Frontend (TypeScript/React)**

```bash
cd client
npm run lint
npx prettier --write .
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
docker compose -f local.yml run --rm api python manage.py test

# Run specific app tests
docker compose -f local.yml run --rm api python manage.py test core_apps.issues

# Run with coverage
docker compose -f local.yml run --rm api coverage run --source='.' manage.py test
docker compose -f local.yml run --rm api coverage report
```

### Frontend Tests

```bash
cd client
npm test
```