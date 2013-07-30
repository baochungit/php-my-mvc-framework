<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class FrontendNewsFeedModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {			
			$lang = Language::getLanguage();
		?>
			test
		<?php
		}
		
	}