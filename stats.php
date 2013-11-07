<div class="tab">
	<p id="statsTab" onclick="toggleTab(1)">Stats</p>
	<p id="menuTab" onclick="toggleTab(2)">Meny</p>
	<script>
		function toggleTab(i)
		{
			var chosen;
			var notChosen;
			if( i == 1)
			{
				//chosen = $(".stats");
				//notchosen = $(".menu");
				chosen = document.getElementById('stats');
				notChosen = document.getElementById('menu');
			}
			else
			{
				//chosen = $(".menu");
				//notChosen = $(".stats");	
				chosen = document.getElementById('menu');
				notChosen = document.getElementById('stats');
			}
			chosen.style.display="inline";
			notChosen.style.display="none";
		}
	</script>
</div>

<section id="stats">
    <h2 id="statsTitle">Statistics</h2>
	<table>
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
</section>