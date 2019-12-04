var Session = require('../models/session.model.js');

module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products')
		return;
	}

	//check xem san pham nay co duoc chon chua4
	// var count = Session
	//   .find({id : sessionId})
	//   .get('cart.'+productId , 0)
	//   .value();

	// db.get('sessions')
	//   .find({id : sessionId})
	//   .set('cart.'+productId , count + 1)
	//   .write();


	var query = await Session.findOne({sessionId : sessionId , "cart.productId" : productId}, { _id : 0}, async function(err, query){
		if (err) return handleError(err);

		if(query){ 
			//update so luong sp moi bang cach increment len 1
			var rs = await Session.findOneAndUpdate({sessionId : sessionId, "cart.productId" : productId}, { $inc: {"cart.$.quantity": 1}})
		}else{
			// neu khong co query thi them san pham nay vao cart 
			var flag = await Session.findOne({sessionId : sessionId}, function(err, query){})
			flag.cart.push({productId : productId , quantity: 1})
			flag.save();
		}
	})

  	res.redirect('/products')
}