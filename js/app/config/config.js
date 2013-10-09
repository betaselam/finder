// Require.js Configurations
// -------------------------
require.config({

    // Sets the js folder as the base directory for all future relative paths
    baseUrl: "./js/app",

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths: {

        // Assets Libraries
        //-----------------
        //"example": "//" + gblAssetsURL + "example",

        // Core Libraries
        // --------------
        "jquery": "../libs/jquery",

        "jqueryui": "../libs/jqueryui",

        "jquerymobile": "../libs/jquery.mobile",

        "underscore": "../libs/lodash",

        "backbone": "../libs/backbone",

        "jqueryXML": "../libs/jquery.xml.min",

        "xml": "../libs/xml.min",

        "xdr": "../libs/plugins/xdr",

        "formValidatorConfig": "../libs/FormValidatorConfig",

        "formValidator": "../libs/FormValidator",

        // Plugins
        // -------
        "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

        "bootstrap": "../libs/plugins/bootstrap",

        "tooltip": "../libs/plugins/tooltip",

        "popover": "../libs/plugins/popover",

        "text": "../libs/plugins/text",

        "jasminejquery": "../libs/plugins/jasmine-jquery",

        "blockui": "../libs/plugins/JQuery.BlockUI",

        "datepicker": "../libs/plugins/datepicker",
      
        "custominput": "../libs/custominput",

        "expandcollapse": "../libs/expandcollapse",

        "maskedinput": "../libs/plugins/jquery.maskedinput-1.3",

        "sinon": "../libs/sinon-1.7.3",

        "hcmode": "../libs/jquery.hcmode-detection"

    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {

        // jQuery Mobile
        "jquerymobile": ["jquery"],

        // Twitter Bootstrap jQuery plugins
        "bootstrap": ["jquery"],

        // jQueryUI
        "jqueryui": ["jquery"],
        
        "jqueryXML": {
            "deps": ["jquery"],
            "exports": "jqueryXML" 
        },

        "tooltip": {
            "deps": ["jquery", "bootstrap"],
            "exports": "tooltip"
        },

        "popover": {
            "deps": ["jquery", "bootstrap", "tooltip"],
            "exports": "popover"
        },

        "xml": {
            "deps": ["jquery"],
            "exports": "xml"
        },

        "maskedinput": {
            "deps": ["jquery"],
            "exports": "maskedinput"
        },

        "xdr": {
            "deps": ["jquery"],
            "exports": "xdr"
        },

        "formValidatorConfig": {
            "deps": ["jquery"],
            "exports": "formValidatorConfig"
        },

        "formValidator": {
            "deps": ["jquery"],
            "exports": "formValidator"
        },

        "datepicker": {
            "deps": ["jquery"],
            "exports": "datepicker"
        },

        "blockui": {
            "deps": ["jquery", "jqueryui"],
            "exports": "blockui"
        },

        // Backbone
        "backbone": {

            // Depends on underscore/lodash and jQuery
            "deps": ["underscore", "jquery"],

            // Exports the global window.Backbone object
            "exports": "Backbone"

        },

        // Backbone.validateAll plugin that depends on Backbone
        "backbone.validateAll": ["backbone"],

        // Jasmine-jQuery plugin
        "jasminejquery": ["jquery"],

        "custominput": {
        	// Depends on underscore/lodash and jQuery
        	"deps": ["jquery"],

        	// Exports the global window.Backbone object
        	"exports": "custominput"
        },

        "expandcollapse": {
        	// Depends on underscore/lodash and jQuery
        	"deps": ["jquery"],

        	// Exports the global window.Backbone object
        	"exports": "expandcollapse"
        },

        "sinon": { 
      	    "exports": "sinon"
        },
      	
		"hcmode": {
        	"deps": ["jquery"],
        	"exports": "hcmode"
        }


    }

});


