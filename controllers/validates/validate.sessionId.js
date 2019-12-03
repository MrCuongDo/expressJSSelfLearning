var shortid = require('shortid');
var Session = require('../../models/session.model.js');

module.exports = async function(req,res, next) {

	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();

			//set signed cookie
		res.cookie('sessionId',sessionId,{
			signed: true
		})

		await Session.create({sessionId: sessionId});
	}
	next();
}