var express = require('express');
var app = express();
var http = require('http').Server(app);
// port : 3000 を使用。
var port = process.env.PORT || 3000;
var request = require('request');
// assetはpublic以下に配置
app.use(express.static('public'))

http.listen(port);

// urlencodedとjsonは別々に初期化する
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// get / post request
app.get('/', function(req, res){
    res.sendfile('html/index.html');
});

// tester
app.get('/tester', function(req, res){
//    res.sendfile('html/motiontest.html');
    console.log("tester");
    request.get('http://hackathon.support-cloud-projects.com/LaundromatWebApi/api/shopinfo?KNJPREFECTURES=東京都', {
        headers: {
            Authorization:"Bearer vszudVcHhj8AQeH6qg3xXe-hUgEVu3uWq3QzTvNAEvSuON3haCjYpVbQX2sp0nDM_XbHPaCLTZxFYikxP1zYgcDQYo2xc4PTLdqFcRga9UfhWPNFMn561ZOEWHQfw-_0ZcAjSvnmg4S-QBTjl_Akcioi0fctND-nlUa2AEw2XH13hREtkRpzS2ss_4IxO1-tNXaJKO9P5s0VKKpALWP_j6CAnWsHUVVwpM7WNwBC5DxAr4aM9ljmyWVImptCx7MN2QuQYBQ5ZfRtMDd-nkp90r4Rg19lbe2WIcDSnQODReEvID459mfytYh94fwrXa6sWjKerd-Ao9M6_fVxAP5Hr52FCjuYX57j0-JM1wlZ7U6UmBLGtxMoxduAw9HKPeS1IaK7hTax4oTuGlnY8wr0oLl_2A8sc8Gu3zyV-QcyIcTdPQNwT0ogacjVW-Vw0hYym2cIgVo0Mh5nXbvFetBUwBNon2KSDOWnbUbKVDu5L98",
            Accept:"application/json"
        }
    }, (error, response, body) => {
        console.log("err" + error);
        console.log("res", response);
    });
});
