<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Storage {
		
		private static $vars = array();
		
		function get($var_name) {
			return isset(self::$vars[$var_name]) ? self::$vars[$var_name] : null;
		}
		
		function set($var_name, $var_value) {
			self::$vars[$var_name] = $var_value;
		}
		
	}