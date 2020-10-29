const Router = require('express').Router()
const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid');
const conn = mysql.createConnection('mysql://root@localhost:3306/boatapp')

Router.get('/',(req,res)=>{
    conn.query('SELECT * FROM logbook',(err,result,fi)=>{
        if(err) console.log(err)

        console.log(result)
        res.send(result)
    })
})

Router.get('/:user',(req,res)=>{
    //res.send({ack:true})
    const owner = req.params.user
    conn.query('SELECT * FROM logbook WHERE nodeowner = ?',[owner],(err,result,fi)=>{
        if(err) console.log(err)

        console.log(result)
        res.send(result)
    })
})


Router.post('/add',(req,res)=>{
    const body = req.body
    console.log(body)
    console.log(Object.keys(body))
    if(JSON.stringify(Object.keys(body))==JSON.stringify(['fisheryKind','amount','unit'])){
        conn.query('INSERT INTO logbook VALUES (?,?,?,?,?,NOW())',[uuidv4(),'hwangjs',body.fisheryKind,body.amount,body.unit],(err,result,fi)=>{
            if(err) console.log(err)
    
            console.log(result)
            res.send(result)
        })
    }else{
        res.send('error')
    }
    //res.send({ack:true})
})

module.exports = Router