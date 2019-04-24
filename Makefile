start:
	yarn start

tsc:
	./node_modules/typescript/bin/tsc --noemit

lint:
	./node_modules/.bin/eslint src/ --ext .ts,.tsx,.js,.jsx