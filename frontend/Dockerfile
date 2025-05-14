# Stage 1: Builder - install dependencies
FROM node:20-slim AS deps

# Install curl (minimal essential tool), clean after install
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package.json files only
COPY package*.json ./

# Install production and dev dependencies
RUN npm install

# Stage 2: Development runtime
FROM node:20-slim

WORKDIR /app

# Set environment variables
ENV NODE_ENV=development
ENV HOST=0.0.0.0

# Copy node_modules and app code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose Vite's default port
EXPOSE 5173



# Start the Vite dev server with --host flag so it listens properly
CMD ["npm", "run", "dev", "--", "--host"]
