const express = require('express')
const cors = require('cors')
const bodyPs = require('body-parser')
const mysql = require('mysql2')
const gpsin = require('./gpsin')
const logbook = require('./logbook')

app = express()
app.use(cors())
app.use(bodyPs.json())

app.use('/gps', gpsin)
app.use('/logbook', logbook)
const conn = mysql.createConnection('mysql://root@localhost:3306/boatapp')

app.get('/',  (req,res)=>{
    res.send({status:"ack"})
})

app.get('/allnode', (req,res)=>{
    conn.query('SELECT * FROM nodedata',(err,result,fi)=>{
        if(err) console.log(err)

        console.log(result)
        res.send(result)
    })
})

app.get('/allnode/latest', (req,res)=>{
    var SQLcontext = `SELECT S1.nodename,S1.GPSLat,S1.GPSLong 
    FROM boatapp.nodegpsdata S1 , (SELECT nodename,max(updateTime) as latestUPD FROM boatapp.nodegpsdata group by nodename) S2
    WHERE S1.updateTime = S2.latestUPD;`
    conn.query(SQLcontext,(err,result,fi)=>{
        if(err) console.log(err)

        console.log(result)
        res.send(result)
    })
})

app.get('/nodegps/:nodename', (req,res)=>{
    var nodename = req.params.nodename
    conn.query('SELECT * FROM nodeGPSdata WHERE `nodename` = ?',[nodename], (err,result,fi)=>{
        if(err) console.error(err)

        console.log(result)
        res.send(result)
    })
})

app.post('/')
app.listen(5000, ()=>{
    console.log('app run at 5000')
})