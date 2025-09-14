# syntax=docker/dockerfile:1.7

# -----------------
# Base deps stage
# -----------------
FROM node:20-alpine AS base
WORKDIR /app

# Enable corepack for pnpm/yarn if needed
RUN corepack enable || true

# -----------------
# Build stage
# -----------------
FROM base AS build
WORKDIR /app

# Copy root monorepo files
COPY package.json package-lock.json ./
# Copy app files
COPY apps/web/package.json apps/web/package.json
COPY apps/web/tsconfig.json apps/web/tsconfig.json
COPY apps/web/next.config.js apps/web/next.config.js
COPY apps/web/postcss.config.js apps/web/postcss.config.js
COPY apps/web/tailwind.config.js apps/web/tailwind.config.js
COPY apps/web/next-env.d.ts apps/web/next-env.d.ts
COPY apps/web/public apps/web/public
COPY apps/web/src apps/web/src

# Install root deps and build only the web workspace
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts && npm run --workspace @resitour/web build

# -----------------
# Runtime
# -----------------
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Copy lockfile and package manifests for workspace install
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/apps/web/package.json ./apps/web/package.json

# Install only web workspace production deps
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts --include-workspace-root=false --workspace @resitour/web

# Copy built app artifacts
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public

WORKDIR /app/apps/web
EXPOSE 3000
CMD ["npm", "start"]
