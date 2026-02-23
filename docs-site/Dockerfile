# --- Stage 1: Base Setup ---
FROM mcr.microsoft.com/playwright:v1.58.2-jammy AS node_playwright_base

ENV CI=1
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app


# --- Stage 2: Dependencies ---
FROM node_playwright_base AS deps

COPY package.json package-lock.json ./

RUN npm ci


# --- Stage 3: Dev Environment ---
FROM node_playwright_base AS dev

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json package-lock.json ./
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--port", "3000"]


# --- Stage 4: Builder ---
FROM node_playwright_base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json package-lock.json ./
COPY . .

RUN npm run build


# --- Stage 5: Production ---
FROM nginx:1.27-alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
