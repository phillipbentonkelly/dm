var adSlotsWrapper = {};
var viewMoreBtn = {};
var viewMoreLimit;

$(function(){
    adSlotsWrapper = $('.realEstateNews .adSlots');
    viewMoreBtn = $('a.viewMore');
    viewMoreLimit = 0;

    viewMoreBtn.on('click', function(){
        if(viewMoreLimit < 1){
            viewMoreLimit = 1;
            viewMoreBtn.addClass('disabledViewMore');
            requestNewListings();
        }
    });
});

function requestNewListings(){
    $.ajax({
        url: "newListings.html",
        cache: false
    }).done(function(html){
        adSlotsWrapper.html( html );
    });
}
