<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Controller {
		
		function __construct() {}
		
		function actionDefault() {}
		
		function loadView($name = '', $path = '') {
			
			$view = null;
			$view_name = ($name == '') ? Http::getQuery('view', Component::get('name')) : $name;
			
			$view_path = APP_PATH . '/' . Config::get('components_dir') . '/' . Component::get('name') . $path . '/' . $view_name . '_view.php';
			
			if (file_exists($view_path)) {
				require_once($view_path);
			
				$view_classname = Common::styleClassName(Component::get('name')) . 'View';
				$view = new $view_classname;
			}
			
			return $view;
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
	
	}