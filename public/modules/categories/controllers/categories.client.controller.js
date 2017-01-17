'use strict';

angular.module('categories').controller('CategoriesController', ['$scope', '$location', 'Categories'
	function($scope, $location, Categories) {
		// Controller Logic
		// Create neww category
		$scope.create = function() {
			// Create new category object
			var category = new Categories({
				name: this.name,
				description: this.description
			});

			// redirect after save
			category.$save(function(response) {
				$location.path('categories/' + response._id);

				// clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list in categories
		$scope.find = function() {
			$scope.categories = Categories.query();
		};
	}
]);