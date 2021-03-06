const logging = require('../configs/logging')
const moment = require('moment')
const db = require('../models')
const request = require('request')
const { serverApiUrl } = require('../configs/url.config')
const sequelize = db.sequelize
const Sequelize = db.Sequelize
const { Op } = Sequelize
const NodeData = db.nodedata
const NodeGPS = db.nodegpsdata
const GatewayData = db.GatewayData

const update_function = (startDate) => {
    // startDate = '2020-01-03'
    //console.log(startDate)
    const where_condition = {
        updateTimestamp:
        {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(startDate)
        }

    };
    // Data modify NodeidGateway to NodeidServer
    NodeGPS.findAll({ where: where_condition, raw: true }).then(async (data) => {
        //console.log(data)
        //console.log(typeof data)
        var nodedata;
        try {
            nodedata = await NodeData.findAll({ raw: true })
            nodedata_dict = new Array()
            
            nodedata = nodedata.map((element,index) => {
                return {id:element.id,nodeGServerId:element.nodeGServerId}
            });
            
            data.forEach((element,index)=>{
                //console.log(element.nodeId)
                let filter_node = nodedata.filter((value,idx)=>{
                    console.log('in filter', value.id, element.nodeId)
                    return value.id == element.nodeId
                })
                
                console.log("from data loop",filter_node)
                if(filter_node[0]) {
                    element.nodeId = filter_node[0].nodeGServerId
                }else{
                    element.nodeId = null
                }

            })
            console.log(data)
            const http_data_payload = { gatewayId: 'Hyojin', last_update: startDate, payload: data }
            request.post(`${serverApiUrl}/api/_bulk/gps-post`, { json: http_data_payload }, (err, resp, body) => {
            if (err) { console.log(err); return }
            //console.log(resp)
            console.log(body)
            if(body.payload_length>0) {
                GatewayData.update({gatewayackUpdate:new Date()},{where: {gatewayName:'Yunseong'}}).then((update_result)=>{
                    logging.debug("update complete")
                })
            }
        })
    }
        // } catch {
        //     logging.error("fetch nodedata error")
        // }
        finally {
            
        }
        
    }).catch((reason) => {
        logging.error('DB error', reason)
        process.exit()
    })
}

module.exports = update_function
//update_function('2020-01-03 14:30:00')