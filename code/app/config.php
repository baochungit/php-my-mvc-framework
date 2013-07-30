<?php	defined( '_CEXEC' ) or die( 'Restricted access' );

	$_config = array(
		'base_url' => 'http://localhost/Xahome/abc/code',
		'includes_dir' => 'includes',
		'modules_dir' => 'modules',
		'components_dir' => 'components',
		'libraries_dir' => 'libraries',
		'plugins_dir' => 'plugins',
		'templates_dir' => 'templates',
		'languages_dir' => 'languages',
		'aliases_dir' => 'aliases',
		
		'multi_language' => 0,
		'language_list' => 'en,vi',
		'default_language' => 'en',
		
		'default_template' => 'frontend',
		'default_component' => 'frontend',
		
		'rewrite_mode' => 0, // 0:disable | 1:enable but without rewrite url | 2: enable with rewrite url
		
		'namespace' => 'mw', // namespace for session, cookie
		'meta_description' => '',
		'meta_keywords' => '',
		'meta_title' => '',
		
		// remove this comment if your project use a database. 
		'database' => array(
			'adapter' => 'pdo_mysql',
			'params'  => array(
				'host'     => 'localhost',
				'username' => 'root',
				'password' => 'admin',
				'dbname'   => 'abc',
				'charset' => 'utf8'
			)
		)
	);
