/**
 * 
 * 
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
		var w = $(this.canvas).width();
		var h = $(this.canvas).height();
		
		var mat = Array(300).join(0).split('');
		var ctx = $(self.canvas)[0].getContext('2d');
		
		self.loop = setInterval(
		function()
		{
			ctx.fillStyle='rgba(0,0,0,.05)';
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle='#0F0';			
			ctx.font = '10pt monospace';
			
			mat.map(
			function(y, index)
			{
				var text = String.fromCharCode(1e2+Math.random()*33);
				var x = (index * 10) + 10;
				ctx.fillText(text, x, y);
				
				if(y > 100 + Math.random() * 1e4)
				{
					mat[index] = 0;
				}
				else
				{
					mat[index] = y + 10;
				}			
			});
			
		}, MATRIX_INTERVAL);
		
	}
	
}

