<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');	
	
	session_start();
	
	$pageno = 0;
	
	// page index from 'page' if it's encapsulated in a GET request
	if (isset($_GET['page']))
		$pageno = $_GET['page'];
	
	// choose appropriate title and page based on page= url parameter
	switch ($pageno)
	{
	case 0:
	case 1:
		$title = "Codelines Writer";
		$page  = 'page-main.php';
		break;
	
	default:
		$title = "Codelines Writer";
		$page  = 'page-main.php';
		break;
	}
	
	// page header
	include 'header.php';
	
	// include main content
	include $page;
	
	// initialize everything
?>
	<script src="init.js" type="text/javascript">
	</script>
	
	<!-- hidden popup box -->
	<div id="popup">Test</div>
	
	
<?php
	// and finally, page footer
	include 'footer.php';
?>

