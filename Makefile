install:
	npm ci
gendiff:
	bin/gendiff.js
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest