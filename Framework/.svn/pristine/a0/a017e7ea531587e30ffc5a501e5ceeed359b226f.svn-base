
if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {

  'use strict';

  $.fn.stickPlease = function(options) {

    var module = {};
    module.$win = $(win);
    module.$this = $(this);

    
    // ------------------------------------------------------------
    //  * Plugin settings
    // ------------------------------------------------------------

    module.defaults = {
      
      // Default options
      pushElements: [],
      fixedElements: $('.masthead__content'),
      startElement: $('.masthead__content'), //defaults to top
      endElement: $('.page-footer'),
      topPadding: 0,
      calcInterval: 50,
      calcTimeout: 8000
      // etc...
    };
        
    module.settings = $.extend( {}, module.defaults, options );
    
    // ------------------------------------------------------------
    //  * Add styles to content elements for positioning
    // ------------------------------------------------------------

    module.addStyles = function() {
      $.each(module.settings.pushElements, function(){
        $(this).addClass('has-content-social-bar--vertical');
      });
    };

    // ------------------------------------------------------------
    //  * Calculate sticky element geometry
    // ------------------------------------------------------------
    
    module.initGeometry = function() {
   
      // this calculates page bounds at intervals after page load to 
      // account for ajax loaded content
      // var calcInterval = setInterval(function() {
      //   module.recalculate(true);
      // }, module.settings.calcInterval);

      // // remove the interval after calcTimeout, and force one more calculation
      // setTimeout(function() {
      //   window.clearInterval(calcInterval);
      // }, module.settings.calcTimeout);

      // calculate the top offset we want to stick at. 
      // this includes fixed elements and our top padding.  // TODO - move padding to css
      var offset = 0;
      $.each(module.settings.fixedElements, function(){
        offset += $(this).outerHeight();
      });
      offset += module.settings.topPadding;
     
      // initialize module.geom, start/end boundaries are set in moduule.calcBounds 
      module.geom = {
        offset: offset,
        height: module.$this.outerHeight()
      };
     module.recalculate(true);
    };
    
    //breakpointHandler
    module.ableToStick = function() {
      if (!module.settings.stickRange || !module.settings.stickRangeClass) return true;
      if (module.$win.width() > module.settings.stickRange[0] && module.$win.width() < module.settings.stickRange[1]) {
        return true;
      } else {
        return false;
      }
    };
    // ------------------------------------------------------------
    //  * Handle scrolling functionality
    // ------------------------------------------------------------
    module.makeElementSticky = function($el) {
      console.log('makeElementSticky');
      // if (module.currentState === null) {
      //   $el.wrap(module.$stickyWrapper);
      // }
      //if (module.currentState !== 'sticky') {
       $el
        .addClass(module.settings.stickRangeClass)
        .addClass('bdc-sticky')
        .removeClass('bdc-stuck');
       //}
      };


    module.makeElementNotSticky = function($el) {
      console.log('makeElementNotSticky');
      if (module.currentState !== null || module.currentState === 'notSticky') {
        $el
         // .unwrap(module.$stickyWrapper)
          .removeClass(module.settings.stickRangeClass)
          .removeClass('bdc-sticky')
          .removeClass('bdc-stuck');
      }
    };


    module.makeElementStuck = function($el) {
      console.log('makeElementStuck');
      $el
        .addClass('bdc-stuck');
    };


    module.checkTouch = function() {
      // console.log(Touch(), 'touch list');
      // if ( TouchList.length ) {

      //   console.log('this is touching');
      // }
    };

    module.recalculate = function() {
        // console.log('recalculate');
        module.geom.stickyStart = module.settings.startElement.offset().top - module.geom.offset;
        module.geom.stickyEnd = module.settings.endElement.offset().top -
          parseInt(module.settings.endElement.css('margin-top'), 10) -
          module.settings.topPadding - module.geom.offset -
          module.geom.height;
    };

    module.checkStickiness = function(recalculate) {
      //Check to see if we are in a range where we should apply a certain class
      // recalculate boundaries 
      // module.$stickyWrapper = $('<div class="sticky-wrapper" style=></div>');
      // module.$stickyWrapper.css({
      //   height: module.$this.height() + 'px',
      //   'margin-bottom': '20px'
      //  });
      // if (recalculate) {
      //   //only happening once on page load
      //   console.log('recalculate');
      //   module.geom.stickyStart = module.settings.startElement.offset().top - module.geom.offset;
      //   module.geom.stickyEnd = module.settings.endElement.offset().top -
      //     parseInt(module.settings.endElement.css('margin-top'), 10) -
      //     module.settings.topPadding - module.geom.offset -
      //     module.geom.height;
      // }
      
      // LOGIC BASED ON SCROLL POSITION 

      var canStick = module.ableToStick();
      
      if (canStick === false) {
        module.makeElementNotSticky(module.$this);
        return;
      }

      module.currentState = module.currentState || null;
      var scrollTop = module.$win.scrollTop();

      if (scrollTop <= module.geom.stickyStart) {
        // stop sticking if we scroll up past stickyStart
        module.newState = 'notSticky';
        if (module.currentState !== module.newState) {
          module.makeElementNotSticky(module.$this);
          module.currentState = module.newState;
        }
        //return;
      
      } else if (scrollTop > module.geom.stickyStart && scrollTop < module.geom.stickyEnd) {

        //if (canStick) {
          module.newState = 'sticky';
          if (module.currentState !== module.newState) {
            module.makeElementSticky(module.$this);
            module.$this.css({ 'top': module.geom.offset });
            module.currentState = module.newState;
          }
          //return;
        //}
        // else {
        //   module.newState = 'notSticky';
        //   if (module.currentState === module.newState) {
        //     module.makeElementNotSticky(module.$this);
        //     module.$this.css({ 'top': module.geom.offset });
        //     module.currentState = module.newState;
        //   }
        //   //return;
        // // start sticking when we pass the stickyStart point 
        // }

      } else if (scrollTop > module.geom.stickyEnd) {
        // stop scrolling when we hit stickyEnd
                //Breakpoint Logic
        module.newState = 'stuck';
        var top = module.settings.endElement.prop('offsetTop') -
                  parseInt(module.settings.endElement.css('margin-top'), 10) -
                  module.settings.topPadding -
                  module.geom.height;

        module.makeElementStuck(module.$this);
        module.$this.css({
          'top': top + 'px'
        });
        module.currentState = module.newState;
        //return;
      }
    };

    // ------------------------------------------------------------
    //  * breakpoint checker
    // ------------------------------------------------------------

    module.checkBreakpoint = function() {

      if (module.visible()) {
        
        // if the module isn't active (initial page load was mobile breakpoint), activate it
        if (!module.active) module.activate();
        // otherwise, just check our positioning
        else module.checkStickiness();
      }
    };

    // ------------------------------------------------------------
    //  * Check sticky element visibility
    // ------------------------------------------------------------
    module.visible = function() {
      return module.$this.is(":visible");
    };

    module.eventHandlers = function() {
      // handle scroll events if module is active
      $(window).scroll(function() {
        if (module.active) {
          module.checkStickiness();
          module.checkTouch();
        }
      });

      // handle breakpoint transitions
      $(window).on('debouncedresize', function() {
        module.checkBreakpoint();
      });

    };
    // ------------------------------------------------------------
    //  * Plugin kickoff
    // ------------------------------------------------------------

    module.activate = function() {
      module.initGeometry();
      module.active = true;
      module.checkStickiness();
    };

    module.init = function() {

      module.eventHandlers();
      module.addStyles();
      // if the module's visible, activate it. 
      // this prevents this from running on mobile. 
      // resize event will activate on desktop if needed
      if (module.visible()) module.activate();
    
    };

    module.init();

  };

  // ------------------------------------------------------------
  //  * Initialize plugin
  // ------------------------------------------------------------

  $(document).ready(function() {

    // disable sticky in IE8
    if ( $('html.ie8').length ) return;


      var $el = $('.content-social-bar--vertical');

      if ( $el.length && $('.content-well--article').length ) {
        
        // Set custom options
        var options = {
          pushElements: [$('.content-text'), $('.content-byline')],
          topPadding: 15,
          startElement: $('.content-byline'), //defaults to top
          endElement: $('.content-footer')
        };

        // Initialize plugin
        $el.stickPlease(options);

      }
    var $el2 = $('.content-social-bar--top');

    if ( $el2.length && $('.content-well--article').length ) {
      
      // Set custom options
      var options2 = {
        startElement: $('.content-social-bar--top'), //defaults to top
        endElement: $('.content-footer'),
        stickRange: [0, 600],
        stickRangeClass: 'content-social-bar--mobile-scroll',
        calcInterval: 10
      };

      // Initialize plugin
      $el2.stickPlease(options2);

    }
  });

})(window, jQuery);

