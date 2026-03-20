(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

/************************************* BEGIN LibChat widget *************************************/
(function() {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.src = 'https://asklib.lehman.edu/load_chat.php?hash=a26f18152912ece8efcd6f902c1cc614';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
/************************************* END LibChat widget *************************************/

})();