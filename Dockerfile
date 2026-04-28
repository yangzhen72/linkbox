# LinkBox - Railway deployment with nixpacks
# Build frontend
RUN cd frontend && npm install && npm run build

# Serve with backend
CMD ["sh", "-c", "cd /app/backend && uvicorn app.main:app --host 0.0.0.0 --port 80"]