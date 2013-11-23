/**
 * Hover-over popup boxes
 * 
 * 
**/

function hover(element, title, text, info)
{
	$(element).hover(
	function(event) // show
	{
		$("#popupTitle").text(title);
		$("#popupText").text(text);
		$("#popupInfo").text(info);
		$("#popup").css(
		{
			left: event.pageX + 1,
			top:  event.pageY + 1,
			height: 'auto'
			
			
		}).stop().toggle(100);
	},
	function(event) // hide
	{
		$("#popup").hide();
	});
}

