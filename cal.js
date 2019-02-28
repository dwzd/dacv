//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight/(height*height);
  res.send("<h2 style='color:#ff8000'>Your BMI is " + bmi + "</h2>");
});

app.listen(process.env.PORT || 3008, function(){
  console.log("The BMI server started at port 3008");
});
