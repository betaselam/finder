define(["jquery",
        "backbone"
     ],

    function ($,
              Backbone
              ) {

        var util = {

            patterns: {
                re2alpha: /^\A-Z{2}/,
                re5digit: /^\d{5}(-\d{4})?$/,
                reAllowedSpecialChar: /[^0-9\A-Za-z\~@&#%+:;()\'\",.\/\-_‘’`|\=\+\s]+/,
                reStatesAndTerritories: /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/,
                reStates: /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
                digits: /[0-9]/,
                email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*[.]{1}[a-zA-Z]{2,6}$/,
                phone: /^([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                alphaNumeric: /^[0-9a-zA-Z]+$/
            },


            validateZipCode: function (zipCode) {
                return this.patterns.re5digit.test(zipCode);
            },

            validateCountiesArray: function (counties) {
                if (counties != null) {
                    for (key in counties) {
                        if (counties[key] == "" || counties[key].CountyName.Text == "" || counties[key].StateCode.Text == "") return false;
                        else if (!this.validateCounties(counties[key].CountyName.Text) || !this.validateStates(counties[key].StateCode.Text))
                            return false;
                    }
                }
                return true;
            },

            validateCounties: function (county) {
                return !this.patterns.reAllowedSpecialChar.test(county);
            },

            validateStates: function (state) {
                return this.patterns.reStatesAndTerritories.test(state);
            },

            validateAlphaNumeric: function (value) {
                return this.patterns.alphaNumeric.test(value);
            },

            validateAllowedSpecialCharacters: function (value) {
                return !this.patterns.reAllowedSpecialChar.test(value);
            },

            getParameterByName: function (name, paramsList) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(paramsList);
                if (results == null)
                    return "";
                else
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        };

        return util;
    });