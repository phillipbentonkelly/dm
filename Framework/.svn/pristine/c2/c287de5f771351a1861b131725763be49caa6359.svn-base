(function(){
  console.log("publish...");
  var pubnub = PUBNUB.init({
    publish_key   : "pub-c-127a2b10-aa80-4a62-ac2e-30a1fce6f220",
    subscribe_key : "sub-c-4a78c224-164c-11e3-9f04-02ee2ddab7fe",

  });
  var feed = location.hash ? location.hash.substr(1) : "main";
  var channel = "backbone-collection-" + feed;
  var method = "create";
  var model = {
    "head": "Sample Submittted head",
    "slug": "slug",
    "subhead": "subhead",
    "category": "category",
    "section": [
        "submitted",
        "published"
    ],
    "timestamp": "Yesterday",
    "is_live": true,
    "has_scoreboard": false
  };  
  var uuid = "7c2483eb-9393-4be9-ac59-6f73a111f79e";
  var message = {
                  method : method,
                  model  : model,
                  uuid  : uuid
                };
  message = JSON.stringify(message);
  pubnub.publish({channel: channel,
                  message: message,
                  callback : function(details) {
                      var success  = details[0]
                      ,   response = details[1];

                      if (success)  console.log( "Success!", response );
                      if (!success) console.log( "Fail!",    response );
                  }
                });
})();