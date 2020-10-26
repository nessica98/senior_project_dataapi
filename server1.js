const express = require('express');
const cors = require('cors');
//const pg = require('pg');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

app = express()

app.use(cors())

const sequelize = new Sequelize('mysql://root:password@localhost:3306/boatapp') 

var node = sequelize.define('nodedata', {
    nodename: {
      type: Sequelize.STRING
    },
    nodeowner: {
      type: Sequelize.STRING
    },
    nodestartdate: {
      type: Sequelize.DATEONLY 
    },
    nodeLastUpdate: {
      type: Sequelize.DATE
    }
  },{tableName:'nodedata',timestamps:false});

node.removeAttribute('id');

const conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'password',
	database: 'boatapp'
})
app.get('/', (req,res)=>{
    res.send({"name":"ongseongwoo"})
})
app.get('/nodedata', (req,res)=>{
    sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    // force: true will drop the table if it already exists
    node.findAll().then(function(users) {
        res.send(JSON.stringify(users, null,2))
      })
        })
        .catch(function (err) {
          console.log('Unable to connect to the database:', err);
        });
      })

app.get('/nodedata2', (req,res)=>{
 conn.query('SELECT * FROM nodedata', (err,data,f)=>{
	 if (err) console.error(err)

 	console.log('get data')
	 res.send(data)
 })   
})


//app.get('/data/:id',getDataOne)
app.listen(5000, ()=>{
    console.log('App run at 5000')
})
