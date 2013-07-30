<?php
	
	/**
	 * @author: Chung Xa
	 * @date: 2012-09-24
	 * 
	 * 
	 */
	 
	defined( '_CEXEC' ) or die( 'Restricted access' );

	class FrontendModel extends Model {
		
		function __construct() {
			parent::__construct();
		}
		
		function getLoggedin() {
			$logged_in = Session::get('user_logged_in');
			return $logged_in;
		}
		
		function doLogin() {
			$email = Http::getPost('email');
			$password = Http::getPost('password');
			$remember_me = Http::getPost('remember_me');
			$redirect_after_login = Http::getPost('redirect_after_login');

			$db = Storage::get('_database');
			$result = $db->query("SELECT * FROM users WHERE email = '$email' AND password='$password' LIMIT 1");

			if ($result) {
				$row = $result->fetch();
				Session::set('user_logged_in', true);
				Session::set('user_info', $row);
				return true;
			}
			else {
				return false;
			}
		}
		
	}