// Jasmine Unit Testing Suite for Plan Model
// ---------------------------------------------
define(["jquery", "models/PlanHomeModel"],
 function ($, PlanHomeModel) {

     // Test suite for Counties Model   
     describe("Plan Home Model", function () {

         // Test spec for Counties model instance and elements 
         describe("PlanHome Attributes Model", function () {

             // Runs before every Model spec
             beforeEach(function () {

                 // Instantiates a new Model instance
                 this.planHomeModel = new PlanHomeModel();

                 // We are spying on the _validate method to see if it gets called
                 spyOn(PlanHomeModel.prototype, "validate").andCallThrough();

             });

             it("should be a valid model", function () {
                 expect(this.planHomeModel.isValid()).toBe(true);
             });

             it("should contain urlparam attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('urlparam')).toBe(true);
             });

             it("should contain zipCode attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('zipCode')).toBe(true);
             });

             it("should contain county attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('county')).toBe(true);
             });

             it("should contain state attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('state')).toBe(true);
             });

             it("should contain issuerID attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('issuerID')).toBe(true);
             });

             it("should contain effectiveDate attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('effectiveDate')).toBe(true);
             });

             it("should contain primary attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('primary')).toBe(true);
             });

             it("should contain spouse attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('spouse')).toBe(true);
             });

             it("should contain spouse attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('spouse')).toBe(true);
             });

             it("should contain child0 attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('child0')).toBe(true);
             });

             it("should contain child1 attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('child1')).toBe(true);
             });

             it("should contain child2 attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('child2')).toBe(true);
             });

             it("should contain child3 attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('child3')).toBe(true);
             });

             it("should contain child4 attribute", function () {
                 expect(this.planHomeModel.attributes.hasOwnProperty('child4')).toBe(true);
             });

         });

         // Test Spec for Counties model validation
         describe("Plan Validation Model", function () {
             // Runs before every Model spec
             beforeEach(function () {

                 // Instantiates a new Model instance
                 this.planHomeModel = new planHomeModel();


             });


         });

     });
 });