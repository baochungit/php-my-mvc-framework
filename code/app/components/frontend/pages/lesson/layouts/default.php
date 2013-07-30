<?php	defined( '_CEXEC' ) or die( 'Restricted access' ); 
	Template::addJs($this->base_url . '/assets/js/require.js', 'end-head');
	Template::addJs($this->base_url . '/assets/js/jquery-1.7.1.min.js', 'end-head');
?>
<div id="app-frame"></div>
<script>
	require.config({ baseUrl: '<?php echo $this->base_url ?>/assets', map: {'*': {'style': 'js/require-css/css'}}});
	
	require(['style!css/app', 'js/app'], function() {
		app.loadSlides(<?php echo json_encode($slides) ?>);
		app.run();
	});	
</script>