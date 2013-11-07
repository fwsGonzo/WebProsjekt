/*
 * For stat-page and menu-page
 *
 */


function updgradeStats(cps, haha)
{
	
	var cl = getCodelines();
	
	$('#statCodelines').text(formattedNumber(Math.round(cl)));
	//$('.codelinesThisGame').text(formattedNumber(Math.round(cl)));
	$('#statCPS').text(formattedNumber(Math.round(cps)));
	
}

function totalHandClick(click)
{
	var c = Number(localStorage.handClick) + click || click;
	localStorage.handClick = c;
	$('#HMC').text(formattedNumber(Math.round(c)));
}

function reset()
{
	localStorage.clear();
}