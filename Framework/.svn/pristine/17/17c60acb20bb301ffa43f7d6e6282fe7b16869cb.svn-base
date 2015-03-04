// *
// *  Gallery Module
// *

if (typeof bdc === "undefined") { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  var _el = {};
  var _engine = {};
  var _ui = {};
  var _preview = {};
  var _image = {};
  var _ads = {};
  var _omniture = {};
  var _events = {};

  // ------------------------------------------------------------
  //  * Gallery Elements
  // ------------------------------------------------------------

  _el.init = function() {
    _el.$slideList = $('.content-gallery__slide-list');
    _el.$allSlides = $('.content-gallery__slide');
    _el.$totalSlides = $('.js-slide-total');
    _el.$currentSlide = $('.js-slide-current');
    _el.$thumbListItems = $('.content-gallery-preview__thumb-list-item');
    _el.$bigTargets = $('.js-big-target');
  };

  // ------------------------------------------------------------
  //  * Gallery Engine
  // ------------------------------------------------------------

  _engine.total = 0;
  _engine.current = 1;

  _engine.next = function($link) {
    _engine.current = _engine.current === _engine.total ? 1 : _engine.current + 1;
    _engine.show($link, true);
    _image.preLoad('next');
    _ui.update();
  };

  _engine.previous = function($link) {
    _engine.current = _engine.current === 1 ? _engine.total : _engine.current - 1;
    _engine.show($link, true);
    _image.preLoad('previous');
    _ui.update();
  };

  _engine.show = function($link, track) {
    track = track || false;
    _el.$allSlides.hide();
    _el.$slideList.find('[data-slide-num="' + _engine.current +'"]').show();
    if ( track ) {
      _omniture.trackSlideLoad($link);
      _ads.click.startRefresh();
    }
  };

  _engine.showAll = function() {
    _el.$allSlides.show();
  };

  _engine.goTo = function($link) {
    _engine.current = $link ? $link.data().goToSlide : _engine.current;
    _image.load();
    _engine.show($link, true);
    _ui.update();
    $.magnificPopup.close();
  };

  _engine.init = function() {
    _engine.total = _el.$allSlides.length;
    _engine.current = _ui.hash.get() ? _ui.hash.get() : _engine.current;
    if ( _ui.state  === 'scroll' ) {
      _image.loadAll();
      _ads.scroll.init();
      _engine.showAll();
      //this allows us to go to a specific slide on small screen sizes
      $('html, body').scrollTop($('[data-slide-num=' + _engine.current + ']').position().top);
    }
    if ( _ui.state  === 'click' ) {
      _image.load();
      _image.preLoad('next');
      _image.preLoad('previous');
      _ads.click.init();
      _engine.show();
      _ui.update();
    }
  };

  // ------------------------------------------------------------
  //  * Gallery UI
  // ------------------------------------------------------------

  _ui.getState = function() {
    if ( win.innerWidth >= 768 ) { return 'click'; }
    return 'scroll';
  };

  _ui.update = function() {
    _el.$currentSlide.text(_engine.current);
    _el.$totalSlides.text(_engine.total);
    _ui.hash.set();
    var resizeBigTargets = setTimeout(function() {
      _ui.bigTargets();
      clearTimeout(resizeBigTargets);
    }, 1000);
  };

  _ui.hash = {
    set: function() {
      win.location.hash = _ui.hashPrefix + _engine.current;
    },
    get: function() {
      return (win.location.hash.indexOf(_ui.hashPrefix) >= 0) ? parseInt(win.location.hash.split('-')[1], 10) : false;
    }
  };

  _ui.bigTargets = function() {
    var $currentSlide = _el.$slideList.find('[data-slide-num="' + _engine.currentSlide +'"]');
    var currentImageHeight = $currentSlide.find('.js-image-load').outerHeight();
    _el.$bigTargets.css({height: currentImageHeight + 'px'});
  };

  _ui.init = function() {
    _ui.state = _ui.getState();
    // $('.masthead') is the page header + page nav / $('.content-gallery-controls') are the gallery prev/next button
    // *** new markup *** module.galleryTop = module.$slideList.offset().top - ( $('.masthead').outerHeight(true) + $('.content-gallery-controls').outerHeight(true) );
    _ui.galleryTop = _el.$slideList.offset().top - ( $('.main-nav').outerHeight(true) + $('.global-nav').outerHeight(true) + $('.content-gallery-controls').outerHeight(true) );
    _ui.hashPrefix = 'slide-'; // ***
  };

  // ------------------------------------------------------------
  //  * Gallery Images
  // ------------------------------------------------------------

  _image.load = function() {
    var $currentSlide = _el.$slideList.find('[data-slide-num="' + _engine.current +'"]');
    if ( !$currentSlide.data().loaded ) {
      $currentSlide.find('.js-image-load').each(function(i, image) {
        var $image = $(image);
        if ( $image.length ) { $image.attr({ src: $(image).data().imgSrc }); }
      });
      $currentSlide.data().loaded = true;
    }
  };

  _image.loadAll = function() {
    _el.$allSlides.each(function(i, slide) {
      var $image = $(slide).find('.js-image-load');
      if ( $image.length ) { $image.attr({ src: $image.data().imgSrc }); }
      $(slide).data().loaded = true;
    });
  };

  _image.preLoad = function(direction) {
    var nextSlide;
    if ( direction === 'next' ) {
      nextSlide = _engine.current === _engine.total ? 1 : _engine.current + 1;
    }
    if ( direction === 'previous' ) {
      nextSlide = _engine.current === 1 ? _engine.total : _engine.current - 1;
    }
    var $nextSlide = _el.$slideList.find('[data-slide-num="' + nextSlide +'"]');
    if ( !$nextSlide.data().loaded ) {
      $nextSlide.find('.js-image-load').each(function(i, image) {
        $(image).attr({ src: $(image).data().imgSrc });
      });
      $nextSlide.data().loaded = true;
    }
  };

  // ------------------------------------------------------------
  //  * Gallery Preview
  // ------------------------------------------------------------

  _preview.loaded = false;

  _preview.loadModal = function($link) {
    $.magnificPopup.open({
      type: 'inline',
      mainClass: 'mfp-zoom-in',
      alignTop: true,
      fixedContentPos: true,
      closeOnBgClick: false,
      closeOnContentClick: false,
      midClick: true,
      items: [{ src: $link.attr('href'), el: $link }],
      callbacks: {
        beforeOpen: function() {
          _omniture.trackSlideLoad($link);
          if ( !_preview.loaded ) { _preview.loadImages(); }
        }
      }
    });
  };

  _preview.loadImages = function() {
    _el.$thumbListItems.find('.js-image-load').each(function(i, image) {
      $(image).attr({ src: $(image).data().imgSrc });
    });
    _preview.loaded = true;
  };

  // ------------------------------------------------------------
  //  * Ads
  // ------------------------------------------------------------

  // Click Ads
  _ads.click = {
    loaded: false,
    catalog: ['ad_lead1', 'ad_toprightslot'],
    refresh: function() {
      var definitionArray = [];
      var currentBreakPoint = bcom.util.getCurrentBreakPoint();
      $.each( _ads.click.catalog, function( i, adName ) {
        if ( bcom.dfp.refreshingAds[adName] && bcom.dfp.refreshingAds[adName].adDefinition ) {
          definitionArray.push( bcom.dfp.refreshingAds[adName].adDefinition );
        }
      }); 
      if ( definitionArray.length > 0 ) {
        googletag.cmd.push(function() {
          googletag.pubads().setTargeting( 'breakpoint', currentBreakPoint );
          googletag.pubads().refresh( definitionArray );
        });
      }
    },
    init: function() {
      $('.js-gallery-ad').hide();
      $('ad-container--ad_toprightslot').show();
    }
  };
  // startRefresh called on redrawSlides
  _ads.click.startRefresh = _.debounce( _ads.click.refresh, bcom.dfp.refreshRate );

  // Scroll Ads
  _ads.scroll = {
    max: 20,
    count: 0,
    displayed: false,
    allAds: [],
    template: function(adName) {
      return [
        '<li class="js-gallery-ad">',
          '<div class="ad-container ad-container--content-ad ad-container--' + adName + '">',
            '<div class="ad-container__notification">Advertisement - Continue Reading Below</div>',
            '<div id="' + adName + '"></div>',
          '</div>',
        '</li>'
      ].join('');
    },
    insert: function($slides) {
      if ( !_ads.scroll.displayed ) {
        // Loop through the $slides object and insert an ad template based on bcom.dfp.galleryCount
        $.each($slides, function(i, slide) {
          var index = i + 1;
          if ( index % bcom.dfp.galleryCount === 0 && _ads.scroll.count < _ads.scroll.max ) {
            _ads.scroll.count++;
            // Create ad object and store for later use
            var adObject = {
              adName: 'ad_gallery' + _ads.scroll.count,
              adSize: [[300,250]],
              pos: ['atf', 'gallery' + _ads.scroll.count],
            };
            _ads.scroll.allAds.push(adObject);
            // Append template to contain ad
            $slides.eq(i).after(_ads.scroll.template(adObject.adName));
          }
        });
      }
    },
    show: function() {
      if ( !_ads.scroll.displayed ) {
        _ads.scroll.define();
        _ads.scroll.display();
      }
    },
    define: function() {
      var networkCode = bcom.dfp.networkCode;
      var adUnit = bcom.dfp.adUnit;
      $.each(_ads.scroll.allAds, function( i, adObject ) {
        googletag.cmd.push(function() {
          adObject.adDefinition = googletag.defineSlot('/' + networkCode + '/' + adUnit, adObject.adSize, adObject.adName)
            .addService(googletag.pubads())
            .setTargeting("pos", adObject.pos);
        });
      });
    },
    display: function() {
      var definitionArray = [];
      var currentBreakPoint = bcom.util.getCurrentBreakPoint();
        googletag.cmd.push(function() {
          $.each(_ads.scroll.allAds, function( i, adObject ) {
            googletag.pubads().setTargeting( 'breakpoint', currentBreakPoint );
            googletag.display( adObject.adName );
          });
        });
      _ads.scroll.displayed = true;
    },
    init: function() {
      $('ad-container--ad_toprightslot').hide();
      _ads.scroll.insert(_el.$allSlides);
      $('.js-gallery-ad').show();
      _ads.scroll.show();
    }
  };

  // ------------------------------------------------------------
  //  * Omniture
  // ------------------------------------------------------------

  _omniture = {
    cachedSVars: bcom.util.saveSVars(s),
    cachedPageName: s.pageName,
    trackSlideLoad: function($link) {
      if (typeof s === 'object') {
        bcom.util.resetSVars(_omniture.cachedSVars);
        s = s_gi('nytbglobe,nytbgglobal');
        s.pageName = $link.hasClass('js-gallery-preview') ? _omniture.cachedPageName + ' | Modal preview' : _omniture.cachedPageName;
        s.prop5 = _engine.current;
        s.prop23 = $link.data().prop23 || '';
        s.t();
        bcom.util.resetSVars(_omniture.cachedSVars);
      }
    }
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  _events.init = function() {
    // Next slide
    $('.js-gallery-next').on('click', function(event) {
      event.preventDefault();
      _engine.next($(this));
    });

    // Previous slide
    $('.js-gallery-previous').on('click', function(event) {
      event.preventDefault();
      _engine.previous($(this));
    });

    // Go to slide from preview
    $('.js-gallery-go-to-slide').on('click', function(event) {
      event.preventDefault();
      _engine.goTo($(this));
    });

    // Load preview window
    $('.js-gallery-preview').on('click', function(event) {
      event.preventDefault();
      _preview.loadModal($(this));
    });

    // Keyboard controls
    $(document).on('keydown', function(event) {
      // Create a dummy link element for tracking
      var $link = $('<a/>').data({prop23: 'gallery advance - keyboard'});
      if ( event.keyCode === 39 ) { _engine.next($link); }
      if ( event.keyCode === 37 ) { _engine.previous($link); }
    });

    // Readjust gallery functionality on resize if necessary 
    $(win).on('debouncedresize', function( event ) {
      if ( _ui.state !== _ui.getState() ) {
        _ui.init();
        _engine.init();
      }
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    _el.init();
    _ui.init();
    _engine.init();
    _events.init();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.content-gallery').length) {
      module.init();
    }
  });

})(window, jQuery);