const router = require('express').Router()
const db = require('./models')
const GatewayData = db.GatewayData

router.get('/all', (req,res)=>{
    GatewayData.findAll().then((data)=>{
        data = data.map(val=>val.dataValues)
        res.send(data)
    }).catch((reason)=>{
        res.sendStatus(500)
    })
})

module.exports = router