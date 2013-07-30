<?php
	
	if (!defined('_CEXEC')) define('_CEXEC', 1);

	define('SITE_ROOT', '../../');

	define('CORE_PATH', 'core');
	define('APP_PATH', 'app');	
	
	require_once(SITE_ROOT . APP_PATH . '/config.php');
	require_once(SITE_ROOT . CORE_PATH . '/common.php');
	require_once(SITE_ROOT . CORE_PATH . '/http.php');

	$error_message = '';
	
	if (Http::isPost()) {
		try {
			$name = strtolower(trim(Http::getPost('name')));
			
			if (strlen($name) == 0 || !Common::isValidAddonName($name)) {
				throw new Exception('The name given is wrong');
			}

			$create_component = Http::getPost('create_component', 0);
			$create_module = Http::getPost('create_module', 0);
			$create_plugin = Http::getPost('create_plugin', 0);
			$create_alias = Http::getPost('create_alias', 0);
			$create_languages = Http::getPost('create_languages', 0);
			
			$include_comment = Http::getPost('include_comment', 0);
			$your_name = Http::getPost('your_name', '');
			$your_comment = Http::getPost('your_comment', '');
			
			$phpComment = $include_comment ? phpComment($your_name, $your_comment) : '';
			$iniComment = $include_comment ? iniComment($your_name, $your_comment) : '';
			
			if (!($create_component || $create_module || $create_plugin || $create_alias || $create_languages)) {
				throw new Exception('Seems nothing will be created because you didn\'t choose anything');
			}

				
			if ($create_component) {
				$new_component_dir = SITE_ROOT . APP_PATH . '/' . $_config['components_dir'] . '/' . $name;
		
				createFolder($new_component_dir);
					createFile($new_component_dir . "/{$name}_controller.php", controllerContent($name));
					//createFolder($new_component_dir . '/views');
						createFile($new_component_dir . "/{$name}_view.php", viewContent($name));
						createFile($new_component_dir . "/default.php", layoutContent());
					//createFolder($new_component_dir . '/models');
						createFile($new_component_dir . "/{$name}_model.php", modelContent($name));
			}
		
			if ($create_module) {
				$new_module_dir = SITE_ROOT . APP_PATH . '/' . $_config['modules_dir'] . '/' . $name;
		
				createFolder($new_module_dir);
					createFile($new_module_dir . "/{$name}_module.php", moduleContent($name));
			}
		
			if ($create_plugin) {
				$new_plugin_dir = SITE_ROOT . APP_PATH . '/' . $_config['plugins_dir'] . '/' . $name;
		
				createFolder($new_plugin_dir);
					createFile($new_plugin_dir . "/{$name}_plugin.php", pluginContent($name));
			}
		
			if ($create_alias) {
				$aliases_dir = SITE_ROOT . APP_PATH . '/' . $_config['aliases_dir'];
		
				createFile($aliases_dir . "/{$name}_alias.ini", $iniComment);
			}
		
			if ($create_languages) {
				$languages_dir = SITE_ROOT . APP_PATH . '/' . $_config['languages_dir'];
		
				$language_list = explode(',', $_config['language_list']);
				foreach ($language_list as $language) {
					createFolder($languages_dir . '/' . $language);
						createFile($languages_dir . '/' . $language . "/{$name}_language.ini", $iniComment);
				}
			}
		} 
		catch (Exception $e) {
			$error_message = $e->getMessage();
		}
	}
	
	////////////////////////////////////
	
	function createFolder($path) {
		if (!is_dir($path) && !@mkdir($path)) {
			throw new Exception('Creating folder "'.$path.'" failed');
		}
	}
	
	function createFile($path, $content) {
		if (file_exists($path)) {
			throw new Exception('File "'.$path.'" exists');
		}
		
		if (!$handle = fopen($path, 'w')) {
			throw new Exception('Creating file "'.$path.'" failed');
    }

    if (fwrite($handle, $content) === false) {
			throw new Exception('Writing file "'.$path.'" failed');
    }

    fclose($handle);
	}

	////////////////////////////////////
	
	function phpComment($your_name, $your_comment) {
		return '
	/**
	 * @author: ' . $your_name . '
	 * @date: ' . date('Y-m-d') . '
	 * 
	 * ' . str_replace("\n", "\n\t * ", $your_comment) . '
	 */
	 ';
	}
	
	function iniComment($your_name, $your_comment) {
		return '##
# @author: ' . $your_name . '
# @date: ' . date('Y-m-d') . '
# 
# ' . str_replace("\n", "\n# ", $your_comment) . '
##

';
	}
	
	function controllerContent($name) {
		global $phpComment;
		
		$class_name = Common::styleClassName($name) . 'Controller';
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
	class ' . $class_name . ' extends Controller {
		
		function __construct() {
			parent::__construct();
		}
		
		function actionDefault() {
			$view = $this->loadView();
			return $view->getOutput();
		}
	
	}';
	
	}
	
		
	function viewContent($name) {
		global $phpComment;

		$class_name = Common::styleClassName($name) . 'View';
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
	class ' . $class_name . ' extends View {
		
		function __construct() {
			parent::__construct();
		}
	
	}';
	
	}

		
	function layoutContent() {
		global $phpComment;
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
?>
hello world!';
	
	}
	
	function modelContent($name) {
		global $phpComment;

		$class_name = Common::styleClassName($name) . 'Model';
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
	class ' . $class_name . ' extends Model {
		
		function __construct() {
			parent::__construct();
		}
	
	}';
	
	}
	
		
	function moduleContent($name) {
		global $phpComment;

		$class_name = Common::styleClassName($name) . 'Module';
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
	class ' . $class_name . ' extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);		
		}
		
		function main() {
		?>
    	' . $name . '
    <?php
		}
	
	}';
	
	}

		
	function pluginContent($name) {
		global $phpComment;

		$class_name = Common::styleClassName($name) . 'Plugin';
		
		return '<?php defined( \'_CEXEC\' ) or die( \'Restricted access\' );
	' . $phpComment . '
	class ' . $class_name . ' extends Plugin {
		
		function __construct() {
			parent::__construct();
		}
	
	}';
	
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Mi-Framework Generator</title>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<style type="text/css">
	body {
		padding-top:80px;
	}
	
	.left-panel {
		float:left; 
	}
	
	.right-panel {
		float:left; 
		margin-left:150px;
	}
</style>

</head>

<body>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="brand" href="#">Mi-Framework Generator</a>
        </div>
      </div>
    </div>
		
    <div class="container">
    	<?php
				if (Http::isPost()) {
					if (strlen($error_message) > 0) {
			?>
			<div class="alert alert-error">
      <strong>Warning!</strong> <?php echo $error_message ?>
      </div>
			<?php
					}
					else {
			?>
			<div class="alert alert-success">
      <strong>Well done!</strong> Your stuff named '<?php echo $name ?>' were created. You can go to your site to get them
      </div>
			<?php					
					}
				}
			?>
			<form method="post" class="well clearfix">
      	<legend>Tell me what's on your mind</legend>
                
        <div class="left-panel">
        <label>Name:</label>
        <input type="text" name="name" placeholder="Type something…">
        <span class="help-block">
        This name will be used for all what you check bellow. 
        <p class="text-warning">Note: only alphanumeric characters and "-" allowed !</p>
        </span>
        <label class="checkbox"><input type="checkbox" name="create_component" value="1"> Component</label>
        <label class="checkbox"><input type="checkbox" name="create_module" value="1"> Module</label>
        <label class="checkbox"><input type="checkbox" name="create_plugin" value="1"> Plugin</label>
        <label class="checkbox"><input type="checkbox" name="create_alias" value="1"> Alias</label>
        <label class="checkbox"><input type="checkbox" name="create_languages" value="1"> Languages</label>
        <br />
        <button type="submit" class="btn btn-primary">Create !</button>
        </div>
         <div class="right-panel">
        <label class="checkbox"><input type="checkbox" name="include_comment" value="1"> Include author & comment</label>

        <input type="text" name="your_name" placeholder="Your name...">
        
        <label>Your comment:</label>
        <textarea class="span5" rows="6" name="your_comment"></textarea>
        </div>
      </form>

      <hr>
      
      <footer>
          <p>&copy; 2013 Mi-Framework</p>
      </footer>
    </div><!-- /container -->


</body>
</html>