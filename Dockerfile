# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Set the entry point for the container
CMD ["npx", "playwright", "test"]
