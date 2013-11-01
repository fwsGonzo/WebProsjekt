/**
 * Upgrades
 * 
 * 
**/

var upgrades = [];

var COST_MULTIPLIER = 1.2;

function Upgrade(name, desc, cost, cps)
{
	// attributes
	this.name = name;
	this.desc = desc;
	this.cost = cost;
	// visible if we have unlocked this upgrade
	this.visible = false;
	// enabled if we can afford this upgrade
	this.enabled = false;
	// corresponding HTML element
	this.id = 0;
	// the amount of codelines per second this upgrade
	// constantly gives
	this.cps  = cps;
	// the amount we have purchased of this upgrade
	this.count = 0;
	
	this.getCost = function()
	{
		return Math.round(this.cost * Math.pow(this.count + 1, COST_MULTIPLIER));
	}
	this.upgrade = function()
	{
		this.count += 1;
		
		// if the next upgrade in our list is disabled,
		// enable it
		if (this.id+1 < upgrades.length)
		{
			upgrades[this.id+1].show(true);
		}
		
		this.updateText();
	}
	this.show = function(toggle)
	{
		this.visible = toggle;
		if (toggle)
		{
			$("#upgradeDiv" + this.id).show();
		}
		else $("#upgradeDiv" + this.id).hide();
	}
	this.enable = function(toggle)
	{
		this.enabled = toggle;
		// FIXME
	}
	this.updateText = function()
	{
		// text: name [count]  cost: [cost]
		$("#upgradeCaption" + this.id).text(
			this.name + " " + this.count + "  cost: " + this.getCost()
		);
	}
}

function createUpgrade(name, desc, cost, cps)
{
	var upg = new Upgrade(name, desc, cost, cps);
	upgrades.push(upg);
}

function initUpgrades()
{
	createUpgrade(
		"Programming", 
		"Learn to program! There can be no code lines without programming.", 
		5, 1);
	createUpgrade(
		"Comment Standard", 
		"Name, Date, Original Author, Purpose, Intent, ...", 
		50, 10);
	createUpgrade(
		"Student Programmer", 
		"Slowly bloats the codebase by reinventing the wheel and using complex solutions to simple problems.", 
		500, 50);
	createUpgrade(
		"Moving Deadline", 
		"Your programming team now has to write code twice as fast, making sure that refactoring and problem space reduction never happens.", 
		5000, 500);
	createUpgrade(
		"Optimize planning",
		"",
		50000, 2000);
	createUpgrade(
		"Feature creep",
		"",
		500000, 10000);
	createUpgrade(
		"Assembly",
		"",
		5000000, 50000);
	createUpgrade(
		"Reduce redundancies",
		"",
		50000000, 120000);
	createUpgrade(
		"Government Project",
		"",
		550000000, 1500000);
	
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
		upgrades[i].id = i;
		upgrades[i].visible = visible;
		
		// create DIV element for a single upgrade
		var $upg = $('<div>',
		{
			class: 'upgradeDiv',
			id   : 'upgradeDiv' + i,
			number: i
			
		}).appendTo('#rightSection');
		
		// add caption
		$('<p>',
		{
			class: 'upgradeCaption',
			id   : 'upgradeCaption' + i,
			number: i
			
		}).appendTo($upg);
		
		// hide all upgrades that aren't discovered yet
		if (!visible) $($upg).hide();
		visible = false;
		
		// disable all upgrades we can't afford
		if (upgrades[i].getCost() > getCodelines())
		{
			// FIXME disable upgrade
		}
		
		upgrades[i].updateText();
	}
	
	// we can't just create the upgrade event at ready(),
	// we need to explicitly create it after we have created all the elements
	createBuildFunctions();
	
}

