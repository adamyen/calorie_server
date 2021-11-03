const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/CalorieServer';

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection

con.on('open', () => {
    console.log('Mongodb connected...')
})

