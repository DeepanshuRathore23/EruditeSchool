# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the app
COPY . .

# Build Next.js app
RUN pnpm build

# Expose Next.js port
EXPOSE 3000

# Start app
CMD ["pnpm", "start"]