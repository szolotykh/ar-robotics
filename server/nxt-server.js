var ws = require("nodejs-websocket")
var Nxt = require("./nxt").Nxt;
var nxt = new Nxt("COM4");
var server;
var clientConn;

nxt.sp.on("open", function () {
	console.log("Robot connected")
	// Set up hardware
	nxt.set_input_state(nxt.INPUT_PORT_1, nxt.SWITCH, nxt.BOOLEANMODE);
	nxt.set_input_state(nxt.INPUT_PORT_2, nxt.LIGHT_INACTIVE, nxt.BOOLEANMODE);
	
	// Done
	nxt.play_tone(440, 1000);
	console.log("Hardware set up")

	// Create websocket server
	server = ws.createServer(function (conn) {
		console.log("Client connected")
		clientConn = conn;
		conn.on("text", function (str) {
			console.log("Received "+str)
			switch (str) {
				case "forward":
					conn.sendText('{ "type":"msg", "value": "^" }');
					nxt.set_output_state(nxt.MOTOR_A, 30, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
					nxt.set_output_state(nxt.MOTOR_B, 30, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
				break;
				case "left":
					conn.sendText('{ "type":"msg", "value": "<-" }');
					nxt.set_output_state(nxt.MOTOR_A, -20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
					nxt.set_output_state(nxt.MOTOR_B, 20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
				break;
				case "right":
					conn.sendText('{ "type":"msg", "value": "->" }');
					nxt.set_output_state(nxt.MOTOR_A, 20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
					nxt.set_output_state(nxt.MOTOR_B, -20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
				break;
				case "back":
					conn.sendText('{ "type":"msg", "value": "V" }');
					nxt.set_output_state(nxt.MOTOR_A, -20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
					nxt.set_output_state(nxt.MOTOR_B, -20, 0x05, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
				break;
				case "stop":
					conn.sendText('{ "type":"msg", "value": "X" }');
					nxt.set_output_state(nxt.MOTOR_A, 0, nxt.BRAKE, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
					nxt.set_output_state(nxt.MOTOR_B, 0, nxt.BRAKE, nxt.REGULATION_MODE_MOTOR_SPEED, 0, nxt.MOTOR_RUN_STATE_RUNNING, 0);
				break;
				case "touch":
					nxt.get_input_values(nxt.INPUT_PORT_1);
				break;
				case "light":
					nxt.get_input_values(nxt.INPUT_PORT_2);
				break;
				case "tone":
					conn.sendText('{ "type":"msg", "value": "Tone" }');
					nxt.play_tone(440, 1000);
				break;
				default:
					conn.sendText('{ "type":"msg", "value": "not" }');
			}
		})
		conn.on("close", function (code, reason) {
			console.log("Connection closed")
		})
	}).listen(8001);


	nxt.sp.on('data', function(data) {
		data = data.slice(2);
		console.log('data length: ' + data.length);
		console.log('data received: ');
		console.log(data);
		
		// Input value
		if(data[1] == 0x07){
			// Input port
			if(data[3] == nxt.INPUT_PORT_1){
				var adc = data[11]*256+data[10];
				console.log('Touch ADC: ');
				console.log(adc);
				clientConn.sendText('{ "type":"touch", "value": ' + adc.toString() + ' }');
			}
			if(data[3] == nxt.INPUT_PORT_2){
				var adc = data[11]*256+data[10];
				console.log('Light ADC: ');
				console.log(adc);
				clientConn.sendText('{ "type":"light", "value": ' + adc.toString() + ' }');
			}
		}
	});
});



