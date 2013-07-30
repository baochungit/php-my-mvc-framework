<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendSideBarModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {
			$backend_vars = Storage::get('backend');			
			$page_list = $backend_vars['page-list'];
			$page_name = $backend_vars['page-name'];
			$page_case = $backend_vars['page-case'];			
		?>
		<div id="sidebar">
			<ul>
				<?php
				foreach ($page_list as $page) {
					$page_info = $page['infor'];
					$page_menu = $page['menu'];
					
					if ($page_info['side-nav'] == 0) {
						continue;
					}
					
					echo '<li class="' . ((count($page_menu) > 1) ? 'submenu ' : '') . (($page_name == $page_info['name']) ? 'active' : '') . '">';
						echo '<a href="' . ((count($page_menu) == 1) ? Route::getUrl('index.php?com=backend&page=' . $page_info['name']) : '#') . '"><i class="icon ' . $page_info['icon'] . '"></i> <span>' . $page_info['title'] . '</span></a>';
					
          if (count($page_menu) > 1) {
						echo '<ul>';
						foreach ($page_menu as $key => $item) {
							echo '<li ' . (($page_info['name'] == $page_name && $item['case'] == $page_case) ? 'class="active" ' : '') . '><a href="' . Route::getUrl('index.php?com=backend&page=' . $page_info['name'] . '&case=' . $item['case']) . '">' . $item['title'] . '</a></li>';
						}
						echo '</ul>';
					} 
				
					echo '</li>';
        } ?>
			</ul>
		
		</div>
		<?php
		}
		
	}