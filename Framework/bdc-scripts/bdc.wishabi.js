// *
// *  Wishabi
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.scriptUrl = 'http://api.circularhub.com/2464/5e30bf9636f28066/circularhub_module.js';

  module.buildWidget = function() {

    var url = win.location.hostname + win.location.pathname;
    var markup = '<div id="circularhub_module_2464"></div>';

    module.$wishabiContainer.append(markup);
  };

  module.requestScript = function() {
    $.ajax({url: module.scriptUrl, dataType: 'script'});
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$wishabiContainer = $('.js-load-wishabi');
    module.buildWidget();
    module.requestScript();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.js-load-wishabi').length) { module.init(); }
  });

})(window, jQuery);