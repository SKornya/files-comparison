install:
	npm ci
gendiff:
	bin/gendiff.js
lint:
	npx eslint .