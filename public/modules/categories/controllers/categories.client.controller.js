'use strict';

// Categories controller
angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories',
	function($scope, $stateParams, $location, Authentication, Categories) {
		// Controller Logic

		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new category
		$scope.create = function() {
			// Create new category object
			var category = new Categories ({
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

		$scope.update = function() {
			var category = $scope.category;

			category.$update(function(response) {
				$location.path('categories/' + category._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list in categories
		$scope.find = function() {
			$scope.categories = Categories.query();
		};

		// Find existing category
		$scope.findOne = function() {
			$scope.category = Categories.get({
				categoryId: $stateParams.categoryId
			});
		};

		$scope.remove = function(category) {
			if (category) {
				category.$remove();

				for(var i in $scope.categories) {
					if($scope.categories[i] === category) {
						$scope.categories.splice(i, 1);
					}
				}
			} else {
				$scope.category.$remove(function() {
					$location.path('categories');
				});
			}
		};
	}
]);