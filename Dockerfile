FROM node:16.17.0-slim

WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy app files (primo-explore/custom is mounted as a volume at runtime)
COPY gulpfile.js ./
COPY gulp/ ./gulp/

# Ensure required runtime directories exist
RUN mkdir -p primo-explore/custom primo-explore/tmp

EXPOSE 8003

# --view and --proxy are passed via docker-compose command
ENTRYPOINT ["node_modules/.bin/gulp", "run", "--ve"]
