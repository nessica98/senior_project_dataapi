const mysql = require('mysql2')

const conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'password',
	database:'boatapp'
})

conn.query('SELECT * FROM nodedata', (err,res,field)=>{
	console.log(res)
	res.map((val)=>{console.log(val.nodename)})
	console.log(typeof res)
	console.log(field)
	conn.close()
})

