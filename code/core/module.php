<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Module {
		
		private $opts = null;
		public $id = '';
		
		function __construct($opts = null) {
			$this->opts = $opts;
		}

		function main() {}
		
		function getOutput() {
			ob_start();
			
			$this->main();
			
			$output = ob_get_contents();
			ob_end_clean();
			
			return $output;
		}
		
	}