// Jasmine Unit Testing Suite for ProductCompare View
// ---------------------------------------------
define(["jquery", "views/ProductCompareView", "routers/DesktopRouter"],
 function ($, ProductCompareView, DesktopRouter) {

     // Test suite for View   
     xdescribe("ProductCompare View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new ProductCompareView instance
             this.view = new ProductCompareView();

         });

         // Test spec for view element
         it("should contain the correct view element", function () {
             Backbone.history.stop();
             this.router = new DesktopRouter();
             expect(this.view.$el.selector).toEqual(".example");
         });

         // Test spec for view template
         it("should contain the appropriate template", function () {
             
         });

         describe("View Events", function () {

             // Test spec for view event
             it("should contain the productDetails event", function () {
                 expect(this.view.productDetails).toBeDefined();
             });

         });

     });
 });