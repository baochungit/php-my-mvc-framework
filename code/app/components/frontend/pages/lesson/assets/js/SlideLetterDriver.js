app.drivers.SlideLetterDriver = new function() { var me = this;

	me.initialize = function() {};
	
	me.run = function(slide) {
	  require(['js/easeljs-0.6.0.min', 'js/preloadjs-0.2.0.min', 'js/soundjs-0.3.0.min', 'js/soundjs/soundjs.flashplugin-0.3.0.min'], function() {
  
  		// prepare some stuff
  		createjs.FlashPlugin.BASE_PATH = requirejs.s.contexts._.config.baseUrl + '/js/soundjs/'; // Initialize the base path from this document to the Flash Plugin
  		if (!createjs.SoundJS.checkPlugin(true)) {
  			alert("Error!");
  			return;
  		}
  	
  		var preload = new createjs.PreloadJS();
  		preload.installPlugin(createjs.SoundJS);
  		
			var manifest = slide.manifest;
			if (manifest.length > 0) {
	  		var manifest = slide.manifest;
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
			'<div class="letter-lower">' + slide.data.lower + '</div>' +
			'<div class="letter-upper">' + slide.data.upper + '</div>'
		);
		
		app.$slideContent.html($contentOnFly);		
		
		var $letterLower = app.$slideContent.find('.letter-lower');
		var $letterUpper = app.$slideContent.find('.letter-upper');
		
		$letterLower.click(function(e) {
			createjs.SoundJS.play('bgsound');
		});
	}
};