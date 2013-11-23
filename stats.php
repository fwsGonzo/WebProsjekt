<div class="tab">
	<a href="javascript:toggleTab(1)"><p class="statsTab">Stats</p></a>
	<a href="javascript:toggleTab(2)"><p class="statsTab">Menu</p></a>
        <a href="javascript:toggleTab(3)"><p class="statsTab">Help</p></a>
	<script>
		function toggleTab(i)
		{
			var chosen;
			var notChosen;
                        var notChosen2;
                        
			if( i === 1)
			{
				chosen = document.getElementById('stats');
				notChosen = document.getElementById('help');
                                notChosen2 = document.getElementById('menu');
			}
                        else if( i === 2 )
                        {
                            chosen = document.getElementById('menu');
                            notChosen = document.getElementById('stats');
                            notChosen2 = document.getElementById('help');
                        }
			else
			{
				chosen = document.getElementById('help');
				notChosen = document.getElementById('stats');
                                notChosen2 = document.getElementById('menu');
			}
			chosen.style.display="inline";
			notChosen.style.display="none";
                        notChosen2.style.display="none";
		}
	</script>
	<hr class="hbar" />
	
</div>

<script src="stats.js" type="text/javascript">
</script>
<script src="easteregg.js" type="text/javascript">
</script>

<section id="stats">
    <h2 id="statsTitle">Statistics</h2>
	<table>

		<tr>
			<td>Total codelines<br>(this game):</td>
			<td id="codelinesThisGame">0</td>
		</tr>
		<tr>
			<td>Total codelines<br>(all time):</td>
			<td id="codelinesAllTime">0</td>
		</tr>
		<tr>
			<td>Codelines/second<br>(cps):</td>
			<td id="statCPS">0</td>
		</tr>
		<tr>
			<td>Keyboard clicks:</td>
			<td id="codeClicks">0</td>
		</tr>
		<tr>
			<td>Keyboard codeline<br>contribution:</td>
			<td id="HMC">0</td>
		</tr>
	</table>
	<hr class="hbar" />
        
        
        <h2>Achievements</h2>

        <div class="achievement" id="achievement">

        </div>

        <script src="achievement.js" type="text/javascript">
        </script>
        
</section>

