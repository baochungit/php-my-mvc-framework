<?php
	defined( '_CEXEC' ) or die( 'Restricted access' );
	
	class CException extends Exception {
		
		private static $debug;
		
		function init($message, $debug = true) {
			parent::__construct($message);
			
			self::$debug = $debug;
		}

		function errorMessage() {
			//error message
			if (self::$debug) {
				$errorMsg = 'Error on line ' . self::getLine() . ' in ' . self::getFile() . ': <b>' . self::getMessage() . '</b>';
			} else {
				$errorMsg = 'Error: '.self::getMessage();
			}
			
			return $errorMsg;
		}
		
	}