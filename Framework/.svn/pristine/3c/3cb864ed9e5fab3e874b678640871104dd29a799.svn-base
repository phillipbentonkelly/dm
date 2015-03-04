// *
// *  Cinesport Player
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.containerClass = '.js-load-cinesport-player';
  module.loadPlayer = $(win).width() >= 960 ? true : false;

  module.loadIframe = function() {

    var src = module.$moduleContainer.data().src;

    var $iframe = $('<iframe/>');
    $iframe.attr({
      id: 'boxad-csprt',
      name: 'boxad-csprt',
      src: src,
      scrolling: 'no',
      frameborder: '0',
      align: 'top,left',
      marginheight: 0,
      marginwidth: 0,
      width: 300,
      height: 250
    });

    module.$moduleContainer.append($iframe);
  };

  module.appendStyles = function($moduleContainer) {
    module.$moduleContainer.css({
      width: '300px',
      height: '250px',
      margin: '0 auto 20px',
      backgroundColor: '#333',
      color: '#fff'
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$moduleContainer = $(module.containerClass);
    module.loadIframe();
    module.appendStyles();
  };

  // Kickoff
  $(document).ready(function() {
    if ($(module.containerClass).length && module.loadPlayer) { module.init(); }
  });

})(window, jQuery);