var db = require('./db');

module.exports = {

	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM tenant";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},

	get: function(id, callbackFromController){
		var sql = "SELECT * FROM tenant WHERE UserID=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},


	insert: function(tenant, callbackFromController){
		var sql = "INSERT INTO tenant VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [tenant.user_id, tenant.full_name, tenant.national_id, tenant.mobile_no, tenant.email, tenant.password, tenant.signup_date, tenant.LastSeen, tenant.Status], function(result){
			callbackFromController(result);
		});
	},

	update: function(user, callbackFromController) {
		var sql = "UPDATE tenant SET FullName=?, Mobile=?, Email=?, Password=? WHERE UserID=?";
		db.execute(sql, [user.full_name, user.mobile_no, user.email, user.password,  user.user_id], function(result){
			callbackFromController(result);
		});
	},

	remove: function(user_id, callbackFromController) {
		//var sql = "DELETE FROM tenant WHERE UserID=?";
		var sql = "UPDATE tenant SET Status='0' WHERE UserID=?";
		db.execute(sql, [user_id], function(result){
			callbackFromController(result);
		});
	},
	seen: function(ID, callbackFromController) {
		var sql = "update tenantinboxmessage set unread='1' where MID=?";
		db.execute(sql, [ID.userId], function(result){
			callbackFromController(result);
		});
	},

	tenantsent: function(tenantmessage, callbackFromController){
		var sql1 = "INSERT INTO tenantsentmessage VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql1, [null, tenantmessage.messageTo, tenantmessage.subject, tenantmessage.messageFrom, tenantmessage.message, tenantmessage.read], function(result){
			callbackFromController(result);
		});
	},	

	landlordinbox: function(tenantmessage, callbackFromController){
		var sql2 = "INSERT INTO landlordinboxmessage VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql2, [null, tenantmessage.messageTo, tenantmessage.subject, tenantmessage.messageFrom, tenantmessage.message, tenantmessage.unread], function(result){
			callbackFromController(result);
		});
	},

	showMessage: function(tenantId, callbackFromController) {
		var sql = "SELECT * FROM tenantinboxmessage WHERE messageTo=? order by unread";
		db.execute(sql, [tenantId] ,function(result){
			callbackFromController(result);
		});
	},

	sentMessage: function(tenantId, callbackFromController) {
		var sql = "SELECT * FROM tenantsentmessage WHERE messageFrom=? order by unread";
		db.execute(sql, [tenantId] ,function(result){
			callbackFromController(result);
		});
	},

	flatWanted: function(flatInfo, callbackFromController){
		var sql = "INSERT INTO flatwanted VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql, [flatInfo.id, "'"+flatInfo.categories+"'", flatInfo.bedroom, flatInfo.toilet, flatInfo.location, flatInfo.sublocation], function(result){
			callbackFromController(result);
		});
	},
	getUnreadMessageNumber: function(tenantId, callbackFromController){
		//console.log(landlordId);
		//var sql = "SELECT * FROM landlordinboxmessage WHERE messageTo=?";
		var sql = "SELECT COUNT(*) as unreadcount FROM tenantinboxmessage WHERE unread='unread' AND messageTo=?";

        db.execute(sql, [tenantId], function(result){
			
			callbackFromController(result[0].unreadcount);

		});
	},

	verifyEmail: function(user, callbackFromController){
		var sql = "SELECT * FROM tenant WHERE Email=?";
		//console.log(sql);	 
		db.execute(sql, [user.email], function (result){
			//console.log(result.length);	
			if(result.length >= 1)
			{
				console.log('test');
				callbackFromController(true);
			}
			else
			{
				console.log('failed');
				callbackFromController(false);
			}
		});
		 
		//connection.end();
	},

	lastSeen: function(ls, callbackFromController){
		var sql = "update tenant set LastSeen= ? where UserID=?";
		db.execute(sql, [ls.LastSeen, ls.UserID], function(result){
			callbackFromController(result);
		});
	}

}

