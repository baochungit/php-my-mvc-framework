<?php
	
	/**
	 * @author: Chung Xa
	 * @date: 2012-09-24
	 * 
	 * 
	 */
	 
	defined( '_CEXEC' ) or die( 'Restricted access' );
	
	require_once(realpath(dirname(__FILE__)) . '/backend_page.php');

	class BackendController extends Controller {
		
		function __construct() {
			parent::__construct();
			
			Component::setAction('default'); // force to always run actionDefault function		
		}
		
		function actionDefault() {
			Document::setTitle('Admin');
			Template::setTemplate('backend'); // the component uses the template Backend

			$model = $this->loadModel();
			$model->requireLoggedin();
			
			$page_list = $model->getPageListInfo();
			$page_name = Http::getQuery('page', 'home');
			$page_case = Http::getQuery('case', 'default');

			// this variable will be use for some module
			$backend_vars = array(
				'page-list' => $page_list,
				'page-name' => $page_name,
				'page-case' => $page_case
			);
			Storage::set('backend', $backend_vars);

			$page_output = '';			
			$page = $this->loadPage($page_name);
			if ($page != null) {
				$page_output = $page->getOutput($page_case);
			}
			
			$view = $this->loadView();
			$view->assign('page_output', $page_output);
			
			return $view->getOutput();
		}
		
		private function loadPage($name = '') {
			$page = null;
			
			$page_path = realpath(dirname(__FILE__)) . '/pages/' . $name . '/' . $name . '_page.php';

			if (file_exists($page_path)) {
				require_once($page_path);
				
				$page_classname = Common::styleClassName($name) . 'BackendPage';
				$page = new $page_classname($this);
			}
			
			return $page;
		}
		
	}