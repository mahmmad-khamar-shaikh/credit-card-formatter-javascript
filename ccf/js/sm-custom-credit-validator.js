window.ccf = (function () {
    'use strict';
    function GetCardType(number) {
        // visa
        var re = new RegExp("^4");
        console.log('re' + number.match(re));
        if (number.match(re) != null)
            return "Visa";

        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }
    var ccf = {
        inputFormatter: function (textRef) {
            var v = textRef.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
            var matches = v.match(/\d{4,16}/g);
            var match = matches && matches[0] || '';
            var parts = [];

            for (var i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4))
            }

            if (parts.length) {
                textRef.value = parts.join(' ');
            } else {
                textRef.value = textRef.value;
            }
        },
        carImageChooser: function (textRef, imgRef) {

            var cardType = GetCardType(textRef.value);
            console.log('card type' + cardType);
            switch (cardType) {
                case 'Visa':
                    document.getElementById(imgRef).src = './ccf/imgs/card-logo-visa.svg';
                    break;
                    case 'AMEX':
                    document.getElementById(imgRef).src = './ccf/imgs/card-logo-amex.svg';
                    break;
                    case 'Mastercard':
                    document.getElementById(imgRef).src = './ccf/imgs/card-logo-amex.svg';
                    break;
                    
                default:
                    document.getElementById(imgRef).src = './ccf/imgs/card-logo-unknown.svg';
            }

        },
        restrictChar: function (event) {
            var code = (event.which) ? event.which : event.keyCode;

            if ((code < 48 || code > 57) && (code > 31)) {
                return false;
            }

            return true;
        }

    }
    return ccf;
}()) || {};


