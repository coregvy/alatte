'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.addTask = function addTask (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.addTask(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTaskStatus = function getTaskStatus (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  User.getTaskStatus(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.login = function login (req, res, next) {
  var name = req.swagger.params['name'].value;
  User.login(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};