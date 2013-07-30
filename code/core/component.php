<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	require_once('cmvc/model.php');
	require_once('cmvc/view.php');
	require_once('cmvc/controller.php');

	class Component {
			
		private static $content = '';
		private static $name = '';
		private static $action = '';
		
		function execute() {
						
			self::$name = (self::$name != '') ? self::$name : Http::getQuery('com', Config::get('default_component'));			
			self::$action =  (self::$action != '') ? self::$action : Http::getQuery('action', 'default');

			$controller_path = APP_PATH . '/' . Config::get('components_dir') . '/' . self::$name . '/' . self::$name . '_controller.php';
			
			if (file_exists($controller_path)) {
				require_once($controller_path);
				
				$controller_classname = ucfirst(strtolower(self::$name)) . 'Controller';
				$controller = new $controller_classname;

				self::$content = $controller->{'action' . ucfirst(self::$action)}();
			}
		}
		
		function get($what) {
			return isset(self::${$what}) ? self::${$what} : false;
		}
		
		function getName() {
			return self::$name;
		}
		
		function getOutput() {
			return self::$content;
		}
		
		function setName($name) {
			self::$name = $name;
		}

		function setAction($action) {
			self::$action = $action;
		}
		
	}