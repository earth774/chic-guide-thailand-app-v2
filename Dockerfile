# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Ionic application for production
RUN npm run build

# Stage 2: Serve the application in a smaller image
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/www /usr/share/nginx/html

# Expose the port on which Nginx will run
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
