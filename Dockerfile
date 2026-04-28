# Use Nginx to serve static files
FROM nginx:alpine

# Copy your static site into Nginx's public folder
COPY . /usr/share/nginx/html

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
