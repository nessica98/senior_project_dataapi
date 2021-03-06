const logging = require('../configs/logging')
const moment = require('moment')
const db = require('../models')
const request = require('request')
const sequelize = db.sequelize
const Sequelize = db.Sequelize
const { Op } = Sequelize
//const NodeGPS = db.nodegpsdata
const LogbookData = db.LogbookData
const LogbookListData = db.LogbookListData
const serverApiUrl = require('../configs/url.config').serverApiUrl

logging.info('_AND ME')
const startDate = new Date('30 May 2020')
const where_condition =  {
    createdAt:
    {
        [Op.lt]: new Date(),
        [Op.gt]: startDate
    }

};
LogbookData.findAll({where: where_condition, include: [{ model: LogbookListData, as: 'lists' }], raw:true,
nest: true}).then((data)=>{
    console.log(data)
    console.log(typeof data)
    const http_data_payload = {gatewayId:'Hyojin', last_update:'2020-01-30 14:30:00', payload:data}
    request.post(`${serverApiUrl}/api/_bulk/logbook-post`,{json: http_data_payload}, (err,resp,body)=>{
        if(err){ console.log(err); return}
        //console.log(resp)
        console.log(body)
    })
}).catch((reason)=>{
    logging.error('DB error')
    process.exit()
})
var newdate = moment().add(30, 's');
setInterval(()=>{
    // Get next latest update
    
    console.log(newdate.diff(moment(),'second'))
    if(newdate.diff(moment(),'seconds')<5){
        logging.info('_AND ME')
        const startDate = new Date('30 May 2020')
        const where_condition =  {
            createdAt:
            {
                [Op.lt]: new Date(),
                [Op.gt]: startDate
            }

        };
        LogbookData.findAll({where: where_condition, include: [{ model: LogbookListData, as: 'lists' }], raw:true,
        nest: true}).then((data)=>{
            console.log(data)
            console.log(typeof data)
            const http_data_payload = {gatewayId:'Junho', last_update:'2020-01-30 14:30:00', payload:data}
            request.post(`${serverApiUrl}/api/_bulk/logbook-post`,{json: http_data_payload}, (err,resp,body)=>{
                if(err){ console.log(err); return}
                //console.log(resp)
                console.log(body)
            })
        })
        newdate = moment().add(2,'m')
    }else{
        logging.debug('hey')
    }
}, 5000)