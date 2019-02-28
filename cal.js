//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.get("/contact", function(req, res){
  res.sendFile(__dirname + "/contact.html");
});

app.post("/bmicalculator", function(req, res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight/(height*height);
  res.send("<h2 style='color:#ff8000'>Your BMI is " + bmi + "</h2>");
});

app.get("/price", function(req, res){
  res.sendFile(__dirname + "/price.html");
});

app.post("/price", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var convertPrice = JSON.parse(body);
    var totalPrice = convertPrice.price;
    var time = convertPrice.time;
    console.log(totalPrice);
    res.write("<p style='color:#ff8000'>The current convert time is " + time + "</p>");
    res.write("<h1>The " + amount + crypto + " is currently worth " + totalPrice + fiat + "</h1>");
    res.send();
  });
});

app.listen(process.env.PORT || 3008, function(){
  console.log("The BMI server started at port 3008");
});
