<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');	
	
	session_start();
	
	// page header
	include 'header.php';
	
	// include main content
	include 'page-main.php';
	
	// initialize everything
?>
	<script src="init.js" type="text/javascript">
	</script>
	
	<!-- hidden popup box -->
	<div id="popup">
		<h3 id='popupTitle'>Popup infobox</h3>
		<p  id='popupText' >Popup infotext</p>
	</div>
	
<?php
	// and finally, page footer
	include 'footer.php';
?>

