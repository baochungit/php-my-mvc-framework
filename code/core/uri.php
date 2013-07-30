<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Uri {

		function parseUrl($url) {
			$url_parts = parse_url($url);
				
			if (isset($url_parts['query'])) {
				$url_params = array();
				
				$tmp_url_params = explode('&', $url_parts['query']);
				
				foreach($tmp_url_params as $tmp_url_param) {
					$url_param = explode('=', $tmp_url_param);
					
					if(count($url_param) == 2) {
						$url_params[$url_param[0]] = $url_param[1];
					}
				}
				
				$url_parts['query'] = $url_params;
			}

			return $url_parts;
		}
		
	}