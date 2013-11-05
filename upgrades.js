/**
 * Upgrades
 * 
 * Upgrades normally boost cps by boosting a certain building type.
 * As the player buys more buildings, new upgrades are unlocked.
 * 
 * Note:
 * building base cps = cps
 * building cps      = count * cps
 * 
**/

var upgrades = [];

function Upgrade(name, desc, cost, building, req)
{
	// my index
	this.id = 0;
	// attributes
	this.name = name;
	this.desc = desc;
	this.cost = cost;
	// the building this upgrade is connected to
	this.building = building;
	// the requirements for this upgrade showing up
	this.requirement = req;
	// 0 = invisible, 1 = can be bought, 2 = enabled
	this.state = 0;
	// the amount of codelines per second this upgrade
	// permanently gives
	this.getCPS  = undefined;
	
	this.requirementsMet = function()
	{
		return buildings[this.building].count == this.requirement;
	}
	
	this.buy = function()
	{
		// FIXME enable upgrade
		this.state = 2;
		// remove this upgrade
		$(this).hide();
	}
}

function initUpgrades()
{
	// create each upgrade manually
	
	var upg = new Upgrade(
		"Xtreme Programming",
		"Write everything in one go, and never look back",
		100,
		0, 1); // requires 1 of building 0 (Programming)
	upg.getCPS = function(base_cps)
	{
		return base_cps + 2;
	}
	
	upgrades.push(upg);
	
	// set each upgrades unique id
	for (var i = 0; i < upgrades.length; i++)
	{
		upgrades[i].id = i;
	}
}

// load any potentially stored upgrade counts
function resumeUpgrades()
{
	// FIXME
}

function applyUpgrades(building, cps)
{
	// apply any upgrades that affect 'building',
	// starting with base cps = cps
	var c = cps;
	
	// then calculate in each upgrade using custom cps function
	for (var i = 0; i < upgrades.length; i++)
	{
		if (upgrades[i].state == 2 && upgrades[i].building == building)
		{
			c = upgrades[i].getCPS(c);
		}
	}
	// finally, return total base cps
	return c;
}

