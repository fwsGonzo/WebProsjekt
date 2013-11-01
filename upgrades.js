/**
 * Upgrades
 * 
 * 
**/

var upgrades = [];

var COST_MULTIPLIER = 1.2;

function Upgrade(name, desc, cost)
{
	this.name = name;
	this.desc = desc;
	this.cost = cost;
	this.count = 0;
	
	this.getCost = function()
	{
		return this.cost * Math.pow(this.count + 1, COST_MULTIPLIER);
	}
}

function createUpgrade(name, desc, cost)
{
	var upg = new Upgrade(name, desc, cost);
	upgrades.push(upg);
}

function initUpgrades()
{
	createUpgrade(
		"Programming", 
		"Learn to program! There can be no code lines without programming.", 
		5);
	createUpgrade(
		"Comment Standard", 
		"Name, Date, Original Author, Purpose, Intent, ...", 
		50);
	createUpgrade(
		"Student Programmer", 
		"Slowly bloats the codebase by reinventing the wheel and using complex solutions to simple problems.", 
		500);
	createUpgrade(
		"Moving Deadline", 
		"Your programming team now has to write code twice as fast, making sure that refactoring and problem space reduction never happens.", 
		5000);
	createUpgrade(
		"Optimize planning",
		"",
		50000);
	createUpgrade(
		"Feature creep",
		"",
		500000);
	createUpgrade(
		"Assembly",
		"",
		5000000);
	createUpgrade(
		"Reduce redundancies",
		"",
		50000000);
	createUpgrade(
		"Government Project",
		"",
		550000000);
	
	// resume (any) stored data
	resumeUpgrades();
	// create HTML from upgrade list
	createUpgradeList();
}

// load any potentially stored upgrade counts
function resumeUpgrades()
{
	// FIXME
}

function createUpgradeList()
{
	var enabled = true;
	var visible = true;
	
	for(var i = 0; i < upgrades.length; i++)
	{
		// create DIV element for a single upgrade
		var $upg = $('<div>',
		{
			class: 'upgradeDiv',
			id   : 'upgradeDiv' + i
			
		}).appendTo('#rightSection');
		
		// add caption
		$('<p>',
		{
			class: 'upgradeCaption',
			id   : 'upgradeCaption' + i
			
		}).text(upgrades[i].name).appendTo($upg);
		
		// hide all upgrades that aren't discovered yet
		if (!visible) $($upg).hide();
		visible = false;
		
		// disable all upgrades we can't afford
		if (upgrades[i].getCost() > getCodelines())
		{
			// FIXME disable upgrade
		}
	}
}

