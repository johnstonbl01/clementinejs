(function (window, angular) {
	'use strict';

	var matRipple = angular.module('materialRipple', []);

	matRipple.directive('materialRipple', function () {
		return {
			restrict: 'A', //restricts angular to only match names of HTML attributes;
			link: function (scope, element, attrs) {
				var x, y, size, offsets;

				element.on('click', function (event) {

					if (element[0].type !== 'submit') {
						event.preventDefault();
					}

					var ripple = this.querySelector('.material-ripple');
					var eventType = event.type;

					//create ripple effect if it does not already exist
					if (ripple === null) {

						ripple = document.createElement('span');
						ripple.classList.add('material-ripple');

						this.insertBefore(ripple, this.firstChild);

						//set size of ripple effect
						if (!ripple.offsetHeight && !ripple.offsetWidth) {
							size = Math.max(element[0].offsetWidth, element[0].offsetHeight);
							ripple.style.width = size + 'px';
							ripple.style.height = size + 'px';
						}
					}

					ripple.classList.remove('animate');

					if (eventType === 'click') {
						x = event.pageX;
						y = event.pageY;
					}

					//set ripple position
					function getPosition (element) {
						var docElement = document.documentElement;
						var elemSize = element.getBoundingClientRect();
						var top = elemSize.top + window.pageYOffset - docElement.clientTop;
						var left = elemSize.left + window.pageXOffset - docElement.clientLeft;

						return { top: top, left: left };

					}

					//final ripple coordinates
					offsets = getPosition(element[0]);
					ripple.style.left = (x - offsets.left - size / 2) + 'px';
					ripple.style.top = (y - offsets.top - size / 2) + 'px';

					ripple.classList.add('animate');

				});
			}
		};
	});
})(window, window.angular);
