(function () {
  'use strict';
  'use strict';

  var app = angular.module('viewCustom', ['angularLoad']);
  app.component('mapItButton', {
    template: `
      <button
        class="button-as-link md-button md-primoExplore-theme md-ink-ripple"
        id="map-it-override"
        type="button"
      >
        📍 Map it!
      </button>`,
  });

  app.component('prmServiceButtonAfter', {
    bindings: { parentCtrl: `<` },
    template: `<map-it-button></map-it-button>`,
  });

  /************************************* BEGIN LibChat widget *************************************/
  (function () {
    var lc = document.createElement('script');
    lc.type = 'text/javascript';
    lc.src =
      'https://cuny.libanswers.com/load_chat.php?hash=ababd14fbbf0241dcd543d066d1dda20';

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lc, s);
  })();
  /************************************* END LibChat widget *************************************/

  /************************************* BEGIN Fancybox JS *************************************/
  (function () {
    var fancyCdn = document.createElement('script');
    fancyCdn.type = 'text/javascript';
    fancyCdn.src =
      'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js';

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.append(fancyCdn);
  })();
  /************************************* END Fancybox JS *************************************/

  (function () {
    var customJs = document.createElement('script');
    customJs.type = 'text/javascript';
    customJs.src =
      'https://library.brooklyn.cuny.edu/find-a-book/scripts/primo-explorer/mapit.js';

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.append(customJs);
  })();
})();
