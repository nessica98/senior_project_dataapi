const {Sequelize} = require('sequelize');


const seq = new Sequelize('mysql://root:password@localhost:3306/boatapp');

	//console.log(seq.authenticate());
	seq.authenticate().then((err)=>{
	console.log('Connection has been established successfully');
	var User = seq.define('user',{
		firstName:{type:Sequelize.STRING},lastName:{type:Sequelize.STRING}
	});
	User.sync({force:true}).then(()=> {
		return User.create(
		  {firstName: 'Minhyun',
	          lastName:'Hwang'}
		)
	});
	User.findAll().then((users)=>{console.log(users)})
	});
	}).catch( (error)=> {
	console.log('Unable to connect', error);
})

