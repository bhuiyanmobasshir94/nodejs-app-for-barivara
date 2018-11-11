var db = require('./db');
module.exports = {
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM landlord WHERE UserID=? AND Password=? AND Status='1' ";
		//console.log(sql);	 
		db.execute(sql, [user.UserID, user.Password], function (result){
			console.log(result.length);	
			if(result.length == 1)
			{
				callbackFromController(true);
			}
			else
			{
				callbackFromController(false);
			}
		});
		 
		//connection.end();
	}
	

};