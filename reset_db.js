const db = require('./models')
const gpsRoute = require('./gps.route')

const gatewayRoute = require('./gateway.route')
const LogbookRoute = require('./logbook.route')
const bulkTxRoute = require('./bulk.route')
const authRoute = require('./auth.route')

const sequelize = db.sequelize
const NodeGPS = db.nodegpsdata
sequelize.sync({ force:true }).then((val) => {
  console.log('DB start run')
})
