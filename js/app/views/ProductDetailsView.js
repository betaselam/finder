// Plan Details View
// -------
define(["jquery",
        "backbone",
        "text!templates/Products/ProductDetails.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
            ProductDetailsTmpl,
			subtemplate,
            helper) {

        var ProductDetailsView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,

            // View constructor
            initialize: function () {
            },

            // View Event Handlers
            events: {
                "click .productResults": "productResults"
            },

            productResults: function (event) {
                event.stopPropagation();

                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "productid", "");
                params = params.replace("productDetails/", "products/");
                Backbone.history.navigate(params, true);
                return false;
            },
            // Renders the view's template to the UI
            render: function () {

                document.title = "Insurance Product Detail";
				if (this.model != null) {
                    this.$el.empty()
                    var self = this;

                    this.template = _.template(ProductDetailsTmpl, { model: this.model.attributes });
                    $(self.$el).append(this.template);
                }
                helper.intializeContextualHelp();
                //set equal height to each blue box content
                $(".indexBodyCol").each(function (index) {
                    var rowHeight = $(this).parent().height();
                    $(this).height(rowHeight);
                });
            }

        });

        // Returns the View class
        return ProductDetailsView;
    }

);