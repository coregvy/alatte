'use strict';

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  userName: 'alatte',
  password: 'p@ssw0rd',
  server: 'alatte.database.windows.net',
  options: {
    database: 'alatte',
    encrypt: true
  }
}

/**
 * add task
 *
 *
 * body Task Updated user object
 * no response value expected for this operation
 **/
exports.addTask = function(body,taskId) {
  return new Promise(function(resolve, reject) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("db alatte connected!");
        console.log("body", body);
        // body
        var priceA = 500; // body.price;
        var userIdA = body.userId;
        console.log("taskId", taskId);

        // get max id request
        var request = new Request(
        "INSERT INTO Task(Id, UserId, UserPrice, Status) VALUES("
        + taskId + "," + userIdA + "," + priceA + ",0)",
        function(err, rowCount, rows) {
          if ( err ) {
            console.log("err", err);
          } else {
            console.log("rowCount", rowCount);
            console.log("row", rows);
          }
        });
        //hook
        request.on('row', function(columns) {
          columns.forEach(function (column) {
            console.log("column: %s\t%s", column.metadata.colName, column.value);
          });
          resolve();
        });
        connection.execSql(request);
      }
    });
  });
}

exports.addLuggage = function(body, taskId) {
  return new Promise(function(resolve, reject) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("db alatte connected!");
        console.log("body", body);
        // body
        var typeA = 1;//body.type;
        var userIdA = 5; // body.userId;

        // get max id request
        var request = new Request(
        "INSERT INTO Luggage(Id, Type, TaskId, UserId) VALUES((select max(Id)+1 from Luggage),"
        + typeA + "," + taskId + "," + userIdA + ")",
        function(err, rowCount, rows) {
          if ( err ) {
            console.log("err", err);
          } else {
            console.log("rowCount", rowCount);
            console.log("row", rows);
          }
        });
        //hook
        request.on('row', function(columns) {
          columns.forEach(function (column) {
            console.log("column: %s\t%s", column.metadata.colName, column.value);
          });
          resolve();
        });
        connection.execSql(request);
      }
    });
  });
}

exports.RenewTaskId = function() {
  return new Promise(function(resolve, reject) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("db alatte connected!");

        var request = new Request(
        "select max(Id) from Task",
        function(err, rowCount, rows) {
          if ( err ) {
            console.log("err", err);
          } else {
            console.log("rowCount", rowCount);
            console.log("row", rows);
          }
        });

        //hook
        request.on('row', function(columns) {
          console.log("renew", columns[0].value);
          resolve(columns[0].value + 1);
        });
        connection.execSql(request);
      }
    });
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
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("db alatte connected!");
        var request = new Request(
        "select Status from Task where Id=" + taskId,
        function(err, rowCount, rows) {
          if ( err ) {
            console.log("err", err);
          } else {
            console.log("rowCount", rowCount);
            console.log("row", rows);
          }
        });
        request.on('row', function(columns) {
          columns.forEach(function(column) {
            console.log("get staus %s\t%s", column.metadata.colName, column.value);
            resolve({Status:column.value});
          });
        });
        connection.execSql(request);
      }
    });
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
