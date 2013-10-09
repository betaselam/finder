// Jasmine Unit Testing Suite for Plan Model
// ---------------------------------------------
define(["jquery", "models/PlanModel"],
 function ($, PlanModel) {

     // Test suite for Counties Model   
     describe("Plan Model", function () {

         // Test spec for Counties model instance and elements 
         describe("Plan Attributes Model", function () {

             // Runs before every Model spec
             beforeEach(function () {

                 // Instantiates a new Model instance
                 this.planModel = new PlanModel();

                 // We are spying on the _validate method to see if it gets called
                 spyOn(PlanModel.prototype, "validate").andCallThrough();

             });

             it("should be a valid model", function () {
                 expect(this.planModel.isValid()).toBe(true);
             });

             it("should contain planID attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('planID')).toBe(true);
             });

             it("should contain planNameText attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('planNameText')).toBe(true);
             });

             it("should contain productApplicantsDeniedPercentage attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('productApplicantsDeniedPercentage')).toBe(true);
             });

             it("should contain productApplicantsUpRatedPercentage attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('productApplicantsUpRatedPercentage')).toBe(true);
             });

             it("should contain issuerID attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('issuerID')).toBe(true);
             });

             it("should contain issuerNameText attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('issuerNameText')).toBe(true);
             });

             it("should contain providerType attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('providerType')).toBe(true);
             });

             it("should contain baseRateAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('baseRateAmount')).toBe(true);
             });

             it("should contain prescriptionInNetworkCoverageIndicator attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('prescriptionInNetworkCoverageIndicator')).toBe(true);
             });

             it("should contain familyAnnualDeductibleAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('familyAnnualDeductibleAmount')).toBe(true);
             });

             it("should contain individualAnnualDeductibleAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('individualAnnualDeductibleAmount')).toBe(true);
             });

             it("should contain familyAnnualOOPLimitAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('familyAnnualOOPLimitAmount')).toBe(true);
             });

             it("should contain individualAnnualOOPLimitAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('individualAnnualOOPLimitAmount')).toBe(true);
             });

             it("should contain familyAnnualMaxBenefitAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('familyAnnualMaxBenefitAmount')).toBe(true);
             });

             it("should contain individualAnnualMaxBenefitAmount attribute", function () {
                 expect(this.planModel.attributes.hasOwnProperty('individualAnnualMaxBenefitAmount')).toBe(true);
             });
         });

         // Test Spec for Counties model validation
         describe("Plan Validation Model", function () {
             // Runs before every Model spec
             beforeEach(function () {

                 // Instantiates a new Model instance
                 this.planModel = new PlanModel();


             });
             describe("PlanID Validations", function () {

              

                 it("should allow you to set a valid planID with 14 alphanumeric chars", function () {
                     this.planModel.set({ "planID": "16064VA0080001" }, { validate: true, validateAll: false });
                     expect(this.planModel.get("planID")).toEqual("16064VA0080001");
                 });

                 it("should allow you to set a planNameText", function () {
                     this.planModel.set({ "planNameText": "Virginia Standard 750" }, { validate: true, validateAll: false });
                     expect(this.planModel.get("planNameText")).toEqual("Virginia Standard 750");
                 });

                 it("should not allow you to set a planID less than 14 chars", function () {
                     expect(this.planModel.set({"planID": "16064VA0080"}, { validate: true, validateAll: false })).toEqual(false);
                 });

                 it("should not allow you to set a planID greater than 14 chars", function () {
                     expect(this.planModel.set({ "planID": "16064VA00800001" }, { validate: true, validateAll: false })).toEqual(false);
                 });

                 it("should not allow you to set special chars in planID", function () {
                     expect(this.planModel.set({ "planID": "@#16064VA00800" }, { validate: true, validateAll: false })).toEqual(false);
                 });

                 it("should not have empty planID", function () {
                     //expect(this.planModel.set("planID", "")).toEqual(false);
                     expect(this.planModel.set({ "planID": "" }, { validate: true, validateAll: false })).toEqual(false);
                 });



             });



             describe("ProductApplicantsDeniedPercentage Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("productApplicantsDeniedPercentage", "1");
                     expect(this.planModel.get("productApplicantsDeniedPercentage")).toEqual("1");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set({ "productApplicantsDeniedPercentage": "" }, { validate: true, validateAll: false })).toEqual(false);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set({ "productApplicantsDeniedPercentage": "@$1" }, { validate: true, validateAll: false })).toEqual(false);
                 });
             });

             describe("ProductApplicantsUpRatedPercentage Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("productApplicantsUpRatedPercentage", "1");
                     expect(this.planModel.get("productApplicantsUpRatedPercentage")).toEqual("1");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("productApplicantsUpRatedPercentage", "")).toEqual(true);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("productApplicantsUpRatedPercentage", "@$1")).toEqual(false);
                 });
             });

             describe("IssuerID Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("issuerID", "16064");
                     expect(this.planModel.get("issuerID")).toEqual("16064");
                 });

                 it("should not allow you to set empty", function () {
                     expect(this.planModel.set("issuerID", "")).toEqual(false);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("issuerID", "@$1")).toEqual(false);
                 });
             });

            describe("IssuerNameText Validations", function () { it("should allow you to set a issuerNameText", function () {
                 this.planModel.set("issuerNameText", "Anthem Health Plans of VA(Anthem BCBS)");
                 expect(this.planModel.get("issuerNameText")).toEqual("Anthem Health Plans of VA(Anthem BCBS)");
                });
            });

             describe("providertype Validations", function () {

                 it("should allow you to set within PPO/HMO/Indemnity/POS/EPO data", function () {
                     this.planModel.set("providerType", "PPO");
                     expect(this.planModel.get("providerType")).toEqual("PPO");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("providerType", "")).toEqual(true);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("providerType", "@$1")).toEqual(false);
                 });
             });

             describe("BaseRateAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("baseRateAmount", "255.00");
                     expect(this.planModel.get("baseRateAmount")).toEqual("255.00");
                 });

                 it("should not allow you to set empty", function () {
                     expect(this.planModel.set("baseRateAmount", "")).toEqual(false);
                 });

                 it("should not allow you to set A-Z chars", function () {
                     expect(this.planModel.set("baseRateAmount", "aAzZ")).toEqual(false);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("baseRateAmount", "@$1")).toEqual(false);
                 });
             });

             describe("PrescriptionInNetworkCoverageIndicator Validations", function () {

                 it("should allow you to set with true/false data", function () {
                     this.planModel.set("prescriptionInNetworkCoverageIndicator", "true");
                     expect(this.planModel.get("prescriptionInNetworkCoverageIndicator")).toEqual("true");
                 });

                 it("should not allow you to set empty", function () {
                     expect(this.planModel.set("prescriptionInNetworkCoverageIndicator", "")).toEqual(false);
                 });

                 it("should not allow you to set numeric data", function () {
                     expect(this.planModel.set("prescriptionInNetworkCoverageIndicator", "123")).toEqual(false);
                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("prescriptionInNetworkCoverageIndicator", "@$true")).toEqual(false);
                 });
             });

             describe("FamilyAnnualDeductibleAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("familyAnnualDeductibleAmount", "1000");
                     expect(this.planModel.get("familyAnnualDeductibleAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("familyAnnualDeductibleAmount", "")).toEqual('Not Applicable');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("familyAnnualDeductibleAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("familyAnnualDeductibleAmount", "@$1000")).toEqual(false);
                 });
             });

             describe("IndividualAnnualDeductibleAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("individualAnnualDeductibleAmount", "1000");
                     expect(this.planModel.get("individualAnnualDeductibleAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("individualAnnualDeductibleAmount", "")).toEqual('Not Applicable');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("individualAnnualDeductibleAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("individualAnnualDeductibleAmount", "@$1000")).toEqual(false);
                 });
             });

             describe("FamilyAnnualOOPLimitAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("familyAnnualOOPLimitAmount", "1000");
                     expect(this.planModel.get("familyAnnualOOPLimitAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "")).toEqual('Not Applicable');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "@$1000")).toEqual(false);
                 });
             });

             describe("FamilyAnnualOOPLimitAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("familyAnnualOOPLimitAmount", "1000");
                     expect(this.planModel.get("familyAnnualOOPLimitAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "")).toEqual('Not Applicable');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("familyAnnualOOPLimitAmount", "@$1000")).toEqual(false);
                 });
             });

             describe("IndividualAnnualOOPLimitAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("individualAnnualOOPLimitAmount", "1000");
                     expect(this.planModel.get("individualAnnualOOPLimitAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("individualAnnualOOPLimitAmount", "")).toEqual('Not Applicable');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("individualAnnualOOPLimitAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("individualAnnualOOPLimitAmount", "@$1000")).toEqual(false);
                 });
             });


             describe("FamilyAnnualMaxBenefitAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("familyAnnualMaxBenefitAmount", "1000");
                     expect(this.planModel.get("familyAnnualMaxBenefitAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("familyAnnualMaxBenefitAmount", "")).toEqual('No Maximum');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("familyAnnualMaxBenefitAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("familyAnnualMaxBenefitAmount", "@$1000")).toEqual(false);
                 });
             });

             describe("IndividualAnnualMaxBenefitAmount Validations", function () {

                 it("should allow you to set with numeric data", function () {
                     this.planModel.set("individualAnnualMaxBenefitAmount", "1000");
                     expect(this.planModel.get("individualAnnualMaxBenefitAmount")).toEqual("true");
                 });

                 it("should allow you to set empty", function () {
                     expect(this.planModel.set("individualAnnualMaxBenefitAmount", "")).toEqual('No Maximum');
                 });

                 //                 it("should not allow you to set chars data", function () {
                 //                     expect(this.planModel.set("individualAnnualMaxBenefitAmount", "aAzZ")).toEqual(false);
                 //                 });

                 it("should not allow you to set special chars", function () {
                     expect(this.planModel.set("individualAnnualMaxBenefitAmount", "@$1000")).toEqual(false);
                 });
             });

         });

    
     });
 });