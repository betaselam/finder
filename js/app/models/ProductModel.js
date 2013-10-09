// Model.js
// --------
define(["jquery",
        "backbone",
        "jqueryXML",
        "helpers/util",
        "xml"],

    function ($,
                Backbone,
                jqueryxml,
                util,
                xml) {

        // Creates a new Backbone Model class object
        var ProductModel = Backbone.Model.extend({

//            url: function () {
//                return '';
//            },
            // Model Constructor
            initialize: function () {

            },

            // Default values for all of the Model attributes
            defaults: {

                productID: "",
                productNameText: "",
                issuerID: "",
                issuerNameText: "",
                providerType: "",
                totalWrittenPremium: "",
                hSAEligibleIndicator: "",
                pCPCopayAmount:"",
                coinsuranceRate: "",
                annualDeductibleAmount: "",
                annualOOPLimitAmount:"",
                isCompare:""
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
                var errors = [];
                //if (attrs.productID != null && !util.validateAllowedSpecialCharacters(attrs.productID))
                if (attrs.productID == "") 
                    errors.push('productID is required');

                //if (attrs.productNameText != null && !util.validateAllowedSpecialCharacters(attrs.productNameText))
                if (attrs.productNameText == "")
                    errors.push('productNameText is required');

                if (attrs.productID != null && attrs.productID.length !== 10)
                    errors.push('productID length must be 10');

                if (attrs.productID != null && !util.validateAlphaNumeric(attrs.productID))
                    errors.push('productID must be alphanumeric');


                if (errors.length) return errors;
            }

        });

        // Returns the Model class
        return ProductModel;
    }

);
