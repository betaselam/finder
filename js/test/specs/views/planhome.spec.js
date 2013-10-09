// Jasmine Unit Testing Suite for PlanHome View
// ---------------------------------------------
define(["jquery", "views/PlansHomeView", "routers/DesktopRouter"],
 function ($, PlansHomeView, DesktopRouter) {

     // Test suite for View   
     xdescribe("PlanHome View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new PlanHomeView instance
             this.view = new PlansHomeView();

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
             it("should contain the submit_plancensus event", function () {
                 expect(this.view.submit_plancensus).toBeDefined();
             });

             // Test spec for view event
             it("should contain the show_additional_child event", function () {
                 expect(this.view.show_additional_child).toBeDefined();
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