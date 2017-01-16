'use strict';

/**
 * Model dependencies
 */
 var mongoose = require('mongoose'),
 	Schema = mongoose.Schema;

 /**
  * Validation
  */
 function validateLength(v) {
 	// limit string length for item
 	return v.length <= 50;
 }

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: 'invalid category'
	},
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'name cannot be blank',
		validate: [validateLength, 'name must be <= 50 chars']
	},
	content: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Item', ItemSchema);
