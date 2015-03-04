// *
// *  Brightcove Videoplayer
// *  Loads a Brightcove videoplayer on the weather page
// *  Can, and should, be extended to handle other Brightcove videoplayers as well
// *
// *  Docs: http://docs.brightcove.com/en/video-cloud/smart-player-api/samples/load-player-dynamically.html
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.className = '.js-load-brightcove-weather';
  module.scriptUrl = 'http://admin.brightcove.com/js/BrightcoveExperiences.js';

  module.loadScript = function() {
    return $.ajax({ url: module.scriptUrl, dataType: 'script' });
  };

  module.buildAndAppendObject = function() {

    // The object
    module.$objectEl = $('<object id="myExperience2062989939001" class="BrightcoveExperience" />');

    // Object params
    module.params = {
      wmode: 'transparent',
      bgcolor: '#ffffff',
      width: '640',
      height: '360',
      playerID: '3921550695001',
      playerKey: 'AQ~~,AAAAAA6piHY~,DqRT40XOAr_Xo-4ze0sRaSyjDdo7NgW-',
      isVid: 'true',
      isUI: 'true',
      dynamicStreaming: 'true',
      includeAPI: 'true'
    };
    module.params['@videoPlayer'] = '2062989939001';

    // Append params to the object
    $.each(module.params, function(param, i) {
      var $paramEl = '<param name="' + param + '" value="' + module.params[param] + '" />';
      module.$objectEl.append($paramEl);
    });

    // Append the object to the container
    $(module.className).append(module.$objectEl);

  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.loadScript().success(function() {

      module.buildAndAppendObject();

      // Brightcove kickoff
      brightcove.createExperiences();

    });
  };

  // Kickoff
  $(document).ready(function() {
    if ($(module.className).length) { module.init(); }
  });

})(window, jQuery);