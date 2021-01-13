const dbConfig = require('../configs/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

const nodeGPSdata = require('./nodegpsdata.model')
const nodeData = require('./nodedata.model')
const GatewayData = require('./gatewaydata.model')
const Logbooks = require('./logbook.model')
db.nodegpsdata = nodeGPSdata(sequelize,Sequelize)
db.nodedata = nodeData(sequelize,Sequelize)
db.GatewayData = GatewayData(sequelize,Sequelize)
const {LogbookListData,LogbookData} = Logbooks(sequelize,Sequelize)
db.LogbookListData = LogbookListData;
db.LogbookData = LogbookData
module.exports = db