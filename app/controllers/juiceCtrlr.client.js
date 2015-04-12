app.controller('juiceCtrlr', ['$scope', function ($scope) {
	$scope.juice = 0;

	$scope.squeezeJuice = function () {
		if ($scope.juice < 100) {
			$scope.juice += 10;
		}
	};
}]);