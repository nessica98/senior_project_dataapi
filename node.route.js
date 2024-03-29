const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');
const db = require('./models')
const Request = require('request');
const NodeData = db.nodedata
const NodeOwner = db.NodeOwner
const urlConfig = require('./configs/url.config')
const logging = require('./configs/logging')

router.post('/add', async (req, res) => {
    const { nodename, node_startdate, nodeowner } = req.body
    if (!(nodename && node_startdate && nodeowner)) {
        res.sendStatus(400);
        return
    }
    const ownerid = await NodeOwner.findOne({ where: { NodeOwnerName: nodeowner }, raw: true }, { attribute: ['NodeOwnerId'] })
    //console.log(ownerid.NodeOwnerId)
    //logging.debug(ownerid.NodeOwnerId)
    if (ownerid && ownerid.NodeOwnerId) {
        const newnode = { nodename: nodename, node_startdate:new Date(node_startdate), nodeOwnerId:ownerid.NodeOwnerId,nodeownerNodeOwnerId:ownerid.NodeOwnerId}
        const newnode_toserver = { nodename: nodename, node_startdate: new Date(node_startdate), nodeowner: nodeowner }
        logging.debug(urlConfig.serverApiUrl)
        NodeData.create(newnode).then((result) => {
            //console.log(result)
            Request.post(urlConfig.serverApiUrl + '/api/node/add', { headers: { 'content-types': 'application/json' }, body: newnode_toserver, json: true }, (err, resp, body) => {
                if (err) {
                    //console.log('error', err); 
                    res.status(500).send({ addComplete: true, addtoServerComplete: false });
                } else {
                    if (resp && resp.statusCode) {
                        logging.debug(`resp status ${resp.statusCode}`)
                        if (resp.statusCode == 200) {
                            console.log(body.data);
                            NodeData.update({nodeGServerId:body.data.id},{where:{id:result.id}}).then((result11)=>{
                                res.send({ addComplete: true, addtoServerComplete: true })
                            }).catch((reason)=>{
                                res.send({ addComplete: true, addtoServerComplete: false, error: reason })
                            })
                            //const value = JSON.parse(body)
                            //console.log(value)
                            
                        }
                        else {
                            res.status(500).send({ addComplete: true, addtoServerComplete: false, status: resp.statusCode })
                        }
                    }

                    else { //console.log('error', err);
                        res.status(500).send({ addComplete: true, addtoServerComplete: false, unknownError: true })
                    }
                }
            })
            //res.send({addComplete:true,data:result})
        }).catch((reason) => {
            //console.log(reason)
            res.sendStatus(500)
        })

    } else {
        res.status(404).json({ status: "nodeowner not found" })
    }
})

router.post('/adduser', (req, res) => {
    const { nodeownername, raw_password } = req.body;
    const newowner = { NodeOwnerId: uuidv4(), NodeOwnerName: nodeownername, NodeOwnerKeyHd5: md5(raw_password) }
    const newowner_nokey = { NodeOwnerId: newowner.NodeOwnerId, NodeOwnerName: nodeownername }
    NodeOwner.create(newowner).then((result) => {
        console.log(result)
        Request.post(urlConfig.serverApiUrl + '/api/node/adduser', { headers: { 'content-types': 'application/json' }, body: newowner_nokey, json: true }, (err, resp, body) => {
            if (err) {
                console.log('error', err); res.status(500).send({ addComplete: true, addtoServerComplete: false });
            } else {
                if (resp && resp.statusCode) {
                    logging.debug(`resp status ${resp.statusCode}`)
                    if (resp.statusCode == 200) {
                        console.log(body);
                        res.send({ addComplete: true, addtoServerComplete: true })
                    }
                }
                else { console.log('error', err); res.status(500).send({ addComplete: true, addtoServerComplete: false, resp: resp.statusCode }) }
            }
        })
        //res.send({status:"add complete",data:result})
    }).catch((reason) => {
        console.error(reason)

        res.status(500).send({ status: "error", reason: reason })
    })

})

module.exports = router