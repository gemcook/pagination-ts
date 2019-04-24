start-example:
	yarn start

build:
	yarn build

tsc:
	./node_modules/typescript/bin/tsc --noemit

lint:
	./node_modules/.bin/eslint src/ --ext .ts,.tsx,.js,.jsx


# build用途
lib-clean:
	rm -rf ./lib/

lib-build:
	$(MAKE) lib-clean
	yarn run rollup --config
