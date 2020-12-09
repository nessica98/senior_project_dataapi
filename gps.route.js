const router = require('express').Router()
const db = require('./models')
const request = require('request')
const findstop_fn = require('./findstop.func')
const sequelize = db.sequelize
const NodeGPS = db.nodegpsdata

router.get('/node/:nodeName',(req,res)=>{
    const {nodeName} = req.params
    NodeGPS.findAll({where:{nodeName:nodeName}}).then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((reason)=>{
        if(reason) console.error(reason)
        res.sendStatus(500)
    })
})

router.get('/alldata',(req,res)=>{
    NodeGPS.findAll().then((result)=>{
        console.log(result)
        res.send(result)
    }).catch((reason)=>{
        if(reason) console.error(reason)
        res.sendStatus(500)
    })
})

router.post('/gpsset',(req,res)=>{
    const {nodeName,nodeLAT,nodeLong,timeStamp} = req.body 
    if(!(nodeName&&nodeLAT&&nodeLong&&timeStamp)){
        res.sendStatus(400)
        return
    }
    NodeGPS.build({nodeName:nodeName,nodeGPScoordinate:{ type: 'Point', coordinates: [nodeLAT,nodeLong]},updateTimestamp:timeStamp}).save()
    .then((val)=>{
        res.send(val)
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(500)
    })
})

router.get('/stop-point/:name',(req,res)=>{
    // return one ' s stop point
    const isAll = false
    const {startDate,stopDate} = req.body
    if(startDate&&stopDate) isAll = true;
    NodeGPS.findAll().then((val)=>{
        const stop_pointResult = findstop_fn(val)
        res.send(stop_pointResult)
    })
    
})

module.exports = router