// -------
define(["jquery",
        "backbone",
        "maskedinput",
        "custominput",
        "text!templates/Plans/Plans.html",
        "text!templates/Plans/PlansChild.html",
        "models/CountiesModel",
         "models/PlanHomeModel",
         "helpers/helper",
          "helpers/PlanHelper",
         "helpers/util", "datepicker", "formValidatorConfig", "formValidator"],

    function ($,
              Backbone,
              maskedinput,
              custominput,
              plans,
              plansChild,
              CountiesModel,
              PlanHomeModel,
              helper,
              planHelper,
              util, datepicker, formValidatorConfig, formValidator) {

        var PlansHomeView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            zip: null,
            state: "",
            county: "",
            countydpd: "",

            // View constructor
            initialize: function () {
                // Calls the view's render method
                this.render();
                datePickerController.destroyDatePicker("effective");
                datePickerController.destroyDatePicker("primary");
                datePickerController.destroyDatePicker("spouse");
                datePickerController.destroyDatePicker("child_0");
                $("#effective").mask("99/99/9999");
                $("#primary").mask("99/99/9999");
                $("#spouse").mask("99/99/9999");
                $("#child_0").mask("99/99/9999");

                datePickerController.createDatePicker({ formElements: { "effective": "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { "primary": "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { "spouse": "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { "child_0": "%m/%d/%Y"} });
                planHelper.setCalendarIconText();
                this.myValidator = new ErrorValidator.FormValidator($("#form1"), $("#smallgroupcensus"), helper.bindvalidation());
                var countyName = helper.getParameterByName("county", Backbone.history.fragment);
                if (countyName)
                    this.myValidator.triggerBucketCollection();
            },
            onlyNumerics: function (evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
                return true;
            },
            retainValues: function (model) {
                var childs = ['child1', 'child2', 'child3', 'child4'];

                for (var i = 0; i < childs.length; i++) {
                    var temp = model.get(childs[i]);
                    if (temp) {
                        $("#census_table").append(_.template(plansChild, { startingNode: i + 1, child: temp }));
                    }
                }
                datePickerController.createDatePicker({ formElements: { 'child_1': "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { 'child_2': "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { 'child_3': "%m/%d/%Y"} });
                datePickerController.createDatePicker({ formElements: { 'child_4': "%m/%d/%Y"} });
                if ($("#census_table [id^='child_census_row']").length >= 5) {
                    $('#add_child_link').css("display", "none");
                }
            },

            // View Event Handlers
            events: {
                'click #smallgroupcensus': 'submit_plancensus',
                'click #add_child_link': 'show_additional_child',
                'keypress .numericOnly': 'onlyNumerics',
                'keypress input,select': 'enterKey',
                'change #countySelection': 'changeCounty',
                'click #planBack': 'backPage'
            },

            enterKey: function (e) {
                if (e.keyCode == 13) {
                    this.myValidator.triggerBucketCollection();
                    if ($('.errorSummaryContainer').is(":visible")) {
                        $('.errorSummaryContainer').focus();
                        return false;
                    }
                    else {
                        $('#smallgroupcensus').removeAttr("data-validationtrigger").click();
                        return false;
                    }
                }
            },

            // Renders the view's template to the UI
            render: function () {
                document.title = "Individual and Family Plan Search";
                this.planHomeModel = new PlanHomeModel();
                this.planHomeModel.parseUrl();
                $('.subnav').empty();
                this.template = _.template(plans, { planHomeModel: this.planHomeModel });
                this.$el.html(this.template);
                this.retainValues(this.planHomeModel);
                $('header .topnav').removeClass('active');
                $('#topNav-Family').addClass('active');
                $('header .topnav span').html('Inactive tab');
                $('#topNav-Family span').html('Active tab');
                return this;
            },

            changeCounty: function (event) {
                event.preventDefault(event);
                var countyName = helper.getParameterByName("county", Backbone.history.fragment);
                if (countyName) {
                    Backbone.history.navigate(helper.updateQueryStringParameter(Backbone.history.fragment, "county", $('#countySelection').val()), { trigger: false });
                }
            },

            // Renders the view's template to the UI
            submit_plancensus: function (event) {
                //event.preventDefault();
                event.preventDefault(event);
                planHelper.submitClick(event);
            },

            backPage: function (event) {
                event.preventDefault();
                Backbone.history.navigate('home', { trigger: true });
            },

           // Renders the view's template to the UI
            show_additional_child: function () {
                planHelper.showAdditionalChild(plansChild);
            }

        });

        // Returns the View class
        return PlansHomeView;
    }

);
