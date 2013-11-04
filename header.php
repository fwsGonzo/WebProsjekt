<!DOCTYPE html>
<html>

<head>
	<meta charset=utf-8>
	<meta name="description" content="Codelines Webapp">
	<meta name="keywords" content="clicker game">
	<meta name="author" content="Gruppe 7">
	
	<title>
		<?php
			if (!isset($title))
			{
				$title = "FIXME: untitled";
			}
			
			echo "$title";
		?>
	</title>
	
	<link rel="stylesheet" id="stylesheet" title="Black" href="index.css" />
	
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript">
	</script>
</head>

<body>
	<section id="hovedside">
		
		<header class="inparagraph">
		<!--	<h1 id="title">
				<?php echo "$title"; ?>
			</h1> -->
		</header>
		
		
		<article id="subframe" class="coolframe">
		
