// 
// JavaScript thingamajig
// 

var $toggleShow = ">> Vis";
var $toggleHide = "<< Gjem";

$(document).ready( function()
{
	// fade-in page content
	var $hside = $('#subframe');
	$( $hside ).hide();
	$( $hside ).fadeIn(400);
	
	// slide in title
	$('#title').hide();
	$('#title').fadeIn(200);
	
	// all toggle-ables default to hidden
	$('.toggleAble').hide();
	
	var $toggler = $('.toggler');
	// set default text
	$($toggler).text($toggleShow);
	// toggling on-click event
	$($toggler).click( function()
	{
		$(this).text($(this).next().is(":visible") ? $toggleShow : $toggleHide);
		$(this).next().toggle(250);
	});
	
});

