'use strict';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const request = require('sync-request');
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
const DEF = require('../utils/definition');

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
    execSql('select id from HostInfo where name = \'' + name + '\'', resolve);
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
    execSql('update task set status = ' + DEF.STATUS.DERIVERY_HOST_DECIDED + ' where id = ' + taskId, resolve);
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
    execSql('select t.Id as taskId, t.Status as status, t.OwnerId as ownerId, t.ShopId as shopId, u.latitude as userLatitude, u.longitude as userLongitude  from task as t join userinfo as u on t.UserId = u.Id where status in ('+DEF.STATUS.REGISTERD+','+DEF.STATUS.WASH_END+')', (res)=> {
      console.log('sql result:', res);
      res.forEach((task) => {
        if (task.status == DEF.STATUS.REGISTERD) {
          // 持ち込み前
          task.from = {
            latitude: task.userLatitude,
            longitude: task.userLongitude
          }
          const res = request('GET', DEF.AQUA_API.BASE_URL + 'shopinfo?ANKLONGITUDE=' + task.from.longitude + '&ANKPARALLEL=' + task.from.latitude, {
            headers: {
              Authorization:'Bearer ' + DEF.AQUA_API.TOKEN,
              Accept:'application/json'
            }
          });

          const resobj = JSON.parse(res.getBody('utf-8'));
          console.log('resobj:: ', resobj);
          task.to = {
            latitude: resobj.DataModel[0].ANKPARALLEL,
            longitude: resobj.DataModel[0].ANKLONGITUDE
          }
          console.log('api end.');
        } else {
          request.get({
            url: DEF.AQUA_API.BASE_URL + 'api/shopinfo?ANKOWNERID=' + task.ownerId + '&ANKSHOPID=' + task.shopId,
            headers: {
              Authorization:'Bearer ' + DEF.AQUA_API.TOKEN,
              Accept:'application/json'
            }
          }, (error, res, body) => {
            console.log('api2: ', body);
          });
          task.from = {
            latitude: 0,
            longitude: 0
          };
        }
      });
      resolve(res);
    });
  });
}


function execSql(sql, callback) {
  console.log('sql: ', sql);
  const connection = new Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      const results = [];
      let request = new Request(sql, function (err, rowCount, rows) {
          rows.forEach((row) => {
            result.push(row);
          });
          console.log(rowCount + ' row(s) returned');
          callback(results);
        }
      );
      request.on('row', function (columns) {
        const row = {};
        columns.forEach(function (column) {
          row[column.metadata.colName] = column.value;
        });
        results.push(row);
      });
      connection.execSql(request);
    }
  });
}

