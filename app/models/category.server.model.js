'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Validation
 */
 function validateLength(v) {
 	//custom validation function for checking string length to be used by model
 	return v.length <= 15;
 }

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	// Category model fields   
	
	// property name
	created: {
		type: Date,	//types are defined
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		trim: true	//specific to String type
	},
	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'name cannot be blank',
		validate: [validateLength, 'name must be <= 15 chars']
	}
});

mongoose.model('Category', CategorySchema);
