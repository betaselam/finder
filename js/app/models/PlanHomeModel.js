// Model.js
// --------
define(["jquery", "backbone", "jqueryXML", "xml", "helpers/helper"],

    function ($, Backbone, jqueryxml, xml, helper) {

        // Creates a new Backbone Model class object
        var PlanHomeModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {
                if ($.isEmptyObject(this)) { this.parseUrl(); }
            },

            // Default values for all of the Model attributes
            defaults: {
                urlparam: "",
                zipCode: "",
                county: "",
                state: "",
                effectiveDate: "",
                primary: "",
                spouse: "",
                child0: "",
                child1: "",
                child2: "",
                child3: "",
                child4: ""
            },

            parseUrl: function () {
                var params = Backbone.history.fragment;
                this.attributes.zipCode = helper.getParameterByName("zip", params);
                this.attributes.effectiveDate = (helper.getParameterByName("effective", params)) ? helper.getParameterByName("effective", params) : helper.firstdayofnextmonth();
                this.attributes.state = helper.getParameterByName("state", params);
                this.attributes.county = helper.getParameterByName("county", params);
                var primary = helper.getParameterByName("primary", params);
                if (primary) {
                    this.set("primary", this.dateHelper(primary), { validate: true });
                }
                var spouse = helper.getParameterByName("spouse", params);
                if (spouse) {
                    this.set("spouse", this.dateHelper(spouse), { validate: true });
                }
                for (var i = 0; i <= 4; i++) {
                    var child = helper.getParameterByName("child_" + i, params);
                    if (child) {
                        this.set("child" + i, this.dateHelper(child), { validate: true });
                    }
                }
            },

            dateHelper: function (value) {
                var temp = {};
                temp.dateOfBirth = value.split('|')[0].replace(/-/g,'/');
                temp.gender = (value.split('|')[2].toUpperCase() === "M") ? "Male" : "Female";
                temp.tobaccoUser = (value.split('|')[1].toLowerCase() === "true") ? "Smoker" : "Non-Smoker";
                return temp;
            },

              // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
//                var errors = [];


//                if (errors.length) return errors;
            }

        });

        // Returns the Model class
        return PlanHomeModel;
    }

);
