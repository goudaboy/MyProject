var ArrErrorMessages 	= [];
var IntErrorCounter 	= 0;

/*** Netnumbers for Phone Number check ***/ 

var arrNetTwo 		= ['06'];
var arrNetThree 	= ['010','013','015','020','023','024','026','030','033','035','036','038','040','043','045','046','050','053','055','058','070','071','072','073','074','075','076','077','078','079'];
var arrNetFour 		= ['0111','0113','0114','0115','0117','0118','0161','0162','0164','0165','0166','0167','0168','0172','0174','0180','0181','0182','0183','0184','0186','0187','0222','0223','0224','0226','0227','0228','0229','0251','0252','0255','0294','0297','0299','0313','0314','0315','0316','0317','0318','0320','0321','0341','0342','0343','0344','0345','0346','0347','0348','0411','0412','0413','0416','0418','0475','0478','0481','0485','0486','0487','0488','0492','0493','0495','0497','0499','0511','0512','0513','0514','0515','0516','0517','0518','0519','0521','0522','0523','0524','0525','0527','0528','0529','0541','0543','0544','0545','0546','0547','0548','0561','0562','0566','0570','0571','0572','0573','0575','0577','0578','0592','0592','0593','0594','0595','0596','0597','0598','0599'];

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
			getNetNumber.call(this);
		}

	};

	this.required = {

		MinChar : function(){

			var result = '';
			var minCharTrigger = this.hasAttribute("minchar");

			if(minCharTrigger === true){

				var strLength  = this.value.length;
				var minLength = this.getAttribute('minchar');

				result = strLength < minLength || this.value === '' ? false /* Minimal Amount has not been reached */  : true /* Minimal lenght has been reached */; 

				return result;

			}else{ return true; /* No minimal amount of characters */ }

		},
		valType : function(){

			var result = '';
			var minValTypeTrigger = inputItem.hasAttribute("valtype");

			if(minValTypeTrigger === true){

				switch(inputItem.getAttribute('valtype')){
					case 'zipcode':
						result = ValidatorThis.options.zipcode.call(this);
					break;
					case 'email' :
						result = ValidatorThis.options.email.call(this);
					break;
					case 'phone' :
						result = ValidatorThis.options.phone.call(this);
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
		console.log(result[1]);
		result[2] = this.required.valType.call(inputItem);

		if(result[1] === false){
		
			inputObject.errormessage.chars = error_message.call(inputItem);
			$(inputObject.inputItem).css('border', '2px solid red');
		
		}else{
			
			inputObject.errormessage.chars = '';

			if(result[2] === false){
				inputObject.errormessage.format = error_message.call(inputItem);
			}else{
				inputObject.errormessage.format = '';
				$(inputObject.inputItem).css('border', '2px solid lightgreen');
				$(inputObject.inputItem).css('content', 'goed!');
			}

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

		// console.log(ArrErrorMessages[IntlabelNr].minchar);
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

	$('input').on('onblur keyup', function(){

		errorHandler.Transformer(this);
		errorHandler.Validator(this);

	});

});

/**** Shame *****/

function getNetNumber(){

	var validationCounter = -1;
	var i=0;

	while(validationCounter < 0 && i <= $(this).val().length)
	{
		
		TargetSubstr = $(this).val().substr(0,i++);
		
		switch(TargetSubstr.length)
	  	{
	  		case 1 :
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			// $('#labelNetnr').html(TargetSubstr);
			break;

	  		case 2 :
	  			validationCounter = $.inArray(TargetSubstr, arrNetTwo);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			// $('#labelNetnr').html(TargetSubstr);
	  		break;

			case 3 :
	  			validationCounter = $.inArray(TargetSubstr, arrNetThree);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			// $('#labelNetnr').html(TargetSubstr);
	  		break;

	  		case 4 :
	  			validationCounter = $.inArray(TargetSubstr, arrNetFour);
	  			$('[name="fields[netnumber]"]').val(TargetSubstr);
	  			// $('#labelNetnr').html(TargetSubstr);
	  		break;

	  		case 5 : 
	  			$('[name="fields[netnumber]"]').val(TargetSubstr.substr(0,TargetSubstr.length-1));
	  		break;
		}
	}

	// Validatnummer -1 means: No match
	if(validationCounter != -1){

		var NetNumberLength = $('[name="fields[netnumber]"]').val().length;
		var PhoneNumberLength = $(this).val().length;

		var subscriptionNumber = $(this).val().substr(NetNumberLength, PhoneNumberLength);
		$('[name="fields[phonenumber]"]').val(subscriptionNumber);

		var ShowSubscrNr = subscriptionNumber;

		if(isOdd(ShowSubscrNr.length) === true)
		{	
			NewSubscrNr = ShowSubscrNr.substring(0, 3)+" "+ShowSubscrNr.substring(3, 5)+" "+ShowSubscrNr.substring(5, ShowSubscrNr.length);
		}else{
			NewSubscrNr = ShowSubscrNr.substring(0, 2)+" "+ShowSubscrNr.substring(2, 4)+" "+ShowSubscrNr.substring(4, 6)+" "+ShowSubscrNr.substring(6, ShowSubscrNr.length);
		}
		
		$('#labelSubscrnr').html(NewSubscrNr);

	}
}

function isOdd(num) { return num % 2; }