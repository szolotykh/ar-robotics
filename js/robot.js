function Robot(){
    this.ws = new WebSocket("ws://localhost:8001");
	this.ws.p = this;
    this.ws.onopen = function(){ 
		console.log("ws.onopen");
    }
    this.ws.onmessage = function (evt){ 

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

function VirtualRobot(){
	// Move
	this.forward = function(){
		console.log("forward");
	}
	this.stop = function(){
		console.log("stop");
	}
	this.left = function(){
		console.log("left");
	}
	this.right = function(){
		console.log("right");
	}
	
	// Sensors
	this.getTouch = function(){
		console.log("touch");
	}
	this.getLight = function(){
		console.log("light");
	}
	
	//Tone
	this.playTone = function(){
		console.log("tone");
	}
}