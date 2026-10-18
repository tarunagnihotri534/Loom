# Stage 1: Base (pinned Node 22 & pnpm 11)
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat git
WORKDIR /app
# Configure git safe directory for container volume mounts
RUN git config --global --add safe.directory '*'
# Enable corepack and pin pnpm version matching package.json (11.4.0)
RUN corepack enable && corepack prepare pnpm@11.4.0 --activate

# Stage 2: Dependencies (layer caching)
FROM base AS deps
# Copy package manifest files for workspace dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/css/package.json ./packages/css/
COPY packages/react/package.json ./packages/react/
COPY apps/docs/package.json ./apps/docs/

# Install dependencies strictly from lockfile
RUN pnpm install --frozen-lockfile

# Stage 3: Build & Test
FROM deps AS build
WORKDIR /app
COPY . .
# Run full build and test suite
RUN pnpm turbo run build test

# Stage 4: Production Docs Server (nginx:alpine running as non-root)
FROM nginx:alpine AS docs
# Configure non-root permissions for nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Copy custom minimal nginx configuration for port 8080 (non-root)
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy production build artifacts from build stage
COPY --from=build --chown=nginx:nginx /app/apps/docs/dist /usr/share/nginx/html

USER nginx
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
