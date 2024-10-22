# Use official Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build  # This ensures the build step generates the .next folder

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
