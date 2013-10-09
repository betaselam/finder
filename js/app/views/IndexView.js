// -------
define(["jquery",
        "backbone",
        "text!templates/HomeTemplate.html",
        "helpers/helper",
        "helpers/util"],

    function ($,
              Backbone,
              HomeTemplateTmpl,
              helper,
              util) {

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function () {

                // Calls the view's render method
                this.render();
                helper.intializeContextualHelp();
            },

            // View Event Handlers
            events: {
                'click #btn-plansHome': 'callPlan',
                'click #btn-productsHome': 'callProduct'
            },

            // Renders the view's template to the UI
            render: function () {
                // clear blue ribbon
                $('.subnav').empty();

                // Setting the view's template property using the Underscore template method
                this.template = _.template(HomeTemplateTmpl, { });

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            callPlan: function () {
                window.location = "#plansHome"
            },

            callProduct: function () {
                window.location = "#productsHome"
            }

        });

        // Returns the View class
        return IndexView;
    }

);