// Jasmine Unit Testing Suite for PlanResults View
// ---------------------------------------------
define(["jquery", "views/PlanResultsView", "routers/DesktopRouter"],
 function ($, PlanResultsView, DesktopRouter) {

     // Test suite for View   
     describe("PlanResults View", function () {

         // Runs before every View spec
         beforeEach(function () {

             // Instantiates a new PlanResultsView instance
             this.view = new PlanResultsView();
            
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
             it("should contain the planDetails event", function () {
                 expect(this.view.planDetails).toBeDefined();
             });
             it("should contain the sortPlanResults event", function () {
                 expect(this.view.sortPlanResults).toBeDefined();
             });
             it("should contain the planCompare event", function () {
                 expect(this.view.planCompare).toBeDefined();
             });
             it("should contain the changeSearchOptions event", function () {
                 expect(this.view.changeSearchOptions).toBeDefined();
             });
             it("should contain the planCompare event", function () {
                 expect(this.view.planCompare).toBeDefined();
             });
             it("should contain the cBoxClick event", function () {
                 expect(this.view.cBoxClick).toBeDefined();
             });
//             it("should contain the remove_compare event", function () {
//                 expect(this.view.remove_compare).toBeDefined();
//             });
             it("should contain the pagination event", function () {
                 expect(this.view.pagination).toBeDefined();
             });

         });

     });
 });