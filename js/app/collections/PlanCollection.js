// Collection.js
// -------------
define(["jquery", "backbone", "models/PlanModel", "helpers/helper"],

  function ($, Backbone, PlanModel, helper) {

      // Creates a new Backbone Collection class object
      var PlanCollecion = Backbone.Collection.extend({

          url: gblServiceHandler + gblPlans,
          //filters
          compareId: "",
          TotalEligiblePlansQuanity: 0,
          inNetworkOutofPocketLimit: "",
          annualDeductibles: "",
          estimatedMonthlyBaseRate: "",
          doctorChoice: "",
          additionalFeatures: "",
          annualMaximumBenefits: "",
          showCompanies: "",

          // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
          models: [],

          initialize: function (options) {
            if (options)
              this.compareId = options.compareId.toUpperCase();
          },

          parse: function (data, options) {
              if (typeof data !== 'undefined') {
                  var jsonData = window.xml.xmlToJSON(data);
                  data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, ""));
                  if (data.IndividualPlanQuoteResponse.ResponseHeader.ReturnCode.Text === "Success") {
                      if (parseFloat(helper.getValuefromObj(data.IndividualPlanQuoteResponse, "TotalEligiblePlansQuanity", "")) > 0) {
                          this.TotalEligiblePlansQuanity = data.IndividualPlanQuoteResponse.TotalEligiblePlansQuanity.Text;
                          this.showCompanies = helper.getFilters("IssuerIDs", (data.IndividualPlanQuoteResponse.FilterAnalysis.IssuerIDs) ? data.IndividualPlanQuoteResponse.FilterAnalysis.IssuerIDs : "");
                          this.inNetworkOutofPocketLimit = helper.getFilters("InNetworkOutofPocketLimit", (data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkOOPLimit) ? data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkOOPLimit : "");
                          this.doctorChoice = helper.getFilters("ProviderTypes", (data.IndividualPlanQuoteResponse.FilterAnalysis.ProviderTypes) ? data.IndividualPlanQuoteResponse.FilterAnalysis.ProviderTypes : "");
                          this.annualDeductibles = helper.getFilters("AnnualDeductibles", (data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkDeductible) ? data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkDeductible : "");
                          this.estimatedMonthlyBaseRate = helper.getFilters("BaseRate", (data.IndividualPlanQuoteResponse.FilterAnalysis.BaseRate) ? data.IndividualPlanQuoteResponse.FilterAnalysis.BaseRate : "");
                          this.annualMaximumBenefits = helper.getFilters("AnnualMaximumBenefits", (data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkMaxBenefit) ? data.IndividualPlanQuoteResponse.FilterAnalysis.AnnualIndividualInNetworkMaxBenefit : "");
                          this.additionalFeatures = helper.getFilters("AdditionalFeatures", (data.IndividualPlanQuoteResponse.FilterAnalysis) ? data.IndividualPlanQuoteResponse.FilterAnalysis : "");
                          var self = this;
                          if (data.IndividualPlanQuoteResponse.Plans.Plan instanceof Array) {
                              $.each(data.IndividualPlanQuoteResponse.Plans.Plan, function (i, plan) {
                                  self.models.push(self.mapper(plan));
                              });
                          }
                          else { self.models.push(self.mapper(data.IndividualPlanQuoteResponse.Plans.Plan)); }
                      }
                  }
              }
          },

          mapper: function (plan) {
              var temp = new PlanModel();
              temp.planID = plan.PlanID.Text;
              temp.planNameText = plan.PlanNameText.Text;
              temp.issuerNameText = plan.IssuerNameText.Text;
              temp.baseRateAmount = helper.addCommas(plan.BaseRateAmount.Text); //Estimated Monthly Base Rate:
              temp.productApplicantsUpRatedPercentage = plan.ProductApplicantsUpRatedPercentage.Text; // You may be charged more.
              temp.productApplicantsDeniedPercentage = plan.ProductApplicantsDeniedPercentage.Text; //	How many applications are denied?
              temp.issuerID = plan.IssuerID.Text;
              temp.prescriptionInNetworkCoverageIndicator = (plan.PrescriptionInNetworkCoverageIndicator.Text == "true") ? "Yes" : "No"; //	Prescription Coverage:
              temp.providerType = plan.ProviderType.Text; // Doctor's Choice
              temp.familyAnnualDeductibleAmount = helper.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualDeductibleAmount, "Amount", "Not Applicable");
              temp.individualAnnualDeductibleAmount = helper.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualDeductibleAmount, "Amount", "Not Applicable");
              temp.familyAnnualOOPLimitAmount = helper.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualOOPLimitAmount, "Amount", "Not Applicable");
              temp.individualAnnualOOPLimitAmount = helper.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualOOPLimitAmount, "Amount", "Not Applicable");
              temp.familyAnnualMaxBenefitAmount = helper.getValuefromObj(plan.InNetworkCostSharing.FamilyAnnualMaxBenefitAmount, "Amount", "No Maximum");
              temp.individualAnnualMaxBenefitAmount = helper.getValuefromObj(plan.InNetworkCostSharing.IndividualAnnualMaxBenefitAmount, "Amount", "No Maximum");
              temp.isCompare = this.compareId.indexOf(plan.PlanID.Text) > -1 ? "true" : "false";
              return temp;
          },

          // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
          validate: function (attrs) {
          }


      });

      // Returns the Model class
      return PlanCollecion;

  }

);