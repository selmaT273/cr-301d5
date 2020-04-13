'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); 
