$(document).ready(function(){
	bcom.videoPlayer.video.init();
    //watchSocial();
    socialOnLoad();

	$('a.open-window').on('click',function(e){
		e.preventDefault();
		var $this = $(this);
		console.log($this);
        props = $this.context.getAttribute('data-props').replace(/(resizable|scrollbars)\=no/g, '$1=yes');
        var nw = window.open($this.context.getAttribute('data-url'), $this.context.getAttribute('data-name'), props);
        nw.focus();
		window.event.cancelBubble = true;
	});
    // looking to see if we are on an article or gallery
    //TODO: I'm stopping the scroll lock for the sidecar until after mobile launch ~jesse
    // if($('.story-mod').length){
    //     $(window).on('scroll', _.throttle(function() {
    //         _.each($('.story-tools-sidecar'), bcom.util.fixToContainer);
    //     }));
    // };
});

//fixed social on HP and section pages
function socialOnLoad() {
    setTimeout(function () {
      $('.nav-button-mod').removeClass('nav-button-mod-load');
    }, 3700);
};

// function watchSocial() {
//     var nav_btn = $('.nav-sm-button');
    
//     $('.nav-sm-button').click(function(e) {
//         e.preventDefault();

//         var $this = $(this);

//         if ($('.touch')) {
//             if($this.hasClass('active')){
//                 nav_btn.removeClass('active');
//             } else {
//                 nav_btn.removeClass('active');
//                 $this.addClass('active');
//             }
//         }
//     });
//     $('.page-content').click(function() {
//         nav_btn.removeClass('active');
//     });
//     $(window).scroll(function() {
//         nav_btn.removeClass('active');
//     });
// }
// end fixed social
