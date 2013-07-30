<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Common	{
		
  	function isValidAddonName($name) {
  		return preg_match('/^[A-Za-z0-9\-]+$/', $name);
  	}
  
  	function styleClassName($name) {
  		$parts = explode('-', $name);
  		
  		$name = '';
  		foreach ($parts as $part) {
  			$name .= ucfirst(strtolower($part));
  		}
  		
  		return $name;
  	}
  	
  	function styleActionName($name) {
  		$parts = explode('-', $name);
  		
  		$name = '';
  		foreach ($parts as $part) {
  			$name .= ucfirst(strtolower($part));
  		}
  		
  		return $name;
  	}
  	
  	function standardizeUrl($url) {
  		$url = trim($url, '/');
  		
  		$pos = strpos($url, '?');
  		if ($pos === 0) {
  			$url = 'index.php' . $url;
  		}
  		
  		return $url;
  	}
  
  	function redirectTo($url) {
  		header('location:' . $url); exit;
  	}
		
	}