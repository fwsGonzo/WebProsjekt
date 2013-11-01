/**
 * 
 * 
**/

var mouseDown = false;
var clickPower = 1;

$('#keyboard').mousedown( function()
{
	mouseDown = true;
	// FIXME assumes normal clicking power
	keyboardClick(1.0);
});
$('#keyboard').mouseup( function()
{
	mouseDown = false;
});

function initKeyboard()
{
	// 
	updateKeyboard();
	
	// start automatic CPS timer
	startCPS();
}

function updateKeyboard()
{
	// total accumulated codelines
	var cl = getCodelines();
	$('#codelines').text(Math.round(cl * 100) / 100);
	
	// codelines per second
	calculateCPS();
	$('#cps').text(Math.round(cps * 100) / 100);
}

// adds codelines based on factor of clicking power
function keyboardClick(factor)
{
	var power = clickPower * factor;
	var cl = Number(localStorage.codelines) + power || power;
	
	localStorage.codelines = cl;
	$('#codelines').text(cl);
}
// adds codelines based on some number, eg. factor of cps
function addCodelines(number)
{
	var cl = Number(localStorage.codelines) + number || number;
	
	localStorage.codelines = cl;
	$('#codelines').text(cl);
}

function getCodelines()
{
	return Number(localStorage.codelines) || 0;
}

