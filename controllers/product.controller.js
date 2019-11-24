var db = require('../lowdb')



module.exports.index = function(req, res) {
	var page = req.query.page || 1;  // cach viet ngan gon, neu khong co page thi mac dinh la 1
	var perPage = 8; // x

	var start = (page-1)*perPage;
	var end = page * perPage;

	var numberOfProducts = db.get('products').value().length;
	var totalNumberOfPage = Math.round(numberOfProducts / perPage);

	res.render('products/index', {
		products: db.get('products').value().slice(start,end),
		currentPage : page,
		totalNumberOfPage: totalNumberOfPage
	})
}
