const router = require('express').Router()
const moment = require('moment')
const db = require('./models')
const GatewayData = db.GatewayData
const nodeGPSdata = db.nodegpsdata

router.post('/post',async (req,res)=>{
    const {gatewayId,last_update} = req.body
    if(!(gatewayId && last_update)) {
        res.sendStatus(400);
        return;
    }
    const gatewayData = await GatewayData.findAll({
        where: {
            gatewayId: gatewayId
        }
    })
    console.log(gatewayData)
    if(gatewayData.length < 1) {
        res.status(404).send('Gateway not found!!')
        return;
    }
    nodeGPSdata.findAll({
        // where: {
        //     updateTimestamp: {$between: [new Date(last_update),new Date(last_update)]}
        // }
    }).then((data)=>{
        data = data.map((val)=>{
            return val.dataValues
        })
        var moment_last = moment(last_update)
        data = data.filter((val,idx)=>{
            var moment_val = moment(val.updateTimestamp)
            console.log(moment_last.diff(moment_val))
            return 1 === 1
        })
        console.log(data)
        res.send('get data from node')
    })
})

module.exports = router