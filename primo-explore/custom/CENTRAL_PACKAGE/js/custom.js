(function(){
"use strict";
'use strict';

var app = angular.module('centralCustom', ['angularLoad']);
// Notification alert bar
//app.component('prmSearchBarAfterAppStoreGenerated', {
//    bindings: { parentCtrl: '<' },
//    template: '<div class="alert alert-danger" style="margin-top:20px;"><h3>Planned System Downtime</h3><p>OneSearch will be unavailable from 9:00 PM on Saturday, May 29, until 9:00 PM on Sunday, May 30, while the vendor performs maintenance. Please plan your work accordingly.</p></div>'
//});
//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
app.controller('SearchBarAfterController', [function () {
    var vm = this;
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    template: '\n    <prm-search-bar-after-app-store-generated parent-ctrl="$ctrl.parentCtrl"></prm-search-bar-after-app-store-generated>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-
})();