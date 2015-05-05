'use strict';

app.controller('commentCtrlr', ['$scope', '$resource', function ($scope, $resource) {
	var Comment = $resource('/api/comments');

	$scope.limitQuantity = -5;
	$scope.orderProperty = '_id';

	Comment.query(function (results) {
		$scope.comments = results;
	});

	$scope.createComment = function () {
		var comment = new Comment();

		comment.email = $scope.commentEmail;
		comment.comments = $scope.commentBody;

		comment.$save(function (result) {
			$scope.comments.push(result);

			$scope.commentEmail = '';
			$scope.commentBody = '';
		});
	};
}]);
