<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 

	class LessonBackendPage extends BackendPage {
		
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
			
			$id = Http::getQuery('id', 0);
			
			$db = Storage::get('_database');
			$result = $db->query("SELECT * FROM slides WHERE lesson_id = '$id' LIMIT 1");

			$slide_data = array();
	
			if ($result && $row = $result->fetch()) {
				$slide_data = array(
					'driver' => $row['driver'],
					'slide_no' => $row['slide_no'],
					'type' => $row['type'],
					'data' => $row['data'],
					'manifest' => $row['manifest']
				);
			}
			
			$this->slide_data = $slide_data;
			
			$this->setLayout('edit');
		}

		
		function caseOpenJsonEditor() {
			$this->setLayout('json_editor');
			Document::setTitle('JSON Editor');
			Template::setIndexFilename('plain.php');
		}
		
	}