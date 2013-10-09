// View.js
// -------
define(["jquery",
        "backbone",
		"expandcollapse",
		"custominput",
        "text!templates/Pagination.html",
        "text!templates/Products/ProductResults.html",
        "text!templates/sortSelect.html",
        "text!templates/Products/ProductParameters.html",
        "text!templates/Products/ProductCompareSection.html",
        "text!templates/Products/ProductCompareSection2.html",
		"text!templates/Products/ProductsFilters.html",
		"text!templates/BlueSubNavTemplate.html",
        "helpers/helper"],

    function ($,
                Backbone,
				expandcollapse,
				custominput,
                PageTmpl,
                ProductResultsTmpl,
                ProductSortTmpl,
                ProductParametersTmpl,
                ProductCompareSectionTmpl,
                ProductCompareSectionTmpl2,
				ProductFilterTmpl,
				subtemplate,
                helper) {

        var Results = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",
            model: null,
            totalcount: 0,
            selectedIds: [],
            compareProducts: [],

            // View constructor
            initialize: function () {
                this.selectedIds = [];
                this.compareProducts = [];
                this.el = ".example";
            },

            // View Event Handlers
            events: {
                "click .productDetailsButton": "productDetails",
                "change .ddlSort": "sortProductResults",
                "click .productCompare": "productCompare",
                "click  [name=compare_checkbox], .comparedLinks": "cBoxClick",
                "click .searchOptions": "changeSearchOptions",
                "click .need_compare, .pagenumber": "pagination"
            },

            pagination: function (event) {
                event.stopPropagation();
                var url = $(event.target).attr('url');
                params = helper.updateQueryStringParameter(Backbone.history.fragment, "pagenumber", url.split('=')[1]);
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                Backbone.history.navigate(params, true);
            },

            renderPaging: function () {
                var totalcount = this.options.totalcount, templ = "";
                if (parseFloat(totalcount) !== NaN && parseFloat(totalcount) !== 0) {
                    var pageInfo = helper.getPaginationInfo(Math.ceil(parseFloat(totalcount) / 10));
                    templ = _.template(PageTmpl, { pageInfo: pageInfo });
                }
                return templ;
            },
            // Renders the view's template to the UI
            render: function () {
                //create blue ribbon bar
                this.$el.empty();
                document.title = "Insurance Products Search Results";

                // this.subtemplate = _.template(subtemplate, { pageSection: "productResults" });
                // $('.subnav').html(this.subtemplate);
                //$(this.$el).append($('.subnav').html(this.subtemplate));

                if (this.model != null) {
                    //this.$el.empty();
                    var templ = this.renderPaging();
                    var self = this;

                    //show search parameters

                    var params = Backbone.history.fragment;
                    var empNum = helper.getParameterByName("employeenum", params);
                    var zip = "";
                    var vars = params.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        if (pair[0].toLowerCase() === "products/zip") {
                            zip = pair[1];
                            break;
                        }
                    }

                    var effective = helper.getParameterByName("effective", params);
                    var searchParam = {
                        productCount: this.options.totalcount,
                        numberOfEmployees: empNum,
                        zipCode: zip,
                        effectiveDate: effective
                    }

                    var searchTemplate = _.template(ProductParametersTmpl);
                    searchTemplate = searchTemplate({ searchParam: searchParam });
                    self.$el.append(searchTemplate);



                    //sorting
                    var input = {
                    	pageType: "productResults"
                    }
                    var sortTemplate = _.template(ProductSortTmpl);
                    sortTemplate = sortTemplate({ input: input });
                    self.$el.append(sortTemplate);
                    var params = Backbone.history.fragment;
                    helper.setSelectorValues(params);

                    self.$el.append(templ); //pagination

                    var compareTemplate = _.template(ProductCompareSectionTmpl); //compare
                    self.$el.append(compareTemplate);

                    $.each(this.model, function (i, product) {
                        this.template = _.template(ProductResultsTmpl, { model: product });
                        $(self.$el).append(this.template);

                        if (product.isCompare === "true")
                            $('#' + product.productID).attr('checked', 'checked');

                    });


                    compareTemplate = _.template(ProductCompareSectionTmpl2); //compare
                    self.$el.append(compareTemplate);


                    this.addCompareProducts();
                    self.$el.append(templ); //pagination
                    helper.intializeContextualHelp();

                    if (searchParam.productCount === 0) {
                        alert('Your search returned zero products. Please check the information you entered and try again.');
                    }


                }

                //set equal height to each blue box content
                $(".indexBodyCol").each(function (index) {
                    var rowHeight = $(this).parent().height();
                    $(this).height(rowHeight);
                });
            },

            sortProductResults: function (event) {
                event.stopPropagation();
                var sortSelected = $("#ddlSort").val();
                var sortParams = sortSelected.split(",");
                var sortField = sortParams[0];
                var sortOrder = sortParams[1];
                var params = Backbone.history.fragment;

                params = helper.updateQueryStringParameter(params, "ctrl", "ddlSort"); //508 fix
                var newURL = helper.getURLWithSortParams(params, sortField, sortOrder);
                if (params !== newURL)
                    Backbone.history.navigate(newURL, true);
                return false;
            },

            changeSearchOptions: function (event) {
                event.stopPropagation();

                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                params = params.replace("products/", "productsHome/");
                Backbone.history.navigate(params, { trigger: true });
                return false;
            },

            productDetails: function (event) {
                event.stopPropagation();
                var productid = $(event.target).attr('productid');
                var params = Backbone.history.fragment;
                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix

                if (productid) {
                    params = helper.updateQueryStringParameter(params, "productid", productid);
                    params = params.replace("products/", "productDetails/");
                    Backbone.history.navigate(params, true);
                    return false;
                }
            },
            productCompare: function () {
                if (this.selectedIds.length > 0) {
                    var params = Backbone.history.fragment;
                    params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                    params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().replace(/\,/g, "|"));
                    Backbone.history.navigate(params.replace('products/', 'productCompare/'), true);
                }
                //                else {
                //                    alert('At least 2 products should be chosen to be able to compare. Please select at least 2 products.');
                //                }
            },

            addCompareProducts: function () {
                var params = Backbone.history.fragment;
                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.compareProducts = helper.getParameterByName("products", params) !== "" ? helper.getParameterByName("products", params).split('|') : [];

                for (var i = 0; i < this.selectedIds.length; i++) {
                    $('#selectedCompareItems').append("<div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + this.compareProducts[i] + "</div>" +
                    "<a id='acmpr_" + this.selectedIds[i] + "' href='javascript:void(0);' class='comparedLinks compare-remove' productName='" + this.compareProducts[i] + "' name='remove-x' aria-hidden='false'><span class='hiddenText'>Remove " + this.compareProducts[i] + "</span><span aria-hidden='true' id=aspn_" + this.selectedIds[i] + " productName='" + this.compareProducts[i] + "'>X</span></a>" +
                    "<div class='spacer'></div></div>");
                    $('#selectedCompareItems2').append("<div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + this.compareProducts[i] + "</div>" +
                    "<a id='bcmpr_" + this.selectedIds[i] + "' href='javascript:void(0);' class='comparedLinks compare-remove' productName='" + this.compareProducts[i] + "' name='remove-x' aria-hidden='false'><span class='hiddenText'>Remove " + this.compareProducts[i] + "</span><span aria-hidden='true' id=bspn_" + this.selectedIds[i] + " productName='" + this.compareProducts[i] + "'>X</span></a>" +
                    "<div class='spacer'></div></div>");
                }
                if (this.selectedIds.length > 0) {
                    $('#compare_button').addClass('compareBtn-active');
                    $('#compare_button2').addClass('compareBtn-active');
                }
                else {
                    $('#compare_button').removeClass('compareBtn-active');
                    $('#compare_button2').removeClass('compareBtn-active');
                }
            },

            cBoxClick: function (event) {
                var params = Backbone.history.fragment;
                var self = this;

                params = helper.updateQueryStringParameter(params, "ctrl", ""); //508 fix
                this.selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                this.compareProducts = helper.getParameterByName("products", params) !== "" ? helper.getParameterByName("products", params).split('|') : [];

                $.each(this.compareProducts, function (key, value) {
                    self.compareProducts[key] = helper.encodeSpecialChar(value);
                });

                var itemId = 
                ($(event.target).attr("id").indexOf('cmpr_') > -1) 
                || 
                ($(event.target).attr("id").indexOf('spn_') > -1) ? $(event.target).attr("id").split('_')[1] : $(event.target).attr("id");

                var productTitle = helper.encodeSpecialChar($(event.target).attr("productName"));
                var productTitleUncoded = $(event.target).attr("productName");
                if ($.inArray(itemId, this.selectedIds) !== -1) {
                    this.selectedIds = $.grep(this.selectedIds, function (e) { return e !== itemId; });
                    this.compareProducts = $.grep(this.compareProducts, function (e) { return e !== productTitle; });

                    $('#acmpr_' + itemId).parent('div').remove();
                    $('#bcmpr_' + itemId).parent('div').remove();
                    $('#' + itemId).removeAttr('checked');
                    $('#lbl' + itemId).removeClass("checked");
                }
                else {
                    if (this.selectedIds.length < 3) {
                        this.selectedIds.push(itemId);
                        this.compareProducts.push(productTitle);
                     

                        $('#selectedCompareItems').append("<div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + $(event.target).attr("productName") + "</div>" +
                    "<a id='acmpr_" + itemId + "' href='javascript:void(0);' class='comparedLinks compare-remove' productName='" + $(event.target).attr("productName") + "' name='remove-x' aria-hidden='false'><span class='hiddenText'>Remove " + productTitleUncoded + "</span><span aria-hidden='true' id=aspn_" + itemId + " productName='"+productTitle+"'>X</span></a>" +
                    "<div class='spacer'></div></div>");

                        $('#selectedCompareItems2').append("<div class='compare-entry'><i class='iconCustom-ok compare-icon-check' aria-hidden='true'></i><div class='compare-entry-text'>" + $(event.target).attr("productName") + "</div>" +
                    "<a id='bcmpr_" + itemId + "' href='javascript:void(0);' class='comparedLinks compare-remove' productName='" + $(event.target).attr("productName") + "' name='remove-x' aria-hidden='false'><span class='hiddenText'>Remove " + productTitleUncoded + "</span><span aria-hidden='true' id=bspn_" + itemId + " productName='" + productTitle + "'>X</span></a>" +
                    "<div class='spacer'></div></div>");
                        //$(event.target).attr("checked", "checked");

                    } else {


                        alert("Up to 3 products can be selected for comparison.  Please remove a product before trying to add another for comparison.");
                        $('#' + itemId).removeAttr('checked');
                        $('#lbl' + itemId).removeClass("checked");
                    }
                }

                if (this.selectedIds.length > 0) {
                    $('#compare_button').addClass('compareBtn-active');
                    $('#compare_button2').addClass('compareBtn-active');
                }
                //$('img[src="/img/compare-products-default.gif"]').attr('src', '/img/compare-products-hover.gif');
                else {
                    $('#compare_button').removeClass('compareBtn-active');
                    $('#compare_button2').removeClass('compareBtn-active');
                }
                //$('img[src="/img/compare-products-hover.gif"]').attr('src', '/img/compare-products-default.gif');

                params = helper.updateQueryStringParameter(params, "cmpids", this.selectedIds.toString().replace(/\,/g, "|").toUpperCase());
                params = helper.updateQueryStringParameter(params, "products", this.compareProducts.toString().replace(/\,/g, "|"));

                Backbone.history.navigate(params, false);

                //keyboard focus to compare button on remove
                if ($(event.target).attr("name") == "remove-x") {
                	$('#compare_button').focus();

                }

            }
        });

        // Returns the View class
        return Results;
    }

);
