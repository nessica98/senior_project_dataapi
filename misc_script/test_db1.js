const { Sequelize } = require('sequelize');
var sequelize = new Sequelize('mysql://root:password@localhost:3306/boatapp');

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
});

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    // force: true will drop the table if it already exists
    node.findAll().then(function(users) {
      console.log(users)
    })

  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });