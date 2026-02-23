SHELL := /bin/bash

COMPOSE ?= docker compose

SERVICES := biologic-dev-db biologic-dev-migrations biologic-dev-api biologic-dev-frontend biologic-dev-docs

.PHONY: help up down restart build rebuild ps logs logs-api logs-frontend logs-docs logs-db \
        api frontend docs db migrations \
        shell-api shell-frontend shell-docs shell-db \
        exec-api exec-frontend exec-docs \
        clean

help: ## Show available targets
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z0-9_.-]+:.*## / {printf "%-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services in detached mode
	$(COMPOSE) up

down: ## Stop and remove services
	$(COMPOSE) down

restart: ## Restart all services
	$(COMPOSE) restart

build: ## Build all service images
	$(COMPOSE) build

rebuild: ## Rebuild images without cache
	$(COMPOSE) build --no-cache

ps: ## Show compose services status
	$(COMPOSE) ps

logs: ## Tail logs for all services
	$(COMPOSE) logs -f

logs-api: ## Tail API logs
	$(COMPOSE) logs -f biologic-dev-api

logs-frontend: ## Tail frontend logs
	$(COMPOSE) logs -f biologic-dev-frontend

logs-docs: ## Tail docs-site logs
	$(COMPOSE) logs -f biologic-dev-docs

logs-db: ## Tail postgres logs
	$(COMPOSE) logs -f biologic-dev-db

api: ## Start only DB, migrations and API
	$(COMPOSE) up -d biologic-dev-db biologic-dev-migrations biologic-dev-api

frontend: ## Start only frontend service
	$(COMPOSE) up -d biologic-dev-frontend

docs: ## Start only docs-site service
	$(COMPOSE) up -d biologic-dev-docs

db: ## Start only postgres service
	$(COMPOSE) up -d biologic-dev-db

migrations: ## Run migrations container once
	$(COMPOSE) up --abort-on-container-exit biologic-dev-migrations

shell-api: ## Open shell inside API container
	$(COMPOSE) exec biologic-dev-api bash

shell-frontend: ## Open shell inside frontend container
	$(COMPOSE) exec biologic-dev-frontend bash

shell-docs: ## Open shell inside docs-site container
	$(COMPOSE) exec biologic-dev-docs bash

shell-db: ## Open psql shell in DB container
	$(COMPOSE) exec biologic-dev-db psql -U biologic -d biologic

exec-api: ## Run command in API container: make exec-api CMD='python -V'
	@if [ -z "$(CMD)" ]; then echo "CMD is required"; exit 1; fi
	$(COMPOSE) exec biologic-dev-api bash -lc "$(CMD)"

exec-frontend: ## Run command in frontend container: make exec-frontend CMD='npm test'
	@if [ -z "$(CMD)" ]; then echo "CMD is required"; exit 1; fi
	$(COMPOSE) exec biologic-dev-frontend bash -lc "$(CMD)"

exec-docs: ## Run command in docs-site container: make exec-docs CMD='npm run build'
	@if [ -z "$(CMD)" ]; then echo "CMD is required"; exit 1; fi
	$(COMPOSE) exec biologic-dev-docs bash -lc "$(CMD)"

clean: ## Stop services and remove volumes
	$(COMPOSE) down -v --remove-orphans
