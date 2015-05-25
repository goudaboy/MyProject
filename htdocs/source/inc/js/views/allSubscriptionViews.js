// Namaspave our app
var app = app || {};

app.allSubscriptionsView =  Backbone.View.extend({

	tagName: 'section',
	render: function(){
		this.collection.each(this.addSubscription, this);
		return this;
	},
	addSubscription : function(subscription){
		var subscriptionView = new app.singleSubscriptionView({model: subscription});
		this.$el.append(subscriptionView.render().el);
	}

});