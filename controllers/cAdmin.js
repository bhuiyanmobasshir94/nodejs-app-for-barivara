var express = require('express');
var router = express.Router();
var mAdmin = require.main.require('./models/mAdmin');

/*router.use('*', function(req, res, next){
	if(! req.session.loggedUser)
	{
		res.redirect('/admin/login');
		return;
	}
	next();
});
*/
//	LOG IN
router.get('/admin/login', function (req, res){
	res.render('adminLogin', {errors: []});
});


router.post('/admin/login', function (req, res){
	req.checkBody('userID', 'User Id is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			res.render('adminLogin', data);
		}

		else
		{
	    var user = {
			userId: req.body.userID,
			password: req.body.password
		};

		mAdmin.verifyUser(user, function(valid){
		if(valid != null)
		{
			req.session.email=req.body.userID; //email
			req.session.loggedUser = user;
			
			req.session.UserId=valid[0].UserId;
			//console.log(req.session.userid);
		
			res.redirect('/viewAdmin');
		}
		else
		{
			res.render('adminLogin', {errors: []});
		}
	});

    }

	});

});


// ADD ADMIN
router.get('/addAdmin', function(req, res){
	if(req.session.loggedUser){

	res.render('home/addAdmin', {errors: []});
	}
	else{
		res.redirect('/admin/login');	
	}
	
});

router.post('/addAdmin', function(req, res){
	req.checkBody('name', 'Full Name is required').notEmpty();
	
	
	req.checkBody('mobile', 'Mobile Number is required').notEmpty();
	req.checkBody('mobile', 'Mobile Number should be 11 characters').notEmpty().isLength({min:11, max:11});
	req.checkBody('email', 'Email is Required').notEmpty();
	req.checkBody('email', 'Email is should be acctual format').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password should be more than 4 character').isLength({min:4});
	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			res.render('home/addAdmin', data);
		}
		else
		{
			var temp= req.body.email;
			var userid = temp.split("@")[0];
			
			
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

			var admin = {
				FullName: req.body.name,
				Email:req.body.email,
				Mobile:req.body.mobile,
				Password: req.body.password,
				DateOfSignup:today,
				UserId:userid
			};

			mAdmin.insert(admin, function(result){
				res.redirect('/viewAdmin');
			});
		}
	});
	
});




//EDIT ADMIN
router.get('/editAdmin', function(req, res){
	if(req.session.loggedUser){
	var email = req.session.email;
	mAdmin.get(email, function(result){
		res.render('home/editAdmin', {admin:result});
	});
	}
	else{
		res.redirect('/admin/login');	
	}

});


router.post('/editAdmin', function(req, res){
		
	var admin = {
		FullName: req.body.name,
		Mobile: req.body.mobile,
		Password: req.body.password,
		Email:req.session.email
	};
	mAdmin.update(admin, function(result){
		res.redirect('/viewAdmin');
	});
	
		


});

//DELETE  ADMIN
router.get('/deleteAdmin', function(req, res){
	if(req.session.loggedUser){
	var email = req.session.email;
	mAdmin.get(email, function(result){
		res.render('home/deleteAdmin', {admin:result});
	});
	}
	else{
		res.redirect('/admin/login');	
	}

});



router.post('/deleteAdmin', function(req, res){
	var admin = {
		
		Email:req.session.email
	};
	mAdmin.remove(admin,function(result){
		res.redirect('/admin/login');	
	});

});


// VIEW ALL //BACK
router.get('/viewAdmin', function(req, res){
	if(req.session.loggedUser){
	mAdmin.getAll(function(result){
		//console.log(result);
		res.render('home/viewAdmin', {
			user: req.session.loggedUser,
			adminList: result
		});
	});
	}
	else
	{
		res.redirect('/admin/login');	
	}
});

//LOG OUT
router.get('/logOut', function(req, res){
	req.session.loggedUser=false;
	res.redirect('/admin/login');	
});


//show tenants
router.get('/showtenant', function (req, res){
	if(req.session.loggedUser){
	mAdmin.getAllTenant(function(result){
		//console.log(result);
		res.render('home/showTenant', {
			//user: req.session.loggedUser,
			tenantList: result
		});
	});
	}
else
{
	res.redirect('/admin/login');	
}
});


//delete tenants
router.get('/deletetenant/:val', function (req, res){
	if(req.session.loggedUser){
		var uid = req.params.val;
	
	mAdmin.getTenantById(uid, function(result){
		res.render('home/deleteTenant', {tenant:result});
	});
	}
	else{
		res.redirect('/admin/login');	
	}

});

router.post('/deletetenant/:val', function (req, res){
	
	var tenant = {
		UserID: req.body.userId,
		};
	
	mAdmin.removetenant(tenant,function(result){
		res.redirect('/showtenant');	
	});

});

//show landlord
router.get('/showlandlord', function (req, res){
	if(req.session.loggedUser){
	mAdmin.getAllLandlord(function(result){
		//console.log(result);
		res.render('home/showLandlord', {
			//user: req.session.loggedUser,
			landlordList: result
		});
	});
	}
else
{
	res.redirect('/admin/login');	
}
});


//delete tenants
router.get('/deletelandlord/:val', function (req, res){
	if(req.session.loggedUser){
		var uid = req.params.val;
	
	mAdmin.getLandlordById(uid, function(result){
		res.render('home/deleteLandlord', {landlord:result});
	});
	}
	else{
		res.redirect('/admin/login');	
	}

});

router.post('/deletelandlord/:val', function (req, res){
	
	var landlord = {
		UserID: req.body.userId,
		};
	
	mAdmin.removelandlord(landlord,function(result){
		res.redirect('/showlandlord');	
	});

});
//search tenant
router.post('/searchtenantname', function (req, res){
	if(req.session.loggedUser){
		var tenant = {
	   FullName: req.body.name.trim(),
		};
		mAdmin.searchTenantByName(tenant,function(result){
		//console.log(result);
		res.render('home/showTenant', {
			//user: req.session.loggedUser,
			tenantList: result
		});
	});
	}
else
{
	res.redirect('/admin/login');	
}
});


//message to tenant
 router.get('/sendtenantmessage/:val', function (req, res){
	if(req.session.loggedUser){
		var uid = req.params.val;
		res.render('home/messageToTenant', {
			//user: req.session.loggedUser,
			//tenantList: result
			messageTo:uid,
			messageFrom:req.session.UserId
		});
	
	
	}
	else{
		res.redirect('/admin/login');	
	}

});



router.post('/sendtenantmessage/:val', function(req, res){
	if(req.session.loggedUser)
	
	{
		
		var adminid = req.session.UserId;
		//console.log(req.session.UserId);
		var tenantid = req.params.val;

		var tenantmessage = {
		
		messageTo: tenantid,
		messageFrom: adminid,
		subject: req.body.subject,
		message: req.body.message,
		read:'0'
	};

		mAdmin.sendMessageToTenant(tenantmessage,function(result){
			//console.log(landlordId);
			mAdmin.sendMessageByAdminToTenant(tenantmessage,function(result){
			//console.log(landlordId);
			res.redirect('/showtenant');
		});
			
		});
		
	
	}
	else
	{
		res.redirect('/admin/login');
	}
});

router.post('/adminsenttotenant', function (req, res){
	if(req.session.loggedUser){
		var adminid = req.session.UserId;
		var admin = {
		
		
		messageFrom: adminid,
		
	};
		
		
		mAdmin.sentMessageFromAdminTotenant(admin,function(result){
		//console.log(result);
		res.render('home/adminSentMessageToTenant', {
			
			messageList: result
		});
	});
	}
else
{
	res.redirect('/admin/login');	
}
});

//search home location


router.get('/homesearchlocation', function (req, res){
	res.redirect('/barivara.com');	
});


router.post('/homesearchlocation', function (req, res){
	var renttype= req.body.renttype;
	//console.log(renttype);

if(renttype =="type")

	{	
	//console.log("Testing search: ");
		var anon = {
	   location: req.body.location.trim(),
	   //renttype= req.body.renttype;
		};

		mAdmin.searchHomeByLocation(anon,function(result){
		//console.log(result);
		res.render('barivara', {
			//user: req.session.loggedUser,
			ads: result
		});
	});
	}

	else {
		var anon = {
	   location: req.body.location.trim(),
	   renttype: renttype
		};

		mAdmin.searchHomeByLocationWithType(anon,function(result){
		//console.log(result);
		res.render('barivara', {
			//user: req.session.loggedUser,
			ads: result
		});
	});
	}

});






module.exports = router;