const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app_mode = process.env.APP_MODE

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to boatapp application." });
});

const db = require('./models')
const gpsRoute = require('./gps.route')

const gatewayRoute = require('./gateway.route')
const bulkTxRoute = require('./bulk.route')

const sequelize = db.sequelize
const NodeGPS = db.nodegpsdata
sequelize.sync({ alter: true }).then((val) => {
  console.log('DB start run')
})
app.use('/gps', gpsRoute)
if (app_mode === 'Server') {
  console.log('SERVER')
  app.use('/gateway', gatewayRoute)
} else if (app_mode === 'Gateway') {
  console.log('GATEWAY')
  app.use('/_bulk', bulkTxRoute)
}
// set port, listen for requests
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});