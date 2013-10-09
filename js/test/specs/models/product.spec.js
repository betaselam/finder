// Jasmine Unit Testing Suite for Product Model
// ---------------------------------------------
define(["jquery", "models/ProductModel"],
 function ($, ProductModel) {

     // Test suite for Counties Model   
     describe("Product Model", function () {

         // Runs before every Model spec
         beforeEach(function () {

             // Instantiates a new Model instance
             this.productModel = new ProductModel();

             // We are spying on the _validate method to see if it gets called
             spyOn(ProductModel.prototype, "validate").andCallThrough();

         });

         describe("ProductID Validations", function () {



             it("should allow you to set a valid productID with 10 alphanumeric chars", function () {
                 this.productModel.set({ "productID": "33104VA006" }, { validate: true, validateAll: false });
                 expect(this.productModel.get("productID")).toEqual("33104VA006");
             });

             it("should allow you to set a planNameText", function () {
                 this.productModel.set({ "productNameText": "Virginia Standard 750" }, { validate: true, validateAll: false });
                 expect(this.productModel.get("productNameText")).toEqual("Virginia Standard 750");
             });

             it("should not allow you to set a productID less than 14 chars", function () {
                 expect(this.productModel.set({ "productID": "16064VA0080" }, { validate: true, validateAll: false })).toEqual(false);
             });

             it("should not allow you to set a productID greater than 10 chars", function () {
                 expect(this.productModel.set({ "productID": "33104VA00611" }, { validate: true, validateAll: false })).toEqual(false);
             });

             it("should not allow you to set special chars in productID", function () {
                 expect(this.productModel.set({ "productID": "@#33104VA0" }, { validate: true, validateAll: false })).toEqual(false);
             });

             it("should not have empty productID", function () {
                 expect(this.productModel.set({ "productID": "" }, { validate: true, validateAll: false })).toEqual(false);
             });



         });


         // Test spec for Counties model instance and elements 
         describe("Product Attributes Model", function () {

             it("should model is valid ", function () {
                 expect(this.productModel.isValid()).toBe(true);
             });

             it("should contain productID attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('productID')).toBe(true);
             });

             it("should contain productNameText attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('productNameText')).toBe(true);
             });

             it("should contain issuerID attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('issuerID')).toBe(true);
             });

             it("should contain issuerNameText attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('issuerNameText')).toBe(true);
             });

             it("should contain providerType attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('providerType')).toBe(true);
             });

             it("should contain totalWrittenPremium attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('totalWrittenPremium')).toBe(true);
             });

             it("should contain hSAEligibleIndicator attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('hSAEligibleIndicator')).toBe(true);
             });

             it("should contain pCPCopayAmount attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('pCPCopayAmount')).toBe(true);
             });

             it("should contain coinsuranceRate attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('coinsuranceRate')).toBe(true);
             });

             it("should contain annualDeductibleAmount attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('annualDeductibleAmount')).toBe(true);
             });

             it("should contain annualOOPLimitAmount attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('annualOOPLimitAmount')).toBe(true);
             });

             it("should contain isCompare attribute", function () {
                 expect(this.productModel.attributes.hasOwnProperty('isCompare')).toBe(true);
             });
         });

     });
 });