const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express()


/*
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
*/
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log("Show origin",req.header('Origin'))
  next()
})
const db = require("./models")
const sequelize = db.sequelize
const NodeGPS = db.nodegpsdata
sequelize.sync({ force:false,alter:true }).then((val) => {
  console.log('DB start run')
})
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to boatapp application." });
});

const ApiRoute = require('./api.route')
app.use("/api", ApiRoute)

// set port, listen for requests
const PORT = process.env.PORT || 5020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
