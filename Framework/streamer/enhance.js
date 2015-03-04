function enhance(pubnub, callback){
  $('.enhanced').remove();
  console.log('...enhanced');
  var streamLink = '<li class="enhanced"><a class="stream" data-action-id="{{id}}" data-action-type="ia" href="#">Stream</a></li>';
  $('.comment').each(function(i, c){
    var $c = $(c)
    ,   cid = $c.attr('id').replace('comment-', '');   
    $c.find('> .comment-holder > .comment-footer > .admin-actions').append(streamLink.replace("{{id}}", cid));
  });

  $('#comments').off('click');
  $('#comments').on('click', '.stream', function(e){
    e.preventDefault();
    var $t      = $(e.target)
    ,   $c      = $t.parents('.comment')
    ,   cid     = $c.attr('id').replace('comment-', '')
    ,   aurl    = $('#bdc_emailWidget').first().attr('data-canonical')
    ,   message = {
          method   : 'create',
          model    : {
            timestamp   : (new Date()).toISOString(),
            is_social 	: true,
            is_comment	: true,
			      comment 	: {
              id : cid,
              user 			: {
                profile 		: $c.find('.avatar-holder a').attr('href'),
                name        : $c.find('.avatar-holder a img').attr('alt'),
                avatar  		: $c.find('.avatar-holder a img').attr('src'),
              },

              text 			: $c.find('.comment-body').html(),
              total :   $('#comments').attr("data-comment-count")
            },
            title		: $('meta[property="og:title"]').attr('content'),
            url     : aurl,
            category	: [
              "Sports"
            ],
          }
        }
      , data    = {
          channel: 'homepage:all',
        	message: message,
  				callback : function(details) {
  					var success  = details[0];
  					var response = details[1];
  					var $message;
  					if (success) { 
  						console.log( "Success!", response );
  					}
  					if (!success) { 
  						console.log( "Fail!", response );
  					}
  				}
      	};
    console.log("data", data);    
    pubnub.publish(data);
    

  });
  callback();
}
$(function(){
  $.getScript('http://cdn.pubnub.com/pubnub.min.js', function(){
    var pubnub = PUBNUB.init({
      publish_key		: "pub-c-127a2b10-aa80-4a62-ac2e-30a1fce6f220",
    	subscribe_key	: "sub-c-4a78c224-164c-11e3-9f04-02ee2ddab7fe"
    });
    enhance(pubnub, function(){
      //$('.stream').first().trigger("click");
    });
    
  })
})