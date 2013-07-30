<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 

	class HomeBackendPage extends BackendPage {
		
		public $controller = null;
		
		function __construct($controller) {
			parent::__construct();			
			$this->controller = $controller;
		}
		
		function caseDefault() {
			
			// do something, then output the specific layout
			
			$this->setLayout('default');
		}

		
		function caseEdit() {
			
			// do something, then output the specific layout
			
			$this->setLayout('default');
		}
		
	}