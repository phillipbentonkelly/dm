$(document).ready(function() {

	$('#mobile-save-btn').click(function() {
		$('.save-search-modal').modal();
	});

	$('#mobile-articles-btn').click(function() {
		var closeModal = $("<a style='position:absolute;right:10px;top:10px;' href='javascript:;'><img class='close-modal' src='images/listings/x-icon.jpg' style='height:20px;width:20px;'></a>");
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
});