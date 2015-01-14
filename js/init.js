$(document).ready(function(){
	console.log("ready");
	

	
	$("body").append("<div id='initWindow'></div>");
	$("#initWindow").append("<div id='interfaceLogo'>Lego NXT AR Interface</div>");
	$("#initWindow").append("<div id='bStartInterface'>Start</div>");
	
	$("#bStartInterface").click(function(){
		$("#initWindow").remove();
		goFullScreen(document.documentElement);
		$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange',function(){
			fullscreenEnabled = !fullscreenEnabled;
			if(fullscreenEnabled){
					$("body").append("<div id='initWindow'></div>");
					$("#initWindow").append("<div id='interfaceLogo'>Lego NXT AR Interface</div>");
					$("#initWindow").append("<div id='interfaceMessage'>Please allow access to your camera</div>");
				getUserMedia({'video': true},
					function(stream) {
						// onsuccess
						$("#initWindow").remove();
						
						var url = createObjectURL(stream);
						video.src = url;
						initTrack();
					},
					function(error) {
						// onerror
						$("#initWindow").remove();
						$("body").append("<div id='initWindow'></div>");
						$("#initWindow").append("<div id='interfaceLogo'>Lego NXT AR Interface</div>");
						$("#initWindow").append("<div id='interfaceMessage'>The interface can't access to your camera</div>");
					}
				);
			}else{
				// Getting out from fullscreen
				alert("Getting out from fullscreen")
			}
		});
	});
});