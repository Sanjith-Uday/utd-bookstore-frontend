# Use a Node.js base image to build your frontend assets
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your frontend application (adjust if your build command is different)
RUN npm run build

# --- Production image ---
# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine

# Copy the built frontend assets from the builder stage
# IMPORTANT: Adjust '/app/build' to the actual output directory of your build command (e.g., 'dist', 'out')
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port Nginx listens on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

build:
  options:
    logging: CLOUD_LOGGING_ONLY
