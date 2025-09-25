# Solace Advocates API Documentation

## Overview

The Solace Advocates API provides endpoints for managing and searching advocate data. This API is built with Next.js and uses PostgreSQL with Drizzle ORM.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently, the API does not require authentication. In production, consider implementing:
- API keys
- JWT tokens
- OAuth 2.0

## Endpoints

### GET /advocates

Retrieve advocates with optional filtering.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search term for name, city, degree, specialties, or experience |
| `city` | string | No | Filter by specific city |
| `degree` | string | No | Filter by specific degree (MD, PhD, MSW, RN, LCSW) |

#### Example Requests

```bash
# Get all advocates
GET /api/advocates

# Search for advocates
GET /api/advocates?search=john

# Filter by city
GET /api/advocates?city=New%20York

# Filter by degree
GET /api/advocates?degree=MD

# Combined filters
GET /api/advocates?search=mental&city=Los%20Angeles&degree=PhD
```

#### Response

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "city": "New York",
      "degree": "MD",
      "specialties": ["Mental Health", "Anxiety"],
      "yearsOfExperience": 10,
      "phoneNumber": "5551234567",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ],
  "count": 1,
  "filters": {
    "search": "john",
    "city": null,
    "degree": null
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data` | array | Array of advocate objects |
| `count` | number | Total number of advocates returned |
| `filters` | object | Applied filters for reference |

#### Advocate Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `firstName` | string | Advocate's first name |
| `lastName` | string | Advocate's last name |
| `city` | string | City where advocate practices |
| `degree` | string | Professional degree (MD, PhD, MSW, RN, LCSW) |
| `specialties` | array | Array of specialty strings |
| `yearsOfExperience` | number | Years of professional experience |
| `phoneNumber` | string | Contact phone number |
| `createdAt` | string | ISO 8601 timestamp of record creation |

#### Error Responses

```json
{
  "error": "Database connection not available",
  "message": "Internal server error"
}
```

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 500 | Internal server error |

---

### POST /seed

Seed the database with initial advocate data.

#### Request Body

No request body required.

#### Example Request

```bash
POST /api/seed
Content-Type: application/json
```

#### Response

```json
{
  "success": true,
  "advocates": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "city": "New York",
      "degree": "MD",
      "specialties": ["Mental Health", "Anxiety"],
      "yearsOfExperience": 10,
      "phoneNumber": "5551234567",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ],
  "count": 15,
  "message": "Successfully seeded 15 advocate records"
}
```

#### Error Responses

```json
{
  "error": "Data already exists",
  "message": "Advocates table is not empty. Clear existing data first.",
  "count": 15
}
```

| Status Code | Description |
|-------------|-------------|
| 200 | Successfully seeded |
| 400 | Invalid seed data |
| 409 | Data already exists |
| 500 | Internal server error |

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing:
- Per-IP rate limiting
- Per-user rate limiting
- Request throttling

## CORS

The API supports CORS with the following configuration:
- Development: Allows all origins (`*`)
- Production: Restricted to configured origins

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": "Additional context (development only)"
}
```

## Data Validation

### Input Validation

- Search terms are trimmed and sanitized
- City and degree filters are case-insensitive
- Phone numbers are validated with regex pattern
- Years of experience must be between 0-50

### Database Constraints

- `first_name`: VARCHAR(100), NOT NULL
- `last_name`: VARCHAR(100), NOT NULL
- `city`: VARCHAR(100), NOT NULL
- `degree`: VARCHAR(50), NOT NULL
- `phone_number`: VARCHAR(20), NOT NULL, regex validated
- `years_of_experience`: INTEGER, NOT NULL, 0-50 range
- `specialties`: JSONB, NOT NULL, default empty array

## Performance Considerations

- Server-side filtering reduces client-side processing
- Database queries are optimized with proper indexing
- Response compression is enabled
- Caching headers are set appropriately

## Monitoring

The API includes monitoring for:
- Request/response times
- Error rates
- Database query performance
- Custom business metrics

## Security

- SQL injection prevention through parameterized queries
- XSS protection through proper input sanitization
- CORS configuration
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## Examples

### JavaScript/TypeScript

```typescript
// Fetch advocates with search
const response = await fetch('/api/advocates?search=mental&city=New%20York');
const data = await response.json();

// Seed database
const seedResponse = await fetch('/api/seed', { method: 'POST' });
const seedData = await seedResponse.json();
```

### cURL

```bash
# Search advocates
curl "http://localhost:3000/api/advocates?search=john&city=New%20York"

# Seed database
curl -X POST "http://localhost:3000/api/seed"
```

## Support

For API support or questions, please contact the development team.
