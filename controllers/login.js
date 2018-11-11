var express = require('express');
var router = express.Router();

var mloginModel = require.main.require('./models/mlogin-model');


router.get('/login', function (req, res){
	res.render('login/vLogin', {errors: []});
});


router.post('/login', function (req, res){
	req.checkBody('userID', 'User Id is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			res.render('login/vLogin', data);
		}

		else
		{
	    var user = {
			userId: req.body.userID,
			password: req.body.password
		};

		mloginModel.verifyUser(user, function(valid){
		if(valid)
		{
			req.session.loggedUser = user;
		
			res.redirect('/cTenant');
		}
		else
		{
			res.render('login/vLogin', {errors: []});
		}
	})

    }

	});

});


module.exports = router;