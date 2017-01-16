'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Item = mongoose.model('Item'),
	_ = require('lodash');

/**
 * Create an item
 */
exports.create = function(req, res) {
	var item = new Item(req.body);

	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorHandler(err)
			});
		} else {
			return res.status(201).json(item);
		}
	});
};

/**
 * Show current item
 */
exports.read = function(req, res) {
	return res.json(req.item);
};

/**
 * Update an item
 */
exports.update = function(req, res) {
	var item = req.item;

	item = _.extend(item, req.body);

	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorHandler(err)
			});
		} else {
			return res.json(item);
		}
	});
};

/**
 * Delete an item
 */
exports.delete = function(req, res) {
	var item = req.item;

	item.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorHandler(err)
			});
		} else {
			return res.json(item);
		}
	});
};

/**
 * List items
 */
exports.list = function(req, res) {
	Item.find().sort('name').exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorHandler(err)
			});
		} else {
			return res.json(items);
		}
	});
};

exports.itemById = function(req, res, next, id) {
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Item is invalid'
		});
	}

	Item.findById(id).exec(function(err, item) {
		if (err) {
			return next(err);
		}
		if (!item) {
			return res.status(404).send({
				message: 'Item does not exist'
			});
		}
		req.item = item;
		next();
	});
};
