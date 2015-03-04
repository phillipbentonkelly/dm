// *
// *  Header Search
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  module.className = 'page-header__search';
  module.classNameModifier = 'page-header__search--active';

  module.updateUI = function() {
    module.mode = module.getMode();
    if (module.mode === 'inline') {
      module.$headerButton.removeClass('js-slide-out');
      module.$headerButton.addClass('js-header-form-expand');
      module.$headerFormInputs.prop('disabled', false);
    }
    if (module.mode === 'dropdown') {
      module.$headerButton.removeClass('js-header-form-expand');
      module.$headerButton.addClass('js-slide-out');
      module.$headerFormInputs.prop('disabled', true);
    }
  };

  module.getMode = function() {
    return $(win).width() <= 1200 ? 'dropdown' : 'inline';
  };

  module.afterResize = function() {
    if ( module.mode !== module.getMode() ) { module.updateUI(); }
  };

  module.activateForm = function() {
    module.$headerFormTextInput.trigger('focus');
    module.$headerButton.removeClass('js-header-form-expand');
    module.$headerButton.addClass(module.classNameModifier);
  };

  module.deactivateForm = function() {
    var textInputValue = module.$headerFormTextInput.val();
    if ( textInputValue === '' ) {
      module.$headerButton.addClass('js-header-form-expand');
      module.$headerButton.removeClass(module.classNameModifier);
      return;
    }
    // If text has been entered, keep the form active
    if ( textInputValue !== '' ) { module.activateForm(); }
  };

  module.stripSearchColons = function($form) {
    var $input = $form.find('[name="q"]');
    var query = $input.val();
    query = query.replace(/:/g, ' ');
    $input.val(query);
  }

  // // ------------------------------------------------------------
  // //  * Event Handlers
  // // ------------------------------------------------------------

  module.eventHandlers = function() {

    $(document).on('click', '.js-header-form-expand', function(event) {
      event.preventDefault();
      module.activateForm();
    });

    $('.js-search-strip-colon').submit(function(event) {
      module.stripSearchColons($(this));
    });
    
    module.$headerFormTextInput.on('blur', function(event) {
      event.preventDefault();
      module.deactivateForm();
    });

    $(window).on('debouncedresize', function(event) {
      module.afterResize();
    });

  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {

    module.$headerButton = $('.' + module.className);
    module.$headerForm = module.$headerButton.find('form');
    module.$headerFormInputs = module.$headerForm.find('input, button');
    module.$headerFormTextInput = module.$headerForm.find('input[type=text]');

    // Ensure header textarea is clear when page loads
    module.$headerFormTextInput.val('');

    module.updateUI();
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.' + module.className).length) { module.init(); }
  });

})(window, jQuery);
