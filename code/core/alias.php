<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Alias {
		
		private static $alias = array();
		private static $real_url = array();
		
		function __construct() {}
		
		function hasRealUrl($alias) {
			return isset(self::$alias[$alias]);
		}
		
		function hasAlias($real_url) {
			return isset(self::$real_url[$real_url]);
		}
		
		function getRealUrl($alias) {
			return self::hasRealUrl($alias) ? self::$alias[$alias] : '';
		}
		
		function getAlias($real_url, $try = false) {
			$url = $real_url;
			$query = '';
			$endloop = false;
			
			// try to generate alias
			while ($try == true && !self::hasAlias($url) && $endloop == false) {
				$pos = strrpos($url, '&');
				
				if ($pos !== false) {					
					$query = substr($url, $pos + 1) . ($query == '' ? $query : '&' . $query);
					$url = substr($url, 0, $pos);
				}
				else {
					$endloop = true;
				}
			}
			
			$alias_url = (self::hasAlias($url)) 
				? self::$real_url[$url] . (strlen($query) > 0 ? ('?' . $query) : '') 
				: '';
			
			return $alias_url;
		}
		
		function loadAliasFile($file) {
			
			if (file_exists($file)) {
				$ini = parse_ini_file($file);
				foreach ($ini as $key => $value) {
					
					$value = Common::standardizeUrl($value);
					
					self::$alias[$key] = $value;
					self::$real_url[$value] = $key;
				}
			}
		}
		
		function loadAllAliasFiles() {
			
			$files = glob(APP_PATH . '/' . Config::get('aliases_dir') . '/*_alias.ini');
			
			foreach ($files as $file) {
				self::loadAliasFile($file);
			}
		}
		
	}