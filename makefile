SHELL := /bin/bash

SERVER := home
APP_NAME := music-client


test:
	yarn build
	pm2 stop test || true
	rm -rf ../next && mkdir -p ../next
	cp -r .next/standalone/. ../next/
	cp -r .next/static ../next/.next/static
	cp -r public ../next/public
	cd ../next && pm2 start server.js --name test --node-args='--env-file=.env'

env:
	scp ${SERVER}:source/${APP_NAME}/.env .env
build: env
	yarn install
	yarn build
zip: build
	rm -rf deploy && mkdir deploy
	cp -r .next/standalone/. deploy/
	cp -r .next/static deploy/.next/static
	cp -r public deploy/public
	cd deploy && zip -rq ../${APP_NAME}.zip . && cd ..
	rm -rf deploy
push: zip
	ssh ${SERVER} "mkdir -p source/${APP_NAME}"
	scp ${APP_NAME}.zip ${SERVER}:source/${APP_NAME}/
	rm -rf ${APP_NAME}.zip
unzip: push
	ssh ${SERVER} "cd source/${APP_NAME} &&  unzip -oq ${APP_NAME}.zip && rm -f ${APP_NAME}.zip"
start: unzip
	ssh ${SERVER} "cd source/${APP_NAME} && pm2 delete ${APP_NAME} 2>/dev/null; pm2 start server.js --name ${APP_NAME} --node-args='--env-file=.env' && pm2 save"