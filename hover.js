/**
 * Hover-over popup boxes
 * 
 * 
**/

function hover(element, text)
{
	$(element).hover(
	function() // show
	{
		alert("hover");
		$("#popup").innerHTML = text;
		$("#popup").css(
		{
			left: event.pageX + 1,
			top:  event.pageY + 1
			
		}).stop().show(100);
	},
	function() // hide
	{
		alert("hide hover");
		$("#popup").hide();
	});
}

