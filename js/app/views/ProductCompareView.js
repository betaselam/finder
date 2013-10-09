define(["jquery",
        "backbone",
		"expandcollapse",
        "text!templates/Products/ProductCompare.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
			expandcollapse,
            ProductCompareTmpl,
			subtemplate,
            helper) {

        var ProductCompareView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,
            selectedIds: [],
            compareProducts: [],

            // View constructor
            initialize: function () {
            },

            // View Event Handlers
            events: {
                'click .productDetailsLink': 'productDetails',
                'click .removeProduct': 'removeProduct',
                'click .pageNavigation': 'pageNavigation'
            },

            pageNavigation: function (event) {
                event.stopPropagation();
                helper.pageNavigation($(event.target).attr('data-name'), 'productCompare');
            },

            // Renders the view's template to the UI
            render: function () {
                this.$el.empty()
                document.title = "Insurance Products Comparison";
                this.template = _.template(ProductCompareTmpl, { model: this.model });
                $(this.$el).html(this.template);            
                helper.intializeContextualHelp();
            },

            productDetails: function (event) {
				var productId = $(event.target).attr('productId');

                if (productId) {
                    var params = Backbone.history.fragment;
                    params = params.replace('productCompare/', 'productDetails/') + "&productid=" + productId;
                    Backbone.history.navigate(params, true);
                }
            },

            removeProduct: function (event) {
                var itemId = $(event.target).attr('productid');
                var productTitle = $(event.target).attr("productname");
                var params = Backbone.history.fragment;

                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.compareProducts = helper.getParameterByName("products", params) !== "" ? helper.decodeSpecialChar(helper.getParameterByName("products", params)).split('|') : [];

                if ($.inArray(itemId, this.selectedIds) !== -1) {
                    this.selectedIds = $.grep(this.selectedIds, function (e) { return e !== itemId; });
                    this.compareProducts = $.grep(this.compareProducts, function (e) { return e !== productTitle; });

                    params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().replace(/\,/g, "|").toUpperCase());
                    params = helper.updateQueryStringParameter(params, "products", helper.encodeSpecialChar(this.compareProducts.toString().replace(/\,/g, "|")));

                    Backbone.history.navigate(params, true);
                }
            }

        });

        // Returns the View class
        return ProductCompareView;
    }

);