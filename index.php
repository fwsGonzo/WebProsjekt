<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');	
	
	session_start();
	
	$pageno = 0;
	$secret = false;
	
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
	
	// before including content,
	// create secret variable if it's not already there
	if (!isset($_SESSION["secret"]))
	{
		$_SESSION["secret"] = 0;
	}
	$secret = intval($_SESSION["secret"]);
	$secret_on = false;
	
	// check to see secret progress
	$order = array(4, 3, 2, 0, 2, 3, 4);
	// advance to next if order matches
	if ($pageno == $order[$secret])
	{
		$secret++;
		if ($secret == 7)
		{
			$secret = 6; // make sure we can refresh secret
			$secret_on = true;
		}
	}
	else
	{
		$secret = 0;
	}
	// remember for later
	$_SESSION["secret"] = $secret;
	
	// include main content
	include $page;
	
	// initialize everything
?>
	<script src="init.js" type="text/javascript">
	</script>
	
<?php
	// and finally, page footer
	include 'footer.php';
?>

