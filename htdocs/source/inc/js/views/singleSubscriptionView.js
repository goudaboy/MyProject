// Namespace our App
var app = app || {};

// The view for a single subscription view, wich is one subscription
app.singleSubscriptionView = Backbone.View.extend({

	tagName: "article",
	className: "subscriptionListItem",

	template: _.template($('#subscriptionElement').html()),
	render: function(){
		
		var subscriptionTemplate = this.template(this.model.toJSON());
		this.$el.html(subscriptionTemplate);
		return this;
	},
	events: {
		'mouseover': 'addBgColor',
		'mouseout': 'removeBgColor'
	},
	addBgColor: function(){
		this.$el.addClass("bgColor");
	},
	removeBgColor: function(){
		this.$el.removeClass("bgColor");
	}

});