<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendPage {
		
		private $layout_name = 'default';
		private $base_url = '';

		function __construct() {
			$page = Http::getQuery('page', 'home');
			$this->base_url = APP_PATH . '/' . Config::get('components_dir') . '/backend/pages/' . $page;	
		}
		
		function getOutput($case = 'default') {
			ob_start();
			
			$this->{'case' . Common::styleActionName($case)}();
			
			// load layout			
			$layout_path = $this->base_url . '/layouts/' . $this->layout_name . '.php';

			if (file_exists($layout_path)) {
				include_once($layout_path);
			}
			
			$output = ob_get_contents();
			ob_end_clean();
			
			return $output;
		}
		
		function setLayout($layout_name = 'default') {
			$this->layout_name = $layout_name;
		}
		
	}