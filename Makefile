
test:
	DEBUG=*api* mocha test/bootstrap $(shell find test -name *test.js)
test_small:
	mocha $(shell find test/small -name *test.js) 
start:
	DEBUG=*error pm2 start index.js --name pointers-app
restart:
	pm2 restart pointers-app --update-env
stop:
	pm2 stop pointers-app 

.PHONY: test start test_small stop restart
