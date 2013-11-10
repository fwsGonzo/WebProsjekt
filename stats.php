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
	<hr class="hbar" />
	
</div>

<script src="stats.js" type="text/javascript">
</script>

<section id="stats">
    <h2 id="statsTitle">Statistics</h2>
	<table>
		<tr>
			<td>Game started:</td>
			<td id="statGameStarted">0</td>
		</tr>
		<tr>
			<td>Session started:</td>
			<td id="statSessionStarted">0</td>
		</tr>
		<tr>
			<td>Codelines:</td>
			<td id="statCodelines">0</td>
		</tr>
		<tr>
			<td>Total codelines (this game):</td>
			<td id="codelinesThisGame">0</td>
		</tr>
		<tr>
			<td>Total codelines (all time):</td>
			<td id="codelinesAllTime">0</td>
		</tr>
		<tr>
			<td>Codelines/second (cps):</td>
			<td id="statCPS">0</td>
		</tr>
		<tr>
			<td>Keyboard clicks:</td>
			<td id="codeClicks">0</td>
		</tr>
		<tr>
			<td>Keyboard codeline contribution:</td>
			<td id="HMC">0</td>
		</tr>
	</table>
	<hr class="hbar" />
</section>

