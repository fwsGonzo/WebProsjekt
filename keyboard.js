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
	cps.start();
}

function updateKeyboard()
{
	// total accumulated codelines
	var cl = getCodelines();
	$('#codelines').text(formattedNumber(Math.round(cl)));
	
	// codelines per second
	cps.calculate();
	$('#cps').text(formattedNumber(Math.round(cps.getCPS() * 100) / 100));
}

// adds codelines based on factor of clicking power
function keyboardClick(factor)
{
	var power = clickPower * factor;
	var cl = Number(localStorage.codelines) + power || power;
	setCodelines(cl);
}
// adds codelines based on some number, eg. factor of cps
function addCodelines(number)
{
	var cl = Number(localStorage.codelines) + number || number;
	setCodelines(cl);
}

function getCodelines()
{
	return Number(localStorage.codelines) || 0;
}
function setCodelines(cl)
{
	localStorage.codelines = cl;
	updateKeyboard();
}

function getClickPower()
{
	return 1 + cps.getCPS() * 0.1;
}

// from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function formattedNumber(x)
{
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

