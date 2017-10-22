	// Import module
	// var petfinder = require('petfinder-promise')('c67778838b65cfc7d59c75c748f7e418', '8b9671ae3aeade899176d701de59446d');
	const sgMail = require('@sendgrid/mail');
	var petfinder = require('pet-finder-api')('c67778838b65cfc7d59c75c748f7e418','8b9671ae3aeade899176d701de59446d');
	var bodyParser = require('body-parser');
	var express = require('express');
	var app = express();

	var port = process.env.PORT || 8080;

	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(bodyParser.urlencoded({ extended: true })); 
	app.use(express.static(__dirname + '/public'));


	app.listen(port, function() {
	    console.log('Our app is running on http://localhost:' + port);
	});

	app.get('/',function(req,res){
		res.render('index')
	});

	app.post('/view',function(req,res){
		var animal = req.body.pet;
		petfinder.getBreedList(animal, function(err, breeds){
			res.render('pets',{pets : breeds});
		});
	});

	app.post('/petRand',function(req,res){
		var gender = req.body.gender;
		var animal = req.body.animal;
		var size = req.body.size;
		var options = {
			animal : animal,
			size : size,
			sex : gender
		};
		petfinder.getRandomPet(options, function(err, Pet) {
	  		res.render('pet',{pet : Pet});
	  	});
	});

	app.post('/sendMail',function(req,res){
		var sender = req.body.email;
		var reciver = req.body.rec;
		var message = req.body.message;
		sgMail.setApiKey('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');
		const msg = {
  		to: 'tubesniper@gmail.com',
  		from: sender,
  		subject: 'Pet Adoption Request',
  		text: message,
		};
		sgMail.send(msg);
		console.log('Done !! message delieverd from '+ sender + ' to ' + reciver);
		return res.redirect('/');
	});





