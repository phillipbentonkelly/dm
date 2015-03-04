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
			size: [[728,90]],
			position: 'atf'
		},
		{
			name: 'ad_featurestack',
			size: [[300,250]],
			position: 'atf'
		},
		{
			name: 'ad_sponsor',
			size: [[88,31]],
			position: 'atf'
		},
		{
			name: 'ad_adsense',
			size: [[609,222]],
			position: 'atf'
		},
		{
			name: 'ad_carousel',
			size: [[600,250]],
			position: 'atf'
		},
		{
			name: 'ad_streamdisplay',
			size: [[300,250],[600,250]],
			position: 'atf'
		},
		{
			name: 'ad_streamsponstease',
			size: [[199,36]],
			position: 'atf'
		},
		{
			name: 'ad_featurestacksponsor',
			size: [[256,106]],
			position: 'atf'
		}
	];

	var networkCode = bcom.dfp.networkCode;
	var adUnit 			= bcom.dfp.adUnit;
	var adSlots 		= bcom.dfp.adSlots;
	var activeAds		= [];

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
	};

	module.displayAds = function() {
		$.each(activeAds, function( i, thisAd ) {
			googletag.cmd.push(function() {
				googletag.display( thisAd.name );
			});
		});
	};

	module.init = function() {

		module.buildActiveArray();
		module.defineSlots();

		// Enable services + additional setup
		googletag.cmd.push(function() {
			googletag.enableServices();
		});

		module.displayAds();

	};

	return module;

})();


