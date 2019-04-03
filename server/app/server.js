const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');
const env = require('./config/env');
const routes = require('./routes');

const app = express();

app.use(bodyParser());

mongoose.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    routes(app, database);
    app.listen(env.port);
});
