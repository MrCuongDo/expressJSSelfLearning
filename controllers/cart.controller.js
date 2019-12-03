var Session = require('../models/session.model.js');

module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products')
		return;
	}

	//check xem san pham nay co duoc chon chua
	// var count = Session
	//   .find({id : sessionId})
	//   .get('cart.'+productId , 0)
	//   .value();

	// db.get('sessions')
	//   .find({id : sessionId})
	//   .set('cart.'+productId , count + 1)
	//   .write();


	var cart = await Session.findOne({sessionId : sessionId , "cart.productId" : productId}, { _id : 0, cart : 1}, function(err, cart){
		if (err) return handleError(err);
		//return cart
	})

	console.log(typeof cart);
	console.log(cart.cart[0].quantity);

  	res.redirect('/products')
}