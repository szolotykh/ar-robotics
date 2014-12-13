function Robot(){
    this.ws = new WebSocket("ws://localhost:8001");
    this.ws.onopen = function(){ 
		console.log("ws.onopen");
    }
    this.ws.onmessage = function (evt){ 
        var msg = evt.data;
		var jMsg = JSON.parse(msg);
		console.log("ws.onmessage: " + jMsg.type + " = " + jMsg.value);

    }
	this.ws.onerror = function(){
		console.log("Error");
	}
    this.ws.onclose = function(){ 
        // websocket is closed.
        console.log("Connection is closed"); 
    }
	
	// Move
	this.forward = function(){
		this.ws.send("forward");
	}
	this.stop = function(){
		this.ws.send("stop");
	}
	this.left = function(){
		this.ws.send("left");
	}
	this.right = function(){
		this.ws.send("right");
	}
	
	// Sensors
	this.getTouch = function(){
		this.ws.send("touch");
	}
	this.getLight = function(){
		this.ws.send("light");
	}
	
	//Tone
	this.playTone = function(){
		this.ws.send("tone");
	}
}