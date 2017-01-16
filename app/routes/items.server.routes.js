'use strict';

module.exports = function(app) {
	var items = require('../../app/controllers/items.server.controller.js');

	app.route('/categories/:categoryId/items')
		.get(items.read)
		.post(items.create);

	app.route('/categories/:categoryId/items/:itemId')	
		.get(items.read)
		.put(items.update)
		.delete(items.delete);

	app.param('itemId', items.itemById);
};