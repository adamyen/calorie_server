const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(8000, () => {
    console.log('Server running...')
});

const dbConfig = require('./config/db.config')
const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({ name: "user" }).save(err => {
                if (err) {
                console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({ name: "admin" }).save(err => {
                if (err) {
                console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
