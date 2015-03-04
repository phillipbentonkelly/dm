// *
// *  Hover Events on Touch Devices
// *  .tease-footer specific for now
// *  ! Can/should be extended to handle other touch/hover functionality
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.baseClassName = 'tease-footer';

  module.events = function() {
    $('.' + module.baseClassName).on('touchstart', function(event) {
      var $el = $(this);
      if ($el.hasClass(module.baseClassName + '--active')) {
        return true;
      } else {
        $el.addClass(module.baseClassName + '--active');
        $('.' + module.baseClassName).not(this).removeClass(module.baseClassName + '--active');
        event.preventDefault();
        return false;
      }
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.events();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.touch').length && $('.' + module.baseClassName).length) { module.init(); }
  });

})(window, jQuery);