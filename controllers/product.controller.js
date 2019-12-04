var Product = require('../models/product.model.js');

module.exports.index = async function(req, res) {
	var products = await Product.find();
	var page = req.query.page || 1;  // cach viet ngan gon, neu khong co page thi mac dinh la 1
	var perPage = 8; // x

	var start = (page-1)*perPage;
	var end = page * perPage;

	var numberOfProducts = products.length;
	var totalNumberOfPage = Math.round(numberOfProducts / perPage);

	res.render('products/index', {
		products : products.slice(start,end),
		currentPage : page,
		totalNumberOfPage: totalNumberOfPage
	})
}