if (typeof bcom === "undefined") { bcom = {}; }

/*
 * Trending module for Boston.com
 * by Jesse Marple
*/
bcom.trending = (function() {
	'use strict';

    var template = $('#trending-item').html();

    // for local testing
	//var domain = location.protocol + "//" + location.host;
	//var url = domain + "/data/trending.json"; // this is the test URL

	var url = "http://r.qaedit.boston.com/partners/chartbeat/chartbeat.json"; //this is the production URL


	var module = {};

	module.init = function(){

		if ($('.trending').length === 0){
			// die
			return false;
		}

		// parse the template so that its cached for easy and lightweight reuse
        Mustache.parse(template);

		getTrending();

		$('.trending .trending-btn').click(function(e){
			e.preventDefault();
			$('.trending').toggleClass('trending-open');
			if ($('.trending').hasClass('trending-open')) {
				$('.trending-btn').text('Show Fewer');
			   	$('.trending').removeClass('trending-closed');
		       	//OMNITURE
		       	var s=s_gi('nytbglobe');
		       	s.tl(this,'o','Trending - Show all');
			   	bcom.util.clearSVars(s);
			} else {
				$('.trending-btn').text('Show All');
				$('.trending').addClass('trending-closed');
		        //OMNITURE
		        var s=s_gi('nytbglobe');s.tl(this,'o','Trending - Show fewer');
		        bcom.util.clearSVars(s);
		    }
		});
	};
	function getTrending(){

		$.ajax({
			url: url

		}).done(function(data){
			//console.log(data);
			var rendered = Mustache.render(template,data);
			$('.trending-list').html(rendered).addClass('rendered');
		});
	}
	module.init();
}());