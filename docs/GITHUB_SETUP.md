# GitHub Setup Guide

## Initial Push to GitHub

```bash
cd portfolio

git init
git add .
git commit -m "Initial Portfolio"
git branch -M main
git remote add origin https://github.com/tanmayyy05/portfolio.git
git push -u origin main
```

## Subsequent Updates

```bash
git add .
git commit -m "Description of changes"
git push
```

## Recommended Branching for CI/CD

- `main` — production branch, auto-deploys via GitHub Actions
- `dev` — integration branch for features
- `feature/*` — individual feature branches, merged into `dev` via PR

```bash
git checkout -b feature/new-section
# ... make changes ...
git add .
git commit -m "Add new section"
git push -u origin feature/new-section
# Open PR on GitHub: feature/new-section -> dev -> main
```

## Repository Secrets (for CI/CD)

Configure under **Settings → Secrets and variables → Actions**:

| Secret | Used For |
|---|---|
| `VERCEL_TOKEN` | Frontend deploy |
| `VERCEL_ORG_ID` | Frontend deploy |
| `VERCEL_PROJECT_ID` | Frontend deploy |
| `RENDER_SERVICE_ID` | Backend deploy |
| `RENDER_DEPLOY_KEY` | Backend deploy |
| `VITE_API_URL` | Build-time frontend env var |

See [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) for full setup details.
