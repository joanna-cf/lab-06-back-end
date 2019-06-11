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

	console.log('location', location);
	console.log('request.query.data', request.query.data)

  response.send(location);

});

// Location Constructor Function
function Location(query, geoData){
  this.search_query = query;
  this.formatted_query = geoData.formatted_address;
  this.latitude = geoData.geometry.location.lat;
  this.longitude = geoData.geometry.location.lng;
}


// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
