
test:
	DEBUG=*api* mocha $(shell find test)
test_small:
	mocha $(shell find test/small) 
start:
	DEBUG=*Pointers-API* pm2 start index.js --name pointers-app
restart:
	pm2 restart pointers-app --update-env
stop:
	pm2 stop pointers-app 

.PHONY: test start test_small stop restart
