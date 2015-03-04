$(document).ready(function() {

	$('#mobile-save-btn, .mobile-save-btn').click(function() {
		$('.save-search-modal').modal();
	});

	$('#mobile-articles-btn').click(function() {
		var closeModal = $("<a class='close-modal-wrap' style='float:right;margin-right:15px;' href='javascript:;'><img class='close-modal' src='images/listings/x-icon.jpg' style='height:20px;width:20px;'></a>");
		$('.related-articles__section-header').append(closeModal);
		$('.related-articles__ad-container').hide();
		$('.related-articles-modal').css('overflow', 'scroll');
		$('.related-articles-modal').animate({
			'top': '30px',
			'bottom': '40px',
			'left': '0px',
			'right': '0px'
		});
		var $overlay = $('<div style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:149;background:rgba(10,10,10,0.4);" class="related-articles-modal__overlay"></div>');
		$overlay.append($('.related-articles-modal'));
		$('body').append($overlay);
		// $('body').append($('.related-articles-modal'));

	});

	$('.mobile-favorite-btn').click(function() {
		$('.favorite-listing-modal').modal();
	});

	// LOGIN MODAL
	$('.mega-menu-login').click(function() {
		// alert('baananas');
		$('.login-modal').modal();
	});

	// REGISTER MODAL
	$('.mega-menu-register').click(function() {
		// alert('apples');
		$('.register-modal').modal();
	});
 
	$('.mobile-contact-btn').click(function() {
		var closeModal = $("<a class='close-modal-wrap' style='position:absolute;right:10px;top:10px;' href='javascript:;'><img class='close-modal' src='images/listings/x-icon.jpg' style='height:20px;width:20px;'></a>");
		$('.contact__header').append(closeModal);
		$('.contact-agent-modal').modal();
	});

	$('#mobile-share-btn, .mobile-share-btn').click(function() {
		$('.share-modal').modal();
	});
	
	$('.filter-drop').click(function() {
		$('.search-filters-modal').modal();
	});


	$(document).on('click', '.close-modal', function() {
        $.modal.close();
        var $modal = $('body').find('.related-articles-modal');
        $('body').find('.related-articles-modal__overlay').hide();
		$modal.animate({
			'right': '100%'
		});

		$('body').find('.close-modal-wrap').remove();
    });

    $(document).on('click', '.close-modal-btn', function() {
        $.modal.close();
        $('body').find('.close-modal-wrap').remove();
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