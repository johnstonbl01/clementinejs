'use strict';

app.controller('commentCtrlr', ['$scope', '$resource', function ($scope, $resource) {
	var Comment = $resource('/api/comments');

	$scope.limitQuantity = -5;
	$scope.orderProperty = '_id';


	$scope.queryComments = function () {
		Comment.query(function (results) {
			$scope.comments = results;

			if ($scope.comments.length === 0) {
				var firstComment = new Comment();

				firstComment.email = 'sunnyside@citruslovers.com';
				firstComment.comments = 'The best thing to happen to internet citrus since the orange press!';

				firstComment.$save(function (result) {
					$scope.comments.push(result);

				});
			}

		});
	};

	$scope.queryComments();

	$scope.createComment = function () {

		if ($scope.commentForm.$valid) {
			var comment = new Comment();

			comment.email = $scope.commentEmail;
			comment.comments = $scope.commentBody;

			comment.$save(function (result) {
				$scope.comments.push(result);

				$scope.commentEmail = '';
				$scope.commentBody = '';

				$scope.queryComments();
			});

		}
	};

	$scope.deleteComments = function () {

		if ($scope.comments.length !== 0) {
			Comment.delete($scope.comments, function () {
				$scope.queryComments();
			});

		}

	};
}]);
