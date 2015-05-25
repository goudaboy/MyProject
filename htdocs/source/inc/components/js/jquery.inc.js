$(document).ready(function(){

	var charArr = [48,49,50,51,52,53,54,55,56,57, // 0123456789
			   	8, // backspace
			   	9, // tab
			   	46, //Delete
			   	37, //Key left
			   	38, //Key up
			   	39, //Key right
			   	40 //Key down
				];

	// $.ajax({url:"errorMessages.json",
 	// 	  dataType: 'json',
	//   success:
	// 	function(objJSON){ 
	// 		if (objJSON != null) {
	// 			var city 		= document.getElementById('giver_city');
	// 			city.value 		= objJSON.city;
	// 			var street 		= document.getElementById('giver_street');
	// 			street.value 	= objJSON.street;
	// 		}
	// 	}
	// });

	var typeArr = ['text, email, number'];
	
	$("#readmore").click(function(){	$("article p").slideToggle("slow");});
	
	$("#inputGiftYes").parent().click(function(){
		$("#premiumInfo").slideDown("slow");
	});
	
	$("#inputGiftNo").parent().click(function(){
		$("#premiumInfo").slideUp("slow");
	});

	$('#premiumInfo input[type=text], #premiumInfo input[type=email], #premiumInfo input[type=number]').attr('disabled', 'disabled');
	$('input[type=password]').attr('disabled', 'disabled');

	$('#inputGiftYes').parent().click(function(){
		$('#premiumInfo input[type=text], #premiumInfo input[type=email], #premiumInfo input[type=number]').removeAttr('disabled','disabled');
	});

	$('#inputGiftNo').parent().click(function(){
		$('#premiumInfo input[type=text], #premiumInfo input[type=email], #premiumInfo input[type=number]').attr('disabled', 'disabled');	
	});

	$('input[type=password]').parent().find('i').click(
		function(){

			$(this).on("mouseup",function (event) {
				$(this).parent().find('input[type=text]').attr('type','password'); 	
			});

			$(this).on("mousedown",function (event) {
				$(this).parent().find('input[type=password]').attr('type','text');	
			});
	});

	$("input[type=text], input[type=number], input[type=email]").each( function(){ 
		
			// Check for required fields and change appearance
			if ($(this).attr('verplicht') !== undefined) {
				// Call change in appearance
				showResultClasses(this, 'default', 'fa fa-asterisk'); //Check
			}

			// if ($(this).attr('numeric') !== undefined) {
			// 	$(this).on("keypress keyup keydown blur",function (event) {    
					
			// 		var char = event.which || event.keyCode;
			// 		switch(char)
			// 		{
			// 			case 37: // Arrow Left
			// 			case 39: // Arrow Right
			// 				// No action		
			// 			break;

			// 			default:
			// 				$(this).val($(this).val().replace(/[^\d].+/, ""));
			// 				var charCode = (evt.which) ? evt.which : evt.keyCode; // firefoxbug to fetch delete keycode
			// 				if (jQuery.inArray( charCode, charArr ) == -1) {
			// 				 	event.preventDefault();
			// 				}
			// 			break;
			// 		} 
			// 	});
			// }
			
			// Set to Lowercase
			if ($(this).attr('lowercase') !== undefined) {	
				$(this).on("keypress keyup keydown blur",function (event) {  
					var char = event.which || event.keyCode;
					switch(char)
					{
						case 37: // Arrow Left
						case 39: // Arrow Right
							// No action		
						break;

						default:
							this.value = this.value.toLowerCase();
						break;
					}
				});
			}

			// Set to Uppercase
			if ($(this).attr('uppercase') !== undefined) {
				$(this).on("keypress keyup keydown blur",function (event) {  
					this.value = this.value.toUpperCase();
					var char = event.which || event.keyCode;
					switch(char)
					{
						case 37: // Arrow Left
						case 39: // Arrow Right
							// No action		
						break;

						default:
							
						break;
					}
				});
			}

			// Set first character to Uppercase
			if ($(this).attr('FirstUpper') !== undefined) {
				$(this).on("keypress keyup keydown blur",function (event) { 
					var char = event.which || event.keyCode;
					switch(char)
					{
						case 37: // Arrow Left
						case 39: // Arrow Right
							// No action		
						break;

						default:
							this.value = this.value.toLowerCase();
							this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
						break;
					}

				});
			}

			// NoSpaces
			if ($(this).attr('nospaces') !== undefined) {
				$(this).keydown(function(event) {
					if (event.keyCode == '32') {
						event.preventDefault();
					}
				});
			}
		}	
	);
});