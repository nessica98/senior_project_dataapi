const router = require('express').Router()
const db = require('./models')
const app_mode = process.env.APP_MODE

// simple route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to boatapp application." });
  });
  
const gpsRoute = require('./gps.route')
const nodeRoute = require('./node.route')
const gatewayRoute = require('./gateway.route')
const LogbookRoute = require('./logbook.route')
const bulkTxRoute = require('./bulk.route')
const authRoute = require('./auth.route')
   
router.use('/gps', gpsRoute)
router.use('/logbook', LogbookRoute)
router.use('/authen', authRoute)
router.use('/node', nodeRoute)

// if (app_mode === 'Server') {
//     console.log('SERVER')
//     router.use('/gateway', gatewayRoute)
//     router.use('/_bulk', bulkTxRoute)
// } else if (app_mode === 'Gateway') {
//    router.use('/authen',authRoute)
//    router.use('/node', nodeRoute)
//    console.log('GATEWAY')
    
// }

module.exports = router