// Blue ribbon navigation View
// -------
define(["jquery",
        "backbone",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
			subtemplate,
            helper) {

        var BlueSubNavView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".subnav",
            searchParameters: "",

            // View constructor
            initialize: function () {
                this.$el.html('');
                this.render();
            },

            // View Event Handlers
            events: {
                'click .pageNavigation': 'pageNavigation'
            },

            pageNavigation: function (event) {
                event.preventDefault();
                helper.pageNavigation($(event.target).attr('data-name'));
                return false;
            },

            // Renders the view's template to the UI
            render: function () {
                var params = Backbone.history.fragment;
                var searchParams = '';
                var adultCount = 0;
                var childCount = 0;
                var emplCount = 0;

                if (params.indexOf('product') !== -1) {
                    if (params.indexOf('employeenum') !== -1)
                        emplCount = helper.getParameterByName("employeenum", params);
                    if (emplCount == 1)
                        searchParams += '1 Employee';
                    else
                        searchParams += emplCount + ' Employees';
                }

                if (params.indexOf('plan') !== -1) {
                    if (params.indexOf('primary') !== -1)
                        adultCount++;
                    if (params.indexOf('spouse') !== -1)
                        adultCount++;
                    if (adultCount > 1)
                        searchParams += adultCount + ' Adults';
                    else
                        searchParams += '1 Adult';
                    childCount = params.match(/child_/g);
                    if (childCount && childCount.length > 0) {
                        if (childCount.length > 1)
                            searchParams += ' & ' + childCount.length + ' Children';
                        else
                            searchParams += ' & 1 Child';
                    }
                }

                this.searchParameters = searchParams;
                this.$el.append(_.template(subtemplate, { pageSection: helper.getPageName(), searchParameters: this.searchParameters }));
            }

        });

        // Returns the View class
        return BlueSubNavView;
    }

);