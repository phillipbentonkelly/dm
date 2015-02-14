var MPListings = {};
var mplistingObj = {};

(function( win, $, undefined ) {
    'use strict';

    var mpListings = {};
    var _engine = {};

    MPListings = function (){
        if( ! (this instanceof MPListings ))
            return new MPListings();
    };

    MPListings.prototype = {
        scrollListings: function( evt ){
            if(mpListings.$listingWrapper.width() <= 334){
                var thisObj = $(this);
                
                if(thisObj.attr('id') === 'leftArrow'){
                    if(mpListings.listingsArrCurrIndex < mpListings.listingsArr.length){
                        mplistingObj.moveScrollArea( mpListings.listingsArr[ mpListings.listingsArrCurrIndex+1 ] );
                        mpListings.listingsArrCurrIndex = mpListings.listingsArrCurrIndex + 1;
                    }
                }else{
                    if(mpListings.listingsArrCurrIndex > 0){
                        mplistingObj.moveScrollArea( mpListings.listingsArr[ mpListings.listingsArrCurrIndex-1 ] );
                        mpListings.listingsArrCurrIndex = mpListings.listingsArrCurrIndex - 1;
                    }
                }
            }
        },
        moveScrollArea: function( distance ){
            mpListings.$listingsContainer.animate({
                scrollTop: distance
            }, 500).promise().done(function(){
                mpListings.$currPos = distance;

                mplistingObj.updateArrowStates();
            });
        },
        updateArrowStates: function(){
            if(mpListings.listingsArrCurrIndex < (mpListings.listingsArr.length-1)){
                mpListings.$down.addClass('on');
            }else{
                mpListings.$down.removeClass('on');
            }

            if(mpListings.listingsArrCurrIndex > 0){
                mpListings.$up.addClass('on');
            }
            if(mpListings.listingsArrCurrIndex === 0){
                mpListings.$up.removeClass('on');
            }
        },
        listingsInit: function(){
            mpListings.$body = $('body');
                mpListings.$bodyWidth = mpListings.$body.width();
            mpListings.$topNode = $('.mplistings');
            mpListings.$hScrollWrapper = $('.mplistings .hScrollWrapper');
            mpListings.$listingFadeWrapper = $('.mplistings .scrollFadeWrapper');
            mpListings.$listingWrapper = $('.mplistings .scrollWrapper');
            mpListings.$listingsContainer = $('.listing-container');
            mpListings.$listings = $('.listing-container .property');
            mpListings.$propAddress = $('.listing-container .property .property__address');
            mpListings.$down = $('#leftArrow');
            mpListings.$up = $('#rightArrow');

            this.listingsEventHandlers();
        },
        updatePropertyAddressHeight: function() {
            var tallestProperty = 0;
            var reProperties = $('.mplistings .property .property__address');
            
            for(var i = 0; i < reProperties.length; i++){
                 var currPropHeight = $(reProperties[i]).height();
                 if(currPropHeight > tallestProperty){
                      tallestProperty = currPropHeight;
                 }
            }
            reProperties.height(tallestProperty);
            
            if(mpListings.$bodyWidth < 768){
                setTimeout(function(){
                    mpListings.$listingsContainer.height(mpListings.$listings.eq(0).height());
                }, 500);
            }
        },
        listingsEventHandlers: function(){
            mpListings.$up.on('click', this.scrollListings);
            mpListings.$down.on('click', this.scrollListings);
        },
        updateDisplayParams: function(){
            var thisRef = this;

            setTimeout(function(){
                thisRef.updatePropertyAddressHeight();
            }, 500);
            
            mpListings.$listings = $('.listing-container .property');
            mpListings.$scrollScale = mpListings.$listings.eq(0).height();

            mpListings.listingsArr = [ 0 ];
            mpListings.listingsArrCurrIndex = 0;

            mpListings.listingsRows = (mpListings.$listings.length % 2 > 0)? ((mpListings.$listings.length - (mpListings.$listings.length % 2))/2)+1 : ((mpListings.$listings.length - (mpListings.$listings.length % 2))/2);
            mpListings.remainingRows = mpListings.listingsRows - (8/2);

            if(mpListings.$bodyWidth < 768){
                mpListings.$listingsContainer.width( (mpListings.$listings.eq(0).width() * mpListings.$listings.length) + 100 ).promise().done(function(){
                    thisRef.updatePropertyAddressHeight();
                    mpListings.$hScrollWrapper.width(mpListings.$body.width());
                });
            }else{
                mpListings.$listingsContainer.width(300).promise().done(function(){
                    mpListings.$hScrollWrapper.width(300);
                });
            }

            for(var u = 0; u < mpListings.remainingRows; u++){
                var newPos = mpListings.$scrollScale * (u+1);
                mpListings.listingsArr.push( newPos );
            }

            this.updateArrowStates();
        }
    };
})(window, jQuery);


$(function(){
    mplistingObj = MPListings();
    mplistingObj.listingsInit();

    $(window).load(function(){
        mplistingObj.updateDisplayParams();
    });
    $(window).resize(function () {
        mplistingObj.updateDisplayParams();
    });
});

