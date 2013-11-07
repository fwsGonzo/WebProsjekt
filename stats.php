<div class="tab">
	<p id="statsTab" onclick="toggleTab(1)">Stats</p>
	<p id="menuTab" onclick="toggleTab(2)">Menu</p>
	<script>
		function toggleTab(i)
		{
			var chosen;
			var notChosen;
			if( i == 1)
			{
				chosen = document.getElementById('stats');
				notChosen = document.getElementById('menu');
			}
			else
			{
				chosen = document.getElementById('menu');
				notChosen = document.getElementById('stats');
			}
			chosen.style.display="inline";
			notChosen.style.display="none";
		}
	</script>
</div>

<script src="stats.js" type="text/javascript">
</script>

<section id="stats">
    <h2 id="statsTitle">Statistics</h2>
	<table>
		<tr>
			<td>Written codelines (now):</td>
			<td id="statCodelines">x</td>
		</tr>
		<tr>
			<td>Codelines (this game):</td>
			<td id="codelinesThisGame">x</td>
		</tr>
		<tr>
			<td>Codelines (all time):</td>
			<td id="codelinesAllTime">x</td>
		</tr>
		<tr>
			<td>Session starter:</td>
			<td id="statSessionTime">x</td>
		</tr>
		<tr>
			<td>codelines per second:</td>
			<td id="statCPS">x</td>
		</tr>
		<tr>
			<td>Hand-made-codelines:</td>
			<td id="HMC">x</td>
		</tr>
		<tr>
			<td>Code clicks:</td>
			<td id="codeClicks">x</td>
		</tr>
	</table>
</section>