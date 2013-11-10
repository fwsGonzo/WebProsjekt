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
	
	// enables upgrades that have just become available
	this.enableTest = function()
	{
		if (this.state == 0)
		if (this.requirementsMet())
		{
			// save state
			this.state = 1;
			localStorage.setItem("upgrade" + this.id, this.state);
			// and show it
			$(this.getElement()).show();
		}
	}
	
	// resumes this upgrade (from page refresh etc.)
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
				localStorage.setItem("upgrade" + this.id, this.state);
				// and show it
				$(this.getElement()).show();
			}
		}
		else // for state = 2, the upgrade was previously purchased,
		{    // so we will just re-purchase it
			this.buy();
		}
	}
	
	this.buy = function()
	{
		// enable upgrade by passing building cps through a cps function
		buildings[this.building].cps = this.getCPS(buildings[this.building].cps);
		
		// remove/hide this upgrade from upgrade list
		$(this.getElement()).hide();
		
		// save state
		this.state = 2;
		localStorage.setItem("upgrade" + this.id, this.state);
		
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
			
			src:   'img/upgrades/upgrade' + this.id + '.png',
			alt:   this.name
			
		}).hide().appendTo($("#upgrades"));
		
		// hover info popup
		hover(this.getElement(), "Upgrade: " + this.name, this.desc);
		
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
	
	// xtreme programming (0)
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
	
	// brogramming (2)
	upgrades.push(
	new Upgrade(
		"Brogramming",
		"Students learn from each other, further convoluting and diluting the codebase! " +
		"Increases student codelines by 50%.",
		2000,
		2, 1, // requires 1 of building 2 (Student Programmer)
		
		// the upgrade function that modifies base cps
		function(base_cps)
		{
			return base_cps * 1.5;
		}
	));
	
	// set initial values for upgrades
	for (var i = 0; i < upgrades.length; i++)
	{
		upgrades[i].id = i;
		upgrades[i].create();
		// set initial state for upgrade
		upgrades[i].resume();
	}
}

// each time player purchases a building, we will check
// if each upgrade has suddenly become available
// slightly inefficient O(n), but there are never many upgrades
function testUpgrades()
{
	for (var i = 0; i < upgrades.length; i++)
	{
		upgrades[i].enableTest();
	}
}

