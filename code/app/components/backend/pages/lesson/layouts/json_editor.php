<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 
	Template::addJs($this->base_url . '/assets/js/json2.js', 'end-head');
	Template::addJs($this->base_url . '/assets/JSONeditor/JSONeditor.js', 'end-head');
	
	$field = Http::getQuery('field', '');
?>  
<div style="position:absolute;top:10px;left:10px" id="tree"></div>
<div style="position:absolute;top:10px;left:400px" id="jform"></div>
<script>
var baseUrl = "<?php echo $this->base_url ?>/assets";
window.onload = function() {
	window.opener.sendJSONCallback('<?php echo $field ?>');
}
window.onbeforeunload = function() {
	if ((JSON.stringify(inputJson) != JSON.stringify(JSONeditor.treeBuilder.json)) && confirm('Do you want to save this change ?')) {
		window.opener.storeJSONCallback('<?php echo $field ?>', JSONeditor.treeBuilder.json);
	}
}

var inputJson = {};
function getJSONCallback(json) {
	inputJson = JSON.parse(json);
  JSONeditor.start('tree', 'jform', inputJson, false);
}
</script>