define(["jquery",
        "backbone",
        "helpers/helper"
        ],

    function ($,
              Backbone,
              helper) {
        var PlanHelper = {

            submitClick: function (event) {
                var urlParams = '';
                urlParams = '#plans/';
                urlParams = urlParams + 'zip=' + $("#zip").val();
                urlParams = urlParams + '&primary=' + $('#primary').val().replace(/\//g, '-') + '|' + $("#primary_tobacco_user option:selected").val() + '|' + $('#primary_gender').val();
                urlParams = urlParams + '&' + 'effective=' + $('#effective').val().replace(/\//g, '-');
                if (this.checkControlValues('spouse'))
                    urlParams = urlParams + '&' + 'spouse=' + $('#spouse').val().replace(/\//g, '-') + '|' + $('#spouse_tobacco_user option:selected').val() + '|' + $('#spouse_gender').val();
                if (this.checkControlValues('child_0'))
                    urlParams = urlParams + '&' + 'child_0=' + $('#child_0').val().replace(/\//g, '-') + '|' + $('#child_0_tobacco_user option:selected').val() + '|' + $('#child_0_gender').val();
                if (this.checkControlValues('child_1'))
                    urlParams = urlParams + '&' + 'child_1=' + $('#child_1').val().replace(/\//g, '-') + '|' + $('#child_1_tobacco_user option:selected').val() + '|' + $('#child_1_gender').val();
                if (this.checkControlValues('child_2'))
                    urlParams = urlParams + '&' + 'child_2=' + $('#child_2').val().replace(/\//g, '-') + '|' + $('#child_2_tobacco_user option:selected').val() + '|' + $('#child_2_gender').val();
                if (this.checkControlValues('child_3'))
                    urlParams = urlParams + '&' + 'child_3=' + $('#child_3').val().replace(/\//g, '-') + '|' + $('#child_3_tobacco_user option:selected').val() + '|' + $('#child_3_gender').val();
                if (this.checkControlValues('child_4'))
                    urlParams = urlParams + '&' + 'child_4=' + $('#child_4').val().replace(/\//g, '-') + '|' + $('#child_4_tobacco_user option:selected').val() + '|' + $('#child_4_gender').val();
                if ($("#countySelection").is(":visible"))
                    urlParams = urlParams + '&county=' + $('#countySelection option:selected').val() + '&state=' + $('#countySelection').attr('state');
                urlParams += "&pagenumber=1&pagesize=10&sortfield=" + helper.encodeSpecialChar('OOP LIMIT - INDIVIDUAL - IN NETWORK') + "&sortdirection=ASC"; // default
                Backbone.history.navigate(urlParams, true);
            },

            checkControlValues: function (id) {
                if ($('#' + id).val() && $('#' + id + '_tobacco_user option:selected').val() && $('#' + id + '_gender').val()) {
                    return true;
                }
                return false;
            },

            showAdditionalChild: function (plansChild) {
                var totalChilds = $("#census_table [id^='child_census_row']").length;
                if (totalChilds < 5) {
                    $("#census_table").append(_.template(plansChild, { startingNode: totalChilds, child: null }));
                    for (var i = 1; i <= 4; i++) {
                        var id = "#child_" + i;
                        datePickerController.destroyDatePicker(id);
                        $(id).mask("99/99/9999");
                    }
                    datePickerController.createDatePicker({ formElements: { 'child_1': "%m/%d/%Y"} });
                    datePickerController.createDatePicker({ formElements: { 'child_2': "%m/%d/%Y"} });
                    datePickerController.createDatePicker({ formElements: { 'child_3': "%m/%d/%Y"} });
                    datePickerController.createDatePicker({ formElements: { 'child_4': "%m/%d/%Y"} });
                    totalChilds++;
                }
                if (totalChilds == 5) {
                    $('#add_child_link').css("display", "none");
                }
                this.setCalendarIconText();
            },

            setCalendarIconText: function () {

                var dtPickerCtrl = { "calendarIcon": [{ "id": "effective", "title": "Coverage Start Date Calendar Icon" }, { "id": "primary", "title": "Primary Date Calendar Icon" },
                                                       { "id": "spouse", "title": "Spouse Date Calendar Icon" }, { "id": "child_0", "title": "Child #1 Date Calendar Icon" },
                                                       { "id": "child_1", "title": "Child #2 Date Calendar Icon" }, { "id": "child_2", "title": "Child #3 Date Calendar Icon" },
                                                       { "id": "child_3", "title": "Child #4 Date Calendar Icon" }, { "id": "child_4", "title": "Child #5 Date Calendar Icon"}]
                };
                for (var i = 0; i < dtPickerCtrl['calendarIcon'].length; i++) {
                    if ($.find('a[href="#' + dtPickerCtrl['calendarIcon'][i]['id'] + '"]').length > 0) {
                        $('a[href="#' + dtPickerCtrl['calendarIcon'][i]['id'] + '"]').attr('title', dtPickerCtrl['calendarIcon'][i]['title']);
                    }
                }
            }
        }
        return PlanHelper;
    });