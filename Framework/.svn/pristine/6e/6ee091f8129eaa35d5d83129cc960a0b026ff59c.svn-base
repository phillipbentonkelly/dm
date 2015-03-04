if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.menuIsActive = false;
  module.timer = null;
  module.hoverDelay = 150;
  module.navItemActiveClass = 'page-nav__item--active';
  
  
  // Accepts a chunk of HTML, finds megamenu divs within it
  // Attaches them to the nav bar
  module.megamenuLoad = function(data) {
    var $menus = $(data).closest('.js-mega-menu');
    $menus.each(function(idx, menu) {
      var $menu = $(menu);
      var section = $menu.attr('data-section');
      var $target = module.$megaMenuNav.find('[data-section=' + section + ']');
      $target.append($menu);
    });
  }

  // Make this available globally for ajax callback
  bdc.megamenuLoad = module.megamenuLoad;

  // Called on hover of the nav bar
  module.activateMenu = function(event) {
    var action = event.type;
    if ( action === 'mouseenter') { return; }
    if ( action === 'mouseleave' ) { module.menuIsActive = false; }
  };

  // Called on hover of the nav bar links
  module.activateMenuItem = function(event, $el) {
    var action = event.type;
    if ( action === 'mouseenter') {
      if ( module.menuIsActive ) {
        $el.addClass(module.navItemActiveClass);
      } else {
        module.timer = setTimeout(function() {
          $el.addClass(module.navItemActiveClass);
        }, module.hoverDelay);
        module.menuIsActive = true;
      }
      return;
    }
    if ( action === 'mouseleave' ) {
      if ( module.timer ) { module.timer = clearTimeout(module.timer); }
      $el.removeClass(module.navItemActiveClass);
    }
  };
 
  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    module.$megaMenuNav.hover(function(event) {
      event.preventDefault();
      module.activateMenu(event);
    });
    module.$megaMenuNavItems.hover(function(event) {
      event.preventDefault();
      module.activateMenuItem(event, $(this));
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    // Grab DOM Elements
    module.$megaMenuNav = $('.js-mega-menu-nav');
    module.$megaMenuNavItems = module.$megaMenuNav.find('.js-has-menu');
    module.$megaMenus = $('.js-mega-menu');

    //module.moveMenus();
    module.eventHandlers();

  };

  // Kickoff
  $(document).ready(function() {
    if ($('.no-touch').length && $('.js-mega-menu-nav').length) { module.init(); }
  });

})(window, jQuery);
