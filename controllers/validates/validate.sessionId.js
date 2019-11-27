var shortid = require('shortid');
var db = require('../../lowdb')

module.exports = function(req,res, next) {

	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();

			//set signed cookie
		res.cookie('sessionId',sessionId,{
			signed: true
		})

		// ghi vao database thong tin session Id
		db.get('sessions').push({
			id : sessionId
		}).write();
	}
	next();
}