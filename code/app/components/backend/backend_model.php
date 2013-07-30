<?php
	
	/**
	 * @author: Chung Xa
	 * @date: 2012-09-24
	 * 
	 * 
	 */
	 
	defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendModel extends Model {
		
		function __construct() {
			parent::__construct();
		}
		
		function requireLoggedin() {
		
			//Common::redirectTo(Route::getUrl('index.php?com=admin&page=login'));
			//return true;
		}
		
		function getPageListInfo() {
			$folders = glob(APP_PATH . '/' . Config::get('components_dir') . '/' . Component::get('name') . '/pages/*', GLOB_ONLYDIR);
			
			$page_list = array();
			foreach ($folders as $folder) {
				$config_file = $folder . '/config.ini';
				if (file_exists($config_file)) {
					$ini = parse_ini_file($config_file, true);
					
					$folder_name = substr($folder, strrpos($folder, '/') + 1);
					
					$page_list[$folder_name] = $ini;
				}
			}
			
			return $page_list;
		}
		
	}