<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Http {
		
		function getQuery($name, $default = '') {			
			return isset($_GET[$name]) ? $_GET[$name] : $default;
		}

		function getPost($name, $default = '') {			
			return isset($_POST[$name]) ? $_POST[$name] : $default;
		}
		
		function isPost() {
			if (isset($_POST) && count($_POST) > 0) {
				return true;
			}
			
			return false;
		}
	}