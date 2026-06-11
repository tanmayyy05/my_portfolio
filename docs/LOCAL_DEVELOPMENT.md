# Local Development Setup Guide

This guide walks through running the entire portfolio application (frontend + backend + database) on your local machine.

## Prerequisites

| Tool | Version | Check Command |
|---|---|---|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Java | 21 | `java -version` |
| Maven | 3.9+ (or use `./mvnw`) | `mvn -v` |
| PostgreSQL | 14+ | `psql --version` |
| Git | any recent | `git --version` |

---

## 1. Clone the Repository

```bash
git clone https://github.com/tanmayyy05/portfolio.git
cd portfolio
```

---

## 2. Database Setup

```bash
# Start PostgreSQL (if not running)
# macOS (Homebrew):
brew services start postgresql

# Linux:
sudo service postgresql start

# Create the database
createdb portfolio_db

# Run the schema
psql -U postgres -d portfolio_db -f database/schema.sql

# (Optional) Seed sample data
psql -U postgres -d portfolio_db -f database/seed.sql
```

**Expected output:**
```
CREATE TABLE
CREATE INDEX
CREATE TABLE
CREATE INDEX
...
```

---

## 3. Backend Setup (Spring Boot)

```bash
cd backend

# Copy environment template
cp .env.example .env
# Edit .env with your DB credentials and email settings
```

Set environment variables (or edit `application.properties` directly for local dev):

```bash
export DB_URL=jdbc:postgresql://localhost:5432/portfolio_db
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
export EMAIL_USERNAME=tanmay3011w@gmail.com
export EMAIL_PASSWORD=your_gmail_app_password
export CORS_ORIGINS=http://localhost:5173
```

> **Note:** For Gmail, you must generate an [App Password](https://myaccount.google.com/apppasswords) — your regular Gmail password will not work with SMTP.

Build and run:

```bash
# Build
mvn clean install
# or with wrapper:
./mvnw clean install

# Run
mvn spring-boot:run
# or with wrapper:
./mvnw spring-boot:run
```

**Expected output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.3)

...
Started PortfolioApplication in 3.842 seconds
```

The backend will be running at **http://localhost:8080**.

Verify with:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{"success":true,"message":"Service is healthy","data":{"status":"UP","service":"portfolio-backend"},"timestamp":"..."}
```

---

## 4. Frontend Setup (React + Vite)

Open a **new terminal**:

```bash
cd frontend

# Copy environment template
cp .env.example .env
# Edit if needed (default points to http://localhost:8080)

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Expected output:**
```
  VITE v5.4.21  ready in 412 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser. You should see the full portfolio site with:
- Animated hero section with particle network background
- All sections (About, Skills, Experience, Projects, Certifications, Resume, Contact)
- Working contact form (submits to backend at `localhost:8080`)
- Resume download/view

---

## 5. Verify Full Stack Integration

1. Open the site at `http://localhost:5173`
2. Scroll to the **Contact** section
3. Fill out the form and submit
4. Check the backend terminal — you should see a log line:
   ```
   Contact message saved: id=1, from=test@example.com
   ```
5. Verify in the database:
   ```bash
   psql -U postgres -d portfolio_db -c "SELECT * FROM contact_messages;"
   ```

---

## 6. Common Commands Reference

| Task | Command |
|---|---|
| Run frontend dev server | `cd frontend && npm run dev` |
| Build frontend for production | `cd frontend && npm run build` |
| Preview production build | `cd frontend && npm run preview` |
| Lint frontend | `cd frontend && npm run lint` |
| Run backend | `cd backend && mvn spring-boot:run` |
| Build backend JAR | `cd backend && mvn clean package` |
| Run backend tests | `cd backend && mvn test` |
| Run backend JAR directly | `java -jar backend/target/portfolio-1.0.0.jar` |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `Connection refused` to PostgreSQL | Ensure PostgreSQL service is running and `DB_URL` port matches (default 5432) |
| `relation "contact_messages" does not exist` | Run `database/schema.sql` again, or let `spring.jpa.hibernate.ddl-auto=update` create it on startup |
| CORS errors in browser console | Ensure `CORS_ORIGINS` includes `http://localhost:5173` |
| Email not sending | Verify Gmail App Password is correct and 2FA is enabled on the Google account |
| `Port 8080 already in use` | Change `PORT` env var or stop the conflicting process: `lsof -ti:8080 \| xargs kill` |
| `Port 5173 already in use` | Vite will auto-increment to 5174; or stop conflicting process |
