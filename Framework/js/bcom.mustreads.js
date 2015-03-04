$('.must-reads .mr-btn').click(function(e){
	e.preventDefault();
	$('.must-reads').toggleClass('mr-open');
	if ($('.must-reads').hasClass('mr-open')) {
		$('.mr-btn').text('Show Fewer');
	   	$('.must-reads').removeClass('mr-closed');
       	//OMNITURE
       	var s=s_gi('nytbglobe');
       	s.tl(this,'o','Must Reads - Show all');
	   	bcom.util.clearSVars(s);
	} else {
		$('.mr-btn').text('Show All');
		$('.must-reads').addClass('mr-closed');
        //OMNITURE
        var s=s_gi('nytbglobe');s.tl(this,'o','Must Reads - Show fewer');
        bcom.util.clearSVars(s);
    }
});

$('.event-listings .event-btn').click(function(e){
	e.preventDefault();
	$('.event-listings').toggleClass('event-open');
	if ($('.event-listings').hasClass('event-open')) {
		$('.event-btn').text('Show Fewer');
	   	$('.event-listings').removeClass('event-closed');
       	//OMNITURE
       	var s=s_gi('nytbglobe');
       	s.tl(this,'o','Must Reads - Show all');
	   	bcom.util.clearSVars(s);
	} else {
		$('.event-btn').text('Show All');
		$('.event-listings').addClass('event-closed');
        //OMNITURE
        var s=s_gi('nytbglobe');s.tl(this,'o','Event Listings - Show fewer');
        bcom.util.clearSVars(s);
    }
});