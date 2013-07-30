<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Session {
		
		private static $namespace = '';
		
		function init() {
			
			self::$namespace = Config::get('namespace');
			
			if (strlen(session_id()) == 0) {
				session_start();
			}
			
			if (!isset($_SESSION[self::$namespace])) {
				$_SESSION[self::$namespace] = array();
			}
		}
		
		public function __get($name) {
			if (isset($_SESSION[self::$namespace][$name])) {
				$res = $_SESSION[self::$namespace][$name];
			} else {
				$res = false;
			}
			
			return $res;
		}
		 
		public function __set($name, $val) {
			if (isset($_SESSION[self::$namespace])) { 
				$_SESSION[self::$namespace][$name] = $val; 
				$res = true;
			} else { 
				$res = false;
			}
			
			return $res;
		}
	
		public function __isset($name) {
			return isset($_SESSION[self::$namespace][$name]); 
		}
	
		public function __unset($name) {
			unset($_SESSION[self::$namespace][$name]);
		}

		function set($name, $value) {
			$_SESSION[self::$namespace][$name] = $value;
		}
		
		function get($name) {
			return isset($_SESSION[self::$namespace][$name]) ? $_SESSION[self::$namespace][$name] : false;
		}
		
		function setNamespace($namespace) {
			self::$namespace = $namespace;
		}

		function getNamespace($namespace) {
			return self::$namespace;
		}
		
		function destroy() {
			if (strlen(session_id()) > 0) {
				session_destroy();
			}
			
			$_SESSION[self::$namespace] = array();
		}
		
	}