// *
// *  Module Name
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.setUpMove = function($el) {
    var direction = $el.data().slideDirection;
    var move = false;
    if (direction === 'next' && module.listWidth - module.leftMargin > module.containerWidth) {
    //if (direction === 'next' && module.leftMargin < module.listWidth) {
      module.leftMargin = (module.leftMargin > 0) ? module.leftMargin + module.containerWidth : module.containerWidth;
      move = true;
    }

    if (direction === 'prev' && module.leftMargin > 0) {
      module.leftMargin = (module.leftMargin > 0) ? module.leftMargin - module.containerWidth : 0;
      move = true;
    }

    if (move) {
      module.move();
      module.adjustArrows();
    }

  };

  module.move = function(){
    module.$jsSlideList.animate({
      'margin-left': '-' + module.leftMargin + 'px',
    }, 100);
  };

  module.adjustArrows = function() {
    //if (module.leftMargin > module.listWidth) {
    //we are at end
    if (module.containerWidth >= module.listWidth - module.leftMargin) {
      module.$jsPrevArrow.css({'opacity':'1', 'filter':'100' });
      module.$jsNextArrow.css({'opacity':'0.3', 'filter':'30'});
    }

    if (module.containerWidth < module.listWidth - module.leftMargin) {
      module.$jsNextArrow.css({'opacity':'1', 'filter':'100' });
      module.$jsPrevArrow.css({'opacity':'1', 'filter':'100' });
    }

    if (module.leftMargin <= 0) {
      module.$jsPrevArrow.css({'opacity':'0.3', 'filter':'30'});
    }

  };

  module.resetModule = function() {
    module.leftMargin = 0;
    module.listWidth = module.$jsSlide.width() * module.$jsSlide.length;
    module.containerWidth = module.$jsSlideContainer.outerWidth();
    module.$jsPrevArrow.css({'opacity':'0.3', 'filter':'30'});
    module.$jsNextArrow.css({'opacity':'1', 'filter':'100' });
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    $('.js-hourly-forecast').on('click', function(event) {
      event.preventDefault();
      module.setUpMove($(this));
    });
    $(window).on('debouncedresize', function(event) {
      module.resetModule();
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$jsSlide = $('.js-slide');
    module.$jsSlideList = $('.js-slide-list');
    module.$jsSlideContainer = $('.js-slide-container');
    module.$jsPrevArrow = $('.js-hourly-forecast[data-slide-direction="prev"]');
    module.$jsNextArrow = $('.js-hourly-forecast[data-slide-direction="next"]');

    module.resetModule();
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.weather-hourly').length) { module.init(); }
  });

})(window, jQuery);