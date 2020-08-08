up-shortnr:
	docker-compose up -d --force-recreate shortnr

up: up-shortnr

logs:
	docker-compose logs -f

install-shortnr:
	docker-compose run --rm shortnr "npm install"

install: install-shortnr

into-shortnr:
	docker-compose exec shortnr bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
