// *  $configurationURI/Framework/bdc-scripts/bdc.ad-shift.js
// *  Shift and Stick Ads
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.getCurrentBreakpoint = function() {
    var width = win.innerWidth;
    if ( width < 960 ) { return 'tablet'; }
    return 'desktop';
  };

  module.afterResize = function() {
    if ( module.currentBreakpoint !== module.getCurrentBreakpoint() ) {
      module.doShift();
      module.currentBreakpoint = module.getCurrentBreakpoint();
    } else { return; }
  };

  module.setupShift = function() {
    // Is lead media present?
    module.leadMediaPresent = $('.content-well--article').children().eq(0).hasClass('content-media');
    // Store previous sibling / first position
    module.$ad.data().$positionOne = module.$ad.parent().children().eq( module.$ad.index() - 1 );
    // Store second position
    module.$ad.data().$positionTwo = $('.' + module.$ad.data().positionTwo);
    // Store second position index
    module.$ad.data().$positionTwoIndex = module.$ad.data().positionTwoIndex;

  };

  module.doShift = function() {
    if ( module.$ad.data().adShifted ) {
      module.shiftIn();
    } else {
      module.shiftOut();
    }
    module.$ad.data().adShifted = !module.$ad.data().adShifted;
  };

  module.shiftOut = function() {
    if ( module.pageType === 'gallery' ) {
      module.$ad.data().$positionTwo.append(module.$ad);
      return;
    }

    if ( module.pageType === 'article' ) {
      // Append the ad once the shiftPosition has been determined
      module.$ad.data().$positionTwo.append(module.$ad);
      module.$ad.data().$positionTwo.children().eq(module.$ad.data().$positionTwoIndex).before(module.$ad);
      /*
      var $contentText = $('.content-text');
      if ( module.leadMediaPresent ) {
        var shiftDistance = parseInt($contentText.offset().top - module.$ad.offset().top, 10);
        // A shiftDistance of < 0 will result in the ad covering the trending widget
        // This occurs when an image or video takes a long time to load
        if ( shiftDistance > 0) {
          module.$ad.css({ position: 'relative', top: shiftDistance });
        } else {
          // Use setInterval to wait for a positive shiftDistance value, then shift
          var checkDistance = setInterval(function() {
            shiftDistance = parseInt($contentText.offset().top - module.$ad.offset().top, 10);
            if ( shiftDistance > 0 ) {
              module.$ad.css({ position: 'relative', top: shiftDistance });
              clearInterval(checkDistance);
            }
          }, 500);
        }
        // Append the ad once the shiftPosition has been determined
        module.$ad.data().$positionTwo.append(module.$ad);
      } else {
        module.$ad.data().$positionTwo.prepend(module.$ad);
        module.$ad.css({ position: 'static', top: 0 });
      }
      */
    }
  };

  module.shiftIn = function() {
    module.$ad.insertAfter(module.$ad.data().$positionOne);
    module.$ad.css({ position: 'static', top: 0 });
  };
 
  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    $(win).on('debouncedresize', function( event ) {
      module.afterResize();
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    // pageType property added to handle gallery shifting. maybe rethink this?
    module.pageType = 'article';
    module.pageType = $('.content-well--gallery').length ? 'gallery' : module.pageType;
    module.$ad = $('.ad-container--ad_toprightslot');
    module.currentBreakpoint = module.getCurrentBreakpoint();

    module.setupShift();

    if ( module.currentBreakpoint === 'desktop' ) {
      module.doShift();
    }

    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ( $('.ad-container--ad_toprightslot').length && ($('.content-well--article').length || $('.content-well--gallery').length) ) { module.init(); }
  });

})(window, jQuery);
