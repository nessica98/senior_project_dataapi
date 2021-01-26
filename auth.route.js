const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const db = require('./models')
const NodeOwner = db.NodeOwner

Router.post('/login', (req,res)=>{
    const { user,pass } = req.body
    console.log(user,pass)
    if(!(user && pass)) {
        res.sendStatus(400)
        return;
    }
    NodeOwner.findAll({where: {NodeOwnerName:user}, raw:true}).then((val)=>{
        console.log(val)
        if(val.length < 1) {
            res.status(404).send({error:'user not found'})
            
        } else {
            //console.log(val[0].NodeOwnerKeyHd5,pass)
            if(val[0].NodeOwnerKeyHd5 === pass) {
                // create jwt and send to user keep in local storage
                const token = jwt.sign({ownername:user}, 'wekimeki', {expiresIn:1800})
                res.send({auth:true,token:token})
            }else{
                res.send({auth:false,error:'wrong password'})
            }
        }
    })
    
})

module.exports = Router