(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

/************************************* BEGIN LibChat widget *************************************/
(function() {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.src = 'https://cuny.libanswers.com/load_chat.php?hash=0e9d5de6f80b82061ab0ef3a7779e760';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();
/************************************* END LibChat widget *************************************/

})();