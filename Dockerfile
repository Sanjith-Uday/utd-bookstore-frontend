FROM nginx:alpine

# Copy all frontend static files into nginx html directory
COPY . /usr/share/nginx/html

# Cloud Run expects the container to listen on port 8080
EXPOSE 8080

# Make nginx listen on port 8080 instead of 80
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
