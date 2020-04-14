'use strict'

// Environment variables
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Database Setup
if (!process.env.DATABASE_URL == 'postgres://localhost/todo_app') {
    throw 'DATABASE_URL is missing!';
}

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => { throw err; });

// Application Setup
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON body parser

// Specify a directory for static resources
app.use(express.static('./public'));


// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes

app.get('/', getTasks);
app.get('/tasks/:task_id', getOneTask);
app.get('/add', showAddTaskForm);
app.post('/add', addTask);

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

client.connect()
  .then(() => {
    console.log('PG Connected!');

    app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
  })
  .catch(err => { throw err; });


// Route Handlers
function getTasks(request, response) {
    const { task_id } = request.params;
    const SQL = 'SELECT * FROM Tasks WHERE id = $1 LIMIT 1';

    client.query(SQL, [task_id])
    .then(results => {
        const { rows } = results;
        if (rows.length <1) {
            handleError('Task Not Found', response)
        } else {
            response.render('pages/detail-view', {
                task: rows[0]
            });
        }

        response.render('index', {
            tasks: rows
        });
    })
    .catch(err => {
        handleError(err, response);
    });
}

function getOneTask(request, response) {
    const { task_id } = request.params;

    response.send(`Task Detail: ${task_id}`);
}
function showAddTaskForm(request, response) {
    response.render('pages/add-view');
}

function addTask(request, response) {
    console.log('POST /add', request.body);
    const { title, description, category, contact, status } = request.body;

    const SQL = 'INSERT INTO tasks (title, description, category, contact, status) VALUES ($1, $2, $3, $4,$5) RETURNING id';
    const values = [title, description, category, contact, status];

    // POST - REDIRECT - GET
    client.query(SQL, values)
    .then(() => {
        response.redirect('/');
    })
}

function handleError(err, response) {
    let viewModel = {
        error: err,
    };
    response.render('pages/error-view', viewModel);
}