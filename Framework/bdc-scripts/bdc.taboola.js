// *
// *  Taboola
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.scriptUrl = 'http://cdn.taboolasyndication.com/libtrc/boston/loader.js';

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    var widgetTrackingType = methode.webType.indexOf('gallery') >= 0 ? 'photo' : 'article';
    var widgetTrackingTypeObject = {};
    widgetTrackingTypeObject[widgetTrackingType] = 'auto';

    win._taboola = win._taboola || [];
    _taboola.push({mode:'thumbs-2r', container:'taboola__image-links', placement:'below-main-column'});
    _taboola.push({mode:'hybrid-text-links-2c', container:'taboola__text-links', placement:'text-2-columns', target_type:'mix'});
    _taboola.push({flush:true});
    _taboola.push(widgetTrackingTypeObject);

    $.ajax({url: module.scriptUrl, dataType: 'script'});
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.ad-container--taboola').length) { module.init(); }
  });

})(window, jQuery);