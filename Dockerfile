# filename: dockerfile

# Base image
FROM node:14

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.41.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test"]
