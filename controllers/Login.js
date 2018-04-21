'use strict';

var utils = require('../utils/writer.js');
var Login = require('../service/LoginService');

module.exports.login = function login (req, res, next) {
  var name = req.swagger.params['name'].value;
  Login.login(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
