var db = require('./db');
module.exports = {
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM tenant WHERE UserID=? AND Password=? AND Status='1' ";
		//console.log(sql);	 
		db.execute(sql, [user.userId, user.password], function (result){
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