<?php	defined( '_CEXEC' ) or die( 'Restricted access' ); ?>
<style type="text/css">
	body {
		padding-top:100px;
	}
	
	.switchlang {
		list-style:none;
		margin-top:8px;
		float:right;
	}
	.switchlang li {
		display:inline;
	}
</style>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="brand" href="#"><?php echo Language::text('HOME_SITE_NAME') ?></a>
        	<?php echo Block::module('frontend/switch-lang') ?>
        </div>
      </div>
    </div>
		
    <div class="container">
			<?php echo Block::module('frontend/news-feed') ?>
      <hr>
      
      <footer>
          <p>&copy; Company 2012</p>
      </footer>
    </div><!-- /container -->

	<script type="text/javascript" src="<?php echo Template::getBaseUrl() . '/js/mybooks.js' ?>"></script>
  <script type="text/javascript">
		var mybooks = new MyBooks(<?php echo json_encode(Storage::get('settings')) ?>);
	</script>