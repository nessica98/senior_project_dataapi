
const db = require('./models')
const request = require('request')
const sequelize = db.Sequelize
const { Op } = sequelize
//const NodeGPS = db.nodegpsdata
const LogbookData = db.LogbookData

const startDate = new Date('30 May 2020')
const where_condition =  {
    createdAt:
    {
        [Op.lt]: new Date(),
        [Op.gt]: startDate
      }

};
LogbookData.findAll({where: where_condition, raw:true}).then((data)=>{
    console.log(data)
    console.log(typeof data)
    const http_data_payload = {gatewayId:'Junho', last_update:'2020-01-30 14:30:00', payload:data}
    request.post('http://18.207.139.213:5020/api/_bulk/logbook-post',{json: http_data_payload}, (err,resp,body)=>{
        if(err){ console.log(err); return}
        //console.log(resp)
        console.log(body)
    })
})
