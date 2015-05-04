'use strict';

app.controller('linkCtrlr', function ($scope, $timeout) {

	function getHref (e) {

		if (e.srcElement.localName === 'img') {
			return e.target.offsetParent.attributes.href.nodeValue;
		} else {
			return e.target.href;
		}
	}


	$scope.delayLink = function (e) {
		$timeout(function () {
			var url = getHref(e);

			window.open(url, '_blank');
		}, 350);
	};

	$scope.delayLinkNav = function (e) {
		$timeout(function () {
			var url = getHref(e);

			window.open(url, '_self');
		}, 350);
	};

});
