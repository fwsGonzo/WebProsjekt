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

function Upgrade(name, desc, cost, building, req, cps_function)
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
	// such as requiring player to own 1 of building b
	this.requirement = req;
	// 0 = invisible, 1 = visible, 2 = purchased
	this.state = 0;
	// the amount of codelines per second this upgrade
	// permanently gives
	this.getCPS  = cps_function;
	
	// returns the html element (string) representing this upgrade
	this.getElement = function()
	{
		return "#upgradeIcon" + this.id;
	}
	
	// for an upgrade to be visible, the requirements must be met
	this.requirementsMet = function()
	{
		return buildings[this.building].count >= this.requirement;
	}
	this.resume = function()
	{
		// resume previous state, if any
		this.state = localStorage.getItem("upgrade" + this.id) || 0;
		
		// if the state is not 2, we will just validate
		if (this.state != 2)
		{
			if (this.requirementsMet())
			{
				// if the requirements are immediately met,
				// just enable the upgrade
				this.state = 1; // available for purchase
				$(this.getElement()).show();
			}
		}
		else // for state = 2, the upgrade was previously purchased,
		{	// so we will just re-purchase it
			this.buy();
		}
	}
	
	this.buy = function()
	{
		// enable upgrade by passing building cps through a cps function
		buildings[this.building].cps = this.getCPS(buildings[this.building].cps);
		
		// remove/hide this upgrade from upgrade list
		this.state = 2;
		$(this.getElement()).hide();
		
		// update cps to reflect change
		updateCPS();
	}
	
	this.create = function()
	{
		// creates upgrade image/icon
		$('<img>',
		{
			class: 'upgradeIcon',
			id   : 'upgradeIcon' + this.id,
			
			src:   'icons/img' + this.id + '.png',
			alt:   this.name
			
		}).hide().appendTo($("#upgrades"));
		
		// hover info popup
		hover(this.getElement(), this.name, this.desc);
		
		// click (purchase) event
		var self = this;
		
		$(this.getElement()).click(
		function()
		{
			// check that the upgrade is is cost range
			var cl = getCodelines();
			if (cl < self.cost) return;
			// subtract cost
			setCodelines(cl - self.cost);
			
			// apply change
			self.buy();
		});
		
	}
}

function initUpgrades()
{
	// create each upgrade manually
	
	upgrades.push(
	new Upgrade(
		"Xtreme Programming",
		"Write everything in one go, and never look back",
		100,
		0, 1, // requires 1 of building 0 (Programming)
		
		// the upgrade function that modifies base cps
		function(base_cps)
		{
			return base_cps + 2;
		}
	));
	
	// set each upgrades unique id
	for (var i = 0; i < upgrades.length; i++)
	{
		upgrades[i].id = i;
		upgrades[i].create();
		// set initial state for upgrade
		upgrades[i].resume();
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

