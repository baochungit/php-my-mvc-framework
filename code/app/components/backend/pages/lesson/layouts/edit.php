<?php defined( '_CEXEC' ) or die( 'Restricted access' ); 
	Template::addJs($this->base_url . '/assets/js/json2.js', 'end-head');
?>
<form id="lesson_frm" method="post">
<table>
<tr>
	<td>Driver Name:</td>
 	<td><input type="text" name="driver" value="<?php echo $this->slide_data['driver'] ?>" /></td>
</tr>
<tr>
	<td>Slide No:</td>
 	<td><input type="text" name="slide_no" value="<?php echo $this->slide_data['slide_no'] ?>" /></td>
</tr>
<tr>
	<td>Type:</td>
 	<td><input type="text" name="type" value="<?php echo $this->slide_data['type'] ?>" /></td>
</tr>
<tr>
	<td>Data:</td>
 	<td><textarea name="data"><?php echo $this->slide_data['data'] ?></textarea></td>
</tr>
<tr>
	<td>Manifest:</td>
 	<td><textarea name="manifest"><?php echo $this->slide_data['manifest'] ?></textarea></td>
</tr>
</table>
</form>

<script>
	var jsonEditorPopup = null;

  $(document).ready(function(e) {
		$('textarea[name="data"], textarea[name="manifest"]').click(function(e) {
		  var width = 820;
			var height = 450;
			var left = (screen.width / 2) - (width / 2);
		  var top = (screen.height / 2) - (height / 2);

      jsonEditorPopup = window.open('?com=backend&page=lesson&case=open-json-editor&field=' + encodeURIComponent($(this).attr('name')), 'jsonEditor', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
    });
  });

	function sendJSONCallback(field) {
  	jsonEditorPopup.getJSONCallback($('textarea[name="' + field + '"]').val());
	}
	
	function storeJSONCallback(field, json) {
		$('textarea[name="' + field + '"]').val(JSON.stringify(json));
	}
</script>