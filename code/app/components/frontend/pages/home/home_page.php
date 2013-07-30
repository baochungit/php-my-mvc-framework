<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 

	class HomeFrontendPage extends FrontendPage {
		
		public $settings = array();
		public $controller = null;
		
		function __construct($controller_obj) {
			parent::__construct();
			
			$this->controller = $controller_obj;

			Storage::set('settings', $this->settings);
		}
		
		function caseDefault() {
			
			// do something, then output the specific layout
			
			$model = $this->controller->loadModel();
			if (!$model->getLoggedin()) {
				$this->setLayout('login-register');
			}
			else {
				$this->setLayout('default');
				$this->user_info = Session::get('user_info');
			}
		}
		
		function caseLogin() {
			
			$model = $this->controller->loadModel();
			
			if (!$model->getLoggedin()) {
			  if (Http::isPost() && $model->doLogin()) {
					Common::redirectTo(Config::get('base_url'));
				}
				else {
					$this->setLayout('login-register');
				}
			}
			else {
				Common::redirectTo(Config::get('base_url'));
			}
		}
		
		function caseLogout() {
			
			$model = $this->controller->loadModel();
			
			if ($model->getLoggedin()) {
				Session::set('user_logged_in', false);
				Common::redirectTo(Config::get('base_url'));
			}
		}
		
	}