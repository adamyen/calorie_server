const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/users.routes')

const URL = 'mongodb://localhost/CalorieServer';

const app = express();
app.listen(8000, () => {
    console.log('Server running...')
});

app.use('/user', userRouter);

mongoose.connect(URL, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log('Mongodb connected...')
});

