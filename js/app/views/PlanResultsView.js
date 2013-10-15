// Plan Results View
// -------
define(["jquery",
        "backbone",
		"expandcollapse",
        "text!templates/Plans/PlanResults.html",
        "text!templates/Pagination.html",
        "text!templates/sortSelect.html",
        "text!templates/Plans/PlanParameters.html",
        "text!templates/Plans/PlansComparePanel.html",
        "text!templates/Plans/PlansComparePanel2.html",
        "text!templates/Plans/PlansFilters.html",
        "text!templates/Plans/NoPlanResults.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
            Backbone,
			expandcollapse,
            PlanResultsTmpl,
            PageTmpl,
            PlanSortTmpl,
            PlanParametersTmpl,
            PlanComparePanelTmpl,
            PlanComparePanelTmpl2,
            PlansFilterTmpl,
            NoPlanResultsTmpl,
			subtemplate,
            helper) {

        var PlanResultsView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,
            filters: null,
            totalcount: 0,
            selectedIds: [],
            comparePlans: [],
            // View constructor
            initialize: function () {
                this.selectedIds = [];
                this.comparePlans = [];
                this.el = ".example";
            },

            // View Event Handlers
            events: {
                "click .planDetailsButton": "planDetails",
                "blur .ddlSort": "sortPlanResults",
                "click .planCompare": "planCompare",
                "click .searchOptions": "changeSearchOptions",
                "click .cmpPln": "planCompare",
                "click  [name=compare_checkbox], .comparedLinks": "cBoxClick",
                "click .pnlCompare": "remove_compare",
                "click .need_compare, .pagenumber": "pagination"
            },

            pagination: function (event) {
                event.stopPropagation();
                var url = $(event.target).attr('url');
                params = helper.updateQueryStringParameter(Backbone.history.fragment, "pagenumber", url.split('=')[1]);
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                Backbone.history.navigate(params, { trigger: true });
            },

            changeSearchOptions: function (event) {
                event.stopPropagation();
                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix

                params = params.replace("plans/", "plansHome/");
                Backbone.history.navigate(params, { trigger: true });
            },

            // Renders the view's template to the UI
            render: function () {
                //create blue ribbon bar
                //this.subtemplate = _.template(subtemplate, { pageSection: "planResults" });
                //$('.subnav').html(this.subtemplate);
                document.title = "Individual and Family Plan Search Results";
                this.$el.empty();
                if (this.model != null) {
                    //this.$el.empty();
                    var templ = this.renderPaging();
                    var self = this;


                    //Search Parameters Block
                    var params = Backbone.history.fragment;
                    var numberOfPersons = 0;
                    var zip = "";

                    if (helper.getParameterByName("primary", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("spouse", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("child_0", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("child_1", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("child_2", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("child_3", params) !== "") numberOfPersons++;
                    if (helper.getParameterByName("child_4", params) !== "") numberOfPersons++;

                    var vars = params.split("&");
                    var i = 0;
                    for (i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        if (pair[0].toLowerCase() === "plans/zip") {
                            zip = pair[1];
                            break;
                        }
                    }

                    var effective = helper.getParameterByName("effective", params);
                    var searchParam = {
                        totalRecords: this.options.totalcount,
                        numberOfPersons: numberOfPersons,
                        zipCode: zip,
                        effectiveDate: effective
                    }
                    if (searchParam.totalRecords === 0) {
                        //alert('Your search returned zero plans. Please check the information you entered and try again.');
                        var noResultsTemplate = _.template(NoPlanResultsTmpl); //sorting
                        self.$el.append(noResultsTemplate);

                    }
                    else {

                        var searchTemplate = _.template(PlanParametersTmpl);
                        searchTemplate = searchTemplate({ searchParam: searchParam });
                        self.$el.append(searchTemplate);

                        var input = { pageType: "planResults" };
                        var sortTemplate = _.template(PlanSortTmpl); //sorting
                        sortTemplate = sortTemplate({ input: input });
                        self.$el.append(sortTemplate);

                        var params = Backbone.history.fragment;
                        helper.setSelectorValues(params);


                        self.$el.append(templ); //pagination

                        var compareTemplate = _.template(PlanComparePanelTmpl); // compare
                        self.$el.append(compareTemplate);

                        $.each(this.model, function (i, plan) {

                            this.template = _.template(PlanResultsTmpl, { model: plan });
                            self.$el.append(this.template);

                            if (plan.isCompare === "true") {
                                $('#' + plan.planID).attr('checked', 'checked');
                            }
                        });

                        compareTemplate = _.template(PlanComparePanelTmpl2); // compare panel below
                        self.$el.append(compareTemplate);

                        this.addComparePlans();



                        self.$el.append(templ); //pagination

                        helper.intializeContextualHelp();
                    }
                }

                //set equal height to each blue box content
                $(".indexBodyCol").each(function (index) {
                    var rowHeight = $(this).parent().height();
                    $(this).height(rowHeight);
                });
            },

            sortPlanResults: function (event) {
                event.stopPropagation();
                var currSortField = helper.getParameterByName("sortfield", Backbone.history.fragment);
                var currSortDirection = helper.getParameterByName("sortdirection", Backbone.history.fragment);
                var currSort = currSortField + "," + currSortDirection;

                var sortSelected = $("#ddlSort").val();
                if (currSort !== sortSelected) {
                    var sortParams = sortSelected.split(",");
                    var sortField = sortParams[0];
                    var sortOrder = sortParams[1];
                    var params = Backbone.history.fragment;

                    params = helper.updateQueryStringParameter(params, "ctrl", "ddlSort"); //508 fix
                    var newURL = helper.getURLWithSortParams(params, sortField, sortOrder);
                    if (params !== newURL)
                        Backbone.history.navigate(newURL, true);
                }
                return false;
            },

            renderPaging: function () {
                var totalcount = this.options.totalcount, templ = "";
                if (parseFloat(totalcount) !== NaN && parseFloat(totalcount) !== 0) {
                    var pageInfo = helper.getPaginationInfo(Math.ceil(parseFloat(totalcount) / 10));
                    templ = _.template(PageTmpl, { pageInfo: pageInfo });
                }
                return templ;
            },

            planDetails: function (event) {
                event.stopPropagation();
                var planid = $(event.target).attr('planid');
                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix

                if (planid) {
                    params = helper.updateQueryStringParameter(params, "planid", planid);
                    params = params.replace("plans/", "planDetails/");
                    Backbone.history.navigate(params, true);
                    return false;
                }
            },


            planCompare: function () {
                if (this.selectedIds.length > 0) {
                    var params = Backbone.history.fragment;
                    params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                    params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().toUpperCase().replace(/\,/g, "|"));
                    Backbone.history.navigate(params.replace('plans/', 'planCompare/'), { trigger: true });
                }
                //                else {
                //                    alert('At least 2 plans should be chosen to be able to compare. Please select at least 2 plans.');
                //                }
            },

            addComparePlans: function () {
                var params = Backbone.history.fragment;
                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.comparePlans = helper.getParameterByName("cpmplans", params) !== "" ? helper.getParameterByName("cpmplans", params).split('|') : [];

                for (var i = 0; i < this.selectedIds.length; i++) {
                    $('#selectedCompareItems').append("<li><div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + this.comparePlans[i] + "</div>" +
                    "<a id='acmpr_" + this.selectedIds[i] + "' href='javascript:void(0);' class='comparedLinks compare-remove' planName='" + this.comparePlans[i] + "' name='remove-x' aria-hidden='false'><span class='hiddenText' >Remove " + this.comparePlans[i] + "</span><span aria-hidden='true' id = aspn_" + this.selectedIds[i] + " planName='" + this.comparePlans[i] + "'>X</span></a>" +
                    "<div class='spacer'></div></div></li>");

                    $('#selectedCompareItems2').append("<li><div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + this.comparePlans[i] + "</div>" +
                    "<a id='bcmpr_" + this.selectedIds[i] + "' href='javascript:void(0);' class='comparedLinks compare-remove' planName='" + this.comparePlans[i] + "' name='remove-x' aria-hidden='false'><span class='hiddenText' >Remove " + this.comparePlans[i] + "</span><span aria-hidden='true' id = bspn_" + this.selectedIds[i] + " planName='" + this.comparePlans[i] + "'>X</span></a>" +
                    "<div class='spacer'></div></div></li>");

                }

                (this.selectedIds.length > 0) ? $('#compare_button').addClass('compareBtn-active') : $('#compare_button').removeClass('compareBtn-active'); ;
                (this.selectedIds.length > 0) ? $('#compare_button2').addClass('compareBtn-active') : $('#compare_button2').removeClass('compareBtn-active'); ;
            },

            cBoxClick: function (event) {
                var params = Backbone.history.fragment;
                var self = this;
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.comparePlans = helper.getParameterByName("cpmplans", params) !== "" ? helper.getParameterByName("cpmplans", params).split('|') : [];

                $.each(this.comparePlans, function (key, value) {
                    self.comparePlans[key] = helper.encodeSpecialChar(value);
                });

                var itemId =
                ($(event.target).attr("id").indexOf('cmpr_') > -1)
                ||
                ($(event.target).attr("id").indexOf('spn_') > -1) ? $(event.target).attr("id").split('_')[1] : $(event.target).attr("id");
                var planTitle = helper.encodeSpecialChar($(event.target).attr("planName"));
                var planTitleUncoded = $(event.target).attr("planName");
                if ($.inArray(itemId, this.selectedIds) > -1) {
                    this.selectedIds = $.grep(this.selectedIds, function (e) { return e !== itemId; });
                    this.comparePlans = $.grep(this.comparePlans, function (e) { return e !== planTitle; });

                    $('#acmpr_' + itemId).parent('div').remove();
                    $('#bcmpr_' + itemId).parent('div').remove();
                    $('#' + itemId).removeAttr('checked');
                    $('#lbl' + itemId).removeClass("checked");

                }
                else {
                    if (this.selectedIds.length < 3) {
                        this.selectedIds.push(itemId);
                        this.comparePlans.push(planTitle);

                        $('#selectedCompareItems').append("<li><div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + $(event.target).attr("planName") + "</div>" +
                        "<a id='acmpr_" + itemId + "' href='javascript:void(0);' class='comparedLinks  compare-remove' planName='" + $(event.target).attr("planName") + "' name='remove-x' aria-hidden='false' ><span class='hiddenText'>Remove " + planTitleUncoded + "</span><span aria-hidden='true' id=aspn_" + itemId + " planName='" + $(event.target).attr("planName") + "'> X</span></a>" +
                        "<div class='spacer'></div></div></li>");

                        $('#selectedCompareItems2').append("<li><div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + $(event.target).attr("planName") + "</div>" +
                        "<a id='bcmpr_" + itemId + "' href='javascript:void(0);' class='comparedLinks  compare-remove' planName='" + $(event.target).attr("planName") + "' name='remove-x' aria-hidden='false' ><span class='hiddenText'>Remove " + planTitleUncoded + "</span><span aria-hidden='true' id=bspn_" + itemId + " planName='" + $(event.target).attr("planName") + "'> X</span></a>" +
                        "<div class='spacer'></div></div></li>");

                    } else {
                        alert("Up to 3 plans can be selected for comparison.  Please remove a plan before trying to add another for comparison.");
                        $('#' + itemId).removeAttr('checked');
                        $('#lbl' + itemId).removeClass("checked");
                    }
                }

                (this.selectedIds.length > 0) ? $('#compare_button').addClass('compareBtn-active') : $('#compare_button').removeClass('compareBtn-active'); ;
                (this.selectedIds.length > 0) ? $('#compare_button2').addClass('compareBtn-active') : $('#compare_button2').removeClass('compareBtn-active'); ;

                params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().toUpperCase().replace(/\,/g, "|"));
                params = helper.updateQueryStringParameter(params, "cpmplans", this.comparePlans.toString().replace(/\,/g, "|"));

                Backbone.history.navigate(params, { trigger: false });


                //keyboard focus to compare button on remove
                if ($(event.target).attr("name") == "remove-x") {
                    $('#compare_button').focus();

                }

            }

        });

        // Returns the View class
        return PlanResultsView;
    }

);
