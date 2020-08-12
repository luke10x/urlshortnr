up-shortnr:
	docker-compose up -d --force-recreate shortnr

up-urlstore:
	docker-compose up -d --force-recreate urlstore

up-mongo:
	docker-compose up -d --force-recreate mongo

up: up-shortnr up-urlstore up-mongo

logs:
	docker-compose logs -f

install-shortnr:
	docker-compose run --rm shortnr "npm install"

install-urlstore:
	docker-compose run --rm urlstore "npm install"

install: install-shortnr install-urlstore

into-shortnr:
	docker-compose exec shortnr bash

into-urlstore:
	docker-compose exec urlstore bash

into-mongo:
	docker-compose exec mongo bash

into-mongo-db:
	docker-compose exec mongo mongo urlstore

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
