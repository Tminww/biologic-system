# --- Stage 1: Base Setup ---
FROM node:22-bookworm-slim AS node_base

ENV CI=1
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app


# --- Stage 2: Dependencies ---
FROM node_base AS deps

COPY package.json package-lock.json ./

RUN npm ci


# --- Stage 3: Dev Environment ---
FROM node_base AS dev

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json package-lock.json ./
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


# --- Stage 4: Builder ---
FROM node_base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json package-lock.json ./
COPY . .

RUN npm run build


# --- Stage 5: Production ---
FROM nginx:1.27-alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
