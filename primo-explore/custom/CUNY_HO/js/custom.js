(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

/************************************* BEGIN LibChat widget *************************************/
(function () {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.src = 'https://hostos-cuny.libanswers.com/load_chat.php?hash=67ffa2ce8e57db5a7e118cdc4fee23e0​';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(lc, s);
})();
/************************************* END LibChat widget *************************************/

})();