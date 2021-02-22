const Router = require('express').Router()
const mysql = require('mysql2')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const db_config = require('./db_config')
const logging = require('./configs/logging')
const conn = mysql.createConnection(db_config)

Router.get('/login', (req,res)=>{
    const {user,pass} = req.body
    console.log(user,pass)
    var hash = CryptoJS.MD5(pass).toString();
    conn.query('SELECT nodeownername,hash_md5 from nodeowner where nodeownername=?',[user],(err,result)=>{
        console.log(result)
        if(result.length<1) {
            logging.alert(`User ${user} attempt to login`)
            res.sendStatus(401)
        }else{
            if(hash!==result[0].hash_md5) {res.sendStatus(401); return}
            var token = jwt.sign({user:user,id:222}, 'wekimeki', { expiresIn: '1800s' });
            res.send({status:'success',token:token})
            logging.info(`User ${user} login success`)
        }
    })
    //res.send('login')
})
module.exports = Router