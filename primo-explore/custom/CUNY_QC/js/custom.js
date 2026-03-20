(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

/************************************* BEGIN LibChat widget *************************************/
(function () {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.src = 'https://qc-cuny.libanswers.com/load_chat.php?hash=2ac64db420d077c258f1fb1e6d5691c3';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(lc, s);
})();
/************************************* END LibChat widget ***************************************/

/************************************* BEGIN Twitter widget *************************************/
(function () {
  var tw = document.createElement('script');
  tw.type = 'text/javascript';
  tw.src = 'https://platform.twitter.com/widgets.js';
  var u = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(tw, u);
})();
/************************************* END Twitter widget ***************************************/

})();