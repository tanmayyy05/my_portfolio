# Tanmay Wagh — Portfolio

A production-ready, full-stack personal portfolio website built for **Tanmay Bharat Wagh**, an aspiring Java Full Stack Developer pursuing B.Tech in Computer Science (AI) at G.H. Raisoni College of Engineering and Management, Pune.

🔗 **Live Demo**: _add your deployed URL here_
📄 **Resume**: [Download](frontend/public/resume.pdf)
👤 **GitHub**: [github.com/tanmayyy05](https://github.com/tanmayyy05)
💼 **LinkedIn**: [linkedin.com/in/tanmaywagh05](https://www.linkedin.com/in/tanmaywagh05/)

---

## Project Overview

This is a complete monorepo containing:

- **`frontend/`** — A dark-themed, animated React + TypeScript + Vite portfolio with Tailwind CSS, Framer Motion, and ShadCN UI components
- **`backend/`** — A Spring Boot 3 (Java 21) REST API handling contact form submissions, project data, resume downloads, and analytics
- **`database/`** — PostgreSQL schema and seed scripts
- **`docs/`** — Architecture, API, local development, and deployment documentation
- **`deployment/`** — Render, Railway, and GitHub Actions CI/CD configuration

---

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- ShadCN UI (Radix primitives)
- Lucide Icons

### Backend
- Java 21
- Spring Boot 3.2
- Spring Data JPA / Hibernate
- Spring Validation
- Spring Mail
- PostgreSQL
- Maven

### Infrastructure
- Vercel (Frontend hosting)
- Render / Railway (Backend hosting)
- Neon PostgreSQL (Database)
- GitHub Actions (CI/CD)
- Docker

---

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full system diagram and request flow.

```
React (Vite) ──HTTPS──▶ Spring Boot API ──JDBC──▶ PostgreSQL (Neon)
   │ Vercel                  │ Render/Railway
```

---

## Folder Structure

```
portfolio/
├── frontend/                  # React + TypeScript + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # ShadCN UI components (toast, etc.)
│   │   │   ├── sections/       # Page sections (Hero, About, Skills, ...)
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── assets/
│   │   │   └── profile.png
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   ├── resume.pdf
│   │   ├── sitemap.xml
│   │   ├── robots.txt
│   │   └── favicon.svg
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env.example
│
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/com/tanmay/portfolio/
│   │   ├── controller/          # REST controllers
│   │   ├── service/              # Business logic
│   │   ├── repository/           # Spring Data JPA repositories
│   │   ├── entity/                # JPA entities
│   │   ├── dto/                   # Data transfer objects
│   │   ├── exception/             # Exception handling
│   │   ├── config/                # CORS, security, rate limiting
│   │   └── PortfolioApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── static/Tanmay_Wagh_Resume.pdf
│   ├── pom.xml
│   ├── Dockerfile
│   └── .env.example
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── LOCAL_DEVELOPMENT.md
│   └── DEPLOYMENT.md
│
├── deployment/
│   ├── render.yaml
│   ├── railway.json
│   └── .github/workflows/ci-cd.yml
│
├── .github/workflows/ci-cd.yml
└── README.md
```

---

## Quick Start

```bash
# 1. Database
createdb portfolio_db
psql -U postgres -d portfolio_db -f database/schema.sql

# 2. Backend
cd backend
cp .env.example .env   # edit with your credentials
mvn spring-boot:run

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit **http://localhost:5173**.

For detailed setup instructions, see [`docs/LOCAL_DEVELOPMENT.md`](docs/LOCAL_DEVELOPMENT.md).

---

## Running Locally

| Service | Command | URL |
|---|---|---|
| Frontend | `npm run dev` (in `frontend/`) | http://localhost:5173 |
| Backend | `mvn spring-boot:run` (in `backend/`) | http://localhost:8080 |
| Database | PostgreSQL | localhost:5432 |

---

## Deployment

| Component | Platform | Guide |
|---|---|---|
| Frontend | Vercel | [`docs/DEPLOYMENT.md#4-frontend-deployment--vercel`](docs/DEPLOYMENT.md) |
| Backend | Render / Railway | [`docs/DEPLOYMENT.md#2-backend-deployment--render`](docs/DEPLOYMENT.md) |
| Database | Neon PostgreSQL | [`docs/DEPLOYMENT.md#1-database-deployment--neon-postgresql`](docs/DEPLOYMENT.md) |

Full step-by-step instructions in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8080
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Backend (`backend/.env`)
```env
DB_URL=jdbc:postgresql://localhost:5432/portfolio_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
EMAIL_USERNAME=tanmay3011w@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
NOTIFICATION_EMAIL=tanmay3011w@gmail.com
CORS_ORIGINS=http://localhost:5173,https://tanmaywagh.dev
```

---

## API Reference

Full API documentation: [`docs/API.md`](docs/API.md)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/{id}` | Get project details |
| `GET` | `/api/resume` | Download resume PDF |
| `GET` | `/api/resume/view` | View resume inline |
| `GET` | `/api/analytics` | Get site analytics |
| `POST` | `/api/analytics/track` | Track a page visit |
| `POST` | `/api/newsletter/subscribe` | Subscribe to newsletter |
| `GET` | `/api/health` | Health check |

---

## Features

### Frontend
- 🎨 Distinctive dark theme with orange accent, custom cursor, particle network background
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Framer Motion scroll-triggered animations
- 🧩 ShadCN UI components (Toast notifications)
- 🔍 SEO optimized (meta tags, Open Graph, Twitter cards, sitemap, robots.txt)
- ⚡ Code-split bundles, lazy-loaded sections
- 📄 Resume download/view

### Backend
- 🔒 Input validation, sanitization, rate limiting (per-IP and per-email)
- 🌐 CORS configuration
- 📧 Async email notifications on contact form submission
- 📊 Visitor and project view analytics
- 🛡️ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ⚠️ Centralized exception handling with consistent error responses
- ❤️ Health check endpoint for deployment monitoring

---

## Performance Targets

- Lighthouse Performance Score: > 95
- Code splitting via manual chunks (vendor, motion)
- Lazy image loading
- Long-term caching headers for static assets (Vercel)

---

## Troubleshooting

See [`docs/LOCAL_DEVELOPMENT.md#troubleshooting`](docs/LOCAL_DEVELOPMENT.md) for common issues and solutions.

---

## Author

**Tanmay Bharat Wagh**
B.Tech Computer Science & Engineering (AI), G.H. Raisoni College of Engineering and Management, Pune
📧 tanmay3011w@gmail.com · 📍 Pune, Maharashtra, India

---

## License

This project is open source and available for personal/portfolio use.
