// Jasmine Unit Testing Suite for PlanCompare View
// ---------------------------------------------
define(["jquery", "views/PlanCompareView", "routers/DesktopRouter"],
 function ($, PlanCompareView, DesktopRouter) {

     // Test suite for View   
     xdescribe("PlanCompare View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new PlanCompareView instance
             this.view = new PlanCompareView();
             
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
             it("should contain the planDetails event", function () {
                 expect(this.view.planDetails).toBeDefined();
             });

         });

     });
 });