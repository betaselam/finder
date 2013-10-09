// Jasmine Unit Testing Suite for router
// ---------------------------------------------
define(["jquery", "views/ProductCompareView", "routers/DesktopRouter"],
 function ($, ProductCompareView, DesktopRouter) {


    // Backbone Desktop Router Suite: contains all tests related to Desktop routers
    xdescribe("Main router", function () {

        // Runs before every Desktop Router spec
        beforeEach(function () {

            // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
            Backbone.history.stop();

            // Instantiates a new Router instance
            this.router = new DesktopRouter();

            // Creates a Jasmine spy
            this.routeSpy = jasmine.createSpy("home");

            // When the route index method is called, the Jasmine spy is also called
            this.router.on("route:index", this.routeSpy);

        });

        it("should call the router home method when there is no hash on the url", function () {

            // Navigates to a different route
            this.router.navigate("elsewhere");

            // Navigates to the default route
            this.router.navigate("", { trigger: true });

            // Expects the Jasmine spy to have been called
            expect(this.routeSpy).toHaveBeenCalled();

        });

    }); // End of the Desktop Router test suite


});