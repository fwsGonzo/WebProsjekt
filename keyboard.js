/**
 * 
 * 
**/

var mouseDown = false;

$('#keyboard').mousedown( function()
{
	mouseDown = true;
	addCodeline();
});
$('#keyboard').mouseup( function()
{
	mouseDown = false;
});

function initKeyboard()
{
	updateKeyboard();
}

function updateKeyboard()
{
	var cl = Number(localStorage.codelines) || 0;
	$('#codelines').text(cl);
}

function addCodeline()
{
	var cl = Number(localStorage.codelines) + 1 || 1;
	
	localStorage.codelines = cl;
	$('#codelines').text(cl);
}
