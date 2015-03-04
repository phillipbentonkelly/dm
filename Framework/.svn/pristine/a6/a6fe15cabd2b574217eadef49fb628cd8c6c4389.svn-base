/*jshint unused:false */
/*global $:false, _:false, Hogan:false */

/*
 * Nav module for Boston.com prototype
 * by Tito Bottitta + Pete Karl c/o Upstatement (@upstatement)
 * 
 * This handles nav/TOC behaviors like opening and closing, etc.
*/
var bcom_nav = (function() {
	'use strict';

	var module = {};

	module.active = false;
	module.states = {
		'toc': 'toc-active',
		'profile': 'profile-active',
		'search': 'search-active'
	};

	module.panels = {
		'toc': $('.toc-mod'),
		'search': $('.search-mod'),
		'profile': $('.nav-profile-mod')
	};

	module.updateBodyState = function(state) {
		module.clearBodyState();

		if(state !== module.active) {
			module.active = state;
			$('body').addClass(module.states[state]);
		} else {
			module.active = false;
		}
	};

	module.clearBodyState = function() {
		_.each(module.states, function(s) {
			$('body').removeClass(s);
		});
	};

	module.init = function() {
			
		$('.js-toc-trigger').on('click', function() {
			module.updateBodyState('toc');
			return false;
		});

		$('.js-search-trigger').on('click', function() {
			module.updateBodyState('search');
			$('.nav-search-mod input.nav-search-form-input')[0].focus();
			return false;
		});

		$('.js-profile-trigger').on('click', function() {
			module.updateBodyState('profile');
			return false;
		});

		// .site-container remove for more targeted .page-content
		// $('.site-container').on('click', function(e){
		//	// if(e.target !== $('.nav-search-mod')[0] && !$.contains( $('.nav-search-mod')[0], e.target )) {
		//	//	module.active = false;
		//	//	module.clearBodyState();
		//	// }
		// });
		$('.page-content').on('click', function(e){
				module.active = false;
				module.clearBodyState();			
		});
	};

	return module;

}());