if (typeof bcom === "undefined") { bcom = {};}

bcom.videoPlayer = {};

// Initialization of bcom.video structures and the jQuery video plugin
$(function() {

	// jQuery plugin state
	var brightcove_player_id = 0;

	// we need to know how many players of each type are loaded, so that we don't bring in the same vendor video javascript more than once!
	var players_loaded = {
		"brightcove":0,
		"ndn"      	:0,
		"cinesport"	:0,
		"perform"  	:0,
		"ustream"  	:0,
		"nesn"     	:0
	};

	// Player configuration data
	var default_type = 'article';

	// default height and widths instead of setting the ints below
	var default_width = $('.inner').width() || 674;
	var default_height = (default_width * 9)/16 || 402;

	// Schema revisions (1-based).
	// Schemas contain default property/meta pertaining to each unique vendor.
	// It also might be the case that in the future, different players from the same vendor might also get a unique schema entry.
	var schemas = [
	//Brightcove
	{
		_default: {
			build_mode: 'brightcove',
			_init: init_brightcove,
			className: 'BrightcoveExperience',
			params: {
				wmode: 'transparent',
				bgcolor: '#FFFFFF',
				publisherID: '245991542',
				isVid: 'true',
				isUI: 'true',
				dynamicStreaming: 'true',
				includeAPI: 'true',
				// escapeAdRequest: 'false',
				templateReadyHandler: 'bcom.videoPlayer.video.templateReady',
				adServerURL: function(options){
					var loc = window.location;
					var baseUrl = 'http://pubads.g.doubleclick.net/gampad/ads?';
					var buildCustomParams = function() {
						var keyValuePairs = bcom.dfp.keyValuePairs;
						var customParamString = 'pos=preroll&';
						for ( var key in keyValuePairs ) {
							customParamString += key + '=' + keyValuePairs[key] + '&';
						}
						return encodeURIComponent( customParamString.slice( 0, customParamString.length - 1 ) );
					};
					var additionalParams = [
						'env=vp',
						'&gdfp_req=1',
						'&impl=s',
						'&output=xml_vast2',
						'&cmsid=5699',
						'&iu=' + bcom.dfp.networkCode + '/' + bcom.dfp.adUnit,
						'&sz=640x480',
						'&unviewed_position_start=1',
						'&description_url=' + encodeURIComponent('http://boston.com'),
						'&cust_params=' + buildCustomParams(),
						'&ciu_szs=300x250'
					].join('');
					return baseUrl + additionalParams;
				} // end adServerURL
			}
		},
		article: {
			params: {
				playerID: '2080955193001',
				autoStart: false
			}
		},
		articleNoTremorAds: {
			params: {
				playerID: '2148987492001',
				autoStart: false
			}
		},
		multiclip: {
			params: {
				playerID: '2253104600001',
				playerKey: 'AQ~~,AAAAAA6piHY~,DqRT40XOAr8TkujSe-QpRyR1KRT5m7dL'
				//width: default_width,
				//height: default_width
			}
		}
	},

	// NDN Player Configuration
	{
		_default: {
			_init: init_ndn,
			build_mode: 'ndn',
			freewheel: 90106,
			section: "boston.com"
			//width: default_width,
			//height: default_height
		},
		clicktoplay: {
			wid: 2 // 1 is autoplay, 2 is click to play
		},
		autoplay: {
			wid: 1
		}
	},

	// CineSport Player Configuration
	{
		_default: {
			build_mode: 'cinesport',
			_init: init_cinesport
			//width: default_width,
			//height: default_height
		}
	},
	//perform
	{
		_default:{
			build_mode: 'perform',
			_init: init_perform
		}
	},
	//ustream
	{
		_default:{
			build_mode: 'ustream',
			_init: init_ustream
		}
	},
	//nesn
	{
		_default:{
			build_mode: 'nesn',
			_init: init_nesn
		}
	}
	// Future schema revisions go here!
	];

	bcom.videoPlayer = {
		video: {
			players: {},

			templateReady: function(event) {
				if (!event || !event.target || !event.target.experience) {
					//console.log("No Experience ID available");
				}
				var experienceID = event.target.experience.id;
				//console.log("Template ready for ID: " + experienceID);

				if (!bcom.videoPlayer.video.players[experienceID]) {
					bcom.videoPlayer.video.players[experienceID] = BcomVideoPlayer();
					bcom.videoPlayer.video.players[experienceID].init(experienceID);
				}
			},
			init: function() {
				initVideoPlugin();
				$('.videoplayer').videoPlayer();
				//setupResize();
			}
		}
	};

	function setupResize() {
		//console.log("setupResize");

		var debounced = $.debounce(250, function() {
			for (var id in bcom.videoPlayer.video.players) {
				var thisPlayer = bcom.videoPlayer.video.players[id];
				if (thisPlayer) {
					thisPlayer.resize();
				}
			}
		});

		$(window).resize(debounced);
	}

	function init_brightcove(options) {


		// In IE6/7, since brightcove.createExperiences() breaks when called before
		// DOM ready, abort if DOM is readyn't.
		if (!$.isReady && $.browser.msie && $.browser.version < 8) {
			return false;
		}
		var $el = $(this);
        var that = this;
		//console.log($el);
		var width = $el.parent().width();
		var height = Math.round(width * 0.56);

		options.params.width = width;
		options.params.height = height;

		//console.log($el.data('autostart'));
		if($el.data('autoplay') === true){
			options.params.autoStart = true;
		};
		//removed because we want to GET the height, not retreive it from an option
		// if (!options.params.width) options.params.width = width;
		// if (!options.params.height) options.params.height = height;

		// These options can be provided to force HTML 5, or to further configure Tremor Acudeo
		// options.params.forceHTML = "true";
		// options.params.tmdebug = "true";
		// options.params.AcudeoProgramID = "50f9bdd88310e";

		//Add needed scripts to the page if we haven't loaded it already

		//addVideoVendorScript("https://sadmin.brightcove.com/js/BrightcoveExperiences.js",options.build_mode,false);
        bcom.util.getScripts(['https://sadmin.brightcove.com/js/BrightcoveExperiences.js'],function(){


	        // Create object.
	        var id = 'myExperience' + (++brightcove_player_id),
	            obj = $('<object/>').attr('id', id).addClass(options.className).get(0);


	        // Create params.
	        $.each(options.params, function(name, value) {
	            var param = $('<param/>').attr('name', name.toString().replace(/"/g, '&quot;')).attr('value', value.toString().replace(/"/g, '&quot;')).get(0);

	            obj.appendChild(param); // Apparently jQuery 1.3.2 has a bug with $('obj').append(...)
	        });

	        // Append it!
	        that.html(obj);
			brightcove.createExperiences();


        });


	}

	function init_ndn(options) {

        addVideoVendorScript('http://launch.newsinc.com/js/embed.js',options.build_mode,true);

	}

	function init_cinesport(options) {
		var $el = $(this),
            videoID = $el.data('videoId'),
		    width = $el.parent().width(),
            autoPlay = $el.data('autoplay'),
		    height = Math.round(width * 0.56);

        //checking for true/false of autoplay
        if(autoPlay === false){
            autoPlay = '';
        } else {
            autoPlay = 'autostart=on;';
        };

		var $frame = $('<iframe name="csprt" frameborder="0" align="top,left" marginheight="0" marginwidth="0" scrolling="no"></iframe>');

		var src = "http://cinesport.boston.com/inline/" + videoID + "/#" + autoPlay + "nologo;social=off";

		$frame.attr('src', src).attr('width', width).attr('height', height);

		this.html($frame);

		addVideoVendorScript('http://edgecdn.cinesport.com/container.js',options.build_mode,true)
	}

	function init_perform(options){
		var divId = $(this).attr('id'),
			playerId = $(this).data('player-id'),
			channelId = $(this).data('channel-id'),
            videoId = $(this).data('video-id');

            console.log('The div id: ' + divId);
            console.log('The player id: ' + playerId);
            console.log('The channel id: ' + channelId);
            console.log('The video id: ' + videoId);

        // if(players_loaded[options.build_mode] === 0){
        //     getScripts(['http://static.eplayer.performgroup.com/flash/js/swfobject.js','http://static.eplayer.performgroup.com/flash/js/performgroup.js'],function(){
        //         addResponsivePlayer(videoID, '', '', videoID, 'eplayer41', {autoHide:true, age:1385051870805});
        //     });
        // } else {
        //     addResponsivePlayer(videoID, '', '', videoID, 'eplayer41', {autoHide:true, age:1385051870805});
        // };

		addVideoVendorScript(["http://static.eplayer.performgroup.com/flash/js/swfobject.js","http://static.eplayer.performgroup.com/flash/js/performgroup.js"],options.build_mode,false);

		// the below comparison checks for great than 1 because we need to run this AFTER the first vendor code in placed in the head, instead of 0, at first run.
		if (players_loaded[options.build_mode] > 1){
			addResponsivePlayer(playerId, channelId, videoId, divId, 'eplayer41', {autoHide:true, age:1385051870805});
		} else {
			setTimeout(function(){
				addResponsivePlayer(playerId, channelId, videoId, divId, 'eplayer41', {autoHide:true, age:1385051870805});
			},3000);
		}
	}

	function init_ustream(options){
		var $that = $(this),
			videoId = $that.attr('id');

		$('<iframe>').attr('src','http://www.ustream.tv/embed/'+videoId+'?v=3&wmode=direct').appendTo($that);
	}

	function init_nesn(options){
        var $el = $(this),
            widgetId = $el.attr('id'),
		    videoId = $el.data('videoId'),
			videoType = $el.data('videoType'),
            playerType = $el.data('playerType');

        addVideoVendorScript("http://www.springboardplatform.com/js/overlay",options.build_mode,false);

        $('<iframe id="' + playerType + '_' + videoId + '" src="http://cms.springboardplatform.com/embed_iframe/899/' +videoType+ '/' + videoId + '/' + playerType + '/nesn.com/10" width="100%" height="100%" frameborder="0" scrolling="no">').appendTo($(this));
	}

	function addVideoVendorScript(vendorSrc,build_mode,async){
			//have we done this before for a particular player?
			if(players_loaded[build_mode] > 0){
				//if so, bounce
				return false;
			}
			if (typeof vendorSrc === 'string'){
				vendorSrc = [ vendorSrc ];
			}
			for(i=0;i<vendorSrc.length;i++){
				bcom.util.addScriptToHead(vendorSrc[i]);
			}
			players_loaded[build_mode]++;
			//console.log(players_loaded);
	}

	function initVideoPlugin() {
		//console.log('initVideoPlayer')

		// jQuery videoPlayer "plugin"
		document.domain = document.domain;

		$.fn.videoPlayer = function(opts) {
			return this.each(function() {

				var widget = $(this),
					data, matches,

					child = widget.children().eq(0),
					style = child.attr('style') || '',

					// Get schema rev and type from from data- attributes.
					rev = widget.attr('data-schema') || 1,
					type = widget.attr('data-player') || default_type,


					defaults = [{
						'reload': false
					}],

					settings = $.extend(defaults, opts);

								//console.log(widget);
				// Init options from attributes.
				options = $.extend({}, {
					params: deparam(widget.attr('data-params') || ''),
					flashvars: deparam(widget.attr('data-flashvars') || ''),
					// not yet used
					attributes: deparam(widget.attr('data-attributes') || '') // not yet used
				}, deparam(widget.attr('data-options') || ''));

				// Init element data if not already initialized.
				widget.data('videoPlayer', data = widget.data('videoPlayer') || {});

				// Don't re-initialize an already-initializied video player!
				if (data.ready && !settings.reload) {
					return;
				}


				// For this widget, we only want to merge schemas array items from
				// 0 <= N < rev.
				$.each(schemas, function(i, v) {
					defaults[i] = v;
					return i < rev - 1;
				});

				// Shallow merge defaults from end to beginning, overriding older defaults
				// with newer defaults.
				defaults = $.extend.apply(null, [{}].concat(defaults));

				// Override default width / height with any inline style width / height.
				// if (matches === style.match(/(?:^|\s|;)width\s*:\s*(\d+)px/i)) {
				// 	options.params.width = child.width() || matches[1];
				// }
				// if (matches === style.match(/(?:^|\s|;)height\s*:\s*(\d+)px/i)) {
				// 	options.params.height = child.height() || matches[1];
				// }

				// Merge explicit data-options + width + height -> type-specific defaults
				// -> global (_default) defaults.
				options = $.extend(true, {}, defaults._default, defaults[type], options, opts);

				// Deep-recurse into options object, executing any functions (except for
				// the _init function).
				(function revive(obj) {
					var k, v;
					for (k in obj) {
						v = obj[k];
						if (Object.prototype.toString.call(v) === '[object Object]') {
							revive(v);
						} else if ($.isFunction(v) && k !== '_init') {
							obj[k] = v(options);
						}
					}
				})(options);

				// If an init function is specified, run it now. If init function doesn't
				// return false, assume success and set flag in widget data to prevent
				// re-initialization.
				if ($.isFunction(options._init)) {
					data.ready = options._init.call(widget, options) !== false;
				}
			});
		};
	}
});