restart:
	docker compose down
	docker compose build
	docker compose up -d

build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

ps:
	docker compose ps -a