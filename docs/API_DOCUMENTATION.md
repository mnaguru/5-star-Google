# API Documentation

## Overview
This document outlines the current and recommended API structure for the Asset Growth Associates Rating System.

## Current Implementation
The current system operates as a client-side only application with no backend API. All interactions are handled through direct browser redirects and form submissions.

## Recommended Future API Structure

### Base URL
```
Production: https://api.ratemojo.top
Development: http://localhost:3001
```

### Authentication
```javascript
// JWT Token Authentication
Authorization: Bearer <jwt_token>

// API Key Authentication (for admin endpoints)
X-API-Key: <api_key>
```

### Endpoints

#### Feedback Submission
```http
POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1-555-123-4567",
  "email": "john@example.com",
  "rating": 3,
  "feedback": "Service could be improved...",
  "sessionId": "uuid-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "id": "feedback-uuid",
  "message": "Feedback submitted successfully",
  "redirectUrl": "https://assetgrowth.associates"
}
```

#### Analytics Endpoints
```http
GET /api/analytics/ratings
GET /api/analytics/feedback-summary
GET /api/analytics/conversion-rates
```

#### Admin Endpoints
```http
GET /api/admin/feedback?page=1&limit=50
GET /api/admin/analytics/dashboard
POST /api/admin/email-templates
```

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Phone number is required",
    "details": {
      "field": "phone",
      "value": ""
    }
  }
}
```

### Rate Limiting
- **Public endpoints**: 100 requests per hour per IP
- **Admin endpoints**: 1000 requests per hour per API key
- **Feedback submission**: 5 submissions per hour per IP