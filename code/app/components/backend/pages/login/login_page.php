<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 

	class LoginBackendPage extends BackendPage {
		
		public $controller = null;
		
		function __construct($controller) {
			parent::__construct();			
			$this->controller = $controller;
		}
		
		function caseDefault() {
			
			// do something, then output the specific layout	
			Template::setIndexFilename('login-page.php');

			$this->setLayout('default');
		}

	}