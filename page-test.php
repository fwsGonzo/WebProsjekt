<h2>Farger</h2>
<a class="toggler" href="javascript:void(0)"> >> </a>
<div class="toggleAble">
	
	<input class="clbutton" type="button" value="Red"   onclick="setColors(1);" />
	<input class="clbutton" type="button" value="Green" onclick="setColors(2);" />
	<input class="clbutton" type="button" value="Blue"  onclick="setColors(3);" />
	
</div>

<hr/>

<h2>Hei</h2>
<a class="toggler" href="javascript:void(0)"> >> </a>
<div class="toggleAble">
	
<?php
	if ($secret_on)
	{
		echo "<h3>Rick Ross - Money Make Me Cum [Instrumental]</h3>";
		echo "
		<object width=425 \r\n
			height=350 data='http://www.youtube.com/v/iU1y6x6hXyg?autoplay=1' \r\n
			type='application/x-shockwave-flash'>                  \r\n
			<param name=src value='http://www.youtube.com/v/iU1y6x6hXyg' /> \r\n
		</object> \r\n";
	}
?>
	
</div>


<script type="text/javascript">
	
	// good old javascript, no jquery
	
	// set the color of all buttons on page
	function setColors(idx)
	{
		var $buttons = $('.clbutton');
		
		switch (idx)
		{
		case 1:
			$($buttons).css('background-color', 'red');
			break;
		case 2:
			$($buttons).css('background-color', 'green');
			break;
		case 3:
			$($buttons).css('background-color', 'blue');
			break;
		}
	}
	
</script>

