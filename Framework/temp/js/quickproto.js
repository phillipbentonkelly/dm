$(document).ready(function(){
	$('.must-reads .mr-btn').click(function(e){
e.preventDefault();
		$('.must-reads').toggleClass('mr-open');
		if ($('.must-reads').hasClass('mr-open')) {
			$('.mr-btn').text('Show Fewer');
		$('.must-reads').removeClass('mr-closed');
		} else {
			$('.mr-btn').text('Show All');
			$('.must-reads').addClass('mr-closed');
	    }
	});

    setTimeout(function() {
		bcom_infinity.listen();
        bcom_nav.init();
        bcom_carousel.init();
        bcom_user.init();
        bcom_dfp.init();
		bcom.videoPlayer.video.init();
        //refreshLoginStatus();
    }, 1000);
});
