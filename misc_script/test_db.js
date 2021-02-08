const {Sequelize} = require('sequelize')

var sequelize = new Sequelize('mysql://root:password@localhost:3306/boatapp');

var User = sequelize.define('user1', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    // force: true will drop the table if it already exists
  User.sync().then(function () {
  // Table created
  return User.create({
    firstName: 'Wooseok',
    lastName: 'Kim'
  });
});
User.findAll().then(function(users) {
  console.log(users)
})
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
