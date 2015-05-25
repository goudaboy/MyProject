
function updateCityStreet() {
	var zipcode		= document.getElementById('zipcode').value;
	var streetnr	= document.getElementById('streetnumber').value;
	
	$.ajax({url:"http://actie.noordhollandsdagblad.nl/updatecitystreet.html?zipcode="+zipcode+"&streetnr="+streetnr,
 	  dataType: 'json',
	  success:
		function(objJSON){ 
			if (objJSON != null) {
				var city 		= document.getElementById('city');
				city.value 		= objJSON.city;
				var street 		= document.getElementById('street');
				street.value 	= objJSON.street;
			}
		}
	});
}

function updateCityStreetGiver() {
	var zipcode		= document.getElementById('giver_zipcode').value;
	var streetnr	= document.getElementById('giver_streetnumber').value;
	
	$.ajax({url:"http://actie.noordhollandsdagblad.nl/updatecitystreet.html?zipcode="+zipcode+"&streetnr="+streetnr,
 	  dataType: 'json',
	  success:
		function(objJSON){ 
			if (objJSON != null) {
				var city 		= document.getElementById('giver_city');
				city.value 		= objJSON.city;
				var street 		= document.getElementById('giver_street');
				street.value 	= objJSON.street;
			}
		}
	});
}

function loadSubscriber() {
	var relationnr	= document.getElementById('relationnr').value;
	var undernr		= document.getElementById('undernr').value;
	var zipcode		= document.getElementById('zipcode').value;

	if (relationnr != '' && undernr != '' && zipcode != '') {
			
		$.ajax({url:"/webservice/?r=paywall/checksubscriber&relationnr="+relationnr+"&undernr="+undernr+"&zipcode="+zipcode,
		  dataType: 'json',
		  success:
			function(objJSON){ 
				if (objJSON != null) {
					var name				= document.getElementById('name');
					name.innerHTML 			= objJSON.name;
					var address 			= document.getElementById('address');
					address.innerHTML 		= objJSON.address;
					var city 				= document.getElementById('city');
					city.innerHTML			= objJSON.city;
					var subscription		= document.getElementById('subscription');	
					subscription.value  	= objJSON.subscription;
					var description			= document.getElementById('description');	
					description.innerHTML 	= objJSON.description;
					
					// Set styling
					var relation			= document.getElementById('relation');
					relation.style.padding 	= '10px';
					relation.style.margin	= '20px';
					if (subscription.value == "TOTAL" || subscription.value == "WEBWEEKEND") {
						relation.style.border	= '2px green solid';
					} else {
						relation.style.border	= '1px black dashed';
					}
				}
			}
		});
	}
}

function checkEmail() {
	// Get 'email' input field value
	var tmp_email 	= document.getElementById('email').value;
	// Not empty
	if (tmp_email != '') {
		var email		= CryptoJS.MD5(tmp_email).toString();
		$.ajax({url:"http://actie.noordhollandsdagblad.nl/checkemail.html?s="+email,
		  dataType: 'json',
		  success:
			function(objJSON){ 
				if (objJSON != null) {
					if (objJSON.email == '1') {
						// Hide password fields
						$( ".account" ).each(function() { 
							$(this).addClass( "hide" );
							$(this).find('input').attr('disabled', 'disabled');
							console.log('disabled');
						});
					} else {
						// Show password fields
						$( ".account" ).each(function() {
						  $(this).removeClass("hide");
						  $(this).find('input').removeAttr('disabled');
						  console.log('enabled');
						});
						// Focus on password
						$( "#password" ).focus();
					}
				}
			}
		});	
	}
}


