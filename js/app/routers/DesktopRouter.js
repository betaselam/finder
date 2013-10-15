// DesktopRouter.js
// ----------------
define(["jquery",
        "backbone",
		"hcmode",
		"views/IndexView",
        "views/PlansHomeView",
        "views/ProductsHomeView",
        "text!templates/RequestTemplates/PlanRequest.html",
        "text!templates/Plans/PlanResults.html",
        "views/PlanResultsView",
        "views/PlanFiltersView",
        "views/ProductFiltersView",
        "views/PlanDetailsView",
        "views/ProductDetailsView",
        "views/PlanCompareView",
        "views/ProductCompareView",
        "collections/PlanCollection",
        "collections/PlanCompareCollection",
        "collections/ProductCompareCollection",
        "text!templates/RequestTemplates/ProductRequest.html",
        "text!templates/Products/ProductResults.html",
        "views/ProductResultsView",
        "collections/ProductCollection",
        "models/PlanDetailsModel",
        "models/ProductDetailsModel",
        "views/ProductCompareView",
        "views/BlueSubNavView",
        "collections/ProductCompareCollection",
        "helpers/helper"],

    function ($,
                Backbone,
				hcmode,
				IndexView,
                PlansHomeView,
                ProductsHomeView,
                PlanRequest,
                PlanResults,
                PlanView,
                PlanFiltersView,
                ProductFiltersView,
                PlanDetailsView,
                ProductDetailsView,
                PlanCompareView,
                ProductCompareView,
                PlanCollection,
                PlanCompareCollection,
                ProductCompareCollection,
                ProductRequest,
                ProductResults,
                ProductView,
                ProductCollection,
                PlanDetailsModel,
                ProductDetailsModel,
                ProductCompareView,
                BlueSubNavView,
                ProductCompareCollection,
                helper) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function () {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "plansHome": "plansHome",
                "plansHome/:params": "plansHome",
                "productsHome": "productsHome",
                "productsHome/:params": "productsHome",
                "plans/:params": "plans",
                "products/:params": "products",
                "planDetails/:params": "planDetails",
                "productDetails/:params": "productDetails",
                "planCompare/:params": "planCompare",
                "productCompare/:params": "productCompare",
                "*action": "index"
            },

            index: function () {
                // Instantiates a new view which will render the header text to the page
                new IndexView();

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);

            },

            plansHome: function () {
                // Instantiates a new view which will render the header text to the page
                helper.cleanupView(this.plansHomeView);
                this.plansHomeView = new PlansHomeView();

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            },

            productsHome: function () {
                // Instantiates a new view which will render the header text to the page
                helper.cleanupView(this.productsHomeView);
                this.productsHomeView = new ProductsHomeView();

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            },


            plans: function (params) {
                helper.blockUIHlpr();
                var encodedParams = helper.encodeSpecialChar(params);
                var requestData = helper.getPlanRequest(encodedParams);
                this.planCollection = new PlanCollection(helper.planOptions(encodedParams));

                var self = this;
                this.planCollection.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.resultsview);
                            self.resultsview = new PlanView({ model: data.models, totalcount: data.TotalEligiblePlansQuanity });
                            self.resultsview.render();
                            if (data.TotalEligiblePlansQuanity && data.TotalEligiblePlansQuanity !== "0") {
                                helper.cleanupView(self.filterView);
                                self.filterView = new PlanFiltersView({ filters: data });
                            }
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for two column---*/

                $('#leftHand-rail').addClass('navContainer');
                $('#rightBody-content').addClass('cardContainer');

                //default to top of the page
                $(window).scrollTop(0);

            },

            planDetails: function (params) {
                helper.blockUIHlpr();
                var self = this;
                //var requestData = helper.getPlanDetailsRequest(decodeURI(params));
                var requestData = helper.getPlanDetailsRequest(params);
                this.planDetailsModel = new PlanDetailsModel();
                this.planDetailsModel.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.planDetailsView);
                            self.planDetailsView = new PlanDetailsView({ model: data });
                            self.planDetailsView.render();
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            },

            productDetails: function (params) {
                var self = this;
                helper.blockUIHlpr();
                var requestData = helper.getProductDetailsRequest(params);
                this.productDetailsModel = new ProductDetailsModel();
                this.productDetailsModel.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.productDetailsView);
                            self.productDetailsView = new ProductDetailsView({ model: data });
                            self.productDetailsView.render();
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            },

            products: function (params) {
                helper.blockUIHlpr();
                var self = this;
                var encodedParams = helper.encodeSpecialChar(params);
                var requestData = helper.getProductRequest(encodedParams);
                this.productcollection = new ProductCollection(helper.productOptions(encodedParams));

                this.productcollection.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.resultsview);
                            self.resultsview = new ProductView({ model: data.models, totalcount: data.TotalEligibleProductsQuantity });
                            self.resultsview.render();
                            if (data.TotalEligibleProductsQuantity && data.TotalEligibleProductsQuantity !== "0") {
                                helper.cleanupView(self.productFilterView);
                                self.productFilterView = new ProductFiltersView({ filters: data });
                            }
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for two column---*/

                $('#leftHand-rail').addClass('navContainer');
                $('#rightBody-content').addClass('cardContainer');

                //default to top of the page
                $(window).scrollTop(0);

            },
            planCompare: function (params) {
                helper.blockUIHlpr();
                var self = this;
                var requestData = helper.getPlanDetailsRequest(params);
                this.planCompareCollection = new PlanCompareCollection();
                this.planCompareCollection.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.resultsview);
                            self.compareView = new PlanCompareView({ model: data.models });
                            self.compareView.render();
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            },
            productCompare: function (params) {
                helper.blockUIHlpr();
                var self = this;
                var requestData = helper.getProductDetailsRequest(params);
                this.productCompareCollection = new ProductCompareCollection();
                this.productCompareCollection.fetch({ type: "POST", dataType: "xml", data: requestData,
                    success: function (data) {
                        if (data != null) {
                            helper.cleanupView(self.blueSubNavView);
                            self.blueSubNavView = new BlueSubNavView();
                            helper.cleanupView(self.resultsview);
                            self.compareView = new ProductCompareView({ model: data.models });
                            self.compareView.render();
                        }
                        helper.unBlockUIHlpr();
                    },
                    error: function () {
                        console.log("service error");
                    }
                });

                /*---wireframe constructor for one column---*/
                $('#leftHand-rail').removeClass('navContainer');
                $('#rightBody-content').removeClass('cardContainer');

                /*---clear left hand rail---*/
                $('#leftHand-rail').empty();

                //default to top of the page
                $(window).scrollTop(0);
            }
        });


        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);
