// Namespace our app
var app = app || {};

app.singleSubscription = Backbone.Model.extend({

	defaults: {
		firstName: 'Geen voornaam',
		secondName : 'Geen achternaam',
		city:'Geen plaatsnaam'
	},
	
	initialize: function(){
		
		// console.dir(this);
		// console.log("A model instance named " + this.get("firstName") + " has been created and it lives on " + this.get('street'));
	
		// this.on('change', function(){
		// 	console.log("Something in our model has changed" + this );
		// });

		// this.on('change:streetNumber', function(){
		// 	console.log("The street number where " + this.get("firstName") + " lives has been changed to " + this.get('streetNumber'));
		// });

	} 

});

