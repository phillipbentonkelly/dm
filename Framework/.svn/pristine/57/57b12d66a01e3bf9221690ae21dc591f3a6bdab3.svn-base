if (typeof bcom === "undefined") {
  bcom = {};
}

bcom.videoPlayer = {};

// Represents Smart Player API-related code for a specific instance of a Brightcove player
var BcomVideoPlayer = function() {

  // Brightcove Smart API References
  var thisExperienceID, player, videoPlayerModule, experienceModule, contentModule;
  var isInitialized = false,
    playerID;

  // Constructor requires the experienceID to initialize
  var BcomVideoPlayer = {};
  BcomVideoPlayer.init = function(experienceID) {
    console.log("Creating new player plugin for " + experienceID);
    thisExperienceID = experienceID;
    player = brightcove.api.getExperience(experienceID);
    videoPlayerModule = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    experienceModule = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    contentModule = player.getModule(brightcove.api.modules.APIModules.CONTENT);

    setupListeners();
  };

  BcomVideoPlayer.resize = function() {
    var parentWidth = $('#' + thisExperienceID).parent().width();
    console.log("parentWidth is " + parentWidth);
    var computedHeight = Math.round(parentWidth / (16.0 / 9.0));

    if (experienceModule) {
      experienceModule.setSize(parentWidth, computedHeight);
    }
  }

  // Functions related to BC API
  function setupMilestones() { /* Setting of Omniture variables during milestone calls */
    s.Media.monitor = function(s, media) {
      console.log("MONITOR: " + media.event);
      if (media.event == "MILESTONE") { /* Use to set additional data points during milestone calls */
        //s.Media.track(media.name); Uncomment if setting extra milestone data.
      }
    }
  }

  function onPlay(event) {
    console.log(thisExperienceID + ' : onPlay : ' + event.position);
    // Setting of Omniture variables when playback begins
    var trk;

    if (event.position === 0.0) {
      trk = extractTrackingData(event, true);
      console.log('[omniture] open/play : ' + trk.mediaName + ', ' + trk.mediaLength + ', ' + trk.mediaPlayerName);
      s.Media.open(trk.mediaName, trk.mediaLength, trk.mediaPlayerName);
      s.Media.play(trk.mediaName, trk.mediaOffset);
    } else {
      trk = extractTrackingData(event, false);
      console.log('[omniture] play : ' + trk.mediaName + ', ' + trk.mediaOffset);
      s.Media.play(trk.mediaName, trk.mediaOffset);
    }
  }

  function onStop(event) {
    console.log(thisExperienceID + ' : onStop : ' + event.position);
    // Setting of Omniture variables when playback stops
    var trk = extractTrackingData(event, false);
    if ((trk.mediaLength - trk.mediaOffset) <= 2) {
      console.log('[omniture] stop/close : ' + trk.mediaName + ', ' + trk.mediaOffset);
      s.Media.stop(trk.mediaName, trk.mediaOffset);
      s.Media.close(trk.mediaName);
    } else {
      console.log('[omniture] stop : ' + trk.mediaName + ', ' + trk.mediaOffset);
      s.Media.stop(trk.mediaName, trk.mediaOffset);
    }
  }

  function extractTrackingData(event, setContextVars) {
    var data = {};
    data.mediaLength = event.duration;
    data.mediaOffset = Math.floor(event.position);
    data.mediaID = (event.media.id).toString();
    data.mediaFriendly = event.media.displayName;
    data.mediaName = data.mediaFriendly; //Format the video name here
    datamediaRefID = event.media.referenceId;
    data.mediaPlayerType = player.type;
    data.mediaPlayerName = "Brightcove Player " + playerID;
    data.mediaTagsArray = event.media.tags;

    if (setContextVars) {
      // These data points are optional. If using SC14, change context data variables to hard coded
      // variable names and change trackVars above.
      s.contextData['bc_tags'] = data.mediaTagsArray.toString();
      s.contextData['bc_refid'] = data.mediaRefID;
      s.contextData['bc_player'] = data.mediaPlayerName; //Player name is currently hard coded.  Will be dynamic in later releases.
      s.contextData['bc_playertype'] = data.mediaPlayerType; //Returns flash or html
    }

    return data;
  }

  function setPlayerID(id) {
    console.log("Got Player ID: " + id);
    playerID = id;
  }

  function setupListeners() {
    console.log('setupListeners')

    experienceModule.getExperienceID(setPlayerID);

    videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.PLAY, onPlay);
    videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.STOP, onStop);
    videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onStop);

    isInitialized = true;
  };

  BcomVideoPlayer.isInitialized = function() {
    return isInitialized;
  };
  BcomVideoPlayer.getExperienceID = function() {
    return thisExperienceID;
  };
  BcomVideoPlayer.getPlayerID = function() {
    return playerID;
  };

  return BcomVideoPlayer;
};

//////////// src: scripts/_bcom-videoplayer-run.js ////////////

// Initialization of bcom.video structures and the jQuery video plugin
$(function() {

	var debug = true;

	// jQuery plugin state
	var brightcove_player_id = 0;

	// Player configuration data
	var default_type = 'article';

	// default height and widths instead of setting the ints below
	var default_height = 402,
		default_width = 674;

	// Schema revisions (1-based).
	var schemas = [{
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
				templateReadyHandler: 'bcom.video.templateReady'
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
				playerKey: 'AQ~~,AAAAAA6piHY~,DqRT40XOAr8TkujSe-QpRyR1KRT5m7dL',
				width: default_width,
				height: default_width
			}
		}
	},

	// NDN Player Configuration
	{
		_default: {
			_init: init_ndn,
			freewheel: 90106,
			section: "boston.com",
			width: default_width,
			height: default_height
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
			_init: init_cinesport,
			width: default_width,
			height: default_height
		}
	}

	// Future schema revisions go here!
	];

	bcom.videoPlayer = {
		video: {
			players: {},

			templateReady: function(event) {
				if (!event || !event.target || !event.target.experience) {
					console.log("No Experience ID available");
				}
				var experienceID = event.target.experience.id;
				console.log("Template ready for ID: " + experienceID);

				if (!bcom.video.players[experienceID]) {
					bcom.video.players[experienceID] = BcomVideoPlayer();
					bcom.video.players[experienceID].init(experienceID);
				}
			},
			init: function() {
				initVideoPlugin();
				$('.videoplayer').videoPlayer();
				setupResize();
			}
		}
	};

	function setupResize() {
		console.log("setupResize");

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
		var width = $el.parent().width();
		var height = Math.round(width * 0.56);

		if (!options.params.width) options.params.width = width;
		if (!options.params.height) options.params.height = height;
		// These options can be provided to force HTML 5, or to further configure Tremor Acudeo
		// options.params.forceHTML = "true";
		// options.params.tmdebug = "true";
		// options.params.AcudeoProgramID = "50f9bdd88310e";

		//Add needed scripts to the page
		var $script = $('<script/>');
		$script.attr("type", "text/javascript");

		var src = "https://sadmin.brightcove.com/js/BrightcoveExperiences.js";

		$script.attr("src", src);
		console.log("S O U R C E -------------", src);
		$('head').append($script);
		//this.html($container);

		// Create object.
		var id = 'myExperience' + (++brightcove_player_id),
			obj = $('<object/>').attr('id', id).addClass(options.className).get(0);

		// Create params.
		$.each(options.params, function(name, value) {

			var param = $('<param/>').attr('name', name.toString().replace(/"/g, '&quot;')).attr('value', value.toString().replace(/"/g, '&quot;')).get(0);

			obj.appendChild(param); // Apparently jQuery 1.3.2 has a bug with $('obj').append(...)
		});

		// Append it!
		this.html(obj);

	}

	function init_ndn(options) {
		console.log("NDN");
		console.log("wid = " + options.wid);
		console.log("freewheel = " + options.freewheel);

		console.log(options);
		var $container = $('<div id="ndn_single_embed_1"/>');
		var $script = $('<script/>');
		$script.attr("type", "text/javascript");

		var src = "http://embed.newsinc.com/Single/embed.js?vid=" + options.params.vid + "&wid=" + options.wid + "&freewheel=" + options.freewheel + "&sitesection=" + options.section + "&height=" + options.height + "&width=" + options.width + "&parent=ndn_single_embed_1";

		$script.attr("src", src);
		$container.append($script);
		this.html($container);
	}

	function init_cinesport(options) {
		console.log("CineSport");

		var width = options.width;
		var height = options.height;

		var $frame = $('<iframe id="csprt" name="csprt" frameborder="0" align="top,left" marginheight="0" marginwidth="0" scrolling="no"></iframe>');

		var src = "http://cinesport.boston.com/inline/" + options.params.videoID + "/#nologo;social=off";

		$frame.attr('src', src);
		$frame.attr('width', width);
		$frame.attr('height', height);

		this.html($frame);

		var csprtjs = document.createElement('script');
		csprtjs.type = 'text/javascript';
		csprtjs.async = true;
		csprtjs.src = 'http://edgecdn.cinesport.com/container.js';
		var first_s = document.getElementsByTagName('script')[0];
		first_s.parentNode.insertBefore(csprtjs, first_s);
	}

	function initVideoPlugin() {
		console.log('initVideoPlayer')

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
				console.log(widget);
				// Init options from attributes.
				options = $.extend({}, {
					params: $.deparam(widget.attr('data-params') || ''),
					flashvars: $.deparam(widget.attr('data-flashvars') || ''),
					// not yet used
					attributes: $.deparam(widget.attr('data-attributes') || '') // not yet used
				}, $.deparam(widget.attr('data-options') || ''));

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
				if (matches = style.match(/(?:^|\s|;)width\s*:\s*(\d+)px/i)) {
					options.params.width = child.width() || matches[1];
				}
				if (matches = style.match(/(?:^|\s|;)height\s*:\s*(\d+)px/i)) {
					options.params.height = child.height() || matches[1];
				}

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
		}
	}
});