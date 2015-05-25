(function(){
	"use strict";
	console.info('Code by Jaap Tinholt');
	
	var inputRecord; 	

}());

// closed EYE fa-eye-slash
// closed EYE fa-eye
//
// Error messages | JavaScript Document
var errorMessagesJSON = 
{
    "StrErrorMsgTxtInitials"		: "Het lijkt erop dat uw voorletters niet zijn aangegeven",
    "StrErrorMsgTxtLastName"		: "Het lijkt erop dat uw achternaam niet is aangegeven",
    "StrErrorMsgTxtEmail"			: "Het lijkt erop dat dit geen gelding e-mailadres is",
    "StrErrorMsgTxtZipcode"			: "Het lijkt erop dat de postcode niet juist is ingevoerd. Voorbeeld: 1234AB",
    "StrErrorMsgRadioGender"		: "Het lijkt erop dat uw aanhef niet is aangegeven",
    "StrErrorMsgRadioGift"			: "Het lijkt erop dat u niet heeft aangegeven of u een welkomstgeschenk wilt ontvangen",

    "StrErrorMsgStreetNumber"		: "Het lijkt erop dat uw huisnummer niet is aangegeven",
    "StrErrorMsgStreet"				: "Het lijkt erop dat uw straat niet is aangegeven",
    "StrErrorMsgCity"				: "Het lijkt erop dat uw stad niet is aangegeven",
    
    "StrErrorMsgTxtPhoneCount"		: "Het aantal cijfers van het netnr en telefoonnr samen moet 10 cijfers zijn",
    "StrErrorMsgTxtPhoneNumber"		: "Het lijkt erop dat uw telefoonnr niet juist is aangegeven.",
    "StrErrorMsgTxtNetNumber"		: "Het lijkt erop dat uw netnummer is onjuist. Voorbeeld: 072",

    "StrErrorMsgTxtPasswordEmpty"	: "Het lijkt erop dat uw wachtwoord niet juist is aangegeven, misschien te weinig karakters (min. 6) of typefout?",
    "StrErrorMsgTxtPasswordMatch"	: "Het lijkt erop dat de aangegeven wachtwoorden niet overeen komen"
};

/*** Netnumbers for Phone Number check ***/ 

var arrNetTwo = ['06'];
var arrNetThree = ['010','013','015','020','023','024','026','030','033','035','036','038','040','043','045','046','050','053','055','058','070','071','072','073','074','075','076','077','078','079'];
var arrNetFour = ['0111','0113','0114','0115','0117','0118','0161','0162','0164','0165','0166','0167','0168','0172','0174','0180','0181','0182','0183','0184','0186','0187','0222','0223','0224','0226','0227','0228','0229','0251','0252','0255','0294','0297','0299','0313','0314','0315','0316','0317','0318','0320','0321','0341','0342','0343','0344','0345','0346','0347','0348','0411','0412','0413','0416','0418','0475','0478','0481','0485','0486','0487','0488','0492','0493','0495','0497','0499','0511','0512','0513','0514','0515','0516','0517','0518','0519','0521','0522','0523','0524','0525','0527','0528','0529','0541','0543','0544','0545','0546','0547','0548','0561','0562','0566','0570','0571','0572','0573','0575','0577','0578','0592','0592','0593','0594','0595','0596','0597','0598','0599'];

/*** End variables ***/

$(document).ready(function(){
	
	var ValidateNetNummer = -1;

	$('[name="feelds[check]"]').each(function(){
		checkTarget(this);
	});

	// $('#readmore').click(function(){ 
	// 	$("article p").slideToggle("slow");
	// });

	$('#telefoonnummer').keyup(function() {
		GetNetNumber(this);
	});

	errorHandler();

});


//return an array of values that match on a certain key
function getValues(obj, key) {
    // Create Array for objects
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

/********************** Submit Form Functions **************************/
var IntErrorCounter = 0;

function errorHandler(){
	
	$('input').each( function(){
		switch($(this).attr('type'))
		{
			case 'email' :
			case 'number' :
			case 'text' :
			case 'password' :
				// On Blur validate value, return result and change appearance of input fields
				$(this).blur(function(){
					// Call validation on target
					checkTarget(this);
				});
			break;
			case 'radio' :
				// On Blur validate value, return result and change appearance of input fields
				var myTarget = this;
				$(this).parent().click(function(){
					// Onclick Set This to Checked, before validating
					$('input', this).prop('checked', true);
					// Call validation on target
					checkTarget(myTarget);
				});
			break;
		}
	});

	$('#submit_form').click(function(){
	 	// #Error counter
	 	IntErrorCounter = 0;
		$("input").each(
		 	function(){	
		 		checkTarget(this);
		 	}
		);
		// Check if there are any errors left?
		if (IntErrorCounter > 0) {
			console.warn('The number of errors is: ' + IntErrorCounter);
		} else {
			// console.log('Post the form...');
			ga('send', 'event', $('body').attr('id'), 'Clicked', 'button');
			$('form').submit();
		}
	});
}		

function checkTarget(myTarget){
	// Check if field is enabled / disabled
	if($(myTarget).attr('disabled') === undefined)
	{
		// Check if field is required
		if ($(myTarget).attr('verplicht') === 'verplicht') {
			switch($(myTarget).attr('type')){
				case 'radio':
					// Clear error messages
					$(myTarget).parent().parent().find('.radio.errormessage').remove();
					// Check Radio
					checkInputRadio(myTarget);
				break;
				case 'email':
				case 'number':
				case 'text':
					// Clear error messages
					$(myTarget).parent().find('.errormessage').remove();
					// Check Text
					checkInputText(myTarget);
				break;
				case 'password':
					// Clear error messages
					$(myTarget).parent().find('.errormessage').remove();
					// Check Password
					checkInputPassword(myTarget);
				break;
			}
			// Check if errors has been resolved before submitting
			if(success === false){ IntErrorCounter++; /* Sum errors */ }
		}else{ /* Do Nothing... */ } // Validate if field is required
	}else{ /* Do Nothing... */} // Validate disabled 
}

/*** function to help event tracking GA ***/
function clipFieldName(myTarget){
	// Get input field name
	var FieldName = $(myTarget).attr('name');
	// Create substring to remove 'fields['
	var gaLabel = FieldName.substring(7, FieldName.length-1);
	// Return value
	return gaLabel;
}

function assignResultClasses(myTarget, success){
	switch(success){
		case true:
			// Change appearance to success
			showResultClasses(myTarget, 'success', 'fa fa-check');
			// GA event tracking
			ga('send', 'event', $('body').attr('id'), 'ingevuld', clipFieldName(myTarget));
		break;
		case false:
			// Change appearance to error
			showResultClasses(myTarget, 'error', 'fa fa-times');
			// GA event tracking
			ga('send', 'event', $('body').attr('id'), 'error', clipFieldName(myTarget));
		break;
	}
}

function error_message(myTarget){
	// Check if attribute exists
	if ($(myTarget).attr('errorAlias') !== undefined) {
		// Catch value of attribute
		IntlabelNr = $(myTarget).attr('errorAlias');
		// Get error values in an array by key
		ArrErrorValue = getValues(errorMessagesJSON, IntlabelNr);
		// Return the first value
		return ArrErrorValue[0];	
	} else {
		// attribute does not exist...
	}
}

function showResultClasses(myTarget, resultClass, iconClass){
	// Change icon by setting Class on icon(<i>) by result
	switch(resultClass){
		case 'error' :
			// Set Class on parent div by result : error
			$(myTarget).parent().removeClass('success').addClass(resultClass);
		break;

		case 'success' :
			// Set Class on parent div by result : success
			$(myTarget).parent().removeClass('error').addClass(resultClass);
		break;
	}
	// Remove old icon and assign new one 
	$(myTarget).parent().find('i').removeClass().addClass(iconClass);
}

// Check EmailField
function checkEmailField(myTarget){
	var inputValue = $(myTarget).val();
	var inputValueReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	// Check if value is a valid emailaddress
	var success = !inputValueReg.test(inputValue) ? false /* Invalid Email address */  : true; /* Valid Email address */ 
	return success;
}

function checkInputRadio(myTarget){
	
	var nameField = ($(myTarget).attr('name'));
	// Find all radio button in the group

	if ($('input[name="'+nameField+'"]').is(':checked')) {
		// There's a checked in the group
		success = true;
		// While unchecked hide check icon 
		$('input[name="'+nameField+'"]:not(:checked)').parent().find('i').css('display','none');
		// WHile checked show check icon
		$('input[name="'+nameField+'"]:checked').parent().find('i').css('display','block');
	} else {
		// There's no checked in the group
		success = false;
	}


	switch(success){
		case true:
			// Change appearance to success
			showResultClasses('input[name="'+nameField+'"]:checked', 'success', 'fa fa-check');
			$('input[name="'+nameField+'"]:not(:checked').parent().removeClass('error success');
			// GA event tracking
			ga('send', 'event', $('body').attr('id'), 'ingevuld', clipFieldName(myTarget));
		break;
		case false:
			// Change appearance to error
			showResultClasses('input[name="'+nameField+'"]', 'error', 'fa fa-times');
			// GA event tracking
			ga('send', 'event', $('body').attr('id'), 'error', clipFieldName(myTarget));

			// Check for last child
			if ($(myTarget).parent().is('a:last-child')) {
				// Check if attribute exists
				$(myTarget).parent().after('<label class="radio errormessage">'+error_message(myTarget)+'</label>');	
			}
		break;
	}

}

function checkInputText(myTarget){
	
	// Check target on minimal amount of characters
	if ($(myTarget).val().length <= 0) {
		// Set value tot error
		success = false;
	}else{
		
		// Check if attribute minchar exists
		if ($(myTarget).attr('minchar') !== undefined) {
			// If the amount of characters in value is smaller than minchar (mininmum characters) 
			if ($(myTarget).val().length < $(myTarget).attr('minchar')) {
				success = false;	
			}else{
				success = true;
			}
		}else{
			// Set value tot success
			success = true;
		}

		// Validate on different types...
		switch($(myTarget).attr('valType'))
		{
			// Validate on emailadres
			case 'email': success = checkEmailField(myTarget); break;
			// Validate on zipcode
			case 'zipcode': success = checkZipcode(myTarget); break;
			// Validate on Dutch phonenumber
			// case 'phonenumber': success = checkPhoneNumber(myTarget); break;
		}
	}

	switch(success)
	{
		case false :
			$(myTarget).after('<label class="errormessage">'+error_message(myTarget)+'</label>');
		break;
	}

	// Change appearance of target by result
	assignResultClasses(myTarget, success);
}

function checkInputPassword(myTarget){

	// Clear error messages
	$(myTarget).parent().parent().find('.errormessage').remove();

	// Check target on minimal amount of characters
	if ($(myTarget).val().length < 6) {
		// Set value tot error
		success = false;
		// Change appearance of target by result
		assignResultClasses(myTarget, success);
	}else{
		// Set value tot success
		success = true;
		// Change appearance of target by result
		assignResultClasses(myTarget, success);

		var password = $('input[name="fields[password]"]').val();
		var password2 = $('input[name="fields[password2]"]').val();

		if(password.length > 0 && password2.length > 0)
		{
			if(password == password2)
			{
				// If input passwords are equal, set succes appearance
				showResultClasses($(myTarget).parent().parent().find('input'), 'success', 'fa fa-check');
			}else{
				// If input passwords are not equal, set error appearance
				showResultClasses($(myTarget).parent().parent().find('input'), 'error', 'fa fa-eye');
				// Get error message from JSON array by key
				ArrErrorValue = getValues(errorMessagesJSON, 'StrErrorMsgTxtPasswordMatch');
				// Return the first value and print error message
				$(myTarget).parent().parent().append('<label class="errormessage">'+ArrErrorValue[0]+'</label>');
			}	
		}
	}

	switch(success)
	{
		case false :
			$(myTarget).after('<label class="errormessage">'+error_message(myTarget)+'</label>');
		break;
	}

}

// Check ZipCode
function checkZipcode(myTarget){
	// Check is Value is a valid Zipcode
	if ($(myTarget).val().match(/^([0-9]{4}[A-Z]{2})$/)) { return true; /* Valid Zipcode */ } else { return false; /* Invalid Zipcode */}
}

function GetNetNumber(myTarget){

	var ValidateNetNummer = -1;
	var i=0;

	while(ValidateNetNummer < 0 && i <= $(myTarget).val().length)
	{
		TargetSubstr = $(myTarget).val().substr(0,i++);
		switch(TargetSubstr.length)
	  	{
	  		case 1 :
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			$('#labelNetnr').html(TargetSubstr);
			break;

	  		case 2 :
	  			ValidateNetNummer = $.inArray(TargetSubstr, arrNetTwo);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			$('#labelNetnr').html(TargetSubstr);
	  		break;

			case 3 :
	  			ValidateNetNummer = $.inArray(TargetSubstr, arrNetThree);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			$('#labelNetnr').html(TargetSubstr);
	  		break;

	  		case 4 :
	  			ValidateNetNummer = $.inArray(TargetSubstr, arrNetFour);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			$('#labelNetnr').html(TargetSubstr);
	  		break;

	  		case 5 : 
	  			$('[name="fields[netnumber]"]').val(TargetSubstr.substr(0,TargetSubstr.length-1));
	  		break;
		}
	}

	// Validatnummer -1 means: No match
	if(ValidateNetNummer != -1){

		var NetNumberLength = $('[name="fields[netnumber]"]').val().length;
		var PhoneNumberLength = $(myTarget).val().length;

		AbnonneeNummer = $(myTarget).val().substr(NetNumberLength, PhoneNumberLength);
		$('[name="fields[phonenumber]"]').val(AbnonneeNummer);
		
		var ShowSubscrNr = AbnonneeNummer;

		if(isOdd(ShowSubscrNr.length) === true)
		{	
			NewSubscrNr = ShowSubscrNr.substring(0, 3) + " " + ShowSubscrNr.substring(3, 5) + " " + ShowSubscrNr.substring(5, ShowSubscrNr.length);
		}else{
			NewSubscrNr = ShowSubscrNr.substring(0, 2) + " " + ShowSubscrNr.substring(2, 4) + " " + ShowSubscrNr.substring(4, 6) + " " + ShowSubscrNr.substring(6, ShowSubscrNr.length);
		}
		
		$('#labelSubscrnr').html(NewSubscrNr);

	}
}

function isOdd(num) { return num % 2; }