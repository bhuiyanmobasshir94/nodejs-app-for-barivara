var db = require('./db');
module.exports = {
    getAll: function(callbackFromController){
        var sql = "SELECT * FROM postedad";
        db.execute(sql,null,function(result){
            callbackFromController(result);
        });
    },

    getById: function(id, callbackFromController){
        var sql = "SELECT * FROM postedad WHERE PostedBy=?";
        db.execute(sql,[id],function(result){
            callbackFromController(result);
        });
    },

    get: function(userID, callbackFromController){
        var sql = "SELECT * FROM landlord WHERE UserID=?";
        db.execute(sql,[userID],function(result){
            callbackFromController(result[0]);
        });
    },
    insert: function(adToPost, callbackFromController){
		var sql = "INSERT INTO postedad VALUES (?,?,?,?,?,?,?,?,?,0)";
		db.execute(sql,adToPost, function(result){
			callbackFromController(result);
		});
	},
	update: function(adToPost, callbackFromController) {
		var sql = "UPDATE postedad SET (?) WHERE PostedBy=?";
		db.execute(sql, [adToPost, adToPost.PostedBy], function(result){
			callbackFromController(result);
		});
    },

    delete: function(userID, callbackFromController) {
		var sql = "DELETE FROM postedad WHERE PostedBy=?";
		db.execute(sql,userID, function(result){
			callbackFromController(result);
		});
	},

	updateTimesOfVisited: function(adToPost, callbackFromController) {
		//var counter= adToPost.TimesOfVisit+1;

		var sql = "UPDATE postedad SET TimesOfVisit=? WHERE PostedBy=?";
		db.execute(sql, [adToPost.TimesOfVisit+1, adToPost.PostedId], function(result){
			callbackFromController(result);
		});
    }
};