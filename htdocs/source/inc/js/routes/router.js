var app = app || {};

app.Router = Backbone.Router.extend({

	routes :{
		"": "noCopy",
		"firstSubscription": "firstSubscriptionMessage",
		"secondSubscription": "secondSubscriptionMessage",
		"thirdSubscription": "thirdSubscriptionMessage",
	},

	noCopy: function(){
		$("#copy").html("");
	},

	firstSubscriptionMessage: function(){
		$("#copy").html("Heel verhaal over de eerste inschrijving");
	},

	secondSubscriptionMessage: function(){
		$("#copy").html("Heel verhaal over de tweede inschrijving");
	},

	thirdSubscriptionMessage: function(){
		$("#copy").html("Heel verhaal over de derde inschrijving");
	}

});

