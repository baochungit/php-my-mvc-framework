<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class BackendUserNavModule extends Module {
		
		function __construct($opts = null) {
			parent::__construct($opts);
		}

		function main() {			
			$lang = Language::getLanguage();
		?>
		<div id="user-nav" class="navbar">
            <ul class="nav btn-group">
                <li class="btn btn-inverse" ><a title="" href="#"><i class="icon icon-user"></i> <span class="text">Profile</span></a></li>
                <li class="btn btn-inverse dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">Messages</span> <span class="label label-important">5</span> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a class="sAdd" title="" href="#">new message</a></li>
                        <li><a class="sInbox" title="" href="#">inbox</a></li>
                        <li><a class="sOutbox" title="" href="#">outbox</a></li>
                        <li><a class="sTrash" title="" href="#">trash</a></li>
                    </ul>
                </li>
                <li class="btn btn-mini btn-inverse"><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></li>
                <li class="btn btn-mini btn-inverse"><a title="" href="<?php echo Route::getUrl('index.php?com=backend&page=login') ?>"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
            </ul>
    </div>
 		<?php
		}
		
	}