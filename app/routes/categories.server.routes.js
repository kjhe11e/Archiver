'use strict';

module.exports = function(app) {
	// Routing logic   
	var categories = require('../../app/controllers/categories.server.controller');

	app.route('/categories')
		.get(categories.list)
		.post(categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read)
		.put(categories.update);

	app.param('categoryId', categories.categoryById);
};