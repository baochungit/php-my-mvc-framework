<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 

	class LessonFrontendPage extends FrontendPage {
		
		function __construct($controller) {
			parent::__construct();
		}
		
		function caseDefault() {

			$lesson = Http::getQuery('id', 0);
			
			$db = Storage::get('_database');
			$result = $db->query("SELECT * FROM slides WHERE lesson_id = '$lesson' ORDER BY slide_no");

			$slides = array();	
			while ($result && $row = $result->fetch()) {
				$slide = array(
					'driver' => $row['driver'],
					'data' => json_decode($row['data']),
					'manifest' => json_decode($row['manifest'])
				);
				
				$slides[] = $slide;
			}
			$this->vars['slides'] = $slides;
			
			Template::setIndexFilename('plain.php');
		}
		
	}