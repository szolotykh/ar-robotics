function YesNoAlert(onYes, onNo){
	onYes = onYes||function(){};
	onNo = onNo||function(){};
	
	var $container = $("<div>").addClass("ui-container");
	
	// Yes
	var $divGreen = $("<div>", {id: "foo"}).html("Yes").addClass("dialog-button db-g");
	$divGreen.on( "click", function(){
		$(this).parent().remove();
	});
	$divGreen.on( "click", onYes);
	$container.append($divGreen);
	
	// No
	var $divRed = $("<div>", {id: "foo"}).html("No").addClass("dialog-button db-r");
	$divRed.on( "click", function(){
		$(this).parent().remove();
	});
	$divRed.on( "click", onNo);
	$container.append($divRed);
	
	// Add container to body
	$("body").append($container);
}

function ContinueAlert(onContinue){
	onContinue = onContinue||function(){};
	var $container = $("<div>").addClass("ui-container");
	
	// Continue
	var $divContinue = $("<div>", {id: "foo"}).html("Continue").addClass("dialog-button db-c");
	$divContinue.on( "click", function(){
		$(this).parent().remove();
	});
	$divContinue.on( "click", onContinue);
	$container.append($divContinue);
	
	// Add container to body
	$("body").append($container);
}