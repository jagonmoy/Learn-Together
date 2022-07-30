const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const cookieParser = require('cookie-parser')
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));

// routing 

app.use('/api/auth',authRoutes);


module.exports = app ;