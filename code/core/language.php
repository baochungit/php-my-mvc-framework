<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Language {
		
		private static $text = array();		
		private static $lang = '';		
		private static $language_list = array();
		
		function init() {

			self::$language_list = explode(',', Config::get('language_list'));
			
			$lang = Http::getQuery('lang', '');
			
			if ($lang == '') {
				if (Session::get('lang') != null) {
					self::$lang = Session::get('lang');
				}	
				elseif (Cookie::get('lang') != null) {
					self::$lang = Cookie::get('lang');
				} 
				else {
					self::$lang = Config::get('default_language');
				}
			}
			else {
				self::$lang = $lang;
				Session::set('lang', $lang);
				Cookie::set('lang', $lang, time() + 30*24*60*60);
			}
		}

		function text($text) {
			if (isset(self::$text[$text])) {
				return self::$text[$text];
			} 
			else {
				return $text;
			}
		}
		
		function loadFile($file) {
			if (file_exists($file)) {
				$ini = parse_ini_file($file);
				foreach ($ini as $key => $value) {
					self::$text[$key] = $value;
				}
			}
		}

		function load($name) {
			self::loadFile(APP_PATH . '/' . Config::get('languages_dir') . '/' . self::$lang . "/{$name}_language.ini");
		}
		
		function getLanguage() {
			return self::$lang;
		}

		function setLanguage($lang) {
			
			self::$lang = $lang;

			Session::set('lang', $lang);
			Cookie::set('lang', $lang, time() + 30*24*60*60);
		}
						
		function getLanguageList() {
			return self::$language_list;
		}
	}