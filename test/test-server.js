var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');



process.env.DATABASE_URL ||
//in a real world setting you’d have that set to a local variable, but assuming this is just a learning project, that should work
                      global.DATABASE_URL ||
                      (process.env.NODE_ENV === 'production' ?
                             'mongodb://localhost/capstone-2' :
                             'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;