var app = new function() { var me = this;
	
	me.drivers = [];
	
	me.$mainFrame = $('#app-frame');
	
	me.$mainFrame.append('<div class="previous-but"> prev </div><div class="slide-content"></div><div class="next-but"> next </div>');

	me.$previousBut = me.$mainFrame.find('.previous-but');
	me.$slideContent = me.$mainFrame.find('.slide-content');
	me.$nextBut = me.$mainFrame.find('.next-but');
	
	var slides = [];
	var slideIndex = 0;
	
	me.loadSlides = function(slides) {
		me.slides = slides || [];
	}
	
  me.run = function() {
		if (me.slides.length <= 1) {
			me.$previousBut.hide();
			me.$nextBut.hide();
		}
		
		window.onhashchange = function() {
			me.slideIndex = window.location.hash.replace('#', '') || 0;
			buildSlide(me.slideIndex);
  	}();
		
		me.$previousBut.click(function(e) {
      if (me.slideIndex > 0) {
				me.slideIndex--;
				buildSlide(me.slideIndex);
			}
			else {
				$(this).addClass('disabled');
			}
    });

		me.$nextBut.click(function(e) {
      if (me.slideIndex < me.slides.length - 1) {
				me.slideIndex++;
				buildSlide(me.slideIndex);
			}
			else {
				$(this).addClass('disabled');
			}	
    });		

		
		function buildSlide(index) {
			var slide = me.slides[index] || {};
			
			if (typeof slide.driver != 'undefined') {
		    require(['js/' + slide.driver], function() { // load slide driver
					me.drivers[slide.driver].run(slide);
				});
			}
		}
		
  }

};