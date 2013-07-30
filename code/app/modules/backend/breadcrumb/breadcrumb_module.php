<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendBreadcrumbModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {
			$backend_vars = Storage::get('backend');			
			$page_list = $backend_vars['page-list'];
			$page_name = $backend_vars['page-name'];
			$page_case = $backend_vars['page-case'];
			
			$page_info = $page_list[$page_name]['infor'];
			$page_menu = $page_list[$page_name]['menu'];

			$i = 0;
			foreach ($page_menu as $key => $item) {
				if ($i == 0) {
					$page_menuitem_default = $item;
					$i++;
				}
				
				if ($item['case'] == $page_case) {
					$page_menuitem = $item;					
					break;
				}
			}
			
			$is_default_case = ($page_menuitem['case'] == $page_menuitem_default['case']);
		?>
		<div id="breadcrumb">
				<a href="<?php echo ($page_name != 'home') ? Route::getUrl('index.php?com=backend') : '#' ?>" title="Go to Home" class="tip-bottom"><i class="icon-home"></i>Home</a>
				<a href="<?php echo (!$is_default_case) ? Route::getUrl('index.php?com=backend&page=' . $page_name) : '#' ?>" <?php echo ($is_default_case) ? 'class="current"' : '' ?>><?php echo $page_info['title'] ?></a>
				
        <?php if (!$is_default_case) { ?>
        <a href="#" class="current"><?php echo $page_menuitem['title'] ?></a>
        <?php } ?>
		</div>
 		<?php
		}
		
	}