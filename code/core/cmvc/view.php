<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class View {
		
		private $params = array();
		
		function __construct() {}

		function preProcess() {}

		function getOutput($layout = 'default', $path = '') {
			$this->preProcess();
			
			ob_start();
			
			$layout_path = APP_PATH . '/' . Config::get('components_dir') . '/' . Component::get('name') . $path . '/' . $layout . '.php';
			
			if (file_exists($layout_path)) {
				include($layout_path);
			}
			
			$output = ob_get_contents();
			ob_end_clean();
			
			return $output;
		}

		function loadModel($name = '', $path = '') {
			
			$model = null;
			$model_name = ($name == '') ? Component::get('name') : $name;
			
			$model_path = APP_PATH . '/' . Config::get('components_dir') . '/' . Component::get('name') . $path . '/' . $model_name . '_model.php';
			
			if (file_exists($model_path)) {
				require_once($model_path);
			
				$model_classname = Common::styleClassName($model_name) . 'Model';
				$model = new $model_classname;
			}
			
			return $model;
		}
	
		function assign($param, $value) {
			$this->params[$param] = $value;
		}
		
		public function __get($name) {
			if (isset($this->params[$name])) {
				$res = $this->params[$name];
			}	else {
				$res = false; 
			}
			
			return $res;
		}
		 
		public function __set($name, $val) {
			if (isset($this->params[$name])) {
				$this->params[$name] = $val; 
				$res = true;
			} else { 
				$res = false;
			}
			
			return $res;
		}
	
		public function __isset($name) {
			return isset($this->params[$name]); 
		}
	
		public function __unset($name) {
			unset($this->params[$name]);
		}
		
	}