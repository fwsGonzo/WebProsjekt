/**
 * Hover-over popup boxes
 * 
 * 
**/

function hover(element, text)
{
	$(element).hover(
	function(event) // show
	{
		$("#popup").innerHTML = text;
		$("#popup").css(
		{
			left: event.pageX + 1,
			top:  event.pageY + 1
			
		}).stop().show(100);
	},
	function(event) // hide
	{
		$("#popup").hide();
	});
}

