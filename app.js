const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const cityName = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=d461efdcef2e21657ac00db7a5f75180";

  https.get(url, function(response){
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const location = weatherData.name;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const weatherImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The Temparature in " + location + " is " + temp + " Degree Celcius.</h1>");
        res.write("<h3> The Weater is cureently " + weatherDescription + "</h3>");
        res.write("<img src=" + weatherImage + ">");
        res.send();
    });
  });
});

app.listen(5000, function(){
  console.log("Server is running on port 5000");
});
