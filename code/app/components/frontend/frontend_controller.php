<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 
	
	require_once(realpath(dirname(__FILE__)) . '/frontend_page.php');

	class FrontendController extends Controller {
		
		function __construct() {
			parent::__construct();
		}
		
		function actionDefault() {
			$page_name = Http::getQuery('page', 'home');
			$page_case = Http::getQuery('case', 'default');
			
			$page_output = '';
			$page_path = realpath(dirname(__FILE__)) . '/pages/' . $page_name . '/' . $page_name . '_page.php';

			if (file_exists($page_path)) {
				require_once($page_path);
				
				$page_classname = Common::styleClassName($page_name) . 'FrontendPage';
				$page = new $page_classname($this);

				$page_output = $page->getOutput($page_case);
			}
			
			$view = $this->loadView();
			$view->assign('page_output', $page_output);
			
			return $view->getOutput();
		}
		
	}