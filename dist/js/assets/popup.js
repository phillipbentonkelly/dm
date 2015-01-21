$(document).ready(function() {

	$('#mobile-save-btn').click(function() {
		$('.save-search-modal').modal();
	});

	$('#mobile-articles-btn').click(function() {
		var closeModal = $("<a style='position:absolute;right:10px;top:10px;' href='javascript:;'><img class='close-modal' src='images/listings/x-icon.jpg' style='height:20px;width:20px;'></a>");
		$('.related-articles').addClass('related-articles-popup');
		$('.related-articles__section-header').append(closeModal);
		$('.related-articles-modal').modal();
	});
 
	$('#mobile-contact-btn').click(function() {
		var closeModal = $("<a style='position:absolute;right:10px;top:10px;' href='javascript:;'><img class='close-modal' src='images/listings/x-icon.jpg' style='height:20px;width:20px;'></a>");
		$('.contact__header').append(closeModal);
		$('.contact-agent-modal').modal();
	});

	$('#mobile-share-btn').click(function() {
		$('.share-modal').modal();
	});
	
	$('.filter-drop').click(function() {
		$('.search-filters-modal').modal();
	});

	$(document).on('click', '.close-modal', function() {
        $.modal.close();
    });

    // JS for SERP map/list toggle

    $('.search-results__toggle-view').click(function() {
		$('.serp-map-btn').toggleClass('serp-list-btn');
		$('.serp-map--mobile-image').slideToggle(200);

		if(!$('.serp-map-btn').hasClass('serp-list-btn')) {
			$(this).children('p').text('Map');
			$('.search-results__item').show();
		} else {
			$(this).children('p').text('List');
			$('.search-results__item').not('#result2').hide();
		}
    });

    // JS for serp header hover

    $('.search-results__item').children('.header').on('touchstart touchend', function(e) {
		e.preventDefault();
    	$(this).toggleClass('serp-item-hovered');
	});
});