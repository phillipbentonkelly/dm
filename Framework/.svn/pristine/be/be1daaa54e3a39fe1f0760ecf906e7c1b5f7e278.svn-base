// *
// *  Outbrain
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.scriptUrl = 'http://widgets.outbrain.com/outbrain.js';

  module.buildWidget = function() {

    //var widgetId = ( $( window ).width() > 500 ) ? ['AR_1','AR_2'] : ['MB_1'];
    var url = win.location.hostname + win.location.pathname;
    var markup = '';

    if ( $( window ).width() < 500 ) {

      markup = [
        '<div class="OUTBRAIN" data-src="',
         url,
          '" data-widget-id="MB_1" data-ob-template="boston.com" ></div>'
      ].join('');

    } else {

      markup = [
        '<div class="OUTBRAIN" data-src="',
         url,
          '" data-widget-id="AR_1" data-ob-template="boston.com" ></div>',
          '<div class="OUTBRAIN" data-src="',
         url,
          '" data-widget-id="AR_2" data-ob-template="boston.com" ></div>'
      ].join('');

    }

    module.$outbrainContainer.append(markup);
  }

  module.requestScript = function() {
    $.ajax({url: module.scriptUrl, dataType: 'script'});
  }

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$outbrainContainer = $('.ad-container--outbrain');
    module.buildWidget();
    module.requestScript();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.ad-container--outbrain').length) { module.init(); }
  });

})(window, jQuery);