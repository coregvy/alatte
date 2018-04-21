'use strict';

var utils = require('../utils/writer.js');
var Task = require('../service/TaskService');

module.exports.addTask = function addTask (req, res, next) {
  var body = req.swagger.params['body'].value;
  Task.addTask(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPetById = function getPetById (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  Task.getPetById(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
