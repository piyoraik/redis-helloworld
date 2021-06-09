restart:
	docker compose down
	git pull origin main
	docker compose up -d --build node

noderestart:
	docker compose restart node

nodelogs:
	docker logs -f node

build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

ps:
	docker compose ps -a

delete-volume:
	docker volume rm node_redis-data