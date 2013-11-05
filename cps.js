/**
 * CPS-o-meter
 * 
 * 
**/

function CPS(newCPS)
{
	this.cps = Number(newCPS);
	
	this.getCPS = function()
	{
		return this.cps;
	}
	this.calculate = function()
	{
		// calculate cps from scratch, avoiding desynchs and bugs
		var c = 0;
		for(var i = 0; i < buildings.length; i++)
		{
			c += buildings[i].getCPS();
		}
		this.cps = c;
		return this.cps;
	}
	this.start = function()
	{
		var interval = 50;
		
		// automatic cps updates
		setInterval( function()
		{
			// NOTE: setInterval is not run as member function,
			// so we (unfortunately) have to explicitly access 'cps'
			
			// cps is measured in seconds, so we need to convert it to interval
			addCodelines(cps.getCPS() * (interval / 1000));
			
		}, interval);
	}
}
var cps = new CPS(0);

