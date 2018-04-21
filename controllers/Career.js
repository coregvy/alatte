'use strict';

var utils = require('../utils/writer.js');
var Career = require('../service/CareerService');

module.exports.careerLogin = function careerLogin (req, res, next) {
  var name = req.swagger.params['name'].value;
  Career.careerLogin(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.checkout = function checkout (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  Career.checkout(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.declareTask = function declareTask (req, res, next) {
  var body = req.swagger.params['body'].value;
  Career.declareTask(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.end = function end (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  Career.end(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.receipt = function receipt (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  Career.receipt(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerLocation = function registerLocation (req, res, next) {
  var body = req.swagger.params['body'].value;
  Career.registerLocation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.start = function start (req, res, next) {
  var taskId = req.swagger.params['taskId'].value;
  Career.start(taskId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.taskSearch = function taskSearch (req, res, next) {
  var careerId = req.swagger.params['careerId'].value;
  var latitude = req.swagger.params['latitude'].value;
  var longitude = req.swagger.params['longitude'].value;
  Career.taskSearch(careerId,latitude,longitude)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
