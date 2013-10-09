// Jasmine Unit Testing Suite for ProductHome View
// ---------------------------------------------
define(["jquery", "views/ProductsHomeView", "routers/DesktopRouter"],
 function ($, ProductsHomeView, DesktopRouter) {

     // Test suite for View   
     xdescribe("ProductHome View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new ProductHomeView instance
             this.view = new ProductsHomeView();
          
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
             it("should contain the submit_census event", function () {
                 expect(this.view.submit_census).toBeDefined();
             });

             // Test spec for view event
             it("should contain the fillCounties event", function () {
                 expect(this.view.fillCounties).toBeDefined();
             });

             // Test spec for view event
             it("should contain the filterOnEnter event", function () {
                 expect(this.view.filterOnEnter).toBeDefined();
             });

         });

     });
 });