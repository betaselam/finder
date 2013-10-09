define(["jquery",
        "backbone",
        "text!templates/Plans/PlanCompare.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
            PlanCompareTmpl,
			subtemplate,
            helper) {

        var PlanCompareView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,
            selectedIds: [],
            comparePlans: [],

            // View constructor
            initialize: function () {
            },

            // View Event Handlers
            events: {
                'click .planDetailsLink': 'planDetails',
                'click .removePlan': 'removePlan',
                'click .pageNavigation': 'pageNavigation'
            },

            pageNavigation: function (event) {
                event.stopPropagation();
                helper.pageNavigation($(event.target).attr('data-name'), 'planCompare');
            },

            // Renders the view's template to the UI
            render: function () {
                this.$el.empty()
                document.title = "Individual and Family Plan Comparison";
                this.template = _.template(PlanCompareTmpl, { model: this.model });
                $(this.$el).html(this.template);
                helper.intializeContextualHelp();
            },

            planDetails: function (event) {
                var planId = $(event.target).attr('planId');

                if (planId) {
                    var params = Backbone.history.fragment;
                    //params = helper.updateQueryStringParameter(params, "cmpids", "");
                    params = params.replace('planCompare/', 'planDetails/') + "&planid=" + planId;
                    Backbone.history.navigate(params, true);
                }
            },

            removePlan: function (event) {
                var itemId = $(event.target).attr('planid');
                var itemTitle = helper.encodeSpecialChar($(event.target).attr("planname"));
                var params = Backbone.history.fragment;
                var self = this;

                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.comparePlans = helper.getParameterByName("cpmplans", params) !== "" ? helper.getParameterByName("cpmplans", params).split('|') : [];

                $.each(this.comparePlans, function (key, value) {
                    self.comparePlans[key] = helper.encodeSpecialChar(value);
                });

                if ($.inArray(itemId, this.selectedIds) !== -1) {
                    this.selectedIds = $.grep(this.selectedIds, function (e) { return e !== itemId; });
                    this.comparePlans = $.grep(this.comparePlans, function (e) { return e !== itemTitle; });

                    params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().toUpperCase().replace(/\,/g, "|"));
                    params = helper.updateQueryStringParameter(params, "cpmplans", this.comparePlans.toString().replace(/\,/g, "|"));
                    Backbone.history.navigate(params, true);
                }
            }

        });

        // Returns the View class
        return PlanCompareView;
    }

);
