# Use the official Node.js image
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy all files from your repository into the container
COPY . .

# Install dependencies ONLY if package.json exists
RUN if [ -f package.json ]; then npm install; fi

# Expose the port your app runs on (Cloud Run defaults to 8080)
EXPOSE 8080

# Start the application
CMD [ "node", "js/app.js" ]