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
	this.enabled = false;
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
	this.build = function()
	{
		this.count += 1;
		this.updateText();
	}
	this.show = function(toggle)
	{
		//this.visible = toggle;
		if (toggle)
		{
			$("#buildingDiv" + this.id).show();
		}
		else $("#buildingDiv" + this.id).hide();
	}
	this.costTest = function()
	{
		// disable if we can't afford this building
		if (this.getCost() > getCodelines())
		{
			// disable this building
			this.enable(false);
		}
		else
		{
			// enable this building
			this.enable(true);
		}
	}
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
	this.updateText = function()
	{
		// text: name [count]  cost: [cost]
		$("#buildingCaption" + this.id).text(
			this.name + " " + this.count + "  cost: " + formattedNumber(this.getCost())
		);
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
		"",
		50000, 2000);
	createBuilding(
		"Feature creep",
		"",
		500000, 10000);
	createBuilding(
		"Assembly",
		"",
		5000000, 50000);
	createBuilding(
		"Reduce redundancies",
		"",
		50000000, 120000);
	createBuilding(
		"Government Project",
		"",
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
			
		}).appendTo('#rightSection');
		
		// add caption
		$('<p>',
		{
			class: 'buildingCaption',
			id   : 'buildingCaption' + i,
			number: i
			
		}).appendTo($upg);
		
		// enable hovering dialogue
		hover("#buildingDiv" + i, buildings[i].desc);
		
		// set upgrade paragraph text
		buildings[i].updateText();
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
		
		// update numbers to reflect change
		updateKeyboard();
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

