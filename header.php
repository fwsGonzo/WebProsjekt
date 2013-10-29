<!DOCTYPE html>
<html>

<head>
	<meta charset=utf-8>
	<meta name="description" content="Nabbete hjemmeside">
	<meta name="keywords" content="Web-Prosjekt hjemmeside">
	<meta name="author" content="AAW">
	
	<title>
		<?php
			if (!isset($title))
			{
				$title = "fixme: untitled";
			}
			
			echo "$title";
		?>
	</title>
	
	<link rel="shortcut icon" href="favicon.ico" />
	<link rel="stylesheet" id="stylesheet" title="Black" href="index.css" />
	<link rel="alternate stylesheet" title="Gray" href="index2.css" />
	<link rel="alternate stylesheet" title="White" href="index3.css" />
	
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript">
	</script>
</head>

<body>
	<section id="hovedside">
		
		<header class="inparagraph">
			<h1 id="title">
				<?php echo "$title"; ?>
			</h1>
		</header>
		
		<?php include 'menu.php'; ?>
		
		<article id="subframe" class="coolframe">
		
