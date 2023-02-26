# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    libstdc++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Create a new user and group
RUN addgroup -S app && \
    adduser -S -G app app && \
    chown -R app:app /usr/src/app

# Switch to the new user
USER app

# Expose the server port
EXPOSE 3000

# Start the server
CMD [ "npm", "run", "start" ]
