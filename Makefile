include .env

default: build

dc-build:
	docker-compose build app

# ---------- Development ----------
start: dc-build
	docker-compose run --service-ports app npm run start

sh: dc-build
	docker-compose run --entrypoint=sh --service-ports app

# ---------- Testing ----------
test: dc-build
	docker-compose run  app run test

build:
	docker build -t $(REGISTRY)$(SERVICE_NAME) .

# ------------Build-agent ----------------

build-agent: dc-build
	docker-compose run app run lint
	docker-compose run app run coverage