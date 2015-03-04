

(function(){

  function setCookie(key, value) {
      var expires = new Date();
      expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
      document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  }
  
  function convertData(d){
    var converted = {
                    "title"       : d.head,
                    "body"        : d.subhead,
                    "categories"  : _.map(d.section, function(s){ return s.toUpperCase().replace('-', '_')})
                  }
    if (d.has_image){
      converted.imageUrl = d.image.thumb_quick;
    }
    return converted;
  }
  
  // set cookie to Ian's ugc account for now
  setCookie("pathAuth", "63b690a7-9e86-4bb5-9c63-981e2f917fc5");
  $.when(
     $.getJSON('/data/stream-prime.json'),
     $.getJSON('/data/stream-feature.json')
  ).done(function (main, featured){
    var initialData = { 
                        'main': main[0].articles,
                        'featured': featured[0].articles
                      };
    var toCreate = [];
    $.each(initialData.main, function(_, data){
      var converted = convertData(data);
      converted.categories.push("MAIN_STREAM");
      converted.type = "TEASE";
      toCreate.push(converted);
    });
    $.each(initialData.featured, function(_, data){
      var converted = convertData(data);
      converted.categories.push("FEATURED_STREAM");
      converted.type = "TEASE";
      toCreate.push(converted);
    });
    
    $.each(toCreate, function(_, data){
      $.ajax({
        type: "POST",
        url: "/ugc/interactions",
        data: JSON.stringify(data),
        contentType: "application/json"
      });
      
    });
      
      // upstatement example
      // {
      //   "head": "Lester Injured, but Sox Still Rolling",
      //   "slug": "lester-injured",
      //   "subhead": "The Sox erupted for five runs in the second inning, but Lester left shortly after with a hip injury. <span class='horiz-list'><i class='list-item'><a href='#URL:story'>Live Blog</a></i><i class='list-item'><a href='#URL:story'>Box Score</a></i></span>",
      //   "category": "Red Sox",
      //   "section": [
      //     "redsox",
      //     "sports"
      //   ],
      //   "timestamp": "Yesterday",
      //   "is_live": true,
      //   "has_scoreboard": true,
      //   "scoreboard": {
      //     "meta02": "Final",
      //     "sponsor": "espn",
      //     "team01_name": "Red Sox",
      //     "team01_abr": "Bos",
      //     "team01_logo": "sox-logo",
      //     "team01_score": "4",
      //     "team02_name": "Blue Jays",
      //     "team02_abr": "Tor",
      //     "team02_logo": "jays-logo",
      //     "team02_score": "2"
      //   }
      // }
      // 
      
      
      // ugc example
      // {
      //   
      //     "body": "subhead here", 
      //     "categories": [
      //         "MAIN_STREAM"
      //     ], 
      //     "createDate": 1382715639540, 
      //     "dislikeCount": 0, 
      //     "firstPostDate": 1357237839238, 
      //     "id": 12282258, 
      //     "ignored": false, 
      //     "imageUrl": "http://lorempixel.com/260/160/sports/1/", 
      //     "lastPostDate": 1379357045944, 
      //     "likeCount": 0, 
      //     "parentKey": 0, 
      //     "replyCount": 0, 
      //     "title": "head here", 
      //     "token": "417f0b7d-b5a3-4e56-868e-65364aae92b5", 
      //     "totalPost": 29, 
      //     "touchDate": 1382715639540, 
      //     "type": "TEASE"
      // }
    
    
  });

})();