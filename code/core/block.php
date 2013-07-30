<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Block	{
		
		private static $blocks_list = array();
		
		function component() {
			return Component::getOutput();
		}

		function module($module_name, $opts = null, $block_id = null)	{

			$parts = self::parseModuleName($module_name);

			if ($block_id == null)
				$block_id = self::autoGenerateBlockId('module', $parts['class']);
			
			if (self::hasBlock($block_id) || !self::isVisible($block_id)) {
				return false;
			}

			$module_path = APP_PATH . '/' . Config::get('modules_dir') . '/' . $module_name . '/' . $parts['name'] . '_module.php';
				
			if (file_exists($module_path)) {
				self::$blocks_list[$block_id] = array('visible' => true);

				require_once($module_path);
				
				$module_classname = Common::styleClassName($parts['class']) . 'Module';
				$module = new $module_classname($opts);
				$module->id = $block_id;

				return $module->getOutput();
			}
		}
		
		function isVisible($block_id) {
			return isset(self::$blocks_list[$block_id]) ? self::$blocks_list[$block_id]['visible'] : true;
		}
		
		function setVisible($block_id, $value) {
			if (isset(self::$blocks_list[$block_id]))
				self::$blocks_list[$block_id]['visible'] = $value;
		}
		
		private function autoGenerateBlockId($block_type, $name) {
			$block_id = '';
			
			$i = 1;
			do {
				$block_id = $block_type . '-' . $name . '-' . $i++;	
			} while (isset(self::$blocks_list[$block_id]));

			return $block_id;
		}
		
		private function parseModuleName($name) {
			$parts = array();

			$pos = strrpos($name, '/');
			if ($pos !== false) {					
				$parts['name'] = substr($name, $pos + 1);
				$parts['path'] = substr($name, 0, $pos);
			}
			else {
				$parts['name'] = $name;
			}
			
			$parts['class'] = str_replace('/', '-', $name);
			
			return $parts;
		}
		
		function hasBlock($block_id) {
			return isset(self::$blocks_list[$block_id]);
		}
		
	}