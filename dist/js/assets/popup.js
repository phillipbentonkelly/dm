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

	$(document).on('click', '.close-modal', function() {
        $.modal.close();
    });


    var $sidebar   = $(".sticky-map-wrapper"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 100;
        
    $window.scroll(function() {
    	if ($window.scrollTop() > 3200) return;
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
	});
});