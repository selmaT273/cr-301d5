'use strict';

require('dotenv').config();

const express = require('express');

const app = express();
app.set('view engine', 'ejs');

// Routes
app.get('/', (request, response) =>{
  response.render('index');
})

app.get('/list', (request, response) => {
  // TODO: go to DB
  const list = ['apples','bacon','bacon','chocolate'];

  const viewModel = {
    groceryList: list,
    user: {
      name: 'Keith',
      username: 'dahlbyk'
    }
  };
  response.render('list', viewModel)
})

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); 
