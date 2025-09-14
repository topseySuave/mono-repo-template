# Resitour360 Monorepo

This repository uses npm workspaces.

- apps/web: Next.js app
- apps/server: Express + TypeScript API

## Requirements

- Node.js 20+
- npm 10+
- Docker (optional, for containerized runs)

## Install

```bash
npm install
```

## Development

- Web (Next.js):
```bash
npm run dev
# http://localhost:3000
```

- Server (Express):
```bash
npm run dev:server
# http://localhost:4000/health
```

Use two terminals to run both concurrently.

## Production (local)

- Web:
```bash
npm run build
npm run start
```

- Server:
```bash
npm run build:server
npm run start:server
```

## Docker

Build images and start both services:
```bash
docker compose build
docker compose up
# Web:   http://localhost:3000
# API:   http://localhost:4000
# Health http://localhost:4000/health
```

## Environment

- Server reads `PORT` (default 4000) and can use an `.env` file at `apps/server/.env`.
- Web runs on port 3000 by default.

## Structure

```
apps/
  web/        # Next.js app
  server/     # Express API (modules with model/controller/routes/services)
```
