/**
 * 
 * 
 * 
**/

function CPS()
{
	this.cps = 0;
	
	this.getCPS = function()
	{
		return this.cps;
	}
	this.calculate = function()
	{
		// calculate cps from scratch, avoiding desynchs and bugs
		this.cps = 0;
		for(var i = 0; i < upgrades.length; i++)
		{
			this.cps += upgrades[i].count * upgrades[i].cps;
		}
	}
	this.start = function()
	{
		var interval = 500;
		
		// automatic cps updates
		setInterval( function()
		{
			// cps is measured in seconds, so we need to convert it to interval
			addCodelines(this.cps * (interval / 1000));
			
		}, interval);
	}
}
var cps = new CPS();

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
	});
}

