// Jasmine Unit Testing Suite for ProductResults View
// ---------------------------------------------
define(["jquery", "views/ProductResultsView", "routers/DesktopRouter"],
 function ($, ProductResultsView, DesktopRouter) {

     // Test suite for View   
     xdescribe("ProductResults View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new ProductResultsView instance
             this.view = new ProductResultsView();
             
         });

         // Test spec for view element
         it("should contain the correct view element", function () {
             Backbone.history.stop();
             this.router = new DesktopRouter();
             expect(this.view.$el.selector).toEqual(".example");
         });

         // Test spec for view template
         it("should contain the appropriate template", function () {
             //expect(this.view.template).toEqual(ProductResultsTmpl);
         });

         describe("View Events", function () {

             // Test spec for view event
             it("should contain the productDetails event", function () {
                 expect(this.view.productDetails).toBeDefined();
             });

             // Test spec for view event
             it("should contain the sortProductResults event", function () {
                 expect(this.view.sortProductResults).toBeDefined();
             });

             // Test spec for view event
             it("should contain the productCompare event", function () {
                 expect(this.view.productCompare).toBeDefined();
             });

             // Test spec for view event
             it("should contain the cBoxClick event", function () {
                 expect(this.view.cBoxClick).toBeDefined();
             });

             // Test spec for view event
             it("should contain the changeSearchOptions event", function () {
                 expect(this.view.changeSearchOptions).toBeDefined();
             });

             // Test spec for view event
             it("should contain the renderPaging event", function () {
                 expect(this.view.renderPaging).toBeDefined();
             });

         });

     });
 });