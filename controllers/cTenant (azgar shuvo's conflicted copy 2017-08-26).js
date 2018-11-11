var express = require('express');
var router = express.Router();
var tenantModel = require.main.require('./models/mTenant');




router.get('/tenant/vSignUp', function(req, res){
	res.render('tenant/vSignUp', {errors: []});
});

//Tenant SignUp:
router.post('/tenant/vSignUp', function(req, res){

	req.checkBody('fullName', 'Full Name is required').notEmpty();
	req.checkBody('fullName', 'Full Name should be alphabets only').isAlpha();
	req.checkBody('nid', 'National Id is required').notEmpty();
	req.checkBody('nid', 'National Id should be numeric').notEmpty().isNumeric();
	req.checkBody('mobileNo', 'Mobile Number is required').notEmpty();
	req.checkBody('mobileNo', 'Length should be 11').notEmpty().isLength(11);
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password should be more than 8 character').isLength({min:8});
	req.checkBody('password', 'Password should have special character').has("@", "$", "%");





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
		res.redirect('/login');
	})

	}

	});
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
		res.redirect('/login');
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
		read: "read",
		unread:"unread"
	};

	tenantModel.tenantsent(tenantMessage, function(result){
		tenantModel.landlordinbox(tenantMessage, function(result){
		res.redirect('/cTenant');
	});
	});


	}

	else
	{
		res.redirect('/login');
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
		res.redirect('/cTenant');
	}
});



//create new

router.get('/tenant/creteNew', function(req, res){
	res.render('tenant/vSignUp');
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
		res.redirect('/login');
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
		res.redirect('/login');
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
			res.render('tenant/vAllTenant', {
				user: req.session.loggedUser,
				tenantList: result
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
		res.redirect('/login');
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
		res.redirect('/login');
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
		res.redirect('/login');
	}

});

router.post('/cTenant/delete/:userId', function(req, res){
	if(req.session.loggedUser)
	{
		var user_id = req.body.userId;

	tenantModel.remove(user_id, function(result){
		res.redirect('/login');
	});
	}
	else
	{
		res.redirect('/login');
	}

});

router.get('/cTenant/logOut', function(req, res){
	if(req.session.loggedUser)
	{
		req.session.destroy();	
		res.redirect('/login');
	}
	else
	{
		res.redirect('/login');
	}
});


module.exports = router;