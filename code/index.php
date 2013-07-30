<?php
	
	if (!defined('_CEXEC')) define('_CEXEC', 1);

	set_include_path(get_include_path() . PATH_SEPARATOR . realpath(dirname(__FILE__)));

	define('CORE_PATH', 'core');
	define('APP_PATH', 'app');
	
	include_once(APP_PATH . '/bootstrap.php');