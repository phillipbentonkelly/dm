if (typeof bcom === "undefined") { bcom = {}; }
/*
 * Weather module for Boston.com prototype
 * by Chris Sherlin with edits by Jesse Marple
 * 
 * This handles the click for more weather UX
*/
bcom.weather = (function(){
    'use strict';

    var module = {};

    module.init = function(){
        var button = $('.next-weather-button'),
            container = $('.weather-container'), 
            margin = 155;

        button.on('click', function(e){
            e.preventDefault();
            container.css('transition', 'margin-left 0.2s ease-in').css('margin-left', "-" + margin + "px");

            if (margin > 470) {
                margin = 0;

            } else {

                margin += 155;

            }

        });
       // module.check_for_ad();

    };

    module.check_for_ad = function(){

        if ($('#ad_sponsor1').length > 0) {
          
        } else {
            $('.weather-wrapper').addClass('weather-wrapper-no-ad');
            $('.weather-block').addClass('weather-block-no-ad');
            $('.next-weather-button').css('right','12px');
        };
    }

    return module;
}());

// kick off
$(function(){
    if($('.weather-mod')){
        bcom.weather.init();
        bcom.weather.check_for_ad();        
    };
});