<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Cookie {
		
		private static $namespace = '';
		
		function init() {
			self::$namespace = Config::get('namespace');
		}
		
		public function __get($name) {
			if (isset($_COOKIE[self::$namespace . $name])) {
				$res = $_COOKIE[self::$namespace . $name];
			} else {
				$res = false; 
			}
			
			return $res;
		}
		 
		public function __set($name, $val) {
			if (isset($_COOKIE[self::$namespace . $name])) { 
				$_COOKIE[self::$namespace . $name] = $val; 
				$res = true;
			} else { 
				$res = false;
			}
			
			return $res;
		}
	
		public function __isset($name) {
			return isset($_COOKIE[self::$namespace . $name]); 
		}
	
		public function __unset($name) {
			self::set($name, '', time() - 3600);			
			unset($_COOKIE[self::$namespace . $name]);
		}

		function set($name, $value, $expires = 0, $path = '/', $domain = '', $secure = false) {
			return setcookie(self::$namespace . $name, $value, $expires, $path, $domain, $secure);
		}
		
		function get($name) {
			return isset($_COOKIE[self::$namespace . $name]) ? $_COOKIE[self::$namespace . $name] : false;
		}
		
		function setNamespace($namespace) {
			self::$namespace = $namespace;
		}

		function getNamespace($namespace) {
			return self::$namespace;
		}
		
	}