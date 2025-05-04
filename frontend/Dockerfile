
# FROM node:18-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # Production image, copy all the files and run the app
# FROM nginx:alpine AS runner
# WORKDIR /usr/share/nginx/html

# # Copy built files
# COPY --from=builder /app/dist .

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Add custom script to set node ID dynamically
# RUN apk add --no-cache bash
# COPY docker-entrypoint.sh /docker-entrypoint.sh
# RUN chmod +x /docker-entrypoint.sh

# # Set node ID from environment variable
# ENV NODE_ID=frontend1

# EXPOSE 80

# ENTRYPOINT ["/docker-entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build React App
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

