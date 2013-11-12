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
		return Math.round(this.cost * Math.pow(COST_MULTIPLIER, this.count));
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
		enableBuilding($("#buildingDiv" + this.id), this.enabled);
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
	buildings.push(
		new Building(name, desc, cost, cps)
	);
}

function initBuildings()
{
	createBuilding(
		"Programming", 
		"Learn to program! There can be no code lines without programming.", 
		8, 1);
	createBuilding(
		"Comment Standard", 
		"Name, Date, Original Author, Purpose, Intent, ...", 
		100, 10);
	createBuilding(
		"Student Programmer", 
		"Slowly bloats the codebase by reinventing the wheel and using complex solutions to simple problems.", 
		1000, 50);
	createBuilding(
		"Moving Deadline", 
		"Your programming team now has to write code twice as fast, making sure that refactoring and problem space reduction never happens.", 
		11000, 500);
	createBuilding(
		"Optimize planning",
		"Due to time constraints, it's better to reduce project planning, and instead hire more developers.",
		120000, 2000);
	createBuilding(
		"Feature creep",
		"Your manager wants to please the customer, and while certain features never were part of the project initially, they certainly are now.",
		1500000, 10000);
	createBuilding(
		"Assembly",
		"The manager learned assembly in the 80's. Let's make sure even the most trivial things takes days to achieve!",
		12000000, 50000);
	createBuilding(
		"Reduce redundancies",
		"Let go of some IT server staff, since they probably don't do anything anyways. Makes sure you have to rewrite everything now and then, because of outdated or lost backups.",
		150000000, 120000);
	createBuilding(
		"Government Project",
		"This software is almost immediately outdated, and is estimated to require 15 additional years to reach completion. Instead of programming, your team is silently looking for work and is covering their asses with public \"I knew it all along\" e-mails.",
		1100000000, 1500000);
	
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
			alt:   buildings[i].name
			
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
		
		// selected / deselected images
		$('.buildingDiv')
		.on('mouseover', function()
		{
			// set selected image, if applicable
			if (buildingEnabled(this))
			$(this).css('background-image', 'url(img/button_selected.png)');
		})
		.on('mouseout', function()
		{
			// restore
			enableBuilding($(this), buildingEnabled(this));
		});
		
		// enable hovering dialogue
		hover("#buildingDiv" + i, 
			buildings[i].name, 
			buildings[i].desc,
			"Base CPS: " + formattedNumber(buildings[i].cps));
		
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

function enableBuilding(b, en)
{
	if (en)
	{
		$(b).css('background-image', 'url(img/button.png)');
	}
	else
	{
		$(b).css('background-image', 'url(img/button_disabled.png)');
	}
}

function buildingEnabled(b)
{
	// user wants to purchase an upgrade (clicked)
	// find which upgrade it is
	var id = Number(b.getAttribute("number"));
	
	// find upgrade object, and calculate cost
	var building = buildings[id];
	var cost     = building.getCost();
	
	// check that the upgrade is is cost range
	var cl = getCodelines();
	return (cl >= cost);
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
		
		// check if we need to enable any upgrades
		testUpgrades();
		
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

