// Plan Details Model.js
// ----------------------
define(["jquery",
        "backbone",
        "jqueryXML",
        "xml",
        "helpers/util",
        "helpers/helper"],

    function ($,
            Backbone,
            jqueryxml,
            xml,
            util,
            helper) {

        // Creates a new Backbone Model class object
        var PlanDetailsModel = Backbone.Model.extend({

            url: gblServiceHandler+gblPlanBenefits,
            // Model Constructor
            initialize: function () {
            },

            // Default values for all of the Model attributes
            defaults: {

                planID: "",
                planNameText: "",
                productID: "",
                productNameText: "",
                productApplicantsDeniedPercentage: "",
                productApplicantsUpRatedPercentage: "",
                issuerID: "",
                issuerNameText: "",
                issuerStateCode: "",
                issuerTollFreeNumber: "",
                issuerLocalNumber: "",
                issuerTTYNumber: "",
                providerType: "",
                baseRateAmount: "",
                hSAEligibleIndicator: "",

                InNetworkCostSharing: {
                    familyAnnualDeductibleAmount: "",
                    individualAnnualDeductibleAmount: "",
                    familyAnnualOOPLimitAmount: "",
                    individualAnnualOOPLimitAmount: "",
                    annualOOPElementsText: "",
                    familyAnnualMaxBenefitAmount: "",
                    individualAnnualMaxBenefitAmount: ""
                },

                IssuerURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProviderURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProductBenefitURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProductFormularyURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                PlanBrochureURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                SBC: { uRLCode: "", uRLAddress: "", alternateText: "" },
                OtherPractitionerVisit: { inNetwork: "", outOfNetwork: "", exception: "" },
                PrimaryCareVisit: { inNetwork: "", outOfNetwork: "", exception: "" },
                SpecialistVisit: { inNetwork: "", outOfNetwork: "", exception: "" },
                DiagnosticTest: { inNetwork: "", outOfNetwork: "", exception: "" },
                OutpatientFacilityFee: { inNetwork: "", outOfNetwork: "", exception: "" },
                OutpatientPhysicianFee: { inNetwork: "", outOfNetwork: "", exception: "" },
                HospitalFacilityFee: { inNetwork: "", outOfNetwork: "", exception: "" },
                HospitalPhysicianFee: { inNetwork: "", outOfNetwork: "", exception: "" },
                EmergencyRoom: { inNetwork: "", outOfNetwork: "", exception: "" },
                MentalOutpatient: { inNetwork: "", outOfNetwork: "", exception: "" },
                MentalInpatient: { inNetwork: "", outOfNetwork: "", exception: "" },
                SubstanceDisorderOutpatient: { inNetwork: "", outOfNetwork: "", exception: "" },
                SubstanceDisorderInpatient: { inNetwork: "", outOfNetwork: "", exception: "" },
                PrenatalPostnatalCare: { inNetwork: "", outOfNetwork: "", exception: "" },
                DeliveryInpatient: { inNetwork: "", outOfNetwork: "", exception: "" },
                genericDrugs: "",
                preferredBrandDrugs: "",
                specialtyDrugs: "",
                includedBenfits: [],
                excludedBenfits: [],
                limitedBenfits: [],
                additionalBenfits: []
            },

            parse: function (data, options) {
                if (typeof data !== 'undefined') {
                    var jsonData = window.xml.xmlToJSON(data);
                    data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, "").replace(/apit:/g, ""));
                    if (data.IndividualPlanBenefitResponse.ResponseHeader.ReturnCode.Text === "Success") {
                        var plan = data.IndividualPlanBenefitResponse.PlanBenefits.PlanBenefit;
                        helper.planDetailsMapping(this, plan);
                    }
                }
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
                var errors = [];

                if (attrs.planID == "")
                    errors.push('planID is required');

                if (attrs.planNameText == "")
                    errors.push('planNameText is required');

                if (attrs.planID != null && attrs.planID.length !== 14)
                    errors.push('planID length must be 14');

                if (attrs.planID != null && !util.validateAlphaNumeric(attrs.planID))
                    errors.push('planID must be alphanumeric');

               

                if (errors.length) return errors;
            }

        });

        // Returns the Model class
        return PlanDetailsModel;
    }

);
