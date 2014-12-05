function Dialog(text){

	this.cCallout = createCanvasDescriptionCallout(text, 200);
	this.tCallout = new THREE.Texture(this.cCallout);
	this.tCallout.needsUpdate = true;
	
	this.model = new THREE.Mesh(
			new THREE.PlaneGeometry(this.cCallout.width/2, this.cCallout.height/2),
			new THREE.MeshBasicMaterial({
				map: this.tCallout,
				transparent: true,
				side: THREE.DoubleSide})
	);
	this.model.name = "Avatar dialog";
	this.model.position.set(100, 60, -10);
	/*
	this.setText = function(text){
		// Add description callous
		if(this.dialog){
			this.dialog.geometry.dispose();
			this.dialog.material.dispose();
			this.model.remove(this.dialog);
			this.dialog = undefined;
		}
	}
	*/
	
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
		alert("Avatar dialog");
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