if (typeof bcom === "undefined") { bcom = {}; }
/*
 * Scoreboard stream item module for Boston.com
 * by Jesse Marple
 *
 * This plugin handles finding, requesting, displaying and updating the scoreboard
 * tease in the stream.
 * VARS: data-team, data-game, data-autoupdate
 * data-autoupdate is not currently used as we can't really test that feature yet
*/
bcom.streamscoreboard = (function(el,league,gameCode){
    //console.log(el);
    //console.log('league:'+league);
    //console.log('game code:'+gameCode)

        //var $scoreboards = $(el).not('.rendered');
        //console.log($scoreboards);
        // if ($scoreboards.length === 0){
        //     //die
        //     return false;
        // }
        var template = $('#stream-scoreboard-mustache').html(),
            domain = location.protocol + "//" + location.host;
            // parse the template so that its cached for easy and lightweight reuse
            Mustache.parse(template);
            // if ($scoreboards.length > 0){
            //     return;
            // }
    	//$.each($scoreboards,function(){
    		//var instanceData = $(this).data(),
    		//	that = this;

			var url = domain + '/partners/stats/' +league + '/' + gameCode + '.txt';
			// the url below is for the testing of this module on local.boston.com
			// make sure to check your port in case you need to edit this
			//var url = domain + '/data/scoreboard-example.txt';
            //var url = 'http://bcom.local' + '/data/scoreboard-example.txt';

        	$.ajax({
        		url: url,
        		dataType:"json"
        	}).done(function( data ){
        		//adding some things needed by mustache into the response data
        		data.sport = league;
                if(data.segment_number != '0'){
                    data.segment_number = bcom.util.getOrdinal(data.segment_number) ;
                } else {
                    data.segment_number = undefined;
                }
        		//render what we have made
        		var rendered = Mustache.render(template,data);
        		el.html(rendered).addClass('rendered');

        	}).fail(function(jqXHR, textStatus, errorThrown){}).always(function(){});

    	//})

    });
//kick off
// $(function(){
//     if($('.scoreboard-mod')){
//         bcom.streamscoreboard('.scoreboard-mod');
//     };
// });