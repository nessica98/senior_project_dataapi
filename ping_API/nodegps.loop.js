const logging = require('../configs/logging')
const moment = require('moment')
const db = require('../models')
const request = require('request')
const sequelize = db.sequelize
const Sequelize = db.Sequelize
const { Op } = Sequelize
const GatewayData = db.GatewayData
const NodeData = db.nodedata
const NodeGPS = db.nodegpsdata

const update_function = require('./upload_fuction')


//async function call
mainFunc = async () => {
    // try{
    var gatewayData = await GatewayData.findOne({ where: { gatewayName: 'Yunseong' }, raw: true });
    if (!gatewayData || !gatewayData.gatewayackUpdate) {
        logging.error("no gateway data")
        process.exit()
    }
    logging.info(gatewayData.gatewayName)
    update_function(gatewayData.gatewayackUpdate)


    gatewayData = await GatewayData.findOne({ where: { gatewayName: 'Yunseong' }, raw: true });
    if (!gatewayData || !gatewayData.gatewayackUpdate) {
        logging.error("no gateway data")
        process.exit()
    }
    var newdate = moment(gatewayData.gatewayackUpdate)
    setInterval(async () => {
        //console.log(newdate.diff(moment(),'second'))
        if (newdate.diff(moment(), 'seconds') < 5) {
            logging.info('_AND ME')
            
            gatewayData = await GatewayData.findOne({ where: { gatewayName: 'Yunseong' }, raw: true });
            if (!gatewayData || !gatewayData.gatewayackUpdate) {
                logging.error("no gateway data")
                process.exit()
            }

            update_function(moment(gatewayData.gatewayackUpdate))
            newdate = moment().add(2, 'm')
        } else {
            logging.debug('hey')
        }
        //update_function('2020-01-03 10:30:00')
    }, 1000)
}

// catch {
//     logging.error("database error")
//     process.exit()
// }
//}
mainFunc()
//
// GatewayData.findOne({ where: { gatewayName: 'Yunseong' } }).then((data)=>{
//     if(!data) {
//         logging.error("no gateway data")
//         process.exit()
//     }
//     console.log(data)
// }).catch((reason)=>{
//     logging.error("database error")
//     process.exit()
// })

// update_function('2020-01-03 10:30:00')
// var newdate = moment().add(2, 'm');

// setInterval(()=>{
//     //console.log(newdate.diff(moment(),'second'))
//     if(newdate.diff(moment(),'seconds')<5){
//         logging.info('_AND ME')
//         update_function('2020-01-03 10:30:00')
//         newdate = moment().add(2,'m')
//     }else{
//         logging.debug('hey')
//     }
//     //update_function('2020-01-03 10:30:00')
// },1000)

