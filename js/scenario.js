function endingStep(){
	avatarSpace.dialog.setText({text: "This is the end of my demo. Thank you!!!", fontSize:35});
}

function driveStep(){
	avatarSpace.dialog.setText({text: "Right now let's try to drive", fontSize:30});
	avatarSpace.showJoystick();
	ContinueAlert(function(){
		avatarSpace.hideJoystick();
		endingStep(); //------------------> TO ENDING STEP
	});
}

function sensorsStep(){
	avatarSpace.dialog.setText({text: "Here are two sensors, try to interact with them.", fontSize:30});
	avatarSpace.showTouchSensor();
	avatarSpace.showLightSensor();
	ContinueAlert(function(){
		avatarSpace.hideTouchSensor();
		avatarSpace.hideLightSensor();
		driveStep(); //------------------> TO DRIVE STEP
	});
}

function customizeStep(){
	avatarSpace.dialog.setText({text: "Let's start from customizing robot.", fontSize:30});
	avatarSpace.dialog.onClick=function(){
		this.setText({text: "Do you want to see what kind of extensions you can build for this robot?", fontSize:25});
		this.onClick=function(){}
		YesNoAlert(
			function(){
				avatarSpace.showLegoExtension();
				avatarSpace.dialog.setText({text: "Do you want to see building guide?", fontSize:30});
				YesNoAlert(
					function(){
						avatarSpace.dialog.setText({text: "Press Continue when you will be ready to test sensors", fontSize:25});
						// Open building guide
						// window.open('./resources/lego-bilding-guide/Building%20Instructions%20[No%20Name].html', '_blank');
						ContinueAlert(function(){
							avatarSpace.hideLegoExtension();
							sensorsStep(); //------------------> TO SENSORS STEP
						});
					}, 
					function(){
						avatarSpace.dialog.setText({text: "Press Continue when you will be ready to test sensors", fontSize:25});
						ContinueAlert(function(){
							avatarSpace.hideLegoExtension();
							sensorsStep(); //------------------> TO SENSORS STEP
						});
					}
				);
			},
			function(){
				sensorsStep(); //------------------> TO SENSORS STEP
			});
	}
}

function scenario(){
	avatarSpace.dialog.setText({text:"I am glad to see you all here today", fontSize:30});
	avatarSpace.dialog.onClick=function(){
			this.setText({text: "My name is Airi", fontSize:30});
			this.onClick=function(){
				this.setText({text: "I am virtual avatar of this LEGO robot. I can help you control and customize robot.", fontSize:30});
				this.onClick=function(){
					customizeStep();
				}
			}
		}

}