var transformOptions = {

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
	}

};

var Transformer = function(){

	var TransformValue 	= this.inputItem.getAttribute("transform");
	var inputVal 		= this.inputItem.value;

	switch(TransformValue){

		case 'uppercase' :
			inputVal = transformOptions.uppercase(inputVal);
		break;

		case 'lowercase' :
			inputVal = transformOptions.lowercase(inputVal);
		break;

		case 'firstupper' :
			inputVal = transformOptions.firstupper(inputVal);
		break;

		case 'number' :
			inputVal = transformOptions.number(inputVal);
		break;

	}

};

var validationTypes = {

	zipcode : function(){
	
		console.info('Zipcode');
		// Check is Value is a valid Zipcode
		var result = !this.value.match(/^([0-9]{4}[A-Z]{2})$/) || this.value === '' ? false /* Invalid Zipcode */ :  true; /* Valid Zipcode */
		return result;
	
	},
	email : function(){
	
		var inputValueReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		// Check if value is a valid emailaddress
		var result = !inputValueReg.test(this.value) || this.value === '' ? false /* Invalid Email address */ :  true; /* Valid Email address */  
		return result;
	
	},
	phone : function(){

	}

};

var requiredField = {

	MinChar : function(){

		var result = '';
		var minCharTrigger = this.hasAttribute("minChar");

		if(minCharTrigger === true){

			var strLength  = this.value.length;
			var minLength = this.getAttribute('minChar');

			result = strLength < minLength ? false : true; 
			
			return result;

		}else{ return false; }

	},
	valType : function(){

		var result = '';
		var minValTypeTrigger = this.hasAttribute("valType");

		if(minValTypeTrigger === true){

			switch(this.getAttribute('valtype')){
				case 'zipcode':
					result = validationTypes.zipcode.call(this);
				break;
				case 'email' :
					result = validationTypes.email.call(this);
				break;
			}

			return result;

		}else{ return false; }

	}

};

var errorHandler = {

	fieldCollection : document.getElementsByTagName("input"),

	Textfield : function(){
		console.warn('Text');
	},

	Email : function(){
		console.warn('Email = '+validationTypes.email.call(this));
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
	},

	ValidateField : function(){

		console.info(this.type);

		var inputObject = {
			inputItem : this,
			errormessage : ''
		};
		
		var transformTrigger 	= this.hasAttribute("transform");
		var requiredTrigger 	= this.hasAttribute("verplicht");
		
		if(transformTrigger === true){
		
			Transformer.call(inputObject);	
			
		}else{ /* No Actions */ }

		if(requiredTrigger === true){
		
			var result = [];
			result[1] = requiredField.MinChar.call(this);
			result[2] = requiredField.valType.call(this);

			console.log('minChar ::'+result[1]);
			console.log('valType ::'+result[2]);

		}else{ /* No Actions */ }
		
	}

};

$(document).ready(function(){

	$('input').on('blur', function(){

		errorHandler.ValidateField.call(this);

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