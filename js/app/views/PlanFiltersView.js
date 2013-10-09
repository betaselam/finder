// -------
define(["jquery",
        "backbone",
         "text!templates/Plans/PlansFilters.html",
         "helpers/helper",
         "helpers/util"],

    function ($,
              Backbone,
              planFilters,
              helper,
              util) {



        var PlanFiltersView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#leftHand-rail",
            filters: null,
            // View constructor
            initialize: function () {
                // Calls the view's render method
                this.$el.empty();
                this.el = "#leftHand-rail";
                this.render();
            },

            // View Event Handlers
            events: {
                'click .filters': 'filterResults'
            },


            filterResults: function (event) {
                var url = $(event.target).attr('url'), temp = url.split('=');
                var page = Backbone.history.fragment;
                page = helper.updateQueryStringParameter(page, 'pagenumber', '1');
                page = helper.updateQueryStringParameter(page, 'cmpids', '');
                page = helper.updateQueryStringParameter(page, 'cpmplans', '');
                if (url && temp.length === 2) {
                    // 508 fix
                    page = (url.indexOf('companies') > -1) ? helper.updateQueryStringParameter(page, "ctrl", temp[1]) : helper.updateQueryStringParameter(page, "ctrl", "");

                    if (url.indexOf('companies') > -1 && page.indexOf('companies') > -1 && temp[1]) {
                        var prevId = helper.getParameterByName("companies", page);
                        if (prevId && $(event.target).is(":checked"))
                            temp[1] = prevId + '*' + temp[1];
                        else
                            temp[1] = prevId.replace(temp[1] + "*", "").replace("*" + temp[1], "").replace(temp[1], "");
                    }
                    //var nav = helper.updateQueryStringParameter(page, helper.encodeSpecialChar(temp[0]), helper.encodeSpecialChar(temp[1]));
                    var nav = helper.updateQueryStringParameter(page, temp[0], temp[1]);
                    Backbone.history.navigate(nav, { trigger: true });
                }
            },
            // Renders the view's template to the UI
            render: function () {
                var hash = Backbone.history.fragment;
                var filteredparams = {
                    ptype: helper.getParameterByName("ptype", hash),
                    companies: helper.getParameterByName("companies", hash),
                    annded: helper.getParameterByName("annded", hash),
                    ooplimit: helper.getParameterByName("ooplimit", hash),
                    maxben: helper.getParameterByName("maxben", hash),
                    baserate: helper.getParameterByName("baserate", hash),
                    adftrs: helper.getParameterByName("adftrs", hash),
                    ctrlId: helper.getParameterByName("ctrl", hash)
                }
                if (this.options.filters != null) {
                    (this.options.filters.annualDeductibles) ? this.options.filters.annualDeductibles.sort(helper.sortObjects) : "";
                    (this.options.filters.inNetworkOutofPocketLimit) ? this.options.filters.inNetworkOutofPocketLimit.sort(helper.sortObjects) : "";
                    (this.options.filters.estimatedMonthlyBaseRate) ? this.options.filters.estimatedMonthlyBaseRate.sort(helper.sortObjects) : "";
                    (this.options.filters.annualMaximumBenefits) ? this.options.filters.annualMaximumBenefits.sort(helper.sortObjects) : "";
                    this.$el.append(_.template(planFilters, { filters: this.options.filters, filteredparams: filteredparams }));
                }

                //customize checkbox ui
                $('input').customInput();

                //508 fix
                $('#' + filteredparams['ctrlId']).focus();

            }
        });

        // Returns the View class
        return PlanFiltersView;
    }

);