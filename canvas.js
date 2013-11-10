/**
 * Matrix-effect in canvas
 * Uses map() to randomize letters as it goes down
 * Nothing special, but looks ok
 * 
**/

var matrix;
var MATRIX_INTERVAL = 60;

function Matrix(c)
{
	// must use #id to still be able to use jquery selector
	// needed for width() and height()
	this.canvas = c;
	
	this.start = function()
	{
		var self = this;
		var w = $(this.canvas).attr("width");
		var h = $(this.canvas).attr("height");
		
		// estimated character size in pixels
		// (don't really care, as long as its >=)
		var estsize = 10;
		// minimum travel distance
		var mintravel = 100;
		
		var mat = Array(w * estsize).join(0).split('');
		var ctx = $(self.canvas)[0].getContext('2d');
		ctx.font = '10pt monospace';
		
		self.loop = setInterval(
		function()
		{
			// fill with black based on how much cps we currently have
			// calculate clear rate
			var clrate = 1.0 - Math.min(1.0, cps.getCPS() / 1000000);
			clrate = 0.1 + Math.pow(clrate, 2.5) * 0.4;
			// fill
			ctx.fillStyle='rgba(0,0,0,' + clrate + ')';
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle='#0F0';			
			
			// scatter characters
			mat.map(
			function(y, index)
			{
				var text = String.fromCharCode(97 + Math.random()*26);
				var x = index * (estsize + 1);
				ctx.fillText(text, x, y);
				
				if (y > mintravel + Math.random() * h * estsize)
				{
					mat[index] = 0;
				}
				else
				{
					mat[index] = y + estsize;
				}			
			});
			
		}, MATRIX_INTERVAL);
		
	}
	
}

