require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = 5000;

// middle ware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// server start
app.listen(process.env.PORT || 5000, () => {
  console.log("server start on port :", PORT);
});

// get method
app.get("/", (req, res) => {
  res.render("home");
});

// post method
app.post("/", (req, res) => {
  var city = req.body.city;
  //console.log(city);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
  var weather_data = {};
  axios
    .get(url)
    .then((response) => {
      var data = response.data;
      weather_data.tempearture = data.main.temp;
      weather_data.description = data.weather[0].description;
      weather_data.icon_url = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weather_data.city = city;

      //console.log(weather_data);
      res.render("weather", { weather: weather_data });
    })
    .catch((err) => {
      console.log(err);
    });
});
