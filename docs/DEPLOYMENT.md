# Deployment Guide

This guide covers deploying the portfolio to production:
- **Frontend** → Vercel
- **Backend** → Render or Railway
- **Database** → Neon PostgreSQL

---

## 1. Database Deployment — Neon PostgreSQL

1. Go to [neon.tech](https://neon.tech) and create a free account.
2. Click **New Project**, name it `portfolio-db`, choose a region close to your backend host.
3. Once created, copy the **connection string** from the dashboard. It looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/portfolio_db?sslmode=require
   ```
4. Convert this to a JDBC URL for Spring Boot:
   ```
   jdbc:postgresql://ep-xxx-xxx.region.aws.neon.tech/portfolio_db?sslmode=require
   ```
5. Run the schema against your Neon database:
   - Open the Neon **SQL Editor** in the dashboard
   - Paste the contents of `database/schema.sql` and run it
   - (Optional) paste `database/seed.sql` for sample data

6. Note down for later:
   - `DB_URL` = `jdbc:postgresql://ep-xxx-xxx.region.aws.neon.tech/portfolio_db?sslmode=require`
   - `DB_USERNAME` = your Neon username
   - `DB_PASSWORD` = your Neon password

---

## 2. Backend Deployment — Render

### Option A: Using render.yaml (Blueprint)

1. Push your code to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Blueprint**.
3. Connect your repository. Render will detect `deployment/render.yaml`.
4. Fill in the required environment variables when prompted (see table below).
5. Click **Apply** — Render builds the Docker image from `backend/Dockerfile` and deploys it.

### Option B: Manual Web Service

1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect your GitHub repo.
3. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Region**: Singapore (or closest to your users)
   - **Plan**: Free
4. Add environment variables (see table below).
5. Set **Health Check Path**: `/api/health`
6. Click **Create Web Service**.

### Backend Environment Variables (Render/Railway)

| Variable | Example Value |
|---|---|
| `PORT` | `8080` |
| `DB_URL` | `jdbc:postgresql://ep-xxx.neon.tech/portfolio_db?sslmode=require` |
| `DB_USERNAME` | `your_neon_username` |
| `DB_PASSWORD` | `your_neon_password` |
| `MAIL_HOST` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `EMAIL_USERNAME` | `tanmay3011w@gmail.com` |
| `EMAIL_PASSWORD` | `your_gmail_app_password` |
| `NOTIFICATION_EMAIL` | `tanmay3011w@gmail.com` |
| `CORS_ORIGINS` | `https://tanmaywagh.dev,https://your-vercel-url.vercel.app` |

### Build & Start Commands (if not using Docker)

```
Build Command: ./mvnw clean package -DskipTests
Start Command: java -jar target/portfolio-1.0.0.jar
```

---

## 3. Backend Deployment — Railway (Alternative)

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. Select your repository.
3. Railway detects `deployment/railway.json` and `backend/Dockerfile`.
4. Set **Root Directory** to `backend`.
5. Add the same environment variables as the table above under **Variables**.
6. Railway auto-assigns a public URL — note it down (e.g., `https://portfolio-backend-production.up.railway.app`).
7. Set the health check path to `/api/health` in **Settings → Healthcheck**.

---

## 4. Frontend Deployment — Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import your GitHub repository.
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add environment variables:

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://your-backend.onrender.com` |
| `VITE_EMAILJS_SERVICE_ID` | (optional, if using EmailJS fallback) |
| `VITE_EMAILJS_TEMPLATE_ID` | (optional) |
| `VITE_EMAILJS_PUBLIC_KEY` | (optional) |

5. Click **Deploy**.
6. Once deployed, Vercel provides a URL like `https://portfolio-tanmay.vercel.app`.
7. (Optional) Add a custom domain under **Settings → Domains**.

The `frontend/vercel.json` file already configures:
- SPA rewrites (all routes → `index.html`)
- Security headers
- Long-term caching for static assets

---

## 5. Update CORS After Deployment

Once your frontend URL is known, update the backend's `CORS_ORIGINS` environment variable on Render/Railway to include it:

```
CORS_ORIGINS=https://portfolio-tanmay.vercel.app,https://tanmaywagh.dev
```

Redeploy the backend for the change to take effect.

---

## 6. GitHub Actions CI/CD (Automated Deployments)

The workflow at `.github/workflows/ci-cd.yml` automatically:
1. Builds & lints the frontend
2. Builds & tests the backend
3. Deploys frontend to Vercel (on push to `main`)
4. Triggers backend redeploy on Render (on push to `main`)

### Required GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Generate at vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Found in `.vercel/project.json` after first manual deploy |
| `VERCEL_PROJECT_ID` | Found in `.vercel/project.json` |
| `RENDER_SERVICE_ID` | From your Render service URL (`srv-xxxxx`) |
| `RENDER_DEPLOY_KEY` | Render dashboard → service → Settings → Deploy Hook |
| `VITE_API_URL` | Your production backend URL |

---

## 7. Post-Deployment Checklist

- [ ] Visit frontend URL — site loads correctly
- [ ] Test contact form — message saved & email received
- [ ] `GET /api/health` returns `200 OK`
- [ ] `GET /api/projects` returns project list
- [ ] Resume download works (`/resume.pdf` and `/api/resume`)
- [ ] Lighthouse score > 90 (run via Chrome DevTools)
- [ ] `sitemap.xml` and `robots.txt` accessible
- [ ] CORS configured correctly (no console errors)
- [ ] SSL/HTTPS active on both frontend and backend
