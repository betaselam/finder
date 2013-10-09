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
        var PlanModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {

            },

            // Default values for all of the Model attributes
            defaults: {
                planID: null,
                planNameText: null,
                productApplicantsDeniedPercentage: null,
                productApplicantsUpRatedPercentage: null,
                issuerID: null,
                issuerNameText: null,
                providerType: null,
                baseRateAmount: null,
                prescriptionInNetworkCoverageIndicator: null,
                familyAnnualDeductibleAmount: null,
                individualAnnualDeductibleAmount: null,
                familyAnnualOOPLimitAmount: null,
                individualAnnualOOPLimitAmount: null,
                familyAnnualMaxBenefitAmount: null,
                individualAnnualMaxBenefitAmount: null,
                isCompare: null
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
                var errors = [];

                //if (attrs.planID != null && !util.validateAllowedSpecialCharacters(attrs.planID))
                if (attrs.planID == null)
                        errors.push('planID is required');

                //if (attrs.planNameText != null && !util.validateAllowedSpecialCharacters(attrs.planNameText))
                if (attrs.planNameText == null)
                    errors.push('planNameText is required');

                if (attrs.planID != null && attrs.planID.length!==14)
                    errors.push('planID length must be 14');

                if (attrs.planID != null && !util.validateAlphaNumeric(attrs.planID))
                    errors.push('planID must be alphanumeric');

                if (attrs.productApplicantsDeniedPercentage != "" && !util.validateAllowedSpecialCharacters(attrs.productApplicantsDeniedPercentage))
                    errors.push('productApplicantsDeniedPercentage cannot have special characters');

                if (errors.length) return errors;
            }

         });


        // Returns the Model class
        return PlanModel;
    }

);
