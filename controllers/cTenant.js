var express = require('express');
var router = express.Router();
var tenantModel = require.main.require('./models/mTenant');




router.get('/tenant/vSignUp', function(req, res){
	res.render('tenant/vSignUp', {errors: []});
});

//Tenant SignUp:
router.post('/tenant/vSignUp', function(req, res){

	req.checkBody('fullName', 'Full Name is required').notEmpty();
	//req.checkBody('fullName', 'Full Name should be alphabets only').isAlpha();
	req.checkBody('nid', 'National Id is required').notEmpty();
	req.checkBody('nid', 'National Id should be numeric').isNumeric();
	req.checkBody('mobileNo', 'Mobile Number is required').notEmpty();
	req.checkBody('mobileNo', 'Length should be 11').isLength(11);
	req.checkBody('email', 'Email is Required').notEmpty();
	req.checkBody('email', 'Email is should be acctual format').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password should be more than 4 character').isLength({min:4});
	//req.checkBody('password', 'Password should have special character').;





	req.getValidationResult().then(function(result){
		if(!result.isEmpty())
		{
			var data = {errors: result.array()};
			res.render('tenant/vSignUp', data);
		}

		else
		{
		var a = req.body.email;
		var arr = a.split("@");
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

		var tenant = {
			user_id: arr[0],
			full_name: req.body.fullName,
			national_id: req.body.nid,
			mobile_no: req.body.mobileNo,
			email: req.body.email,
			password: req.body.password,
			signup_date: today,
			LastSeen: new Date().toLocaleString(),
			Status:'1'
	};

	tenantModel.verifyEmail(tenant,function(valid){
		if (valid){
				console.log("Email Already Exists");
				res.redirect('/tenant/vSignUp');
			}

			tenantModel.insert(tenant, function(result){
		res.redirect('/login');
	})


	})


	}

	});
});


//Message seen
router.post('/cTenant/seen',function(req,res){
	if(req.session.loggedUser){
	var ID = {
			userId: req.body.mid
		};
		tenantModel.seen(ID,function(result){
			
		});
		res.redirect('/cTenant/show');
	}

});


//flat Wnated
router.get('/cTenant/flatWanted', function(req, res){
	if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;
		tenantModel.get(userId, function(result){
			//console.log(result);k8
			res.render('tenant/vFlatWanted', {
				user: req.session.loggedUser,
				tenantList: result
			});
		});
		
	}
	else
	{
		res.redirect('/barivara.com');
	}
});


router.post('/cTenant/flatWanted', function(req, res){
	if(req.session.loggedUser)
	{
	var flat = {
		id: req.body.id,
		categories: req.body.category,
		bedroom: req.body.bedroom,
		toilet: req.body.toilet,
		location: req.body.location,
		sublocation:req.body.sublocation
	};
	tenantModel.flatWanted(flat, function(result){
		res.redirect('/cTenant');
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}

});


/*
router.use('*', function(req, res, next){
	if(! req.session.loggedUser)
	{
		res.redirect('/login');
		return;
	}
	next();
});

*/

//sent message
router.get('/cTenant/send', function(req, res){
	if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;
		tenantModel.get(userId, function(result){
			//console.log(result);
			res.render('tenant/vTenantMessage', {
				user: req.session.loggedUser,
				tenantList: result
			});
		});

	}
	else
	{
		res.redirect('/barivara.com');
	}
});

router.post('/cTenant/send', function(req, res){
	if(req.session.loggedUser)
	{
	var tenantMessage = {
		messageTo: req.body.messageTo,
		subject: req.body.subject,
		messageFrom: req.body.messageFrom,
		message: req.body.message,
		read: "1",
		unread:"0"
	};

	tenantModel.tenantsent(tenantMessage, function(result){
		tenantModel.landlordinbox(tenantMessage, function(result){
		res.redirect('/cTenant');
	});
	});


	}

	else
	{
		res.redirect('/barivara.com');
	}

});



//reply message

router.get('/cTenant/reply/:id', function(req, res){if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;

		res.render('tenant/vTenantReply', {
			user:req.session.loggedUser,
			messageTo: req.params.id,
			messageFrom: userId
			});
		
	}	
	else
	{
		res.redirect('/barivara.com');
	}
});

router.post('/cTenant/reply/:id', function(req, res){
	if(req.session.loggedUser)
	{
	var tenantreplyMessage = {
		messageTo: req.body.messageTo,
		subject: req.body.subject,
		messageFrom: req.body.messageFrom,
		message: req.body.message,
		read: "1",
		unread:"0"
	};

	tenantModel.tenantsent(tenantreplyMessage, function(result){
		tenantModel.landlordinbox(tenantreplyMessage, function(result){
		res.redirect('/cTenant');
	});
	});


	}

	else
	{
		res.redirect('/barivara.com');
	}

});

//sent Message

router.get('/cTenant/sent', function(req, res){
	if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;
		tenantModel.sentMessage(userId, function(result){
			//console.log(result);
			res.render('tenant/vTenantSentMessage', {
				user: req.session.loggedUser,
				messageList: result
			});
		});
		
	}
	else
	{
		res.redirect('/barivara.com');
	}
});



//show mwssage

router.get('/cTenant/show', function(req, res){
	if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;
		tenantModel.showMessage(userId, function(result){
			//console.log(result);
			res.render('tenant/vShowMessage', {
				user: req.session.loggedUser,
				messageList: result
			});
		});
		
	}
	else
	{
		res.redirect('/barivara.com');
	}
});



//create new

router.get('/tenant/creteNew', function(req, res){
	res.render('tenant/vSignUp', {errors: []});
});

router.post('/tenant/creteNew', function(req, res){
	if(req.session.loggedUser)
	{
	var a = req.body.email;
	var arr = a.split("@");

	var tenant = {
		user_id: arr[0],
		full_name: req.body.fullName,
		national_id: req.body.nid,
		mobile_no: req.body.mobileNo,
		email: req.body.email,
		password: req.body.password,
		signup_date: req.body.date
	};

	tenantModel.insert(tenant, function(result){
		res.redirect('/cTenant/allTenant');
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}
});

//get all tenant
router.get('/cTenant/allTenant', function(req, res){
	if(req.session.loggedUser)
	{
		tenantModel.getAll(function(result){
			//console.log(result);
			res.render('tenant/vTenantList', {
				user: req.session.loggedUser,
				tenantList: result
			});
		});
		
	}
	else
	{
		res.redirect('/barivara.com');
	}
});


//get tenant details:

router.get('/cTenant', function(req, res){
	if(req.session.loggedUser)
	{
		var info = req.session.loggedUser;
		var userId  = info.userId;
		tenantModel.get(userId, function(result){
			//console.log(result);
				tenantModel.getUnreadMessageNumber(userId,function(unreadresult){
	
				
				//console.log("con"+unreadresult);

			res.render('tenant/vAllTenant', {
				user: req.session.loggedUser,
				unreadList:unreadresult,
				tenantList: result
			});
		});
		});

	}
	else
	{
		res.redirect('/login');
	}
});


//tenant Edit

router.get('/cTenant/edit/:userId', function(req, res){
	if(req.session.loggedUser)
	{
	var userId = req.params.userId;
	tenantModel.get(userId, function(result){
		res.render('tenant/vTenantEdit', {user: result});
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}

});

router.post('/cTenant/edit/:userId', function(req, res){
	if(req.session.loggedUser)
	{
	var user = {
		user_id: req.body.userId,
		full_name: req.body.fullName,
		mobile_no: req.body.mobileNo,
		email: req.body.email,
		password: req.body.password,
	};
	tenantModel.update(user, function(result){
		res.redirect('/cTenant');
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}

});

//tenant Delete

router.get('/cTenant/delete/:userId', function(req, res){
	if(req.session.loggedUser)
	{
	var userId = req.params.userId;
	tenantModel.get(userId, function(result){
		res.render('tenant/vTenantDelete', {user: result});
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}

});

router.post('/cTenant/delete/:userId', function(req, res){
	if(req.session.loggedUser)
	{
		var user_id = req.body.userId;

	tenantModel.remove(user_id, function(result){
		res.redirect('/barivara.com');
	});
	}
	else
	{
		res.redirect('/barivara.com');
	}

});

router.get('/cTenant/logOut/:id', function(req, res){
	if(req.session.loggedUser)
	{
		var data = {
		 LastSeen:new Date().toLocaleString(),
		 UserID:req.params.id
		}

		tenantModel.lastSeen(data, function(result){
		})
		req.session.destroy();	
		res.redirect('/barivara.com');
	}
	else
	{
		res.redirect('/barivara.com');
	}
});


module.exports = router;
