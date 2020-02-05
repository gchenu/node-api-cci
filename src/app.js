require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api', routes);

app.listen(process.env.APP_PORT, function () {
    console.log(`API CO2 listening on port ${process.env.APP_PORT} !`);
});