// *
// *  Mega Menu
// *

(function( win, $, undefined ) {
  'use strict';

  var menu = {};

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  menu.eventHandlers = function() {
    console.log(menu.message);
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  menu.init = function() {
    menu.message = 'megamenu js loaded';
    menu.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.page-nav').length) { menu.init(); }
  });

})(window, jQuery);