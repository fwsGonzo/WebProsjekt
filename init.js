/**
 * Resumes or starts (initializes) a new game
 * 
 * 
**/

$(document).ready( function()
{
	// initialize achievments
	achievmentInit();

	// the keyboard we click on to gain codelines manually
	// from keyboard.js:
	initKeyboard();
	
	// initialize 'buildings'
	// from buildings.js:
	initBuildings();
	
	// initialize 'upgrades' which affect buildings
	// from upgrades.js:
	initUpgrades();
	
	// start automatic CPS timer
	cps.start();
	updateCPS();
	
	// initialize some stats strings
	initStats();

});

