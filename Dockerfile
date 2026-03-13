# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency definitions and install them
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build 

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage to Nginx's serve directory
# IMPORTANT: Replace 'calculator-app' below with the actual output folder name found in your dist/ directory!
COPY --from=build /app/dist/calculator-app /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]