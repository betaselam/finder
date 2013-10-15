// Plan Details View
// -------
define(["jquery",
        "backbone",
        "text!templates/Plans/PlanDetails.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
            PlanDetailsTmpl,
			subtemplate,
            helper) {

        var PlanDetailsView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,

            // View constructor
            initialize: function () {
            },

            // View Event Handlers
            events: {
                "click .planResults": "planResults"
            },

            planResults: function (event) {
                event.stopPropagation();

                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "planid", "");
                params = params.replace("planid=", "");
                params = params.replace("planDetails/", "plans/");
                Backbone.history.navigate(params, true);
                return false;
            },

            // Renders the view's template to the UI
            render: function () {
            	//this.subtemplate = _.template(subtemplate, { pageSection: "planDetail" });
            	//$('.subnav').html(this.subtemplate);
                document.title = "Individual and Family Plan Details";

                if (this.model != null) {
                    this.$el.empty()
                    var self = this;

                    this.template = _.template(PlanDetailsTmpl, { model: this.model.attributes });
                    $(self.$el).append(this.template);
                }
                $(".indexBodyCol").each(function (index) {
                    var rowHeight = $(this).parent().height();
                    $(this).height(rowHeight);
                });
                helper.intializeContextualHelp();

                
            }

        });

        // Returns the View class
        return PlanDetailsView;
    }

);
