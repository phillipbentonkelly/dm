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
bcom.breakingScoreboard = (function(el,league,gameCode){

        var template = $('#breaking-scoreboard-mustache').html(),
            domain = location.protocol + "//" + location.host;
            // the url below is for methode 
            var url = domain + '/partners/stats/' +league + '/' + gameCode + '.txt';
            // the url below is for the testing of this module on local.boston.com (the repo)
            // ***IF YOU UNCOMMENT IT MAKE SURE YOU RECOMMENT BEFORE COMMITTING***
            // make sure to check your port in case you need to edit this
            //var url = domain + '/data/scoreboard-breaking.txt';

            $.ajax({
                url: url,
                dataType:"json"
            }).done(function( data ){
                //adding some things needed by mustache into the response data
                data.moreType,
                data.sport = league;
                if(data.segment_number != '0'){
                    data.segment_number = bcom.util.getOrdinal(data.segment_number) ;
                } else {
                    data.segment_number = undefined;
                }
                switch(league){
                    case 'mlb':
                    data.moreType = 'Red Sox';
                    break;
                    case 'nba':
                    data.moreType = 'Celtics';
                    break;
                    case 'nfl':
                    data.moreType = 'Patriots';
                    break;
                    case 'nhl':
                    data.moreType = 'Bruins';
                    break;
                    default:
                    data.moreType = false;
                }

                //render what we have made
                var rendered = Mustache.render(template,data);
                el.html(rendered).addClass('rendered');

            }).fail(function(jqXHR, textStatus, errorThrown){}).always(function(){});

        //})

    });
//kick off
$(function(){
    if($('.breaking-scoreboard-mod')){
        var $scoreboards = $('.breaking-scoreboard-mod');
        $.each($scoreboards,function(){
            var that = this,
                $that = $(this);
                //following line added by csherlin 4/25
                bcom.breakingScoreboard($that,that.getAttribute('data-league'),that.getAttribute('data-game-code'));
                //bcom.breakingScoreboard($that,that.dataset.league,that.dataset.gameCode);
        });

    }
});