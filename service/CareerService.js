'use strict';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const syncRequest = require('sync-request');
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
    execSql('select id as careerId from HostInfo where name = \'' + name + '\'', (rows) => {
      resolve(rows[0]);
    });
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
    execSql('update task set status = ' + DEF.STATUS.RECEIVE_HOST_DECIDED + ' where id = ' + taskId, () => {
      execSql('insert into taskhistory (id, taskId, status, taskTime) select max(id)+1, ' + taskId + ', ' + DEF.STATUS.RECEIVE_HOST_DECIDED + ', current_timestamp from taskhistory ', () => {
        resolve();
      });
    });
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
    execSql('select * from task where id = '+body.taskId, (rows)=> {
      if(rows.length === 0) {
        reject({msg:'task not found.'});
        return;
      }
      if (rows[0].Status != DEF.STATUS.REGISTERD && rows[0].Status != DEF.STATUS.WASH_START) {
        reject({msg:'task status failed: ' + rows[0].Status});
        return;
      }
      const isDerivery = rows[0].Status==DEF.STATUS.REGISTERD
      const updateState = isDerivery ? DEF.STATUS.DERIVERY_HOST_DECIDED : RECEIVE_HOST_DECIDED;
      let sql = 'update task set status = ' + updateState + ', deriveryHostId = '+ body.careerId;
      // todo
      if (isDerivery) {
        sql = sql + ', deriveryPrice = ' + 100;
      } else {
        sql = sql + ', ReceivePrice = ' + 150;
      }
      sql = sql + ' where id = ' + body.taskId;
      execSql(sql, () => {
        execSql('insert into taskhistory (id, taskId, status, taskTime) select max(id)+1, ' + body.taskId + ', ' + updateState + ', current_timestamp from taskhistory ', () => {
          resolve();
        });
      });
    });
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
    execSql('update task set status = ' + DEF.STATUS.RECEIVE_HOST_DERIVERED + ' where id = ' + taskId, ()=>{
      execSql('insert into taskhistory (id, taskId, status, taskTime) select max(id)+1, ' + taskId + ', ' + DEF.STATUS.RECEIVE_HOST_DERIVERED + ', current_timestamp from taskhistory ', () => {
        resolve();
      });
    });
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
    execSql('update task set status = ' + DEF.STATUS.DERIVERY_HOST_COLLECTED + ' where id = ' + taskId, () =>{
      execSql('insert into taskhistory (id, taskId, status, taskTime) select max(id)+1, ' + taskId + ', ' + DEF.STATUS.DERIVERY_HOST_COLLECTED + ', current_timestamp from taskhistory ', () => {
        resolve();
      });
    });
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
    console.log(body);
    execSql('update HostInfo set latitude = ' + body.latitude + ', longitude = ' + body.longitude + ' where id = '+ body.careerId, () => {
      resolve();
    });
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
    execSql('update task set status = ' + DEF.STATUS.DERIVERY_HOST_DECIDED + ' where id = ' + taskId, ()=>{
      execSql('insert into taskhistory (id, taskId, status, taskTime) select max(id)+1, ' + taskId + ', ' + DEF.STATUS.DERIVERY_HOST_DECIDED + ', current_timestamp from taskhistory ', () => {
        resolve();
      });
    });
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
    execSql('select t.Id as taskId, t.Status as status, t.OwnerId as ownerId, t.ShopId as shopId, u.latitude as userLatitude, u.longitude as userLongitude from task as t '
    + 'join userinfo as u on t.UserId = u.Id where status in ('+DEF.STATUS.REGISTERD+','+DEF.STATUS.WASH_START+')', (res)=> {
      console.log('sql result:', res);
      res.forEach((task) => {
        if (task.status == DEF.STATUS.REGISTERD) {
          // 持ち込み前
          task.from = {
            latitude: task.userLatitude,
            longitude: task.userLongitude
          }
          // 持ち込むランドリー検索
          const res = syncRequest('GET', DEF.AQUA_API.BASE_URL + 'shopinfo?ANKLONGITUDE=' + task.from.longitude + '&ANKPARALLEL=' + task.from.latitude, {
            headers: {
              Authorization:'Bearer ' + DEF.AQUA_API.TOKEN,
              Accept:'application/json'
            }
          });

          const resobj = JSON.parse(res.getBody('utf-8'));
          task.to = {
            latitude: resobj.DataModel[0].ANKPARALLEL,
            longitude: resobj.DataModel[0].ANKLONGITUDE
          }
        } else {
          // 宛先はユーザ位置
          task.to = {
            latitude: task.userLatitude,
            longitude: task.userLongitude
          }
          // 店舗IDから座標取得
          const res = syncRequest('GET', DEF.AQUA_API.BASE_URL + 'shopinfo?ANKOWNERID=' + task.ownerId + '&ANKSHOPID=' + task.shopId, {
            headers: {
              Authorization:'Bearer ' + DEF.AQUA_API.TOKEN,
              Accept:'application/json'
            }
          });
          const resobj = JSON.parse(res.getBody('utf-8'));
          task.from = {
            latitude: resobj.DataModel[0].ANKPARALLEL,
            longitude: resobj.DataModel[0].ANKLONGITUDE
          };
        }
        task.price = Math.abs(task.from.longitude - task.to.longitude) + Math.abs(task.from.latitude - task.to.latitude);
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

