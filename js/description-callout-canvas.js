function createCanvasDescriptionCallout(p){
	if (p == undefined){
		p = {};
	}
	p.text = p.text||".";
	p.font = p.font||"Georgia"
	p.fontSize = p.fontSize||14;
	p.maxWidth = p.maxWidth||300;

	var x0 = 100;
	var y0 = 5;
	var dy = Math.ceil(p.fontSize*1.25);
	
	var words = p.text.split(' ');
    var line = '';
	var lines = [];
	
	//Create canvas
	var canvasCallout = document.createElement('canvas');
	canvasCallout.width = 30;
    canvasCallout.height = 30;
	var ctx = canvasCallout.getContext("2d");
	ctx.font = p.fontSize.toString() + "px " + p.font;
	
	// Create lines from words
	var line="";
	for(var i=0; i<words.length; i++){
		var tempLine = line + words[i] + ' ';
        var lineMetrics = ctx.measureText(tempLine);
		if(lineMetrics.width >= p.maxWidth){
			lines.push(line);
			line="";
			i--;
		}else{
			if(i == words.length-1){
				lines.push(tempLine);
			}else{
				line = tempLine;
			}
		}
	}
	
	// Calculate new height of canvas
	var CalloutHeight = lines.length*dy;
	
	var CalloutWidth = p.maxWidth;
	if(lines.length == 1)
		CalloutWidth = ctx.measureText(lines[0]).width;
	
	// Resize canvas
	canvasCallout.width = x0 + CalloutWidth + 5;
    canvasCallout.height = y0 + CalloutHeight + 15;
	ctx = canvasCallout.getContext("2d");
	ctx.font = p.fontSize.toString() + "px " + p.font;
	
	// Draw callout body
	ctx.beginPath();
    ctx.moveTo(x0-10, y0-3);
    ctx.lineTo(x0 + CalloutWidth +3, y0-3);
    ctx.lineTo(x0 + CalloutWidth +3, y0 + CalloutHeight+12);
    ctx.lineTo(x0-10, y0 + CalloutHeight+12);
	ctx.lineTo(x0-10, y0 + 30);
	ctx.lineTo(5, y0 + 30);
	ctx.lineTo(x0-10, y0-3);
	ctx.closePath();
	
	ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
	
	ctx.fillStyle = '#000000';
	for(var i=0; i<lines.length; i++){
		ctx.fillText(lines[i], x0, y0 + (i+1)*dy);
	}
	return canvasCallout;
}