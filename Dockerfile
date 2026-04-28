# LinkBox - All-in-one Dockerfile for Railway
FROM python:3.13-slim

# Install Node.js for frontend build
RUN apt-get update && apt-get install -y nodejs npm curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Backend setup
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend

# Frontend setup
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./frontend

# Build frontend
RUN cd frontend && npm run build

# Nginx for serving static files + reverse proxy
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
COPY frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["sh", "-c", "cd /app/backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]