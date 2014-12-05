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
	
	this.setDialog = function(text){
	// Add description callous
		if(this.dialog){
			this.dialog.geometry.dispose();
			this.dialog.material.dispose();
			this.model.remove(this.dialog);
			this.dialog = undefined;
		}
		
		var cCallout = createCanvasDescriptionCallout(text, 200);
		var tCallout = new THREE.Texture(cCallout);
		tCallout.needsUpdate = true;
	
		this.dialog = new THREE.Mesh(
			new THREE.PlaneGeometry(cCallout.width/2, cCallout.height/2),
			new THREE.MeshBasicMaterial({
				map: tCallout,
				transparent: true,
				side: THREE.DoubleSide})
		);
		this.dialog.position.set(100, 60, -10);
		this.model.add(this.dialog);
	}
}

function AvatarSpace(){

	this.avatar = new Avatar();
	this.avatar.setDialog("Anime are Japanese animated productions usually featuring hand-drawn or computer animation. The word is the abbreviated pronunciation of animation in Japanese, where this term references all animation.");
	//this.avatar.setDialog("Hello!");

	this.createMarker = function(size, color){
		var material = new THREE.MeshBasicMaterial({ color: color });
		var radius = size;
		var segments = 16;
		var circleGeometry = new THREE.CircleGeometry( radius, segments );
		var marker = new THREE.Mesh( circleGeometry, material );
		marker.doubleSided = true;
		return marker;
	}

	this.model = new THREE.Object3D();
	this.model.matrixAutoUpdate = false;
	// Test cube
	this.testCube = new THREE.Mesh(
		new THREE.CubeGeometry(50, 50, 50),
		new THREE.MeshLambertMaterial({
			color: 'blue',
			side: THREE.DoubleSide 
		})
	);
	this.testCube.overdraw = true;
	this.testCube.position.set(100, -200, -10);
	this.model.add(this.testCube);
		
	this.directionalLight = new THREE.DirectionalLight(0xffffff);
	this.model.add(this.directionalLight);

	// Add avatar model to AvatarSpace
	this.model.add(this.avatar.model);	
	
	//model.add( legoBlock );
	
	this.info = function(){
		console.log("AvatarSpace");
	}
}