//Product details
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
        var ProductDetailsModel = Backbone.Model.extend({


            url: "handler/ServiceHandler.ashx",
            // Model Constructor
            initialize: function () {

            },

            // Default values for all of the Model attributes
            defaults: {
                productID: "",
                productName: "",
                productApplicantsDeniedPercentage: "",
                productApplicantsUpRatedPercentage: "",
                issuerID: "",
                issuerNameText: "",
                issuerStateCode: "",
                issuerTollFreeNumber: "",
                issuerLocalNumber: "",
                issuerTTYNumber: "",
                providerType: "",
                averageCostPerEnrollee: "",
                hSAEligibleIndicator: "",
                sameSexPartnerIndicator: "",
                domesticPartnerIndicator: "",
                maternityInNetworkCoverageIndicator: "",
                mentalInNetworkCoverageIndicator: "",
                prescriptionInNetworkCoverageIndicator: "",
                substanceAbuseInNetworkCoverageIndicator: "",
                InNetworkCostSharing: {
                    annualDeductibleAmount: "",
                    pCPCopayAmount: "",
                    coinsuranceRate: "",
                    annualOOPLimitAmount: "",
                    annualMaxBenefitAmount: ""
                },
                OutNetworkCostSharing: {
                    annualDeductibleAmount: "",
                    pCPCopayAmount: "",
                    coinsuranceRate: "",
                    annualOOPLimitAmount: "",
                    annualMaxBenefitAmount: ""
                },
                IssuerURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProviderURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProductBenefitURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                ProductFormularyURL: { uRLCode: "", uRLAddress: "", alternateText: "" },
                includedBenefits: [],
                excludedBenefits: [],
                limitedBenefits: [],
                additionalBenefits: []
            },

            parse: function (data, options) {
                if (typeof data !== 'undefined') {
                    var jsonData = window.xml.xmlToJSON(data);
                    data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, "").replace(/apit:/g, ""));
                    if (data.SmallGroupProductBenefitResponse.ResponseHeader.ReturnCode.Text === "Success") {
                        var product = data.SmallGroupProductBenefitResponse.ProductBenefits.ProductBenefit;
                        helper.productDetailsMapping(this, product);
                    }
                }
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
                var errors = [];
                if (attrs.productID == "")
                    errors.push('productID is required');

                if (attrs.productName == "")
                    errors.push('productNameText is required');

                if (attrs.productID != null && attrs.productID.length !== 10)
                    errors.push('productID length must be 10');

                if (attrs.productID != null && !util.validateAlphaNumeric(attrs.productID))
                    errors.push('productID must be alphanumeric');


                if (errors.length) return errors;
            }

        });

        // Returns the Model class
        return ProductDetailsModel;

    }

);
