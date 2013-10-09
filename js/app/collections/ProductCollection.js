// Collection.js
// -------------
define(["jquery", "backbone", "models/ProductModel", "helpers/helper"],

  function ($, Backbone, ProductModel, helper) {

      // Creates a new Backbone Collection class object
      var ProductCollection = Backbone.Collection.extend({

          url: "handler/ServiceHandler.ashx",

          TotalEligibleProductsQuantity: 0,
          doctorChoice: "",
          additionalFeatures: "",
          showCompanies: "",
          compareId: "",


          // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
          models: [],

          initialize: function (options) {
            if (options)
              this.compareId = options.compareId.toUpperCase();
          },

          parse: function (data, options) {
              if (typeof data !== 'undefined') {
                  var self = this;
                  var jsonData = window.xml.xmlToJSON(data);
                  data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, "").replace(/apit:/g, ""));

                  if (data.SmallGroupProductQuoteResponse.ResponseHeader.ReturnCode.Text === "Success") {
                      if (parseFloat(helper.getValuefromObj(data.SmallGroupProductQuoteResponse, "TotalEligibleProductsQuanity", "")) > 0) {
                          this.TotalEligibleProductsQuantity = data.SmallGroupProductQuoteResponse.TotalEligibleProductsQuanity.Text;
                          this.showCompanies = helper.getFilters("IssuerIDs", (data.SmallGroupProductQuoteResponse.FilterAnalysis.IssuerIDs) ? data.SmallGroupProductQuoteResponse.FilterAnalysis.IssuerIDs : "");
                          this.additionalFeatures = helper.getFilters("AdditionalFeatures", (data.SmallGroupProductQuoteResponse.FilterAnalysis) ? data.SmallGroupProductQuoteResponse.FilterAnalysis : "");
                          this.doctorChoice = helper.getFilters("ProviderTypes", (data.SmallGroupProductQuoteResponse.FilterAnalysis.ProviderTypes) ? data.SmallGroupProductQuoteResponse.FilterAnalysis.ProviderTypes : "");
                          var self = this;
                          if (data.SmallGroupProductQuoteResponse.Products.Product instanceof Array) {
                              $.each(data.SmallGroupProductQuoteResponse.Products.Product, function (i, product) {
                                  self.models.push(self.mapper(product));
                              });
                          }
                          else { self.models.push(self.mapper(data.SmallGroupProductQuoteResponse.Products.Product)); }
                      }
                  }
              }
          },

          mapper: function (product) {
              var temp = new ProductModel();
              temp.productID = product.ProductID.Text;
              temp.productNameText = product.ProductNameText.Text;
              temp.issuerNameText = product.IssuerNameText.Text;
              temp.averageCostPerEnrollee = product.AverageCostPerEnrollee.Text; // Average Cost Per Enrollee
              temp.issuerID = product.IssuerID.Text;
              temp.providerType = product.ProviderType.Text; // Doctor's Choice
              temp.hSAEligibleIndicator = (product.HSAEligibleIndicator.Text == "true") ? "Yes" : "No"; // Health Savings Account (HSA) Eligible?
              temp.pCPCopayAmount = helper.getValuefromObj(product.InNetworkCostSharing.PCPCopayAmount, "Amount", "Not applicable.");
              temp.coinsuranceRate = helper.getMinMax(product.InNetworkCostSharing.CoinsuranceRate);
              temp.annualDeductibleAmount = helper.getAmounts(product.InNetworkCostSharing.AnnualDeductibleAmount);
              temp.annualOOPLimitAmount = helper.getAmounts(product.InNetworkCostSharing.AnnualOOPLimitAmount);
              temp.isCompare = this.compareId.indexOf(product.ProductID.Text) > -1 ? "true" : "false";
              return temp;
          },

          // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
          validate: function (attrs) {
          }
      });

      // Returns the Model class
      return ProductCollection;
  }

);
