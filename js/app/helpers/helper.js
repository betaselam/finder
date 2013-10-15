define(["jquery",
        "backbone",
        "text!templates/RequestTemplates/PlanRequest.html",
        "text!templates/RequestTemplates/ProductRequest.html",
        "text!templates/RequestTemplates/CountiesRequest.html",
        "text!templates/RequestTemplates/PlanDetailsRequest.html",
        "text!templates/RequestTemplates/ProductDetailsRequest.html",
        "blockui",
        "helpers/glossary",
        "models/CountiesModel"],

    function ($,
              Backbone,
              planRequest,
              productRequest,
              countiesRequest,
              planDetailsRequest,
              productDetailsRequest,
              blockui,
              Glossary,
              CountiesModel) {

        var helper = {


            showHideSections: function (viewName) {

                switch (viewName) {
                    case "search":
                        $('.subnav').empty();
                        $('header .topnav').removeClass('active');
                        $('#topNav-Employee').addClass('active');
                        $('header .topnav span').html('Inactive tab');
                        $('#topNav-Employee span').html('Active tab');
                        $('#leftHand-rail').removeClass('navContainer');
                        $('#rightBody-content').removeClass('cardContainer');
                        $('#leftHand-rail').empty();
                        break;
                    case "results":
                        $('#leftHand-rail').addClass('navContainer');
                        $('#rightBody-content').addClass('cardContainer');
                        break;
                    case "compare":
                        $('#leftHand-rail').removeClass('navContainer');
                        $('#rightBody-content').removeClass('cardContainer');
                        $('#leftHand-rail').empty();
                        break;
                    case "details":
                        $('#leftHand-rail').removeClass('navContainer');
                        $('#rightBody-content').removeClass('cardContainer');
                        $('#leftHand-rail').empty();
                        break;
                }

            },

            firstdayofnextmonth: function () {
                var D = new Date();
                D.setMonth(D.getMonth() + 1, 1);
                var month = parseFloat(D.getMonth()) + 1;
                var date = parseFloat(D.getDate());
                return ((month.toString().length > 1) ? month : "0" + month)
                        + '/' + ((date.length > 1) ? date : "0" + date) + '/' + D.getFullYear();
            },

            sortObjects: function (a, b) {
                if (a && b && a.hasOwnProperty("Filter") && b.hasOwnProperty("Filter")) {
                    var temp1 = a.Filter.replace(/\$/g, "").split('-')[0];
                    var temp2 = b.Filter.replace(/\$/g, "").split('-')[0];
                    if (parseFloat(temp1) < parseFloat(temp2))
                        return -1;
                    if (parseFloat(temp1) > parseFloat(temp2))
                        return 1;
                }
                return 0;
            },

            bindvalidation: function () {
                var myCustomRules = {
                    FutureDate: [function (value) {
                        var temp = helper.getDateObj(value);
                        if (temp) {
                            var today = new Date();
                            var maxFutureDate = new Date();
                            maxFutureDate.setDate(today.getDate() + 150);
                            if (maxFutureDate > temp) { return true; }
                            return false;
                        }
                        return false;
                    }, "Coverage start date is more than 150 days in the future."],
                    notPastOrCurrentDate: [function (value) {
                        var temp = helper.getDateObj(value);
                        if (temp) {
                            var currentDate = new Date();
                            if (temp <= currentDate) { return false; }
                            return true;
                        }
                        return false;
                    }, "Coverage start date must be a future date.  Please enter a valid value."],

                    notFutureDate: [function (value) {
                        var temp = helper.getDateObj(value);
                        if (temp) {
                            var currentDate = new Date();
                            if (temp > currentDate) { return false; }
                            return true;
                        }
                        return false;
                    }, "Date of birth cannot be in the future."],

                    notBlankDate: [function (value) {
                        if (value === "__/__/____" || value === "") { return false; }
                        return true;
                    }, "The Coverage start date is required."],

                    notBlankDOB: [function (value) {
                        if (value === "__/__/____" || value === "") { return false; }
                        return true;
                    }, "The Date of birth is required."],

                    validDate: [function (value) {
                        if (/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)) { return true; }
                        return false;
                    }, "Not a valid date format"],

                    validCoverageDate: [function (value) {
                        if (/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)) { return true; }
                        return false;
                    }, "The coverage start date format is incorrect.  Please enter the date as (MM/DD/YYYY)."],
                    validBirthDate: [function (value) {
                        if (/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)) { return true; }
                        return false;
                    }, "Date of birth should be in valid format (MM/DD/YYYY)."],
                    validPrimaryBirthDate: [function (value) {
                        if (/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)) { return true; }
                        return false;
                    }, "Date of birth should be in valid format (MM/DD/YYYY)."],
                    validSpouseBirthDate: [function (value) {
                        if (/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)) { return true; }
                        return false;
                    }, "Date of birth should be in valid format (MM/DD/YYYY)."],
                    lessthanPrimary: [function (value) {
                        if ($('#primary').val()) {
                            var primval1 = helper.getDateObj($('#primary').val());
                            //var primval2 = helper.getDateObj($('#primary'));
                            var primval = helper.getDateObj(value);
                            if ((helper.getDateObj($('#primary').val()) >= helper.getDateObj(value))) {
                                return false;
                            }
                        }
                        return true;
                    }, "Child's date of birth must be after primary individual's date of birth."],
                    validateCounty: [function (value) {
                        if ($("#countySelection").is(":visible")) {
                            var county = $('#countySelection option:selected').val()
                            if (county === '--') {
                                return false;
                            }
                        }
                        return true;
                    }, "County is required. Please select a county."],
                    employeeNum: [function (value) {
                        if ((parseFloat(value) !== NaN) && (parseFloat(value) > 0) && (parseFloat(value) <= 100))
                            return true;
                        return false;
                    }, "You must specify the number of employees seeking coverage between 1 and 100."],
                    checkspouse: [function (value) {
                        if (!($('#spouse').attr('value') === "_" && $('#spouse_gender').val() === " " && $('#spouse_tobacco_user').val() === " ")) {
                            if (value === "_" || value === " ")
                                return false;
                        }
                    }, "This field is reqired"],
                    validateZip: [function (value) {
                        var temp = true;
                        var countyName = helper.getParameterByName("county", Backbone.history.fragment);
                        countyName = countyName ? countyName : $('#countySelection').val();
                        if (value && value.length === 5) {
                            $('#zip-feedbackMsg').text(" ")
                            var requestData = helper.getCountiesRequest(value);
                            var countiesModel = new CountiesModel();
                            countiesModel.fetch({ type: "POST", dataType: "xml", data: requestData, async: false, processData: false, contentType: 'application/xml',
                                success: function (data) {
                                    if (data && data.attributes.counties !== null) {
                                        if (data.attributes.counties.length > 1) {
                                            helper.hideShowCounty(true);
                                            $.each(data.attributes.counties, function (i, item) {
                                                $("#countySelection").append("<option value='" + item.CountyName.Text.toUpperCase() + "'>" + item.CountyName.Text.toUpperCase() + "</option>");
                                                $("#countySelection").attr('state', item.StateCode.Text);
                                            });
                                            if (countyName) {
                                                $('#countySelection').val(countyName).attr("selected", "selected");
                                            }
                                            temp = true;
                                        }
                                        else { // only 1 county
                                            helper.hideShowCounty(false);
                                        }
                                    }
                                    else { //no data found
                                        helper.hideShowCounty(false);
                                        temp = false;
                                    }
                                },
                                error: function () {
                                    helper.hideShowCounty(false);
                                    temp = false;
                                }
                            });
                        }
                        else {
                            helper.hideShowCounty(false);
                        }
                        return temp;
                    }, "Please enter a valid zip code"]
                };
                return myCustomRules;
            },

            addCommas:function (nStr){
	            nStr += '';
	            x = nStr.split('.');
	            x1 = x[0];
	            x2 = x.length > 1 ? '.' + x[1] : '';
	            var rgx = /(\d+)(\d{3})/;
	            while (rgx.test(x1)) {
		            x1 = x1.replace(rgx, '$1' + ',' + '$2');
	            }
	            return x1 + x2;
            },

            openProductDialog: function (self) {
                var value = $('#employeeNum').val();
                if ((parseFloat(value) !== NaN) && (parseFloat(value) === 1 || (parseFloat(value) > 50 && parseFloat(value) <= 100))) {
                    alert(Glossary["Dialog-Empcntles-Alert"].title);
                    self.enterkeyHelper();
                } else if ((parseFloat(value) !== NaN) && (parseFloat(value) > 100)) {
                    alert(Glossary["Dialog-Empcntgrt-Alert"].title);
                    return false;

                }
            },

            getDateObj: function (value) {
                var temp = value.split('/');
                if (temp && temp.length === 3) {
                    var myDate = new Date(temp[2], temp[0] - 1, temp[1]);
                    return myDate;
                }
                return "";
            },

            checkProductBenefitType: function (coverage, model, name) {
                var text = '';
                if (coverage.hasOwnProperty('InNetwork') || coverage.hasOwnProperty('Coverage')) {
                    text = this.getCoverageOptions(coverage);
                }
                else if (coverage.hasOwnProperty('Text') && coverage.Text !== "") {
                    text = coverage.Text;
                }
                if (text !== "") {
                    if (text === "Covered") { model.attributes.includedBenefits.push(name); }
                    else if (text === "Not Covered") { model.attributes.excludedBenefits.push(name); }
                    else if (text === "Covered with Limitations") { model.attributes.limitedBenefits.push(name); }
                    else if (text === "Available for Additional Premium") { model.attributes.additionalBenefits.push(name); }

                }
            },

            checkBenfitType: function (coverage, model, name) {
                var text = '';
                if (coverage.hasOwnProperty('InNetwork') || coverage.hasOwnProperty('Coverage')) {
                    text = this.getCoverageOptions(coverage);
                }
                else if (coverage.hasOwnProperty('Text') && coverage.Text !== "") {
                    text = coverage.Text;
                }
                if (text !== "") {
                    if (text.indexOf("Coinsurance after deductible") > -1 || text.indexOf("No Charge after deductible") > -1) { model.attributes.includedBenfits.push(name); }
                    else if (text === "Not Covered") { model.attributes.excludedBenfits.push(name); }
                    else if (text === "Covered with Limitations") { model.attributes.limitedBenfits.push(name); }

                }
            },

            getCoverageOptions: function (coverage) {
                var text = "";
                if (coverage.hasOwnProperty('InNetwork')) {
                    if (coverage.InNetwork.hasOwnProperty('Benefit') && coverage.InNetwork.hasOwnProperty('Percent')) {
                        text = coverage.InNetwork.Benefit.hasOwnProperty('Text') ? coverage.InNetwork.Benefit.Text : "";
                        if (text.indexOf('X') > -1) {
                            text = text.replace('X', coverage.InNetwork.Percent.Text);
                        }
                    }
                    else if (coverage.InNetwork.hasOwnProperty('Benefit') && coverage.InNetwork.hasOwnProperty('Amount')) {
                        text = coverage.InNetwork.Benefit.hasOwnProperty('Text') ? coverage.InNetwork.Benefit.Text : "";
                        if (text.indexOf('X') > -1) {
                            text = text.replace('X', coverage.InNetwork.Amount.Text);
                        }
                    }
                    else if (coverage.InNetwork.hasOwnProperty('Benefit')) {
                        text = coverage.InNetwork.Benefit.hasOwnProperty('Text') ? coverage.InNetwork.Benefit.Text : "";
                    }
                }
                else if (coverage.hasOwnProperty('Coverage')) {
                    if (coverage.Coverage.hasOwnProperty('Benefit') && coverage.Coverage.hasOwnProperty('Percent')) {
                        text = coverage.Coverage.Benefit.hasOwnProperty('Text') ? coverage.Coverage.Benefit.Text : "";
                        if (text.indexOf('X') > -1) {
                            text = text.replace('X', coverage.Coverage.Percent.Text);
                        }
                    }
                    else if (coverage.Coverage.hasOwnProperty('Benefit') && coverage.Coverage.hasOwnProperty('Amount')) {
                        text = coverage.Coverage.Benefit.hasOwnProperty('Text') ? coverage.Coverage.Benefit.Text : "";
                        if (text.indexOf('X') > -1) {
                            text = text.replace('X', coverage.Coverage.Amount.Text);
                        }
                    }
                    else if (coverage.Coverage.hasOwnProperty('Benefit')) {
                        text = coverage.Coverage.Benefit.hasOwnProperty('Text') ? coverage.Coverage.Benefit.Text : "";
                    }
                }
                return text;
            },

            getAmounts: function (amountList) {
                var amount = "";
                if (amountList.hasOwnProperty('Amounts') && amountList.Amounts.Amount instanceof Array) {
                    $.each(amountList.Amounts.Amount, function (i, amt) {
                        amount += "$" + amt.Text + ".00, ";
                    });
                    // added to remove the last unnecessary comma khurram 8/2
                    amount = amount.substring(0, amount.length - 2);
                }
                else if (amountList.hasOwnProperty('Amounts')) {
                    amount = "$" + amountList.Amounts.Amount.Text + ".00";
                }
                return (amount === "") ? "Not Applicable" : amount;
            },

            //Copay type == $, coinsurance type == %
            getMinMax: function (CoinsuranceRate, type) {
                var minmax = "";

                if (CoinsuranceRate.hasOwnProperty("Min") && CoinsuranceRate.hasOwnProperty("Max")) {
                    if (CoinsuranceRate.Min.Text === CoinsuranceRate.Max.Text) {
                        minmax = (type === "$") ? "$" + CoinsuranceRate.Min.Text : CoinsuranceRate.Min.Text + "%";
                    } else {
                        minmax = (type === "$") ? "$" + CoinsuranceRate.Min.Text + "-$" + CoinsuranceRate.Max.Text : CoinsuranceRate.Min.Text + "-" + CoinsuranceRate.Max.Text + "%";
                    }
                }
                return (minmax === "") ? "Not Applicable" : minmax;
            },

            getProductDetailsRequest: function (params) {
                var input = {
                    productId: []
                };

                var vars = params.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0].toLowerCase() === 'productid' || pair[0].toLowerCase() == 'cmpids') {
                        input.productId = {};
                        input.productId = pair[1].split('|');
                    }
                }
                var template = _.template(productDetailsRequest);
                template = template({ input: input });
                return template;
            },


            getPlanDetailsRequest: function (params) {
                var input = {
                    zipcode: "",
                    primary: null,
                    spouse: null,
                    children: [],
                    insuranceEffectiveDate: "",
                    planId: [],
                    countyName: "",
                    stateCode: ""
                };

                var vars = params.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0].toLowerCase() === 'zip') {
                        input.zipcode = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'primary') {
                        var primary = pair[1];
                        input.primary = {};
                        input.primary.dateOfBirth = this.reverseDate(primary.split('|')[0]),
                        input.primary.gender = (primary.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                        input.primary.tobaccoUser = (primary.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";

                    }
                    else if (pair[0].toLowerCase() === 'spouse') {
                        var spouse = pair[1];
                        input.spouse = {};
                        input.spouse.dateOfBirth = this.reverseDate(spouse.split('|')[0]),
                        input.spouse.gender = (spouse.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                        input.spouse.tobaccoUser = (spouse.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                    }
                    else if (pair[0].toLowerCase() === 'child_0' ||
                             pair[0].toLowerCase() === 'child_1' ||
                             pair[0].toLowerCase() === 'child_2' ||
                             pair[0].toLowerCase() === 'child_3' ||
                             pair[0].toLowerCase() === 'child_4') {
                        var child = pair[1];
                        var temp = {};
                        temp.dateOfBirth = this.reverseDate(child.split('|')[0]),
                        temp.gender = (child.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                        temp.tobaccoUser = (child.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                        input.children.push(temp);

                    }
                    else if (pair[0].toLowerCase() === 'effective') {
                        var effective = pair[1];
                        input.insuranceEffectiveDate = this.reverseDate(effective);
                    }
                    else if (pair[0].toLowerCase() == 'planid') {
                        input.planId = {};
                        input.planId = pair[1].split('|');
                    }
                    else if (pair[0].toLowerCase() == 'cmpids') {
                        input.planId = {};
                        input.planId = pair[1].split('|');
                    }
                    else if (pair[0].toLowerCase() === "county") {
                        input.countyName = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "state") {
                        input.stateCode = pair[1].toUpperCase();
                    }
                }
                var template = _.template(planDetailsRequest);
                template = template({ input: input });
                return template;
            },

            getPlanRequest: function (params) {
                var input = {
                    zipcode: this.getParameterByName("zip", params),
                    primary: null,
                    spouse: null,
                    children: [],
                    insuranceEffectiveDate: "",
                    isFilterAnalysisRequiredIndicator: true,
                    pageNumber: "1",
                    pageSize: "10",
                    sort: { sortField: "OOP LIMIT - IN NETWORK", sortDirection: "ASC" },
                    countyName: "",
                    stateCode: "",
                    ptype: "",
                    companies: "",
                    annded: "",
                    ooplimit: "",
                    maxben: "",
                    baserate: "",
                    adftrs: ""
                };

                var primary = this.getParameterByName("primary", params);
                if (primary) {
                    input.primary = {};
                    input.primary.dateOfBirth = this.reverseDate(primary.split('|')[0]);
                    input.primary.gender = (primary.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                    input.primary.tobaccoUser = (primary.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                }

                var vars = this.decodeSpecialChar(params).split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0].toLowerCase() === 'spouse') {
                        var spouse = pair[1];
                        input.spouse = {};
                        input.spouse.dateOfBirth = this.reverseDate(spouse.split('|')[0]),
                        input.spouse.gender = (spouse.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                        input.spouse.tobaccoUser = (spouse.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                    }
                    else if (pair[0].toLowerCase() === 'child_0' ||
                             pair[0].toLowerCase() === 'child_1' ||
                             pair[0].toLowerCase() === 'child_2' ||
                             pair[0].toLowerCase() === 'child_3' ||
                             pair[0].toLowerCase() === 'child_4') {
                        var child = pair[1];
                        var temp = {};
                        temp.dateOfBirth = this.reverseDate(child.split('|')[0]),
                        temp.gender = (child.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                        temp.tobaccoUser = (child.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                        input.children.push(temp);

                    }
                    else if (pair[0].toLowerCase() === 'effective') {
                        var effective = pair[1];
                        input.insuranceEffectiveDate = this.reverseDate(effective);
                    }
                    else if (pair[0].toLowerCase() === 'pagenumber') {
                        input.pageNumber = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'pagesize') {
                        input.pageSize = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'filteranalysisrequired') {
                        input.isFilterAnalysisRequiredIndicator = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'sortdirection') {
                        input.sort["sortDirection"] = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === 'sortfield') {
                        input.sort["sortField"] = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "county") {
                        input.countyName = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "state") {
                        input.stateCode = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "cmpids") {
                        input.compareId = pair[1];
                    }
                    else if (pair[0].toLowerCase() === "ptype") { input.ptype = pair[1]; }
                    else if (pair[0].toLowerCase() === "companies") { input.companies = pair[1].split('*'); }
                    else if (pair[0].toLowerCase() === "annded") { input.annded = pair[1]; }
                    else if (pair[0].toLowerCase() === "ooplimit") { input.ooplimit = pair[1]; }
                    else if (pair[0].toLowerCase() === "maxben") { input.maxben = pair[1]; }
                    else if (pair[0].toLowerCase() === "baserate") { input.baserate = pair[1]; }
                    else if (pair[0].toLowerCase() === "adftrs") { input.adftrs = pair[1]; }
                }
                var template = _.template(planRequest);
                template = template({ input: input });
                return template;

            },

            reverseDate: function (date) {
                var temp = date.split('-');
                //HNF-432
                return (temp.length > 2) ? temp[2] + '-' + temp[0] + '-' + temp[1] : date;
            },

            productOptions: function (params) {
                var options = {
                    compareId: this.getParameterByName("cmpids", params)
                };
                return options;
            },

            planOptions: function (params) {
                var options = {
                    compareId: this.getParameterByName("cmpids", params)
                };
                return options;
            },

            getProductRequest: function (params) {
                var input = {
                    numberOfEmployees: "",
                    zipcode: this.getParameterByName("zip", params),
                    countyName: "",
                    stateCode: "",
                    insuranceEffectiveDate: "",
                    isFilterAnalysisRequiredIndicator: "true",
                    pageNumber: "1",
                    pageSize: "10",
                    sort: { sortField: "OOP LIMIT - IN NETWORK", sortDirection: "ASC" },
                    ptype: "",
                    companies: "",
                    adftrs: ""
                };

                var vars = this.decodeSpecialChar(params).split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0].toLowerCase() === "zip") {
                        input.zipcode = pair[1];
                    }
                    else if (pair[0].toLowerCase() === "employeenum") {
                        input.numberOfEmployees = pair[1];
                    }
                    else if (pair[0].toLowerCase() === "county") {
                        input.countyName = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "state") {
                        input.stateCode = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === 'effective') {
                        var effective = pair[1];
                        input.insuranceEffectiveDate = this.reverseDate(effective);
                    }
                    else if (pair[0].toLowerCase() === 'pagenumber') {
                        input.pageNumber = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'pagesize') {
                        input.pageSize = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'filteranalysisrequired') {
                        input.isFilterAnalysisRequiredIndicator = pair[1];
                    }
                    else if (pair[0].toLowerCase() === 'sortdirection') {
                        input.sort["sortDirection"] = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === 'sortfield') {
                        input.sort["sortField"] = pair[1].toUpperCase();
                    }
                    else if (pair[0].toLowerCase() === "cmpids") {
                        input.compareId = pair[1];
                    }
                    else if (pair[0].toLowerCase() === "ptype") { input.ptype = pair[1]; }
                    else if (pair[0].toLowerCase() === "companies") { input.companies = pair[1].split('*'); }
                    else if (pair[0].toLowerCase() === "adftrs") { input.adftrs = pair[1]; }
                }
                var template = _.template(productRequest);
                template = template({ input: input });
                return template;

            },

            setSelectorValues: function (params) {
                var prevsortfield = helper.getParameterByName("sortfield", params);
                var prevsortorder = helper.getParameterByName("sortdirection", params);
                if (prevsortfield && prevsortorder) {
                    var sorter = prevsortfield.toUpperCase() + "," + prevsortorder.toUpperCase();
                    $("#ddlSort").val(sorter);
                }
            },

            getURLWithSortParams: function (params, sortField, sortOrder) {
                var sortChanged = false;

                if (params.indexOf("sortfield") > -1) {

                    var prevsortfield = encodeURI(helper.getParameterByName("sortfield", params));
                    if (params.indexOf(prevsortfield) === -1)
                        prevsortfield = helper.getParameterByName("sortfield", params);
                    if (prevsortfield !== sortField) {
                        params = params.replace(prevsortfield, sortField);
                        sortChanged = true;
                    }
                }
                else {
                    params += "&sortfield=" + sortField;
                    sortChanged = true;
                    //Backbone.history.navigate(params, true);
                }

                if (params.indexOf("sortdirection") > -1) {
                    var prevsortorder = helper.getParameterByName("sortdirection", params);
                    if (prevsortorder !== sortField) {
                        params = params.replace(prevsortorder, sortOrder);
                        sortChanged = true;
                    }
                }
                else {
                    params += "&sortdirection=" + sortOrder;
                    sortChanged = true;
                    //Backbone.history.navigate(params, true);
                }
                //params = "#products/" + params;
                if (sortChanged) {
                    var pageNumber = helper.getParameterByName("pagenumber", params);
                    var pageSize = helper.getParameterByName("pagesize", params);
                    if (pageNumber !== null && pageNumber !== "")
                        params = params.replace("&pagenumber=" + pageNumber, "&pagenumber=1");
                    else
                        params += "&pagenumber=1";
                    if (pageSize !== null && pageSize !== "")
                        params = params.replace("&pagesize=" + pageSize, "&pagesize=10");
                    else
                        params += "&pagesize=10";
                }
                return params;
            },

            getCountiesRequest: function (zipCode) {

                var template = _.template(countiesRequest);
                return template({ zip: zipCode });
            },

            getURLText: function (urlValid, urlText, altText) {
                var text = "";
                if (urlValid != "Valid") {
                    text = altText;
                }
                else {
                    text = urlText;
                }
                return text;
            },

            getValuefromObj: function (obj, prop, text) {
                if (obj.hasOwnProperty(prop) && prop !== "Text" && prop != "Amount") {
                    return text = obj[prop].Text;
                }
                else if (obj.hasOwnProperty(prop) && prop === "Amount") {
                    return text = "$" + obj[prop].Text;
                }
                else if (obj.hasOwnProperty(prop) && prop === "Text") {
                    text = obj[prop];
                }

                return text;
            },

            getParameterByName: function (name, paramsList) {

                var temp = paramsList.split('/');

                if (temp.length > 1 && paramsList.indexOf('?') === -1)
                    paramsList = '?' + temp[1];
                else if (paramsList.indexOf('?') === -1)
                    paramsList = '?' + paramsList;
                paramsList = this.decodeSpecialChar(paramsList);
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

                var regexS = "[\\?&]" + name.toLowerCase() + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(paramsList);
                if (results == null)
                    return "";
                else {
                    //results[1] = results[1].replace("% ", "%25 "); //fix for plan names that has % 
                    //819 if name ends with %, replace it
                    //if (this.endsWith(results[1], "%"))
                    //    results[1] = results[1].substr(0, results[1].length - 1) + "%25";
                    //return decodeURIComponent(results[1].replace(/\+/g, " "));
                    return results[1].replace(/\+/g, " ");
                }
            },

            endsWith: function (str, suffix) {
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            },

            getPaginationInfo: function (totalcount) {
                //var params = decodeURI(Backbone.history.fragment);
                var params = Backbone.history.fragment;
                var dotshow = true, limit = 2, current = parseFloat(this.getParameterByName("pagenumber", params));
                var url = params.replace("&pagenumber=" + helper.getParameterByName("pagenumber", params), "");
                var pageInfo = {
                    totalcount: totalcount,
                    url: url,
                    current: current,
                    limit: limit
                }
                return pageInfo;
            },

            hideShowCounty: function (bool) {
                if (bool) {
                    $('#countySelectionDiv').show();
                    $('#countySelection').html('');
                    $('#countySelection').append("<option value='--'>--</option>");
                    /*$('#zipCodeDiv').css("float", "left");*/
                }
                else {
                    $('#countySelectionDiv').hide();
                    $('#zipCodeDiv').css("float", "");
                }
            },

            cleanupView: function (view) {
                if (view != undefined) {
                    view.undelegateEvents();
                    view.$el.removeData().unbind();
                }
            },

            blockUIHlpr: function () {
                $.blockUI({ message: '<p class="block-title">Please Wait<p><img src="/img/pleasewait.gif"/></p><p>Please wait while we retrieve your content</p>' });
            },
            unBlockUIHlpr: function () {
                $.unblockUI();
            },

            getPhoneFormate: function (value) {
                if (value) {
                    return value.replace(/(\d{1})(\d{3})(\d{3})(\d{3})/, "$1-$2-$3-$4");
                } else {
                    return value;
                }
            },
            planDetailsMapping: function (model, data) {

                var plan = data;
                //Cost & Coverage Overview 
                model.set({ planID: plan.PlanID.Text });
                model.set({ planNameText: plan.PlanNameText.Text });
                model.set({ issuerID: plan.IssuerID.Text });
                model.set({ issuerNameText: plan.IssuerNameText.Text });
                model.set({ IssuerURL: { uRLCode: this.getValuefromObj(plan.IssuerURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.IssuerURL.URLAddress, "Text", "#")} });
                model.set({ issuerTollFreeNumber: this.getPhoneFormate(plan.IssuerTollFreeNumber.Text) });
                model.set({ issuerLocalNumber: this.getPhoneFormate(plan.IssuerLocalNumber.Text) });
                model.set({ issuerTTYNumber: this.getPhoneFormate(plan.IssuerTTYNumber.Text) });
                model.set({ baseRateAmount: plan.BaseRateAmount.Text });
                model.set({ productApplicantsDeniedPercentage: plan.ProductApplicantsDeniedPercentage.Text });
                model.set({ productApplicantsUpRatedPercentage: plan.ProductApplicantsUpRatedPercentage.Text });
                model.set({ InNetworkCostSharing:
                         { familyAnnualDeductibleAmount: this.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualDeductibleAmount, "Amount", "Not Applicable"),
                             individualAnnualDeductibleAmount: this.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualDeductibleAmount, "Amount", "Not Applicable"),
                             familyAnnualOOPLimitAmount: this.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualOOPLimitAmount, "Amount", "Not Applicable"),
                             individualAnnualOOPLimitAmount: this.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualOOPLimitAmount, "Amount", "Not Applicable"),
                             annualOOPElementsText: this.getValuefromObj(plan.InNetworkCostSharing.AnnualOOPElementsText, "Text", "Not Applicable"),
                             familyAnnualMaxBenefitAmount: this.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualMaxBenefitAmount, "Amount", "No Maximum"),
                             individualAnnualMaxBenefitAmount: this.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualMaxBenefitAmount, "Amount", "No Maximum")
                         }
                });
                model.set({ hSAEligibleIndicator: (plan.HSAEligibleIndicator.Text === "true") ? "Yes" : "No" }); //data.IndividualPlanBenefitResponse.PlanBenefits.PlanBenefit.HSAEligibleIndicator
                model.set({ ProviderURL: { uRLCode: this.getValuefromObj(plan.ProviderURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.ProviderURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(plan.ProviderURL.AlternateText, "Text", "#")} });
                model.set({ providerType: plan.ProviderType.Text });
                model.set({ prescriptionInNetworkCoverageIndicator: (plan.PrescriptionInNetworkCoverageIndicator.Text === "true") ? "Yes" : "No" });

                model.set({ ProductFormularyURL: { uRLCode: this.getValuefromObj(plan.ProductFormularyURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.ProductFormularyURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(plan.ProductFormularyURL.AlternateText, "Text", "#")} });
                model.set({ ProductBenefitURL: { uRLCode: this.getValuefromObj(plan.ProductBenefitURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.ProductBenefitURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(plan.ProductBenefitURL.AlternateText, "Text", "#")} });
                model.set({ PlanBrochureURL: { uRLCode: this.getValuefromObj(plan.PlanBrochureURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.PlanBrochureURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(plan.PlanBrochureURL.AlternateText, "Text", "#")} });
                model.set({ SBC: { uRLCode: this.getValuefromObj(plan.SBC.PDFURL.URLCode, "Text", ""), uRLAddress: this.getValuefromObj(plan.SBC.PDFURL.URLAddress, "Text", "#")} });
                //Coverage Options getCoverageOptions

                model.set({ PrimaryCareVisit: this.getCoverageOptions(plan.PrimaryCareVisit) });
                model.set({ SpecialistVisit: this.getCoverageOptions(plan.SpecialistVisit) });
                model.set({ DiagnosticTest: this.getCoverageOptions(plan.DiagnosticTest) });
                model.set({ OutpatientFacilityFee: this.getCoverageOptions(plan.OutpatientFacilityFee) });
                model.set({ OutpatientPhysicianFee: this.getCoverageOptions(plan.OutpatientPhysicianFee) });
                model.set({ HospitalFacilityFee: this.getCoverageOptions(plan.HospitalFacilityFee) });
                model.set({ HospitalPhysicianFee: this.getCoverageOptions(plan.HospitalPhysicianFee) });
                model.set({ EmergencyRoom: this.getCoverageOptions(plan.EmergencyRoom) });

                model.set({ MentalOutpatient: this.getCoverageOptions(plan.MentalOutpatient) });
                model.set({ MentalInpatient: this.getCoverageOptions(plan.MentalInpatient) });
                model.set({ SubstanceDisorderOutpatient: this.getCoverageOptions(plan.SubstanceDisorderOutpatient) });
                model.set({ SubstanceDisorderInpatient: this.getCoverageOptions(plan.SubstanceDisorderInpatient) });

                model.set({ PrenatalPostnatalCare: this.getCoverageOptions(plan.PrenatalPostnatalCare) });
                model.set({ DeliveryInpatient: this.getCoverageOptions(plan.DeliveryInpatient) });

                model.set({ genericDrugs: this.getCoverageOptions(plan.GenericDrugsRetail) });
                model.set({ preferredBrandDrugs: this.getCoverageOptions(plan.PreferredBrandDrugsRetail) });
                model.set({ specialtyDrugs: this.getCoverageOptions(plan.SpecialtyDrugsRetail) });

                model.attributes.includedBenfits = [];
                model.attributes.excludedBenfits = [];
                model.attributes.limitedBenfits = [];
                model.attributes.additionalBenfits = [];

                this.checkBenfitType(plan.HomeHealthcare, model, "Home health care");
                this.checkBenfitType(plan.InpatientRehabilitation, model, "Inpatient rehabilitation");
                this.checkBenfitType(plan.OutpatientRehabilitation, model, "Outpatient rehabilitation");
                this.checkBenfitType(plan.NursingCare, model, "Skilled nursing care");
                this.checkBenfitType(plan.DurableMedicalEquipment, model, "Durable medical equipment");
                this.checkBenfitType(plan.Hospice, model, "Hospice");
                this.checkBenfitType(plan.OtherPractitionerVisit, model, "Other practitioner office visit");
                this.checkBenfitType(plan.PreventiveCare, model, "Preventive care, screening, immunization");
                this.checkBenfitType(plan.Imaging, model, "Imaging (CT/PET scans, MRIs)");
                this.checkBenfitType(plan.EmergencyTransportation, model, "Emergency Transportation");
                this.checkBenfitType(plan.UrgentCare, model, "Urgent Care");
                this.checkBenfitType(plan.HabilitationServices, model, "Habilitation");
                this.checkBenfitType(plan.NonPreferredBrandDrugsRetail, model, "Non-preferred brand drugs");
                this.checkBenfitType(plan.RoutineEyeCareChildren, model, "Routine eye exam children");
                this.checkBenfitType(plan.EyeGlassesChildren, model, "Eye glasses children");
                this.checkBenfitType(plan.DentalCheckUpChildren, model, "Dental check up children");
                this.checkBenfitType(plan.CosmeticSurgery, model, "Cosmetic surgery");
                this.checkBenfitType(plan.HearingAid, model, "Hearing aid");
                this.checkBenfitType(plan.InfertilityTreatment, model, "Infertility treatment");
                this.checkBenfitType(plan.LongTermCare, model, "Long-term care");
                this.checkBenfitType(plan.PrivateNursing, model, "Private duty nursing");
                this.checkBenfitType(plan.EyeExamAdult, model, "Eye exam adult");
                this.checkBenfitType(plan.RoutineFootCare, model, "Routine foot care");
                this.checkBenfitType(plan.WeightLossProgram, model, "Weight loss program");
                this.checkBenfitType(plan.RoutineHearingTests, model, "Routine hearing tests");
                this.checkBenfitType(plan.Acupuncture, model, "Acupuncture");
                this.checkBenfitType(plan.NonEmergencyTravelOutside, model, "Non-emergency care outside U.S");
                this.checkBenfitType(plan.Chiropractic, model, "Chiropractic");
                this.checkBenfitType(plan.DentalAdult, model, "Dental care adult");
                this.checkBenfitType(plan.BariatricSurgery, model, "Bariatric surgery");

            },


            productDetailsMapping: function (model, data) {
                var product = data;
                //Cost & Coverage Overview 
                model.set({ productID: product.ProductID.Text });
                model.set({ productName: product.ProductNameText.Text });
                model.set({ productApplicantsDeniedPercentage: product.ProductApplicantsDeniedPercentage.Text });
                model.set({ productApplicantsUpRatedPercentage: product.ProductApplicantsUpRatedPercentage.Text });
                model.set({ issuerID: product.IssuerID.Text });
                model.set({ issuerNameText: product.IssuerNameText.Text });
                model.set({ issuerStateCode: product.IssuerStateCode.Text });
                model.set({ issuerTollFreeNumber: this.getPhoneFormate(product.IssuerTollFreeNumber.Text) });
                model.set({ issuerLocalNumber: this.getPhoneFormate(product.IssuerLocalNumber.Text) });
                model.set({ issuerTTYNumber: this.getPhoneFormate(product.IssuerTTYNumber.Text) });
                model.set({ providerType: product.ProviderType.Text });
                model.set({ averageCostPerEnrollee: product.AverageCostPerEnrollee.Text });
                model.set({ hSAEligibleIndicator: (product.HSAEligibleIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ sameSexPartnerIndicator: (product.SameSexPartnerIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ domesticPartnerIndicator: (product.DomesticPartnerIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ maternityInNetworkCoverageIndicator: (product.MaternityInNetworkCoverageIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ mentalInNetworkCoverageIndicator: (product.MentalInNetworkCoverageIndicator.Text === "true") ? "Yes" : "No" });
                //model.set({ prescriptionInNetworkCoverageIndicator: (product.PrescriptionInNetworkCoverageIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ substanceAbuseInNetworkCoverageIndicator: (product.SubstanceAbuseInNetworkCoverageIndicator.Text === "true") ? "Yes" : "No" });
                model.set({ InNetworkCostSharing:
                         { annualDeductibleAmount: helper.getAmounts(product.InNetworkCostSharing.AnnualDeductibleAmount),
                             pCPCopayAmount: helper.getMinMax(product.InNetworkCostSharing.PCPCopayAmount, "$"),
                             coinsuranceRate: helper.getMinMax(product.InNetworkCostSharing.CoinsuranceRate, "%"),
                             annualOOPLimitAmount: helper.getAmounts(product.InNetworkCostSharing.AnnualOOPLimitAmount),
                             annualMaxBenefitAmount: helper.getAmounts(product.InNetworkCostSharing.AnnualMaxBenefitAmount)
                         }
                });
                model.set({ OutNetworkCostSharing:
                             { annualDeductibleAmount: helper.getAmounts(product.OutNetworkCostSharing.AnnualDeductibleAmount),
                                 pCPCopayAmount: helper.getMinMax(product.OutNetworkCostSharing.PCPCopayAmount, "$"),
                                 coinsuranceRate: helper.getMinMax(product.OutNetworkCostSharing.CoinsuranceRate, "%"),
                                 annualOOPLimitAmount: helper.getAmounts(product.OutNetworkCostSharing.AnnualOOPLimitAmount),
                                 annualMaxBenefitAmount: helper.getAmounts(product.OutNetworkCostSharing.AnnualMaxBenefitAmount)
                             }
                });
                model.set({ IssuerURL: { uRLCode: helper.getValuefromObj(product.IssuerURL.URLCode, "Text", ""), uRLAddress: helper.getValuefromObj(product.IssuerURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(product.IssuerURL.AlternateText, "Text", "#")} });
                if (model.attributes.IssuerURL.uRLAddress.length < 3)
                    model.attributes.IssuerURL.uRLCode = "Invalid";
                model.set({ ProviderURL: { uRLCode: helper.getValuefromObj(product.ProviderURL.URLCode, "Text", ""), uRLAddress: helper.getValuefromObj(product.ProviderURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(product.ProviderURL.AlternateText, "Text", "#")} });
                if (model.attributes.ProviderURL.uRLAddress.length < 3)
                    model.attributes.ProviderURL.uRLCode = "Invalid";
                model.set({ ProductFormularyURL: { uRLCode: helper.getValuefromObj(product.ProductFormularyURL.URLCode, "Text", ""), uRLAddress: helper.getValuefromObj(product.ProductFormularyURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(product.ProductFormularyURL.AlternateText, "Text", "#")} });
                if (model.attributes.ProductFormularyURL.uRLAddress.length < 3)
                    model.attributes.ProductFormularyURL.uRLCode = "Invalid";
                model.set({ ProductBenefitURL: { uRLCode: helper.getValuefromObj(product.ProductBenefitURL.URLCode, "Text", ""), uRLAddress: helper.getValuefromObj(product.ProductBenefitURL.URLAddress, "Text", "#"), alternateText: this.getValuefromObj(product.ProductBenefitURL.AlternateText, "Text", "#")} });
                if (model.attributes.ProductBenefitURL.uRLAddress.length < 3)
                    model.attributes.ProductBenefitURL.uRLCode = "Invalid";
                //this.set({ SBC: { URLCode: helper.getValuefromObj(product.SBC.PDFURL.URLCode, "Text", ""), URLAddress: helper.getValuefromObj(product.SBC.PDFURL.URLAddress, "Text", "#")} });

                model.attributes.includedBenefits = [];
                model.attributes.excludedBenefits = [];
                model.attributes.limitedBenefits = [];
                model.attributes.additionalBenefits = [];

                //Coverage Options getCoverageOptions
                this.checkProductBenefitType(product.PrimaryCareVisit, model, "Primary care visit");
                this.checkProductBenefitType(product.SpecialistVisit, model, "Specialist visit");
                this.checkProductBenefitType(product.OtherPractitionerVisit, model, "Other practitioner visit");
                this.checkProductBenefitType(product.PreventiveCare, model, "Preventive care, screening, immunization");
                this.checkProductBenefitType(product.DiagnosticTest, model, "Diagnostic Test (X-ray, blood work)");
                this.checkProductBenefitType(product.Imaging, model, "Imaging (CT/PET scans, MRIs)");
                this.checkProductBenefitType(product.GenericDrugs, model, "Generic drugs");
                this.checkProductBenefitType(product.PreferredBrandDrugs, model, "Preferred brand drugs");
                this.checkProductBenefitType(product.NonPreferredBrandDrugs, model, "Non-preferred brand drugs");
                this.checkProductBenefitType(product.SpecialtyDrugs, model, "Specialty drugs");
                this.checkProductBenefitType(product.OutpatientFacilityFee, model, "Outpatient facility fee");
                this.checkProductBenefitType(product.OutpatientPhysicianFee, model, "Outpatient physician/surgeon fee");
                this.checkProductBenefitType(product.EmergencyRoom, model, "Emergency room");
                this.checkProductBenefitType(product.EmergencyTransportation, model, "Emergency Transportation");
                this.checkProductBenefitType(product.UrgentCare, model, "Urgent are");
                this.checkProductBenefitType(product.HospitalFacilityFee, model, "Hospital facility fee");
                this.checkProductBenefitType(product.HospitalPhysicianFee, model, "Hospital physician/surgeon fee");
                this.checkProductBenefitType(product.MentalOutpatient, model, "Mental/behavioral health outpatient services");
                this.checkProductBenefitType(product.MentalInpatient, model, "Mental/behavioral health inpatient services");
                this.checkProductBenefitType(product.SubstanceDisorderOutpatient, model, "Substance use disorder outpatient services");
                this.checkProductBenefitType(product.SubstanceDisorderInpatient, model, "Substance use disorder inpatient services");
                this.checkProductBenefitType(product.PrenatalPostnatalCare, model, "Prenatal postnatal care");
                this.checkProductBenefitType(product.DeliveryInpatient, model, "Delivery and all inpatient services for maternity care");
                this.checkProductBenefitType(product.HomeHealthcare, model, "Home health care");
                this.checkProductBenefitType(product.OutpatientRehabilitation, model, "Outpatient rehabilitation");
                this.checkProductBenefitType(product.Habilitation, model, "Habilitation");
                this.checkProductBenefitType(product.NursingCare, model, "Skilled nursing care");
                this.checkProductBenefitType(product.DurableMedicalEquipment, model, "Durable medical equipment");
                this.checkProductBenefitType(product.Hospice, model, "Hospice");
                this.checkProductBenefitType(product.RoutineEyeCareChildren, model, "Routine eye exam children");
                this.checkProductBenefitType(product.EyeGlassesChildren, model, "Eye glasses children");
                this.checkProductBenefitType(product.DentalCheckUpChildren, model, "Dental check up children");
                this.checkProductBenefitType(product.Acupuncture, model, "Acupuncture");
                this.checkProductBenefitType(product.BariatricSurgery, model, "Bariatric surgery");
                this.checkProductBenefitType(product.NonEmergencyTravelOutside, model, "Non-emergency care outside U.S");
                this.checkProductBenefitType(product.Chiropractic, model, "Chiropractic");
                this.checkProductBenefitType(product.CosmeticSurgery, model, "Cosmetic surgery");
                this.checkProductBenefitType(product.DentalAdult, model, "Dental care adult");
                this.checkProductBenefitType(product.HearingAid, model, "Hearing aid");
                this.checkProductBenefitType(product.InfertilityTreatment, model, "Infertility treatment");
                this.checkProductBenefitType(product.LongTermCare, model, "Long-term care");
                this.checkProductBenefitType(product.PrivateNursing, model, "Private-duty nursing");
                this.checkProductBenefitType(product.EyeExamAdult, model, "Eye exam adult");
                this.checkProductBenefitType(product.RoutineFootCare, model, "Routine foot care");
                this.checkProductBenefitType(product.WeightLossProgram, model, "Weight loss program");
            },

            updateQueryStringParameter: function (uri, key, value) {
                var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
                var separator = "&";
                if (uri.match(re)) {
                    return (value === "") ? uri.replace(re, '$2') : uri.replace(re, '$1' + key + "=" + value + '$2');
                }
                else {
                    return (value === "") ? uri : uri + separator + key + "=" + value;
                }
            },

            //Encode all special characters
            encodeSpecialChar: function (inputvalue, breadcrumb) {
                if (breadcrumb != null) {
                    if (inputvalue.indexOf("\'") > -1) inputvalue = inputvalue.replace("\'", "%27");
                    if (inputvalue.indexOf("~") > -1) inputvalue = inputvalue.replace("~", "%7E");
                    if (inputvalue.indexOf("!") > -1) inputvalue = inputvalue.replace("!", "%21");
                    if (inputvalue.indexOf("*") > -1) inputvalue = inputvalue.replace("*", "%2a");
                    if (inputvalue.indexOf("(") > -1) inputvalue = inputvalue.replace("(", "%28");
                    if (inputvalue.indexOf(")") > -1) inputvalue = inputvalue.replace(")", "%29");

                    if (inputvalue.indexOf("`") > -1) inputvalue = inputvalue.replace("`", "%60");
                }
                else {
                    //try {
                        inputvalue = encodeURIComponent(inputvalue);
//                    }
//                    catch (ex) {
//                        console.log(ex);
//                        console.log(inputvalue);
//                    }
                    inputvalue = inputvalue.replace("\'", "%27");
                    inputvalue = inputvalue.replace("~", "%7E");
                    inputvalue = inputvalue.replace("!", "%21");
                    inputvalue = inputvalue.replace("*", "%2a");
                    inputvalue = inputvalue.replace("(", "%28");
                    inputvalue = inputvalue.replace(")", "%29");
                    //inputvalue = inputvalue.replace("% ", "%25 ");
                    inputvalue = inputvalue.replace("`", "%60");
                }
                return inputvalue;
            },

            //Decode all special characters
            decodeSpecialChar: function (inputvalue, breadcrumb) {
                if (breadcrumb != null) {
                    if (inputvalue.indexOf("%27") > -1) inputvalue = inputvalue.replace("%27", "\'");
                    if (inputvalue.indexOf("%7E") > -1) inputvalue = inputvalue.replace("%7E", "~");
                    if (inputvalue.indexOf("%21") > -1) inputvalue = inputvalue.replace("%21", "!");
                    if (inputvalue.indexOf("%2a") > -1) inputvalue = inputvalue.replace("%2a", "*");
                    if (inputvalue.indexOf("%28") > -1) inputvalue = inputvalue.replace("%28", "(");
                    if (inputvalue.indexOf("%29") > -1) inputvalue = inputvalue.replace("%29", ")");

                    if (inputvalue.indexOf("%60") > -1) inputvalue = inputvalue.replace("%60", "`");
                }
                else {
                    //try {
                        inputvalue = decodeURIComponent(inputvalue);
//                    }
//                    catch (ex) {
//                        console.log(ex);
//                        console.log(inputvalue);
//                    }
                    inputvalue = inputvalue.replace("%27", "\'");
                    inputvalue = inputvalue.replace("%7E", "~");
                    inputvalue = inputvalue.replace("%21", "!");
                    inputvalue = inputvalue.replace("%2a", "*");
                    inputvalue = inputvalue.replace("%28", "(");
                    inputvalue = inputvalue.replace("%29", ")");
                    inputvalue = inputvalue.replace("%60", "`");
                    //inputvalue = inputvalue.replace("%25 ", "% ");
                }
                return inputvalue;
            },

            getFilters: function (type, data) {
                var results = [], self = this;
                switch (type) {
                    case "IssuerIDs":
                        if (data instanceof Array) { $.each(data, function (i, item) { results.push(self.getFilterHelper(item, "", "IssuerIDs")); }); }
                        else if (data) { results.push(self.getFilterHelper(data, "", "IssuerIDs")); }
                        break;
                    case "AnnualDeductibles":
                    case "BaseRate":
                    case "AnnualMaximumBenefits":
                    case "InNetworkOutofPocketLimit":
                        if (data instanceof Array) { $.each(data, function (i, item) { results.push(self.getFilterHelper(item, "Filter", "")); }); }
                        else { results.push(self.getFilterHelper(data, "Filter", "")); }
                        break;
                    case "ProviderTypes":
                        if (data instanceof Array) { $.each(data, function (i, item) { results.push(self.getFilterHelper(item, "ProviderType", "")); }); }
                        else { results.push(self.getFilterHelper(data, "ProviderType", "")); }
                        break;
                    case "AdditionalFeatures":
                        if (data.hasOwnProperty("HSAEligibleIndicator"))
                            results.push(self.additionalFeatures(data.HSAEligibleIndicator, "HSA Eligible"));
                        if (data.hasOwnProperty("DomesticPartnerIndicator"))
                            results.push(self.additionalFeatures(data.DomesticPartnerIndicator, "Domestic Partner Coverage"));
                        if (data.hasOwnProperty("SameSexIndicator"))
                            results.push(self.additionalFeatures(data.SameSexIndicator, "Same Sex Coverage"));
                        if (data.hasOwnProperty("PrescriptionInNetworkCoverageIndicator"))
                            results.push(self.additionalFeatures(data.PrescriptionInNetworkCoverageIndicator, "Rx Coverage"));
                        if (data.hasOwnProperty("MentalInNetworkCoverageIndicator"))
                            results.push(self.additionalFeatures(data.MentalInNetworkCoverageIndicator, "Mental Health coverage"));
                        if (data.hasOwnProperty("MaternityInNetworkCoverageIndicator"))
                            results.push(self.additionalFeatures(data.MaternityInNetworkCoverageIndicator, "Maternity Coverage"));
                        if (data.hasOwnProperty("SubstanceAbuseInNetworkCoverageIndicator"))
                            results.push(self.additionalFeatures(data.SubstanceAbuseInNetworkCoverageIndicator, "Substance abuse Coverage"));
                        break;
                }
                return results = $.grep(results, function (n, i) { return n !== undefined }); //fix for undefined
            },

            additionalFeatures: function (data, title) {
                var temp = null, self = this;
                if (data instanceof Array) { $.each(data, function (i, item) { if (self.getValuefromObj(item, "Indicator", "") === "true") { temp = self.getFilterHelper(item, "Indicator", title); } }); }
                else { if (self.getValuefromObj(data, "Indicator", "") === "true") { temp = self.getFilterHelper(data, "Indicator", title); } }
                if (temp)
                    return temp;
            },

            getFilterHelper: function (item, type, casename) {
                var temp = {};
                if (item) {
                    if (!casename) {
                        temp.Filter = this.getValuefromObj(item, type, "");
                        temp.Quantity = this.getValuefromObj(item, "Quantity", "");
                    }
                    else if (casename == "IssuerIDs") {
                        temp.IssuerID = this.getValuefromObj(item, "IssuerID", "");
                        temp.IssuerName = this.getValuefromObj(item, "IssuerName", "");
                        temp.Quantity = this.getValuefromObj(item, "Quantity", "");
                    }
                    else if (casename !== "") {
                        temp.name = casename;
                        temp.Indicator = this.getValuefromObj(item, "Indicator", "");
                        temp.Quantity = this.getValuefromObj(item, "Quantity", "");
                    }
                    return temp;
                }
            },

            intializeContextualHelp: function () {
                $(".contextualHelp").each(function (index) {
                    Glossary.popoverContextualHelp($(this).attr("data-name"), null);
                });
            },

            pageNavigation: function (eventId) {
                var params = Backbone.history.fragment;
                currentPage = this.getPageName();

                if (eventId === 'index') {
                    Backbone.history.navigate('', { trigger: true });

                } else if (eventId === 'products' && currentPage !== 'products') {
                    params = helper.updateQueryStringParameter(params, "productid", '');
                    Backbone.history.navigate(params.replace(currentPage + "/", "products/"), { trigger: true });

                } else if (eventId === 'productsHome') {
                    Backbone.history.navigate(params.replace(currentPage + "/", "productsHome/"), { trigger: true });

                } else if (eventId === 'productCompare' && currentPage !== 'productCompare') {
                    var selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                    params = helper.updateQueryStringParameter(params, "productid", '');
                    if (selectedIds.length > 0)
                        Backbone.history.navigate(params.replace(currentPage + "/", "productCompare/"), { trigger: true });
                    //                    else {
                    //                        alert('At least 2 products should be chosen to be able to compare. Please select at least 2 products.');
                    //                    }
                }

                if (eventId === 'plans' && currentPage !== 'plans') {
                    params = helper.updateQueryStringParameter(params, "planid", '');
                    Backbone.history.navigate(params.replace(currentPage + "/", "plans/"), { trigger: true });

                } else if (eventId === 'plansHome') {
                    Backbone.history.navigate(params.replace(currentPage + "/", "plansHome/"), { trigger: true });

                } else if (eventId === 'planCompare' && currentPage !== 'planCompare') {
                    var selectedIds = helper.getParameterByName("cmpids", params) !== "" ? helper.getParameterByName("cmpids", params).toUpperCase().split('|') : [];
                    params = helper.updateQueryStringParameter(params, "planid", '');
                    if (selectedIds.length > 0)
                        Backbone.history.navigate(params.replace(currentPage + "/", "planCompare/"), { trigger: true });
                    //                    else {
                    //                        alert('At least 2 plans should be chosen to be able to compare. Please select at least 2 plans.');
                    //                    }
                }

            },

            getPageName: function () {
                var params = Backbone.history.fragment;

                if (params.indexOf('products/') > -1) {
                    return 'products';
                } else if (params.indexOf('productDetails/') > -1) {
                    return 'productDetails';
                } else if (params.indexOf('productCompare/') > -1) {
                    return 'productCompare';
                } else if (params.indexOf('plans/') > -1) {
                    return 'plans';
                } else if (params.indexOf('planDetails/') > -1) {
                    return 'planDetails';
                } else if (params.indexOf('planCompare/') > -1) {
                    return 'planCompare';
                } else {
                    return "";
                }
            }

        };
        return helper;
    });
