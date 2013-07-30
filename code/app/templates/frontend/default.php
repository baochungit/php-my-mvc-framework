<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 
	Template::addCss(self::$base_url . '/bootstrap/css/bootstrap.min.css', 'end-head', array('media' => 'all'));
	Template::addJs(self::$base_url . '/bootstrap/js/bootstrap.min.js', 'end-head');
	Template::addJs(self::$base_url . '/js/jquery-1.7.1.min.js', 'end-head');
?>
<!DOCTYPE html>
<html lang="<?php echo Language::getLanguage() ?>">
<head>
<title><?php echo Document::getTitle() ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="<?php echo Document::getMetaValue('description') ?>" />
<meta name="keywords" content="<?php echo Document::getMetaValue('keywords') ?>" />
</head>
<body>
<?php echo Block::component() ?>
</body>
</html>