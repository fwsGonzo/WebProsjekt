/**
 * Buildings
 * 
 * 
**/

var buildings = [];

var COST_MULTIPLIER = 1.2;

function Building(name, desc, cost, cps)
{
	// attributes
	this.name = name;
	this.desc = desc;
	this.cost = cost;
	// enabled if we can afford (another of) this building
	this.enabled = true;
	// corresponding HTML element
	this.id = 0;
	// the amount of base codelines per second this building
	// constantly gives
	this.cps  = cps;
	// the amount we have purchased of this upgrade
	this.count = 0;
	
	this.getCost = function()
	{
		return Math.round(this.cost * (1 + Math.pow(COST_MULTIPLIER, this.count)));
	}
	this.getCPS = function()
	{
		return this.count * this.cps;
	}
	// load from storage
	this.resume = function()
	{
		var count = localStorage.getItem("building" + this.id) || "0";
		this.count = parseInt(count);
		this.updateText();
	}
	// create one building (of this type)
	this.build = function()
	{
		this.count += 1;
		this.updateText();
		// save locally
		localStorage.setItem("building" + this.id, this.count);
	}
	
	// show/hide building
	this.show = function(toggle)
	{
		//this.visible = toggle;
		if (toggle)
		{
			$("#buildingDiv" + this.id).show();
		}
		else $("#buildingDiv" + this.id).hide();
	}
	
	// enables and disables building based on whether or
	// not we can afford it right now (no return value)
	this.costTest = function()
	{
		// disable if we can't afford this building
		if (this.getCost() > getCodelines())
		{
			// disable this building
			if (this.enabled) this.enable(false);
		}
		else
		{
			// enable this building
			if (!this.enabled) this.enable(true);
		}
	}
	// enable / disable building
	this.enable = function(toggle)
	{
		this.enabled = toggle;
		if (this.enabled)
		{
			$("#buildingDiv" + this.id).attr("class", "buildingDiv");
		}
		else
		{
			$("#buildingDiv" + this.id).attr("class", "buildingDisabledDiv");
		}
	}
	// update cost & count
	this.updateText = function()
	{
		$("#buildingCost" + this.id).text(this.count);
		$("#buildingCount" + this.id).text(formattedNumber(this.getCost()));
	}
}

function createBuilding(name, desc, cost, cps)
{
	var upg = new Building(name, desc, cost, cps);
	buildings.push(upg);
}

function initBuildings()
{
	createBuilding(
		"Programming", 
		"Learn to program! There can be no code lines without programming.", 
		5, 1);
	createBuilding(
		"Comment Standard", 
		"Name, Date, Original Author, Purpose, Intent, ...", 
		50, 10);
	createBuilding(
		"Student Programmer", 
		"Slowly bloats the codebase by reinventing the wheel and using complex solutions to simple problems.", 
		500, 50);
	createBuilding(
		"Moving Deadline", 
		"Your programming team now has to write code twice as fast, making sure that refactoring and problem space reduction never happens.", 
		5000, 500);
	createBuilding(
		"Optimize planning",
		"Due to time constraints, it's better to reduce project planning, and instead hire more developers.",
		50000, 2000);
	createBuilding(
		"Feature creep",
		"Your manager wants to please the customer, and while certain features never were part of the project initially, they certainly are now.",
		500000, 10000);
	createBuilding(
		"Assembly",
		"The manager learned assembly in the 80's. Let's make sure even the most trivial things takes days to achieve!",
		5000000, 50000);
	createBuilding(
		"Reduce redundancies",
		"Let go of some IT server staff, since they probably don't do anything anyways. Makes sure you have to rewrite everything now and then, because of outdated or lost backups.",
		50000000, 120000);
	createBuilding(
		"Government Project",
		"This software is almost immediately outdated, and is estimated to require 15 additional years to reach completion. Instead of programming, your team is silently looking for work and is covering their asses with public \"I knew it all along\" e-mails.",
		550000000, 1500000);
	
	// resume (any) stored data
	resumeBuildings();
	// create HTML from upgrade list
	createBuildingList();
}

// load any potentially stored upgrade counts
function resumeBuildings()
{
	// FIXME
}

function createBuildingList()
{
	var enabled = true;
	var visible = true;
	
	for(var i = 0; i < buildings.length; i++)
	{
		buildings[i].id = i;
		
		// create DIV element for a single upgrade
		var $upg = $('<div>',
		{
			class: 'buildingDiv',
			id   : 'buildingDiv' + i,
			number: i
			
		}).appendTo('#buildings');
		
		// add building icon
		$('<img>',
		{
			class: 'buildingIcon',
			id   : 'buildingIcon' + i,
			
			src:   'icons/img' + i + '.png',
			alt:   buildings[i].name,
			
		}).appendTo($upg);
		
		// add text caption
		$('<p>',
		{
			class: 'buildingText',
			id   : 'buildingText' + i,
			
		}).appendTo($upg).text(buildings[i].name);
		
		// add amount of owned buildings
		$('<p>',
		{
			class: 'buildingCount',
			id   : 'buildingCount' + i,
			
		}).appendTo($upg).text('0');
		
		// add building cost
		$('<p>',
		{
			class: 'buildingCost',
			id   : 'buildingCost' + i,
			
		}).appendTo($upg).text('0');
		
		// enable hovering dialogue
		hover("#buildingDiv" + i, buildings[i].desc);
		
		// resume any previous count, or set to 0
		buildings[i].resume();
	}
	
	// we can't just create the upgrade event at ready(),
	// we need to explicitly create it after we have created all the elements
	createBuildFunctions();
	
	// perform cost test enabling/disabling this building visually
	// note: put this last, as it may change class attribute
	updateBuildings();
}

function createBuildFunctions()
{
	// we don't need to create unique functions for each building
	// since each building knows its own id
	$(".buildingDiv").click( function()
	{
		// user wants to purchase an upgrade (clicked)
		// find which upgrade it is
		var id = Number(this.getAttribute("number"));
		
		// find upgrade object, and calculate cost
		var building = buildings[id];
		var cost     = building.getCost();
		
		// check that the upgrade is is cost range
		var cl = getCodelines();
		if (cl < cost) return;
		// subtract cost
		setCodelines(cl-cost);
		
		// add a building
		building.build(id);
		
		// update cps on keyboard section
		updateCPS();
	});
}

// used from setCodelines, as buildings could be enabled/disabled
// by changes in the amount of codelines available
function updateBuildings()
{
	for (var i = 0; i < buildings.length; i++)
	{
		buildings[i].costTest();
	}
}

