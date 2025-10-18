# 🛠️ Makefile para automatizar tareas del proyecto RSS Validator

install:
	npm install

start:
	npm run develop

build:
	npm run build

lint:
	npx eslint .

test:
	npm test

setup: install build
