function Dialog(text){

	var cCallout = createCanvasDescriptionCallout(text, 200);
	var tCallout = new THREE.Texture(cCallout);
	tCallout.needsUpdate = true;
	
	this.model = new THREE.Mesh(
			new THREE.PlaneGeometry(1,1),
			new THREE.MeshBasicMaterial({
				map: tCallout,
				transparent: true,
				side: THREE.DoubleSide})
	);
	this.model.scale.set(cCallout.width/2, cCallout.height/2, 1);
	this.model.position.set(120, 70, -10);
	
	this.setText = function(text){
		this.model.material.dispose();
		var cCallout = createCanvasDescriptionCallout(text, 200);
		var tCallout = new THREE.Texture(cCallout);
		tCallout.needsUpdate = true;
		this.model.material.map = tCallout;
		this.model.material.needsUpdate = true;
		this.model.scale.set(cCallout.width/2, cCallout.height/2, 1);
	}
}

function Avatar(){
	this.textures = {
		'e3' : THREE.ImageUtils.loadTexture('./img/anime-girl-e3.png')
	};
	this.expression = 'e3';
	this.model = new THREE.Mesh(
		new THREE.PlaneGeometry(87.5, 200),
		new THREE.MeshBasicMaterial({
			map: this.textures[this.expression],
			transparent: true,
			side: THREE.DoubleSide
		})
	);
	this.model.position.set(0, 0 , -100);
	this.model.rotation.set(-Math.PI/2, -Math.PI/2, 0);
	
	this.setExpression = function(exp){
		if(!this.textures.hasOwnProperty(exp)){
			console.log("Error: Avatar does not have expression '"+ exp +"'");
			return;
		}
		this.expression = exp;
		this.model.material.map = this.textures[exp];
		this.model.material.needsUpdate = true;
	}
	// ------------------- Dialog -------------------------------
	this.dialog = new Dialog({text: "Hello!!!", fontSize:40});
	
	this.dialog.onClick = function(){
		scenario();
	}
	
	this.model.add(this.dialog.model);
	
	this.children = [this.dialog];
}

function Marker(size, color){
	this.model = new THREE.Mesh(
		new THREE.BoxGeometry(size, size, size),
		new THREE.MeshLambertMaterial({
			color: color,
			side: THREE.DoubleSide 
		})
	);
	//this.model.overdraw = true;
	this.model.position.set(100, -200, -10);
}
// ---------------------------------- LegoPart --------------------------------
function LegoPart(src){
	var scope = this;
	
	this.load = function(){
		var loader = new THREE.JSONLoader();
		loader.load(src , function( geometry, materials ) {
			for(var i=0; i<materials.length; i++)
				materials[i].side = THREE.DoubleSide;
			var material = new THREE.MeshFaceMaterial(materials);
			
			scope.model = new THREE.Mesh(geometry, material);
			scope.model.scale.set( 25, 25, 25 );
			scope.model.position.set( 200, 20, 250 );
			scope.model.rotation.set(-Math.PI/2, Math.PI/2, 0);
			if(scope.onLoad !== undefined)
				scope.onLoad();
		} );
	}
}
// ---------------------------------- ARArrow ----------------------------------
function ARArrow(src){
	var arrowImg = THREE.ImageUtils.loadTexture(src);
	
	this.model = new THREE.Mesh(
		new THREE.PlaneGeometry(350, 269),
		new THREE.MeshBasicMaterial({
			map: arrowImg,
			transparent: true,
			side: THREE.DoubleSide
		})
	);
	this.model.scale.set(0.5, 0.5, 0.5);
	this.model.position.set(0, 0 , 0);
	this.model.rotation.set(0, 0, 0);
}

function AvatarSpace(){
	this.objects = [];

	// Add scene object
	this.add = function(ob){
		this.model.add(ob.model);
		this.objects.push(ob);
		ob.scene = this;	
	}
	this.remove = function(ob){
		this.model.remove(ob.model);
		this.objects.splice(this.objects.indexOf(ob), 1);
		ob.scene = null;
	}
	
	// Init Space
	this.model = new THREE.Object3D();
	this.model.matrixAutoUpdate = false;

	this.avatar = new Avatar();
	/*
	this.avatar.onClick = function(){
		if(this.expression=="e1")
			this.setExpression("e2");
		else
			this.setExpression("e1");
	}
	*/
	
	this.add(this.avatar);
	this.dialog = this.avatar.dialog;

	// ----------------------------- Light ---------------------------------------
	this.directionalLight = new THREE.DirectionalLight(0xffffff);
	this.model.add(this.directionalLight);
	// -------------------------- Marker (Example) -------------------------------
	/* 
	this.sensorOne = new Marker(30, "#0000FF");
	this.sensorOne.onClick = function(){
		alert("sensorOne");
	}
	this.add(this.sensorOne);
	*/
	
	// ----------------------------- Joystick -----------------------------------
	this.arrowStraight = new ARArrow("img/arrow-straight.png");
	this.arrowStraight.model.position.set(150,0,-1);
	this.arrowStraight.model.rotation.set(0,0,0);
	this.arrowStraight.onClick = function(){
		robot.forward();
		setTimeout(function(){robot.stop()}, 500);
	}
	
	this.arrowRight = new ARArrow("img/arrow-right.png");
	this.arrowRight.model.position.set(80,-120,0);
	this.arrowRight.model.rotation.set(0,0,-Math.PI/2);
	this.arrowRight.onClick = function(){
		robot.left();
		setTimeout(function(){robot.stop()}, 500);
	}
	
	this.arrowLeft = new ARArrow("img/arrow-left.png");
	this.arrowLeft.model.position.set(80,120,0);
	this.arrowLeft.model.rotation.set(0,0,-Math.PI/2);
	this.arrowLeft.onClick = function(){
		robot.right();
		setTimeout(function(){robot.stop()}, 500);
	}
		
	this.showJoystick = function(){
		this.add(this.arrowStraight);
		this.add(this.arrowRight);
		this.add(this.arrowLeft);
	}
	this.hideJoystick = function(){
		this.remove(this.arrowStraight);
		this.remove(this.arrowRight);
		this.remove(this.arrowLeft);
	}
	
	// ----------------------------- Touch sensor ------------------------------------------
	this.touchSensorDialog = new Dialog({text:"OFF", fontSize:40});
	this.touchSensorDialog.model.position.set(-220,-80,-250);
	this.touchSensorDialog.model.rotation.set(-Math.PI/2, -Math.PI/2, 0);
	
	this.showTouchSensor = function(){
		this.add(this.touchSensorDialog);
		this.touchSensorInterval = setInterval(function(){
			robot.getTouch();
		}, 200);
	}
	this.updateTouchSensor = function(val){
		this.touchSensorDialog.setText({text:val, fontSize:40});
	}
	this.hideTouchSensor = function(){
		clearInterval(this.touchSensorInterval);
		this.remove(this.touchSensorDialog);
	}
	// ----------------------------- Light sensor ------------------------------------------
	this.lightSensorDialog = new Dialog({text:"ADC: 0", fontSize:40});
	this.lightSensorDialog.model.position.set(-220,200,-250);
	this.lightSensorDialog.model.rotation.set(-Math.PI/2, -Math.PI/2, 0);
	
	this.showLightSensor = function(){
		this.add(this.lightSensorDialog);
		this.lightSensorInterval = setInterval(function(){
			robot.getLight();
		}, 200);
	}
	this.updateLightSensor = function(val){
		this.lightSensorDialog.setText({text:val, fontSize:40});
	}
	this.hideLightSensor = function(){
		clearInterval(this.lightSensorInterval);
		this.remove(this.lightSensorDialog);
	}
	
	// Lego Part
	this.showLegoExtension = function(){
		this.add(this.legoPart);
	}
	this.hideLegoExtension = function(){
		this.remove(this.legoPart);
	}
	
	// ----------------------------- Event onClick -----------------------------------------
	this.onClick = function(ob){

		for(var i=0; i<this.objects.length; i++){
			var cOb = this.objects[i]
			if(ob == cOb.model){
				if(this.objects[i].onClick !== undefined)
					this.objects[i].onClick();
				break;
			}
			if(cOb.hasOwnProperty('children')){
				for(var j=0; j<cOb.children.length; j++){
					if(ob == cOb.children[j].model){
						if(cOb.children[j].onClick !== undefined)
							cOb.children[j].onClick();
						break;
					}
				}
			}
		}
	}
}