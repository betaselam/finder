// Plan Compare Collection
// ------------------------
define(["jquery",
        "backbone",
        "models/ProductDetailsModel",
        "helpers/helper"],

  function ($,
            Backbone,
            ProductDetailsModel,
            helper) {

      // Creates a new Backbone Collection class object
      var ProductCompareCollecion = Backbone.Collection.extend({

          url: "handler/ServiceHandler.ashx",
          // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
          models: [],
          parse: function (data, options) {
              if (typeof data !== 'undefined') {
                  var self = this;
                  var jsonData = window.xml.xmlToJSON(data);
                  data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, "").replace(/apit:/g, ""));
                  if (data.SmallGroupProductBenefitResponse.ResponseHeader.ReturnCode.Text === "Success") {
                      if (data.SmallGroupProductBenefitResponse.ProductBenefits.ProductBenefit instanceof Array) {
                          $.each(data.SmallGroupProductBenefitResponse.ProductBenefits.ProductBenefit, function (i, plan) {
                              var model = new ProductDetailsModel();
                              helper.productDetailsMapping(model, plan);
                              self.models.push(model);
                          });
                      }
                      else {
                          var model = new ProductDetailsModel();
                          helper.productDetailsMapping(model, data.SmallGroupProductBenefitResponse.ProductBenefits.ProductBenefit);
                          self.models.push(model);
                      }
                  }
              }
          },

          // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
          validate: function (attrs) {
          }
      });

      // Returns the Model class
      return ProductCompareCollecion;

  }

);