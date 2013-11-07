/**
 * Everything related to keyboard, codelines and cps visually
 * Also calls some of the statistics update functions
 * 
**/

var mouseDown = false;

$('#keyboard').mousedown( function()
{
	mouseDown = true;
	keyboardClick();
});
$('#keyboard').mouseup( function()
{
	mouseDown = false;
});

function initKeyboard()
{
	// update keyboard numbers
	updateKeyboard();
	// canvas animation
	matrix = new Matrix("#thematrix");
	matrix.start();
	// create keyboard animation functions
	createKeyboardAnimation();
}

function updateKeyboard()
{
	// total accumulated codelines
	var cl = getCodelines();
	$('#codelines').text(formattedNumber(Math.round(cl)));
	
	// if the cps has changed, the clicking power has changed too
	// clicking power
	$('#clickpower').text(formattedNumber(Math.round(getClickPower())));	
}
function updateCPS()
{
	// codelines per second
	var c = cps.calculate();
	$('#cps').text(formattedNumber(Math.round(c * 100) / 100));
	
	// update cps on stats section
	updateStatsCPS(c);
}

// adds codelines based on factor of clicking power
function keyboardClick()
{
	var power = getClickPower();
	var cl = Number(localStorage.codelines) + power || power;
	setCodelines(cl);
	totalHandClick(power);
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
	// save new codelines in localstorage
	localStorage.codelines = cl;
	// update numbers visible to player
	updateKeyboard();
	// gaining or losing codelines changes which buildings
	// are available for purchase
	updateBuildings();
}

function getClickPower()
{
	return 1 + cps.getCPS() * 0.15;
}

// from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function formattedNumber(x)
{
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

function createKeyboardAnimation()
{
	var distance = 3;	
	
    $("#keyboard").mousedown( function()
    {
		var marginTop = parseInt($(this).css("margin-top"));
		marginTop  += distance;
		$(this).css("margin-top", marginTop + "px")
		
		var marginLeft = parseInt($(this).css("margin-left"));
		marginLeft += distance;
		$(this).css("margin-left", marginLeft + "px");

    })
    $("#keyboard").mouseup( function()
    {
		var marginTop = parseInt($(this).css("margin-top"));
		marginTop  -= distance;
		$(this).css("margin-top", marginTop + "px")
		
		var marginLeft = parseInt($(this).css("margin-left"));
		marginLeft -= distance;
		$(this).css("margin-left", marginLeft + "px");
    });
}

