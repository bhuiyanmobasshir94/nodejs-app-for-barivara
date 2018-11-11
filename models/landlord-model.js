var db = require('./db');
module.exports = {
	

	updateViewMessageStatus: function(messageList, callbackFromController) {
		var sql = "UPDATE landlordinboxmessage SET unread=? WHERE MID=?";
		db.execute(sql, [messageList.unread, messageList.MID], function(result){
			callbackFromController(result);
		});

	},

	
	seen: function(ID, callbackFromController) {
		var sql = "update landlordinboxmessage set unread='1' where MID=?";
		db.execute(sql, [ID.userId], function(result){
			callbackFromController(result);
		});
	},

	viewMessage: function(MID, callbackFromController){
		//console.log(landlordId);
		var sql = "SELECT * FROM landlordinboxmessage WHERE MID=? order by unread";
		console.log(sql);
		db.execute(sql, [MID], function(result){
			callbackFromController(result[0]);
		});
	},

	getLandlordMessage: function(landlordId, callbackFromController){
		//console.log(landlordId);
		var sql = "SELECT * FROM landlordinboxmessage WHERE messageTo=? order by unread";
		console.log(sql);
		db.execute(sql, [landlordId], function(result){
			callbackFromController(result);
		});
	},

	tenantRequest: function(callbackFromController) {
		var sql = "SELECT * FROM flatwanted";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},

	getSentMessages: function(landlordId, callbackFromController){
		//console.log(landlordId);
		var sql = "SELECT * FROM landlordsentmessage WHERE messageFrom=? order by unread";
		console.log(sql);
		db.execute(sql, [landlordId], function(result){
			callbackFromController(result);
		});
	},

	getUnreadMessageNumber: function(landlordId, callbackFromController){
		//console.log(landlordId);
		//var sql = "SELECT * FROM landlordinboxmessage WHERE messageTo=?";
		var sql = "SELECT COUNT(*) as unreadcount FROM landlordinboxmessage WHERE unread='0' AND messageTo=?";
		console.log(sql);
		db.execute(sql, [landlordId], function(result){
		
			
			callbackFromController(result[0].unreadcount);

		});
	},

	getLandlordInfo: function(landlordId, callbackFromController){
		//console.log(landlordId);
		var sql = "SELECT * FROM landlord WHERE userId=?";
		console.log(sql);
		db.execute(sql, [landlordId], function(result){
			callbackFromController(result[0]);
		});
	},
	
	insert: function(landlord, callbackFromController){
		
		var sql = "INSERT INTO landlord VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [landlord.UserID, landlord.FullName, landlord.NID, landlord.Mobile, landlord.Email, landlord.Password, landlord.DateOfSignup, landlord.LastSeen, landlord.Status], function(result){
			callbackFromController(result);
		});
	},
	verifyEmail: function(user, callbackFromController){
		var sql = "SELECT * FROM landlord WHERE Email=?";
		//console.log(sql);	 
		db.execute(sql, [user.Email], function (result){
			console.log(result.length);	
			if(result.length >= 1)
			{
				callbackFromController(true);
			}
			else
			{
				callbackFromController(false);
			}
		});
		 
		//connection.end();
	},

	editLandlordInfo: function(landlord, callbackFromController) {
		var sql = "UPDATE landlord SET FullName=?, Mobile=?, Email=?, Password=? WHERE UserID=?";
		db.execute(sql, [landlord.FullName, landlord.Mobile, landlord.Email, landlord.Password, landlord.UserID], function(result){
			callbackFromController(result);
		});

	},


	deleteLandlord: function(landlord, callbackFromController) {
		//var sql = "DELETE FROM landlord WHERE UserID=?";
		var sql = "UPDATE landlord SET Status='0' WHERE UserID=?";
		db.execute(sql, [landlord.UserID], function(result){
			callbackFromController(result);
		});

	},
	sendMessageLandlord: function(landlord, callbackFromController){
		var sql = "INSERT INTO landlordsentmessage VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql, [null, landlord.messageTo, landlord.subject, landlord.messageFrom, landlord.message, landlord.read], function(result){
			callbackFromController(result);
		});
	},
	sendMessageToLandlord: function(landlord, callbackFromController){
		var sql = "INSERT INTO tenantinboxmessage VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql, [null, landlord.messageTo, landlord.subject, landlord.messageFrom, landlord.message, landlord.unread], function(result){
			callbackFromController(result);
		});
	},
	lastSeen: function(ls, callbackFromController){
		var sql = "update landlord set LastSeen= ? where UserID=?";
		db.execute(sql, [ls.LastSeen, ls.UserID], function(result){
			callbackFromController(result);
		});
	}

};