'use strict';
// Load Environment Variables from the .env file
require('dotenv').config();
// Application Dependencies
const express = require('express');
const cors = require('cors');
// Application Setup
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

// API Routes
app.get('/', (request, response) => {
  response.status(200).send('Home Page!');
});
app.get('/bad', (request, response) => {
  throw new Error('oh nooooo!');
});

app.get('/location', (request, response) => {
  try {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationData = new Location(city, geoData);
    response.status(200).json(locationData);
  } catch (error) {
    errorHandler(error, request, response);
  }
});
// app.use('*', notFoundHandler);
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}


///////////////////////////////////////////////////////////////////////////////////////

app.get('/weather', (request, response) => {
  try {
    const skyData = require('./data/darksky.json');
    // const city = request.query.city;
    let weatherArr = [];
    
    for (let i = 0; i < skyData.data.length; i++) {
    const weatherData = new Weather(skyData,i);
     weatherArr.push(weatherData)
    }

    response.status(200).json(weatherArr);
  } catch (error) {
    errorHandler(error, request, response);
  }
});
function Weather (skyData, i) {
  // this.search_query = city;
  this.discription = skyData.data[i].weather.discription;
  this.date = skyData.data[i].valid_date;
}

app.use('*', notFoundHandler);

// HELPER FUNCTIONS
function notFoundHandler(request, response) {
  response.status(404).send('NOT FOUND!!');
}
function errorHandler(error, request, response) {
  response.status(500).send(error);
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`the server is up and running on ${PORT}`));
//////////////////////////////////////////////////////////////////////////////////














// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const PORT = process.env.PORT || 4000;
// const app = express();
// app.use(cors());
// app.get('/', (request, response) => {
//   response.status(200).send('Home Page!');
// });
// app.get('/bad', (request, response) => {
//   throw new Error('oh nooooo!');
// });
// app.get('/location', (request, response) => {
//   try {
//     const geoData = require('./data/geo.json');
//     const city = request.query.city;
//     const locationData = new Location(city, geoData);
//     response.status(w200).json(locationData);
//   } catch (error) {
//     errorHandler(error, request, response);
//   }
// });
// function Location(city, geoData) {
//   this.search_query = city;
//   this.formatted_query = geoData[0].display_name;
//   this.latitude = geoData[0].lat;
//   this.longitude = geoData[0].lon;
// }
// ///////////////////////////////////////////////////////////
// app.get('/weather', (request, response) => {
//   try {
//     const weatherAll = [];
//     const weatherData = require('./data/darksky.json');

//     for (let i = 0; i < weatherData.data.length; i++) {
//       const locationData = new Weather(weatherData, i);
//       weatherAll.push(locationData);
//     }
//     response.status(200).json(weatherAll);
//   } catch (error) {
//     errorHandler(error, request, response);
//   }
// });
// function Weather(weatherData,i) {
//     this.description = weatherData.data[i].weather.description;
//     this.time = weatherData.data[i].valid_date;
//   }
// app.use('*', notFoundHandler);
// function notFoundHandler(request, response) {
//   response.status(404).send('NOT FOUND!!');
// }
// function errorHandler(error, request, response) {
//   response.status(500).send(error);
// }
// app.listen(PORT, () => console.log(`the server is up and running on ${PORT}`));



