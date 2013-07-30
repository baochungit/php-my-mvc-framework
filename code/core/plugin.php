<?php
	defined( '_CEXEC' ) or die( 'Restricted access' );

	class Plugin {
		
		function __construct() {}

		function load($plugin_name) {

			$plugin = null;
			$plugin_path = APP_PATH . '/' . Config::get('plugins_dir') . '/' . $plugin_name . '/' . $plugin_name . '_plugin.php';

			if (file_exists($plugin_path)) {
				require_once($plugin_path);
				
				$plugin_classname = Common::styleClassName($plugin_name) . 'Plugin';
				$plugin = new $plugin_classname;
			}
			
			return $plugin;
		}
		
	}