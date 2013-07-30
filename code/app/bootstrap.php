<?php defined( '_CEXEC' ) or die( 'Restricted access' );

  require_once(CORE_PATH . '/config.php');

	require_once(CORE_PATH . '/exception.php');
	require_once(CORE_PATH . '/common.php');
	require_once(CORE_PATH . '/database.php');
	require_once(CORE_PATH . '/language.php');
	require_once(CORE_PATH . '/alias.php');
	require_once(CORE_PATH . '/http.php');
	require_once(CORE_PATH . '/uri.php');
	require_once(CORE_PATH . '/route.php');
	require_once(CORE_PATH . '/plugin.php');
	require_once(CORE_PATH . '/component.php');
	require_once(CORE_PATH . '/module.php');
	require_once(CORE_PATH . '/block.php');
	require_once(CORE_PATH . '/document.php');
	require_once(CORE_PATH . '/template.php');
	require_once(CORE_PATH . '/session.php');
	require_once(CORE_PATH . '/cookie.php');
	require_once(CORE_PATH . '/storage.php');

	
	/////////////////////////////////////
	
	Config::load(APP_PATH . '/config.php');

	if (Config::get('database') !== null) {
		$_database = new Database(Config::get('database'));
		$_database->connect();

		Storage::set('_database', $_database);
	}
	else {
		Storage::set('_database', false);
	}

	Session::init();
	
	Cookie::init();

	Document::init();

	Template::init();

	Language::init();
	
	Route::init();
	
	Component::execute();

	echo Template::getOutput();