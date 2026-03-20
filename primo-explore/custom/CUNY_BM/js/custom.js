(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

/************************************* BEGIN libchat widget*************************************/
	// Adds the chat slide out
(function() {
 	 var lc = document.createElement('script');
 	lc.type = 'text/javascript';
 	 lc.src = 'https://v2.libanswers.com/load_chat.php?hash=d9ed55af5291efae4afa04a85f568795';
 	 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
	})();
	/************************************* END libchat widget *************************************/

})();
