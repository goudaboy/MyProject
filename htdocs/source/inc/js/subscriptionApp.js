var firstSubscription = new app.singleSubscription({

		gender : 'Male',
		firstName: 'Jaap',
		secondName : 'Tinholt',
		zipcode : '1823BW',
		street : 'Buitenpoort',
		streetNumber : 16,
		city : 'Alkmaar',
		link : 'firstSubscription'
	
});

var secondSubscription = new app.singleSubscription({

		gender : 'Female',
		firstName: 'Reina',
		zipcode : '1749HD',
		street: 'Trogven',
		streetNumber : 19,
		city : 'Warmenhuizen',
		link : 'secondSubscription'
	
});

var thirdSubscription = new app.singleSubscription({

		gender : 'Female',
		firstName: 'Susanne',
		secondName : 'Komen',
		zipcode : '1749HB',
		street : 'Kiebos',
		streetNumber : 12,
		link : 'thirdSubscription'
	
});

var subscriptionGroup = new app.subscriptionCollection([
	firstSubscription, secondSubscription
]);

subscriptionGroup.add(thirdSubscription);
// subscriptionGroup.remove(secondSubscription);

// // console.log(firstSubscription.toJSON());
// // console.log(secondSubscription.toJSON());
// // console.log(thirdSubscription.toJSON());

var subscriptionGroupView = new app.allSubscriptionsView({collection : subscriptionGroup});

$("#allSubscriptions").html(subscriptionGroupView.render().el);

var subscriptionRouter = new app.Router();

Backbone.history.start(); 