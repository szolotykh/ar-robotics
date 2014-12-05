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
	this.model.name = "Avatar dialog";
	this.model.position.set(100, 60, -10);
	
	this.setText = function(text){
		this.model.material.dispose();
		var cCallout = createCanvasDescriptionCallout(text, 200);
		var tCallout = new THREE.Texture(cCallout);
		tCallout.needsUpdate = true;
		this.model.material.map = tCallout;
		this.model.material.needsUpdate = true;
		this.model.scale.set(cCallout.width/2, cCallout.height/2, 1);
	}
	
	
	
	// Events
	this.onClick = function(){}
}

function Avatar(){
	this.textures = {
		'e1' : THREE.ImageUtils.loadTexture('./img/anime-girl-e1.png'),
		'e2' : THREE.ImageUtils.loadTexture('./img/anime-girl-e2.png')
	};
	this.expression = 'e1';
	this.model = new THREE.Mesh(
		new THREE.PlaneGeometry(87.5, 200),
		new THREE.MeshBasicMaterial({
			map: this.textures['e1'],
			transparent: true,
			side: THREE.DoubleSide
		})
	);
	this.model.name = "avatar-body";
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
	this.dialog = new Dialog("Anime are Japanese animated productions usually featuring hand-drawn or computer animation. The word is the abbreviated pronunciation of animation in Japanese, where this term references all animation.");
	this.dialog.onClick = function(){
		this.setText("Hello!!!");
		this.onClick=function(){
			this.setText("How are you?");
		}
	}
	this.model.add(this.dialog.model);
	
	this.children = [this.dialog];

	// Events
	this.onClick = function(){}
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
	
	// Events
	this.onClick = function(){}
}

function AvatarSpace(){

	this.objects = [];

	// Add scene object
	this.add = function(ob){
		this.model.add(ob.model);
		this.objects.push(ob);
		ob.scene = this;	
	}
	
	// Init Space
	this.model = new THREE.Object3D();
	this.model.matrixAutoUpdate = false;

	this.avatar = new Avatar();
	//this.avatar.setDialog("Anime are Japanese animated productions usually featuring hand-drawn or computer animation. The word is the abbreviated pronunciation of animation in Japanese, where this term references all animation.");
	this.avatar.onClick = function(){
		alert("Avatar");
	}
	this.add(this.avatar);

	// Light
	this.directionalLight = new THREE.DirectionalLight(0xffffff);
	this.model.add(this.directionalLight);

	this.sensorOne = new Marker(30, "#0000FF");
	this.sensorOne.onClick = function(){
		alert("sensorOne");
	}
	this.add(this.sensorOne);
	
	this.onClick = function(ob){

		for(var i=0; i<this.objects.length; i++){
			var cOb = this.objects[i]
			if(ob == cOb.model){
				this.objects[i].onClick();
				break;
			}
			if(cOb.hasOwnProperty('children')){
				for(var j=0; j<cOb.children.length; j++){
					if(ob == cOb.children[j].model){
						cOb.children[j].onClick();
						break;
					}
				}
			}
		}
		
		/*
		if(ob.name=="avatar-body"){
			this.avatar.setExpression("e2");
		}else{
			alert("ok");
		}
		*/
	}
	
	this.info = function(){
		console.log("AvatarSpace");
	}
}