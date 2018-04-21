'use strict';


/**
 * login
 * ログイン
 *
 * name String 
 * no response value expected for this operation
 **/
exports.careerLogin = function(name) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * checkout
 * 洗濯回収
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
 * タスク実行を宣言する
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
 * 洗濯物引き渡し
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
 * 荷物受領
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
 * 位置登録
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
 * 洗濯スタート
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
 * 運搬依頼検索
 *
 * careerId String 
 * latitude BigDecimal 緯度
 * longitude BigDecimal 経度
 * no response value expected for this operation
 **/
exports.taskSearch = function(careerId,latitude,longitude) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

