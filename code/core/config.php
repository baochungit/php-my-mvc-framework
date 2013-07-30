<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Config {
		
		private static $config;
	
		function init($config) {
			self::$config = $config;
		}
	
		function load($config_file) {
			if (file_exists($config_file)) {
				require_once($config_file);
				self::$config = $_config;
			}
		}
		
		function get($key) {
			return isset(self::$config[$key]) ? self::$config[$key] : null;
		}

	}