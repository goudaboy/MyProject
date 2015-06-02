var ArrErrorMessages = [];

var Transformer = function(){

	var inputItem 		= arguments[0];
	var TransformValue 	= inputItem.getAttribute("transform");

	/*** Define options ****/
	this.options = {

		uppercase : function(){
			return arguments[0].toUpperCase();
		},
		lowercase : function(){
			// console.log('lowercase');
			return arguments[0].toLowerCase();
		},
		firstupper : function(){
			// console.log('first upper');
			inputValue = arguments[0].toLowerCase();
			inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
			return inputValue;
		},
		number : function(){},
		nospaces : function(){
			
			if (event.keyCode == '32') {
				event.preventDefault();
			}
		}

	};

	switch(TransformValue){

		case 'uppercase' 	: inputItem.value = this.options.uppercase(inputItem.value); break;
		case 'lowercase' 	: inputItem.value = this.options.lowercase(inputItem.value); break;
		case 'firstupper' 	: inputItem.value = this.options.firstupper(inputItem.value); break;
		case 'number' 		: inputItem.value = this.options.number(inputItem.value); break;

	}

	// NoSpaces
	if (inputItem.getAttribute("nospaces") !== undefined) {
		this.options.nospaces.call(inputItem);
	}

};

var Validator = function (){

	var ValidatorThis	= this;
	var inputItem 		= arguments[0];
	var requiredTrigger = inputItem.hasAttribute("verplicht");

	var inputObject = {
		inputItem : inputItem,
		errormessage : {
			chars : '',
			format : ''
		}
	};

	/*** Define options ***/
	this.options = {

		zipcode : function(){
		
			// Define Reg Values
			var inputValueReg = /^([0-9]{4}[A-Z]{2})$/;
			// Check is Value is a valid Zipcode
			var result = !this.value.match(inputValueReg) || this.value === '' ? false /* Invalid Zipcode */ :  true; /* Valid Zipcode */
			return result;
		
		},
		email : function(){
		
			// Define Reg Values
			var inputValueReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			// Check if value is a valid emailaddress
			var result = !inputItem.value.match(inputValueReg) || inputItem.value === '' ? false /* Invalid Zipcode */ :  true; /* Valid Zipcode */
			//var result = !inputValueReg.test(this.value) || this.value === '' ? false /* Invalid Email address */ :  true; /* Valid Email address */  
			return result;
		
		},
		phone : function(){

		}

	};

	this.required = {

		MinChar : function(){

			var result = '';
			var minCharTrigger = this.hasAttribute("minChar");

			if(minCharTrigger === true){

				var strLength  = this.value.length;
				var minLength = this.getAttribute('minChar');

				result = strLength > minLength || this.value === '' ? false /* Minimal Amount has not been reached */  : true /* Minimal lenght has been reached */; 
				
				return result;

			}else{ return true; /* No minimal amount of characters */ }

		},
		valType : function(){

			var result = '';
			var minValTypeTrigger = inputItem.hasAttribute("valType");

			if(minValTypeTrigger === true){

				switch(inputItem.getAttribute('valtype')){
					case 'zipcode':
						result = ValidatorThis.options.zipcode.call(this);
					break;
					case 'email' :
						result = ValidatorThis.options.email.call(this);
					break;
				}

				return result;

			}else{ return true; }

		}

	};

	// NoSpaces
	if (inputItem.getAttribute("verplicht") !== undefined) {
		//
		var result = [];
		
		result[1] = this.required.MinChar.call(inputItem);
		result[2] = this.required.valType.call(inputItem);

		if(result[1] === false){
			inputObject.errormessage.chars = error_message.call(inputItem);
		}else{
			inputObject.errormessage.chars = '';
			$(inputObject.inputItem).css('border', '2px solid blue');
		}

		if(result[2] === false){
			inputObject.errormessage.format = error_message.call(inputItem);
		}else{
			inputObject.errormessage.format = '';
			$(inputObject.inputItem).css('border', '2px solid lightgreen');
		}

	}else{ /* No Actions */ } 
	
};

var errorHandler = {

	fieldCollection : document.getElementsByTagName("input"),

	Textfield : function(){
		// console.warn(this);
	},

	Email : function(){
		// console.warn('Email = '+validationTypes.email.call(this));
	},

	Number : function(){
		console.warn('number');
	},

	Password : function(){
		console.warn('password');
	},

	Radio : function(){
		console.warn('Radio');
	},

	Checkbox : function(){
		console.warn('Checkbox');
	}

};

function error_message(){
	// Check if attribute exists
	if (this.getAttribute('errorAlias') !== undefined) {
		// Catch value of attribute
		IntlabelNr = this.getAttribute('errorAlias');

		console.log(ArrErrorMessages[IntlabelNr].minchar);
		// Get error values in an array by key
		// ArrErrorValue = getValues(errorMessagesJSON, IntlabelNr);
		// Return the first value
		// return ArrErrorValue[0].format;	
	} else {
		// attribute does not exist...
	}
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    // Create Array for objects
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key.format));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

// Add Validator to ErrorHandler
errorHandler.Validator = Validator;

// Add Transformer to ErrorHandler
errorHandler.Transformer = Transformer;

$(document).ready(function(){

	"use strict";
	console.info('Code by Jaap Tinholt');

	

	$.getJSON( "source/inc/js/libs/validation/error_messages.json")
	.done(function( data ) {
		ArrErrorMessages = data;
	})
	.fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
	
	// console.dir(errormessageObj['StrErrorMsgTxtEmail']);

	$('input').on('blur keydown', function(){

		errorHandler.Transformer(this);
		errorHandler.Validator(this);
		
		switch(this.type){

			case 'text' :
				errorHandler.Textfield.call(this);
			break;

			case 'email' :
				errorHandler.Email.call(this);
			break;

		}

	});

});


/**** Shame *****/

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