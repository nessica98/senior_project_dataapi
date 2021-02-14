const Router = require('express').Router()

Router.get('/',(req,res)=>{
    res.send({ack:true})
})

module.exports = Router