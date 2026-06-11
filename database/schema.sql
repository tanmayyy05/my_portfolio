-- ============================================================
-- Portfolio Database Schema
-- PostgreSQL
-- ============================================================

-- Drop existing tables (for clean re-run in dev)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS visitors CASCADE;
DROP TABLE IF EXISTS project_views CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;

-- ============================================================
-- Table: contact_messages
-- Stores messages submitted via the contact form
-- ============================================================
CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(50),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- ============================================================
-- Table: visitors
-- Tracks page visits for analytics
-- ============================================================
CREATE TABLE visitors (
    id BIGSERIAL PRIMARY KEY,
    ip_address VARCHAR(50),
    user_agent TEXT,
    page_visited VARCHAR(200),
    referrer VARCHAR(300),
    visited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_visitors_ip_address ON visitors(ip_address);
CREATE INDEX idx_visitors_visited_at ON visitors(visited_at DESC);

-- ============================================================
-- Table: project_views
-- Tracks individual project view counts
-- ============================================================
CREATE TABLE project_views (
    id BIGSERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    ip_address VARCHAR(50),
    viewed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_project_views_project_name ON project_views(project_name);
CREATE INDEX idx_project_views_viewed_at ON project_views(viewed_at DESC);

-- ============================================================
-- Table: newsletter_subscribers
-- Stores email subscriptions
-- ============================================================
CREATE TABLE newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_is_active ON newsletter_subscribers(is_active);

-- ============================================================
-- Done
-- ============================================================
