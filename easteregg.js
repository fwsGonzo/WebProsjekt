/**
 * 
 * Easter egg collection
 * 
 * Easter egg's does stange things to the web site.
 * 
 */

/*
	If player have 1337 cps he will then be rewarded 500 000 codelines
*/
function leetProgrammer(cps)
{
	var test = Math.round(cps);
	if(leetChecker = 1 && test == "1337")
	{
		document.getElementById('leetProgrammer').style.display="inline";
		//('#leetProgrammer').style.display="inline";
		//document.getElementById('leetProgrammer').fadeOut(5000);
		$("#leetProgrammer").fadeOut(5000);
		leetChecker == 0;
		addCodelines(500000)
	}
}
var leetChecker = 1;