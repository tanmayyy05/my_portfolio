# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                             │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐    │
│   │              React + TypeScript + Vite SPA                │    │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐ │    │
│   │  │ Navbar  │ │  Hero   │ │ Skills  │ │  Projects, etc. │ │    │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘ │    │
│   │   Tailwind CSS · Framer Motion · ShadCN UI                │    │
│   └─────────────────────────────────────────────────────────┘    │
└───────────────────────────┬───────────────────────────────────────┘
                              │ HTTPS (REST/JSON)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend Hosting)                       │
│                  Static build served via CDN                       │
└───────────────────────────┬───────────────────────────────────────┘
                              │ /api/* requests
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              RENDER / RAILWAY (Backend Hosting)                    │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐    │
│   │                  Spring Boot Application                  │    │
│   │                                                             │    │
│   │  ┌──────────────┐   ┌──────────────┐   ┌───────────────┐ │    │
│   │  │  Controllers  │──▶│   Services    │──▶│  Repositories │ │    │
│   │  │ - Contact     │   │ - Contact     │   │ - JPA/Hibernate│ │    │
│   │  │ - Projects    │   │ - Analytics   │   │                │ │    │
│   │  │ - Resume      │   │ - Project     │   │                │ │    │
│   │  │ - Analytics   │   │               │   │                │ │    │
│   │  │ - Newsletter  │   └──────┬───────┘   └───────┬───────┘ │    │
│   │  └──────────────┘          │                    │          │    │
│   │                              │ async              │          │    │
│   │                              ▼                    │          │    │
│   │                      ┌──────────────┐             │          │    │
│   │                      │ Email Service │             │          │    │
│   │                      │ (JavaMailSender)             │          │    │
│   │                      └──────────────┘             │          │    │
│   │                                                     │          │    │
│   │  Cross-cutting: CORS · Rate Limiting · Security    │          │    │
│   │  Headers · Validation · Global Exception Handler   │          │    │
│   └─────────────────────────────────────────────────────────┘    │
└───────────────────────────┬───────────────────────────────────────┘
                              │ JDBC (PostgreSQL)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  NEON POSTGRESQL (Database)                        │
│                                                                     │
│   ┌─────────────────┐ ┌──────────┐ ┌───────────────┐ ┌─────────┐ │
│   │ contact_messages │ │ visitors │ │ project_views │ │newsletter│ │
│   └─────────────────┘ └──────────┘ └───────────────┘ │subscribers│ │
│                                                          └─────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow Example — Contact Form Submission

1. User fills the contact form on the React frontend.
2. Frontend sends `POST /api/contact` with JSON body.
3. Request passes through Render/Railway → Spring Boot filters:
   - `SecurityHeadersConfig` adds security headers
   - `RateLimitConfig` checks per-IP rate limits
   - `CorsConfig` validates the origin
4. `ContactController` receives the validated `ContactRequestDTO` (Bean Validation runs automatically).
5. `ContactService`:
   - Checks per-email hourly rate limit (DB query)
   - Sanitizes input (strips HTML/XSS characters)
   - Saves `ContactMessage` entity via `ContactMessageRepository`
   - Asynchronously sends an email notification via `JavaMailSender`
6. Response returned to frontend with `201 Created` and confirmation.
7. On any error, `GlobalExceptionHandler` catches and formats a consistent error response.

## Layered Backend Architecture

```
Controller Layer   →  HTTP request/response handling, validation
Service Layer      →  Business logic, orchestration, async tasks
Repository Layer   →  Data access via Spring Data JPA
Entity Layer       →  JPA entities mapped to PostgreSQL tables
DTO Layer          →  Request/response data contracts
Config Layer       →  CORS, security headers, rate limiting
Exception Layer    →  Centralized error handling
```

## Frontend Architecture

```
App.tsx
 ├── Navbar
 ├── Hero (canvas particle network, profile image)
 ├── About (bio + facts grid)
 ├── Skills (animated skill bars by category)
 ├── Experience (vertical timeline)
 ├── Projects (featured project cards)
 ├── Certifications (cert grid)
 ├── Resume (download/view + animated preview)
 ├── Contact (form with backend integration + mailto fallback)
 └── Footer
```

State management: local React state + hooks (no global state library needed for this scope). Animations via Framer Motion with `useInView` for scroll-triggered reveals.

## Technology Choices Rationale

| Choice | Reason |
|---|---|
| Vite over CRA | Faster dev server, smaller bundles, modern tooling |
| Tailwind CSS | Rapid, consistent styling with design tokens via CSS variables |
| Framer Motion | Production-grade animation library, scroll-triggered reveals |
| Spring Boot 3 + Java 21 | Modern LTS Java, virtual threads support, robust ecosystem |
| PostgreSQL (Neon) | Serverless Postgres, generous free tier, branching support |
| Render/Railway | Simple Docker-based deploys with free tiers for backend |
| Vercel | Best-in-class static hosting + CDN for Vite/React apps |
