/**
 * 
 * 
 * 
**/

function CPS(newCPS)
{
	this.cps = Number(newCPS);
	
	this.getCPS = function()
	{
		return this.cps;
	}
	this.calculate = function()
	{
		// calculate cps from scratch, avoiding desynchs and bugs
		var c = 0;
		for(var i = 0; i < upgrades.length; i++)
		{
			c += upgrades[i].count * upgrades[i].cps;
		}
		this.cps = c;
		return this.cps;
	}
	this.start = function()
	{
		var interval = 50;
		
		// automatic cps updates
		setInterval( function()
		{
			// NOTE: setInterval is not run as member function,
			// so we (unfortunately) have to explicitly access 'cps'
			
			// cps is measured in seconds, so we need to convert it to interval
			addCodelines(cps.getCPS() * (interval / 1000));
			
		}, interval);
	}
}
var cps = new CPS(0);

function createBuildFunctions()
{
	$(".upgradeDiv").click( function()
	{
		// user wants to purchase an upgrade (clicked)
		// find which upgrade it is
		var id = Number(this.getAttribute("number"));
		
		// find upgrade object, and calculate cost
		var upg = upgrades[id];
		var cost = upg.getCost();
		
		// check that the upgrade is is cost range
		var cl = getCodelines();
		if (cl < cost) return;
		// subtract cost
		setCodelines(cl-cost);
		
		// add upgrade
		upg.upgrade(id);
		
		// update numbers to reflect change
		updateKeyboard();
		updateCPS();
	});
}

