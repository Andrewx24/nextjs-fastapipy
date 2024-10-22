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

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN pnpm build  # This step generates the .next directory

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
