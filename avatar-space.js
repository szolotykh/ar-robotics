function AvatarSpace(){

	this.createModel = function(){
		var model = new THREE.Object3D();

		var testCube = new THREE.Mesh(
			new THREE.BoxGeometry( 20, 20, 20 ),
			new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
		);
		testCube.position.z = -10;
		testCube.position.x = 100;
		model.add(testCube);
			
		var material = new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('./g1.png'),
			transparent: true,
			side: THREE.DoubleSide
		});

		var characterPlaneTest = new THREE.Mesh(
			new THREE.PlaneGeometry(87.5, 200), material
			//new THREE.MeshBasicMaterial({color:0x00ffff, side: THREE.DoubleSide})
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
		return model;
	}
	
	this.info = function(){
		console.log("AvatarSpace");
	}
}