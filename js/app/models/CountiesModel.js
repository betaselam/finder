// Model.js
// --------
define(["jquery",
        "backbone",
        "jqueryXML",
        "xml",
        "helpers/helper",
        "helpers/util"
        ],

    function ($,
            Backbone,
            jqueryxml,
            xml,
            helper,
            util           
            ) {

        // Creates a new Backbone Model class object
        var CountiesModel = Backbone.Model.extend({

            // Model url
            //url: gblServiceHandler,
            url: gblCountyServiceHandler,

            // Default values for all of the Model attributes
            defaults: {
                zipCode: null,
                success: null,
                counties: null
            },

            // Model Constructor
            initialize: function () {
                
            },

            parse: function (data, options) {
                if (typeof data !== 'undefined') {
                    var jsonData = window.xml.xmlToJSON(data);
                    data = JSON.parse(JSON.stringify(jsonData).replace(/ns2:/g, ""));
                    if (data.ZipCodeValidationResponse.ResponseHeader.ReturnCode.Text === "Success") {
                        var self = this;
                        var tempZipCode = "";
                        var tempCounties = [];
                        var tempStates = [];

                        if (data.ZipCodeValidationResponse.Counties.County instanceof Array) {
                            $.each(data.ZipCodeValidationResponse.Counties.County, function (i, county) {
                                tempCounties.push(county);
                            });
                        }
                        else {
                            tempCounties.push(data.ZipCodeValidationResponse.Counties.County);
                        }

                        tempZipCode = data.ZipCodeValidationResponse.ZipCodeValidationRequest.ZipCode.Text;
                        this.set({ "counties" : tempCounties, "zipCode" : tempZipCode }, { validate: true });
                    }
                    else {
                        this.attributes.success = data.ZipCodeValidationResponse.ResponseHeader.ErrorMessage;
                    }
                }
            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {
                var errors = [];

                if (attrs.zipCode != null && !util.validateZipCode(attrs.zipCode))
                    errors.push('Zip Code is required');

                if (attrs.counties != null && !util.validateCountiesArray(attrs.counties)) 
                    errors.push('County is reqired');

                if (errors.length) return errors;
            }

        });

        // Returns the Model class
        return CountiesModel;

    }

);
