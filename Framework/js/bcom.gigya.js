
//////////// src: scripts/_bcom-gigya.js ////////////

if (typeof bcom === "undefined") { bcom = {}; }

/*-------------
 * BCOM Gigya module
 *
 * Used for putting the Gigya social
 * module on a page
 */
bcom.gigya = {

    /*--------------
     * bcom.gigya.init()
     *
     * Expects the ID of an element
     * that will be turned into the
     * Gigya module.
     *
     * DOM element should resemble:
     * <div id="gigya-top" data-networks="facebook,twitter" data-canonical="example.com/full-article" data-shorturl="example.com" data-headline="Hello World">
     */
    init: function(id) {
        var $elem, act, uiParams;

        $elem = $("#" + id);
        this.canonicalURL = $elem.attr("data-canonical");
        this.shortURL = $elem.attr("data-shorturl");
        this.headline = $elem.attr("data-headline");
        this.thumbnail = $elem.attr("data-thumbnail");
        this.description = $elem.attr("data-description");
        this.networks = this.getNetworks($elem.attr("data-networks"));
        this.thumbType = $elem.attr("data-thumb-type");
        this.showCounts = $elem.attr("data-show-counts");
        this.iconsOnly = $elem.attr("data-icons");

		//changing the default from right to top if attr left blank of undefined
		if(this.showCounts == undefined || this.showCounts == ''){
			this.showCounts = 'top';
		}
        act = this.createUserAction();
        uiParams = this.setUIParams(act, id);
        //gigya.socialize.showShareBarUI(uiParams);
        gigya.socialize.showShareBarUI(uiParams);
    },

    createUserAction: function() {
        var act;
        act = new gigya.socialize.UserAction();
        act.setLinkBack(this.shortURL);
        act.setTitle(this.headline);
        act.setDescription(this.description);
        if(this.thumbType === 'image'){
	        var image = {
			//we should really set a default image to use in the instance that we don't have an image set for an article
	                type: 'image',
	                src: this.thumbnail,
	                href: 'http://graphics8.nytimes.com'
	        }
			act.addMediaItem(image);
		}
		if(this.thumbType === 'video'){
			var video = {
                src: 'http://www.youtube.com/v/fzzjgBAaWZw&hl=en&fs=1',
                previewImageURL: 'http://graphics8.nytimes.com/images/2006/01/02/science/03cute.large2.jpg',
                type: 'flash'
            }
			act.addMediaItem(video);

		}
        return act;
    },

    getNetworks: function(data) {
        if (data) {
            return data.split(",");
        }

        // Default list of networks to use
        // if none are provided
        return ["facebook",
                "twitter",
                "googleplus-share",
                "pinterest",
                "linkedin",
                "share"];
    },

    setUIParams: function(act, id) {
        var params, self;

        self = this;

        params = {
            containerID: id,
            moreEnabledProviders: "reddit,tumblr,evernote,gmail,pinterest,bitly,delicious",
            shareButtons: [],
            //showCounts: "top",-show-counts
            //showCounts: this.showCounts,
            //iconsOnly:	this.iconsOnly,
            showCounts: 'none',
            iconsOnly: 'true',
            userAction: act,
            shortURLs: "never",
            width:400  
           // buttonTemplate: "<img src='$iconImg'/>"
        }

        var len = self.networks.length;
        for(var i = 0; i < len; i++) {
            var network = self.networks[i];

            switch(network) {
                case "facebook":
                    params.shareButtons.push(
                        {provider: "Facebook",
                         iconImgUp:'./social_icons/facebook-256.png'

                    });
                    break;
                case "twitter":
                    params.shareButtons.push(
                        { provider:"Twitter",
                          related: "BostonDotCom,BostonGlobe",
                          via:"BostonDotCom",
                          countURL: self.canonical,
                          iconImgUp:'./social_icons/twitter-256.png'
                        });
                     params["twitterUserAction"] = { "title": this.headline + " - via @bostondotcom" }
                    break;
                case "googleplus":
                    params.shareButtons.push(
                        { provider:"googleplus",
                          iconImgUp:'./social_icons/googleplus-256.png'
                    });
                    break;
                case "pinterest":
                    params.shareButtons.push(
                        { provider:"pinterest",
                          iconImgUp:'./social_icons/pinterest-256.png'

                    });
                    break;
                case "linkedin":
                    params.shareButtons.push(
                        { provider:"linkedin",
                          iconImgUp:'./social_icons/linkedin-256.png'

                    });
                    break;
                case "share":
                    params.shareButtons.push(
                        { provider:"share",
                          tooltip:"Share on other social networks",
                          enableCount:false
                        });
                    break;
                case "email":
                    params.shareButtons.push({
                        provider:"email",
                        iconImgUp:'./social_icons/mail-256.png'

                });
                    break;
                case "reddit":
                    params.shareButtons.push({provider:"Reddit"});
                    break;
                case "stumbleupon":
                    params.shareButtons.push({provider:"Stumbleupon"});
                    break;
                case "myspace":
                    params.shareButtons.push({provider:"Myspace"});
                    break;
                case "tumblr":
                    params.shareButtons.push({provider:"Tumblr"});
                    break;
                default:
                    break;
            }
        }

        return params;
    }
};


//////////// src: scripts/_bcom-gigya-run.js ////////////
bcom.share = {

    updateCommentLength: function() {
        var $target = $('.char-count'), 
            $textarea = $('.share-message-textarea'),
            textlength = $textarea.val().length,
            tweetCharLimit = 140;

        $target.text(textlength);
        if (textlength > 140) {
            $target.addClass('length-warning').css('backgroundColor','red');
        } else {
            $target.removeClass('length-warning');
        }
    },
    showCommentBox: function(e){
        var provider = e.currentTarget.dataset.provider;
        $('input[name="provider"]').val(provider);         
        //refreshShareWidget($(this).parents('.share-widget')); 
        // TODO
        // - the box should be cleared of former values and reset prior to opening ~ that might have a better home with shareTrigger clearning out the form before adding content to it.
        // - get the meta needed to add action/send info for gigya
        this.updateCommentLength();
        $('.share-message').slideDown(500);
        $('.share-icon-list').slideUp(500);
        return false;        
    },
    hideCommentBox: function(){
        $('.share-message').slideUp(500);
        $('.share-icon-list').slideDown(500);
        return false;       
    },
    shareTrigger: function(e){
        console.log(e);
        console.log('shareTrigger triggered');
        var shareMeta = e.target.dataset;
        console.log(shareMeta);
        $('form.share-form .share-message-textarea').val(shareMeta.headline + ' ' + shareMeta.shorturl);
        $('input[name="canonicalURL"]').val(shareMeta.canonical);
        $('input[name="shortURL"]').val(shareMeta.shorturl);
        $('input[name="headline"]').val(shareMeta.headline);
        $('input[name="thumbnail"]').val(shareMeta.thumbnail);
        $('input[name="description"]').val(shareMeta.description);
        $('input[name="thumb-type"]').val(shareMeta.thumbType);
      
    },
    submitShare: function(){

    }

};
$(function(){
    $('.share-icon-link').on('click', function(e){
        bcom.share.showCommentBox(e);
    });
    $('.share-close').on('click', function(){
        bcom.share.hideCommentBox();
    });
    $('.share-trigger').on('click', function(e){
        bcom.share.shareTrigger(e);
    });
    $('.share-message-textarea').on('keyup change focus', function(){
        bcom.share.updateCommentLength();
        //console.log('something is happening with share message textarea');
    });   
    $('form.share-form').on('submit',function(e){
        console.log(this);
        console.log(e);
        e.preventDefault();
        var options = {};
            options.canonical = $('input[name="canonicalURL"]').val(),
            options.shorturl = $('input[name="shortURL"]').val(),
            options.headline = $('input[name="headline"]').val(),
            options.thumbnail = $('input[name="thumbnail"]').val(),
            options.description = $('input[name="description"]').val(),
            options.thumbType = $('input[name="thumb-type"]').val(),
            options.provider = $('input[name="provider"]').val();
        console.log(options);
    })
});
