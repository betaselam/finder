var tests = [];
window.gblServiceHandler = "handler/ServiceHandler.ashx";
for (var file in window.__karma__.files) {
    if (/.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app',

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

        "maskedinput": "../libs/plugins/jquery.maskedinput-1.3",

        "expandcollapse": "../libs/expandcollapse",

        "sinon": "../libs/sinon-1.7.3",

        "hcmode": "../libs/jquery.hcmode-detection"
    },

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

        "maskedinput": {
            // Depends on underscore/lodash and jQuery
            "deps": ["jquery"],

            // Exports the global window.Backbone object
            "exports": "maskedinput"
        },

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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

