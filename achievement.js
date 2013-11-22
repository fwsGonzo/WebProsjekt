
var achievements = [];

function achievementChecker(ccps)
{
	for(var i = 0; i < achievements.length; i++)
	{
		if( achievements[i].cps < ccps)
		{
			var element = document.getElementById('achievementPic'+i);
			(element).style.opacity = "1";
		}
	}
}

function achievement(name, desc, cps, picture )
{
	this.name = name;
	this.desc = desc;
	this.cps = cps;
	this.picture = picture;
}

function createAchievement(name, desc, cps, picture)
{
	achievements.push(
		new achievement(name, desc, cps, picture)
	);
}

function achievmentInit()
{
	createAchievement(
		"CPS 1",
		"Create 1,000 codes per seconds",
		1000,
		"pic.png"
	);
	createAchievement(
		"CPS 2",
		"Create 10,000 codes per seconds",
		10000,
		"pic.png"
	);
	createAchievement(
		"CPS 3",
		"Create 100,000 codes per seconds",
		100000,
		"pic.png"
	);
	createAchievement(
		"CPS 4",
		"Create 1,000,000 codes per seconds",
		1000000,
		"pic.png"
	);
	
	createAchievmentList();
}

function createAchievmentList()
{
	for(var i = 0; i < achievements.length; i++)
	{
		var $achiv = $('<div>',
		{
			class: 'achievementDiv',
			id   : 'achievement' + i,
			
		}).appendTo('#achievement');
		
		$('<img>',
		{
			class: 'achievementPic',
			id   : 'achievementPic' + i,
			
			src:   'icons/img' + i + '.png',
			alt:   achievements[i].name
			
		}).appendTo($achiv);
		
		// enable hovering dialogue
		hover("#achievement" + i, 
			achievements[i].name, 
			achievements[i].desc,
			""
		);
	}
}



