// Plan Compare Collection
// ------------------------
define(["jquery",
        "backbone",
        "models/PlanDetailsModel", 
        "helpers/helper"],

  function ($,
            Backbone,
            PlanDetailsModel, 
            helper) {

      // Creates a new Backbone Collection class object
      var PlanCompareCollecion = Backbone.Collection.extend({

          //url: gblServiceHandler,
          url: gblPlansServiceHandler,
          // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
          models: [],
          parse: function (data, options) {
              if (typeof data !== 'undefined') {
                  var self = this;
                  var jsonData = window.xml.xmlToJSON(data);
                  data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, "").replace(/apit:/g, ""));
                  if (data.IndividualPlanBenefitResponse.ResponseHeader.ReturnCode.Text === "Success") {
                      if (data.IndividualPlanBenefitResponse.PlanBenefits.PlanBenefit instanceof Array) {
                          $.each(data.IndividualPlanBenefitResponse.PlanBenefits.PlanBenefit, function (i, plan) {
                              var model = new PlanDetailsModel();
                              helper.planDetailsMapping(model, plan);
                              self.models.push(model);
                          });
                      }
                      else {
                          var model = new PlanDetailsModel();
                          helper.planDetailsMapping(model, data.IndividualPlanBenefitResponse.PlanBenefits.PlanBenefit);
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
      return PlanCompareCollecion;

  }

);
