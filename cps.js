/**
 * CPS-o-meter
 * 
 * 
**/

var CPS_UPDATE_INTERVAL = 100; // milliseconds


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
		var self     = this;
		var interval = CPS_UPDATE_INTERVAL;
		
		// automatic cps updates
		setInterval( function()
		{
			// cps is measured in seconds, so we need to convert it to interval
			addCodelines(self.getCPS() * (interval / 1000));
			
		}, interval);
	}
}
var cps = new CPS(0);

