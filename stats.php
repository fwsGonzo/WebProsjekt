<div class="tab">
	<p id="statsTab" onclick="toggleTab(1)">Stats</p>
	<p id="menuTab" onclick="toggleTab(2)">Meny</p>
	<script>
		function toggleTab(i)
		{
			if( i == 1)
			{
				//$(document).getElementById('stats').style.color='blue';
				//var e = document.getElementById("stats");
				//e.style.display='none';
				$(".stats").hide();
				alert("Hello World!");
			}
			else
			{
				var e = document.getElementById("menu");
				
				//e.id = "ape";
				alert("bye world");
			}
		}
	</script>
</div>

<div class="stats">
	<table>
		<tr>
			<td id="statsTitle">General</td>
			<td></td>
		</tr>
		<tr>
			<td>Writen codelines (now):</td>
			<td class="codelines">x</td>
		</tr>
		<tr>
			<td>Codelines (this game):</td>
			<td class="codelinesThisGame">x</td>
		</tr>
		<tr>
			<td>Codelines (all time):</td>
			<td class="codelinesAllTime">x</td>
		</tr>
		<tr>
			<td>Session starter:</td>
			<td class="SessionTime">x</td>
		</tr>
		<tr>
			<td>codelines per second:</td>
			<td class="cps">x</td>
		</tr>
		<tr>
			<td>Hand-made-codelines:</td>
			<td class="HMC">x</td>
		</tr>
	</table>
</div>