// Defines and displays DFP ads
(function(win, $, undefined){
  'use strict';

  // Overrides the adSlots[] array if ?adSlotOverride querystring is present
  if ( bcom.util.getQueryStringValue('adSlotOverride') ) {
    bcom.dfp.adSlots = bcom.util.getQueryStringValue('adSlotOverride').split(',');
  }

  // bcom.dfp is defined in the <head> / see: set_dfp.jpt
  var networkCode         = bcom.dfp.networkCode;
  var adUnit              = bcom.dfp.adUnit;
  var adSlots             = bcom.dfp.adSlots;
  // All active ads to be loaded on page load
  var activeAds           = [];
  // All active out of page ads to be loaded on page load
  var activeAdsOOP        = [];
  // All active ads to be loaded by user interaction
  var delayedAds          = [];
  // All ads to be refreshed on resize
  var responsiveAds       = [];
  // All ads to be refreshed on user interaction
  // Refresh will be called from other files so it must be global
  bcom.dfp.refreshingAds  = {};
  // Ads that were ignored because markup doesn't exist
  bcom.dfp.ignoredAds     = [];
  // Various breakpoints to use for resize refresh
  var desktopBreakpoint   = [960, 0];
  var tabletBreakpoint    = [768, 0];
  var mobileBreakpoint    = [0, 0];

  var module              = {};

  module.buildActiveArrays = function() {
    var i, thisAd;
    for ( i = 0; i < bcom.dfp.adCatalog.length; i++ ) {
      thisAd = bcom.dfp.adCatalog[i];
      // If this ad is in the adSlots array, do things with it
      if ( $.inArray( thisAd.name, adSlots ) >= 0 ) {
        // If the ad is in the DOM, add it to the activeAds/delayedAds array
        if ( $('#' + thisAd.name ).length ) {
          if ( !thisAd.delay ) { activeAds.push( thisAd ); }
          if ( thisAd.delay ) { delayedAds.push( thisAd ); }
        } else {
          // If not in the DOM, add it to ignoredAds array for debugging
          bcom.dfp.ignoredAds.push( thisAd.name );
        }
      }
    }
    // Out of page ads
    for ( i = 0; i < bcom.dfp.adCatalogOOP.length; i++ ) {
      thisAd = bcom.dfp.adCatalogOOP[i];
      if ( $.inArray( thisAd.name, adSlots ) >= 0 ) {
        activeAdsOOP.push( thisAd );
      }
    }
  };

  module.defineSlots = function() {
    $.each(activeAds, function( i, adObject ) {
      googletag.cmd.push(function() {
        // Handle responsive ads
        if ( adObject.sizeByBreakpoint ) {
          // Sizing - https://support.google.com/dfp_premium/answer/3423562?hl=en
          adObject.mapping = googletag.sizeMapping()
            .addSize(desktopBreakpoint, adObject.sizeByBreakpoint.desktop)
            .addSize(tabletBreakpoint, adObject.sizeByBreakpoint.tablet)
            .addSize(mobileBreakpoint, adObject.sizeByBreakpoint.mobile)
            .build();
          // ad_toprightslot should be a companion ad on video pages
          if ( adObject.name === 'ad_toprightslot' && bcom.dfp.keyValuePairs.pgtype === 'video' ) {
            // Define the slot
            adObject.adDefinition = googletag.defineSlot('/' + networkCode + '/' + adUnit, adObject.size, adObject.name)
              .defineSizeMapping(adObject.mapping)
              .addService(googletag.companionAds())
              .addService(googletag.pubads())
              .setTargeting('pos', adObject.position);
          } else {
            // Define the slot
            adObject.adDefinition = googletag.defineSlot('/' + networkCode + '/' + adUnit, adObject.size, adObject.name)
              .defineSizeMapping(adObject.mapping)
              .addService(googletag.pubads())
              .setTargeting('pos', adObject.position);
          }
          // Push into the responsiveAds array to refresh later
          responsiveAds.push(adObject);
        } else {
          // Define the slot
          adObject.adDefinition = googletag.defineSlot('/' + networkCode + '/' + adUnit, adObject.size, adObject.name)
            .addService(googletag.pubads())
            .setTargeting('pos', adObject.position);
        }
        // Check if the ad is a refresher and place it in the global object
        if ( adObject.refresher ) {
          bcom.dfp.refreshingAds[adObject.name] = adObject;
        }
      });
    });
    // Out of page ads
    $.each(activeAdsOOP, function( i, adObject ) {
      googletag.cmd.push(function() {
        adObject.adDefinition = googletag.defineOutOfPageSlot('/' + networkCode + '/' + adUnit, adObject.name)
          .addService(googletag.pubads())
          .setTargeting('pos', adObject.position);
      });
    });
  };

  module.displayAds = function() {
    var allActiveAds = $.merge( activeAds, activeAdsOOP );
    // Shuffle feature stack ads to the end of the allActiveAds array
    var notFS = []; var isFS = [];
    $.each( allActiveAds, function( i, adObject ) {
      if ( adObject.name.indexOf('ad_featurestack') >= 0 ) {
        isFS.push( adObject );
      } else {
        notFS.push( adObject );
      }
    });
    allActiveAds = $.merge( notFS, isFS );
    //var definitionArray = [];
    googletag.cmd.push(function() {
      $.each(allActiveAds, function( i, adObject ) {
        // Display ad to register
        googletag.display( adObject.name );
        //definitionArray.push(adObject.adDefinition);
      });
      // Refresh array to display
      //googletag.pubads().refresh( definitionArray );
    });
  };

  module.setKeyValues = function() {

    // Check login status
    bcom.dfp.keyValuePairs.logstat = bcom.util.getCookie('pathAuth') ? 'y' : 'n';

    // Store value of test query string
    bcom.dfp.keyValuePairs.test = bcom.util.getQueryStringValue('test') ? bcom.util.getQueryStringValue('test') : '';

    // Set AAM values
    var aam_dfp   = bcom.util.getCookie("aam_dfp");
    var aam       = aam_dfp ? decodeURIComponent(aam_dfp).split(',')[0] : '';
    var aam_value = aam ? aam.split('=')[1] : '';
    bcom.dfp.keyValuePairs.aam = aam_value;
    bcom.dfp.keyValuePairs.aam_uuid = bcom.util.getCookie("aam_uuid");

    // Breakpoint
    bcom.dfp.keyValuePairs.breakpoint = bcom.util.getCurrentBreakPoint();

    // Loop through key/value pairs to set targeting
    var kvPairs = bcom.dfp.keyValuePairs;
    for ( var key in kvPairs ) {
      var value = kvPairs[key];
      if ( value !== '' && value !== undefined && value !== null ) {
        googletag.cmd.push(function() {
          googletag.pubads().setTargeting( key, value );
        });
      }
    }

    // Set Location
    if ( bcom.dfp.keyValuePairs.zip ) {
      googletag.cmd.push(function() {
        googletag.pubads().setLocation( bcom.dfp.keyValuePairs.zip + ',US' );
      });
    }

  };

  module.parseRDBCookie = function() {
    // Check the cookie
    var RDBCookie = bcom.util.getCookie('RDB');
    if (RDBCookie === null || RDBCookie === '' || RDBCookie === undefined) { return false; }

    // Assign properties
    bcom.dfp.keyValuePairs.age = checkAge(RDBCookie.substring(56, 58), RDBCookie.substring(58, 60));
    bcom.dfp.keyValuePairs.zip = checkZip(RDBCookie.substring(4, 10));
    bcom.dfp.keyValuePairs.g = checkGender(RDBCookie.substring(48, 50));

    // Some utility functions
    function checkZip(hex) {
      var zip = parseInt(hex, 16).toString();
      if (zip.length > 4) { return zip; }
      return '0' + zip;
    }
    function checkAge(l, h) {
      var date = new Date();
      var currentYear = date.getFullYear();
      var low = (currentYear - hexToDecimal(l) + 1);
      var high = (currentYear - hexToDecimal(h) - 1);
      if (low === high) { return currentYear - low; }
      return (currentYear - low) + '-' + (currentYear - high);
    }
    function checkGender(hex) {
      var response;
      switch (hex) {
        case '01':
          response = 'm';
          break;
        case '02':
          response = 'f';
          break;
        default:
          response = '';
          break;
      }
      return response;
    }
    function hexToDecimal(hex) {
      return parseInt(hex, 16);
    }
  };

  module.afterResize = function() {
    if ( responsiveAds.length && module.currentBreakPoint !== bcom.util.getCurrentBreakPoint() ) {
      var definitionArray = [];
      $.each(responsiveAds, function( i, adObject ) {
        definitionArray.push( adObject.adDefinition );
      });
      // Reset current breakpoint
      module.currentBreakPoint = bcom.util.getCurrentBreakPoint();
      googletag.cmd.push(function() {
        googletag.pubads().setTargeting( 'breakpoint', module.currentBreakPoint );
        googletag.pubads().refresh( definitionArray );
      });
    }
  };

  module.loadDelayedAd = function( $el ) {
    var adName = $el.data().adName;
    $.each(delayedAds, function( i, adObject ) {
      if ( adObject.name === adName ) {
        if ( adObject.loaded ) { return; }
        googletag.cmd.push(function() {
          // Define the slot
          adObject.adDefinition = googletag.defineSlot('/' + networkCode + '/' + adUnit, adObject.size, adObject.name)
            .addService(googletag.pubads())
            .setTargeting('pos', adObject.position);
          googletag.display( adObject.name );
          //googletag.pubads().refresh( [adObject.adDefinition] );
        });
        adObject.loaded = true;
      }
    });
  };

  module.eventHandlers = function() {
    $(document).on('click', 'a[data-load-ad]', function( event ) {
      event.preventDefault();
      module.loadDelayedAd( $(this) );
    });
    $(window).on('debouncedresize', function( event ) {
      module.afterResize();
    });
  };

  module.init = function() {

    module.buildActiveArrays();
    module.defineSlots();
    module.parseRDBCookie();
    module.setKeyValues();

    // Enable services + additional setup
    googletag.cmd.push(function() {
      googletag.pubads().collapseEmptyDivs(true);
      googletag.pubads().enableAsyncRendering();
      //googletag.pubads().enableSingleRequest();
      googletag.companionAds().setRefreshUnfilledSlots(false);
      //googletag.pubads().disableInitialLoad();
      googletag.enableServices();
    });

    // Display ads
    module.displayAds();

    // Event handlers
    module.eventHandlers();

    // Set the current breakpoint for smart refreshing
    module.currentBreakPoint = bcom.util.getCurrentBreakPoint();

  };

  $(document).ready(function() {
    module.init();
  });


})(window, jQuery);