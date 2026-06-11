# Database Setup

This directory contains PostgreSQL scripts for the Portfolio backend.

## Files

- `schema.sql` — Creates all tables, indexes, and constraints
- `seed.sql` — Inserts sample/demo data (optional, for testing)

## Local Setup

1. Install PostgreSQL (v14+ recommended)

2. Create the database:
```bash
createdb portfolio_db
```

Or via psql:
```sql
CREATE DATABASE portfolio_db;
```

3. Run the schema:
```bash
psql -U postgres -d portfolio_db -f schema.sql
```

4. (Optional) Seed sample data:
```bash
psql -U postgres -d portfolio_db -f seed.sql
```

## Tables Overview

| Table | Purpose |
|-------|---------|
| `contact_messages` | Stores submissions from the contact form |
| `visitors` | Tracks page visits for analytics |
| `project_views` | Tracks individual project view counts |
| `newsletter_subscribers` | Stores newsletter email subscriptions |

## Neon PostgreSQL (Production)

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy the connection string provided
4. Run `schema.sql` against it using the Neon SQL Editor or:
```bash
psql "postgresql://<user>:<password>@<host>/<dbname>?sslmode=require" -f schema.sql
```
5. Set the `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` environment variables in your backend deployment accordingly. Note that with Neon, the JDBC URL format is:
```
jdbc:postgresql://<host>/<dbname>?sslmode=require
```

## Notes

- Spring Boot's `spring.jpa.hibernate.ddl-auto=update` will also auto-create/update tables based on entity definitions if `schema.sql` is not run manually — but running the script explicitly is recommended for production for full control over indexes.
