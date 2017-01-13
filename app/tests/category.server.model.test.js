'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Category = mongoose.model('Category');

/**
 * Unit tests
 */
describe('Category Model', function() {

	describe('Saving', function() {
		it('saves new record', function(done) {
			var category = new Category({
				name: 'Jobs',
				description: 'Software engineer, Embedded systems engineer, product owner'
			});

			category.save(function(err, saved) {
				shoud.not.exist(err);
				done();
			});
		});

		it('throws validation error when name is empty', function(done) {
			var category = new Category({
				description: 'Software engineer, Embedded systems engineer, product owner'
			});

			category.save(function(err, saved) {
				should.exist(err);
				err.errors.name.message.should.equal('name cannot be blank');
				done();
			});
		});

		it('throws validation error when name longer than 15 chars', function(done) {
			var category = new Category({
				name:'Engineers/Software/QualityAssurance'
			});

			category.save(function(err, saved) {
				should.exist(err);
				err.errors.name.message.should.equal('name must be <= 15 chars');
				done();
			});
		});
		
		it('throws validation error for duplicate category name', function(done) {
			var category = new Category({
				name: 'Jobs'
			});

			category.save(function(err) {
				should.not.exist(err);
				
				var duplicate = new Category({
					name: 'Jobs'
				});

				duplicate.save(function(err) {
					err.err.indexOf('$name').should.not.equal(-1);
					err.err.indexOf('duplicate key error').should.not.equal(-1);
					should.exist(err);
					done();
				});
			});
		});
	});

	afterEach(function(done) {
		//deletes all categories
		Category.remove().exec();
		done();
	});

});


