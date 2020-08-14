up-shortnr:
	docker-compose up -d --force-recreate shortnr

up-urlstore:
	docker-compose up -d --force-recreate urlstore

up-xlink:
	docker-compose up -d --force-recreate xlink

up-mongo:
	docker-compose up -d --force-recreate mongo

up: up-shortnr up-urlstore up-xlink up-mongo

logs:
	docker-compose logs -f

install-shortnr:
	docker-compose run --rm shortnr "npm install"

install-urlstore:
	docker-compose run --rm urlstore "npm install"

install-xlink:
	docker-compose run --rm xlink "npm install"

install: install-shortnr install-urlstore install-xlink

into-shortnr:
	docker-compose exec shortnr bash

into-urlstore:
	docker-compose exec urlstore bash

into-xlink:
	docker-compose exec xlink bash

into-mongo:
	docker-compose exec mongo bash

into-mongo-db:
	docker-compose exec mongo mongo urlstore

lint-shortnr:
	docker-compose run --rm shortnr "npm run lint"

lint-urlstore:
	docker-compose run --rm urlstore "npm run lint"

lint-xlink:
	docker-compose run --rm xlink "npm run lint"

lint: lint-shortnr lint-urlstore lint-xlink

test-shortnr:
	docker-compose run --rm shortnr "npm run test:unit -- --verbose"

test-urlstore:
	docker-compose run --rm urlstore "npm test -- --verbose"

test-xlink:
	docker-compose run --rm xlink "npm test -- --verbose"

test: test-shortnr test-urlstore test-xlink

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
