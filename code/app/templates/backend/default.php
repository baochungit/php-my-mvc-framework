<?php defined( '_CEXEC' ) or die( 'Restricted access' );
	Template::addCss(self::$base_url . '/css/bootstrap.min.css', 'end-head');
	Template::addCss(self::$base_url . '/css/bootstrap-responsive.min.css', 'end-head');
	Template::addCss(self::$base_url . '/css/fullcalendar.css', 'end-head');
	Template::addCss(self::$base_url . '/css/unicorn.main.css', 'end-head');
	Template::addCss(self::$base_url . '/css/unicorn.grey.css', 'end-head', array('class' => 'skin-color'));
	Template::addJs(self::$base_url . '/js/jquery.min.js', 'end-head');

	Template::addJs(self::$base_url . '/js/excanvas.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/jquery.ui.custom.js', 'end-body');
	Template::addJs(self::$base_url . '/js/jquery.flot.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/bootstrap.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/jquery.flot.resize.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/jquery.peity.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/fullcalendar.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/fullcalendar.min.js', 'end-body');
	Template::addJs(self::$base_url . '/js/unicorn.js', 'end-body');
	Template::addJs(self::$base_url . '/js/unicorn.dashboard.js', 'end-body');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title><?php echo Document::getTitle() ?></title>
		<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</head>
	<body>		
		
		<div id="header">
			<h1><a href="./dashboard.html">Unicorn Admin</a></h1>		
		</div>
		
		<div id="search">
			<input type="text" placeholder="Search here..."/><button type="submit" class="tip-right" title="Search"><i class="icon-search icon-white"></i></button>
		</div>

    <?php echo Block::module('backend/user-nav') ?>
    
    <?php echo Block::module('backend/side-bar') ?>

    <?php echo Block::module('backend/style-switcher') ?>
				
		<div id="content">

			<?php echo Block::module('backend/content-header') ?>
    
			<?php echo Block::module('backend/breadcrumb') ?>
      
      <?php echo Block::component() ?>

		</div>        
	</body>
</html>