/*
 * Ad module for Boston.com 
 * by Eddie Kennedy
 * 
 * Handles loading of ads
*/

var bcom_dfp = (function() {
  'use strict';

  var module = {};

  module.adCatalog = [
    {
      name: 'ad_lead1',
      size: [[728,90],[320,50]],
      position: ['atf', 'lead1']
    },
    {
      name: 'ad_topright',
      size: [[300,250],[300,600],[300,1050]],
      position: ['atf', 'topright']
    },
    {
      name: 'ad_featurestack1',
      size: [[300,250],[260,210]],
      position: 'featurestack1'
    },
    {
      name: 'ad_featurestack2',
      size: [[300,250],[260,210]],
      position: 'featurestack2'
    },
    {
      name: 'ad_sponsor',
      size: [[88,31]],
      position: 'sponsor'
    },
    {
      name: 'ad_mustread',
      size: [[320,50]],
      position: 'mustread'
    },
    {
      name: 'ad_carousel',
      size: [[600,250]],
      position: 'carousel'
    },
    {
      name: 'ad_stream1',
      size: [[300,250],[600,250],[320,50],[676,117]],
      position: ['atf', 'stream1']
    },
    {
      name: 'ad_stream2-20',
      size: [[300,250],[600,250],[320,50],[676,117]],
      position: ['btf', 'stream2-20']
    },
    {
      name: 'ad_navdisplay',
      size: [[285,48]],
      position: 'navdisplay'
    },
    {
      name: 'ad_searchbar',
      size: [[88,31]],
      position: 'searchbar'
    },
    {
      name: 'ad_outofpage',
      size: [[1,1]],
      position: 'outofpage'
    },
    {
      name: 'ad_billboard',
      size: [[959,30]],
      position: 'billboard'
    },
    {
      name: 'ad_ingallery',
      size: [[4,4]],
      position: 'ingallery'
    },
    {
      name: 'ad_wallpaper',
      size: [[1,2]],
      position: 'wallpaper'
    },
    {
      name: 'ad_text1',
      size: [[2,2]],
      position: 'text1'
    },
    {
      name: 'ad_text2',
      size: [[2,2]],
      position: 'text2'
    },
    {
      name: 'ad_text3',
      size: [[2,2]],
      position: 'text3'
    }
  ];

  module.outOfPageCatalog = [
    {
      name: 'ad_richmedia',
      postion: ['outofpage', 'atf']
    }
  ];

  var networkCode = bcom.dfp.networkCode;
  var adUnit      = bcom.dfp.adUnit;
  var adSlots     = bcom.dfp.adSlots;
  var activeAds   = [];

  module.buildActiveArray = function() {
    for ( var i = 0; i < module.adCatalog.length; i++ ) {
      var thisAd = module.adCatalog[i];
      if ( $.inArray( thisAd.name, adSlots ) >= 0 ) {
        activeAds.push( thisAd );
      }
    }
  };

  module.defineSlots = function() {
    $.each(activeAds, function( i, thisAd ) {
      googletag.cmd.push(function() {
        googletag.defineSlot('/' + networkCode + '/' + adUnit, thisAd.size, thisAd.name)
          .addService(googletag.pubads())
          .setTargeting("pos", thisAd.position);
      });
    });
    /* RICHMEDIA - TEMP */
    googletag.cmd.push(function() {
      googletag.defineOutOfPageSlot('/' + networkCode + '/' + adUnit, 'ad_richmedia')
        .addService(googletag.pubads())
        .setTargeting("pos", ['outofpage', 'atf']);
    });
    /* END RICHMEDIA */
  };

  module.displayAds = function() {
    $.each(activeAds, function( i, thisAd ) {
      googletag.cmd.push(function() {
        googletag.display( thisAd.name );
      });
    });
    /* RICHMEDIA - TEMP */
    googletag.cmd.push(function() {
      googletag.display('ad_richmedia');
    });
    /* END RICHMEDIA */
  };

  module.setKeyValues = function() {

    // Store value of test query string
    bcom.dfp.keyValuePairs.test = bcom.util.getQueryStringValue('test') ? bcom.util.getQueryStringValue('test') : '';
    
    // Set AAM values
    bcom.dfp.keyValuePairs.aam_dfp  = bcom.util.getCookie("aam_dfp");
    bcom.dfp.keyValuePairs.aam_uuid = bcom.util.getCookie("aam_uuid");

    // Loop through key/value pairs to set targeting
    var kvPairs = bcom.dfp.keyValuePairs;
    for ( var key in kvPairs ) {
      googletag.cmd.push(function() {
        googletag.pubads().setTargeting( key, kvPairs[key] );
      });
    }

    // Set Location
    if ( bcom.dfp.keyValuePairs.zip ) {
      googletag.cmd.push(function() {
        googletag.pubads().setLocation( bcom.dfp.keyValuePairs.zip + ',US' );
      });
    }

  };

  module.init = function() {

    module.buildActiveArray();
    module.defineSlots();
    module.setKeyValues();

    // Enable services + additional setup
    googletag.cmd.push(function() {
      googletag.enableServices();
    });

    module.displayAds();

  };

  return module;

})();
// Initialize
bcom_dfp.init();
