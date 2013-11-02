/**
 * Resumes or starts (initializes) a new game
 * 
 * 
**/

$(document).ready( function()
{
	// the keyboard we click on to gain codelines manually
	// from keyboard.js:
	initKeyboard();
	
	// upgrades manager
	// from upgrades.js:
	initUpgrades();
	
	// start automatic CPS timer
	cps.start();
	updateCPS();
});

