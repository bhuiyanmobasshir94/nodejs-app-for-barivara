var express = require('express');
var router = express.Router();

var loginModel = require.main.require('./models/login-model');

router.get('/landlord/login', function (req, res){
	res.render('login/loginview', {errors:[]});
});

router.post('/landlord/login', function(req, res){
	req.checkBody('UserID', 'UserID is required').notEmpty();
	req.checkBody('Password', 'Password is required').notEmpty();
	//var errors = req.validationErrors(); 
	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			console.log(data);


			res.render('login/loginview', data);
		}
		else
		{
			var user = {
				UserID: req.body.UserID,
				Password: req.body.Password
			};

			loginModel.verifyUser(user, function(valid){
				if (valid){
					req.session.loggedUser = user;
					console.log("success");
					res.redirect('/landlord');
				}
				else{
					 
					res.render('login/loginview', {errors:[]});
				}
				//res.redirect('/home');
			})
		}
	});
	
});



module.exports = router;