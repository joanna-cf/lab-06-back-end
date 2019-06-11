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
// app.get('/ping', (request, response) => {
//   try {
//     response.send('pong');
//   }
//   catch(error) {
//     console.error(error);
//     response.status(500).send('Status: 500');
//   }
// });

let errorObject = {
  status : 500,
  responseText : "Sorry, something went wrong",
}

// Location
app.get('/location', (request, response) => {

  try {
    // Mock DATA
    const mockLocationData = require('./data/geo.json');
    const location = new Location(request.query.data, mockLocationData.results[0]);
    response.send(location);
  }
  catch(error) {
    console.error(error);
    response.status(500).send(errorObject);
  }
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

  try {
    let weatherArray = [];

    //Mock Data
    const mockWeatherData = require('./data/darksky.json');
  
    for (var i = 0; i < mockWeatherData.daily.data.length; i++){
      // ORIGINAL FUNCTION BEFORE CONSTRUCTOR
      // let testWeather = { 
      //   forecast : mockWeatherData.daily.data[i].summary,
      //   time : mockWeatherData.daily.data[i].time,
      // }
      const testWeather = new Weather(request.query.data, mockWeatherData.daily.data[i]);
      weatherArray.push(testWeather);
    }
    response.send(weatherArray);
  }
  catch(error) {
    console.error(error);
    response.status(500).send(errorObject);
  }
});

// Weather Constructor Function
function Weather(query, darkSkyData){
  this.forecast = darkSkyData.summary;
  this.time = new Date(darkSkyData.time * 1000).toDateString();
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
