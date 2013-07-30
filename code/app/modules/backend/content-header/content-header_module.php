<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendContentHeaderModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {			
			$backend_vars = Storage::get('backend');
			$page_list = $backend_vars['page-list'];
			$page_name = $backend_vars['page-name'];

			$page_info = $page_list[$page_name]['infor'];
		?>
			<div id="content-header">
				<h1><?php echo $page_info['title'] ?></h1>
				<div class="btn-group">
					<a class="btn btn-large tip-bottom" title="Manage Files"><i class="icon-file"></i></a>
					<a class="btn btn-large tip-bottom" title="Manage Users"><i class="icon-user"></i></a>
					<a class="btn btn-large tip-bottom" title="Manage Comments"><i class="icon-comment"></i><span class="label label-important">5</span></a>
					<a class="btn btn-large tip-bottom" title="Manage Orders"><i class="icon-shopping-cart"></i></a>
				</div>
			</div>
 		<?php
		}
		
	}