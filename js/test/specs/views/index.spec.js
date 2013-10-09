// Jasmine Unit Testing Suite for Index View
// ---------------------------------------------
define(["jquery", "views/IndexView", "routers/DesktopRouter"],
 function ($, IndexView, DesktopRouter) {

     // Test suite for View   
     describe("Index View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new IndexView instance
             this.view = new IndexView();

         });

         // Test spec for view element
         it("should contain the correct view element", function () {
             Backbone.history.stop();
             this.router = new DesktopRouter();
             expect(this.view.$el.selector).toEqual(".example");
         });

         // Test spec for view template
         it("should contain the appropriate template", function () {
             expect(this.view.template).toBeDefined();
         });

         describe("View functions", function () {

             // Test spec for view event
             it("should contain the render function", function () {
                 expect(this.view.render).toBeDefined();
             });

         });

         describe("View Events", function () {

             // Test spec for view event
             it("should contain the callPlan event", function () {
                 expect(this.view.callPlan).toBeDefined();
             });

             it("should contain the callProduct event", function () {
                 expect(this.view.callProduct).toBeDefined();
             });

         });

     });
 });