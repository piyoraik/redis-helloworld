restart:
	docker compose down
	git pull origin main
	docker compose build
	docker compose up -d

node-restart:
	docker compose restart node

node-logs:
	docker logs -f node

build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

ps:
	docker compose ps -a