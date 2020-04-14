'use strict'

// Environment variables
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Database Setup
if (!process.env.DATABASE_URL) {
  throw 'DATABASE_URL is missing!';
}
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => { throw err; });

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON body parser

// Specify a directory for static resources
app.use(express.static('./public'));

// CORS would go here if we needed it

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getTasks);

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

client.connect()
  .then(() => {
    console.log('PG is listening!');

    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch(err => { throw err; })


// Route Handlers
function getTasks(request, response) {
  const SQL = 'SELECT * FROM Tasks;';

  client.query(SQL)
    .then(results => {
      const { rowCount, rows } = results;
      console.log('/ db result', rows);

      // response.send(rows);
      response.render('index', {
        tasks: rows
      });
    })
    .catch(err => {
      handleError(err, response);
    });
}

function handleError(err, response) {
  let viewModel = {
    error: err,
  };
  response.render('pages/error-view', viewModel);
}
