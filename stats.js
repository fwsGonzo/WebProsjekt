/**
 * For stat-page and menu-page
 *
**/

// initializes some stats
function initStats()
{
	var currentDate = new Date();
	$("#statSessionStarted").text(currentDate);
	
	// game started date
	var gameStarted = Date.parse(localStorage.gameStarted) || currentDate;
	$("#statGameStarted").text(gameStarted);
}

// update cps
function updateStatsCPS(cps)
{
	$('#statCPS').text(formattedNumber(Math.round(cps * 100) / 100));
}

// update codelines
function updateStatsCL(cl)
{
	$('#statCodelines').text(formattedNumber(Math.round(getCodelines())));

	// add codelines to totals
	totalCodelines(cl);
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
	// add clicking power to physically made codelines
	var c = Number(localStorage.handClick) + click || click;
	localStorage.handClick = c;
	$('#HMC').text(formattedNumber(Math.round(c)));
	totalCodelines(click);
	
	// add a 1 to keyboard click counter stat
	var d = Number(localStorage.mouseClicks) + 1 || 1;
	localStorage.mouseClicks = d;
	$('#codeClicks').text(formattedNumber(Math.round(d)));
}

// hard reset: resets everything
function reset()
{
	localStorage.clear();
}

// soft reset: reset just this game
function resetThisGame()
{
	var a = Number(localStorage.allTime);
	localStorage.clear();
	localStorage.allTime = a;
}
