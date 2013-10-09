// Jasmine Unit Testing Suite for Counties Model
// ---------------------------------------------

define(["jquery", "models/CountiesModel", "helpers/helper", "sinon"],
 function ($, CountiesModel, helper, sinon) {

     // Test suite for Counties Model   
     describe("Counties Model", function () {

         // Runs before every Model spec
         beforeEach(function () {

             // Instantiates a new Model instance
             this.countiesModel = new CountiesModel();

             // We are spying on the _validate method to see if it gets called
             spyOn(CountiesModel.prototype, "validate").andCallThrough();

         });

         it("should be a valid model", function () {
             expect(this.countiesModel.isValid()).toBe(true);
         });

         // Test spec for Counties model instance and elements 
         describe("Counties Attributes Model", function () {

             it("should contain zipCode attribute", function () {
                 expect(this.countiesModel.attributes.hasOwnProperty('zipCode'));
             });

             it("should contain counties attribute", function () {
                 expect(this.countiesModel.attributes.hasOwnProperty('counties')).toBe(true);
             });

         });

         // Test Spec for Counties model validation
         describe("Counties Validation Model", function () {

             it("should allow you to set a 5 digit zipcode", function () {
                 this.countiesModel.set({ "zipCode": "22033" }, { validate: true, validateAll: false });
                 expect(this.countiesModel.get("zipCode")).toEqual("22033");
             });

             it("should not allow you to set a none 5 digit zipcode", function () {
                 expect(this.countiesModel.set({ "zipCode": "22" }, { validate: true, validateAll: false })).toEqual(false);
             });

             it("should allow you to set a counties", function () {
                 var tempCounties = [];
                 tempCounties.push({ "CountyName": { "Text": "FAIRFAX" }, "StateCode": { "Text": "VA"} });
                 this.countiesModel.set({ "counties": tempCounties }, { validate: true, validateAll: false });
                 expect(this.countiesModel.get("counties")).toEqual(tempCounties);
             });

             it("should not allow to have empty county", function () {
                 var tempCounties = [];
                 tempCounties.push("");
                 expect(this.countiesModel.set({ "counties": tempCounties }, { validate: true, validateAll: false })).toEqual(false);
             });

             it("should allow to set a valid model", function () {
                 var tempStates = [], tempCounties = [];
                 tempCounties.push({ "CountyName": { "Text": "MONTGOMERY" }, "StateCode": { "Text": "MD"} });
                 this.countiesModel.set({ "zipCode": "20853", "counties": tempCounties }, { validate: true });
                 expect(this.countiesModel.get("zipCode")).toEqual("20853");
                 expect(this.countiesModel.get("counties")).toEqual(tempCounties);
             });

             it("should not allow to set an invalid model", function () {
                 var tempStates = [], tempCounties = [];
                 tempCounties.push("");
                 expect(this.countiesModel.set({ "zipCode": "90", "counties": tempCounties, "states": tempStates }, { validate: true })).toEqual(false);
             });
         });

         describe('calling parse', function () {
             beforeEach(function () {
                 this.countiesModel = new CountiesModel();
             });

             it("should parse single county", function () {
                 this.countiesModel.parse('<ns2:ZipCodeValidationResponse xmlns:ns2="http://rbis.cms.org/api" xmlns="http://rbis.cms.org/api-types"> <ns2:ResponseHeader> <ReturnCode>Success</ReturnCode> </ns2:ResponseHeader> <ns2:Counties> <ns2:County> <CountyName>FAIRFAX</CountyName> <StateCode>VA</StateCode> </ns2:County> </ns2:Counties> <ns2:ZipCodeValidationRequest> <ns2:ZipCode>22033</ns2:ZipCode> </ns2:ZipCodeValidationRequest> </ns2:ZipCodeValidationResponse>');
                 //Add expect function
             });

             it("should parse multiple counties", function () {
                 this.countiesModel.parse('<ns2:ZipCodeValidationResponse xmlns:ns2="http://rbis.cms.org/api" xmlns="http://rbis.cms.org/api-types"> <ns2:ResponseHeader> <ReturnCode>Success</ReturnCode> </ns2:ResponseHeader> <ns2:Counties> <ns2:County> <CountyName>PRINCE WILLIAM</CountyName> <StateCode>VA</StateCode> </ns2:County>  <ns2:County> <CountyName>MANASSAS CITY</CountyName> <StateCode>VA</StateCode>  </ns2:County>  </ns2:Counties> <ns2:ZipCodeValidationRequest> <ns2:ZipCode>20109</ns2:ZipCode> </ns2:ZipCodeValidationRequest> </ns2:ZipCodeValidationResponse>');
                 //Add expect function
             });

             it("should throw error", function () {
                 this.countiesModel.parse('<ns2:ZipCodeValidationResponse xmlns:ns2="http://rbis.cms.org/api" xmlns="http://rbis.cms.org/api-types">  <ns2:ResponseHeader>  <ReturnCode>Error</ReturnCode> <ErrorMessage>Request is not valid for the schema</ErrorMessage>  </ns2:ResponseHeader>    <ns2:Counties/> </ns2:ZipCodeValidationResponse>');
                 //Add expect function
             });

             it("should handle null gracefully", function () {
                 this.countiesModel.parse(undefined);
                 //Add expect function
             });

         });
     });
 });


