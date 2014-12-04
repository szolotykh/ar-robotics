function AvatarSpace(){

	this.createMarker = function(size, color){
		var material = new THREE.MeshBasicMaterial({ color: color });
		var radius = size;
		var segments = 16;
		var circleGeometry = new THREE.CircleGeometry( radius, segments );
		var marker = new THREE.Mesh( circleGeometry, material );
		marker.doubleSided = true;
		return marker;
	}


	this.createModel = function(){
		var model = new THREE.Object3D();
		
		var testCube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), new THREE.MeshLambertMaterial({
			color: 'blue',
			side: THREE.DoubleSide 
		}));
		testCube.overdraw = true;

		
		testCube.position.z = -10;
		testCube.position.x = 100;
		testCube.position.y = -200;
		
		model.add(testCube);
		
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		model.add(directionalLight);

		var characterPlaneTest = new THREE.Mesh(
			new THREE.PlaneGeometry(87.5, 200),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture('./g1.png'),
				transparent: true,
				side: THREE.DoubleSide
			})
		);
		characterPlaneTest.position.z = -100;
		characterPlaneTest.rotation.y = -Math.PI/2;
		characterPlaneTest.rotation.x = -Math.PI/2;
		model.add(characterPlaneTest);	
			
		// Add description callous
		var cCallout = createCanvasDescriptionCallout("Anime are Japanese animated productions usually featuring hand-drawn or computer animation. The word is the abbreviated pronunciation of animation in Japanese, where this term references all animation.", 200);
		var tCallout = new THREE.Texture(cCallout);
		tCallout.needsUpdate = true;
	
		var characterDialogPlane = new THREE.Mesh(
			new THREE.PlaneGeometry(cCallout.width/2, cCallout.height/2),
			new THREE.MeshBasicMaterial({
				map: tCallout,
				transparent: true,
				side: THREE.DoubleSide})
		);
		characterDialogPlane.position.x = 5;
		characterDialogPlane.position.y = 90;
		characterDialogPlane.position.z = -150;
		characterDialogPlane.rotation.y = -Math.PI/2;
		characterDialogPlane.rotation.x = -Math.PI/2;
		model.add(characterDialogPlane);
		
		model.add( legoBlock );
		
		return model;
	}
	
	this.info = function(){
		console.log("AvatarSpace");
	}
}