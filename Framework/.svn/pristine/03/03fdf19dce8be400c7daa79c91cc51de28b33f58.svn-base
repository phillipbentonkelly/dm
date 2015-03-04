// *
// *  Deffered CSS
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.deferredStyles = 'css/lib/magnificpopup.min.css';

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    $('head').append('<link rel="stylesheet" type="text/css" href="' + module.deferredStyles + '" />');
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.module-element').length) { module.init(); }
  });

})(window, jQuery);