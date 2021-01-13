const router = require('express').Router()
const moment = require('moment')
const db = require('./models')
const GatewayData = db.GatewayData
const nodeGPSdata = db.nodegpsdata

// server listen : add to server db
router.post('/post',async (req,res)=>{
    const {gatewayId,last_update,payload} = req.body
    if(!(gatewayId && last_update && payload)) {
        res.sendStatus(400);
        return;
    }
    if(!Array.isArray(payload)){
        res.sendStatus(400)
        return;
    }
    payload.forEach((val,idx)=>{
        console.log('add to db', val)
        var new_GPSrow = nodeGPSdata.build(val)
        new_GPSrow.save().then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.error(err)
        })
    })

    res.send('add to server DB')
})

module.exports = router