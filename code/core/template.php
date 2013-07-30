<?php	defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class Template {
		
		private static $base_url = '';
		private static $base_dir = '';
		private static $name = '';
		private static $index_filename = '';
		
		private static $hook = array();
		
		function init() {
			self::$name = Config::get('default_template');
			self::$index_filename = 'default.php';
			self::$base_dir = APP_PATH . '/' . Config::get('templates_dir') . '/' . self::$name;
			self::$base_url = Config::get('base_url') . '/' . self::$base_dir;
			self::$hook = array();
		}
		
		function getBaseUrl() {
			return self::$base_url;
		}
		
		function getName() {
			return self::$name;
		}
		
		function addJs($path, $section = 'end-head', $attrs = array()) {
			$type = 'js';
		  if (!isset(self::$hook[$section]))
				self::$hook[$section] = array();
				
			self::$hook[$section][] = array('type' => $type, 'path' => $path, 'attrs' => $attrs);
		}		
		
		function addCustomJs($code, $section = 'end-head', $attrs = array()) {
			$type = 'custom-js';
		  if (!isset(self::$hook[$section]))
				self::$hook[$section] = array();
				
			self::$hook[$section][] = array('type' => $type, 'code' => $code, 'attrs' => $attrs);
		}		
		
		function addCss($path, $section = 'end-head', $attrs = array()) {
			$type = 'css';
		  if (!isset(self::$hook[$section]))
				self::$hook[$section] = array();
				
			self::$hook[$section][] = array('type' => $type, 'path' => $path, 'attrs' => $attrs);
		}				
		
		function addCustomCss($code, $section = 'end-head', $attrs = array()) {
			$type = 'custom-css';
		  if (!isset(self::$hook[$section]))
				self::$hook[$section] = array();
				
			self::$hook[$section][] = array('type' => $type, 'code' => $code, 'attrs' => $attrs);
		}
		
		function reBuild($output) {
			$doc = new DOMDocument();
			@$doc->loadHTML($output);

			foreach (self::$hook as $section => $element_set) {
				if (count($element_set) == 0 || trim($section) == '') continue;
				
				if (strpos($section, '-') !== FALSE) {
					list($pos, $tag) = explode('-', $section);
				}
				else {
					$pos = 'begin';
					$tag = $section;
				}
				
				$dom = $doc->getElementsByTagName($tag)->item(0);
				if (is_null($dom)) continue;
				
				foreach ($element_set as $el) {
					if (in_array($el['type'], array('js', 'custom-js', 'css', 'custom-css'))) {						
						if ($el['type'] == 'js') {
							$node = $doc->createElement('script');

							$attrs = array(
								'type' => 'text/javascript',
								'src' => $el['path']
							);
						}
						else if ($el['type'] == 'custom-js') {
							$node = $doc->createElement('script', $el['code']);

							$attrs = array(
								'type' => 'text/javascript'
							);					
						}
						else if ($el['type'] == 'css') {
							$node = $doc->createElement('link');
							
							$attrs = array(
								'type' => 'text/css',
								'rel' => 'stylesheet',
								'href' => $el['path']
							);
						}
						else if ($el['type'] == 'custom-css') {
							$node = $doc->createElement('style', $el['code']);
							
							$attrs = array(
								'type' => 'text/css'
							);
						}
					
						$attrs = array_merge($attrs, $el['attrs']);
						foreach($attrs as $attr_key => $attr_value) {
							$attr = $doc->createAttribute($attr_key);
							$attr->value = $attr_value;
							$node->appendChild($attr);
						}
						
						if ($pos == 'begin') {
							$dom->insertBefore($node, $dom->firstChild);
						}
						else if ($pos == 'end') {
							$dom->appendChild($node);
						}
						else if ($pos == 'before') {
							 $dom->parentNode->insertBefore($node, $dom);
						}
						else if ($pos == 'after') {
							  $dom->parentNode->insertBefore($node, $dom->nextSibling);
						}
					}
				}
			}
			
			return $doc->saveHTML();
		}
		
		function setIndexFilename($filename) {
			self::$index_filename = $filename;
		}
		
		function setTemplate($name) {
			
			$base_dir = APP_PATH . '/' . Config::get('templates_dir') . '/' . $name;
			
			if (!file_exists($base_dir)) {
				return false;
			}

			self::$name = $name;
			self::$base_dir = $base_dir;
			self::$base_url = Config::get('base_url') . '/' . self::$base_dir;
		}

		function getOutput() {
			ob_start();
			
			$lang = Language::getLanguage();			
			$template_path = self::$base_dir . '/' . $lang . '.' . self::$index_filename;
			
			if (file_exists($template_path)) {
				include_once($template_path);
			} 
			else {
				$template_path = self::$base_dir . '/' . self::$index_filename;
				
				if (file_exists($template_path)) {
					include_once($template_path);
				}
			}			
						
			$output = ob_get_contents();
			ob_end_clean();
			
			return self::reBuild($output);
		}
		
	}