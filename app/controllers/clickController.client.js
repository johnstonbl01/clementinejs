'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var apiUrl = 'http://localhost:3000/api/clicks';

   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }

   addButton.addEventListener('click', function () {

      function logAjaxResponse (data) {
         console.log(data);
      }

      ajaxRequest('GET', apiUrl, logAjaxResponse);
   }, false);

})();
