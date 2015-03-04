if ($('#spingo-container').length) {
  $.ajax({ url: '/bdc-js/bdc.spingo.js', dataType: 'script' });
}

$(document).ready(function() {
	if ($('.events-main').length || $('.events-featured').length) {
		$('head').append('<link type="text/css" rel="stylesheet" href="/css/dist/bdc-events-screen.css">');
	}
	if ($('.events-list').length|| $('.events-featured').length || $('.events-search__chosen-select').length) {
		$.ajax({ url: '/bdc-js/bdc.events.js', dataType: 'script' });
	}
});