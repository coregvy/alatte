'use strict';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const config = {
  userName: 'alatte',
  password: 'p@ssw0rd',
  server: 'alatte.database.windows.net',
  options: 
    {
        database: 'alatte'
        , encrypt: true
    }
};

/**
 * login
 * 
 *
 * name String 
 * no response value expected for this operation
 **/
exports.careerLogin = function(name) {
  return new Promise(function(resolve, reject) {
    console.log('career login:', name);
    resolve({careerId: 100});
  });
}


/**
 * checkout
 * 
 *
 * taskId Long task id
 * no response value expected for this operation
 **/
exports.checkout = function(taskId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * declare task
 * 
 *
 * body Declare Updated user object
 * no response value expected for this operation
 **/
exports.declareTask = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * end task
 * 
 *
 * taskId Long task id
 * no response value expected for this operation
 **/
exports.end = function(taskId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * receipt
 * 
 *
 * taskId Long task id
 * no response value expected for this operation
 **/
exports.receipt = function(taskId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * regist location
 * 
 *
 * body Location Updated user object
 * no response value expected for this operation
 **/
exports.registerLocation = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * start
 * 
 *
 * taskId Long task id
 * no response value expected for this operation
 **/
exports.start = function(taskId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * search task
 * 
 *
 * careerId String 
 * latitude BigDecimal 
 * longitude BigDecimal 
 * no response value expected for this operation
 **/
exports.taskSearch = function(careerId,latitude,longitude) {
  return new Promise(function (resolve, reject) {
    const connection = new Connection(config);
    connection.on('connect', function (err) {
      if (err) {
        console.log(err)
      } else {
        const results = [];
        console.log('connect ok.');
        let request = new Request(
          "SELECT * FROM Task",
          function (err, rowCount, rows) {
            console.log('rows: ', rows);
            rows.forEach((row) => {
              console.log('row:', row);
              result.push(row);
            });
            console.log(rowCount + ' row(s) returned');
            resolve(results);
          }
        );
        request.on('row', function (columns) {
          // console.log('row fetch', columns);
          const row = {};
          columns.forEach(function (column) {
            row[column.metadata.colName] = column.value;
            console.log("column: %s\t%s", column.metadata.colName, column.value);
          });
          results.push(row);
        });
        connection.execSql(request);
      }
    });
  });
}

