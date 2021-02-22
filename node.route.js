const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');
const db = require('./models')
const Request = require('request');
//const { request } = require('express');
const NodeData = db.nodedata
const NodeOwner = db.NodeOwner
const urlConfig = require('./configs/url.config')

router.post('/add', async (req,res)=>{
    const {nodename,node_startdate,nodeowner } = req.body
    if(!(nodename && node_startdate && nodeowner)) {
        res.sendStatus(400);
        return
    }
    const ownerid = await NodeOwner.findOne({where: {NodeOwnerName:nodeowner},raw:true}, {attribute:['NodeOwnerId']})
    console.log(ownerid.NodeOwnerId)
    if(ownerid){
        const newnode = {nodename:nodename,nodestartwork:new Date(node_startdate),nodeackupdate:new Date(),nodeupdate:new Date(),nodeownerNodeOwnerId:ownerid.NodeOwnerId,NodeOwnerId:ownerid}
        NodeData.create(newnode).then((result)=>{
            Request.post(urlConfig.serverApiUrl+'/api/node/new', {body:newnode} , (err,resp,body)=>{
                if(!err) console.log(body);
                else console.log('error',resp)
            })
            res.send({addComplete:true,data:result})
        }).catch((reason)=>{
            console.log(reason)
            res.sendStatus(500)
        })
        
    }else{
        res.status(404).json({status:"nodeowner not found"})
    }
})

router.post('/adduser', (req,res)=>{
    const {nodeownername,raw_password} = req.body;
    const newowner = {NodeOwnerId:uuidv4(),NodeOwnerName:nodeownername, NodeOwnerKeyHd5:md5(raw_password)}
    NodeOwner.create(newowner).then((result)=>{
        res.send({status:"add complete",data:result})
    }).catch((reason)=>{
        console.error(reason)
        res.send({status:"error",reason:reason})
    })
    
})

module.exports = router