<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Route {

		function init() {			
			if (Config::get('rewrite_mode') != 0 && isset($_SERVER['PATH_INFO'])) {
				$path_info = trim($_SERVER['PATH_INFO'], '/');
				
				Alias::loadAllAliasFiles();
				
				if (Alias::hasRealUrl($path_info)) {
					$real_url = Alias::getRealUrl($path_info, true);
					$url_parts = Uri::parseUrl($real_url);

					$url_params = $url_parts['query'];
					
					$_GET = array_merge($url_params, $_GET);
					
					if (isset($url_params['lang']) && in_array($url_params['lang'], Language::getLanguageList()))
						Language::setLanguage($url_params['lang']);
						
					if (isset($url_params['com']) && strlen($url_params['com']) > 0)
						Component::setName($url_params['com']);
						
					if (isset($url_params['action']) && strlen($url_params['action']) > 0)
						Component::setAction($url_params['action']);

				} else {					
					$parts = explode('/', $path_info);
					
					if (isset($parts[0]) && in_array($parts[0], Language::getLanguageList()))
					{
						Language::setLanguage($parts[0]);
							
						if (isset($parts[1]) && strlen($parts[1]) > 0)
							Component::setName($parts[1]);
							
						if (isset($parts[2]) && strlen($parts[2]) > 0)
							Component::setAction($parts[2]);
					}
				}
			}
		}
		
		function getUrl($url) {

			$url = Common::standardizeUrl($url);
					
			if (Config::get('rewrite_mode') != 0) {
					$alias_url = Alias::getAlias($url, true);
					
					if (strlen($alias_url) > 0) {
						if(Config::get('rewrite_mode') == 1)
					  	$alias_url = 'index.php/' . $alias_url;
							
						return Config::get('base_url') . '/' . $alias_url;
					}
			}
			
			$url_parts = Uri::parseUrl($url);
			
			if (Config::get('rewrite_mode') == 0 
			|| isset($url_parts['scheme']) 
			|| (isset($url_parts['path']) && !in_array($url_parts['path'], array('/index.php', 'index.php')))) {
				return $url;
			}
			
			$rewritten_url = '';
			
			if (isset($url_parts['query'])) {
				$url_params = $url_parts['query'];
				
				$rewritten_url_params = array();
				
				$rewritten_url_params[] = isset($url_params['lang']) ? $url_params['lang'] : Language::getLanguage();
				$rewritten_url_params[] = isset($url_params['com']) ? $url_params['com'] : Config::get('default_component');
				
				if(isset($url_params['action'])) {
					$rewritten_url_params[] = $url_params['action'];
				}
				
				$rewritten_url = implode('/', $rewritten_url_params);
				
				unset($url_params['lang'], $url_params['com'], $url_params['action']);
				
				if (count($url_params) > 0) {
					$tmp_url_params = array();
					
					foreach($url_params as $key => $value) {
						$tmp_url_param = $key . '=' . $value;
						$tmp_url_params[] = $tmp_url_param;						
					}
					
					$rewritten_url .= '?' . implode('&', $tmp_url_params);
				}
				
				if(Config::get('rewrite_mode') == 1)
					$rewritten_url = 'index.php/' . $rewritten_url;
			}

			return Config::get('base_url') . '/' . $rewritten_url;
		}
		
	}