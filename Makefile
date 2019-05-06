start:
	yarn start

tsc:
	./node_modules/typescript/bin/tsc --noemit

lint:
	./node_modules/.bin/eslint src/ --ext .ts,.js,.json

# build用途
lib-build:
	yarn run rollup --config
