console.time("array-find-polyfill");
Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(a) {
        "use strict";
        if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
        if ("function" != typeof a) throw new TypeError("predicate must be a function");
        for (var e, b = Object(this), c = b.length >>> 0, d = arguments[1], f = 0; f < c; f++)
            if (e = b[f], a.call(d, e, f, b)) return e
    }
});
console.timeEnd("array-find-polyfill");
