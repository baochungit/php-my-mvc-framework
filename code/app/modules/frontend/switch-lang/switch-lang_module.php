<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class FrontendSwitchLangModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {			
			$lang = Language::getLanguage();
		?>
			<ul class="switchlang">
          <li><a href="<?php echo Route::getUrl('index.php?lang=en')?>"><span class="badge<?php echo ($lang == 'en')?' badge-info':'' ?>">en</span></a></li>
          <li><a href="<?php echo Route::getUrl('index.php?lang=vi')?>"><span class="badge<?php echo ($lang == 'vi')?' badge-info':'' ?>">vi</span></a></li>
      </ul>
		<?php
		}
		
	}