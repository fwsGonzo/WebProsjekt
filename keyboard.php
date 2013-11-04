<canvas id="thematrix" width=400 height=1000>
<!-- Note:
	Canvas needs to be placed in such a way that
	its located under / covers everything else
	
	Stuff inside here is shown when the canvas is unsupported
	FIXME static background image
-->
</canvas>
<div id="codelinesBox">
    <p>Codelines: <pre id="codelines">0</pre></p>
</div>
<div id="cspBox">
    <p>cps:       <pre id="cps">0</pre></p>
</div>
<div id="clickpowerBox">
    <p>clickpower:<pre id="clickpower">0</pre></p>
</div>


<script>
$(document).ready(function(){
    $("#keyboard").mousedown(function(){
        var marginTop = parseInt($(this).css("margin-top"));
        var marginLeft = parseInt($(this).css("margin-left"));
        marginTop = marginTop + 3;
        marginLeft = marginLeft + 3;
            $(this).css("margin-top", marginTop + "px").css("margin-left", marginLeft + "px");

    }).mouseup(function(){
        var marginTop = parseInt($(this).css("margin-top"));
        var marginLeft = parseInt($(this).css("margin-left"));
        marginTop = marginTop - 3;
        marginLeft= marginLeft - 3;
            $(this).css("margin-top", marginTop + "px").css("margin-left", marginLeft + "px");
    });
});
</script>

<img id="keyboard" src="keyboard.png" alt="~ Keyboard ~" />

<script src="canvas.js" type="text/javascript">
</script>
<script src="keyboard.js" type="text/javascript">
</script>
<script src="hover.js" type="text/javascript">
</script>

