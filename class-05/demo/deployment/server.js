'use strict';

require('dotenv').config();





const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('./public'));

app.get('/heroku', (request, response) => {
  response.status(200).send('Heroku is neat')
})

app.get('/hello', (request, response) => {
  console.log(request.method, request.path);
  response.status(200).send(`Hello ${new Date()}`);
});

app.get('/data', (request, response) => {
  let airplanes = [
    {
      departure: Date.now(),
      canFly: true,
      pilot: 'Well Trained'
    },
    {
      departure: new Date(2020, 3, 7),
      canFly: false,
    }
  ]
  response.status(200).json(airplanes);
});

// app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
