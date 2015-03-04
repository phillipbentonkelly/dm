// *
// *  Slide Out Functionality
// *  Used for `Slide Out Nav` and `User Panel`
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.classModifier = '--active';
  module.jsOpenIndicator = 'js-panel-open';

  module.slideInit = function($el) {
    var target = $el.data().target;
    var $target = $('.' + $el.data().target);
    var toggleClass = target + module.classModifier;
    var active = $target.hasClass(toggleClass) ? true : false;

    // Setting CSS transition properties here prevents
    // unwanted show > hide on page load. BDC-2129
    if ( !$target.data().init ) {
      $target.css({
        transitionProperty: 'left, right',
        transitionTimingFunction: 'cubic-bezier(0.49, 0.37, 0.445, 0.715)',
        transitionDuration: '0.25s'
      });
      $target.data().init = true;
    }

    module.closeAll();
    module.doSlide($target, toggleClass, active);
    module.updateButton($el, active);
  };

  module.doSlide = function($target, toggleClass, active) {
    if (active) {
      $target.removeClass(toggleClass).removeClass(module.jsOpenIndicator);
    } else {
      $target.addClass(toggleClass).addClass(module.jsOpenIndicator);
    }
  };

  module.closeAll = function() {
    $('.' + module.jsOpenIndicator).removeClass(function (index, classes) {
      var classArray = classes.split(' ');
      for ( var i = 0; i < classArray.length; i++ ) {
        if (classArray[i].match(/.--active$/g)) { return classArray[i]; }
      }
    }).removeClass(module.jsOpenIndicator);
    // Update all buttons to closed state
    module.updateButton(module.$buttons, true);
  };

  module.updateButton = function($el, active) {
    var show = active ? 'closed' : 'open';
    var hide = active ? 'open' : 'closed';
    $el.find('[data-state="' + show + '"]').css({display: 'inline-block'});
    $el.find('[data-state="' + hide + '"]').css({display: 'none'});
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    $(document).on('click', '.js-slide-out', function(event) {
      event.preventDefault();
      module.slideInit($(this));
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$buttons = $('.js-slide-out');
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.js-slide-out').length) { module.init(); }
  });

})(window, jQuery);