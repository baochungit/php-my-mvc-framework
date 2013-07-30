<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendStyleSwitcherModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {			
			$lang = Language::getLanguage();
		?>
		<div id="style-switcher">
			<i class="icon-arrow-left icon-white"></i>
			<span>Style:</span>
			<a href="#grey" style="background-color: #555555;border-color: #aaaaaa;"></a>
			<a href="#blue" style="background-color: #2D2F57;"></a>
			<a href="#red" style="background-color: #673232;"></a>
		</div>
 		<?php
		}
		
	}