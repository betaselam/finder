// Jasmine Unit Testing Suite for ProductDetails View
// ---------------------------------------------
define(["jquery", "views/ProductDetailsView", "routers/DesktopRouter"],
 function ($, ProductDetailsView, DesktopRouter) {

     // Test suite for View   
     xdescribe("ProductDetails View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new ProductDetailsView instance
             this.view = new ProductDetailsView();
    
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
             it("should contain the productResults event", function () {
                 expect(this.view.productResults).toBeDefined();
             });

         });

     });
 });