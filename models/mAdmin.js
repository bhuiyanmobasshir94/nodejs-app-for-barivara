var express = require('express');
var router = express.Router();
var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM admin";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM admin WHERE email=? AND password=?";
		console.log(sql);	 
		db.execute(sql, [user.userId, user.password], function (result){
			
			if(result.length == 1)
			{
				
				callbackFromController(result);
			}
			else
			{
				callbackFromController(null);
			}
		});
		 
		//connection.end();
	},
	
	
	
	get: function(email, callbackFromController){
		var sql = "SELECT * FROM admin WHERE email=?";
		db.execute(sql, [email], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(admin, callbackFromController){
		var sql = "INSERT INTO admin VALUES (?,?,?,?, ?, ?)";
		db.execute(sql, [admin.UserId, admin.FullName,admin.Mobile,admin.Email,admin.Password,admin.DateOfSignup], function(result){
			callbackFromController(result);
		});
	},
	update: function(admin, callbackFromController) {
		var sql = "UPDATE admin SET FullName=?,Mobile=?,Password=? WHERE email=?";
		db.execute(sql, [admin.FullName, admin.Mobile, admin.Password,admin.Email], function(result){
			callbackFromController(result);
		});
	},
	
	
	remove: function(admin, callbackFromController) {
		var sql = "DELETE from admin  WHERE email=?";
		db.execute(sql, [admin.Email], function(result){
			callbackFromController(result);
		});
	},
	
	//tenant
	
	getAllTenant: function(callbackFromController) {
		var sql = "SELECT * FROM tenant";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	getTenantById: function(id, callbackFromController){
		var sql = "SELECT * FROM tenant WHERE UserID=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	removetenant: function(tenant, callbackFromController) {
		var sql = "DELETE from tenant  WHERE UserID=?";
	
		db.execute(sql, [tenant.UserID], function(result){
			callbackFromController(result);
		});
	},
	//landlord
	getAllLandlord: function(callbackFromController) {
		var sql = "SELECT * FROM landlord";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	getLandlordById: function(id, callbackFromController){
		var sql = "SELECT * FROM landlord WHERE UserID=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	removelandlord: function(landlord, callbackFromController) {
		var sql = "DELETE from landlord  WHERE UserID=?";
	
		db.execute(sql, [landlord.UserID], function(result){
			callbackFromController(result);
		});
	},
	//search
	searchTenantByName:function(tenant,callbackFromController) {
		var sql = "SELECT * FROM tenant where FullName like '%"+tenant.FullName+"%'";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},

	searchHomeByLocation:function(anon,callbackFromController) {
		var sql = "SELECT * FROM postedad where Address like '%"+anon.location+"%'";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	
	searchHomeByLocationWithType:function(anon,callbackFromController) {
		var sql = "SELECT * FROM postedad where Address like '%"+anon.location+"%' AND RentType=?";
		db.execute(sql, [anon.renttype] ,function(result){
			callbackFromController(result);
		});
	},

	sendMessageToTenant: function(tenantmessage, callbackFromController){
		var sql = "INSERT INTO tenantinboxmessage VALUES (?, ?, ?, ?, ?, ?)";
		db.execute(sql, [null, tenantmessage.messageTo, tenantmessage.subject, tenantmessage.messageFrom, tenantmessage.message, tenantmessage.read], function(result){
			callbackFromController(result);
		});
	},
	sendMessageByAdminToTenant:function(tenantmessage, callbackFromController){
		var sql = "INSERT INTO adminsenttenant VALUES (?, ?, ?, ?, ?)";
		db.execute(sql, [null, tenantmessage.messageTo, tenantmessage.subject, tenantmessage.messageFrom, tenantmessage.message], function(result){
			callbackFromController(result);
		});
	},
	sentMessageFromAdminTotenant:function(admin,callbackFromController) {
		var sql = "SELECT * FROM adminsenttenant where messageFrom =?";
		db.execute(sql, [admin.messageFrom] ,function(result){
			console.log(result[0].messageFrom);
			callbackFromController(result);
		});
	}
	
	
	
};

	
	