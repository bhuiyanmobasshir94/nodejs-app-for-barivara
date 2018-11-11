var express = require('express');
var router = express.Router();

var landlordModel = require.main.require('./models/landlord-model');

router.get('/signup', function (req, res){
	res.render('landlord/landlordsignupview', {errors:[]});
});



router.post('/signup', function(req, res){
	var userid=req.body.Email;
	var arr = userid.split("@");
	var userId=arr[0];
	var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; 

          var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd;
                  } 
         if(mm<10){
             mm='0'+mm;
                  } 
       var today = dd+'/'+mm+'/'+yyyy;
	req.checkBody('FullName', 'FullName is required').notEmpty();
	req.checkBody('NID', 'National Id length 4 is required').notEmpty().isLength({min:4});
	req.checkBody('Mobile', 'Mobile Number should be 11 characters').notEmpty().isLength({min:11, max:11});
	req.checkBody('Email', 'Email is required').isEmail().notEmpty();
	req.checkBody('Password', 'Password should be more than 4 characters').isLength({min:4});
	//var errors = req.validationErrors(); 
	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			console.log(data);
			res.render('landlord/landlordsignupview', data);
		}
		else
		{
			console.log();
			var user = {
				UserID: userId,
				FullName: req.body.FullName,
				NID: req.body.NID,
				Mobile: req.body.Mobile,
				Email: req.body.Email,
				Password: req.body.Password,
				DateOfSignup: today,
				LastSeen: new Date().toLocaleString(),
				Status:'1'
			};


		landlordModel.verifyEmail(user,function(valid){
			if (valid){
				console.log("Email Already Exists");
				res.redirect('/signup');
			}
			
			landlordModel.insert(user,function(result){
			//console.log(landlordId);
			res.redirect('/landlord/login');
		});
			
		});




		}
	});
	
});


module.exports = router;