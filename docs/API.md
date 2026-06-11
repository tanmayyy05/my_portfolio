# API Documentation

Base URL (local): `http://localhost:8080`
Base URL (production): `https://your-backend.onrender.com`

All responses follow this envelope:

```json
{
  "success": true,
  "message": "Description of result",
  "data": { },
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## 1. Contact

### `POST /api/contact`

Submit a message via the contact form. Stores the message and sends an email notification asynchronously.

**Request Body**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "subject": "Internship Opportunity",
  "message": "Hi Tanmay, I'd like to discuss an internship opportunity..."
}
```

**Validation Rules**
| Field | Rules |
|---|---|
| `name` | required, 2–100 characters |
| `email` | required, valid email format, max 150 chars |
| `subject` | required, 3–200 characters |
| `message` | required, 10–2000 characters |

**Response — `201 Created`**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "data": {
    "id": 12,
    "submittedAt": "2026-06-12T10:30:00"
  },
  "timestamp": "2026-06-12T10:30:00"
}
```

**Error — `400 Bad Request`** (validation failure)
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": "Invalid email format"
  },
  "timestamp": "2026-06-12T10:30:00"
}
```

**Error — `429 Too Many Requests`** (rate limited — max 5/min per IP, max 1 per email/hour)
```json
{
  "success": false,
  "message": "Too many messages from this email. Please wait before sending again.",
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## 2. Projects

### `GET /api/projects`

Returns the list of portfolio projects.

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Projects fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Employee Attendance Management Platform",
      "subtitle": "Full Stack Application",
      "description": "A comprehensive attendance management system...",
      "tech": ["Java", "Spring Boot", "REST APIs", "MySQL", "React", "JavaScript", "Git"],
      "github": "https://github.com/tanmayyy05",
      "live": null,
      "status": "In Development",
      "featured": true
    },
    {
      "id": 2,
      "title": "Netflix Clone",
      "subtitle": "Frontend Application",
      "description": "A pixel-perfect, responsive Netflix-style UI...",
      "tech": ["React", "JavaScript", "HTML", "CSS", "Git", "GitHub"],
      "github": "https://github.com/tanmayyy05",
      "live": null,
      "status": "Completed",
      "featured": false
    }
  ],
  "timestamp": "2026-06-12T10:30:00"
}
```

### `GET /api/projects/{id}`

Returns a single project by ID and tracks a project view event.

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Project fetched successfully",
  "data": {
    "id": 1,
    "title": "Employee Attendance Management Platform",
    "subtitle": "Full Stack Application",
    "description": "...",
    "tech": ["Java", "Spring Boot"],
    "github": "https://github.com/tanmayyy05",
    "live": null,
    "status": "In Development",
    "featured": true
  },
  "timestamp": "2026-06-12T10:30:00"
}
```

**Error — `404 Not Found`**
```json
{
  "success": false,
  "message": "Project not found with id: 99",
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## 3. Resume

### `GET /api/resume`

Downloads the resume PDF as an attachment.

**Response — `200 OK`**
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename="Tanmay_Wagh_Resume.pdf"`
- Body: binary PDF data

### `GET /api/resume/view`

Returns the resume PDF for inline viewing (opens in browser).

**Response — `200 OK`**
- `Content-Type: application/pdf`
- `Content-Disposition: inline; filename="Tanmay_Wagh_Resume.pdf"`

---

## 4. Analytics

### `GET /api/analytics`

Returns aggregated site analytics.

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Analytics fetched successfully",
  "data": {
    "totalVisitors": 145,
    "uniqueVisitorsToday": 8,
    "totalMessages": 12,
    "unreadMessages": 3,
    "totalProjectViews": 67,
    "projectViewsByName": {
      "Employee Attendance Management Platform": 40,
      "Netflix Clone": 27
    },
    "newsletterSubscribers": 5
  },
  "timestamp": "2026-06-12T10:30:00"
}
```

### `POST /api/analytics/track`

Tracks a page visit. Called automatically by the frontend on page load.

**Request Body** (optional)
```json
{
  "page": "/",
  "referrer": "https://www.google.com"
}
```

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Visit tracked",
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## 5. Newsletter

### `POST /api/newsletter/subscribe`

Subscribes an email to the newsletter.

**Request Body**
```json
{
  "email": "subscriber@example.com"
}
```

**Response — `201 Created`**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "timestamp": "2026-06-12T10:30:00"
}
```

**Response — `200 OK`** (already subscribed)
```json
{
  "success": true,
  "message": "You're already subscribed!",
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## 6. Health Check

### `GET /api/health`

Used by deployment platforms (Render/Railway) for health checks.

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "status": "UP",
    "service": "portfolio-backend"
  },
  "timestamp": "2026-06-12T10:30:00"
}
```

---

## Rate Limiting

| Scope | Limit |
|---|---|
| All `/api/**` endpoints | 60 requests/minute per IP |
| `POST /api/contact` | 5 requests/minute per IP, 1 per email per hour |

Exceeding limits returns `429 Too Many Requests`.

## Security Headers

All responses include:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`
- `Strict-Transport-Security`
