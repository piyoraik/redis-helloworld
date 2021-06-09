restart:
	docker compose down
	docker compose up -d

node:
	docker compose restart node

build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

ps:
	docker compose ps -a