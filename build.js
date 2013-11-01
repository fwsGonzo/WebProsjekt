/**
 * 
 * 
 * 
**/

var cps = 0;

function createBuildFunctions()
{
	$(".upgradeDiv").click( function()
	{
		// FIXME check that the upgrade is is cost range
		
		// user wants to purchase an upgrade (clicked)
		// find which upgrade it is
		var id = Number(this.getAttribute("number"));
		
		// FIXME subtract cost from codelines
		var upg = upgrades[id];
		var cost = upg.getCost();
		
		// add upgrade
		upg.upgrade();
		
		// update numbers to reflect change
		updateKeyboard();
		
		// update text
		$("#upgradeCaption" + id).text(
			upg.name + " " + upg.count + "  cost: " + upg.getCost()
		);
	});
}

function calculateCPS()
{
	// calculate cps from scratch, avoiding desynchs and bugs
	cps = 0;
	
	for(var i = 0; i < upgrades.length; i++)
	{
		cps += upgrades[i].count * upgrades[i].cps;
	}
}

function startCPS()
{
	var interval = 500;
	
	// automatic cps updates
	setInterval( function()
	{
		codelines += cps;
		// cps is measured in seconds, so we need to convert it to interval
		addCodelines(cps * (interval / 1000));
		
	}, interval);
}

