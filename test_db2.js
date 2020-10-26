const { Sequelize } = require('sequelize');

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
sequelize.authenticate().then((err)=>{
    console.log('Connection has been established successfully.')
    node.findAll().then(function(users) {
        console.log(users)
	console.log("All : ", JSON.stringify(users, null, 2));
      })
    
}).catch((err)=>{console.error('Unable to connect to the database:', err);})

