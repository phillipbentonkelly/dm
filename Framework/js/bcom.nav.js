if (typeof bcom === "undefined") { bcom = {}; }
/*
 * Nav module for Boston.com prototype
 * by Tito Bottitta + Pete Karl with edits by Jesse Marple
 *
 * This handles nav/TOC behaviors like opening and closing, etc.
*/
bcom.nav = (function() {
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

	module.checkForAd = function() {
		if ($('#ad_searchbar').length > 0) {

        } else {
			$('.nav-search-form').css('margin-left','0px');
		}
	};

	module.init = function() {

		$('.js-toc-trigger').on('click', function() {
            // OMNITURE
            var $body = $('body'),
                s=s_gi('nytbglobe');
            if($body.hasClass('page-hp') && !$body.hasClass('page-section')){
                // homepage
                if("toc" !== module.active){
                    // open
                    s.tl(this,'o','Main Nav Hamburger - Expand_hp');
                    bcom.util.clearSVars(s);
                } else {
                    // close
                    s.tl(this,'o','Main Nav Hamburger - Collapse_hp');
                    bcom.util.clearSVars(s);
                }
            } else {
                // not homepage
                if("toc" !== module.active){
                    // open
                    s.tl(this,'o','Main Nav Hamburger - Expand');
                    bcom.util.clearSVars(s);
                } else {
                    // close
                    s.tl(this,'o','Main Nav Hamburger - Collapse');
                    bcom.util.clearSVars(s);
                }
            };
            // END OMNITURE
            module.updateBodyState('toc');
			return false;

		});

		$('.js-search-trigger').on('click', function() {
			module.updateBodyState('search');
			return false;
		});

		$('.js-profile-trigger').on('click', function() {
			module.updateBodyState('profile');
			return false;
		});

		$('.page-content').on('click', function(e){
            module.active = false;
            module.clearBodyState();
		});
        //reset/close navs ~ fix for older android
        if($('html').hasClass('touch')){
            module.clearBodyState();
        }

	};

	module.checkForAd();

	return module;

}());

// initing all nav event listeners
$(function(){
	bcom.nav.init();
});