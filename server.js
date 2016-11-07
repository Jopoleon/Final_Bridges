var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var url = require("url");
var bodyParser = require('body-parser');
// Xpath to my DOM element:
//// *[@id="waterleveltable"]/table/tbody/tr[2]/td[2]/span
//Selector for needed dom elment:
//#waterleveltable > table > tbody > tr:nth-child(2) > td.value > span

//url http://localhost:8081/scrape
//http://spun.fkpkzs.ru/Level/Gorny

app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.post('/scrape', function (req, res, next) {
    console.log("Someone made request");
    console.log("req.body: "+req.body);
    url = 'http://spun.fkpkzs.ru/Level/Gorny';
    request(url, function (error, response, html) {
        if (!error) {
            console.log("Inside request");
            var $ = cheerio.load(html);
            var date, waterlevel;
            var json = {
                time: "",
                waterlevel: "",
                shipValue:""
            };
            json.time = $("#waterleveltable td.timestampvalue").first().text()
            json.waterlevel = $("#waterleveltable td.value").first().text()
            json.shipValue = req.body;
            res.send(json);
            console.log(json);
            //res.send(JSON.stringify(json, null, 4));
        }
    })
})

app.listen('8081')
console.log('Server started on port 8081');
exports = module.exports = app;