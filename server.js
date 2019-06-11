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




// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
