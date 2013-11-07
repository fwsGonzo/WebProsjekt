/*
 * For stat-page and menu-page
 *
 */
 
 //initiate the stats
function initStats()
{
	
}

//upgrade codelines and cps in statistics
function updgradeStats(cps, tick)
{
	var cl = getCodelines();
	
	$('#statCodelines').text(formattedNumber(Math.round(cl)));
	$('#statCPS').text(formattedNumber(Math.round(cps)));
	
	totalCodelines(tick)
}

// upgrade how many codelines accumulated for this game 
// and for all time in statistics
function totalCodelines(tick)
{
	var a = Number(localStorage.thisGame) + tick || tick;
	var b = Number(localStorage.allTime) + tick || tick;
	localStorage.thisGame = a;
	localStorage.allTime = b;
	$('#codelinesThisGame').text(formattedNumber(Math.round(a)));
	$('#codelinesAllTime').text(formattedNumber(Math.round(b)));
}

//How many codelines gained by clicking
function totalHandClick(click)
{
	//Updates how many codelines made by clicking
	var c = Number(localStorage.handClick) + click || click;
	localStorage.handClick = c;
	$('#HMC').text(formattedNumber(Math.round(c)));
	totalCodelines(click);
	
	//updates the number of mouseclicks made
	var d = Number(localStorage.mouseClicks) + 1 || 1;
	localStorage.mouseClicks = d;
	$('#codeClicks').text(formattedNumber(Math.round(d)));
}

//reset everything
function reset()
{
	localStorage.clear();
}

//reset just this game
function resetThisGame()
{
	var a = Number(localStorage.allTime);
	localStorage.clear();
	localStorage.allTime = a;
}