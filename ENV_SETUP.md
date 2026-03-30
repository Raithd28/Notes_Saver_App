# Environment Setup Guide

## Overview
This project uses environment variables for configuration management. Follow the setup instructions below for your environment.

## Local Development Setup

### 1. Create `.env` file
Copy the `.env.example` file to create your own `.env` file:
```bash
cp .env.example .env
```

### 2. Update Database Credentials
Open `.env` and update with your PostgreSQL credentials:
```
SPRING_DATASOURCE_URL=postgresql://username:password@host:port/database
SPRING_DATASOURCE_USERNAME=your_user
SPRING_DATASOURCE_PASSWORD=your_password
```

### 3. Configure for Local Development
Ensure these settings are correct for local testing:
```
SERVER_PORT=9090
REACT_APP_API_URL=http://localhost:9090
ENVIRONMENT=development
```

### 4. Load Environment Variables

#### For Backend (Spring Boot):
Spring Boot automatically loads `.env` file from the project root.

#### For Frontend (React):
Environment variables must be prefixed with `REACT_APP_`:
```
REACT_APP_API_URL=http://localhost:9090
```

## Production Deployment (Render)

### 1. Set Environment Variables in Render Dashboard:

**Backend Service Variables:**
- `SPRING_DATASOURCE_URL` → PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME` → Database username
- `SPRING_DATASOURCE_PASSWORD` → Database password
- `SPRING_JPA_HIBERNATE_DDL_AUTO=update`
- `SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect`
- `SERVER_PORT=8080` (Render assigns dynamic port)
- `ENVIRONMENT=production`

**Frontend Service Variables:**
- `REACT_APP_API_URL=https://notes-app-backend.onrender.com` (your backend URL)
- `REACT_APP_API_TIMEOUT=5000`

### 2. Using PostgreSQL on Neon (Cloud)
Connection string format:
```
postgresql://username:password@host:port/database?sslmode=require
```

Example:
```
postgresql://neondb_owner:npg_9wLIQ8VfrxPZ@ep-small-voice-am824mn6-pooler.c-5.us-east-1.aws.neon.tech:5432/neondb?sslmode=require
```

## Important Configuration Variables

### Database (Required)
| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `neondb_owner` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `secure_password` |

### Hibernate (Required)
| Variable | Value | Purpose |
|----------|-------|---------|
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` | Auto-create/update schema |
| `SPRING_JPA_DATABASE_PLATFORM` | `org.hibernate.dialect.PostgreSQLDialect` | DB dialect |

### Server (Required)
| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `9090` | Backend port (local) |
| `SERVER_SERVLET_CONTEXT_PATH` | `/` | API root path |

### Frontend (Required)
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:9090` | Backend API URL |
| `REACT_APP_API_TIMEOUT` | `5000` | API request timeout (ms) |

## Security Best Practices

1. ✅ **Never commit `.env` file to Git** - It's in `.gitignore`
2. ✅ **Use `.env.example`** - Share template with team
3. ✅ **Rotate credentials regularly** - Update passwords periodically
4. ✅ **Use different credentials** for different environments
5. ✅ **Set `REACT_APP_` prefix** for frontend variables only
6. ✅ **Use SSL connections** for production databases

## Troubleshooting

### Variables not loading?
- Ensure `.env` is in project root
- Restart development server after changing `.env`
- Check variable names for typos

### Frontend API calls failing?
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings on backend
- Ensure backend is running and accessible

### Database connection refused?
- Verify `SPRING_DATASOURCE_URL` format
- Check username/password
- Ensure database is running
- For cloud DB: Verify network access/firewall

## File Structure
```
Notes-using-Spring-Boot-master/
├── .env                    (local credentials - not in git)
├── .env.example            (template for team)
├── .gitignore              (excludes sensitive files)
├── server/
│   └── Notes/
│       ├── src/
│       │   └── main/
│       │       └── resources/
│       │           └── application.properties
│       └── pom.xml
└── client/
    ├── .env                (frontend variables)
    └── package.json
```

## Additional Resources
- [Spring Boot Properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Neon PostgreSQL Documentation](https://neon.tech/docs)
- [Render Deployment Guide](https://render.com/docs)
