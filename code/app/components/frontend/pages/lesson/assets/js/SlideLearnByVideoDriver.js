app.drivers.SlideLearnByVideoDriver = new function() { var me = this;

	me.initialize = function() {};
	
	me.run = function(slide) {
		require(['js/easeljs-0.6.0.min', 'js/preloadjs-0.2.0.min', 'js/jwplayer/jwplayer', 'style!css/SlideLearnByVideoDriver'], function() {
			var manifest = slide.manifest;
			if (manifest.length > 0) {
				var preload = new createjs.PreloadJS();
				
				preload.loadManifest(manifest);
				
				preload.onProgress = function(e) {
					app.$slideContent.html('loading...');
				};
				
				preload.onComplete = function() {
					me.main(slide);
				}
			}
			else {
				me.main(slide);
			}
		});
		
	}
	
	me.main = function(slide) {
		var $contentOnFly = $(
			'<div id="main-video">Loading the player...</div>' +
			'<ul id="caption-list"></ul>'
		);
		
		app.$slideContent.html($contentOnFly);		
		
		jwplayer.key="2OGpCzyEIyimaZZaporWnf9festCvCS8Qj2T7w==";
		var $mainVideo = jwplayer('main-video').setup({
        file: slide.data.videourl,
        image: "",
				width: 640,
				height: 360,
				tracks: [{ 
            file: slide.data.subtitle, 
            label: "English",
            kind: "captions",
            default: true 
        }]/*,
				logo: {
	        file: requirejs.s.contexts._.config.baseUrl + 'myLogo.png'
    		}*/
    });

		var $captionList = app.$slideContent.find('#caption-list');
		var caption = {begin: 0, text: ""};
		$mainVideo.onTime(function() {
			var c = $mainVideo.getCurrentCaption();
			if (typeof c[1].begin != 'undefined' && caption != c[1]) {
				caption = c[1];
				
				$captionList.find('li.active').removeClass('active');
				
				var $captionListCurrentItem = $captionList.find('li[begin="'+ caption.begin +'"]');
				$captionListCurrentItem.addClass('active');
				
				if ($captionListCurrentItem.length > 0) {
				  var parentCHeight = $captionList.prop('clientHeight');
				  var parentSHeight = $captionList.prop('scrollHeight');
				  if (parentSHeight > parentCHeight) {
				    var nodeHeight = $captionListCurrentItem.prop('clientHeight');
				    var nodeOffset = $captionListCurrentItem.prop('offsetTop');
				    var scrollOffset = nodeOffset + nodeHeight/2 - parentCHeight/2;
						$captionList.animate({scrollTop: scrollOffset}, 500);
				  }
				}
			}
		});
		
		$mainVideo.setCurrentCaptions(1);
		var buildCaptionList = function() {
			var captionList = $mainVideo.getCaptionList();
			//console.log(captionList);
			
			$captionList.html('');
			$.each(captionList, function(index, c) {
				if (typeof c.begin != 'undefined' && c.text != '') {
        	$captionList.append('<li begin="' + c.begin + '">' + c.text + '</li>');
				}
      });

			$captionList.find('li').live('click', function(e) {
				$mainVideo.seek($(this).attr('begin'));
	    });
			
			$mainVideo.setCurrentCaptions(0);
		}
		
		$mainVideo.onReady(function() {
			//$mainVideo.setControls(false);
			setTimeout(function() {	buildCaptionList() }, 500);
		});
		$mainVideo.onFullscreen(function(o) {
			//console.log(o.fullscreen);
			if (o.fullscreen == true)
				$mainVideo.setCurrentCaptions(1);
			else
				$mainVideo.setCurrentCaptions(0);
		});
		//$mainVideo.onCaptionsChange(buildCaptionList);
	}

};