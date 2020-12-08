const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
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

const db  = require('./models')
const gpsRoute = require('./gps.route')
const sequelize = db.sequelize
const NodeGPS = db.nodegpsdata
sequelize.sync({alter:true}).then((val)=>{
    console.log('DB start run')
})
app.use('/gps',gpsRoute)

// set port, listen for requests
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});