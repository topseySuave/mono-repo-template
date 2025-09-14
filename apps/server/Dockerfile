# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable || true

FROM base AS build
WORKDIR /app

# Copy root and server workspace files
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/package.json
COPY apps/server/tsconfig.json apps/server/tsconfig.json
COPY apps/server/src apps/server/src

# Install and build only server workspace
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts && npm run --workspace @resitour/server build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Copy manifests to install only server deps
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/apps/server/package.json ./apps/server/package.json

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts --include-workspace-root=false --workspace @resitour/server

# Copy build output
COPY --from=build /app/apps/server/dist ./apps/server/dist

WORKDIR /app/apps/server
EXPOSE 4000
CMD ["npm", "start"]
