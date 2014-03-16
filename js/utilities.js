(function () {
    "use strict";

    //--------------------------------------------------------------------------------------------------
    // Array polyfills

    if (!Array.prototype.clear) {
        Array.prototype.clear = function () {
            this.length = 0;
        };
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i, len;
            for (i = 0, len = this.length; i < len; ++i) {
                if (i in this) {
                    fn.call(scope, this[i], i, this);
                }
            }
        };
    }

    if (!Array.prototype.remove) {
        // Array Remove - By John Resig (MIT Licensed)
        Array.prototype.remove = function (from, to) {
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };
    }

    // ------------------------------------------------------------------------------------------------
    // String polyfills

    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            }
        });
    }

    if (!String.prototype.endsWith) {
        Object.defineProperty(String.prototype, 'endsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (searchString, position) {
                position = position || this.length;
                position = position - searchString.length;
                var lastIndex = this.lastIndexOf(searchString);
                return lastIndex !== -1 && lastIndex === position;
            }
        });
    }

    if (!String.prototype.contains) {
        String.prototype.contains = function () {
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }


    // ------------------------------------------------------------------------------------------------
    // Object polyfills


    if (!Object.keys) {
        Object.keys = function (obj) {
            var arr = [];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push(prop);
                }
            }
            return arr;
        };
    }


})();
