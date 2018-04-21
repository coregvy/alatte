'use strict';


/**
 * add task
 * 
 *
 * body Task Updated user object
 * no response value expected for this operation
 **/
exports.addTask = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find task by ID
 * 
 *
 * taskId Long task id
 * no response value expected for this operation
 **/
exports.getTaskStatus = function(taskId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * login
 * 
 *
 * name String 
 * no response value expected for this operation
 **/
exports.login = function(name) {
  return new Promise(function(resolve, reject) {
    console.log('login: ', name);
    resolve({userId:1});
  });
}

