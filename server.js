'use strict';

// Load Environment Variable from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// API Routes
app.get('/ping', (request, response) => {
  response.send('pong');
});

// Location
app.get('/location', (request, response) => {

  // Mock DATA
  const mockLocationData = require('./data/geo.json');
  const location = new Location(request.query.data, mockLocationData.results[0]);
  response.send(location);
});

// Location Constructor Function
function Location(query, geoData){
  this.search_query = query;
  this.formatted_query = geoData.formatted_address;
  this.latitude = geoData.geometry.location.lat;
  this.longitude = geoData.geometry.location.lng;
}

// Weather
app.get('/weather', (request, response) => {
  let weatherArray = [];
  
  //Mock Data
  const mockWeatherData = require('./data/darksky.json');
  // console.log('length', mockWeatherData.data.length);
  // for (var i = 0; i < darkSkyData.data.length)
  // const weather = new Weather(request.query.data, mockWeatherData.results[0]);

  // const testWeather = 
  for (var i = 0; i < mockWeatherData.daily.data.length; i++){
    let testWeather = {
      forecast : mockWeatherData.daily.data[i].summary,
      time : mockWeatherData.daily.data[i].time,
    }
    weatherArray.push(testWeather);
  }


  // console.log('weather', weather);
  // console.log('request query data', request.query.data);
  response.send(weatherArray);

});

// Weather Constructor Function
function Weather(query, darkSkyData){
  this.forecast = darkSkyData.daily.data.summary;
  this.time = darkSkyData.daily.data.time;
}







// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
