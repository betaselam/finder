// -------
define(["jquery",
        "backbone",
        "maskedinput",
        "text!templates/Products/Products.html",
        "models/CountiesModel",
        "helpers/helper",
        "helpers/util",
         "datepicker",
         "formValidatorConfig",
         "formValidator"
        ],

    function ($,
              Backbone,
              maskedinput,
              products,
              CountiesModel,
              helper,
              util,
              datepicker,
              formValidatorConfig,
              formValidator) {

        var ProductsHomeView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            zip: "",
            state: "",
            county: "",

            // View constructor
            initialize: function () {
                datePickerController.destroyDatePicker("effective");
                document.title = "Insurance Products Search";
                // Calls the view's render method
                this.render();
                var params = Backbone.history.fragment;
                $("#effective").mask("99/99/9999");
                datePickerController.createDatePicker({ formElements: { "effective": "%m/%d/%Y"} });
                var empNum = helper.getParameterByName("employeenum", params);
                if (empNum) { $('#employeeNum').val(empNum); }
                var params = Backbone.history.fragment;
                var zip = helper.getParameterByName("zip", params);
                if (zip) { $('#zip').val(zip); }
                var effective = helper.getParameterByName("effective", params);
                if (effective) { $('#effective').val(effective.split('-')[0] + '/' + effective.split('-')[1] + '/' + effective.split('-')[2]); }
                this.myValidator = new ErrorValidator.FormValidator($("#form2"), $("#formValidation"), helper.bindvalidation());
                var countyName = helper.getParameterByName("county", params);
                if (countyName)
                    this.myValidator.triggerBucketCollection();
            },

            // View Event Handlers
            events: {
                'click #smallgroupcensus1': 'submit_census',
                'keypress .numericOnly': 'onlyNumerics',
                'keypress input,select': 'enterKey',
                'click #productBack': 'backPage',
                'change #countySelection': 'changeCounty'
            },

            // Renders the view's template to the UI
            render: function () {
                // clear blue ribbon
                $('.subnav').empty();

                this.$el.empty();

                var searchParam = {
                    numberOfEmployees: "",
                    zipCode: "",
                    effectiveDate: ""
                }
                // Setting the view's template property using the Underscore template method
                var templ = _.template(products, { effectivedate: helper.firstdayofnextmonth() });

                // Dynamically updates the UI with the view's template
                this.$el.html(templ);
                $('header .topnav').removeClass('active');
                $('#topNav-Employee').addClass('active');
                $('header .topnav span').html('Inactive tab');
                $('#topNav-Employee span').html('Active tab');
                // Maintains chainability

                $(".increment").each(function () {
                    $(this).on("click", function () {
                        var newval = $("#" + $(this).data("input")).val();

                        if (newval != "NaN")
                            $("#" + $(this).data("input")).val(++newval);
                    });
                });

                $(".decrement").each(function () {
                    $(this).on("click", function () {
                        var newval = $("#" + $(this).data("input")).val();

                        if (newval != "NaN" && newval > 0)
                            $("#" + $(this).data("input")).val(--newval);
                    });

                });

                return this;
            },

            onlyNumerics: function (evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
                return true;
            },

            changeCounty: function (event) {
                event.preventDefault(event);
                var countyName = helper.getParameterByName("county", Backbone.history.fragment);
                if (countyName) {
                    Backbone.history.navigate(helper.updateQueryStringParameter(Backbone.history.fragment, "county", $('#countySelection').val()), { trigger: false });
                }
            },

            submit_census: function (event) {
                event.preventDefault(event);
                helper.openProductDialog(this);
                this.enterkeyHelper();
                return false;
            },

            enterKey: function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault(e);
                    helper.openProductDialog(this);
                    this.enterkeyHelper();
                    return false;
                }
            },

            enterkeyHelper: function () {
                this.myValidator.triggerBucketCollection();
                if ($('.errorSummaryContainer').is(":visible")) {
                    $('.errorSummaryContainer').focus();
                    return false;
                }
                else {
                    this.redirect();
                    return false;
                }
            },

            redirect: function () {
                var urlParams = "#products/zip=" + $("#zip").val() + "&effective=" + $("#effective").val().replace(/\//g, '-') + "&employeenum=" + $('#employeeNum').val();
                if ($("#countySelection").is(":visible"))
                    urlParams += '&county=' + $('#countySelection option:selected').val() + '&state=' + $('#countySelection').attr('state');
                urlParams += "&pagenumber=1&pagesize=10" + "&sortfield=OOP LIMIT - IN NETWORK&sortdirection=ASC";
                Backbone.history.navigate(urlParams, { trigger: true });
            },

            backPage: function (event) {
                event.preventDefault();
                Backbone.history.navigate('home', { trigger: true });
            }

        });


        // Returns the View class
        return ProductsHomeView;
    }

);
