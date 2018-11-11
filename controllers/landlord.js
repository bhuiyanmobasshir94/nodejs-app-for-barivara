var express = require('express');
var router = express.Router();

var landlordModel = require.main.require('./models/landlord-model');
var adModel = require.main.require('./models/ad-model');


router.get('/barivara.com',function(req,res){
    adModel.getAll(function(result){
        res.render('barivara',{ads: result});
    });
});




router.get('/landlord/tenantRequest', function(req, res){
	if(req.session.loggedUser)
	{
		landlordModel.tenantRequest(function(result){
			//console.log(result);
			res.render('landlord/tenantRequestView', {
				tenantRequestList: result,
				user:req.session.loggedUser
			});
		});
		
	}
	else
	{
		res.redirect('/login');
	}
});


router.post('/landlord/seen',function(req,res){
	if(req.session.loggedUser){
	var ID = {
			userId: req.body.mid
		};
		landlordModel.seen(ID,function(result){
			
		});
		res.redirect('/landlord/inbox');
	}

});

router.get('/landlord/inbox/reply/:messageFrom', function(req, res){
	console.log("From params: "+ req.params.messageFrom);
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlordMessageReply = {
		UserID: landlordId,
		messageTo: req.params.messageFrom,
		messageFrom: landlordId,
		
		unread:"0",
		read:"1"
	};

		
		res.render('landlord/landlordMessageReplyView', {messageReplyList: landlordMessageReply});

	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});


	router.post('/landlord/inbox/reply/:messageFrom', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlord = {
		UserID: landlordId,
		messageTo: req.body.messageTo,
		messageFrom: req.body.messageFrom,
		subject: req.body.subject,
		message: req.body.message,
		unread:"unread",
		read:"read"
	};

		landlordModel.sendMessageLandlord(landlord,function(result){
			//console.log(landlordId);
			landlordModel.sendMessageToLandlord(landlord,function(result){
			//console.log(landlordId);
			res.redirect('/landlord');
		});
			
		});
		
	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});



router.get('/landlord/inbox/view/:MID', function(req, res){
	if(req.session.loggedUser)
	{
	var MID = req.params.MID;
		var messageList = {
		MID: MID,
		unread: 'read'
		
		};
	landlordModel.updateViewMessageStatus(messageList, function(result){

		landlordModel.viewMessage(MID, function(result){
		res.render('landlord/landlordMessageReplyView', {messageList: result});

	});
	});
	
	}
	else
	{
		res.redirect('/landlord/login');
	}

});


router.get('/landlord/inbox', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		landlordModel.getLandlordMessage(landlordId,function(result){

			var shortMessage= result.message;
			//var testMessage= result.message;
			
			
				console.log(shortMessage);
				testMessage=shortMessage;
			
			res.render('landlord/landlordMessageInboxView', {
				user: req.session.loggedUser,
				messageList: result,
				short:shortMessage,
				testMessage:testMessage
			});
		});
		

	}
	else
	{
		res.redirect('/landlord');
	}
});





router.post('/landlord/inbox/show', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlord = {
		UserID: landlordId,
		FullName: req.body.FullName,
		Mobile: req.body.Mobile,
		Email: req.body.Email,
		Password: req.body.Password
		};

		landlordModel.editLandlordInfo(landlord,function(result){
			//console.log(landlordId);
			res.redirect('/landlord');
		});
		
	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});


router.get('/landlord/sentmessages', function(req, res){
	if(req.session.loggedUser)
	
	{
		
		var id = req.session.loggedUser;
		var landlordId=id.UserID;
		console.log("Testging new Update: "+ landlordId);

		landlordModel.getSentMessages(landlordId,function(result){

			var shortMessage= result.message;
			//var testMessage= result.message;
			
				//console.log("Testging value: "+ result.messageTo);
				//console.log(shortMessage);
				testMessage=shortMessage;
			
			res.render('landlord/landlordSentMessageView', {
				user: req.session.loggedUser,
				messageList: result,
				short:shortMessage,
				testMessage:testMessage
			});
		});
		

	}
	else
	{
		res.redirect('/landlord');
	}
});


router.get('/landlord/send', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		landlordModel.getLandlordInfo(landlordId,function(result){
			//console.log(landlordId);
			res.render('landlord/landlordMessageView', {
				user: req.session.loggedUser,
				userList: result
			});
		});
		

	}
	else
	{
		res.redirect('/landlord');
	}
});

router.post('/landlord/send', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlord = {
		UserID: landlordId,
		messageTo: req.body.messageTo,
		messageFrom: req.body.messageFrom,
		subject: req.body.subject,
		message: req.body.message,
		unread:"0",
		read:"1"
	};

		landlordModel.sendMessageLandlord(landlord,function(result){
			//console.log(landlordId);
			landlordModel.sendMessageToLandlord(landlord,function(result){
			//console.log(landlordId);
			res.redirect('/landlord');
		});
			
		});
		
	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});


router.get('/landlord', function(req, res){
	if(req.session.loggedUser)
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;
		//console.log(landlordId);
		landlordModel.getLandlordInfo(landlordId,function(result){
			//console.log(landlordId);
			landlordModel.getUnreadMessageNumber(landlordId,function(unreadresult){
				res.render('landlord/landlordInfoView', {
				user: req.session.loggedUser,
				userList: result,
				unreadList:unreadresult
			});		
		});
			
		});
		
	}
	else
	{
		res.redirect('/landlord/login');
	}
});

router.get('/landlord/edit', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		landlordModel.getLandlordInfo(landlordId,function(result){
			//console.log(landlordId);
			res.render('landlord/landlordInfoEditView', {
				user: req.session.loggedUser,
				userList: result
			});
		});
		

	}
	else
	{
		res.redirect('/landlord');
	}
});


router.post('/landlord/edit', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlord = {
		UserID: landlordId,
		FullName: req.body.FullName,
		Mobile: req.body.Mobile,
		Email: req.body.Email,
		Password: req.body.Password
	};

		landlordModel.editLandlordInfo(landlord,function(result){
			res.redirect('/landlord');
		});
		
	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});


router.get('/landlord/delete', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		landlordModel.getLandlordInfo(landlordId,function(result){
			//console.log(landlordId);
			res.render('landlord/landlordDeleteView', {
				user: req.session.loggedUser,
				userList: result,
				Password:"******"
			});
		});
		

	}
	else
	{
		res.redirect('/landlord');
	}
});

router.post('/landlord/delete', function(req, res){
	if(req.session.loggedUser)
	
	{
		var id = req.session.loggedUser;
		var landlordId=id.UserID;

		var landlord = {
		UserID: landlordId
	};

		landlordModel.deleteLandlord(landlord,function(result){
			//console.log(landlordId);
			res.redirect('/landlord/login');
		});
		
	
	}
	else
	{
		res.redirect('/landlord/login');
	}
});



router.get('/landlord/logOut/:id', function(req, res){
	if(req.session.loggedUser)
	{
		var data = {
		 LastSeen:new Date().toLocaleString(),
		 UserID:req.params.id
		}

		landlordModel.lastSeen(data, function(result){
		})
		req.session.destroy();	
		res.redirect('/barivara.com');
	}
	else
	{
		res.redirect('/landlord/login');
	}
});


module.exports = router;