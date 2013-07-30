<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Document {
		
		public static $meta_keywords = '';
		public static $meta_description = '';
		public static $meta_title = '';
		public static $site_title = '';
		
		function init() {			
			self::$meta_description = Config::get('meta_description');
			self::$meta_keywords = Config::get('meta_keywords');
			self::$meta_title = Config::get('meta_title');
			self::$site_title = Config::get('site_title');
		}

		function setMetaValue($meta_name, $value) {
			self::${'meta_' . $meta_name} = $value;
		}
		
		function getMetaValue($meta_name) {
			return self::${'meta_' . $meta_name};
		}
		

		function setTitle($value) {
			self::$site_title = $value;
		}
		
		function getTitle() {
			return self::$site_title;
		}		
		
	}