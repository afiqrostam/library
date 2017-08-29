console.time('highcharts');
! function(t, e) {
    "object" == typeof module && module.exports ? module.exports = t.document ? e(t) : e : t.Highcharts = e(t)
}("undefined" != typeof window ? window : this, function(t) {
    return t = function() {
            var t = window,
                e = t.document,
                i = t.navigator && t.navigator.userAgent || "",
                s = e && e.createElementNS && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                n = /(edge|msie|trident)/i.test(i) && !window.opera,
                o = !s,
                r = /Firefox/.test(i),
                a = r && 4 > parseInt(i.split("Firefox/")[1], 10);
            return t.Highcharts ? t.Highcharts.error(16, !0) : {
                product: "Highcharts",
                version: "5.0.6",
                deg2rad: 2 * Math.PI / 360,
                doc: e,
                hasBidiBug: a,
                hasTouch: e && void 0 !== e.documentElement.ontouchstart,
                isMS: n,
                isWebKit: /AppleWebKit/.test(i),
                isFirefox: r,
                isTouchDevice: /(Mobile|Android|Windows Phone)/.test(i),
                SVG_NS: "http://www.w3.org/2000/svg",
                chartCount: 0,
                seriesTypes: {},
                symbolSizes: {},
                svg: s,
                vml: o,
                win: t,
                charts: [],
                marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
                noop: function() {}
            }
        }(),
        function(t) {
            var e = [],
                i = t.charts,
                s = t.doc,
                n = t.win;
            t.error = function(e, i) {
                if (e = t.isNumber(e) ? "Highcharts error #" + e + ": www.highcharts.com/errors/" + e : e, i) throw Error(e);
                n.console && console.log(e)
            }, t.Fx = function(t, e, i) {
                this.options = e, this.elem = t, this.prop = i
            }, t.Fx.prototype = {
                dSetter: function() {
                    var t, e = this.paths[0],
                        i = this.paths[1],
                        s = [],
                        n = this.now,
                        o = e.length;
                    if (1 === n) s = this.toD;
                    else if (o === i.length && 1 > n)
                        for (; o--;) t = parseFloat(e[o]), s[o] = isNaN(t) ? e[o] : n * parseFloat(i[o] - t) + t;
                    else s = i;
                    this.elem.attr("d", s, null, !0)
                },
                update: function() {
                    var t = this.elem,
                        e = this.prop,
                        i = this.now,
                        s = this.options.step;
                    this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit, s && s.call(t, i, this)
                },
                run: function(t, i, s) {
                    var n, o = this,
                        r = function(t) {
                            return r.stopped ? !1 : o.step(t)
                        };
                    this.startTime = +new Date, this.start = t, this.end = i, this.unit = s, this.now = this.start, this.pos = 0, r.elem = this.elem, r.prop = this.prop, r() && 1 === e.push(r) && (r.timerId = setInterval(function() {
                        for (n = 0; n < e.length; n++) e[n]() || e.splice(n--, 1);
                        e.length || clearInterval(r.timerId)
                    }, 13))
                },
                step: function(t) {
                    var e, i = +new Date,
                        s = this.options;
                    e = this.elem;
                    var n, o = s.complete,
                        r = s.duration,
                        a = s.curAnim;
                    if (e.attr && !e.element) e = !1;
                    else if (t || i >= r + this.startTime) {
                        this.now = this.end, this.pos = 1, this.update(), t = a[this.prop] = !0;
                        for (n in a) !0 !== a[n] && (t = !1);
                        t && o && o.call(e), e = !1
                    } else this.pos = s.easing((i - this.startTime) / r), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e = !0;
                    return e
                },
                initPath: function(e, i, s) {
                    function n(t) {
                        var e, i;
                        for (c = t.length; c--;) e = "M" === t[c] || "L" === t[c], i = /[a-zA-Z]/.test(t[c + 3]), e && i && t.splice(c + 1, 0, t[c + 1], t[c + 2], t[c + 1], t[c + 2])
                    }

                    function o(t, e) {
                        for (; t.length < h;) {
                            t[0] = e[h - t.length];
                            var i = t.slice(0, f);
                            [].splice.apply(t, [0, 0].concat(i)), m && (i = t.slice(t.length - f), [].splice.apply(t, [t.length, 0].concat(i)), c--)
                        }
                        t[0] = "M"
                    }

                    function r(t, e) {
                        for (var i = (h - t.length) / f; i > 0 && i--;) l = t.slice().splice(t.length / v - f, f * v), l[0] = e[h - f - i * f], u && (l[f - 6] = l[f - 2], l[f - 5] = l[f - 1]), [].splice.apply(t, [t.length / v, 0].concat(l)), m && i--
                    }
                    i = i || "";
                    var a, h, l, c, d = e.startX,
                        p = e.endX,
                        u = -1 < i.indexOf("C"),
                        f = u ? 7 : 3;
                    i = i.split(" "), s = s.slice();
                    var g, m = e.isArea,
                        v = m ? 2 : 1;
                    if (u && (n(i), n(s)), d && p) {
                        for (c = 0; c < d.length; c++) {
                            if (d[c] === p[0]) {
                                a = c;
                                break
                            }
                            if (d[0] === p[p.length - d.length + c]) {
                                a = c, g = !0;
                                break
                            }
                        }
                        void 0 === a && (i = [])
                    }
                    return i.length && t.isNumber(a) && (h = s.length + a * v * f, g ? (o(i, s), r(s, i)) : (o(s, i), r(i, s))), [i, s]
                }
            }, t.extend = function(t, e) {
                var i;
                t || (t = {});
                for (i in e) t[i] = e[i];
                return t
            }, t.merge = function() {
                var e, i, s = arguments,
                    n = {},
                    o = function(e, i) {
                        var s, n;
                        "object" != typeof e && (e = {});
                        for (n in i) i.hasOwnProperty(n) && (s = i[n], t.isObject(s, !0) && "renderTo" !== n && "number" != typeof s.nodeType ? e[n] = o(e[n] || {}, s) : e[n] = i[n]);
                        return e
                    };
                for (!0 === s[0] && (n = s[1], s = Array.prototype.slice.call(s, 2)), i = s.length, e = 0; i > e; e++) n = o(n, s[e]);
                return n
            }, t.pInt = function(t, e) {
                return parseInt(t, e || 10)
            }, t.isString = function(t) {
                return "string" == typeof t
            }, t.isArray = function(t) {
                return t = Object.prototype.toString.call(t), "[object Array]" === t || "[object Array Iterator]" === t
            }, t.isObject = function(e, i) {
                return e && "object" == typeof e && (!i || !t.isArray(e))
            }, t.isNumber = function(t) {
                return "number" == typeof t && !isNaN(t)
            }, t.erase = function(t, e) {
                for (var i = t.length; i--;)
                    if (t[i] === e) {
                        t.splice(i, 1);
                        break
                    }
            }, t.defined = function(t) {
                return void 0 !== t && null !== t
            }, t.attr = function(e, i, s) {
                var n, o;
                if (t.isString(i)) t.defined(s) ? e.setAttribute(i, s) : e && e.getAttribute && (o = e.getAttribute(i));
                else if (t.defined(i) && t.isObject(i))
                    for (n in i) e.setAttribute(n, i[n]);
                return o
            }, t.splat = function(e) {
                return t.isArray(e) ? e : [e]
            }, t.syncTimeout = function(t, e, i) {
                return e ? setTimeout(t, e, i) : void t.call(0, i)
            }, t.pick = function() {
                var t, e, i = arguments,
                    s = i.length;
                for (t = 0; s > t; t++)
                    if (e = i[t], void 0 !== e && null !== e) return e
            }, t.css = function(e, i) {
                t.isMS && !t.svg && i && void 0 !== i.opacity && (i.filter = "alpha(opacity=" + 100 * i.opacity + ")"), t.extend(e.style, i)
            }, t.createElement = function(e, i, n, o, r) {
                e = s.createElement(e);
                var a = t.css;
                return i && t.extend(e, i), r && a(e, {
                    padding: 0,
                    border: "none",
                    margin: 0
                }), n && a(e, n), o && o.appendChild(e), e
            }, t.extendClass = function(e, i) {
                var s = function() {};
                return s.prototype = new e, t.extend(s.prototype, i), s
            }, t.pad = function(t, e, i) {
                return Array((e || 2) + 1 - String(t).length).join(i || 0) + t
            }, t.relativeLength = function(t, e) {
                return /%$/.test(t) ? e * parseFloat(t) / 100 : parseFloat(t)
            }, t.wrap = function(t, e, i) {
                var s = t[e];
                t[e] = function() {
                    var t = Array.prototype.slice.call(arguments),
                        e = arguments,
                        n = this;
                    return n.proceed = function() {
                        s.apply(n, arguments.length ? arguments : e)
                    }, t.unshift(s), t = i.apply(this, t), n.proceed = null, t
                }
            }, t.getTZOffset = function(e) {
                var i = t.Date;
                return 6e4 * (i.hcGetTimezoneOffset && i.hcGetTimezoneOffset(e) || i.hcTimezoneOffset || 0)
            }, t.dateFormat = function(e, i, s) {
                if (!t.defined(i) || isNaN(i)) return t.defaultOptions.lang.invalidDate || "";
                e = t.pick(e, "%Y-%m-%d %H:%M:%S");
                var n, o = t.Date,
                    r = new o(i - t.getTZOffset(i)),
                    a = r[o.hcGetHours](),
                    h = r[o.hcGetDay](),
                    l = r[o.hcGetDate](),
                    c = r[o.hcGetMonth](),
                    d = r[o.hcGetFullYear](),
                    p = t.defaultOptions.lang,
                    u = p.weekdays,
                    f = p.shortWeekdays,
                    g = t.pad,
                    o = t.extend({
                        a: f ? f[h] : u[h].substr(0, 3),
                        A: u[h],
                        d: g(l),
                        e: g(l, 2, " "),
                        w: h,
                        b: p.shortMonths[c],
                        B: p.months[c],
                        m: g(c + 1),
                        y: d.toString().substr(2, 2),
                        Y: d,
                        H: g(a),
                        k: a,
                        I: g(a % 12 || 12),
                        l: a % 12 || 12,
                        M: g(r[o.hcGetMinutes]()),
                        p: 12 > a ? "AM" : "PM",
                        P: 12 > a ? "am" : "pm",
                        S: g(r.getSeconds()),
                        L: g(Math.round(i % 1e3), 3)
                    }, t.dateFormats);
                for (n in o)
                    for (; - 1 !== e.indexOf("%" + n);) e = e.replace("%" + n, "function" == typeof o[n] ? o[n](i) : o[n]);
                return s ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }, t.formatSingle = function(e, i) {
                var s = /\.([0-9])/,
                    n = t.defaultOptions.lang;
                return /f$/.test(e) ? (s = (s = e.match(s)) ? s[1] : -1, null !== i && (i = t.numberFormat(i, s, n.decimalPoint, -1 < e.indexOf(",") ? n.thousandsSep : ""))) : i = t.dateFormat(e, i), i
            }, t.format = function(e, i) {
                for (var s, n, o, r, a, h = "{", l = !1, c = []; e && (h = e.indexOf(h), -1 !== h);) {
                    if (s = e.slice(0, h), l) {
                        for (s = s.split(":"), n = s.shift().split("."), r = n.length, a = i, o = 0; r > o; o++) a = a[n[o]];
                        s.length && (a = t.formatSingle(s.join(":"), a)), c.push(a)
                    } else c.push(s);
                    e = e.slice(h + 1), h = (l = !l) ? "}" : "{"
                }
                return c.push(e), c.join("")
            }, t.getMagnitude = function(t) {
                return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
            }, t.normalizeTickInterval = function(e, i, s, n, o) {
                var r, a = e;
                for (s = t.pick(s, 1), r = e / s, i || (i = o ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === n && (1 === s ? i = t.grep(i, function(t) {
                        return 0 === t % 1
                    }) : .1 >= s && (i = [1 / s]))), n = 0; n < i.length && (a = i[n], !(o && a * s >= e || !o && r <= (i[n] + (i[n + 1] || i[n])) / 2)); n++);
                return a * s
            }, t.stableSort = function(t, e) {
                var i, s, n = t.length;
                for (s = 0; n > s; s++) t[s].safeI = s;
                for (t.sort(function(t, s) {
                        return i = e(t, s), 0 === i ? t.safeI - s.safeI : i
                    }), s = 0; n > s; s++) delete t[s].safeI
            }, t.arrayMin = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
                return i
            }, t.arrayMax = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
                return i
            }, t.destroyObjectProperties = function(t, e) {
                for (var i in t) t[i] && t[i] !== e && t[i].destroy && t[i].destroy(), delete t[i]
            }, t.discardElement = function(e) {
                var i = t.garbageBin;
                i || (i = t.createElement("div")), e && i.appendChild(e), i.innerHTML = ""
            }, t.correctFloat = function(t, e) {
                return parseFloat(t.toPrecision(e || 14))
            }, t.setAnimation = function(e, i) {
                i.renderer.globalAnimation = t.pick(e, i.options.chart.animation, !0)
            }, t.animObject = function(e) {
                return t.isObject(e) ? t.merge(e) : {
                    duration: e ? 500 : 0
                }
            }, t.timeUnits = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5
            }, t.numberFormat = function(e, i, s, n) {
                e = +e || 0, i = +i;
                var o, r, a = t.defaultOptions.lang,
                    h = (e.toString().split(".")[1] || "").length,
                    l = Math.abs(e);
                return -1 === i ? i = Math.min(h, 20) : t.isNumber(i) || (i = 2), o = String(t.pInt(l.toFixed(i))), r = 3 < o.length ? o.length % 3 : 0, s = t.pick(s, a.decimalPoint), n = t.pick(n, a.thousandsSep), e = (0 > e ? "-" : "") + (r ? o.substr(0, r) + n : ""), e += o.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + n), i && (n = Math.abs(l - o + Math.pow(10, -Math.max(i, h) - 1)), e += s + n.toFixed(i).slice(2)), e
            }, Math.easeInOutSine = function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            }, t.getStyle = function(e, i) {
                return "width" === i ? Math.min(e.offsetWidth, e.scrollWidth) - t.getStyle(e, "padding-left") - t.getStyle(e, "padding-right") : "height" === i ? Math.min(e.offsetHeight, e.scrollHeight) - t.getStyle(e, "padding-top") - t.getStyle(e, "padding-bottom") : (e = n.getComputedStyle(e, void 0)) && t.pInt(e.getPropertyValue(i))
            }, t.inArray = function(t, e) {
                return e.indexOf ? e.indexOf(t) : [].indexOf.call(e, t)
            }, t.grep = function(t, e) {
                return [].filter.call(t, e)
            }, t.find = function(t, e) {
                return [].find.call(t, e)
            }, t.map = function(t, e) {
                for (var i = [], s = 0, n = t.length; n > s; s++) i[s] = e.call(t[s], t[s], s, t);
                return i
            }, t.offset = function(t) {
                var e = s.documentElement;
                return t = t.getBoundingClientRect(), {
                    top: t.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: t.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }
            }, t.stop = function(t, i) {
                for (var s = e.length; s--;) e[s].elem !== t || i && i !== e[s].prop || (e[s].stopped = !0)
            }, t.each = function(t, e, i) {
                return Array.prototype.forEach.call(t, e, i)
            }, t.addEvent = function(e, i, s) {
                function o(t) {
                    t.target = t.srcElement || n, s.call(e, t)
                }
                var r = e.hcEvents = e.hcEvents || {};
                return e.addEventListener ? e.addEventListener(i, s, !1) : e.attachEvent && (e.hcEventsIE || (e.hcEventsIE = {}), e.hcEventsIE[s.toString()] = o, e.attachEvent("on" + i, o)), r[i] || (r[i] = []), r[i].push(s),
                    function() {
                        t.removeEvent(e, i, s)
                    }
            }, t.removeEvent = function(e, i, s) {
                function n(t, i) {
                    e.removeEventListener ? e.removeEventListener(t, i, !1) : e.attachEvent && (i = e.hcEventsIE[i.toString()], e.detachEvent("on" + t, i))
                }

                function o() {
                    var t, s;
                    if (e.nodeName)
                        for (s in i ? (t = {}, t[i] = !0) : t = h, t)
                            if (h[s])
                                for (t = h[s].length; t--;) n(s, h[s][t])
                }
                var r, a, h = e.hcEvents;
                h && (i ? (r = h[i] || [], s ? (a = t.inArray(s, r), a > -1 && (r.splice(a, 1), h[i] = r), n(i, s)) : (o(), h[i] = [])) : (o(), e.hcEvents = {}))
            }, t.fireEvent = function(e, i, n, o) {
                var r;
                r = e.hcEvents;
                var a, h;
                if (n = n || {}, s.createEvent && (e.dispatchEvent || e.fireEvent)) r = s.createEvent("Events"), r.initEvent(i, !0, !0), t.extend(r, n), e.dispatchEvent ? e.dispatchEvent(r) : e.fireEvent(i, r);
                else if (r)
                    for (r = r[i] || [], a = r.length, n.target || t.extend(n, {
                            preventDefault: function() {
                                n.defaultPrevented = !0
                            },
                            target: e,
                            type: i
                        }), i = 0; a > i; i++)(h = r[i]) && !1 === h.call(e, n) && n.preventDefault();
                o && !n.defaultPrevented && o(n)
            }, t.animate = function(e, i, s) {
                var n, o, r, a, h = "";
                t.isObject(s) || (n = arguments, s = {
                    duration: n[2],
                    easing: n[3],
                    complete: n[4]
                }), t.isNumber(s.duration) || (s.duration = 400), s.easing = "function" == typeof s.easing ? s.easing : Math[s.easing] || Math.easeInOutSine, s.curAnim = t.merge(i);
                for (a in i) t.stop(e, a), r = new t.Fx(e, s, a), o = null, "d" === a ? (r.paths = r.initPath(e, e.d, i.d), r.toD = i.d, n = 0, o = 1) : e.attr ? n = e.attr(a) : (n = parseFloat(t.getStyle(e, a)) || 0, "opacity" !== a && (h = "px")), o || (o = i[a]), o.match && o.match("px") && (o = o.replace(/px/g, "")), r.run(n, o, h)
            }, t.seriesType = function(e, i, s, n, o) {
                var r = t.getOptions(),
                    a = t.seriesTypes;
                return r.plotOptions[e] = t.merge(r.plotOptions[i], s), a[e] = t.extendClass(a[i] || function() {}, n), a[e].prototype.type = e, o && (a[e].prototype.pointClass = t.extendClass(t.Point, o)), a[e]
            }, t.uniqueKey = function() {
                var t = Math.random().toString(36).substring(2, 9),
                    e = 0;
                return function() {
                    return "highcharts-" + t + "-" + e++
                }
            }(), n.jQuery && (n.jQuery.fn.highcharts = function() {
                var e = [].slice.call(arguments);
                return this[0] ? e[0] ? (new(t[t.isString(e[0]) ? e.shift() : "Chart"])(this[0], e[0], e[1]), this) : i[t.attr(this[0], "data-highcharts-chart")] : void 0
            }), s && !s.defaultView && (t.getStyle = function(e, i) {
                var s = {
                    width: "clientWidth",
                    height: "clientHeight"
                }[i];
                return e.style[i] ? t.pInt(e.style[i]) : ("opacity" === i && (i = "filter"), s ? (e.style.zoom = 1, Math.max(e[s] - 2 * t.getStyle(e, "padding"), 0)) : (e = e.currentStyle[i.replace(/\-(\w)/g, function(t, e) {
                    return e.toUpperCase()
                })], "filter" === i && (e = e.replace(/alpha\(opacity=([0-9]+)\)/, function(t, e) {
                    return e / 100
                })), "" === e ? 1 : t.pInt(e)))
            }), Array.prototype.forEach || (t.each = function(t, e, i) {
                for (var s = 0, n = t.length; n > s; s++)
                    if (!1 === e.call(i, t[s], s, t)) return s
            }), Array.prototype.indexOf || (t.inArray = function(t, e) {
                var i, s = 0;
                if (e)
                    for (i = e.length; i > s; s++)
                        if (e[s] === t) return s;
                return -1
            }), Array.prototype.filter || (t.grep = function(t, e) {
                for (var i = [], s = 0, n = t.length; n > s; s++) e(t[s], s) && i.push(t[s]);
                return i
            }), Array.prototype.find || (t.find = function(t, e) {
                var i, s = t.length;
                for (i = 0; s > i; i++)
                    if (e(t[i], i)) return t[i]
            })
        }(t),
        function(t) {
            var e = t.each,
                i = t.isNumber,
                s = t.map,
                n = t.merge,
                o = t.pInt;
            t.Color = function(e) {
                return this instanceof t.Color ? void this.init(e) : new t.Color(e)
            }, t.Color.prototype = {
                parsers: [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function(t) {
                        return [o(t[1]), o(t[2]), o(t[3]), parseFloat(t[4], 10)]
                    }
                }, {
                    regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                    parse: function(t) {
                        return [o(t[1], 16), o(t[2], 16), o(t[3], 16), 1]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function(t) {
                        return [o(t[1]), o(t[2]), o(t[3]), 1]
                    }
                }],
                names: {
                    white: "#ffffff",
                    black: "#000000"
                },
                init: function(e) {
                    var i, n, o, r;
                    if ((this.input = e = this.names[e] || e) && e.stops) this.stops = s(e.stops, function(e) {
                        return new t.Color(e[1])
                    });
                    else
                        for (o = this.parsers.length; o-- && !n;) r = this.parsers[o], (i = r.regex.exec(e)) && (n = r.parse(i));
                    this.rgba = n || []
                },
                get: function(t) {
                    var s, o = this.input,
                        r = this.rgba;
                    return this.stops ? (s = n(o), s.stops = [].concat(s.stops), e(this.stops, function(e, i) {
                        s.stops[i] = [s.stops[i][0], e.get(t)]
                    })) : s = r && i(r[0]) ? "rgb" === t || !t && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === t ? r[3] : "rgba(" + r.join(",") + ")" : o, s
                },
                brighten: function(t) {
                    var s, n = this.rgba;
                    if (this.stops) e(this.stops, function(e) {
                        e.brighten(t)
                    });
                    else if (i(t) && 0 !== t)
                        for (s = 0; 3 > s; s++) n[s] += o(255 * t), 0 > n[s] && (n[s] = 0), 255 < n[s] && (n[s] = 255);
                    return this
                },
                setOpacity: function(t) {
                    return this.rgba[3] = t, this
                }
            }, t.color = function(e) {
                return new t.Color(e)
            }
        }(t),
        function(t) {
            var e, i, s = t.addEvent,
                n = t.animate,
                o = t.attr,
                r = t.charts,
                a = t.color,
                h = t.css,
                l = t.createElement,
                c = t.defined,
                d = t.deg2rad,
                p = t.destroyObjectProperties,
                u = t.doc,
                f = t.each,
                g = t.extend,
                m = t.erase,
                v = t.grep,
                x = t.hasTouch,
                y = t.isArray,
                b = t.isFirefox,
                k = t.isMS,
                M = t.isObject,
                w = t.isString,
                S = t.isWebKit,
                T = t.merge,
                A = t.noop,
                C = t.pick,
                P = t.pInt,
                L = t.removeEvent,
                O = t.stop,
                I = t.svg,
                z = t.SVG_NS,
                D = t.symbolSizes,
                E = t.win;
            e = t.SVGElement = function() {
                return this
            }, e.prototype = {
                opacity: 1,
                SVG_NS: z,
                textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
                init: function(t, e) {
                    this.element = "span" === e ? l(e) : u.createElementNS(this.SVG_NS, e), this.renderer = t
                },
                animate: function(e, i, s) {
                    return i = t.animObject(C(i, this.renderer.globalAnimation, !0)), 0 !== i.duration ? (s && (i.complete = s), n(this, e, i)) : this.attr(e, null, s), this
                },
                colorGradient: function(e, i, s) {
                    var n, o, r, a, h, l, d, p, u, g, m, v, x = this.renderer,
                        b = [];
                    if (e.linearGradient ? o = "linearGradient" : e.radialGradient && (o = "radialGradient"), o) {
                        r = e[o], h = x.gradients, d = e.stops, g = s.radialReference, y(r) && (e[o] = r = {
                            x1: r[0],
                            y1: r[1],
                            x2: r[2],
                            y2: r[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === o && g && !c(r.gradientUnits) && (a = r, r = T(r, x.getRadialAttr(g, a), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        for (m in r) "id" !== m && b.push(m, r[m]);
                        for (m in d) b.push(d[m]);
                        b = b.join(","), h[b] ? g = h[b].attr("id") : (r.id = g = t.uniqueKey(), h[b] = l = x.createElement(o).attr(r).add(x.defs), l.radAttr = a, l.stops = [], f(d, function(e) {
                            0 === e[1].indexOf("rgba") ? (n = t.color(e[1]), p = n.get("rgb"), u = n.get("a")) : (p = e[1], u = 1), e = x.createElement("stop").attr({
                                offset: e[0],
                                "stop-color": p,
                                "stop-opacity": u
                            }).add(l), l.stops.push(e)
                        })), v = "url(" + x.url + "#" + g + ")", s.setAttribute(i, v), s.gradient = b, e.toString = function() {
                            return v
                        }
                    }
                },
                applyTextOutline: function(t) {
                    var e, i, s, n, r = this.element; - 1 !== t.indexOf("contrast") && (t = t.replace(/contrast/g, this.renderer.getContrast(r.style.fill))), this.fakeTS = !0, this.ySetter = this.xSetter, e = [].slice.call(r.getElementsByTagName("tspan")), t = t.split(" "), i = t[t.length - 1], (s = t[0]) && "none" !== s && (s = s.replace(/(^[\d\.]+)(.*?)$/g, function(t, e, i) {
                        return 2 * e + i
                    }), f(e, function(t) {
                        "highcharts-text-outline" === t.getAttribute("class") && m(e, r.removeChild(t))
                    }), n = r.firstChild, f(e, function(t, e) {
                        0 === e && (t.setAttribute("x", r.getAttribute("x")), e = r.getAttribute("y"), t.setAttribute("y", e || 0), null === e && r.setAttribute("y", 0)), t = t.cloneNode(1), o(t, {
                            "class": "highcharts-text-outline",
                            fill: i,
                            stroke: i,
                            "stroke-width": s,
                            "stroke-linejoin": "round"
                        }), r.insertBefore(t, n)
                    }))
                },
                attr: function(t, e, i, s) {
                    var n, o, r, a = this.element,
                        h = this;
                    if ("string" == typeof t && void 0 !== e && (n = t, t = {}, t[n] = e), "string" == typeof t) h = (this[t + "Getter"] || this._defaultGetter).call(this, t, a);
                    else {
                        for (n in t) e = t[n], r = !1, s || O(this, n), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(n) && (o || (this.symbolAttr(t), o = !0), r = !0), !this.rotation || "x" !== n && "y" !== n || (this.doTransform = !0), r || (r = this[n + "Setter"] || this._defaultSetter, r.call(this, e, n, a), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(n) && this.updateShadows(n, e, r));
                        this.doTransform && (this.updateTransform(), this.doTransform = !1)
                    }
                    return i && i(), h
                },
                updateShadows: function(t, e, i) {
                    for (var s = this.shadows, n = s.length; n--;) i.call(s[n], "height" === t ? Math.max(e - (s[n].cutHeight || 0), 0) : "d" === t ? this.d : e, t, s[n])
                },
                addClass: function(t, e) {
                    var i = this.attr("class") || "";
                    return -1 === i.indexOf(t) && (e || (t = (i + (i ? " " : "") + t).replace("  ", " ")), this.attr("class", t)), this
                },
                hasClass: function(t) {
                    return -1 !== o(this.element, "class").indexOf(t)
                },
                removeClass: function(t) {
                    return o(this.element, "class", (o(this.element, "class") || "").replace(t, "")), this
                },
                symbolAttr: function(t) {
                    var e = this;
                    f("x y r start end width height innerR anchorX anchorY".split(" "), function(i) {
                        e[i] = C(t[i], e[i])
                    }), e.attr({
                        d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                    })
                },
                clip: function(t) {
                    return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
                },
                crisp: function(t, e) {
                    var i, s, n = {};
                    e = e || t.strokeWidth || 0, s = Math.round(e) % 2 / 2, t.x = Math.floor(t.x || this.x || 0) + s, t.y = Math.floor(t.y || this.y || 0) + s, t.width = Math.floor((t.width || this.width || 0) - 2 * s), t.height = Math.floor((t.height || this.height || 0) - 2 * s), c(t.strokeWidth) && (t.strokeWidth = e);
                    for (i in t) this[i] !== t[i] && (this[i] = n[i] = t[i]);
                    return n
                },
                css: function(t) {
                    var e, i, s = this.styles,
                        n = {},
                        r = this.element,
                        a = "";
                    if (e = !s, t && t.color && (t.fill = t.color), s)
                        for (i in t) t[i] !== s[i] && (n[i] = t[i], e = !0);
                    if (e) {
                        if (e = this.textWidth = t && t.width && "text" === r.nodeName.toLowerCase() && P(t.width) || this.textWidth, s && (t = g(s, n)), this.styles = t, e && !I && this.renderer.forExport && delete t.width, k && !I) h(this.element, t);
                        else {
                            s = function(t, e) {
                                return "-" + e.toLowerCase()
                            };
                            for (i in t) a += i.replace(/([A-Z])/g, s) + ":" + t[i] + ";";
                            o(r, "style", a)
                        }
                        this.added && (e && this.renderer.buildText(this), t && t.textOutline && this.applyTextOutline(t.textOutline))
                    }
                    return this
                },
                strokeWidth: function() {
                    return this["stroke-width"] || 0
                },
                on: function(t, e) {
                    var i = this,
                        s = i.element;
                    return x && "click" === t ? (s.ontouchstart = function(t) {
                        i.touchEventFired = Date.now(), t.preventDefault(), e.call(s, t)
                    }, s.onclick = function(t) {
                        (-1 === E.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (i.touchEventFired || 0)) && e.call(s, t)
                    }) : s["on" + t] = e, this
                },
                setRadialReference: function(t) {
                    var e = this.renderer.gradients[this.element.gradient];
                    return this.element.radialReference = t, e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this
                },
                translate: function(t, e) {
                    return this.attr({
                        translateX: t,
                        translateY: e
                    })
                },
                invert: function(t) {
                    return this.inverted = t, this.updateTransform(), this
                },
                updateTransform: function() {
                    var t = this.translateX || 0,
                        e = this.translateY || 0,
                        i = this.scaleX,
                        s = this.scaleY,
                        n = this.inverted,
                        o = this.rotation,
                        r = this.element;
                    n && (t += this.attr("width"), e += this.attr("height")), t = ["translate(" + t + "," + e + ")"], n ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"), (c(i) || c(s)) && t.push("scale(" + C(i, 1) + " " + C(s, 1) + ")"), t.length && r.setAttribute("transform", t.join(" "))
                },
                toFront: function() {
                    var t = this.element;
                    return t.parentNode.appendChild(t), this
                },
                align: function(t, e, i) {
                    var s, n, o, r, a = {};
                    n = this.renderer, o = n.alignedObjects;
                    var h, l;
                    return t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || w(i)) && (this.alignTo = s = i || "renderer", m(o, this), o.push(this), i = null)) : (t = this.alignOptions, e = this.alignByTranslate, s = this.alignTo), i = C(i, n[s], n), s = t.align, n = t.verticalAlign, o = (i.x || 0) + (t.x || 0), r = (i.y || 0) + (t.y || 0), "right" === s ? h = 1 : "center" === s && (h = 2), h && (o += (i.width - (t.width || 0)) / h), a[e ? "translateX" : "x"] = Math.round(o), "bottom" === n ? l = 1 : "middle" === n && (l = 2), l && (r += (i.height - (t.height || 0)) / l), a[e ? "translateY" : "y"] = Math.round(r), this[this.placed ? "animate" : "attr"](a), this.placed = !0, this.alignAttr = a, this
                },
                getBBox: function(t, e) {
                    var i, s, n, o, r, a = this.renderer,
                        h = this.element,
                        l = this.styles,
                        c = this.textStr,
                        p = a.cache,
                        u = a.cacheKeys;
                    if (e = C(e, this.rotation), s = e * d, n = l && l.fontSize, void 0 !== c && (r = c.toString(), -1 === r.indexOf("<") && (r = r.replace(/[0-9]/g, "0")), r += ["", e || 0, n, h.style.width, h.style["text-overflow"]].join()), r && !t && (i = p[r]), !i) {
                        if (h.namespaceURI === this.SVG_NS || a.forExport) {
                            try {
                                (o = this.fakeTS && function(t) {
                                    f(h.querySelectorAll(".highcharts-text-outline"), function(e) {
                                        e.style.display = t
                                    })
                                }) && o("none"), i = h.getBBox ? g({}, h.getBBox()) : {
                                    width: h.offsetWidth,
                                    height: h.offsetHeight
                                }, o && o("")
                            } catch (m) {}(!i || 0 > i.width) && (i = {
                                width: 0,
                                height: 0
                            })
                        } else i = this.htmlGetBBox();
                        if (a.isSVG && (t = i.width, a = i.height, k && l && "11px" === l.fontSize && "16.9" === a.toPrecision(3) && (i.height = a = 14), e && (i.width = Math.abs(a * Math.sin(s)) + Math.abs(t * Math.cos(s)), i.height = Math.abs(a * Math.cos(s)) + Math.abs(t * Math.sin(s)))), r && 0 < i.height) {
                            for (; 250 < u.length;) delete p[u.shift()];
                            p[r] || u.push(r), p[r] = i
                        }
                    }
                    return i
                },
                show: function(t) {
                    return this.attr({
                        visibility: t ? "inherit" : "visible"
                    })
                },
                hide: function() {
                    return this.attr({
                        visibility: "hidden"
                    })
                },
                fadeOut: function(t) {
                    var e = this;
                    e.animate({
                        opacity: 0
                    }, {
                        duration: t || 150,
                        complete: function() {
                            e.attr({
                                y: -9999
                            })
                        }
                    })
                },
                add: function(t) {
                    var e, i = this.renderer,
                        s = this.element;
                    return t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && i.buildText(this), this.added = !0, (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(s), this.onAdd && this.onAdd(), this
                },
                safeRemoveChild: function(t) {
                    var e = t.parentNode;
                    e && e.removeChild(t)
                },
                destroy: function() {
                    var t, e, i = this.element || {},
                        s = this.renderer.isSVG && "SPAN" === i.nodeName && this.parentGroup;
                    if (i.onclick = i.onmouseout = i.onmouseover = i.onmousemove = i.point = null, O(this), this.clipPath && (this.clipPath = this.clipPath.destroy()), this.stops) {
                        for (e = 0; e < this.stops.length; e++) this.stops[e] = this.stops[e].destroy();
                        this.stops = null
                    }
                    for (this.safeRemoveChild(i), this.destroyShadows(); s && s.div && 0 === s.div.childNodes.length;) i = s.parentGroup, this.safeRemoveChild(s.div), delete s.div, s = i;
                    this.alignTo && m(this.renderer.alignedObjects, this);
                    for (t in this) delete this[t];
                    return null
                },
                shadow: function(t, e, i) {
                    var s, n, r, a, h, l, c = [],
                        d = this.element;
                    if (t) {
                        if (!this.shadows) {
                            for (a = C(t.width, 3), h = (t.opacity || .15) / a, l = this.parentInverted ? "(-1,-1)" : "(" + C(t.offsetX, 1) + ", " + C(t.offsetY, 1) + ")", s = 1; a >= s; s++) n = d.cloneNode(0), r = 2 * a + 1 - 2 * s, o(n, {
                                isShadow: "true",
                                stroke: t.color || "#000000",
                                "stroke-opacity": h * s,
                                "stroke-width": r,
                                transform: "translate" + l,
                                fill: "none"
                            }), i && (o(n, "height", Math.max(o(n, "height") - r, 0)), n.cutHeight = r), e ? e.element.appendChild(n) : d.parentNode.insertBefore(n, d), c.push(n);
                            this.shadows = c
                        }
                    } else this.destroyShadows();
                    return this
                },
                destroyShadows: function() {
                    f(this.shadows || [], function(t) {
                        this.safeRemoveChild(t)
                    }, this), this.shadows = void 0
                },
                xGetter: function(t) {
                    return "circle" === this.element.nodeName && ("x" === t ? t = "cx" : "y" === t && (t = "cy")), this._defaultGetter(t)
                },
                _defaultGetter: function(t) {
                    return t = C(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
                },
                dSetter: function(t, e, i) {
                    t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), i.setAttribute(e, t), this[e] = t
                },
                dashstyleSetter: function(t) {
                    var e, i = this["stroke-width"];
                    if ("inherit" === i && (i = 1), t = t && t.toLowerCase()) {
                        for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), e = t.length; e--;) t[e] = P(t[e]) * i;
                        t = t.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t)
                    }
                },
                alignSetter: function(t) {
                    this.element.setAttribute("text-anchor", {
                        left: "start",
                        center: "middle",
                        right: "end"
                    }[t])
                },
                opacitySetter: function(t, e, i) {
                    this[e] = t, i.setAttribute(e, t)
                },
                titleSetter: function(t) {
                    var e = this.element.getElementsByTagName("title")[0];
                    e || (e = u.createElementNS(this.SVG_NS, "title"), this.element.appendChild(e)), e.firstChild && e.removeChild(e.firstChild), e.appendChild(u.createTextNode(String(C(t), "").replace(/<[^>]*>/g, "")))
                },
                textSetter: function(t) {
                    t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
                },
                fillSetter: function(t, e, i) {
                    "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
                },
                visibilitySetter: function(t, e, i) {
                    "inherit" === t ? i.removeAttribute(e) : i.setAttribute(e, t)
                },
                zIndexSetter: function(t, e) {
                    var i, s, n = this.renderer,
                        o = this.parentGroup,
                        r = (o || n).element || n.box,
                        a = this.element;
                    i = this.added;
                    var h;
                    if (c(t) && (a.zIndex = t, t = +t, this[e] === t && (i = !1), this[e] = t), i) {
                        for ((t = this.zIndex) && o && (o.handleZ = !0), e = r.childNodes, h = 0; h < e.length && !s; h++) o = e[h], i = o.zIndex, o !== a && (P(i) > t || !c(t) && c(i) || 0 > t && !c(i) && r !== n.box) && (r.insertBefore(a, o), s = !0);
                        s || r.appendChild(a)
                    }
                    return s
                },
                _defaultSetter: function(t, e, i) {
                    i.setAttribute(e, t)
                }
            }, e.prototype.yGetter = e.prototype.xGetter, e.prototype.translateXSetter = e.prototype.translateYSetter = e.prototype.rotationSetter = e.prototype.verticalAlignSetter = e.prototype.scaleXSetter = e.prototype.scaleYSetter = function(t, e) {
                this[e] = t, this.doTransform = !0
            }, e.prototype["stroke-widthSetter"] = e.prototype.strokeSetter = function(t, i, s) {
                this[i] = t, this.stroke && this["stroke-width"] ? (e.prototype.fillSetter.call(this, this.stroke, "stroke", s), s.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === i && 0 === t && this.hasStroke && (s.removeAttribute("stroke"), this.hasStroke = !1)
            }, i = t.SVGRenderer = function() {
                this.init.apply(this, arguments)
            }, i.prototype = {
                Element: e,
                SVG_NS: z,
                init: function(t, e, i, n, r, a) {
                    var l;
                    n = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    }).css(this.getStyle(n)), l = n.element, t.appendChild(l), -1 === t.innerHTML.indexOf("xmlns") && o(l, "xmlns", this.SVG_NS), this.isSVG = !0, this.box = l, this.boxWrapper = n, this.alignedObjects = [], this.url = (b || S) && u.getElementsByTagName("base").length ? E.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(u.createTextNode("Created with Highcharts 5.0.6")), this.defs = this.createElement("defs").add(), this.allowHTML = a, this.forExport = r, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.setSize(e, i, !1);
                    var c;
                    b && t.getBoundingClientRect && (e = function() {
                        h(t, {
                            left: 0,
                            top: 0
                        }), c = t.getBoundingClientRect(), h(t, {
                            left: Math.ceil(c.left) - c.left + "px",
                            top: Math.ceil(c.top) - c.top + "px"
                        })
                    }, e(), this.unSubPixelFix = s(E, "resize", e))
                },
                getStyle: function(t) {
                    return this.style = g({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    }, t)
                },
                setStyle: function(t) {
                    this.boxWrapper.css(this.getStyle(t))
                },
                isHidden: function() {
                    return !this.boxWrapper.getBBox().width
                },
                destroy: function() {
                    var t = this.defs;
                    return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), p(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null
                },
                createElement: function(t) {
                    var e = new this.Element;
                    return e.init(this, t), e
                },
                draw: A,
                getRadialAttr: function(t, e) {
                    return {
                        cx: t[0] - t[2] / 2 + e.cx * t[2],
                        cy: t[1] - t[2] / 2 + e.cy * t[2],
                        r: e.r * t[2]
                    }
                },
                buildText: function(t) {
                    for (var e, i, s, n, r = t.element, a = this, l = a.forExport, c = C(t.textStr, "").toString(), d = -1 !== c.indexOf("<"), p = r.childNodes, g = o(r, "x"), m = t.styles, x = t.textWidth, y = m && m.lineHeight, b = m && m.textOutline, k = m && "ellipsis" === m.textOverflow, M = p.length, w = x && !t.added && this.box, S = function(t) {
                            var e;
                            return e = /(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : m && m.fontSize || a.style.fontSize || 12, y ? P(y) : a.fontMetrics(e, t.getAttribute("style") ? t : r).h
                        }; M--;) r.removeChild(p[M]);
                    d || b || k || x || -1 !== c.indexOf(" ") ? (e = /<.*class="([^"]+)".*>/, i = /<.*style="([^"]+)".*>/, s = /<.*href="(http[^"]+)".*>/, w && w.appendChild(r), c = d ? c.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [c], c = v(c, function(t) {
                        return "" !== t
                    }), f(c, function(c, d) {
                        var p, v = 0;
                        c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"), p = c.split("|||"), f(p, function(c) {
                            if ("" !== c || 1 === p.length) {
                                var f, y, b = {},
                                    M = u.createElementNS(a.SVG_NS, "tspan");
                                if (e.test(c) && (f = c.match(e)[1], o(M, "class", f)), i.test(c) && (y = c.match(i)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), o(M, "style", y)), s.test(c) && !l && (o(M, "onclick", 'location.href="' + c.match(s)[1] + '"'), h(M, {
                                        cursor: "pointer"
                                    })), c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), " " !== c) {
                                    if (M.appendChild(u.createTextNode(c)), v ? b.dx = 0 : d && null !== g && (b.x = g), o(M, b), r.appendChild(M), !v && d && (!I && l && h(M, {
                                            display: "block"
                                        }), o(M, "dy", S(M))), x) {
                                        b = c.replace(/([^\^])-/g, "$1- ").split(" "), f = "nowrap" === m.whiteSpace;
                                        for (var w, T, A = 1 < p.length || d || 1 < b.length && !f, C = [], P = S(M), L = t.rotation, O = c, D = O.length;
                                            (A || k) && (b.length || C.length);) t.rotation = 0, w = t.getBBox(!0), T = w.width, !I && a.forExport && (T = a.measureSpanWidth(M.firstChild.data, t.styles)), w = T > x, void 0 === n && (n = w), k && n ? (D /= 2, "" === O || !w && .5 > D ? b = [] : (O = c.substring(0, O.length + (w ? -1 : 1) * Math.ceil(D)), b = [O + (x > 3 ? "…" : "")], M.removeChild(M.firstChild))) : w && 1 !== b.length ? (M.removeChild(M.firstChild), C.unshift(b.pop())) : (b = C, C = [], b.length && !f && (M = u.createElementNS(z, "tspan"), o(M, {
                                            dy: P,
                                            x: g
                                        }), y && o(M, "style", y), r.appendChild(M)), T > x && (x = T)), b.length && M.appendChild(u.createTextNode(b.join(" ").replace(/- /g, "-")));
                                        t.rotation = L
                                    }
                                    v++
                                }
                            }
                        })
                    }), n && t.attr("title", t.textStr), w && w.removeChild(r), b && t.applyTextOutline && t.applyTextOutline(b)) : r.appendChild(u.createTextNode(c.replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
                },
                getContrast: function(t) {
                    return t = a(t).rgba, 510 < t[0] + t[1] + t[2] ? "#000000" : "#FFFFFF"
                },
                button: function(t, e, i, n, o, r, a, h, l) {
                    var c = this.label(t, e, i, l, null, null, null, null, "button"),
                        d = 0;
                    c.attr(T({
                        padding: 8,
                        r: 2
                    }, o));
                    var p, u, f, m;
                    return o = T({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, o), p = o.style, delete o.style, r = T(o, {
                        fill: "#e6e6e6"
                    }, r), u = r.style, delete r.style, a = T(o, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, a), f = a.style, delete a.style, h = T(o, {
                        style: {
                            color: "#cccccc"
                        }
                    }, h), m = h.style, delete h.style, s(c.element, k ? "mouseover" : "mouseenter", function() {
                        3 !== d && c.setState(1)
                    }), s(c.element, k ? "mouseout" : "mouseleave", function() {
                        3 !== d && c.setState(d)
                    }), c.setState = function(t) {
                        1 !== t && (c.state = d = t), c.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t || 0]), c.attr([o, r, a, h][t || 0]).css([p, u, f, m][t || 0])
                    }, c.attr(o).css(g({
                        cursor: "default"
                    }, p)), c.on("click", function(t) {
                        3 !== d && n.call(c, t)
                    })
                },
                crispLine: function(t, e) {
                    return t[1] === t[4] && (t[1] = t[4] = Math.round(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = Math.round(t[2]) + e % 2 / 2), t
                },
                path: function(t) {
                    var e = {
                        fill: "none"
                    };
                    return y(t) ? e.d = t : M(t) && g(e, t), this.createElement("path").attr(e)
                },
                circle: function(t, e, i) {
                    return t = M(t) ? t : {
                        x: t,
                        y: e,
                        r: i
                    }, e = this.createElement("circle"), e.xSetter = e.ySetter = function(t, e, i) {
                        i.setAttribute("c" + e, t)
                    }, e.attr(t)
                },
                arc: function(t, e, i, s, n, o) {
                    return M(t) && (e = t.y, i = t.r, s = t.innerR, n = t.start, o = t.end, t = t.x), t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                        innerR: s || 0,
                        start: n || 0,
                        end: o || 0
                    }), t.r = i, t
                },
                rect: function(t, e, i, s, n, r) {
                    n = M(t) ? t.r : n;
                    var a = this.createElement("rect");
                    return t = M(t) ? t : void 0 === t ? {} : {
                        x: t,
                        y: e,
                        width: Math.max(i, 0),
                        height: Math.max(s, 0)
                    }, void 0 !== r && (t.strokeWidth = r, t = a.crisp(t)), t.fill = "none", n && (t.r = n), a.rSetter = function(t, e, i) {
                        o(i, {
                            rx: t,
                            ry: t
                        })
                    }, a.attr(t)
                },
                setSize: function(t, e, i) {
                    var s = this.alignedObjects,
                        n = s.length;
                    for (this.width = t, this.height = e, this.boxWrapper.animate({
                            width: t,
                            height: e
                        }, {
                            step: function() {
                                this.attr({
                                    viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                                })
                            },
                            duration: C(i, !0) ? void 0 : 0
                        }); n--;) s[n].align()
                },
                g: function(t) {
                    var e = this.createElement("g");
                    return t ? e.attr({
                        "class": "highcharts-" + t
                    }) : e
                },
                image: function(t, e, i, s, n) {
                    var o = {
                        preserveAspectRatio: "none"
                    };
                    return 1 < arguments.length && g(o, {
                        x: e,
                        y: i,
                        width: s,
                        height: n
                    }), o = this.createElement("image").attr(o), o.element.setAttributeNS ? o.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", t) : o.element.setAttribute("hc-svg-href", t), o
                },
                symbol: function(t, e, i, s, n, o) {
                    var a, d, p, m = this,
                        v = this.symbols[t],
                        x = c(e) && v && v(Math.round(e), Math.round(i), s, n, o),
                        y = /^url\((.*?)\)$/;
                    return v ? (a = this.path(x), a.attr("fill", "none"), g(a, {
                        symbolName: t,
                        x: e,
                        y: i,
                        width: s,
                        height: n
                    }), o && g(a, o)) : y.test(t) && (d = t.match(y)[1], a = this.image(d), a.imgwidth = C(D[d] && D[d].width, o && o.width), a.imgheight = C(D[d] && D[d].height, o && o.height), p = function() {
                        a.attr({
                            width: a.width,
                            height: a.height
                        })
                    }, f(["width", "height"], function(t) {
                        a[t + "Setter"] = function(t, e) {
                            var i = {},
                                s = this["img" + e],
                                n = "width" === e ? "translateX" : "translateY";
                            this[e] = t, c(s) && (this.element && this.element.setAttribute(e, s), this.alignByTranslate || (i[n] = ((this[e] || 0) - s) / 2, this.attr(i)))
                        }
                    }), c(e) && a.attr({
                        x: e,
                        y: i
                    }), a.isImg = !0, c(a.imgwidth) && c(a.imgheight) ? p() : (a.attr({
                        width: 0,
                        height: 0
                    }), l("img", {
                        onload: function() {
                            var t = r[m.chartIndex];
                            0 === this.width && (h(this, {
                                position: "absolute",
                                top: "-999em"
                            }), u.body.appendChild(this)), D[d] = {
                                width: this.width,
                                height: this.height
                            }, a.imgwidth = this.width, a.imgheight = this.height, a.element && p(), this.parentNode && this.parentNode.removeChild(this), m.imgCount--, !m.imgCount && t && t.onload && t.onload()
                        },
                        src: d
                    }), this.imgCount++)), a
                },
                symbols: {
                    circle: function(t, e, i, s) {
                        var n = .166 * i;
                        return ["M", t + i / 2, e, "C", t + i + n, e, t + i + n, e + s, t + i / 2, e + s, "C", t - n, e + s, t - n, e, t + i / 2, e, "Z"]
                    },
                    square: function(t, e, i, s) {
                        return ["M", t, e, "L", t + i, e, t + i, e + s, t, e + s, "Z"]
                    },
                    triangle: function(t, e, i, s) {
                        return ["M", t + i / 2, e, "L", t + i, e + s, t, e + s, "Z"]
                    },
                    "triangle-down": function(t, e, i, s) {
                        return ["M", t, e, "L", t + i, e, t + i / 2, e + s, "Z"]
                    },
                    diamond: function(t, e, i, s) {
                        return ["M", t + i / 2, e, "L", t + i, e + s / 2, t + i / 2, e + s, t, e + s / 2, "Z"]
                    },
                    arc: function(t, e, i, s, n) {
                        var o = n.start;
                        i = n.r || i || s;
                        var r = n.end - .001;
                        s = n.innerR;
                        var a = n.open,
                            h = Math.cos(o),
                            l = Math.sin(o),
                            c = Math.cos(r),
                            r = Math.sin(r);
                        return n = n.end - o < Math.PI ? 0 : 1, ["M", t + i * h, e + i * l, "A", i, i, 0, n, 1, t + i * c, e + i * r, a ? "M" : "L", t + s * c, e + s * r, "A", s, s, 0, n, 0, t + s * h, e + s * l, a ? "" : "Z"]
                    },
                    callout: function(t, e, i, s, n) {
                        var o = Math.min(n && n.r || 0, i, s),
                            r = o + 6,
                            a = n && n.anchorX;
                        n = n && n.anchorY;
                        var h;
                        return h = ["M", t + o, e, "L", t + i - o, e, "C", t + i, e, t + i, e, t + i, e + o, "L", t + i, e + s - o, "C", t + i, e + s, t + i, e + s, t + i - o, e + s, "L", t + o, e + s, "C", t, e + s, t, e + s, t, e + s - o, "L", t, e + o, "C", t, e, t, e, t + o, e], a && a > i ? n > e + r && e + s - r > n ? h.splice(13, 3, "L", t + i, n - 6, t + i + 6, n, t + i, n + 6, t + i, e + s - o) : h.splice(13, 3, "L", t + i, s / 2, a, n, t + i, s / 2, t + i, e + s - o) : a && 0 > a ? n > e + r && e + s - r > n ? h.splice(33, 3, "L", t, n + 6, t - 6, n, t, n - 6, t, e + o) : h.splice(33, 3, "L", t, s / 2, a, n, t, s / 2, t, e + o) : n && n > s && a > t + r && t + i - r > a ? h.splice(23, 3, "L", a + 6, e + s, a, e + s + 6, a - 6, e + s, t + o, e + s) : n && 0 > n && a > t + r && t + i - r > a && h.splice(3, 3, "L", a - 6, e, a, e - 6, a + 6, e, i - o, e), h
                    }
                },
                clipRect: function(e, i, s, n) {
                    var o = t.uniqueKey(),
                        r = this.createElement("clipPath").attr({
                            id: o
                        }).add(this.defs);
                    return e = this.rect(e, i, s, n, 0).add(r), e.id = o, e.clipPath = r, e.count = 0, e
                },
                text: function(t, e, i, s) {
                    var n = !I && this.forExport,
                        o = {};
                    return !s || !this.allowHTML && this.forExport ? (o.x = Math.round(e || 0), i && (o.y = Math.round(i)), (t || 0 === t) && (o.text = t), t = this.createElement("text").attr(o), n && t.css({
                        position: "absolute"
                    }), s || (t.xSetter = function(t, e, i) {
                        var s, n, o = i.getElementsByTagName("tspan"),
                            r = i.getAttribute(e);
                        for (n = 0; n < o.length; n++) s = o[n], s.getAttribute(e) === r && s.setAttribute(e, t);
                        i.setAttribute(e, t)
                    }), t) : this.html(t, e, i)
                },
                fontMetrics: function(t, e) {
                    return t = t || e && e.style && e.style.fontSize || this.style && this.style.fontSize, t = /px/.test(t) ? P(t) : /em/.test(t) ? parseFloat(t) * (e ? this.fontMetrics(null, e.parentNode).f : 16) : 12, e = 24 > t ? t + 3 : Math.round(1.2 * t), {
                        h: e,
                        b: Math.round(.8 * e),
                        f: t
                    }
                },
                rotCorr: function(t, e, i) {
                    var s = t;
                    return e && i && (s = Math.max(s * Math.cos(e * d), 4)), {
                        x: -t / 3 * Math.sin(e * d),
                        y: s
                    }
                },
                label: function(t, i, s, n, o, r, a, h, l) {
                    var d, p, u, m, v, x, y, b, k, M, w, S, A, C = this,
                        P = C.g("button" !== l && "label"),
                        O = P.text = C.text("", 0, 0, a).attr({
                            zIndex: 1
                        }),
                        I = 0,
                        z = 3,
                        D = 0,
                        E = {},
                        R = /^url\((.*?)\)$/.test(n),
                        B = R;
                    l && P.addClass("highcharts-" + l), B = R, M = function() {
                        return (b || 0) % 2 / 2
                    }, w = function() {
                        var t = O.element.style,
                            e = {};
                        p = (void 0 === u || void 0 === m || y) && c(O.textStr) && O.getBBox(), P.width = (u || p.width || 0) + 2 * z + D, P.height = (m || p.height || 0) + 2 * z, k = z + C.fontMetrics(t && t.fontSize, O).b, B && (d || (P.box = d = C.symbols[n] || R ? C.symbol(n) : C.rect(), d.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), d.add(P), t = M(), e.x = t, e.y = (h ? -k : 0) + t), e.width = Math.round(P.width), e.height = Math.round(P.height), d.attr(g(e, E)), E = {})
                    }, S = function() {
                        var t, e = D + z;
                        t = h ? 0 : k, c(u) && p && ("center" === y || "right" === y) && (e += {
                            center: .5,
                            right: 1
                        }[y] * (u - p.width)), (e !== O.x || t !== O.y) && (O.attr("x", e), void 0 !== t && O.attr("y", t)), O.x = e, O.y = t
                    }, A = function(t, e) {
                        d ? d.attr(t, e) : E[t] = e
                    }, P.onAdd = function() {
                        O.add(P), P.attr({
                            text: t || 0 === t ? t : "",
                            x: i,
                            y: s
                        }), d && c(o) && P.attr({
                            anchorX: o,
                            anchorY: r
                        })
                    }, P.widthSetter = function(t) {
                        u = t
                    }, P.heightSetter = function(t) {
                        m = t
                    }, P["text-alignSetter"] = function(t) {
                        y = t
                    }, P.paddingSetter = function(t) {
                        c(t) && t !== z && (z = P.padding = t, S())
                    }, P.paddingLeftSetter = function(t) {
                        c(t) && t !== D && (D = t, S())
                    }, P.alignSetter = function(t) {
                        t = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[t], t !== I && (I = t, p && P.attr({
                            x: v
                        }))
                    }, P.textSetter = function(t) {
                        void 0 !== t && O.textSetter(t), w(), S()
                    }, P["stroke-widthSetter"] = function(t, e) {
                        t && (B = !0), b = this["stroke-width"] = t, A(e, t)
                    }, P.strokeSetter = P.fillSetter = P.rSetter = function(t, e) {
                        "fill" === e && t && (B = !0), A(e, t)
                    }, P.anchorXSetter = function(t, e) {
                        o = t, A(e, Math.round(t) - M() - v)
                    }, P.anchorYSetter = function(t, e) {
                        r = t, A(e, t - x)
                    }, P.xSetter = function(t) {
                        P.x = t, I && (t -= I * ((u || p.width) + 2 * z)), v = Math.round(t), P.attr("translateX", v)
                    }, P.ySetter = function(t) {
                        x = P.y = Math.round(t), P.attr("translateY", x)
                    };
                    var G = P.css;
                    return g(P, {
                        css: function(t) {
                            if (t) {
                                var e = {};
                                t = T(t), f(P.textProps, function(i) {
                                    void 0 !== t[i] && (e[i] = t[i], delete t[i])
                                }), O.css(e)
                            }
                            return G.call(P, t)
                        },
                        getBBox: function() {
                            return {
                                width: p.width + 2 * z,
                                height: p.height + 2 * z,
                                x: p.x - z,
                                y: p.y - z
                            }
                        },
                        shadow: function(t) {
                            return t && (w(), d && d.shadow(t)), P
                        },
                        destroy: function() {
                            L(P.element, "mouseenter"), L(P.element, "mouseleave"), O && (O = O.destroy()), d && (d = d.destroy()), e.prototype.destroy.call(P), P = C = w = S = A = null
                        }
                    })
                }
            }, t.Renderer = i
        }(t),
        function(t) {
            var e = t.attr,
                i = t.createElement,
                s = t.css,
                n = t.defined,
                o = t.each,
                r = t.extend,
                a = t.isFirefox,
                h = t.isMS,
                l = t.isWebKit,
                c = t.pInt,
                d = t.SVGRenderer,
                p = t.win,
                u = t.wrap;
            r(t.SVGElement.prototype, {
                htmlCss: function(t) {
                    var e = this.element;
                    return (e = t && "SPAN" === e.tagName && t.width) && (delete t.width, this.textWidth = e, this.updateTransform()), t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap", t.overflow = "hidden"), this.styles = r(this.styles, t), s(this.element, t), this
                },
                htmlGetBBox: function() {
                    var t = this.element;
                    return "text" === t.nodeName && (t.style.position = "absolute"), {
                        x: t.offsetLeft,
                        y: t.offsetTop,
                        width: t.offsetWidth,
                        height: t.offsetHeight
                    }
                },
                htmlUpdateTransform: function() {
                    if (this.added) {
                        var t = this.renderer,
                            e = this.element,
                            i = this.translateX || 0,
                            r = this.translateY || 0,
                            a = this.x || 0,
                            h = this.y || 0,
                            d = this.textAlign || "left",
                            p = {
                                left: 0,
                                center: .5,
                                right: 1
                            }[d],
                            u = this.styles;
                        if (s(e, {
                                marginLeft: i,
                                marginTop: r
                            }), this.shadows && o(this.shadows, function(t) {
                                s(t, {
                                    marginLeft: i + 1,
                                    marginTop: r + 1
                                })
                            }), this.inverted && o(e.childNodes, function(i) {
                                t.invertChild(i, e)
                            }), "SPAN" === e.tagName) {
                            var f = this.rotation,
                                g = c(this.textWidth),
                                m = u && u.whiteSpace,
                                v = [f, d, e.innerHTML, this.textWidth, this.textAlign].join();
                            v !== this.cTT && (u = t.fontMetrics(e.style.fontSize).b, n(f) && this.setSpanRotation(f, p, u), s(e, {
                                width: "",
                                whiteSpace: m || "nowrap"
                            }), e.offsetWidth > g && /[ \-]/.test(e.textContent || e.innerText) && s(e, {
                                width: g + "px",
                                display: "block",
                                whiteSpace: m || "normal"
                            }), this.getSpanCorrection(e.offsetWidth, u, p, f, d)), s(e, {
                                left: a + (this.xCorr || 0) + "px",
                                top: h + (this.yCorr || 0) + "px"
                            }), l && (u = e.offsetHeight), this.cTT = v
                        }
                    } else this.alignOnAdd = !0
                },
                setSpanRotation: function(t, e, i) {
                    var n = {},
                        o = h ? "-ms-transform" : l ? "-webkit-transform" : a ? "MozTransform" : p.opera ? "-o-transform" : "";
                    n[o] = n.transform = "rotate(" + t + "deg)", n[o + (a ? "Origin" : "-origin")] = n.transformOrigin = 100 * e + "% " + i + "px", s(this.element, n)
                },
                getSpanCorrection: function(t, e, i) {
                    this.xCorr = -t * i, this.yCorr = -e
                }
            }), r(d.prototype, {
                html: function(t, s, n) {
                    var a = this.createElement("span"),
                        h = a.element,
                        l = a.renderer,
                        c = l.isSVG,
                        d = function(t, e) {
                            o(["opacity", "visibility"], function(i) {
                                u(t, i + "Setter", function(t, i, s, n) {
                                    t.call(this, i, s, n), e[s] = i
                                })
                            })
                        };
                    return a.textSetter = function(t) {
                        t !== h.innerHTML && delete this.bBox, h.innerHTML = this.textStr = t, a.htmlUpdateTransform()
                    }, c && d(a, a.element.style), a.xSetter = a.ySetter = a.alignSetter = a.rotationSetter = function(t, e) {
                        "align" === e && (e = "textAlign"), a[e] = t, a.htmlUpdateTransform()
                    }, a.attr({
                        text: t,
                        x: Math.round(s),
                        y: Math.round(n)
                    }).css({
                        fontFamily: this.style.fontFamily,
                        fontSize: this.style.fontSize,
                        position: "absolute"
                    }), h.style.whiteSpace = "nowrap", a.css = a.htmlCss, c && (a.add = function(t) {
                        var s, n = l.box.parentNode,
                            c = [];
                        if (this.parentGroup = t) {
                            if (s = t.div, !s) {
                                for (; t;) c.push(t), t = t.parentGroup;
                                o(c.reverse(), function(t) {
                                    var o, h = e(t.element, "class");
                                    h && (h = {
                                        className: h
                                    }), s = t.div = t.div || i("div", h, {
                                        position: "absolute",
                                        left: (t.translateX || 0) + "px",
                                        top: (t.translateY || 0) + "px",
                                        display: t.display,
                                        opacity: t.opacity,
                                        pointerEvents: t.styles && t.styles.pointerEvents
                                    }, s || n), o = s.style, r(t, {
                                        on: function() {
                                            return a.on.apply({
                                                element: c[0].div
                                            }, arguments), t
                                        },
                                        translateXSetter: function(e, i) {
                                            o.left = e + "px", t[i] = e, t.doTransform = !0
                                        },
                                        translateYSetter: function(e, i) {
                                            o.top = e + "px", t[i] = e, t.doTransform = !0
                                        }
                                    }), d(t, o)
                                })
                            }
                        } else s = n;
                        return s.appendChild(h), a.added = !0, a.alignOnAdd && a.htmlUpdateTransform(), a
                    }), a
                }
            })
        }(t),
        function(t) {
            var e, i, s = t.createElement,
                n = t.css,
                o = t.defined,
                r = t.deg2rad,
                a = t.discardElement,
                h = t.doc,
                l = t.each,
                c = t.erase,
                d = t.extend;
            e = t.extendClass;
            var p = t.isArray,
                u = t.isNumber,
                f = t.isObject,
                g = t.merge;
            i = t.noop;
            var m = t.pick,
                v = t.pInt,
                x = t.SVGElement,
                y = t.SVGRenderer,
                b = t.win;
            t.svg || (i = {
                docMode8: h && 8 === h.documentMode,
                init: function(t, e) {
                    var i = ["<", e, ' filled="f" stroked="f"'],
                        n = ["position: ", "absolute", ";"],
                        o = "div" === e;
                    ("shape" === e || o) && n.push("left:0;top:0;width:1px;height:1px;"), n.push("visibility: ", o ? "hidden" : "visible"), i.push(' style="', n.join(""), '"/>'), e && (i = o || "span" === e || "img" === e ? i.join("") : t.prepVML(i), this.element = s(i)), this.renderer = t
                },
                add: function(t) {
                    var e = this.renderer,
                        i = this.element,
                        s = e.box,
                        n = t && t.inverted,
                        s = t ? t.element || t : s;
                    return t && (this.parentGroup = t), n && e.invertChild(i, s), s.appendChild(i), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this.className && this.attr("class", this.className), this
                },
                updateTransform: x.prototype.htmlUpdateTransform,
                setSpanRotation: function() {
                    var t = this.rotation,
                        e = Math.cos(t * r),
                        i = Math.sin(t * r);
                    n(this.element, {
                        filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : "none"
                    })
                },
                getSpanCorrection: function(t, e, i, s, o) {
                    var a, h = s ? Math.cos(s * r) : 1,
                        l = s ? Math.sin(s * r) : 0,
                        c = m(this.elemHeight, this.element.offsetHeight);
                    this.xCorr = 0 > h && -t, this.yCorr = 0 > l && -c, a = 0 > h * l, this.xCorr += l * e * (a ? 1 - i : i), this.yCorr -= h * e * (s ? a ? i : 1 - i : 1), o && "left" !== o && (this.xCorr -= t * i * (0 > h ? -1 : 1), s && (this.yCorr -= c * i * (0 > l ? -1 : 1)), n(this.element, {
                        textAlign: o
                    }))
                },
                pathToVML: function(t) {
                    for (var e = t.length, i = []; e--;) u(t[e]) ? i[e] = Math.round(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e], !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1), i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
                    return i.join(" ") || "x"
                },
                clip: function(t) {
                    var e, i = this;
                    return t ? (e = t.members, c(e, i), e.push(i), i.destroyClip = function() {
                        c(e, i)
                    }, t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(), t = {
                        clip: i.docMode8 ? "inherit" : "rect(auto)"
                    }), i.css(t)
                },
                css: x.prototype.htmlCss,
                safeRemoveChild: function(t) {
                    t.parentNode && a(t)
                },
                destroy: function() {
                    return this.destroyClip && this.destroyClip(), x.prototype.destroy.apply(this)
                },
                on: function(t, e) {
                    return this.element["on" + t] = function() {
                        var t = b.event;
                        t.target = t.srcElement, e(t)
                    }, this
                },
                cutOffPath: function(t, e) {
                    var i;
                    return t = t.split(/[ ,]/), i = t.length, (9 === i || 11 === i) && (t[i - 4] = t[i - 2] = v(t[i - 2]) - 10 * e), t.join(" ")
                },
                shadow: function(t, e, i) {
                    var n, o, r, a, h, l, c, d = [],
                        p = this.element,
                        u = this.renderer,
                        f = p.style,
                        g = p.path;
                    if (g && "string" != typeof g.value && (g = "x"), h = g, t) {
                        for (l = m(t.width, 3), c = (t.opacity || .15) / l, n = 1; 3 >= n; n++) a = 2 * l + 1 - 2 * n, i && (h = this.cutOffPath(g.value, a + .5)), r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', h, '" coordsize="10 10" style="', p.style.cssText, '" />'], o = s(u.prepVML(r), null, {
                            left: v(f.left) + m(t.offsetX, 1),
                            top: v(f.top) + m(t.offsetY, 1)
                        }), i && (o.cutOff = a + 1), r = ['<stroke color="', t.color || "#000000", '" opacity="', c * n, '"/>'], s(u.prepVML(r), null, null, o), e ? e.element.appendChild(o) : p.parentNode.insertBefore(o, p), d.push(o);
                        this.shadows = d
                    }
                    return this
                },
                updateShadows: i,
                setAttr: function(t, e) {
                    this.docMode8 ? this.element[t] = e : this.element.setAttribute(t, e)
                },
                classSetter: function(t) {
                    (this.added ? this.element : this).className = t
                },
                dashstyleSetter: function(t, e, i) {
                    (i.getElementsByTagName("stroke")[0] || s(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid", this[e] = t
                },
                dSetter: function(t, e, i) {
                    var s = this.shadows;
                    if (t = t || [], this.d = t.join && t.join(" "), i.path = t = this.pathToVML(t), s)
                        for (i = s.length; i--;) s[i].path = s[i].cutOff ? this.cutOffPath(t, s[i].cutOff) : t;
                    this.setAttr(e, t)
                },
                fillSetter: function(t, e, i) {
                    var s = i.nodeName;
                    "SPAN" === s ? i.style.color = t : "IMG" !== s && (i.filled = "none" !== t, this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
                },
                "fill-opacitySetter": function(t, e, i) {
                    s(this.renderer.prepVML(["<", e.split("-")[0], ' opacity="', t, '"/>']), null, null, i)
                },
                opacitySetter: i,
                rotationSetter: function(t, e, i) {
                    i = i.style, this[e] = i[e] = t, i.left = -Math.round(Math.sin(t * r) + 1) + "px", i.top = Math.round(Math.cos(t * r)) + "px"
                },
                strokeSetter: function(t, e, i) {
                    this.setAttr("strokecolor", this.renderer.color(t, i, e, this))
                },
                "stroke-widthSetter": function(t, e, i) {
                    i.stroked = !!t, this[e] = t, u(t) && (t += "px"), this.setAttr("strokeweight", t)
                },
                titleSetter: function(t, e) {
                    this.setAttr(e, t)
                },
                visibilitySetter: function(t, e, i) {
                    "inherit" === t && (t = "visible"), this.shadows && l(this.shadows, function(i) {
                        i.style[e] = t
                    }), "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0, this.docMode8 || (i.style[e] = t ? "visible" : "hidden"), e = "top"), i.style[e] = t
                },
                xSetter: function(t, e, i) {
                    this[e] = t, "x" === e ? e = "left" : "y" === e && (e = "top"), this.updateClipping ? (this[e] = t, this.updateClipping()) : i.style[e] = t
                },
                zIndexSetter: function(t, e, i) {
                    i.style[e] = t
                }
            }, i["stroke-opacitySetter"] = i["fill-opacitySetter"], t.VMLElement = i = e(x, i), i.prototype.ySetter = i.prototype.widthSetter = i.prototype.heightSetter = i.prototype.xSetter, i = {
                Element: i,
                isIE8: -1 < b.navigator.userAgent.indexOf("MSIE 8.0"),
                init: function(t, e, i) {
                    var s, n;
                    if (this.alignedObjects = [], s = this.createElement("div").css({
                            position: "relative"
                        }), n = s.element, t.appendChild(s.element), this.isVML = !0, this.box = n, this.boxWrapper = s, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.setSize(e, i, !1), !h.namespaces.hcv) {
                        h.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            h.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        } catch (o) {
                            h.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        }
                    }
                },
                isHidden: function() {
                    return !this.box.offsetWidth
                },
                clipRect: function(t, e, i, s) {
                    var n = this.createElement(),
                        o = f(t);
                    return d(n, {
                        members: [],
                        count: 0,
                        left: (o ? t.x : t) + 1,
                        top: (o ? t.y : e) + 1,
                        width: (o ? t.width : i) - 1,
                        height: (o ? t.height : s) - 1,
                        getCSS: function(t) {
                            var e = t.element,
                                i = e.nodeName,
                                s = t.inverted,
                                n = this.top - ("shape" === i ? e.offsetTop : 0),
                                o = this.left,
                                e = o + this.width,
                                r = n + this.height,
                                n = {
                                    clip: "rect(" + Math.round(s ? o : n) + "px," + Math.round(s ? r : e) + "px," + Math.round(s ? e : r) + "px," + Math.round(s ? n : o) + "px)"
                                };
                            return !s && t.docMode8 && "DIV" === i && d(n, {
                                width: e + "px",
                                height: r + "px"
                            }), n
                        },
                        updateClipping: function() {
                            l(n.members, function(t) {
                                t.element && t.css(n.getCSS(t))
                            })
                        }
                    })
                },
                color: function(e, i, n, o) {
                    var r, a, h, c = this,
                        d = /^rgba/,
                        p = "none";
                    if (e && e.linearGradient ? h = "gradient" : e && e.radialGradient && (h = "pattern"), h) {
                        var u, f, g, m, v, x, y, b = e.linearGradient || e.radialGradient,
                            k = "";
                        e = e.stops;
                        var M, w = [],
                            S = function() {
                                a = ['<fill colors="' + w.join(",") + '" opacity="', v, '" o:opacity2="', m, '" type="', h, '" ', k, 'focus="100%" method="any" />'], s(c.prepVML(a), null, null, i)
                            };
                        if (g = e[0], M = e[e.length - 1], 0 < g[0] && e.unshift([0, g[1]]), 1 > M[0] && e.push([1, M[1]]), l(e, function(e, i) {
                                d.test(e[1]) ? (r = t.color(e[1]), u = r.get("rgb"), f = r.get("a")) : (u = e[1], f = 1), w.push(100 * e[0] + "% " + u), i ? (v = f, x = u) : (m = f, y = u)
                            }), "fill" === n)
                            if ("gradient" === h) n = b.x1 || b[0] || 0, e = b.y1 || b[1] || 0, g = b.x2 || b[2] || 0, b = b.y2 || b[3] || 0, k = 'angle="' + (90 - 180 * Math.atan((b - e) / (g - n)) / Math.PI) + '"', S();
                            else {
                                var T, p = b.r,
                                    A = 2 * p,
                                    C = 2 * p,
                                    P = b.cx,
                                    L = b.cy,
                                    O = i.radialReference,
                                    p = function() {
                                        O && (T = o.getBBox(), P += (O[0] - T.x) / T.width - .5, L += (O[1] - T.y) / T.height - .5, A *= O[2] / T.width, C *= O[2] / T.height), k = 'src="' + t.getOptions().global.VMLRadialGradientURL + '" size="' + A + "," + C + '" origin="0.5,0.5" position="' + P + "," + L + '" color2="' + y + '" ', S()
                                    };
                                o.added ? p() : o.onAdd = p, p = x
                            } else p = u
                    } else d.test(e) && "IMG" !== i.tagName ? (r = t.color(e), o[n + "-opacitySetter"](r.get("a"), n, i), p = r.get("rgb")) : (p = i.getElementsByTagName(n), p.length && (p[0].opacity = 1, p[0].type = "solid"), p = e);
                    return p
                },
                prepVML: function(t) {
                    var e = this.isIE8;
                    return t = t.join(""), e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"), t
                },
                text: y.prototype.html,
                path: function(t) {
                    var e = {
                        coordsize: "10 10"
                    };
                    return p(t) ? e.d = t : f(t) && d(e, t), this.createElement("shape").attr(e)
                },
                circle: function(t, e, i) {
                    var s = this.symbol("circle");
                    return f(t) && (i = t.r, e = t.y, t = t.x), s.isCircle = !0, s.r = i, s.attr({
                        x: t,
                        y: e
                    })
                },
                g: function(t) {
                    var e;
                    return t && (e = {
                        className: "highcharts-" + t,
                        "class": "highcharts-" + t
                    }), this.createElement("div").attr(e)
                },
                image: function(t, e, i, s, n) {
                    var o = this.createElement("img").attr({
                        src: t
                    });
                    return 1 < arguments.length && o.attr({
                        x: e,
                        y: i,
                        width: s,
                        height: n
                    }), o
                },
                createElement: function(t) {
                    return "rect" === t ? this.symbol(t) : y.prototype.createElement.call(this, t)
                },
                invertChild: function(t, e) {
                    var i = this;
                    e = e.style;
                    var s = "IMG" === t.tagName && t.style;
                    n(t, {
                        flip: "x",
                        left: v(e.width) - (s ? v(s.top) : 1),
                        top: v(e.height) - (s ? v(s.left) : 1),
                        rotation: -90
                    }), l(t.childNodes, function(e) {
                        i.invertChild(e, t)
                    })
                },
                symbols: {
                    arc: function(t, e, i, s, n) {
                        var o = n.start,
                            r = n.end,
                            a = n.r || i || s;
                        i = n.innerR, s = Math.cos(o);
                        var h = Math.sin(o),
                            l = Math.cos(r),
                            c = Math.sin(r);
                        return 0 === r - o ? ["x"] : (o = ["wa", t - a, e - a, t + a, e + a, t + a * s, e + a * h, t + a * l, e + a * c], n.open && !i && o.push("e", "M", t, e), o.push("at", t - i, e - i, t + i, e + i, t + i * l, e + i * c, t + i * s, e + i * h, "x", "e"), o.isArc = !0, o)
                    },
                    circle: function(t, e, i, s, n) {
                        return n && o(n.r) && (i = s = 2 * n.r), n && n.isCircle && (t -= i / 2, e -= s / 2), ["wa", t, e, t + i, e + s, t + i, e + s / 2, t + i, e + s / 2, "e"]
                    },
                    rect: function(t, e, i, s, n) {
                        return y.prototype.symbols[o(n) && n.r ? "callout" : "square"].call(0, t, e, i, s, n)
                    }
                }
            }, t.VMLRenderer = e = function() {
                this.init.apply(this, arguments)
            }, e.prototype = g(y.prototype, i), t.Renderer = e), y.prototype.measureSpanWidth = function(t, e) {
                var i = h.createElement("span");
                return t = h.createTextNode(t), i.appendChild(t), n(i, e), this.box.appendChild(i), e = i.offsetWidth, a(i), e
            }
        }(t),
        function(t) {
            function e() {
                var e, i = t.defaultOptions.global,
                    o = i.useUTC,
                    h = o ? "getUTC" : "get",
                    l = o ? "setUTC" : "set";
                t.Date = e = i.Date || a.Date, e.hcTimezoneOffset = o && i.timezoneOffset, e.hcGetTimezoneOffset = o && i.getTimezoneOffset, e.hcMakeTime = function(t, i, s, a, h, l) {
                    var c;
                    return o ? (c = e.UTC.apply(0, arguments), c += n(c)) : c = new e(t, i, r(s, 1), r(a, 0), r(h, 0), r(l, 0)).getTime(), c
                }, s("Minutes Hours Day Date Month FullYear".split(" "), function(t) {
                    e["hcGet" + t] = h + t
                }), s("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(t) {
                    e["hcSet" + t] = l + t
                })
            }
            var i = t.color,
                s = t.each,
                n = t.getTZOffset,
                o = t.merge,
                r = t.pick,
                a = t.win;
            t.defaultOptions = {
                colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {
                    useUTC: !0,
                    VMLRadialGradientURL: "http://code.highcharts.com/5.0.6/gfx/vml-radial-gradient.png"
                },
                chart: {
                    borderRadius: 0,
                    defaultSeriesType: "line",
                    ignoreHiddenSeries: !0,
                    spacing: [10, 10, 15, 10],
                    resetZoomButton: {
                        theme: {
                            zIndex: 20
                        },
                        position: {
                            align: "right",
                            x: -10,
                            y: 10
                        }
                    },
                    width: null,
                    height: null,
                    borderColor: "#335cad",
                    backgroundColor: "#ffffff",
                    plotBorderColor: "#cccccc"
                },
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: {
                    text: "",
                    align: "center",
                    widthAdjust: -44
                },
                plotOptions: {},
                labels: {
                    style: {
                        position: "absolute",
                        color: "#333333"
                    }
                },
                legend: {
                    enabled: !0,
                    align: "center",
                    layout: "horizontal",
                    labelFormatter: function() {
                        return this.name
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: {
                        activeColor: "#003399",
                        inactiveColor: "#cccccc"
                    },
                    itemStyle: {
                        color: "#333333",
                        fontSize: "12px",
                        fontWeight: "bold"
                    },
                    itemHoverStyle: {
                        color: "#000000"
                    },
                    itemHiddenStyle: {
                        color: "#cccccc"
                    },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px"
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {
                        style: {
                            fontWeight: "bold"
                        }
                    }
                },
                loading: {
                    labelStyle: {
                        fontWeight: "bold",
                        position: "relative",
                        top: "45%"
                    },
                    style: {
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        opacity: .5,
                        textAlign: "center"
                    }
                },
                tooltip: {
                    enabled: !0,
                    animation: t.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    padding: 8,
                    snap: t.isTouchDevice ? 25 : 10,
                    backgroundColor: i("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                    shadow: !0,
                    style: {
                        color: "#333333",
                        cursor: "default",
                        fontSize: "12px",
                        pointerEvents: "none",
                        whiteSpace: "nowrap"
                    }
                },
                credits: {
                    enabled: !0,
                    href: "http://www.highcharts.com",
                    position: {
                        align: "right",
                        x: -10,
                        verticalAlign: "bottom",
                        y: -5
                    },
                    style: {
                        cursor: "pointer",
                        color: "#999999",
                        fontSize: "9px"
                    },
                    text: "Highcharts.com"
                }
            }, t.setOptions = function(i) {
                return t.defaultOptions = o(!0, t.defaultOptions, i), e(), t.defaultOptions
            }, t.getOptions = function() {
                return t.defaultOptions
            }, t.defaultPlotOptions = t.defaultOptions.plotOptions, e()
        }(t),
        function(t) {
            var e = t.arrayMax,
                i = t.arrayMin,
                s = t.defined,
                n = t.destroyObjectProperties,
                o = t.each,
                r = t.erase,
                a = t.merge,
                h = t.pick;
            t.PlotLineOrBand = function(t, e) {
                this.axis = t, e && (this.options = e, this.id = e.id)
            }, t.PlotLineOrBand.prototype = {
                render: function() {
                    var t, e = this,
                        i = e.axis,
                        n = i.horiz,
                        o = e.options,
                        r = o.label,
                        l = e.label,
                        c = o.to,
                        d = o.from,
                        p = o.value,
                        u = s(d) && s(c),
                        f = s(p),
                        g = e.svgElem,
                        m = !g,
                        v = [],
                        x = o.color,
                        y = h(o.zIndex, 0),
                        b = o.events,
                        v = {
                            "class": "highcharts-plot-" + (u ? "band " : "line ") + (o.className || "")
                        },
                        k = {},
                        M = i.chart.renderer,
                        w = u ? "bands" : "lines",
                        S = i.log2lin;
                    if (i.isLog && (d = S(d), c = S(c), p = S(p)), f ? (v = {
                            stroke: x,
                            "stroke-width": o.width
                        }, o.dashStyle && (v.dashstyle = o.dashStyle)) : u && (x && (v.fill = x), o.borderWidth && (v.stroke = o.borderColor, v["stroke-width"] = o.borderWidth)), k.zIndex = y, w += "-" + y, (x = i[w]) || (i[w] = x = M.g("plot-" + w).attr(k).add()), m && (e.svgElem = g = M.path().attr(v).add(x)), f) v = i.getPlotLinePath(p, g.strokeWidth());
                    else {
                        if (!u) return;
                        v = i.getPlotBandPath(d, c, o)
                    }
                    if (m && v && v.length) {
                        if (g.attr({
                                d: v
                            }), b)
                            for (t in o = function(t) {
                                    g.on(t, function(i) {
                                        b[t].apply(e, [i])
                                    })
                                }, b) o(t)
                    } else g && (v ? (g.show(), g.animate({
                        d: v
                    })) : (g.hide(), l && (e.label = l = l.destroy())));
                    return r && s(r.text) && v && v.length && 0 < i.width && 0 < i.height && !v.flat ? (r = a({
                        align: n && u && "center",
                        x: n ? !u && 4 : 10,
                        verticalAlign: !n && u && "middle",
                        y: n ? u ? 16 : 10 : u ? 6 : -4,
                        rotation: n && !u && 90
                    }, r), this.renderLabel(r, v, u, y)) : l && l.hide(), e
                },
                renderLabel: function(t, s, n, o) {
                    var r = this.label,
                        a = this.axis.chart.renderer;
                    r || (r = {
                        align: t.textAlign || t.align,
                        rotation: t.rotation,
                        "class": "highcharts-plot-" + (n ? "band" : "line") + "-label " + (t.className || "")
                    }, r.zIndex = o, this.label = r = a.text(t.text, 0, 0, t.useHTML).attr(r).add(), r.css(t.style)), o = [s[1], s[4], n ? s[6] : s[1]], s = [s[2], s[5], n ? s[7] : s[2]], n = i(o), a = i(s), r.align(t, !1, {
                        x: n,
                        y: a,
                        width: e(o) - n,
                        height: e(s) - a
                    }), r.show()
                },
                destroy: function() {
                    r(this.axis.plotLinesAndBands, this), delete this.axis, n(this)
                }
            }, t.AxisPlotLineOrBandExtension = {
                getPlotBandPath: function(t, e) {
                    return e = this.getPlotLinePath(e, null, null, !0), (t = this.getPlotLinePath(t, null, null, !0)) && e ? (t.flat = t.toString() === e.toString(), t.push(e[4], e[5], e[1], e[2], "z")) : t = null, t
                },
                addPlotBand: function(t) {
                    return this.addPlotBandOrLine(t, "plotBands")
                },
                addPlotLine: function(t) {
                    return this.addPlotBandOrLine(t, "plotLines")
                },
                addPlotBandOrLine: function(e, i) {
                    var s = new t.PlotLineOrBand(this, e).render(),
                        n = this.userOptions;
                    return s && (i && (n[i] = n[i] || [], n[i].push(e)), this.plotLinesAndBands.push(s)), s
                },
                removePlotBandOrLine: function(t) {
                    for (var e = this.plotLinesAndBands, i = this.options, s = this.userOptions, n = e.length; n--;) e[n].id === t && e[n].destroy();
                    o([i.plotLines || [], s.plotLines || [], i.plotBands || [], s.plotBands || []], function(e) {
                        for (n = e.length; n--;) e[n].id === t && r(e, e[n])
                    })
                }
            }
        }(t),
        function(t) {
            var e = t.correctFloat,
                i = t.defined,
                s = t.destroyObjectProperties,
                n = t.isNumber,
                o = t.merge,
                r = t.pick,
                a = t.deg2rad;
            t.Tick = function(t, e, i, s) {
                this.axis = t, this.pos = e, this.type = i || "", this.isNew = !0, i || s || this.addLabel()
            }, t.Tick.prototype = {
                addLabel: function() {
                    var t, s = this.axis,
                        n = s.options,
                        a = s.chart,
                        h = s.categories,
                        l = s.names,
                        c = this.pos,
                        d = n.labels,
                        p = s.tickPositions,
                        u = c === p[0],
                        f = c === p[p.length - 1],
                        l = h ? r(h[c], l[c], c) : c,
                        h = this.label,
                        p = p.info;
                    s.isDatetimeAxis && p && (t = n.dateTimeLabelFormats[p.higherRanks[c] || p.unitName]), this.isFirst = u, this.isLast = f, n = s.labelFormatter.call({
                        axis: s,
                        chart: a,
                        isFirst: u,
                        isLast: f,
                        dateTimeLabelFormat: t,
                        value: s.isLog ? e(s.lin2log(l)) : l
                    }), i(h) ? h && h.attr({
                        text: n
                    }) : (this.labelLength = (this.label = h = i(n) && d.enabled ? a.renderer.text(n, 0, 0, d.useHTML).css(o(d.style)).add(s.labelGroup) : null) && h.getBBox().width, this.rotation = 0)
                },
                getLabelSize: function() {
                    return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                },
                handleOverflow: function(t) {
                    var e, i = this.axis,
                        s = t.x,
                        n = i.chart.chartWidth,
                        o = i.chart.spacing,
                        h = r(i.labelLeft, Math.min(i.pos, o[3])),
                        o = r(i.labelRight, Math.max(i.pos + i.len, n - o[1])),
                        l = this.label,
                        c = this.rotation,
                        d = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[i.labelAlign],
                        p = l.getBBox().width,
                        u = i.getSlotWidth(),
                        f = u,
                        g = 1,
                        m = {};
                    c ? 0 > c && h > s - d * p ? e = Math.round(s / Math.cos(c * a) - h) : c > 0 && s + d * p > o && (e = Math.round((n - s) / Math.cos(c * a))) : (n = s + (1 - d) * p, h > s - d * p ? f = t.x + f * (1 - d) - h : n > o && (f = o - t.x + f * d, g = -1), f = Math.min(u, f), u > f && "center" === i.labelAlign && (t.x += g * (u - f - d * (u - Math.min(p, f)))), (p > f || i.autoRotation && (l.styles || {}).width) && (e = f)), e && (m.width = e, (i.options.labels.style || {}).textOverflow || (m.textOverflow = "ellipsis"), l.css(m))
                },
                getPosition: function(t, e, i, s) {
                    var n = this.axis,
                        o = n.chart,
                        r = s && o.oldChartHeight || o.chartHeight;
                    return {
                        x: t ? n.translate(e + i, null, null, s) + n.transB : n.left + n.offset + (n.opposite ? (s && o.oldChartWidth || o.chartWidth) - n.right - n.left : 0),
                        y: t ? r - n.bottom + n.offset - (n.opposite ? n.height : 0) : r - n.translate(e + i, null, null, s) - n.transB
                    }
                },
                getLabelPosition: function(t, e, s, n, o, r, h, l) {
                    var c = this.axis,
                        d = c.transA,
                        p = c.reversed,
                        u = c.staggerLines,
                        f = c.tickRotCorr || {
                            x: 0,
                            y: 0
                        },
                        g = o.y;
                    return i(g) || (g = 0 === c.side ? s.rotation ? -8 : -s.getBBox().height : 2 === c.side ? f.y + 8 : Math.cos(s.rotation * a) * (f.y - s.getBBox(!1, 0).height / 2)), t = t + o.x + f.x - (r && n ? r * d * (p ? -1 : 1) : 0), e = e + g - (r && !n ? r * d * (p ? 1 : -1) : 0), u && (s = h / (l || 1) % u, c.opposite && (s = u - s - 1), e += c.labelOffset / u * s), {
                        x: t,
                        y: Math.round(e)
                    }
                },
                getMarkPath: function(t, e, i, s, n, o) {
                    return o.crispLine(["M", t, e, "L", t + (n ? 0 : -i), e + (n ? i : 0)], s)
                },
                render: function(t, e, i) {
                    var s = this.axis,
                        o = s.options,
                        a = s.chart.renderer,
                        h = s.horiz,
                        l = this.type,
                        c = this.label,
                        d = this.pos,
                        p = o.labels,
                        u = this.gridLine,
                        f = l ? l + "Tick" : "tick",
                        g = s.tickSize(f),
                        m = this.mark,
                        v = !m,
                        x = p.step,
                        y = {},
                        b = !0,
                        k = s.tickmarkOffset,
                        M = this.getPosition(h, d, k, e),
                        w = M.x,
                        M = M.y,
                        S = h && w === s.pos + s.len || !h && M === s.pos ? -1 : 1,
                        T = l ? l + "Grid" : "grid",
                        A = o[T + "LineWidth"],
                        C = o[T + "LineColor"],
                        P = o[T + "LineDashStyle"],
                        T = r(o[f + "Width"], !l && s.isXAxis ? 1 : 0),
                        f = o[f + "Color"];
                    i = r(i, 1), this.isActive = !0, u || (y.stroke = C, y["stroke-width"] = A, P && (y.dashstyle = P), l || (y.zIndex = 1), e && (y.opacity = 0), this.gridLine = u = a.path().attr(y).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(s.gridGroup)), !e && u && (d = s.getPlotLinePath(d + k, u.strokeWidth() * S, e, !0)) && u[this.isNew ? "attr" : "animate"]({
                        d: d,
                        opacity: i
                    }), g && (s.opposite && (g[0] = -g[0]), v && (this.mark = m = a.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(s.axisGroup), m.attr({
                        stroke: f,
                        "stroke-width": T
                    })), m[v ? "attr" : "animate"]({
                        d: this.getMarkPath(w, M, g[0], m.strokeWidth() * S, h, a),
                        opacity: i
                    })), c && n(w) && (c.xy = M = this.getLabelPosition(w, M, c, h, p, k, t, x), this.isFirst && !this.isLast && !r(o.showFirstLabel, 1) || this.isLast && !this.isFirst && !r(o.showLastLabel, 1) ? b = !1 : !h || s.isRadial || p.step || p.rotation || e || 0 === i || this.handleOverflow(M), x && t % x && (b = !1), b && n(M.y) ? (M.opacity = i, c[this.isNew ? "attr" : "animate"](M)) : c.attr("y", -9999), this.isNew = !1)
                },
                destroy: function() {
                    s(this, this.axis)
                }
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.animObject,
                s = t.arrayMax,
                n = t.arrayMin,
                o = t.AxisPlotLineOrBandExtension,
                r = t.color,
                a = t.correctFloat,
                h = t.defaultOptions,
                l = t.defined,
                c = t.deg2rad,
                d = t.destroyObjectProperties,
                p = t.each,
                u = t.extend,
                f = t.fireEvent,
                g = t.format,
                m = t.getMagnitude,
                v = t.grep,
                x = t.inArray,
                y = t.isArray,
                b = t.isNumber,
                k = t.isString,
                M = t.merge,
                w = t.normalizeTickInterval,
                S = t.pick,
                T = t.PlotLineOrBand,
                A = t.removeEvent,
                C = t.splat,
                P = t.syncTimeout,
                L = t.Tick;
            t.Axis = function() {
                this.init.apply(this, arguments)
            }, t.Axis.prototype = {
                defaultOptions: {
                    dateTimeLabelFormats: {
                        millisecond: "%H:%M:%S.%L",
                        second: "%H:%M:%S",
                        minute: "%H:%M",
                        hour: "%H:%M",
                        day: "%e. %b",
                        week: "%e. %b",
                        month: "%b '%y",
                        year: "%Y"
                    },
                    endOnTick: !1,
                    labels: {
                        enabled: !0,
                        style: {
                            color: "#666666",
                            cursor: "default",
                            fontSize: "11px"
                        },
                        x: 0
                    },
                    minPadding: .01,
                    maxPadding: .01,
                    minorTickLength: 2,
                    minorTickPosition: "outside",
                    startOfWeek: 1,
                    startOnTick: !1,
                    tickLength: 10,
                    tickmarkPlacement: "between",
                    tickPixelInterval: 100,
                    tickPosition: "outside",
                    title: {
                        align: "middle",
                        style: {
                            color: "#666666"
                        }
                    },
                    type: "linear",
                    minorGridLineColor: "#f2f2f2",
                    minorGridLineWidth: 1,
                    minorTickColor: "#999999",
                    lineColor: "#ccd6eb",
                    lineWidth: 1,
                    gridLineColor: "#e6e6e6",
                    tickColor: "#ccd6eb"
                },
                defaultYAxisOptions: {
                    endOnTick: !0,
                    tickPixelInterval: 72,
                    showLastLabel: !0,
                    labels: {
                        x: -8
                    },
                    maxPadding: .05,
                    minPadding: .05,
                    startOnTick: !0,
                    title: {
                        rotation: 270,
                        text: "Values"
                    },
                    stackLabels: {
                        enabled: !1,
                        formatter: function() {
                            return t.numberFormat(this.total, -1)
                        },
                        style: {
                            fontSize: "11px",
                            fontWeight: "bold",
                            color: "#000000",
                            textOutline: "1px contrast"
                        }
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                },
                defaultLeftAxisOptions: {
                    labels: {
                        x: -15
                    },
                    title: {
                        rotation: 270
                    }
                },
                defaultRightAxisOptions: {
                    labels: {
                        x: 15
                    },
                    title: {
                        rotation: 90
                    }
                },
                defaultBottomAxisOptions: {
                    labels: {
                        autoRotation: [-45],
                        x: 0
                    },
                    title: {
                        rotation: 0
                    }
                },
                defaultTopAxisOptions: {
                    labels: {
                        autoRotation: [-45],
                        x: 0
                    },
                    title: {
                        rotation: 0
                    }
                },
                init: function(t, i) {
                    var s = i.isX;
                    this.chart = t, this.horiz = t.inverted ? !s : s, this.isXAxis = s, this.coll = this.coll || (s ? "xAxis" : "yAxis"), this.opposite = i.opposite, this.side = i.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(i);
                    var n = this.options,
                        o = n.type;
                    this.labelFormatter = n.labels.formatter || this.defaultLabelFormatter, this.userOptions = i, this.minPixelPadding = 0, this.reversed = n.reversed, this.visible = !1 !== n.visible, this.zoomEnabled = !1 !== n.zoomEnabled, this.hasNames = "category" === o || !0 === n.categories, this.categories = n.categories || this.hasNames, this.names = this.names || [], this.isLog = "logarithmic" === o, this.isDatetimeAxis = "datetime" === o, this.isLinked = l(n.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {},
                        this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = n.minRange || n.maxZoom, this.range = n.range, this.offset = n.offset || 0, this.stacks = {}, this.oldStacks = {}, this.stacksTouched = 0, this.min = this.max = null, this.crosshair = S(n.crosshair, C(t.options.tooltip.crosshairs)[s ? 0 : 1], !1);
                    var r;
                    i = this.options.events, -1 === x(this, t.axes) && (s ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this)), this.series = this.series || [], t.inverted && s && void 0 === this.reversed && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                    for (r in i) e(this, r, i[r]);
                    this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
                },
                setOptions: function(t) {
                    this.options = M(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], M(h[this.coll], t))
                },
                defaultLabelFormatter: function() {
                    var e, i = this.axis,
                        s = this.value,
                        n = i.categories,
                        o = this.dateTimeLabelFormat,
                        r = h.lang,
                        a = r.numericSymbols,
                        r = r.numericSymbolMagnitude || 1e3,
                        l = a && a.length,
                        c = i.options.labels.format,
                        i = i.isLog ? s : i.tickInterval;
                    if (c) e = g(c, this);
                    else if (n) e = s;
                    else if (o) e = t.dateFormat(o, s);
                    else if (l && i >= 1e3)
                        for (; l-- && void 0 === e;) n = Math.pow(r, l + 1), i >= n && 0 === 10 * s % n && null !== a[l] && 0 !== s && (e = t.numberFormat(s / n, -1) + a[l]);
                    return void 0 === e && (e = 1e4 <= Math.abs(s) ? t.numberFormat(s, -1) : t.numberFormat(s, -1, void 0, "")), e
                },
                getSeriesExtremes: function() {
                    var t = this,
                        e = t.chart;
                    t.hasVisibleSeries = !1, t.dataMin = t.dataMax = t.threshold = null, t.softThreshold = !t.isXAxis, t.buildStacks && t.buildStacks(), p(t.series, function(i) {
                        if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                            var o, r = i.options,
                                a = r.threshold;
                            t.hasVisibleSeries = !0, t.isLog && 0 >= a && (a = null), t.isXAxis ? (r = i.xData, r.length && (i = n(r), b(i) || i instanceof Date || (r = v(r, function(t) {
                                return b(t)
                            }), i = n(r)), t.dataMin = Math.min(S(t.dataMin, r[0]), i), t.dataMax = Math.max(S(t.dataMax, r[0]), s(r)))) : (i.getExtremes(), o = i.dataMax, i = i.dataMin, l(i) && l(o) && (t.dataMin = Math.min(S(t.dataMin, i), i), t.dataMax = Math.max(S(t.dataMax, o), o)), l(a) && (t.threshold = a), (!r.softThreshold || t.isLog) && (t.softThreshold = !1))
                        }
                    })
                },
                translate: function(t, e, i, s, n, o) {
                    var r = this.linkedParent || this,
                        a = 1,
                        h = 0,
                        l = s ? r.oldTransA : r.transA;
                    s = s ? r.oldMin : r.min;
                    var c = r.minPixelPadding;
                    return n = (r.isOrdinal || r.isBroken || r.isLog && n) && r.lin2val, l || (l = r.transA), i && (a *= -1, h = r.len), r.reversed && (a *= -1, h -= a * (r.sector || r.len)), e ? (t = (t * a + h - c) / l + s, n && (t = r.lin2val(t))) : (n && (t = r.val2lin(t)), t = a * (t - s) * l + h + a * c + (b(o) ? l * o : 0)), t
                },
                toPixels: function(t, e) {
                    return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
                },
                toValue: function(t, e) {
                    return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
                },
                getPlotLinePath: function(t, e, i, s, n) {
                    var o, r, a, h = this.chart,
                        l = this.left,
                        c = this.top,
                        d = i && h.oldChartHeight || h.chartHeight,
                        p = i && h.oldChartWidth || h.chartWidth;
                    o = this.transB;
                    var u = function(t, e, i) {
                        return (e > t || t > i) && (s ? t = Math.min(Math.max(e, t), i) : a = !0), t
                    };
                    return n = S(n, this.translate(t, null, null, i)), t = i = Math.round(n + o), o = r = Math.round(d - n - o), b(n) ? this.horiz ? (o = c, r = d - this.bottom, t = i = u(t, l, l + this.width)) : (t = l, i = p - this.right, o = r = u(o, c, c + this.height)) : a = !0, a && !s ? null : h.renderer.crispLine(["M", t, o, "L", i, r], e || 1)
                },
                getLinearTickPositions: function(t, e, i) {
                    var s, n = a(Math.floor(e / t) * t),
                        o = a(Math.ceil(i / t) * t),
                        r = [];
                    if (e === i && b(e)) return [e];
                    for (e = n; o >= e && (r.push(e), e = a(e + t), e !== s);) s = e;
                    return r
                },
                getMinorTickPositions: function() {
                    var t, e = this.options,
                        i = this.tickPositions,
                        s = this.minorTickInterval,
                        n = [],
                        o = this.pointRangePadding || 0;
                    t = this.min - o;
                    var o = this.max + o,
                        r = o - t;
                    if (r && r / s < this.len / 3)
                        if (this.isLog)
                            for (o = i.length, t = 1; o > t; t++) n = n.concat(this.getLogTickPositions(s, i[t - 1], i[t], !0));
                        else if (this.isDatetimeAxis && "auto" === e.minorTickInterval) n = n.concat(this.getTimeTicks(this.normalizeTimeTickInterval(s), t, o, e.startOfWeek));
                    else
                        for (i = t + (i[0] - t) % s; o >= i && i !== n[0]; i += s) n.push(i);
                    return 0 !== n.length && this.trimTicks(n, e.startOnTick, e.endOnTick), n
                },
                adjustForMinRange: function() {
                    var t, e, i, o, r, a, h, c = this.options,
                        d = this.min,
                        u = this.max,
                        f = this.dataMax - this.dataMin >= this.minRange;
                    this.isXAxis && void 0 === this.minRange && !this.isLog && (l(c.min) || l(c.max) ? this.minRange = null : (p(this.series, function(t) {
                        for (r = t.xData, i = a = t.xIncrement ? 1 : r.length - 1; i > 0; i--) o = r[i] - r[i - 1], (void 0 === e || e > o) && (e = o)
                    }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin))), u - d < this.minRange && (h = this.minRange, t = (h - u + d) / 2, t = [d - t, S(c.min, d - t)], f && (t[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = s(t), u = [d + h, S(c.max, d + h)], f && (u[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), u = n(u), h > u - d && (t[0] = u - h, t[1] = S(c.min, u - h), d = s(t))), this.min = d, this.max = u
                },
                getClosest: function() {
                    var t;
                    return this.categories ? t = 1 : p(this.series, function(e) {
                        var i = e.closestPointRange,
                            s = e.visible || !e.chart.options.chart.ignoreHiddenSeries;
                        !e.noSharedTooltip && l(i) && s && (t = l(t) ? Math.min(t, i) : i)
                    }), t
                },
                nameToX: function(t) {
                    var e, i = y(this.categories),
                        s = i ? this.categories : this.names,
                        n = t.options.x;
                    return t.series.requireSorting = !1, l(n) || (n = !1 === this.options.uniqueNames ? t.series.autoIncrement() : x(t.name, s)), -1 === n ? i || (e = s.length) : e = n, this.names[e] = t.name, e
                },
                updateNames: function() {
                    var t = this;
                    0 < this.names.length && (this.names.length = 0, this.minRange = void 0, p(this.series || [], function(e) {
                        e.xIncrement = null, (!e.points || e.isDirtyData) && (e.processData(), e.generatePoints()), p(e.points, function(i, s) {
                            var n;
                            i.options && void 0 === i.options.x && (n = t.nameToX(i), n !== i.x && (i.x = n, e.xData[s] = n))
                        })
                    }))
                },
                setAxisTranslation: function(t) {
                    var e, i = this,
                        s = i.max - i.min,
                        n = i.axisPointRange || 0,
                        o = 0,
                        r = 0,
                        a = i.linkedParent,
                        h = !!i.categories,
                        l = i.transA,
                        c = i.isXAxis;
                    (c || h || n) && (e = i.getClosest(), a ? (o = a.minPointOffset, r = a.pointRangePadding) : p(i.series, function(t) {
                        var s = h ? 1 : c ? S(t.options.pointRange, e, 0) : i.axisPointRange || 0;
                        t = t.options.pointPlacement, n = Math.max(n, s), i.single || (o = Math.max(o, k(t) ? 0 : s / 2), r = Math.max(r, "on" === t ? 0 : s))
                    }), a = i.ordinalSlope && e ? i.ordinalSlope / e : 1, i.minPointOffset = o *= a, i.pointRangePadding = r *= a, i.pointRange = Math.min(n, s), c && (i.closestPointRange = e)), t && (i.oldTransA = l), i.translationSlope = i.transA = l = i.len / (s + r || 1), i.transB = i.horiz ? i.left : i.bottom, i.minPixelPadding = l * o
                },
                minFromRange: function() {
                    return this.max - this.range
                },
                setTickInterval: function(e) {
                    var i, s, n, o, r = this,
                        h = r.chart,
                        c = r.options,
                        d = r.isLog,
                        u = r.log2lin,
                        g = r.isDatetimeAxis,
                        v = r.isXAxis,
                        x = r.isLinked,
                        y = c.maxPadding,
                        k = c.minPadding,
                        M = c.tickInterval,
                        T = c.tickPixelInterval,
                        A = r.categories,
                        C = r.threshold,
                        P = r.softThreshold;
                    g || A || x || this.getTickAmount(), n = S(r.userMin, c.min), o = S(r.userMax, c.max), x ? (r.linkedParent = h[r.coll][c.linkedTo], h = r.linkedParent.getExtremes(), r.min = S(h.min, h.dataMin), r.max = S(h.max, h.dataMax), c.type !== r.linkedParent.options.type && t.error(11, 1)) : (!P && l(C) && (r.dataMin >= C ? (i = C, k = 0) : r.dataMax <= C && (s = C, y = 0)), r.min = S(n, i, r.dataMin), r.max = S(o, s, r.dataMax)), d && (!e && 0 >= Math.min(r.min, S(r.dataMin, r.min)) && t.error(10, 1), r.min = a(u(r.min), 15), r.max = a(u(r.max), 15)), r.range && l(r.max) && (r.userMin = r.min = n = Math.max(r.min, r.minFromRange()), r.userMax = o = r.max, r.range = null), f(r, "foundExtremes"), r.beforePadding && r.beforePadding(), r.adjustForMinRange(), !(A || r.axisPointRange || r.usePercentage || x) && l(r.min) && l(r.max) && (u = r.max - r.min) && (!l(n) && k && (r.min -= u * k), !l(o) && y && (r.max += u * y)), b(c.floor) ? r.min = Math.max(r.min, c.floor) : b(c.softMin) && (r.min = Math.min(r.min, c.softMin)), b(c.ceiling) ? r.max = Math.min(r.max, c.ceiling) : b(c.softMax) && (r.max = Math.max(r.max, c.softMax)), P && l(r.dataMin) && (C = C || 0, !l(n) && r.min < C && r.dataMin >= C ? r.min = C : !l(o) && r.max > C && r.dataMax <= C && (r.max = C)), r.tickInterval = r.min === r.max || void 0 === r.min || void 0 === r.max ? 1 : x && !M && T === r.linkedParent.options.tickPixelInterval ? M = r.linkedParent.tickInterval : S(M, this.tickAmount ? (r.max - r.min) / Math.max(this.tickAmount - 1, 1) : void 0, A ? 1 : (r.max - r.min) * T / Math.max(r.len, T)), v && !e && p(r.series, function(t) {
                        t.processData(r.min !== r.oldMin || r.max !== r.oldMax)
                    }), r.setAxisTranslation(!0), r.beforeSetTickPositions && r.beforeSetTickPositions(), r.postProcessTickInterval && (r.tickInterval = r.postProcessTickInterval(r.tickInterval)), r.pointRange && !M && (r.tickInterval = Math.max(r.pointRange, r.tickInterval)), e = S(c.minTickInterval, r.isDatetimeAxis && r.closestPointRange), !M && r.tickInterval < e && (r.tickInterval = e), g || d || M || (r.tickInterval = w(r.tickInterval, null, m(r.tickInterval), S(c.allowDecimals, !(.5 < r.tickInterval && 5 > r.tickInterval && 1e3 < r.max && 9999 > r.max)), !!this.tickAmount)), this.tickAmount || (r.tickInterval = r.unsquish()), this.setTickPositions()
                },
                setTickPositions: function() {
                    var t, e, i = this.options,
                        s = i.tickPositions,
                        n = i.tickPositioner,
                        o = i.startOnTick,
                        r = i.endOnTick;
                    this.tickmarkOffset = this.categories && "between" === i.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === i.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : i.minorTickInterval, this.tickPositions = t = s && s.slice(), !t && (t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, i.units), this.min, this.max, i.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), t.length > this.len && (t = [t[0], t.pop()]), this.tickPositions = t, n && (n = n.apply(this, [this.min, this.max]))) && (this.tickPositions = t = n), this.isLinked || (this.trimTicks(t, o, r), this.min === this.max && l(this.min) && !this.tickAmount && (e = !0, this.min -= .5, this.max += .5), this.single = e, s || n || this.adjustTickAmount())
                },
                trimTicks: function(t, e, i) {
                    var s = t[0],
                        n = t[t.length - 1],
                        o = this.minPointOffset || 0;
                    if (e) this.min = s;
                    else
                        for (; this.min - o > t[0];) t.shift();
                    if (i) this.max = n;
                    else
                        for (; this.max + o < t[t.length - 1];) t.pop();
                    0 === t.length && l(s) && t.push((n + s) / 2)
                },
                alignToOthers: function() {
                    var t, e = {},
                        i = this.options;
                    return !1 === this.chart.options.chart.alignTicks || !1 === i.alignTicks || this.isLog || p(this.chart[this.coll], function(i) {
                        var s = i.options,
                            s = [i.horiz ? s.left : s.top, s.width, s.height, s.pane].join();
                        i.series.length && (e[s] ? t = !0 : e[s] = 1)
                    }), t
                },
                getTickAmount: function() {
                    var t = this.options,
                        e = t.tickAmount,
                        i = t.tickPixelInterval;
                    !l(t.tickInterval) && this.len < i && !this.isRadial && !this.isLog && t.startOnTick && t.endOnTick && (e = 2), !e && this.alignToOthers() && (e = Math.ceil(this.len / i) + 1), 4 > e && (this.finalTickAmt = e, e = 5), this.tickAmount = e
                },
                adjustTickAmount: function() {
                    var t = this.tickInterval,
                        e = this.tickPositions,
                        i = this.tickAmount,
                        s = this.finalTickAmt,
                        n = e && e.length;
                    if (i > n) {
                        for (; e.length < i;) e.push(a(e[e.length - 1] + t));
                        this.transA *= (n - 1) / (i - 1), this.max = e[e.length - 1]
                    } else n > i && (this.tickInterval *= 2, this.setTickPositions());
                    if (l(s)) {
                        for (t = i = e.length; t--;)(3 === s && 1 === t % 2 || 2 >= s && t > 0 && i - 1 > t) && e.splice(t, 1);
                        this.finalTickAmt = void 0
                    }
                },
                setScale: function() {
                    var t, e;
                    this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), e = this.len !== this.oldAxisLength, p(this.series, function(e) {
                        (e.isDirtyData || e.isDirty || e.xAxis.isDirty) && (t = !0)
                    }), e || t || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
                },
                setExtremes: function(t, e, i, s, n) {
                    var o = this,
                        r = o.chart;
                    i = S(i, !0), p(o.series, function(t) {
                        delete t.kdTree
                    }), n = u(n, {
                        min: t,
                        max: e
                    }), f(o, "setExtremes", n, function() {
                        o.userMin = t, o.userMax = e, o.eventArgs = n, i && r.redraw(s)
                    })
                },
                zoom: function(t, e) {
                    var i = this.dataMin,
                        s = this.dataMax,
                        n = this.options,
                        o = Math.min(i, S(n.min, i)),
                        n = Math.max(s, S(n.max, s));
                    return (t !== this.min || e !== this.max) && (this.allowZoomOutside || (l(i) && (o > t && (t = o), t > n && (t = n)), l(s) && (o > e && (e = o), e > n && (e = n))), this.displayBtn = void 0 !== t || void 0 !== e, this.setExtremes(t, e, !1, void 0, {
                        trigger: "zoom"
                    })), !0
                },
                setAxisSize: function() {
                    var t = this.chart,
                        e = this.options,
                        i = e.offsetLeft || 0,
                        s = this.horiz,
                        n = S(e.width, t.plotWidth - i + (e.offsetRight || 0)),
                        o = S(e.height, t.plotHeight),
                        r = S(e.top, t.plotTop),
                        e = S(e.left, t.plotLeft + i),
                        i = /%$/;
                    i.test(o) && (o = Math.round(parseFloat(o) / 100 * t.plotHeight)), i.test(r) && (r = Math.round(parseFloat(r) / 100 * t.plotHeight + t.plotTop)), this.left = e, this.top = r, this.width = n, this.height = o, this.bottom = t.chartHeight - o - r, this.right = t.chartWidth - n - e, this.len = Math.max(s ? n : o, 0), this.pos = s ? e : r
                },
                getExtremes: function() {
                    var t = this.isLog,
                        e = this.lin2log;
                    return {
                        min: t ? a(e(this.min)) : this.min,
                        max: t ? a(e(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax
                    }
                },
                getThreshold: function(t) {
                    var e = this.isLog,
                        i = this.lin2log,
                        s = e ? i(this.min) : this.min,
                        e = e ? i(this.max) : this.max;
                    return null === t ? t = s : s > t ? t = s : t > e && (t = e), this.translate(t, 0, 1, 0, 1)
                },
                autoLabelAlign: function(t) {
                    return t = (S(t, 0) - 90 * this.side + 720) % 360, t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
                },
                tickSize: function(t) {
                    var e = this.options,
                        i = e[t + "Length"],
                        s = S(e[t + "Width"], "tick" === t && this.isXAxis ? 1 : 0);
                    return s && i ? ("inside" === e[t + "Position"] && (i = -i), [i, s]) : void 0
                },
                labelMetrics: function() {
                    return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
                },
                unsquish: function() {
                    var t, e, i, s = this.options.labels,
                        n = this.horiz,
                        o = this.tickInterval,
                        r = o,
                        a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / o),
                        h = s.rotation,
                        d = this.labelMetrics(),
                        u = Number.MAX_VALUE,
                        f = function(t) {
                            return t /= a || 1, t = t > 1 ? Math.ceil(t) : 1, t * o
                        };
                    return n ? (i = !s.staggerLines && !s.step && (l(h) ? [h] : a < S(s.autoRotationLimit, 80) && s.autoRotation)) && p(i, function(i) {
                        var s;
                        (i === h || i && i >= -90 && 90 >= i) && (e = f(Math.abs(d.h / Math.sin(c * i))), s = e + Math.abs(i / 360), u > s && (u = s, t = i, r = e))
                    }) : s.step || (r = f(d.h)), this.autoRotation = i, this.labelRotation = S(t, h), r
                },
                getSlotWidth: function() {
                    var t = this.chart,
                        e = this.horiz,
                        i = this.options.labels,
                        s = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                        n = t.margin[3];
                    return e && 2 > (i.step || 0) && !i.rotation && (this.staggerLines || 1) * t.plotWidth / s || !e && (n && n - t.spacing[3] || .33 * t.chartWidth)
                },
                renderUnsquish: function() {
                    var t, e, i, s = this.chart,
                        n = s.renderer,
                        o = this.tickPositions,
                        r = this.ticks,
                        a = this.options.labels,
                        h = this.horiz,
                        l = this.getSlotWidth(),
                        c = Math.max(1, Math.round(l - 2 * (a.padding || 5))),
                        d = {},
                        u = this.labelMetrics(),
                        f = a.style && a.style.textOverflow,
                        g = 0;
                    if (k(a.rotation) || (d.rotation = a.rotation || 0), p(o, function(t) {
                            (t = r[t]) && t.labelLength > g && (g = t.labelLength)
                        }), this.maxLabelLength = g, this.autoRotation) g > c && g > u.h ? d.rotation = this.labelRotation : this.labelRotation = 0;
                    else if (l && (t = {
                            width: c + "px"
                        }, !f))
                        for (t.textOverflow = "clip", e = o.length; !h && e--;) i = o[e], (c = r[i].label) && (c.styles && "ellipsis" === c.styles.textOverflow ? c.css({
                            textOverflow: "clip"
                        }) : r[i].labelLength > l && c.css({
                            width: l + "px"
                        }), c.getBBox().height > this.len / o.length - (u.h - u.f) && (c.specCss = {
                            textOverflow: "ellipsis"
                        }));
                    d.rotation && (t = {
                        width: (g > .5 * s.chartHeight ? .33 * s.chartHeight : s.chartHeight) + "px"
                    }, f || (t.textOverflow = "ellipsis")), (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation)) && (d.align = this.labelAlign), p(o, function(e) {
                        var i = (e = r[e]) && e.label;
                        i && (i.attr(d), t && i.css(M(t, i.specCss)), delete i.specCss, e.rotation = d.rotation)
                    }), this.tickRotCorr = n.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
                },
                hasData: function() {
                    return this.hasVisibleSeries || l(this.min) && l(this.max) && !!this.tickPositions
                },
                addTitle: function(t) {
                    var e, i = this.chart.renderer,
                        s = this.horiz,
                        n = this.opposite,
                        o = this.options.title;
                    this.axisTitle || ((e = o.textAlign) || (e = (s ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: n ? "right" : "left",
                        middle: "center",
                        high: n ? "left" : "right"
                    })[o.align]), this.axisTitle = i.text(o.text, 0, 0, o.useHTML).attr({
                        zIndex: 7,
                        rotation: o.rotation || 0,
                        align: e
                    }).addClass("highcharts-axis-title").css(o.style).add(this.axisGroup), this.axisTitle.isNew = !0), this.axisTitle[t ? "show" : "hide"](!0)
                },
                getOffset: function() {
                    var t, e, i, s, n = this,
                        o = n.chart,
                        r = o.renderer,
                        a = n.options,
                        h = n.tickPositions,
                        c = n.ticks,
                        d = n.horiz,
                        u = n.side,
                        f = o.inverted ? [1, 0, 3, 2][u] : u,
                        g = 0,
                        m = 0,
                        v = a.title,
                        x = a.labels,
                        y = 0,
                        b = o.axisOffset,
                        o = o.clipOffset,
                        k = [-1, 1, 1, -1][u],
                        M = a.className,
                        w = n.axisParent,
                        T = this.tickSize("tick");
                    if (t = n.hasData(), n.showAxis = e = t || S(a.showEmpty, !0), n.staggerLines = n.horiz && x.staggerLines, n.axisGroup || (n.gridGroup = r.g("grid").attr({
                            zIndex: a.gridZIndex || 1
                        }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (M || "")).add(w), n.axisGroup = r.g("axis").attr({
                            zIndex: a.zIndex || 2
                        }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (M || "")).add(w), n.labelGroup = r.g("axis-labels").attr({
                            zIndex: x.zIndex || 7
                        }).addClass("highcharts-" + n.coll.toLowerCase() + "-labels " + (M || "")).add(w)), t || n.isLinked) p(h, function(t) {
                        c[t] ? c[t].addLabel() : c[t] = new L(n, t)
                    }), n.renderUnsquish(), !1 === x.reserveSpace || 0 !== u && 2 !== u && {
                        1: "left",
                        3: "right"
                    }[u] !== n.labelAlign && "center" !== n.labelAlign || p(h, function(t) {
                        y = Math.max(c[t].getLabelSize(), y)
                    }), n.staggerLines && (y *= n.staggerLines, n.labelOffset = y * (n.opposite ? -1 : 1));
                    else
                        for (s in c) c[s].destroy(), delete c[s];
                    v && v.text && !1 !== v.enabled && (n.addTitle(e), e && (g = n.axisTitle.getBBox()[d ? "height" : "width"], i = v.offset, m = l(i) ? 0 : S(v.margin, d ? 5 : 10))), n.renderLine(), n.offset = k * S(a.offset, b[u]), n.tickRotCorr = n.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, r = 0 === u ? -n.labelMetrics().h : 2 === u ? n.tickRotCorr.y : 0, m = Math.abs(y) + m, y && (m = m - r + k * (d ? S(x.y, n.tickRotCorr.y + 8 * k) : x.x)), n.axisTitleMargin = S(i, m), b[u] = Math.max(b[u], n.axisTitleMargin + g + k * n.offset, m, t && h.length && T ? T[0] : 0), a = a.offset ? 0 : 2 * Math.floor(n.axisLine.strokeWidth() / 2), o[f] = Math.max(o[f], a)
                },
                getLinePath: function(t) {
                    var e = this.chart,
                        i = this.opposite,
                        s = this.offset,
                        n = this.horiz,
                        o = this.left + (i ? this.width : 0) + s,
                        s = e.chartHeight - this.bottom - (i ? this.height : 0) + s;
                    return i && (t *= -1), e.renderer.crispLine(["M", n ? this.left : o, n ? s : this.top, "L", n ? e.chartWidth - this.right : o, n ? s : e.chartHeight - this.bottom], t)
                },
                renderLine: function() {
                    this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
                },
                getTitlePosition: function() {
                    var t = this.horiz,
                        e = this.left,
                        i = this.top,
                        s = this.len,
                        n = this.options.title,
                        o = t ? e : i,
                        r = this.opposite,
                        a = this.offset,
                        h = n.x || 0,
                        l = n.y || 0,
                        c = this.chart.renderer.fontMetrics(n.style && n.style.fontSize, this.axisTitle).f,
                        s = {
                            low: o + (t ? 0 : s),
                            middle: o + s / 2,
                            high: o + (t ? s : 0)
                        }[n.align],
                        e = (t ? i + this.height : e) + (t ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? c : 0);
                    return {
                        x: t ? s + h : e + (r ? this.width : 0) + a + h,
                        y: t ? e + l - (r ? this.height : 0) + a : s + l
                    }
                },
                render: function() {
                    var t, e, s = this,
                        n = s.chart,
                        o = n.renderer,
                        r = s.options,
                        a = s.isLog,
                        h = s.lin2log,
                        l = s.isLinked,
                        c = s.tickPositions,
                        d = s.axisTitle,
                        u = s.ticks,
                        f = s.minorTicks,
                        g = s.alternateBands,
                        m = r.stackLabels,
                        v = r.alternateGridColor,
                        x = s.tickmarkOffset,
                        y = s.axisLine,
                        k = n.hasRendered && b(s.oldMin),
                        M = s.showAxis,
                        w = i(o.globalAnimation);
                    s.labelEdge.length = 0, s.overlap = !1, p([u, f, g], function(t) {
                        for (var e in t) t[e].isActive = !1
                    }), (s.hasData() || l) && (s.minorTickInterval && !s.categories && p(s.getMinorTickPositions(), function(t) {
                        f[t] || (f[t] = new L(s, t, "minor")), k && f[t].isNew && f[t].render(null, !0), f[t].render(null, !1, 1)
                    }), c.length && (p(c, function(t, e) {
                        (!l || t >= s.min && t <= s.max) && (u[t] || (u[t] = new L(s, t)), k && u[t].isNew && u[t].render(e, !0, .1), u[t].render(e))
                    }), x && (0 === s.min || s.single) && (u[-1] || (u[-1] = new L(s, -1, null, !0)), u[-1].render(-1))), v && p(c, function(i, o) {
                        e = void 0 !== c[o + 1] ? c[o + 1] + x : s.max - x, 0 === o % 2 && i < s.max && e <= s.max + (n.polar ? -x : x) && (g[i] || (g[i] = new T(s)), t = i + x, g[i].options = {
                            from: a ? h(t) : t,
                            to: a ? h(e) : e,
                            color: v
                        }, g[i].render(), g[i].isActive = !0)
                    }), s._addedPlotLB || (p((r.plotLines || []).concat(r.plotBands || []), function(t) {
                        s.addPlotBandOrLine(t)
                    }), s._addedPlotLB = !0)), p([u, f, g], function(t) {
                        var e, i, s = [],
                            o = w.duration;
                        for (e in t) t[e].isActive || (t[e].render(e, !1, 0), t[e].isActive = !1, s.push(e));
                        P(function() {
                            for (i = s.length; i--;) t[s[i]] && !t[s[i]].isActive && (t[s[i]].destroy(), delete t[s[i]])
                        }, t !== g && n.hasRendered && o ? o : 0)
                    }), y && (y[y.isPlaced ? "animate" : "attr"]({
                        d: this.getLinePath(y.strokeWidth())
                    }), y.isPlaced = !0, y[M ? "show" : "hide"](!0)), d && M && (d[d.isNew ? "attr" : "animate"](s.getTitlePosition()), d.isNew = !1), m && m.enabled && s.renderStackTotals(), s.isDirty = !1
                },
                redraw: function() {
                    this.visible && (this.render(), p(this.plotLinesAndBands, function(t) {
                        t.render()
                    })), p(this.series, function(t) {
                        t.isDirty = !0
                    })
                },
                keepProps: "extKey hcEvents names series userMax userMin".split(" "),
                destroy: function(t) {
                    var e, i, s = this,
                        n = s.stacks,
                        o = s.plotLinesAndBands;
                    t || A(s);
                    for (e in n) d(n[e]), n[e] = null;
                    if (p([s.ticks, s.minorTicks, s.alternateBands], function(t) {
                            d(t)
                        }), o)
                        for (t = o.length; t--;) o[t].destroy();
                    p("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(t) {
                        s[t] && (s[t] = s[t].destroy())
                    });
                    for (i in s) s.hasOwnProperty(i) && -1 === x(i, s.keepProps) && delete s[i]
                },
                drawCrosshair: function(t, e) {
                    var i, s, n = this.crosshair,
                        o = S(n.snap, !0),
                        a = this.cross;
                    t || (t = this.cross && this.cross.e), this.crosshair && !1 !== (l(e) || !o) ? (o ? l(e) && (s = this.isXAxis ? e.plotX : this.len - e.plotY) : s = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos), l(s) && (i = this.getPlotLinePath(e && (this.isXAxis ? e.x : S(e.stackY, e.y)), null, null, null, s) || null), l(i) ? (e = this.categories && !this.isRadial, a || (this.cross = a = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (e ? "category " : "thin ") + n.className).attr({
                        zIndex: S(n.zIndex, 2)
                    }).add(), a.attr({
                        stroke: n.color || (e ? r("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": S(n.width, 1)
                    }), n.dashStyle && a.attr({
                        dashstyle: n.dashStyle
                    })), a.show().attr({
                        d: i
                    }), e && !n.width && a.attr({
                        "stroke-width": this.transA
                    }), this.cross.e = t) : this.hideCrosshair()) : this.hideCrosshair()
                },
                hideCrosshair: function() {
                    this.cross && this.cross.hide()
                }
            }, u(t.Axis.prototype, o)
        }(t),
        function(t) {
            var e = t.Axis,
                i = t.Date,
                s = t.dateFormat,
                n = t.defaultOptions,
                o = t.defined,
                r = t.each,
                a = t.extend,
                h = t.getMagnitude,
                l = t.getTZOffset,
                c = t.normalizeTickInterval,
                d = t.pick,
                p = t.timeUnits;
            e.prototype.getTimeTicks = function(t, e, h, c) {
                var u, f, g = [],
                    m = {},
                    v = n.global.useUTC,
                    x = new i(e - l(e)),
                    y = i.hcMakeTime,
                    b = t.unitRange,
                    k = t.count;
                if (o(e)) {
                    x[i.hcSetMilliseconds](b >= p.second ? 0 : k * Math.floor(x.getMilliseconds() / k)), b >= p.second && x[i.hcSetSeconds](b >= p.minute ? 0 : k * Math.floor(x.getSeconds() / k)), b >= p.minute && x[i.hcSetMinutes](b >= p.hour ? 0 : k * Math.floor(x[i.hcGetMinutes]() / k)), b >= p.hour && x[i.hcSetHours](b >= p.day ? 0 : k * Math.floor(x[i.hcGetHours]() / k)), b >= p.day && x[i.hcSetDate](b >= p.month ? 1 : k * Math.floor(x[i.hcGetDate]() / k)), b >= p.month && (x[i.hcSetMonth](b >= p.year ? 0 : k * Math.floor(x[i.hcGetMonth]() / k)), u = x[i.hcGetFullYear]()), b >= p.year && x[i.hcSetFullYear](u - u % k), b === p.week && x[i.hcSetDate](x[i.hcGetDate]() - x[i.hcGetDay]() + d(c, 1)), u = x[i.hcGetFullYear](), c = x[i.hcGetMonth]();
                    var M = x[i.hcGetDate](),
                        w = x[i.hcGetHours]();
                    for ((i.hcTimezoneOffset || i.hcGetTimezoneOffset) && (f = (!v || !!i.hcGetTimezoneOffset) && (h - e > 4 * p.month || l(e) !== l(h)), x = x.getTime(), x = new i(x + l(x))), v = x.getTime(), e = 1; h > v;) g.push(v), v = b === p.year ? y(u + e * k, 0) : b === p.month ? y(u, c + e * k) : !f || b !== p.day && b !== p.week ? f && b === p.hour ? y(u, c, M, w + e * k) : v + b * k : y(u, c, M + e * k * (b === p.day ? 1 : 7)), e++;
                    g.push(v), b <= p.hour && r(g, function(t) {
                        "000000000" === s("%H%M%S%L", t) && (m[t] = "day")
                    })
                }
                return g.info = a(t, {
                    higherRanks: m,
                    totalRange: b * k
                }), g
            }, e.prototype.normalizeTimeTickInterval = function(t, e) {
                var i = e || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ];
                e = i[i.length - 1];
                var s, n = p[e[0]],
                    o = e[1];
                for (s = 0; s < i.length && (e = i[s], n = p[e[0]], o = e[1], !(i[s + 1] && t <= (n * o[o.length - 1] + p[i[s + 1][0]]) / 2)); s++);
                return n === p.year && 5 * n > t && (o = [1, 2, 5]), t = c(t / n, o, "year" === e[0] ? Math.max(h(t / n), 1) : 1), {
                    unitRange: n,
                    count: t,
                    unitName: e[0]
                }
            }
        }(t),
        function(t) {
            var e = t.Axis,
                i = t.getMagnitude,
                s = t.map,
                n = t.normalizeTickInterval,
                o = t.pick;
            e.prototype.getLogTickPositions = function(t, e, r, a) {
                var h = this.options,
                    l = this.len,
                    c = this.lin2log,
                    d = this.log2lin,
                    p = [];
                if (a || (this._minorAutoInterval = null), t >= .5) t = Math.round(t), p = this.getLinearTickPositions(t, e, r);
                else if (t >= .08)
                    for (var u, f, g, m, v, l = Math.floor(e), h = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; r + 1 > l && !v; l++)
                        for (f = h.length, u = 0; f > u && !v; u++) g = d(c(l) * h[u]), g > e && (!a || r >= m) && void 0 !== m && p.push(m), m > r && (v = !0), m = g;
                else e = c(e), r = c(r), t = h[a ? "minorTickInterval" : "tickInterval"], t = o("auto" === t ? null : t, this._minorAutoInterval, h.tickPixelInterval / (a ? 5 : 1) * (r - e) / ((a ? l / this.tickPositions.length : l) || 1)), t = n(t, null, i(t)), p = s(this.getLinearTickPositions(t, e, r), d), a || (this._minorAutoInterval = t / 5);
                return a || (this.tickInterval = t), p
            }, e.prototype.log2lin = function(t) {
                return Math.log(t) / Math.LN10
            }, e.prototype.lin2log = function(t) {
                return Math.pow(10, t)
            }
        }(t),
        function(t) {
            var e = t.dateFormat,
                i = t.each,
                s = t.extend,
                n = t.format,
                o = t.isNumber,
                r = t.map,
                a = t.merge,
                h = t.pick,
                l = t.splat,
                c = t.syncTimeout,
                d = t.timeUnits;
            t.Tooltip = function() {
                this.init.apply(this, arguments)
            }, t.Tooltip.prototype = {
                init: function(t, e) {
                    this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                        x: 0,
                        y: 0
                    }, this.isHidden = !0, this.split = e.split && !t.inverted, this.shared = e.shared || this.split
                },
                cleanSplit: function(t) {
                    i(this.chart.series, function(e) {
                        var i = e && e.tt;
                        i && (!i.isActive || t ? e.tt = i.destroy() : i.isActive = !1)
                    })
                },
                getLabel: function() {
                    var t = this.chart.renderer,
                        e = this.options;
                    return this.label || (this.split ? this.label = t.g("tooltip") : (this.label = t.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                        padding: e.padding,
                        r: e.borderRadius
                    }), this.label.attr({
                        fill: e.backgroundColor,
                        "stroke-width": e.borderWidth
                    }).css(e.style).shadow(e.shadow)), this.label.attr({
                        zIndex: 8
                    }).add()), this.label
                },
                update: function(t) {
                    this.destroy(), this.init(this.chart, a(!0, this.options, t))
                },
                destroy: function() {
                    this.label && (this.label = this.label.destroy()), this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
                },
                move: function(t, e, i, n) {
                    var o = this,
                        r = o.now,
                        a = !1 !== o.options.animation && !o.isHidden && (1 < Math.abs(t - r.x) || 1 < Math.abs(e - r.y)),
                        h = o.followPointer || 1 < o.len;
                    s(r, {
                        x: a ? (2 * r.x + t) / 3 : t,
                        y: a ? (r.y + e) / 2 : e,
                        anchorX: h ? void 0 : a ? (2 * r.anchorX + i) / 3 : i,
                        anchorY: h ? void 0 : a ? (r.anchorY + n) / 2 : n
                    }), o.getLabel().attr(r), a && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                        o && o.move(t, e, i, n)
                    }, 32))
                },
                hide: function(t) {
                    var e = this;
                    clearTimeout(this.hideTimer), t = h(t, this.options.hideDelay, 500), this.isHidden || (this.hideTimer = c(function() {
                        e.getLabel()[t ? "fadeOut" : "hide"](), e.isHidden = !0
                    }, t))
                },
                getAnchor: function(t, e) {
                    var s, n, o, a = this.chart,
                        h = a.inverted,
                        c = a.plotTop,
                        d = a.plotLeft,
                        p = 0,
                        u = 0;
                    return t = l(t), s = t[0].tooltipPos, this.followPointer && e && (void 0 === e.chartX && (e = a.pointer.normalize(e)), s = [e.chartX - a.plotLeft, e.chartY - c]), s || (i(t, function(t) {
                        n = t.series.yAxis, o = t.series.xAxis, p += t.plotX + (!h && o ? o.left - d : 0), u += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!h && n ? n.top - c : 0)
                    }), p /= t.length, u /= t.length, s = [h ? a.plotWidth - u : p, this.shared && !h && 1 < t.length && e ? e.chartY - c : h ? a.plotHeight - p : u]), r(s, Math.round)
                },
                getPosition: function(t, e, i) {
                    var s, n = this.chart,
                        o = this.distance,
                        r = {},
                        a = i.h || 0,
                        l = ["y", n.chartHeight, e, i.plotY + n.plotTop, n.plotTop, n.plotTop + n.plotHeight],
                        c = ["x", n.chartWidth, t, i.plotX + n.plotLeft, n.plotLeft, n.plotLeft + n.plotWidth],
                        d = !this.followPointer && h(i.ttBelow, !n.inverted == !!i.negative),
                        p = function(t, e, i, s, n, h) {
                            var l = s - o > i,
                                c = e > s + o + i,
                                p = s - o - i;
                            if (s += o, d && c) r[t] = s;
                            else if (!d && l) r[t] = p;
                            else if (l) r[t] = Math.min(h - i, 0 > p - a ? p : p - a);
                            else {
                                if (!c) return !1;
                                r[t] = Math.max(n, s + a + i > e ? s : s + a)
                            }
                        },
                        u = function(t, e, i, s) {
                            var n;
                            return o > s || s > e - o ? n = !1 : r[t] = i / 2 > s ? 1 : s > e - i / 2 ? e - i - 2 : s - i / 2, n
                        },
                        f = function(t) {
                            var e = l;
                            l = c, c = e, s = t
                        },
                        g = function() {
                            !1 !== p.apply(0, l) ? !1 !== u.apply(0, c) || s || (f(!0), g()) : s ? r.x = r.y = 0 : (f(!0), g())
                        };
                    return (n.inverted || 1 < this.len) && f(), g(), r
                },
                defaultFormatter: function(t) {
                    var e, i = this.points || l(this);
                    return e = [t.tooltipFooterHeaderFormatter(i[0])], e = e.concat(t.bodyFormatter(i)), e.push(t.tooltipFooterHeaderFormatter(i[0], !0)), e
                },
                refresh: function(t, e) {
                    var s, n, o, r = this.chart,
                        a = this.options,
                        c = {},
                        d = [];
                    s = a.formatter || this.defaultFormatter;
                    var c = r.hoverPoints,
                        p = this.shared;
                    clearTimeout(this.hideTimer), this.followPointer = l(t)[0].series.tooltipOptions.followPointer, o = this.getAnchor(t, e), e = o[0], n = o[1], !p || t.series && t.series.noSharedTooltip ? c = t.getLabelConfig() : (r.hoverPoints = t, c && i(c, function(t) {
                        t.setState()
                    }), i(t, function(t) {
                        t.setState("hover"), d.push(t.getLabelConfig())
                    }), c = {
                        x: t[0].category,
                        y: t[0].y
                    }, c.points = d, this.len = d.length, t = t[0]), c = s.call(c, this), p = t.series, this.distance = h(p.tooltipOptions.distance, 16), !1 === c ? this.hide() : (s = this.getLabel(), this.isHidden && s.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(c, r.hoverPoints) : (s.attr({
                        text: c && c.join ? c.join("") : c
                    }), s.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + h(t.colorIndex, p.colorIndex)), s.attr({
                        stroke: a.borderColor || t.color || p.color || "#666666"
                    }), this.updatePosition({
                        plotX: e,
                        plotY: n,
                        negative: t.negative,
                        ttBelow: t.ttBelow,
                        h: o[2] || 0
                    })), this.isHidden = !1)
                },
                renderSplit: function(e, s) {
                    var n, o = this,
                        r = [],
                        a = this.chart,
                        l = a.renderer,
                        c = !0,
                        d = this.options,
                        p = this.getLabel();
                    i(e.slice(0, e.length - 1), function(t, e) {
                        e = s[e - 1] || {
                            isHeader: !0,
                            plotX: s[0].plotX
                        };
                        var i = e.series || o,
                            u = i.tt,
                            f = e.series || {},
                            g = "highcharts-color-" + h(e.colorIndex, f.colorIndex, "none");
                        u || (i.tt = u = l.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + g).attr({
                            padding: d.padding,
                            r: d.borderRadius,
                            fill: d.backgroundColor,
                            stroke: e.color || f.color || "#333333",
                            "stroke-width": d.borderWidth
                        }).add(p)), u.isActive = !0, u.attr({
                            text: t
                        }), u.css(d.style), t = u.getBBox(), f = t.width + u.strokeWidth(), e.isHeader ? (n = t.height, f = Math.max(0, Math.min(e.plotX + a.plotLeft - f / 2, a.chartWidth - f))) : f = e.plotX + a.plotLeft - h(d.distance, 16) - f, 0 > f && (c = !1), t = (e.series && e.series.yAxis && e.series.yAxis.pos) + (e.plotY || 0), t -= a.plotTop, r.push({
                            target: e.isHeader ? a.plotHeight + n : t,
                            rank: e.isHeader ? 1 : 0,
                            size: i.tt.getBBox().height + 1,
                            point: e,
                            x: f,
                            tt: u
                        })
                    }), this.cleanSplit(), t.distribute(r, a.plotHeight + n), i(r, function(t) {
                        var e = t.point,
                            i = e.series;
                        t.tt.attr({
                            visibility: void 0 === t.pos ? "hidden" : "inherit",
                            x: c || e.isHeader ? t.x : e.plotX + a.plotLeft + h(d.distance, 16),
                            y: t.pos + a.plotTop,
                            anchorX: e.isHeader ? e.plotX + a.plotLeft : e.plotX + i.xAxis.pos,
                            anchorY: e.isHeader ? t.pos + a.plotTop - 15 : e.plotY + i.yAxis.pos
                        })
                    })
                },
                updatePosition: function(t) {
                    var e = this.chart,
                        i = this.getLabel(),
                        i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
                    this.move(Math.round(i.x), Math.round(i.y || 0), t.plotX + e.plotLeft, t.plotY + e.plotTop)
                },
                getXDateFormat: function(t, i, s) {
                    var n;
                    i = i.dateTimeLabelFormats;
                    var o, r, a = s && s.closestPointRange,
                        h = {
                            millisecond: 15,
                            second: 12,
                            minute: 9,
                            hour: 6,
                            day: 3
                        },
                        l = "millisecond";
                    if (a) {
                        r = e("%m-%d %H:%M:%S.%L", t.x);
                        for (o in d) {
                            if (a === d.week && +e("%w", t.x) === s.options.startOfWeek && "00:00:00.000" === r.substr(6)) {
                                o = "week";
                                break
                            }
                            if (d[o] > a) {
                                o = l;
                                break
                            }
                            if (h[o] && r.substr(h[o]) !== "01-01 00:00:00.000".substr(h[o])) break;
                            "week" !== o && (l = o)
                        }
                        o && (n = i[o])
                    } else n = i.day;
                    return n || i.year
                },
                tooltipFooterHeaderFormatter: function(t, e) {
                    var i = e ? "footer" : "header";
                    e = t.series;
                    var s = e.tooltipOptions,
                        r = s.xDateFormat,
                        a = e.xAxis,
                        h = a && "datetime" === a.options.type && o(t.key),
                        i = s[i + "Format"];
                    return h && !r && (r = this.getXDateFormat(t, s, a)), h && r && (i = i.replace("{point.key}", "{point.key:" + r + "}")), n(i, {
                        point: t,
                        series: e
                    })
                },
                bodyFormatter: function(t) {
                    return r(t, function(t) {
                        var e = t.series.tooltipOptions;
                        return (e.pointFormatter || t.point.tooltipFormatter).call(t.point, e.pointFormat)
                    })
                }
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.attr,
                s = t.charts,
                n = t.color,
                o = t.css,
                r = t.defined,
                a = t.doc,
                h = t.each,
                l = t.extend,
                c = t.fireEvent,
                d = t.offset,
                p = t.pick,
                u = t.removeEvent,
                f = t.splat,
                g = t.Tooltip,
                m = t.win;
            t.Pointer = function(t, e) {
                this.init(t, e)
            }, t.Pointer.prototype = {
                init: function(t, e) {
                    this.options = e, this.chart = t, this.runChartClick = e.chart.events && !!e.chart.events.click, this.pinchDown = [], this.lastValidTouch = {}, g && e.tooltip.enabled && (t.tooltip = new g(t, e.tooltip), this.followTouchMove = p(e.tooltip.followTouchMove, !0)), this.setDOMEvents()
                },
                zoomOption: function(t) {
                    var e = this.chart,
                        i = e.options.chart,
                        s = i.zoomType || "",
                        e = e.inverted;
                    /touch/.test(t.type) && (s = p(i.pinchType, s)), this.zoomX = t = /x/.test(s), this.zoomY = s = /y/.test(s), this.zoomHor = t && !e || s && e, this.zoomVert = s && !e || t && e, this.hasZoom = t || s
                },
                normalize: function(t, e) {
                    var i, s;
                    return t = t || m.event, t.target || (t.target = t.srcElement), s = t.touches ? t.touches.length ? t.touches.item(0) : t.changedTouches[0] : t, e || (this.chartPosition = e = d(this.chart.container)), void 0 === s.pageX ? (i = Math.max(t.x, t.clientX - e.left), e = t.y) : (i = s.pageX - e.left, e = s.pageY - e.top), l(t, {
                        chartX: Math.round(i),
                        chartY: Math.round(e)
                    })
                },
                getCoordinates: function(t) {
                    var e = {
                        xAxis: [],
                        yAxis: []
                    };
                    return h(this.chart.axes, function(i) {
                        e[i.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: i,
                            value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                        })
                    }), e
                },
                runPointActions: function(i) {
                    var n, o, r, l, c = this.chart,
                        d = c.series,
                        u = c.tooltip,
                        f = u ? u.shared : !1,
                        g = !0,
                        m = c.hoverPoint,
                        v = c.hoverSeries,
                        x = [];
                    if (!f && !v)
                        for (n = 0; n < d.length; n++)(d[n].directTouch || !d[n].options.stickyTracking) && (d = []);
                    if (v && (f ? v.noSharedTooltip : v.directTouch) && m ? x = [m] : (f || !v || v.options.stickyTracking || (d = [v]), h(d, function(t) {
                            o = t.noSharedTooltip && f, r = !f && t.directTouch, t.visible && !o && !r && p(t.options.enableMouseTracking, !0) && (l = t.searchPoint(i, !o && 1 === t.kdDimensions)) && l.series && x.push(l)
                        }), x.sort(function(t, e) {
                            var i = t.distX - e.distX,
                                s = t.dist - e.dist,
                                n = e.series.group.zIndex - t.series.group.zIndex;
                            return 0 !== i && f ? i : 0 !== s ? s : 0 !== n ? n : t.series.index > e.series.index ? -1 : 1
                        })), f)
                        for (n = x.length; n--;)(x[n].x !== x[0].x || x[n].series.noSharedTooltip) && x.splice(n, 1);
                    if (x[0] && (x[0] !== this.prevKDPoint || u && u.isHidden)) {
                        if (f && !x[0].series.noSharedTooltip) {
                            for (n = 0; n < x.length; n++) x[n].onMouseOver(i, x[n] !== (v && v.directTouch && m || x[0]));
                            x.length && u && u.refresh(x.sort(function(t, e) {
                                return t.series.index - e.series.index
                            }), i)
                        } else u && u.refresh(x[0], i), v && v.directTouch || x[0].onMouseOver(i);
                        this.prevKDPoint = x[0], g = !1
                    }
                    g && (d = v && v.tooltipOptions.followPointer, u && d && !u.isHidden && (d = u.getAnchor([{}], i), u.updatePosition({
                        plotX: d[0],
                        plotY: d[1]
                    }))), this.unDocMouseMove || (this.unDocMouseMove = e(a, "mousemove", function(e) {
                        s[t.hoverChartIndex] && s[t.hoverChartIndex].pointer.onDocumentMouseMove(e)
                    })), h(f ? x : [p(m, x[0])], function(t) {
                        h(c.axes, function(e) {
                            (!t || t.series && t.series[e.coll] === e) && e.drawCrosshair(i, t)
                        })
                    })
                },
                reset: function(t, e) {
                    var i = this.chart,
                        s = i.hoverSeries,
                        n = i.hoverPoint,
                        o = i.hoverPoints,
                        r = i.tooltip,
                        a = r && r.shared ? o : n;
                    t && a && h(f(a), function(e) {
                        e.series.isCartesian && void 0 === e.plotX && (t = !1)
                    }), t ? r && a && (r.refresh(a), n && (n.setState(n.state, !0), h(i.axes, function(t) {
                        t.crosshair && t.drawCrosshair(null, n)
                    }))) : (n && n.onMouseOut(), o && h(o, function(t) {
                        t.setState()
                    }), s && s.onMouseOut(), r && r.hide(e), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), h(i.axes, function(t) {
                        t.hideCrosshair()
                    }), this.hoverX = this.prevKDPoint = i.hoverPoints = i.hoverPoint = null)
                },
                scaleGroups: function(t, e) {
                    var i, s = this.chart;
                    h(s.series, function(n) {
                        i = t || n.getPlotBox(), n.xAxis && n.xAxis.zoomEnabled && n.group && (n.group.attr(i), n.markerGroup && (n.markerGroup.attr(i), n.markerGroup.clip(e ? s.clipRect : null)), n.dataLabelsGroup && n.dataLabelsGroup.attr(i))
                    }), s.clipRect.attr(e || s.clipBox)
                },
                dragStart: function(t) {
                    var e = this.chart;
                    e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
                },
                drag: function(t) {
                    var e, i = this.chart,
                        s = i.options.chart,
                        o = t.chartX,
                        r = t.chartY,
                        a = this.zoomHor,
                        h = this.zoomVert,
                        l = i.plotLeft,
                        c = i.plotTop,
                        d = i.plotWidth,
                        p = i.plotHeight,
                        u = this.selectionMarker,
                        f = this.mouseDownX,
                        g = this.mouseDownY,
                        m = s.panKey && t[s.panKey + "Key"];
                    u && u.touch || (l > o ? o = l : o > l + d && (o = l + d), c > r ? r = c : r > c + p && (r = c + p), this.hasDragged = Math.sqrt(Math.pow(f - o, 2) + Math.pow(g - r, 2)), 10 < this.hasDragged && (e = i.isInsidePlot(f - l, g - c), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !m && !u && (this.selectionMarker = u = i.renderer.rect(l, c, a ? 1 : d, h ? 1 : p, 0).attr({
                        fill: s.selectionMarkerFill || n("#335cad").setOpacity(.25).get(),
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), u && a && (o -= f, u.attr({
                        width: Math.abs(o),
                        x: (o > 0 ? 0 : o) + f
                    })), u && h && (o = r - g, u.attr({
                        height: Math.abs(o),
                        y: (o > 0 ? 0 : o) + g
                    })), e && !u && s.panning && i.pan(t, s.panning)))
                },
                drop: function(t) {
                    var e = this,
                        i = this.chart,
                        s = this.hasPinched;
                    if (this.selectionMarker) {
                        var n, a = {
                                originalEvent: t,
                                xAxis: [],
                                yAxis: []
                            },
                            d = this.selectionMarker,
                            p = d.attr ? d.attr("x") : d.x,
                            u = d.attr ? d.attr("y") : d.y,
                            f = d.attr ? d.attr("width") : d.width,
                            g = d.attr ? d.attr("height") : d.height;
                        (this.hasDragged || s) && (h(i.axes, function(i) {
                            if (i.zoomEnabled && r(i.min) && (s || e[{
                                    xAxis: "zoomX",
                                    yAxis: "zoomY"
                                }[i.coll]])) {
                                var o = i.horiz,
                                    h = "touchend" === t.type ? i.minPixelPadding : 0,
                                    l = i.toValue((o ? p : u) + h),
                                    o = i.toValue((o ? p + f : u + g) - h);
                                a[i.coll].push({
                                    axis: i,
                                    min: Math.min(l, o),
                                    max: Math.max(l, o)
                                }), n = !0
                            }
                        }), n && c(i, "selection", a, function(t) {
                            i.zoom(l(t, s ? {
                                animation: !1
                            } : null))
                        })), this.selectionMarker = this.selectionMarker.destroy(), s && this.scaleGroups()
                    }
                    i && (o(i.container, {
                        cursor: i._cursor
                    }), i.cancelClick = 10 < this.hasDragged, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                },
                onContainerMouseDown: function(t) {
                    t = this.normalize(t), this.zoomOption(t), t.preventDefault && t.preventDefault(), this.dragStart(t)
                },
                onDocumentMouseUp: function(e) {
                    s[t.hoverChartIndex] && s[t.hoverChartIndex].pointer.drop(e)
                },
                onDocumentMouseMove: function(t) {
                    var e = this.chart,
                        i = this.chartPosition;
                    t = this.normalize(t, i), !i || this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || this.reset()
                },
                onContainerMouseLeave: function(e) {
                    var i = s[t.hoverChartIndex];
                    i && (e.relatedTarget || e.toElement) && (i.pointer.reset(), i.pointer.chartPosition = null)
                },
                onContainerMouseMove: function(e) {
                    var i = this.chart;
                    r(t.hoverChartIndex) && s[t.hoverChartIndex] && s[t.hoverChartIndex].mouseIsDown || (t.hoverChartIndex = i.index), e = this.normalize(e), e.returnValue = !1, "mousedown" === i.mouseIsDown && this.drag(e), !this.inClass(e.target, "highcharts-tracker") && !i.isInsidePlot(e.chartX - i.plotLeft, e.chartY - i.plotTop) || i.openMenu || this.runPointActions(e)
                },
                inClass: function(t, e) {
                    for (var s; t;) {
                        if (s = i(t, "class")) {
                            if (-1 !== s.indexOf(e)) return !0;
                            if (-1 !== s.indexOf("highcharts-container")) return !1
                        }
                        t = t.parentNode
                    }
                },
                onTrackerMouseOut: function(t) {
                    var e = this.chart.hoverSeries;
                    t = t.relatedTarget || t.toElement, !e || !t || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) && this.inClass(t, "highcharts-tracker") || e.onMouseOut()
                },
                onContainerClick: function(t) {
                    var e = this.chart,
                        i = e.hoverPoint,
                        s = e.plotLeft,
                        n = e.plotTop;
                    t = this.normalize(t), e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (c(i.series, "click", l(t, {
                        point: i
                    })), e.hoverPoint && i.firePointEvent("click", t)) : (l(t, this.getCoordinates(t)), e.isInsidePlot(t.chartX - s, t.chartY - n) && c(e, "click", t)))
                },
                setDOMEvents: function() {
                    var i = this,
                        s = i.chart.container;
                    s.onmousedown = function(t) {
                        i.onContainerMouseDown(t)
                    }, s.onmousemove = function(t) {
                        i.onContainerMouseMove(t)
                    }, s.onclick = function(t) {
                        i.onContainerClick(t)
                    }, e(s, "mouseleave", i.onContainerMouseLeave), 1 === t.chartCount && e(a, "mouseup", i.onDocumentMouseUp), t.hasTouch && (s.ontouchstart = function(t) {
                        i.onContainerTouchStart(t)
                    }, s.ontouchmove = function(t) {
                        i.onContainerTouchMove(t)
                    }, 1 === t.chartCount && e(a, "touchend", i.onDocumentTouchEnd))
                },
                destroy: function() {
                    var e;
                    u(this.chart.container, "mouseleave", this.onContainerMouseLeave), t.chartCount || (u(a, "mouseup", this.onDocumentMouseUp), u(a, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                    for (e in this) this[e] = null
                }
            }
        }(t),
        function(t) {
            var e = t.charts,
                i = t.each,
                s = t.extend,
                n = t.map,
                o = t.noop,
                r = t.pick;
            s(t.Pointer.prototype, {
                pinchTranslate: function(t, e, i, s, n, o) {
                    this.zoomHor && this.pinchTranslateDirection(!0, t, e, i, s, n, o), this.zoomVert && this.pinchTranslateDirection(!1, t, e, i, s, n, o)
                },
                pinchTranslateDirection: function(t, e, i, s, n, o, r, a) {
                    var h, l, c, d = this.chart,
                        p = t ? "x" : "y",
                        u = t ? "X" : "Y",
                        f = "chart" + u,
                        g = t ? "width" : "height",
                        m = d["plot" + (t ? "Left" : "Top")],
                        v = a || 1,
                        x = d.inverted,
                        y = d.bounds[t ? "h" : "v"],
                        b = 1 === e.length,
                        k = e[0][f],
                        M = i[0][f],
                        w = !b && e[1][f],
                        S = !b && i[1][f];
                    i = function() {
                        !b && 20 < Math.abs(k - w) && (v = a || Math.abs(M - S) / Math.abs(k - w)), l = (m - M) / v + k, h = d["plot" + (t ? "Width" : "Height")] / v
                    }, i(), e = l, e < y.min ? (e = y.min, c = !0) : e + h > y.max && (e = y.max - h, c = !0), c ? (M -= .8 * (M - r[p][0]), b || (S -= .8 * (S - r[p][1])), i()) : r[p] = [M, S], x || (o[p] = l - m, o[g] = h), o = x ? 1 / v : v, n[g] = h, n[p] = e, s[x ? t ? "scaleY" : "scaleX" : "scale" + u] = v, s["translate" + u] = o * m + (M - o * k)
                },
                pinch: function(t) {
                    var e = this,
                        a = e.chart,
                        h = e.pinchDown,
                        l = t.touches,
                        c = l.length,
                        d = e.lastValidTouch,
                        p = e.hasZoom,
                        u = e.selectionMarker,
                        f = {},
                        g = 1 === c && (e.inClass(t.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick),
                        m = {};
                    c > 1 && (e.initiated = !0), p && e.initiated && !g && t.preventDefault(), n(l, function(t) {
                        return e.normalize(t)
                    }), "touchstart" === t.type ? (i(l, function(t, e) {
                        h[e] = {
                            chartX: t.chartX,
                            chartY: t.chartY
                        }
                    }), d.x = [h[0].chartX, h[1] && h[1].chartX], d.y = [h[0].chartY, h[1] && h[1].chartY], i(a.axes, function(t) {
                        if (t.zoomEnabled) {
                            var e = a.bounds[t.horiz ? "h" : "v"],
                                i = t.minPixelPadding,
                                s = t.toPixels(r(t.options.min, t.dataMin)),
                                n = t.toPixels(r(t.options.max, t.dataMax)),
                                o = Math.max(s, n);
                            e.min = Math.min(t.pos, Math.min(s, n) - i), e.max = Math.max(t.pos + t.len, o + i)
                        }
                    }), e.res = !0) : e.followTouchMove && 1 === c ? this.runPointActions(e.normalize(t)) : h.length && (u || (e.selectionMarker = u = s({
                        destroy: o,
                        touch: !0
                    }, a.plotBox)), e.pinchTranslate(h, l, f, u, m, d), e.hasPinched = p, e.scaleGroups(f, m), e.res && (e.res = !1, this.reset(!1, 0)))
                },
                touch: function(e, i) {
                    var s, n, o = this.chart;
                    o.index !== t.hoverChartIndex && this.onContainerMouseLeave({
                        relatedTarget: !0
                    }), t.hoverChartIndex = o.index, 1 === e.touches.length ? (e = this.normalize(e), (n = o.isInsidePlot(e.chartX - o.plotLeft, e.chartY - o.plotTop)) && !o.openMenu ? (i && this.runPointActions(e), "touchmove" === e.type && (i = this.pinchDown, s = i[0] ? 4 <= Math.sqrt(Math.pow(i[0].chartX - e.chartX, 2) + Math.pow(i[0].chartY - e.chartY, 2)) : !1), r(s, !0) && this.pinch(e)) : i && this.reset()) : 2 === e.touches.length && this.pinch(e)
                },
                onContainerTouchStart: function(t) {
                    this.zoomOption(t), this.touch(t, !0)
                },
                onContainerTouchMove: function(t) {
                    this.touch(t)
                },
                onDocumentTouchEnd: function(i) {
                    e[t.hoverChartIndex] && e[t.hoverChartIndex].pointer.drop(i)
                }
            })
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.charts,
                s = t.css,
                n = t.doc,
                o = t.extend,
                r = t.noop,
                a = t.Pointer,
                h = t.removeEvent,
                l = t.win,
                c = t.wrap;
            if (l.PointerEvent || l.MSPointerEvent) {
                var d = {},
                    p = !!l.PointerEvent,
                    u = function() {
                        var t, e = [];
                        e.item = function(t) {
                            return this[t]
                        };
                        for (t in d) d.hasOwnProperty(t) && e.push({
                            pageX: d[t].pageX,
                            pageY: d[t].pageY,
                            target: d[t].target
                        });
                        return e
                    },
                    f = function(e, s, n, o) {
                        "touch" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_TOUCH || !i[t.hoverChartIndex] || (o(e), o = i[t.hoverChartIndex].pointer, o[s]({
                            type: n,
                            target: e.currentTarget,
                            preventDefault: r,
                            touches: u()
                        }))
                    };
                o(a.prototype, {
                    onContainerPointerDown: function(t) {
                        f(t, "onContainerTouchStart", "touchstart", function(t) {
                            d[t.pointerId] = {
                                pageX: t.pageX,
                                pageY: t.pageY,
                                target: t.currentTarget
                            }
                        })
                    },
                    onContainerPointerMove: function(t) {
                        f(t, "onContainerTouchMove", "touchmove", function(t) {
                            d[t.pointerId] = {
                                pageX: t.pageX,
                                pageY: t.pageY
                            }, d[t.pointerId].target || (d[t.pointerId].target = t.currentTarget)
                        })
                    },
                    onDocumentPointerUp: function(t) {
                        f(t, "onDocumentTouchEnd", "touchend", function(t) {
                            delete d[t.pointerId]
                        })
                    },
                    batchMSEvents: function(t) {
                        t(this.chart.container, p ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, p ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(n, p ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                    }
                }), c(a.prototype, "init", function(t, e, i) {
                    t.call(this, e, i), this.hasZoom && s(e.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
                }), c(a.prototype, "setDOMEvents", function(t) {
                    t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(e)
                }), c(a.prototype, "destroy", function(t) {
                    this.batchMSEvents(h), t.call(this)
                })
            }
        }(t),
        function(t) {
            var e, i = t.addEvent,
                s = t.css,
                n = t.discardElement,
                o = t.defined,
                r = t.each,
                a = t.extend,
                h = t.isFirefox,
                l = t.marginNames,
                c = t.merge,
                d = t.pick,
                p = t.setAnimation,
                u = t.stableSort,
                f = t.win,
                g = t.wrap;
            e = t.Legend = function(t, e) {
                this.init(t, e)
            }, e.prototype = {
                init: function(t, e) {
                    this.chart = t, this.setOptions(e), e.enabled && (this.render(), i(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }))
                },
                setOptions: function(t) {
                    var e = d(t.padding, 8);
                    this.options = t, this.itemStyle = t.itemStyle, this.itemHiddenStyle = c(this.itemStyle, t.itemHiddenStyle), this.itemMarginTop = t.itemMarginTop || 0, this.initialItemX = this.padding = e, this.initialItemY = e - 5, this.itemHeight = this.maxItemWidth = 0, this.symbolWidth = d(t.symbolWidth, 16), this.pages = []
                },
                update: function(t, e) {
                    var i = this.chart;
                    this.setOptions(c(!0, this.options, t)), this.destroy(), i.isDirtyLegend = i.isDirtyBox = !0, d(e, !0) && i.redraw()
                },
                colorizeItem: function(t, e) {
                    t.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    var i, s = this.options,
                        n = t.legendItem,
                        o = t.legendLine,
                        r = t.legendSymbol,
                        a = this.itemHiddenStyle.color,
                        s = e ? s.itemStyle.color : a,
                        h = e ? t.color || a : a,
                        l = t.options && t.options.marker,
                        c = {
                            fill: h
                        };
                    if (n && n.css({
                            fill: s,
                            color: s
                        }), o && o.attr({
                            stroke: h
                        }), r) {
                        if (l && r.isMarker && (c = t.pointAttribs(), !e))
                            for (i in c) c[i] = a;
                        r.attr(c)
                    }
                },
                positionItem: function(t) {
                    var e = this.options,
                        i = e.symbolPadding,
                        e = !e.rtl,
                        s = t._legendItemPos,
                        n = s[0],
                        s = s[1],
                        o = t.checkbox;
                    (t = t.legendGroup) && t.element && t.translate(e ? n : this.legendWidth - n - 2 * i - 4, s), o && (o.x = n, o.y = s)
                },
                destroyItem: function(t) {
                    var e = t.checkbox;
                    r(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(e) {
                        t[e] && (t[e] = t[e].destroy())
                    }), e && n(t.checkbox)
                },
                destroy: function() {
                    function t(t) {
                        this[t] && (this[t] = this[t].destroy())
                    }
                    r(this.getAllItems(), function(e) {
                        r(["legendItem", "legendGroup"], t, e)
                    }), r(["box", "title", "group"], t, this), this.display = null
                },
                positionCheckboxes: function(t) {
                    var e, i = this.group && this.group.alignAttr,
                        n = this.clipHeight || this.legendHeight,
                        o = this.titleHeight;
                    i && (e = i.translateY, r(this.allItems, function(r) {
                        var a, h = r.checkbox;
                        h && (a = e + o + h.y + (t || 0) + 3, s(h, {
                            left: i.translateX + r.checkboxOffset + h.x - 20 + "px",
                            top: a + "px",
                            display: a > e - 6 && e + n - 6 > a ? "" : "none"
                        }))
                    }))
                },
                renderTitle: function() {
                    var t = this.padding,
                        e = this.options.title,
                        i = 0;
                    e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                        zIndex: 1
                    }).css(e.style).add(this.group)), t = this.title.getBBox(), i = t.height, this.offsetWidth = t.width, this.contentGroup.attr({
                        translateY: i
                    })), this.titleHeight = i
                },
                setText: function(e) {
                    var i = this.options;
                    e.legendItem.attr({
                        text: i.labelFormat ? t.format(i.labelFormat, e) : i.labelFormatter.call(e)
                    })
                },
                renderItem: function(t) {
                    var e = this.chart,
                        i = e.renderer,
                        s = this.options,
                        n = "horizontal" === s.layout,
                        o = this.symbolWidth,
                        r = s.symbolPadding,
                        a = this.itemStyle,
                        h = this.itemHiddenStyle,
                        l = this.padding,
                        p = n ? d(s.itemDistance, 20) : 0,
                        u = !s.rtl,
                        f = s.width,
                        g = s.itemMarginBottom || 0,
                        m = this.itemMarginTop,
                        v = this.initialItemX,
                        x = t.legendItem,
                        y = !t.series,
                        b = !y && t.series.drawLegendSymbol ? t.series : t,
                        k = b.options,
                        k = this.createCheckboxForItem && k && k.showCheckbox,
                        M = s.useHTML;
                    x || (t.legendGroup = i.g("legend-item").addClass("highcharts-" + b.type + "-series highcharts-color-" + t.colorIndex + (t.options.className ? " " + t.options.className : "") + (y ? " highcharts-series-" + t.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), t.legendItem = x = i.text("", u ? o + r : -r, this.baseline || 0, M).css(c(t.visible ? a : h)).attr({
                        align: u ? "left" : "right",
                        zIndex: 2
                    }).add(t.legendGroup), this.baseline || (a = a.fontSize, this.fontMetrics = i.fontMetrics(a, x), this.baseline = this.fontMetrics.f + 3 + m, x.attr("y", this.baseline)), b.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, x, M), k && this.createCheckboxForItem(t)), this.colorizeItem(t, t.visible), this.setText(t), i = x.getBBox(), o = t.checkboxOffset = s.itemWidth || t.legendItemWidth || o + r + i.width + p + (k ? 20 : 0), this.itemHeight = r = Math.round(t.legendItemHeight || i.height), n && this.itemX - v + o > (f || e.chartWidth - 2 * l - v - s.x) && (this.itemX = v, this.itemY += m + this.lastLineHeight + g, this.lastLineHeight = 0), this.maxItemWidth = Math.max(this.maxItemWidth, o), this.lastItemY = m + this.itemY + g, this.lastLineHeight = Math.max(r, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], n ? this.itemX += o : (this.itemY += m + r + g, this.lastLineHeight = r), this.offsetWidth = f || Math.max((n ? this.itemX - v - p : o) + l, this.offsetWidth)
                },
                getAllItems: function() {
                    var t = [];
                    return r(this.chart.series, function(e) {
                        var i = e && e.options;
                        e && d(i.showInLegend, o(i.linkedTo) ? !1 : void 0, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
                    }), t
                },
                adjustMargins: function(t, e) {
                    var i = this.chart,
                        s = this.options,
                        n = s.align.charAt(0) + s.verticalAlign.charAt(0) + s.layout.charAt(0);
                    s.floating || r([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(r, a) {
                        r.test(n) && !o(t[a]) && (i[l[a]] = Math.max(i[l[a]], i.legend[(a + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][a] * s[a % 2 ? "x" : "y"] + d(s.margin, 12) + e[a]))
                    })
                },
                render: function() {
                    var t, e, i, s, n = this,
                        o = n.chart,
                        h = o.renderer,
                        l = n.group,
                        c = n.box,
                        d = n.options,
                        p = n.padding;
                    n.itemX = n.initialItemX, n.itemY = n.initialItemY, n.offsetWidth = 0, n.lastItemY = 0, l || (n.group = l = h.g("legend").attr({
                        zIndex: 7
                    }).add(), n.contentGroup = h.g().attr({
                        zIndex: 1
                    }).add(l), n.scrollGroup = h.g().add(n.contentGroup)), n.renderTitle(), t = n.getAllItems(), u(t, function(t, e) {
                        return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                    }), d.reversed && t.reverse(), n.allItems = t, n.display = e = !!t.length, n.lastLineHeight = 0, r(t, function(t) {
                        n.renderItem(t)
                    }), i = (d.width || n.offsetWidth) + p, s = n.lastItemY + n.lastLineHeight + n.titleHeight, s = n.handleOverflow(s), s += p, c || (n.box = c = h.rect().addClass("highcharts-legend-box").attr({
                        r: d.borderRadius
                    }).add(l), c.isNew = !0), c.attr({
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth || 0,
                        fill: d.backgroundColor || "none"
                    }).shadow(d.shadow), i > 0 && s > 0 && (c[c.isNew ? "attr" : "animate"](c.crisp({
                        x: 0,
                        y: 0,
                        width: i,
                        height: s
                    }, c.strokeWidth())), c.isNew = !1), c[e ? "show" : "hide"](), n.legendWidth = i, n.legendHeight = s, r(t, function(t) {
                        n.positionItem(t)
                    }), e && l.align(a({
                        width: i,
                        height: s
                    }, d), !0, "spacingBox"), o.isResizing || this.positionCheckboxes()
                },
                handleOverflow: function(t) {
                    var e, i, s = this,
                        n = this.chart,
                        o = n.renderer,
                        a = this.options,
                        h = a.y,
                        n = n.spacingBox.height + ("top" === a.verticalAlign ? -h : h) - this.padding,
                        h = a.maxHeight,
                        l = this.clipRect,
                        c = a.navigation,
                        p = d(c.animation, !0),
                        u = c.arrowSize || 12,
                        f = this.nav,
                        g = this.pages,
                        m = this.padding,
                        v = this.allItems,
                        x = function(t) {
                            t ? l.attr({
                                height: t
                            }) : l && (s.clipRect = l.destroy(), s.contentGroup.clip()), s.contentGroup.div && (s.contentGroup.div.style.clip = t ? "rect(" + m + "px,9999px," + (m + t) + "px,0)" : "auto")
                        };
                    return "horizontal" !== a.layout || "middle" === a.verticalAlign || a.floating || (n /= 2), h && (n = Math.min(n, h)), g.length = 0, t > n && !1 !== c.enabled ? (this.clipHeight = e = Math.max(n - 20 - this.titleHeight - m, 0), this.currentPage = d(this.currentPage, 1), this.fullHeight = t, r(v, function(t, s) {
                        var n = t._legendItemPos[1];
                        t = Math.round(t.legendItem.getBBox().height);
                        var o = g.length;
                        (!o || n - g[o - 1] > e && (i || n) !== g[o - 1]) && (g.push(i || n), o++), s === v.length - 1 && n + t - g[o - 1] > e && g.push(n), n !== i && (i = n)
                    }), l || (l = s.clipRect = o.clipRect(0, m, 9999, 0), s.contentGroup.clip(l)), x(e), f || (this.nav = f = o.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = o.symbol("triangle", 0, 0, u, u).on("click", function() {
                        s.scroll(-1, p)
                    }).add(f), this.pager = o.text("", 15, 10).addClass("highcharts-legend-navigation").css(c.style).add(f), this.down = o.symbol("triangle-down", 0, 0, u, u).on("click", function() {
                        s.scroll(1, p)
                    }).add(f)), s.scroll(0), t = n) : f && (x(), f.hide(), this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0), t
                },
                scroll: function(t, e) {
                    var i = this.pages,
                        s = i.length;
                    t = this.currentPage + t;
                    var n = this.clipHeight,
                        o = this.options.navigation,
                        r = this.pager,
                        a = this.padding;
                    t > s && (t = s), t > 0 && (void 0 !== e && p(e, this.chart), this.nav.attr({
                        translateX: a,
                        translateY: n + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === t ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), r.attr({
                        text: t + "/" + s
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": t === s ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === t ? o.inactiveColor : o.activeColor
                    }).css({
                        cursor: 1 === t ? "default" : "pointer"
                    }), this.down.attr({
                        fill: t === s ? o.inactiveColor : o.activeColor
                    }).css({
                        cursor: t === s ? "default" : "pointer"
                    }), e = -i[t - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: e
                    }), this.currentPage = t, this.positionCheckboxes(e))
                }
            }, t.LegendSymbolMixin = {
                drawRectangle: function(t, e) {
                    var i = t.options,
                        s = i.symbolHeight || t.fontMetrics.f,
                        i = i.squareSymbol;
                    e.legendSymbol = this.chart.renderer.rect(i ? (t.symbolWidth - s) / 2 : 0, t.baseline - s + 1, i ? s : t.symbolWidth, s, d(t.options.symbolRadius, s / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(e.legendGroup)
                },
                drawLineMarker: function(t) {
                    var e = this.options,
                        i = e.marker,
                        s = t.symbolWidth,
                        n = this.chart.renderer,
                        o = this.legendGroup;
                    t = t.baseline - Math.round(.3 * t.fontMetrics.b);
                    var r;
                    r = {
                        "stroke-width": e.lineWidth || 0
                    }, e.dashStyle && (r.dashstyle = e.dashStyle), this.legendLine = n.path(["M", 0, t, "L", s, t]).addClass("highcharts-graph").attr(r).add(o), i && !1 !== i.enabled && (e = 0 === this.symbol.indexOf("url") ? 0 : i.radius, this.legendSymbol = i = n.symbol(this.symbol, s / 2 - e, t - e, 2 * e, 2 * e, i).addClass("highcharts-point").add(o), i.isMarker = !0)
                }
            }, (/Trident\/7\.0/.test(f.navigator.userAgent) || h) && g(e.prototype, "positionItem", function(t, e) {
                var i = this,
                    s = function() {
                        e._legendItemPos && t.call(i, e)
                    };
                s(), setTimeout(s)
            })
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.animate,
                s = t.animObject,
                n = t.attr,
                o = t.doc,
                r = t.Axis,
                a = t.createElement,
                h = t.defaultOptions,
                l = t.discardElement,
                c = t.charts,
                d = t.css,
                p = t.defined,
                u = t.each,
                f = t.extend,
                g = t.find,
                m = t.fireEvent,
                v = t.getStyle,
                x = t.grep,
                y = t.isNumber,
                b = t.isObject,
                k = t.isString,
                M = t.Legend,
                w = t.marginNames,
                S = t.merge,
                T = t.Pointer,
                A = t.pick,
                C = t.pInt,
                P = t.removeEvent,
                L = t.seriesTypes,
                O = t.splat,
                I = t.svg,
                z = t.syncTimeout,
                D = t.win,
                E = t.Renderer,
                R = t.Chart = function() {
                    this.getArgs.apply(this, arguments)
                };
            t.chart = function(t, e, i) {
                return new R(t, e, i)
            }, R.prototype = {
                callbacks: [],
                getArgs: function() {
                    var t = [].slice.call(arguments);
                    (k(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()), this.init(t[0], t[1])
                },
                init: function(i, s) {
                    var n, o = i.series;
                    i.series = null, n = S(h, i), n.series = i.series = o, this.userOptions = i, this.respRules = [], i = n.chart, o = i.events, this.margin = [], this.spacing = [], this.bounds = {
                        h: {},
                        v: {}
                    }, this.callback = s, this.isResizing = 0, this.options = n, this.axes = [], this.series = [], this.hasCartesianSeries = i.showAxes;
                    var r;
                    if (this.index = c.length, c.push(this), t.chartCount++, o)
                        for (r in o) e(this, r, o[r]);
                    this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.firstRender()
                },
                initSeries: function(e) {
                    var i = this.options.chart;
                    return (i = L[e.type || i.type || i.defaultSeriesType]) || t.error(17, !0), i = new i, i.init(this, e), i
                },
                isInsidePlot: function(t, e, i) {
                    var s = i ? e : t;
                    return t = i ? t : e, s >= 0 && s <= this.plotWidth && t >= 0 && t <= this.plotHeight
                },
                redraw: function(e) {
                    var i, s, n = this.axes,
                        o = this.series,
                        r = this.pointer,
                        a = this.legend,
                        h = this.isDirtyLegend,
                        l = this.hasCartesianSeries,
                        c = this.isDirtyBox,
                        d = o.length,
                        p = d,
                        g = this.renderer,
                        v = g.isHidden(),
                        x = [];
                    for (t.setAnimation(e, this), v && this.cloneRenderTo(), this.layOutTitles(); p--;)
                        if (e = o[p], e.options.stacking && (i = !0, e.isDirty)) {
                            s = !0;
                            break
                        }
                    if (s)
                        for (p = d; p--;) e = o[p], e.options.stacking && (e.isDirty = !0);
                    u(o, function(t) {
                        t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(), h = !0), t.isDirtyData && m(t, "updatedData")
                    }), h && a.options.enabled && (a.render(), this.isDirtyLegend = !1), i && this.getStacks(), l && u(n, function(t) {
                        t.updateNames(), t.setScale()
                    }), this.getMargins(), l && (u(n, function(t) {
                        t.isDirty && (c = !0)
                    }), u(n, function(t) {
                        var e = t.min + "," + t.max;
                        t.extKey !== e && (t.extKey = e, x.push(function() {
                            m(t, "afterSetExtremes", f(t.eventArgs, t.getExtremes())), delete t.eventArgs
                        })), (c || i) && t.redraw()
                    })), c && this.drawChartBox(), u(o, function(t) {
                        (c || t.isDirty) && t.visible && t.redraw()
                    }), r && r.reset(!0), g.draw(), m(this, "redraw"), v && this.cloneRenderTo(!0), u(x, function(t) {
                        t.call()
                    })
                },
                get: function(t) {
                    function e(e) {
                        return e.id === t || e.options.id === t
                    }
                    var i, s, n = this.series;
                    for (i = g(this.axes, e) || g(this.series, e), s = 0; !i && s < n.length; s++) i = g(n[s].points || [], e);
                    return i
                },
                getAxes: function() {
                    var t = this,
                        e = this.options,
                        i = e.xAxis = O(e.xAxis || {}),
                        e = e.yAxis = O(e.yAxis || {});
                    u(i, function(t, e) {
                        t.index = e, t.isX = !0
                    }), u(e, function(t, e) {
                        t.index = e
                    }), i = i.concat(e), u(i, function(e) {
                        new r(t, e)
                    })
                },
                getSelectedPoints: function() {
                    var t = [];
                    return u(this.series, function(e) {
                        t = t.concat(x(e.points || [], function(t) {
                            return t.selected
                        }))
                    }), t
                },
                getSelectedSeries: function() {
                    return x(this.series, function(t) {
                        return t.selected
                    })
                },
                setTitle: function(t, e, i) {
                    var s, n = this,
                        o = n.options;
                    s = o.title = S({
                        style: {
                            color: "#333333",
                            fontSize: o.isStock ? "16px" : "18px"
                        }
                    }, o.title, t), o = o.subtitle = S({
                        style: {
                            color: "#666666"
                        }
                    }, o.subtitle, e), u([
                        ["title", t, s],
                        ["subtitle", e, o]
                    ], function(t, e) {
                        var i = t[0],
                            s = n[i],
                            o = t[1];
                        t = t[2], s && o && (n[i] = s = s.destroy()), t && t.text && !s && (n[i] = n.renderer.text(t.text, 0, 0, t.useHTML).attr({
                            align: t.align,
                            "class": "highcharts-" + i,
                            zIndex: t.zIndex || 4
                        }).add(), n[i].update = function(t) {
                            n.setTitle(!e && t, e && t)
                        }, n[i].css(t.style))
                    }), n.layOutTitles(i)
                },
                layOutTitles: function(t) {
                    var e, i = 0,
                        s = this.renderer,
                        n = this.spacingBox;
                    u(["title", "subtitle"], function(t) {
                        var e, o = this[t],
                            r = this.options[t];
                        o && (e = r.style.fontSize, e = s.fontMetrics(e, o).b, o.css({
                            width: (r.width || n.width + r.widthAdjust) + "px"
                        }).align(f({
                            y: i + e + ("title" === t ? -3 : 2)
                        }, r), !1, "spacingBox"), r.floating || r.verticalAlign || (i = Math.ceil(i + o.getBBox().height)))
                    }, this), e = this.titleOffset !== i, this.titleOffset = i, !this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && A(t, !0) && this.isDirtyBox && this.redraw())
                },
                getChartSize: function() {
                    var t = this.options.chart,
                        e = t.width,
                        t = t.height,
                        i = this.renderToClone || this.renderTo;
                    p(e) || (this.containerWidth = v(i, "width")), p(t) || (this.containerHeight = v(i, "height")), this.chartWidth = Math.max(0, e || this.containerWidth || 600), this.chartHeight = Math.max(0, A(t, 19 < this.containerHeight ? this.containerHeight : 400))
                },
                cloneRenderTo: function(t) {
                    var e = this.renderToClone,
                        i = this.container;
                    if (t) {
                        if (e) {
                            for (; e.childNodes.length;) this.renderTo.appendChild(e.firstChild);
                            l(e), delete this.renderToClone
                        }
                    } else i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = e = this.renderTo.cloneNode(0), d(e, {
                        position: "absolute",
                        top: "-9999px",
                        display: "block"
                    }), e.style.setProperty && e.style.setProperty("display", "block", "important"), o.body.appendChild(e), i && e.appendChild(i)
                },
                setClassName: function(t) {
                    this.container.className = "highcharts-container " + (t || "")
                },
                getContainer: function() {
                    var e, i, s, r = this.options,
                        h = r.chart;
                    e = this.renderTo;
                    var l, d = t.uniqueKey();
                    e || (this.renderTo = e = h.renderTo), k(e) && (this.renderTo = e = o.getElementById(e)), e || t.error(13, !0), i = C(n(e, "data-highcharts-chart")), y(i) && c[i] && c[i].hasRendered && c[i].destroy(), n(e, "data-highcharts-chart", this.index), e.innerHTML = "", h.skipClone || e.offsetWidth || this.cloneRenderTo(), this.getChartSize(), i = this.chartWidth, s = this.chartHeight, l = f({
                        position: "relative",
                        overflow: "hidden",
                        width: i + "px",
                        height: s + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    }, h.style), this.container = e = a("div", {
                        id: d
                    }, l, this.renderToClone || e), this._cursor = e.style.cursor, this.renderer = new(t[h.renderer] || E)(e, i, s, null, h.forExport, r.exporting && r.exporting.allowHTML), this.setClassName(h.className), this.renderer.setStyle(h.style), this.renderer.chartIndex = this.index
                },
                getMargins: function(t) {
                    var e = this.spacing,
                        i = this.margin,
                        s = this.titleOffset;
                    this.resetMargins(), s && !p(i[0]) && (this.plotTop = Math.max(this.plotTop, s + this.options.title.margin + e[0])), this.legend.display && this.legend.adjustMargins(i, e), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), t || this.getAxisMargins()
                },
                getAxisMargins: function() {
                    var t = this,
                        e = t.axisOffset = [0, 0, 0, 0],
                        i = t.margin;
                    t.hasCartesianSeries && u(t.axes, function(t) {
                        t.visible && t.getOffset()
                    }), u(w, function(s, n) {
                        p(i[n]) || (t[s] += e[n])
                    }), t.setChartSize()
                },
                reflow: function(t) {
                    var e = this,
                        i = e.options.chart,
                        s = e.renderTo,
                        n = p(i.width),
                        r = i.width || v(s, "width"),
                        i = i.height || v(s, "height"),
                        s = t ? t.target : D;
                    n || e.isPrinting || !r || !i || s !== D && s !== o || ((r !== e.containerWidth || i !== e.containerHeight) && (clearTimeout(e.reflowTimeout), e.reflowTimeout = z(function() {
                        e.container && e.setSize(void 0, void 0, !1)
                    }, t ? 100 : 0)), e.containerWidth = r, e.containerHeight = i)
                },
                initReflow: function() {
                    var t, i = this;
                    t = e(D, "resize", function(t) {
                        i.reflow(t)
                    }), e(i, "destroy", t)
                },
                setSize: function(e, n, o) {
                    var r = this,
                        a = r.renderer;
                    r.isResizing += 1, t.setAnimation(o, r), r.oldChartHeight = r.chartHeight, r.oldChartWidth = r.chartWidth, void 0 !== e && (r.options.chart.width = e), void 0 !== n && (r.options.chart.height = n), r.getChartSize(), e = a.globalAnimation, (e ? i : d)(r.container, {
                        width: r.chartWidth + "px",
                        height: r.chartHeight + "px"
                    }, e), r.setChartSize(!0), a.setSize(r.chartWidth, r.chartHeight, o), u(r.axes, function(t) {
                        t.isDirty = !0, t.setScale()
                    }), r.isDirtyLegend = !0, r.isDirtyBox = !0, r.layOutTitles(), r.getMargins(), r.setResponsive && r.setResponsive(!1), r.redraw(o), r.oldChartHeight = null, m(r, "resize"), z(function() {
                        r && m(r, "endResize", null, function() {
                            --r.isResizing
                        })
                    }, s(e).duration)
                },
                setChartSize: function(t) {
                    var e, i, s, n, o = this.inverted,
                        r = this.renderer,
                        a = this.chartWidth,
                        h = this.chartHeight,
                        l = this.options.chart,
                        c = this.spacing,
                        d = this.clipOffset;
                    this.plotLeft = e = Math.round(this.plotLeft), this.plotTop = i = Math.round(this.plotTop), this.plotWidth = s = Math.max(0, Math.round(a - e - this.marginRight)), this.plotHeight = n = Math.max(0, Math.round(h - i - this.marginBottom)), this.plotSizeX = o ? n : s, this.plotSizeY = o ? s : n, this.plotBorderWidth = l.plotBorderWidth || 0, this.spacingBox = r.spacingBox = {
                        x: c[3],
                        y: c[0],
                        width: a - c[3] - c[1],
                        height: h - c[0] - c[2]
                    }, this.plotBox = r.plotBox = {
                        x: e,
                        y: i,
                        width: s,
                        height: n
                    }, a = 2 * Math.floor(this.plotBorderWidth / 2), o = Math.ceil(Math.max(a, d[3]) / 2), r = Math.ceil(Math.max(a, d[0]) / 2), this.clipBox = {
                        x: o,
                        y: r,
                        width: Math.floor(this.plotSizeX - Math.max(a, d[1]) / 2 - o),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, d[2]) / 2 - r))
                    }, t || u(this.axes, function(t) {
                        t.setAxisSize(), t.setAxisTranslation()
                    })
                },
                resetMargins: function() {
                    var t = this,
                        e = t.options.chart;
                    u(["margin", "spacing"], function(i) {
                        var s = e[i],
                            n = b(s) ? s : [s, s, s, s];
                        u(["Top", "Right", "Bottom", "Left"], function(s, o) {
                            t[i][o] = A(e[i + s], n[o])
                        })
                    }), u(w, function(e, i) {
                        t[e] = A(t.margin[i], t.spacing[i])
                    }), t.axisOffset = [0, 0, 0, 0], t.clipOffset = [0, 0, 0, 0]
                },
                drawChartBox: function() {
                    var t, e, i = this.options.chart,
                        s = this.renderer,
                        n = this.chartWidth,
                        o = this.chartHeight,
                        r = this.chartBackground,
                        a = this.plotBackground,
                        h = this.plotBorder,
                        l = this.plotBGImage,
                        c = i.backgroundColor,
                        d = i.plotBackgroundColor,
                        p = i.plotBackgroundImage,
                        u = this.plotLeft,
                        f = this.plotTop,
                        g = this.plotWidth,
                        m = this.plotHeight,
                        v = this.plotBox,
                        x = this.clipRect,
                        y = this.clipBox,
                        b = "animate";
                    r || (this.chartBackground = r = s.rect().addClass("highcharts-background").add(), b = "attr"), t = i.borderWidth || 0, e = t + (i.shadow ? 8 : 0), c = {
                        fill: c || "none"
                    }, (t || r["stroke-width"]) && (c.stroke = i.borderColor, c["stroke-width"] = t), r.attr(c).shadow(i.shadow), r[b]({
                        x: e / 2,
                        y: e / 2,
                        width: n - e - t % 2,
                        height: o - e - t % 2,
                        r: i.borderRadius
                    }), b = "animate", a || (b = "attr", this.plotBackground = a = s.rect().addClass("highcharts-plot-background").add()), a[b](v), a.attr({
                        fill: d || "none"
                    }).shadow(i.plotShadow), p && (l ? l.animate(v) : this.plotBGImage = s.image(p, u, f, g, m).add()), x ? x.animate({
                        width: y.width,
                        height: y.height
                    }) : this.clipRect = s.clipRect(y), b = "animate", h || (b = "attr", this.plotBorder = h = s.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add()), h.attr({
                        stroke: i.plotBorderColor,
                        "stroke-width": i.plotBorderWidth || 0,
                        fill: "none"
                    }), h[b](h.crisp({
                        x: u,
                        y: f,
                        width: g,
                        height: m
                    }, -h.strokeWidth())), this.isDirtyBox = !1
                },
                propFromSeries: function() {
                    var t, e, i, s = this,
                        n = s.options.chart,
                        o = s.options.series;
                    u(["inverted", "angular", "polar"], function(r) {
                        for (t = L[n.type || n.defaultSeriesType], i = n[r] || t && t.prototype[r], e = o && o.length; !i && e--;)(t = L[o[e].type]) && t.prototype[r] && (i = !0);
                        s[r] = i
                    })
                },
                linkSeries: function() {
                    var t = this,
                        e = t.series;
                    u(e, function(t) {
                        t.linkedSeries.length = 0
                    }), u(e, function(e) {
                        var i = e.options.linkedTo;
                        k(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && i.linkedParent !== e && (i.linkedSeries.push(e), e.linkedParent = i, e.visible = A(e.options.visible, i.options.visible, e.visible))
                    })
                },
                renderSeries: function() {
                    u(this.series, function(t) {
                        t.translate(), t.render()
                    })
                },
                renderLabels: function() {
                    var t = this,
                        e = t.options.labels;
                    e.items && u(e.items, function(i) {
                        var s = f(e.style, i.style),
                            n = C(s.left) + t.plotLeft,
                            o = C(s.top) + t.plotTop + 12;
                        delete s.left, delete s.top, t.renderer.text(i.html, n, o).attr({
                            zIndex: 2
                        }).css(s).add()
                    })
                },
                render: function() {
                    var t, e, i, s = this.axes,
                        n = this.renderer,
                        o = this.options;
                    this.setTitle(), this.legend = new M(this, o.legend), this.getStacks && this.getStacks(), this.getMargins(!0), this.setChartSize(), o = this.plotWidth, t = this.plotHeight -= 21, u(s, function(t) {
                        t.setScale()
                    }), this.getAxisMargins(), e = 1.1 < o / this.plotWidth, i = 1.05 < t / this.plotHeight, (e || i) && (u(s, function(t) {
                        (t.horiz && e || !t.horiz && i) && t.setTickInterval(!0)
                    }), this.getMargins()), this.drawChartBox(), this.hasCartesianSeries && u(s, function(t) {
                        t.visible && t.render()
                    }), this.seriesGroup || (this.seriesGroup = n.g("series-group").attr({
                        zIndex: 3
                    }).add()), this.renderSeries(), this.renderLabels(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = !0
                },
                addCredits: function(t) {
                    var e = this;
                    t = S(!0, this.options.credits, t), t.enabled && !this.credits && (this.credits = this.renderer.text(t.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        t.href && (D.location.href = t.href)
                    }).attr({
                        align: t.position.align,
                        zIndex: 8
                    }).css(t.style).add().align(t.position), this.credits.update = function(t) {
                        e.credits = e.credits.destroy(), e.addCredits(t)
                    })
                },
                destroy: function() {
                    var e, i = this,
                        s = i.axes,
                        n = i.series,
                        o = i.container,
                        r = o && o.parentNode;
                    for (m(i, "destroy"), c[i.index] = void 0, t.chartCount--, i.renderTo.removeAttribute("data-highcharts-chart"), P(i), e = s.length; e--;) s[e] = s[e].destroy();
                    for (this.scroller && this.scroller.destroy && this.scroller.destroy(), e = n.length; e--;) n[e] = n[e].destroy();
                    u("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(t) {
                        var e = i[t];
                        e && e.destroy && (i[t] = e.destroy())
                    }), o && (o.innerHTML = "", P(o), r && l(o));
                    for (e in i) delete i[e]
                },
                isReadyToRender: function() {
                    var t = this;
                    return I || D != D.top || "complete" === o.readyState ? !0 : (o.attachEvent("onreadystatechange", function() {
                        o.detachEvent("onreadystatechange", t.firstRender), "complete" === o.readyState && t.firstRender()
                    }), !1)
                },
                firstRender: function() {
                    var t = this,
                        e = t.options;
                    t.isReadyToRender() && (t.getContainer(), m(t, "init"), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes(), u(e.series || [], function(e) {
                        t.initSeries(e)
                    }), t.linkSeries(), m(t, "beforeRender"), T && (t.pointer = new T(t, e)), t.render(), t.renderer.draw(), !t.renderer.imgCount && t.onload && t.onload(), t.cloneRenderTo(!0))
                },
                onload: function() {
                    u([this.callback].concat(this.callbacks), function(t) {
                        t && void 0 !== this.index && t.apply(this, [this])
                    }, this), m(this, "load"), p(this.index) && !1 !== this.options.chart.reflow && this.initReflow(), this.onload = null
                }
            }
        }(t),
        function(t) {
            var e, i = t.each,
                s = t.extend,
                n = t.erase,
                o = t.fireEvent,
                r = t.format,
                a = t.isArray,
                h = t.isNumber,
                l = t.pick,
                c = t.removeEvent;
            e = t.Point = function() {}, e.prototype = {
                init: function(t, e, i) {
                    return this.series = t, this.color = t.color, this.applyOptions(e, i), t.options.colorByPoint ? (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter], e = e.length, i = t.colorCounter, t.colorCounter++, t.colorCounter === e && (t.colorCounter = 0)) : i = t.colorIndex, this.colorIndex = l(this.colorIndex, i), t.chart.pointCount++, this
                },
                applyOptions: function(t, i) {
                    var n = this.series,
                        o = n.options.pointValKey || n.pointValKey;
                    return t = e.prototype.optionsToObject.call(this, t), s(this, t), this.options = this.options ? s(this.options, t) : t, t.group && delete this.group, o && (this.y = this[o]), this.isNull = l(this.isValid && !this.isValid(), null === this.x || !h(this.y, !0)), this.selected && (this.state = "select"), "name" in this && void 0 === i && n.xAxis && n.xAxis.hasNames && (this.x = n.xAxis.nameToX(this)), void 0 === this.x && n && (this.x = void 0 === i ? n.autoIncrement(this) : i), this
                },
                optionsToObject: function(t) {
                    var e = {},
                        i = this.series,
                        s = i.options.keys,
                        n = s || i.pointArrayMap || ["y"],
                        o = n.length,
                        r = 0,
                        l = 0;
                    if (h(t) || null === t) e[n[0]] = t;
                    else if (a(t))
                        for (!s && t.length > o && (i = typeof t[0], "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]), r++); o > l;) s && void 0 === t[r] || (e[n[l]] = t[r]), r++, l++;
                    else "object" == typeof t && (e = t, t.dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
                    return e
                },
                getClassName: function() {
                    return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className : "")
                },
                getZone: function() {
                    var t, e = this.series,
                        i = e.zones,
                        e = e.zoneAxis || "y",
                        s = 0;
                    for (t = i[s]; this[e] >= t.value;) t = i[++s];
                    return t && t.color && !this.options.color && (this.color = t.color), t
                },
                destroy: function() {
                    var t, e = this.series.chart,
                        i = e.hoverPoints;
                    e.pointCount--, i && (this.setState(), n(i, this), i.length || (e.hoverPoints = null)), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (c(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this);
                    for (t in this) this[t] = null
                },
                destroyElements: function() {
                    for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--;) t = e[i], this[t] && (this[t] = this[t].destroy())
                },
                getLabelConfig: function() {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal
                    }
                },
                tooltipFormatter: function(t) {
                    var e = this.series,
                        s = e.tooltipOptions,
                        n = l(s.valueDecimals, ""),
                        o = s.valuePrefix || "",
                        a = s.valueSuffix || "";
                    return i(e.pointArrayMap || ["y"], function(e) {
                        e = "{point." + e, (o || a) && (t = t.replace(e + "}", o + e + "}" + a)), t = t.replace(e + "}", e + ":,." + n + "f}")
                    }), r(t, {
                        point: this,
                        series: this.series
                    })
                },
                firePointEvent: function(t, e, i) {
                    var s = this,
                        n = this.series.options;
                    (n.point.events[t] || s.options && s.options.events && s.options.events[t]) && this.importEvents(), "click" === t && n.allowPointSelect && (i = function(t) {
                        s.select && s.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                    }), o(this, t, e, i)
                },
                visible: !0
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.animObject,
                s = t.arrayMax,
                n = t.arrayMin,
                o = t.correctFloat,
                r = t.Date,
                a = t.defaultOptions,
                h = t.defaultPlotOptions,
                l = t.defined,
                c = t.each,
                d = t.erase,
                p = t.extend,
                u = t.fireEvent,
                f = t.grep,
                g = t.isArray,
                m = t.isNumber,
                v = t.isString,
                x = t.merge,
                y = t.pick,
                b = t.removeEvent,
                k = t.splat,
                M = t.SVGElement,
                w = t.syncTimeout,
                S = t.win;
            t.Series = t.seriesType("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                marker: {
                    lineWidth: 0,
                    lineColor: "#ffffff",
                    radius: 4,
                    states: {
                        hover: {
                            animation: {
                                duration: 50
                            },
                            enabled: !0,
                            radiusPlus: 2,
                            lineWidthPlus: 1
                        },
                        select: {
                            fillColor: "#cccccc",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function() {
                        return null === this.y ? "" : t.numberFormat(this.y, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "contrast",
                        textOutline: "1px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }, {
                isCartesian: !0,
                pointClass: t.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                init: function(t, i) {
                    var s, n, o, r = this,
                        a = t.series;
                    r.chart = t, r.options = i = r.setOptions(i), r.linkedSeries = [], r.bindAxes(), p(r, {
                        name: i.name,
                        state: "",
                        visible: !1 !== i.visible,
                        selected: !0 === i.selected
                    }), n = i.events;
                    for (s in n) e(r, s, n[s]);
                    for ((n && n.click || i.point && i.point.events && i.point.events.click || i.allowPointSelect) && (t.runTrackerClick = !0), r.getColor(), r.getSymbol(), c(r.parallelArrays, function(t) {
                            r[t + "Data"] = []
                        }), r.setData(i.data, !1), r.isCartesian && (t.hasCartesianSeries = !0), a.length && (o = a[a.length - 1]), r._i = y(o && o._i, -1) + 1, t = this.insert(a); t < a.length; t++) a[t].index = t, a[t].name = a[t].name || "Series " + (a[t].index + 1)
                },
                insert: function(t) {
                    var e, i = this.options.index;
                    if (m(i)) {
                        for (e = t.length; e--;)
                            if (i >= y(t[e].options.index, t[e]._i)) {
                                t.splice(e + 1, 0, this);
                                break
                            } - 1 === e && t.unshift(this), e += 1
                    } else t.push(this);
                    return y(e, t.length - 1)
                },
                bindAxes: function() {
                    var e, i = this,
                        s = i.options,
                        n = i.chart;
                    c(i.axisTypes || [], function(o) {
                        c(n[o], function(t) {
                            e = t.options, (s[o] === e.index || void 0 !== s[o] && s[o] === e.id || void 0 === s[o] && 0 === e.index) && (i.insert(t.series), i[o] = t, t.isDirty = !0)
                        }), i[o] || i.optionalAxis === o || t.error(18, !0)
                    })
                },
                updateParallelArrays: function(t, e) {
                    var i = t.series,
                        s = arguments,
                        n = m(e) ? function(s) {
                            var n = "y" === s && i.toYData ? i.toYData(t) : t[s];
                            i[s + "Data"][e] = n
                        } : function(t) {
                            Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(s, 2))
                        };
                    c(i.parallelArrays, n)
                },
                autoIncrement: function() {
                    var t, e = this.options,
                        i = this.xIncrement,
                        s = e.pointIntervalUnit,
                        i = y(i, e.pointStart, 0);
                    return this.pointInterval = t = y(this.pointInterval, e.pointInterval, 1), s && (e = new r(i), "day" === s ? e = +e[r.hcSetDate](e[r.hcGetDate]() + t) : "month" === s ? e = +e[r.hcSetMonth](e[r.hcGetMonth]() + t) : "year" === s && (e = +e[r.hcSetFullYear](e[r.hcGetFullYear]() + t)), t = e - i), this.xIncrement = i + t, i
                },
                setOptions: function(t) {
                    var e = this.chart,
                        i = e.options.plotOptions,
                        e = e.userOptions || {},
                        s = e.plotOptions || {},
                        n = i[this.type];
                    return this.userOptions = t, i = x(n, i.series, t), this.tooltipOptions = x(a.tooltip, a.plotOptions[this.type].tooltip, e.tooltip, s.series && s.series.tooltip, s[this.type] && s[this.type].tooltip, t.tooltip), null === n.marker && delete i.marker, this.zoneAxis = i.zoneAxis, t = this.zones = (i.zones || []).slice(), !i.negativeColor && !i.negativeFillColor || i.zones || t.push({
                        value: i[this.zoneAxis + "Threshold"] || i.threshold || 0,
                        className: "highcharts-negative",
                        color: i.negativeColor,
                        fillColor: i.negativeFillColor
                    }), t.length && l(t[t.length - 1].value) && t.push({
                        color: this.color,
                        fillColor: this.fillColor
                    }), i
                },
                getCyclic: function(t, e, i) {
                    var s, n = this.userOptions,
                        o = t + "Index",
                        r = t + "Counter",
                        a = i ? i.length : y(this.chart.options.chart[t + "Count"], this.chart[t + "Count"]);
                    e || (s = y(n[o], n["_" + o]), l(s) || (n["_" + o] = s = this.chart[r] % a, this.chart[r] += 1), i && (e = i[s])), void 0 !== s && (this[o] = s), this[t] = e
                },
                getColor: function() {
                    this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || h[this.type].color, this.chart.options.colors)
                },
                getSymbol: function() {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                drawLegendSymbol: t.LegendSymbolMixin.drawLineMarker,
                setData: function(e, i, s, n) {
                    var o, r = this,
                        a = r.points,
                        h = a && a.length || 0,
                        l = r.options,
                        d = r.chart,
                        p = null,
                        u = r.xAxis,
                        f = l.turboThreshold,
                        x = this.xData,
                        b = this.yData,
                        k = (o = r.pointArrayMap) && o.length;
                    if (e = e || [], o = e.length, i = y(i, !0), !1 !== n && o && h === o && !r.cropped && !r.hasGroupedData && r.visible) c(e, function(t, e) {
                        a[e].update && t !== l.data[e] && a[e].update(t, !1, null, !1)
                    });
                    else {
                        if (r.xIncrement = null, r.colorCounter = 0, c(this.parallelArrays, function(t) {
                                r[t + "Data"].length = 0
                            }), f && o > f) {
                            for (s = 0; null === p && o > s;) p = e[s], s++;
                            if (m(p))
                                for (s = 0; o > s; s++) x[s] = this.autoIncrement(), b[s] = e[s];
                            else if (g(p))
                                if (k)
                                    for (s = 0; o > s; s++) p = e[s], x[s] = p[0], b[s] = p.slice(1, k + 1);
                                else
                                    for (s = 0; o > s; s++) p = e[s], x[s] = p[0], b[s] = p[1];
                            else t.error(12)
                        } else
                            for (s = 0; o > s; s++) void 0 !== e[s] && (p = {
                                series: r
                            }, r.pointClass.prototype.applyOptions.apply(p, [e[s]]), r.updateParallelArrays(p, s));
                        for (v(b[0]) && t.error(14, !0), r.data = [], r.options.data = r.userOptions.data = e, s = h; s--;) a[s] && a[s].destroy && a[s].destroy();
                        u && (u.minRange = u.userMinRange), r.isDirty = d.isDirtyBox = !0, r.isDirtyData = !!a, s = !1
                    }
                    "point" === l.legendType && (this.processData(), this.generatePoints()), i && d.redraw(s)
                },
                processData: function(e) {
                    var i, s = this.xData,
                        n = this.yData,
                        o = s.length;
                    i = 0;
                    var r, a, h, l = this.xAxis,
                        c = this.options;
                    h = c.cropThreshold;
                    var d, p, u = this.getExtremesFromAll || c.getExtremesFromAll,
                        f = this.isCartesian,
                        c = l && l.val2lin,
                        g = l && l.isLog;
                    if (f && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !e) return !1;
                    for (l && (e = l.getExtremes(), d = e.min, p = e.max), f && this.sorted && !u && (!h || o > h || this.forceCrop) && (s[o - 1] < d || s[0] > p ? (s = [], n = []) : (s[0] < d || s[o - 1] > p) && (i = this.cropData(this.xData, this.yData, d, p), s = i.xData, n = i.yData, i = i.start, r = !0)), h = s.length || 1; --h;) o = g ? c(s[h]) - c(s[h - 1]) : s[h] - s[h - 1], o > 0 && (void 0 === a || a > o) ? a = o : 0 > o && this.requireSorting && t.error(15);
                    this.cropped = r, this.cropStart = i, this.processedXData = s, this.processedYData = n, this.closestPointRange = a
                },
                cropData: function(t, e, i, s) {
                    var n, o = t.length,
                        r = 0,
                        a = o,
                        h = y(this.cropShoulder, 1);
                    for (n = 0; o > n; n++)
                        if (t[n] >= i) {
                            r = Math.max(0, n - h);
                            break
                        }
                    for (i = n; o > i; i++)
                        if (t[i] > s) {
                            a = i + h;
                            break
                        }
                    return {
                        xData: t.slice(r, a),
                        yData: e.slice(r, a),
                        start: r,
                        end: a
                    }
                },
                generatePoints: function() {
                    var t, e, i, s, n = this.options.data,
                        o = this.data,
                        r = this.processedXData,
                        a = this.processedYData,
                        h = this.pointClass,
                        l = r.length,
                        c = this.cropStart || 0,
                        d = this.hasGroupedData,
                        p = [];
                    for (o || d || (o = [], o.length = n.length, o = this.data = o), s = 0; l > s; s++) e = c + s, d ? (i = (new h).init(this, [r[s]].concat(k(a[s]))), i.dataGroup = this.groupMap[s]) : (i = o[e]) || void 0 === n[e] || (o[e] = i = (new h).init(this, n[e], r[s])), i.index = e, p[s] = i;
                    if (o && (l !== (t = o.length) || d))
                        for (s = 0; t > s; s++) s !== c || d || (s += l), o[s] && (o[s].destroyElements(), o[s].plotX = void 0);
                    this.data = o, this.points = p
                },
                getExtremes: function(t) {
                    var e, i = this.yAxis,
                        o = this.processedXData,
                        r = [],
                        a = 0;
                    e = this.xAxis.getExtremes();
                    var h, l, c, d, p = e.min,
                        u = e.max;
                    for (t = t || this.stackedYData || this.processedYData || [], e = t.length, d = 0; e > d; d++)
                        if (l = o[d], c = t[d], h = (m(c, !0) || g(c)) && (!i.isLog || c.length || c > 0), l = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (o[d + 1] || l) >= p && (o[d - 1] || l) <= u, h && l)
                            if (h = c.length)
                                for (; h--;) null !== c[h] && (r[a++] = c[h]);
                            else r[a++] = c;
                    this.dataMin = n(r), this.dataMax = s(r)
                },
                translate: function() {
                    this.processedXData || this.processData(), this.generatePoints();
                    var t, e, i, s, n = this.options,
                        r = n.stacking,
                        a = this.xAxis,
                        h = a.categories,
                        c = this.yAxis,
                        d = this.points,
                        p = d.length,
                        u = !!this.modifyValue,
                        f = n.pointPlacement,
                        g = "between" === f || m(f),
                        v = n.threshold,
                        x = n.startFromThreshold ? v : 0,
                        b = Number.MAX_VALUE;
                    for ("between" === f && (f = .5), m(f) && (f *= y(n.pointRange || a.pointRange)), n = 0; p > n; n++) {
                        var k = d[n],
                            M = k.x,
                            w = k.y;
                        e = k.low;
                        var S, T = r && c.stacks[(this.negStacks && (x ? 0 : v) > w ? "-" : "") + this.stackKey];
                        c.isLog && null !== w && 0 >= w && (k.isNull = !0), k.plotX = t = o(Math.min(Math.max(-1e5, a.translate(M, 0, 0, 0, 1, f, "flags" === this.type)), 1e5)), r && this.visible && !k.isNull && T && T[M] && (s = this.getStackIndicator(s, M, this.index), S = T[M], w = S.points[s.key], e = w[0], w = w[1], e === x && s.key === T[M].base && (e = y(v, c.min)), c.isLog && 0 >= e && (e = null), k.total = k.stackTotal = S.total, k.percentage = S.total && k.y / S.total * 100, k.stackY = w, S.setOffset(this.pointXOffset || 0, this.barW || 0)), k.yBottom = l(e) ? c.translate(e, 0, 1, 0, 1) : null, u && (w = this.modifyValue(w, k)), k.plotY = e = "number" == typeof w && 1 / 0 !== w ? Math.min(Math.max(-1e5, c.translate(w, 0, 1, 0, 1)), 1e5) : void 0, k.isInside = void 0 !== e && e >= 0 && e <= c.len && t >= 0 && t <= a.len, k.clientX = g ? o(a.translate(M, 0, 0, 0, 1, f)) : t, k.negative = k.y < (v || 0), k.category = h && void 0 !== h[k.x] ? h[k.x] : k.x, k.isNull || (void 0 !== i && (b = Math.min(b, Math.abs(t - i))), i = t), k.zone = this.zones.length && k.getZone()
                    }
                    this.closestPointRangePx = b
                },
                getValidPoints: function(t, e) {
                    var i = this.chart;
                    return f(t || this.points || [], function(t) {
                        return e && !i.isInsidePlot(t.plotX, t.plotY, i.inverted) ? !1 : !t.isNull
                    })
                },
                setClip: function(t) {
                    var e = this.chart,
                        i = this.options,
                        s = e.renderer,
                        n = e.inverted,
                        o = this.clipBox,
                        r = o || e.clipBox,
                        a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, r.height, i.xAxis, i.yAxis].join(),
                        h = e[a],
                        l = e[a + "m"];
                    h || (t && (r.width = 0, e[a + "m"] = l = s.clipRect(-99, n ? -e.plotLeft : -e.plotTop, 99, n ? e.chartWidth : e.chartHeight)), e[a] = h = s.clipRect(r), h.count = {
                        length: 0
                    }), t && !h.count[this.index] && (h.count[this.index] = !0, h.count.length += 1), !1 !== i.clip && (this.group.clip(t || o ? h : e.clipRect), this.markerGroup.clip(l), this.sharedClipKey = a), t || (h.count[this.index] && (delete h.count[this.index], --h.count.length), 0 === h.count.length && a && e[a] && (o || (e[a] = e[a].destroy()), e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
                },
                animate: function(t) {
                    var e, s = this.chart,
                        n = i(this.options.animation);
                    t ? this.setClip(n) : (e = this.sharedClipKey, (t = s[e]) && t.animate({
                        width: s.plotSizeX
                    }, n), s[e + "m"] && s[e + "m"].animate({
                        width: s.plotSizeX + 99
                    }, n), this.animate = null)
                },
                afterAnimate: function() {
                    this.setClip(), u(this, "afterAnimate")
                },
                drawPoints: function() {
                    var t, e, i, s, n, o, r, a, h = this.points,
                        l = this.chart,
                        c = this.options.marker,
                        d = this.markerGroup,
                        p = y(c.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * c.radius);
                    if (!1 !== c.enabled || this._hasPointMarkers)
                        for (e = h.length; e--;) i = h[e], t = i.plotY, s = i.graphic, n = i.marker || {}, o = !!i.marker, r = p && void 0 === n.enabled || n.enabled, a = i.isInside, r && m(t) && null !== i.y ? (t = y(n.symbol, this.symbol), i.hasImage = 0 === t.indexOf("url"), r = this.markerAttribs(i, i.selected && "select"), s ? s[a ? "show" : "hide"](!0).animate(r) : a && (0 < r.width || i.hasImage) && (i.graphic = s = l.renderer.symbol(t, r.x, r.y, r.width, r.height, o ? n : c).add(d)), s && s.attr(this.pointAttribs(i, i.selected && "select")), s && s.addClass(i.getClassName(), !0)) : s && (i.graphic = s.destroy())
                },
                markerAttribs: function(t, e) {
                    var i = this.options.marker,
                        s = t && t.options,
                        n = s && s.marker || {},
                        s = y(n.radius, i.radius);
                    return e && (i = i.states[e], e = n.states && n.states[e], s = y(e && e.radius, i && i.radius, s + (i && i.radiusPlus || 0))), t.hasImage && (s = 0), t = {
                        x: Math.floor(t.plotX) - s,
                        y: t.plotY - s
                    }, s && (t.width = t.height = 2 * s), t
                },
                pointAttribs: function(t, e) {
                    var i = this.options.marker,
                        s = t && t.options,
                        n = s && s.marker || {},
                        o = this.color,
                        r = s && s.color,
                        a = t && t.color,
                        s = y(n.lineWidth, i.lineWidth);
                    return t = t && t.zone && t.zone.color, o = r || t || a || o, t = n.fillColor || i.fillColor || o, o = n.lineColor || i.lineColor || o, e && (i = i.states[e], e = n.states && n.states[e] || {}, s = y(e.lineWidth, i.lineWidth, s + y(e.lineWidthPlus, i.lineWidthPlus, 0)), t = e.fillColor || i.fillColor || t, o = e.lineColor || i.lineColor || o), {
                        stroke: o,
                        "stroke-width": s,
                        fill: t
                    }
                },
                destroy: function() {
                    var t, e, i, s, n = this,
                        o = n.chart,
                        r = /AppleWebKit\/533/.test(S.navigator.userAgent),
                        a = n.data || [];
                    for (u(n, "destroy"), b(n), c(n.axisTypes || [], function(t) {
                            (s = n[t]) && s.series && (d(s.series, n), s.isDirty = s.forceRedraw = !0)
                        }), n.legendItem && n.chart.legend.destroyItem(n), t = a.length; t--;)(e = a[t]) && e.destroy && e.destroy();
                    n.points = null, clearTimeout(n.animationTimeout);
                    for (i in n) n[i] instanceof M && !n[i].survive && (t = r && "group" === i ? "hide" : "destroy", n[i][t]());
                    o.hoverSeries === n && (o.hoverSeries = null), d(o.series, n);
                    for (i in n) delete n[i]
                },
                getGraphPath: function(t, e, i) {
                    var s, n, o = this,
                        r = o.options,
                        a = r.step,
                        h = [],
                        d = [];
                    return t = t || o.points, (s = t.reversed) && t.reverse(), (a = {
                        right: 1,
                        center: 2
                    }[a] || a && 3) && s && (a = 4 - a), !r.connectNulls || e || i || (t = this.getValidPoints(t)), c(t, function(s, c) {
                        var p = s.plotX,
                            u = s.plotY,
                            f = t[c - 1];
                        (s.leftCliff || f && f.rightCliff) && !i && (n = !0), s.isNull && !l(e) && c > 0 ? n = !r.connectNulls : s.isNull && !e ? n = !0 : (0 === c || n ? c = ["M", s.plotX, s.plotY] : o.getPointSpline ? c = o.getPointSpline(t, s, c) : a ? (c = 1 === a ? ["L", f.plotX, u] : 2 === a ? ["L", (f.plotX + p) / 2, f.plotY, "L", (f.plotX + p) / 2, u] : ["L", p, f.plotY], c.push("L", p, u)) : c = ["L", p, u], d.push(s.x), a && d.push(s.x), h.push.apply(h, c), n = !1)
                    }), h.xMap = d, o.graphPath = h
                },
                drawGraph: function() {
                    var t = this,
                        e = this.options,
                        i = (this.gappedPath || this.getGraphPath).call(this),
                        s = [
                            ["graph", "highcharts-graph", e.lineColor || this.color, e.dashStyle]
                        ];
                    c(this.zones, function(i, n) {
                        s.push(["zone-graph-" + n, "highcharts-graph highcharts-zone-graph-" + n + " " + (i.className || ""), i.color || t.color, i.dashStyle || e.dashStyle])
                    }), c(s, function(s, n) {
                        var o = s[0],
                            r = t[o];
                        r ? (r.endX = i.xMap, r.animate({
                            d: i
                        })) : i.length && (t[o] = t.chart.renderer.path(i).addClass(s[1]).attr({
                            zIndex: 1
                        }).add(t.group), r = {
                            stroke: s[2],
                            "stroke-width": e.lineWidth,
                            fill: t.fillGraph && t.color || "none"
                        }, s[3] ? r.dashstyle = s[3] : "square" !== e.linecap && (r["stroke-linecap"] = r["stroke-linejoin"] = "round"), r = t[o].attr(r).shadow(2 > n && e.shadow)), r && (r.startX = i.xMap, r.isArea = i.isArea)
                    })
                },
                applyZones: function() {
                    var t, e, i, s, n, o, r, a, h, l = this,
                        d = this.chart,
                        p = d.renderer,
                        u = this.zones,
                        f = this.clips || [],
                        g = this.graph,
                        m = this.area,
                        v = Math.max(d.chartWidth, d.chartHeight),
                        x = this[(this.zoneAxis || "y") + "Axis"],
                        b = d.inverted,
                        k = !1;
                    u.length && (g || m) && x && void 0 !== x.min && (n = x.reversed, o = x.horiz, g && g.hide(), m && m.hide(), s = x.getExtremes(), c(u, function(c, u) {
                        t = n ? o ? d.plotWidth : 0 : o ? 0 : x.toPixels(s.min), t = Math.min(Math.max(y(e, t), 0), v), e = Math.min(Math.max(Math.round(x.toPixels(y(c.value, s.max), !0)), 0), v), k && (t = e = x.toPixels(s.max)), r = Math.abs(t - e), a = Math.min(t, e), h = Math.max(t, e), x.isXAxis ? (i = {
                            x: b ? h : a,
                            y: 0,
                            width: r,
                            height: v
                        }, o || (i.x = d.plotHeight - i.x)) : (i = {
                            x: 0,
                            y: b ? h : a,
                            width: v,
                            height: r
                        }, o && (i.y = d.plotWidth - i.y)), b && p.isVML && (i = x.isXAxis ? {
                            x: 0,
                            y: n ? a : h,
                            height: i.width,
                            width: d.chartWidth
                        } : {
                            x: i.y - d.plotLeft - d.spacingBox.x,
                            y: 0,
                            width: i.height,
                            height: d.chartHeight
                        }), f[u] ? f[u].animate(i) : (f[u] = p.clipRect(i), g && l["zone-graph-" + u].clip(f[u]), m && l["zone-area-" + u].clip(f[u])), k = c.value > s.max
                    }), this.clips = f)
                },
                invertGroups: function(t) {
                    function i() {
                        var e = {
                            width: n.yAxis.len,
                            height: n.xAxis.len
                        };
                        c(["group", "markerGroup"], function(i) {
                            n[i] && n[i].attr(e).invert(t)
                        })
                    }
                    var s, n = this;
                    n.xAxis && (s = e(n.chart, "resize", i), e(n, "destroy", s), i(t), n.invertGroups = i)
                },
                plotGroup: function(t, e, i, s, n) {
                    var o = this[t],
                        r = !o;
                    return r && (this[t] = o = this.chart.renderer.g(e).attr({
                        zIndex: s || .1
                    }).add(n), o.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""))), o.attr({
                        visibility: i
                    })[r ? "attr" : "animate"](this.getPlotBox()), o
                },
                getPlotBox: function() {
                    var t = this.chart,
                        e = this.xAxis,
                        i = this.yAxis;
                    return t.inverted && (e = i, i = this.xAxis), {
                        translateX: e ? e.left : t.plotLeft,
                        translateY: i ? i.top : t.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                render: function() {
                    var t, e = this,
                        s = e.chart,
                        n = e.options,
                        o = !!e.animate && s.renderer.isSVG && i(n.animation).duration,
                        r = e.visible ? "inherit" : "hidden",
                        a = n.zIndex,
                        h = e.hasRendered,
                        l = s.seriesGroup,
                        c = s.inverted;
                    t = e.plotGroup("group", "series", r, a, l), e.markerGroup = e.plotGroup("markerGroup", "markers", r, a, l), o && e.animate(!0), t.inverted = e.isCartesian ? c : !1, e.drawGraph && (e.drawGraph(), e.applyZones()), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(), e.invertGroups(c), !1 === n.clip || e.sharedClipKey || h || t.clip(s.clipRect), o && e.animate(), h || (e.animationTimeout = w(function() {
                        e.afterAnimate()
                    }, o)), e.isDirty = e.isDirtyData = !1, e.hasRendered = !0
                },
                redraw: function() {
                    var t = this.chart,
                        e = this.isDirty || this.isDirtyData,
                        i = this.group,
                        s = this.xAxis,
                        n = this.yAxis;
                    i && (t.inverted && i.attr({
                        width: t.plotWidth,
                        height: t.plotHeight
                    }), i.animate({
                        translateX: y(s && s.left, t.plotLeft),
                        translateY: y(n && n.top, t.plotTop)
                    })), this.translate(), this.render(), e && delete this.kdTree
                },
                kdDimensions: 1,
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function(t, e) {
                    var i = this.xAxis,
                        s = this.yAxis,
                        n = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: n ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                        plotY: n ? s.len - t.chartX + s.pos : t.chartY - s.pos
                    }, e)
                },
                buildKDTree: function() {
                    function t(i, s, n) {
                        var o, r;
                        return (r = i && i.length) ? (o = e.kdAxisArray[s % n], i.sort(function(t, e) {
                            return t[o] - e[o]
                        }), r = Math.floor(r / 2), {
                            point: i[r],
                            left: t(i.slice(0, r), s + 1, n),
                            right: t(i.slice(r + 1), s + 1, n)
                        }) : void 0
                    }
                    var e = this,
                        i = e.kdDimensions;
                    delete e.kdTree, w(function() {
                        e.kdTree = t(e.getValidPoints(null, !e.directTouch), i, i)
                    }, e.options.kdNow ? 0 : 1)
                },
                searchKDTree: function(t, e) {
                    function i(t, e, a, h) {
                        var c, d, p = e.point,
                            u = s.kdAxisArray[a % h],
                            f = p;
                        return d = l(t[n]) && l(p[n]) ? Math.pow(t[n] - p[n], 2) : null, c = l(t[o]) && l(p[o]) ? Math.pow(t[o] - p[o], 2) : null, c = (d || 0) + (c || 0), p.dist = l(c) ? Math.sqrt(c) : Number.MAX_VALUE, p.distX = l(d) ? Math.sqrt(d) : Number.MAX_VALUE, u = t[u] - p[u], c = 0 > u ? "left" : "right", d = 0 > u ? "right" : "left", e[c] && (c = i(t, e[c], a + 1, h), f = c[r] < f[r] ? c : p), e[d] && Math.sqrt(u * u) < f[r] && (t = i(t, e[d], a + 1, h), f = t[r] < f[r] ? t : f), f
                    }
                    var s = this,
                        n = this.kdAxisArray[0],
                        o = this.kdAxisArray[1],
                        r = e ? "distX" : "dist";
                    return this.kdTree || this.buildKDTree(), this.kdTree ? i(t, this.kdTree, this.kdDimensions, this.kdDimensions) : void 0
                }
            })
        }(t),
        function(t) {
            function e(t, e, i, s, n) {
                var o = t.chart.inverted;
                this.axis = t, this.isNegative = i, this.options = e, this.x = s, this.total = null, this.points = {}, this.stack = n, this.rightCliff = this.leftCliff = 0, this.alignOptions = {
                    align: e.align || (o ? i ? "left" : "right" : "center"),
                    verticalAlign: e.verticalAlign || (o ? "middle" : i ? "bottom" : "top"),
                    y: l(e.y, o ? 4 : i ? 14 : -6),
                    x: l(e.x, o ? i ? -6 : 6 : 0)
                }, this.textAlign = e.textAlign || (o ? i ? "right" : "left" : "center")
            }
            var i = t.Axis,
                s = t.Chart,
                n = t.correctFloat,
                o = t.defined,
                r = t.destroyObjectProperties,
                a = t.each,
                h = t.format,
                l = t.pick;
            t = t.Series, e.prototype = {
                destroy: function() {
                    r(this, this.axis)
                },
                render: function(t) {
                    var e = this.options,
                        i = e.format,
                        i = i ? h(i, this) : e.formatter.call(this);
                    this.label ? this.label.attr({
                        text: i,
                        visibility: "hidden"
                    }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                        align: this.textAlign,
                        rotation: e.rotation,
                        visibility: "hidden"
                    }).add(t)
                },
                setOffset: function(t, e) {
                    var i = this.axis,
                        s = i.chart,
                        n = s.inverted,
                        o = i.reversed,
                        o = this.isNegative && !o || !this.isNegative && o,
                        r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                        i = i.translate(0),
                        i = Math.abs(r - i);
                    t = s.xAxis[0].translate(this.x) + t;
                    var a = s.plotHeight,
                        n = {
                            x: n ? o ? r : r - i : t,
                            y: n ? a - t - e : o ? a - r - i : a - r,
                            width: n ? i : e,
                            height: n ? e : i
                        };
                    (e = this.label) && (e.align(this.alignOptions, null, n), n = e.alignAttr, e[!1 === this.options.crop || s.isInsidePlot(n.x, n.y) ? "show" : "hide"](!0))
                }
            }, s.prototype.getStacks = function() {
                var t = this;
                a(t.yAxis, function(t) {
                    t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
                }), a(t.series, function(e) {
                    !e.options.stacking || !0 !== e.visible && !1 !== t.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + l(e.options.stack, ""))
                })
            }, i.prototype.buildStacks = function() {
                var t, e, i = this.series,
                    s = l(this.options.reversedStacks, !0),
                    n = i.length;
                if (!this.isXAxis) {
                    for (this.usePercentage = !1, e = n; e--;) i[s ? e : n - e - 1].setStackedPoints();
                    for (e = n; e--;) t = i[s ? e : n - e - 1], t.setStackCliffs && t.setStackCliffs();
                    if (this.usePercentage)
                        for (e = 0; n > e; e++) i[e].setPercentStacks()
                }
            }, i.prototype.renderStackTotals = function() {
                var t, e, i = this.chart,
                    s = i.renderer,
                    n = this.stacks,
                    o = this.stackTotalGroup;
                o || (this.stackTotalGroup = o = s.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6
                }).add()), o.translate(i.plotLeft, i.plotTop);
                for (t in n)
                    for (e in i = n[t]) i[e].render(o)
            }, i.prototype.resetStacks = function() {
                var t, e, i = this.stacks;
                if (!this.isXAxis)
                    for (t in i)
                        for (e in i[t]) i[t][e].touched < this.stacksTouched ? (i[t][e].destroy(), delete i[t][e]) : (i[t][e].total = null, i[t][e].cum = null)
            }, i.prototype.cleanStacks = function() {
                var t, e, i;
                if (!this.isXAxis)
                    for (e in this.oldStacks && (t = this.stacks = this.oldStacks), t)
                        for (i in t[e]) t[e][i].cum = t[e][i].total
            }, t.prototype.setStackedPoints = function() {
                if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                    var t, i, s, r, a, h, c, d = this.processedXData,
                        p = this.processedYData,
                        u = [],
                        f = p.length,
                        g = this.options,
                        m = g.threshold,
                        v = g.startFromThreshold ? m : 0,
                        x = g.stack,
                        g = g.stacking,
                        y = this.stackKey,
                        b = "-" + y,
                        k = this.negStacks,
                        M = this.yAxis,
                        w = M.stacks,
                        S = M.oldStacks;
                    for (M.stacksTouched += 1, a = 0; f > a; a++) h = d[a], c = p[a], t = this.getStackIndicator(t, h, this.index), r = t.key, s = (i = k && (v ? 0 : m) > c) ? b : y, w[s] || (w[s] = {}), w[s][h] || (S[s] && S[s][h] ? (w[s][h] = S[s][h], w[s][h].total = null) : w[s][h] = new e(M, M.options.stackLabels, i, h, x)), s = w[s][h], null !== c && (s.points[r] = s.points[this.index] = [l(s.cum, v)], o(s.cum) || (s.base = r), s.touched = M.stacksTouched, 0 < t.index && !1 === this.singleStacks && (s.points[r][0] = s.points[this.index + "," + h + ",0"][0])), "percent" === g ? (i = i ? y : b, k && w[i] && w[i][h] ? (i = w[i][h], s.total = i.total = Math.max(i.total, s.total) + Math.abs(c) || 0) : s.total = n(s.total + (Math.abs(c) || 0))) : s.total = n(s.total + (c || 0)), s.cum = l(s.cum, v) + (c || 0), null !== c && (s.points[r].push(s.cum), u[a] = s.cum);
                    "percent" === g && (M.usePercentage = !0), this.stackedYData = u, M.oldStacks = {}
                }
            }, t.prototype.setPercentStacks = function() {
                var t, e = this,
                    i = e.stackKey,
                    s = e.yAxis.stacks,
                    o = e.processedXData;
                a([i, "-" + i], function(i) {
                    for (var r, a, h = o.length; h--;) r = o[h], t = e.getStackIndicator(t, r, e.index, i), (r = (a = s[i] && s[i][r]) && a.points[t.key]) && (a = a.total ? 100 / a.total : 0, r[0] = n(r[0] * a), r[1] = n(r[1] * a), e.stackedYData[h] = r[1])
                })
            }, t.prototype.getStackIndicator = function(t, e, i, s) {
                return !o(t) || t.x !== e || s && t.key !== s ? t = {
                    x: e,
                    index: 0,
                    key: s
                } : t.index++, t.key = [i, e, t.index].join(), t
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.animate,
                s = t.Axis,
                n = t.createElement,
                o = t.css,
                r = t.defined,
                a = t.each,
                h = t.erase,
                l = t.extend,
                c = t.fireEvent,
                d = t.inArray,
                p = t.isNumber,
                u = t.isObject,
                f = t.merge,
                g = t.pick,
                m = t.Point,
                v = t.Series,
                x = t.seriesTypes,
                y = t.setAnimation,
                b = t.splat;
            l(t.Chart.prototype, {
                addSeries: function(t, e, i) {
                    var s, n = this;
                    return t && (e = g(e, !0), c(n, "addSeries", {
                        options: t
                    }, function() {
                        s = n.initSeries(t), n.isDirtyLegend = !0, n.linkSeries(), e && n.redraw(i)
                    })), s
                },
                addAxis: function(t, e, i, n) {
                    var o = e ? "xAxis" : "yAxis",
                        r = this.options;
                    t = f(t, {
                        index: this[o].length,
                        isX: e
                    }), new s(this, t), r[o] = b(r[o] || {}), r[o].push(t), g(i, !0) && this.redraw(n)
                },
                showLoading: function(t) {
                    var s = this,
                        r = s.options,
                        a = s.loadingDiv,
                        h = r.loading,
                        c = function() {
                            a && o(a, {
                                left: s.plotLeft + "px",
                                top: s.plotTop + "px",
                                width: s.plotWidth + "px",
                                height: s.plotHeight + "px"
                            })
                        };
                    a || (s.loadingDiv = a = n("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                    }, null, s.container), s.loadingSpan = n("span", {
                        className: "highcharts-loading-inner"
                    }, null, a), e(s, "redraw", c)), a.className = "highcharts-loading", s.loadingSpan.innerHTML = t || r.lang.loading, o(a, l(h.style, {
                        zIndex: 10
                    })), o(s.loadingSpan, h.labelStyle), s.loadingShown || (o(a, {
                        opacity: 0,
                        display: ""
                    }), i(a, {
                        opacity: h.style.opacity || .5
                    }, {
                        duration: h.showDuration || 0
                    })), s.loadingShown = !0, c()
                },
                hideLoading: function() {
                    var t = this.options,
                        e = this.loadingDiv;
                    e && (e.className = "highcharts-loading highcharts-loading-hidden", i(e, {
                        opacity: 0
                    }, {
                        duration: t.loading.hideDuration || 100,
                        complete: function() {
                            o(e, {
                                display: "none"
                            })
                        }
                    })), this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
                update: function(t, e) {
                    var i, s, n, o = {
                            credits: "addCredits",
                            title: "setTitle",
                            subtitle: "setSubtitle"
                        },
                        h = t.chart;
                    if (h) {
                        f(!0, this.options.chart, h), "className" in h && this.setClassName(h.className), ("inverted" in h || "polar" in h) && (this.propFromSeries(), s = !0);
                        for (i in h) h.hasOwnProperty(i) && (-1 !== d("chart." + i, this.propsRequireUpdateSeries) && (n = !0), -1 !== d(i, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                        "style" in h && this.renderer.setStyle(h.style)
                    }
                    for (i in t) this[i] && "function" == typeof this[i].update ? this[i].update(t[i], !1) : "function" == typeof this[o[i]] && this[o[i]](t[i]), "chart" !== i && -1 !== d(i, this.propsRequireUpdateSeries) && (n = !0);
                    t.colors && (this.options.colors = t.colors), t.plotOptions && f(!0, this.options.plotOptions, t.plotOptions), a(["xAxis", "yAxis", "series"], function(e) {
                        t[e] && a(b(t[e]), function(t) {
                            var i = r(t.id) && this.get(t.id) || this[e][0];
                            i && i.coll === e && i.update(t, !1)
                        }, this)
                    }, this), s && a(this.axes, function(t) {
                        t.update({}, !1)
                    }), n && a(this.series, function(t) {
                        t.update({}, !1)
                    }), t.loading && f(!0, this.options.loading, t.loading), i = h && h.width, h = h && h.height, p(i) && i !== this.chartWidth || p(h) && h !== this.chartHeight ? this.setSize(i, h) : g(e, !0) && this.redraw()
                },
                setSubtitle: function(t) {
                    this.setTitle(void 0, t)
                }
            }), l(m.prototype, {
                update: function(t, e, i, s) {
                    function n() {
                        r.applyOptions(t), null === r.y && h && (r.graphic = h.destroy()), u(t, !0) && (h && h.element && t && t.marker && t.marker.symbol && (r.graphic = h.destroy()), t && t.dataLabels && r.dataLabel && (r.dataLabel = r.dataLabel.destroy())), o = r.index, a.updateParallelArrays(r, o), c.data[o] = u(c.data[o], !0) ? r.options : t, a.isDirty = a.isDirtyData = !0, !a.fixedBox && a.hasCartesianSeries && (l.isDirtyBox = !0), "point" === c.legendType && (l.isDirtyLegend = !0), e && l.redraw(i)
                    }
                    var o, r = this,
                        a = r.series,
                        h = r.graphic,
                        l = a.chart,
                        c = a.options;
                    e = g(e, !0), !1 === s ? n() : r.firePointEvent("update", {
                        options: t
                    }, n)
                },
                remove: function(t, e) {
                    this.series.removePoint(d(this, this.series.data), t, e)
                }
            }), l(v.prototype, {
                addPoint: function(t, e, i, s) {
                    var n, o, r, a, h = this.options,
                        l = this.data,
                        c = this.chart,
                        d = this.xAxis && this.xAxis.names,
                        p = h.data,
                        u = this.xData;
                    if (e = g(e, !0), n = {
                            series: this
                        }, this.pointClass.prototype.applyOptions.apply(n, [t]), a = n.x, r = u.length, this.requireSorting && a < u[r - 1])
                        for (o = !0; r && u[r - 1] > a;) r--;
                    this.updateParallelArrays(n, "splice", r, 0, 0), this.updateParallelArrays(n, r), d && n.name && (d[a] = n.name), p.splice(r, 0, t), o && (this.data.splice(r, 0, null), this.processData()), "point" === h.legendType && this.generatePoints(), i && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(n, "shift"), p.shift())), this.isDirtyData = this.isDirty = !0, e && c.redraw(s)
                },
                removePoint: function(t, e, i) {
                    var s = this,
                        n = s.data,
                        o = n[t],
                        r = s.points,
                        a = s.chart,
                        h = function() {
                            r && r.length === n.length && r.splice(t, 1), n.splice(t, 1), s.options.data.splice(t, 1), s.updateParallelArrays(o || {
                                series: s
                            }, "splice", t, 1), o && o.destroy(), s.isDirty = !0, s.isDirtyData = !0, e && a.redraw()
                        };
                    y(i, a), e = g(e, !0), o ? o.firePointEvent("remove", null, h) : h()
                },
                remove: function(t, e, i) {
                    function s() {
                        n.destroy(), o.isDirtyLegend = o.isDirtyBox = !0, o.linkSeries(), g(t, !0) && o.redraw(e)
                    }
                    var n = this,
                        o = n.chart;
                    !1 !== i ? c(n, "remove", null, s) : s()
                },
                update: function(t, e) {
                    var i, s = this,
                        n = this.chart,
                        o = this.userOptions,
                        r = this.type,
                        h = t.type || o.type || n.options.chart.type,
                        c = x[r].prototype,
                        d = ["group", "markerGroup", "dataLabelsGroup"];
                    (h && h !== r || void 0 !== t.zIndex) && (d.length = 0), a(d, function(t) {
                        d[t] = s[t], delete s[t]
                    }), t = f(o, {
                        animation: !1,
                        index: this.index,
                        pointStart: this.xData[0]
                    }, {
                        data: this.options.data
                    }, t), this.remove(!1, null, !1);
                    for (i in c) this[i] = void 0;
                    l(this, x[h || r].prototype), a(d, function(t) {
                        s[t] = d[t]
                    }), this.init(n, t), n.linkSeries(), g(e, !0) && n.redraw(!1)
                }
            }), l(s.prototype, {
                update: function(t, e) {
                    var i = this.chart;
                    t = i.options[this.coll][this.options.index] = f(this.userOptions, t), this.destroy(!0), this.init(i, l(t, {
                        events: void 0
                    })), i.isDirtyBox = !0, g(e, !0) && i.redraw()
                },
                remove: function(t) {
                    for (var e = this.chart, i = this.coll, s = this.series, n = s.length; n--;) s[n] && s[n].remove(!1);
                    h(e.axes, this), h(e[i], this), e.options[i].splice(this.options.index, 1), a(e[i], function(t, e) {
                        t.options.index = e
                    }), this.destroy(), e.isDirtyBox = !0, g(t, !0) && e.redraw()
                },
                setTitle: function(t, e) {
                    this.update({
                        title: t
                    }, e)
                },
                setCategories: function(t, e) {
                    this.update({
                        categories: t
                    }, e)
                }
            })
        }(t),
        function(t) {
            var e = t.color,
                i = t.each,
                s = t.map,
                n = t.pick,
                o = t.Series,
                r = t.seriesType;
            r("area", "line", {
                softThreshold: !1,
                threshold: 0
            }, {
                singleStacks: !1,
                getStackPoints: function() {
                    var t, e, o, r = [],
                        a = [],
                        h = this.xAxis,
                        l = this.yAxis,
                        c = l.stacks[this.stackKey],
                        d = {},
                        p = this.points,
                        u = this.index,
                        f = l.series,
                        g = f.length,
                        m = n(l.options.reversedStacks, !0) ? 1 : -1;
                    if (this.options.stacking) {
                        for (e = 0; e < p.length; e++) d[p[e].x] = p[e];
                        for (o in c) null !== c[o].total && a.push(o);
                        a.sort(function(t, e) {
                            return t - e
                        }), t = s(f, function() {
                            return this.visible
                        }), i(a, function(s, n) {
                            var o, p, f = 0;
                            if (d[s] && !d[s].isNull) r.push(d[s]), i([-1, 1], function(i) {
                                var r = 1 === i ? "rightNull" : "leftNull",
                                    h = 0,
                                    l = c[a[n + i]];
                                if (l)
                                    for (e = u; e >= 0 && g > e;) o = l.points[e], o || (e === u ? d[s][r] = !0 : t[e] && (p = c[s].points[e]) && (h -= p[1] - p[0])), e += m;
                                d[s][1 === i ? "rightCliff" : "leftCliff"] = h
                            });
                            else {
                                for (e = u; e >= 0 && g > e;) {
                                    if (o = c[s].points[e]) {
                                        f = o[1];
                                        break
                                    }
                                    e += m
                                }
                                f = l.toPixels(f, !0), r.push({
                                    isNull: !0,
                                    plotX: h.toPixels(s, !0),
                                    plotY: f,
                                    yBottom: f
                                })
                            }
                        })
                    }
                    return r
                },
                getGraphPath: function(t) {
                    var e, i, s, r, a = o.prototype.getGraphPath,
                        h = this.options,
                        l = h.stacking,
                        c = this.yAxis,
                        d = [],
                        p = [],
                        u = this.index,
                        f = c.stacks[this.stackKey],
                        g = h.threshold,
                        m = c.getThreshold(h.threshold),
                        h = h.connectNulls || "percent" === l,
                        v = function(e, i, n) {
                            var o = t[e];
                            e = l && f[o.x].points[u];
                            var r = o[n + "Null"] || 0;
                            n = o[n + "Cliff"] || 0;
                            var a, h, o = !0;
                            n || r ? (a = (r ? e[0] : e[1]) + n, h = e[0] + n, o = !!r) : !l && t[i] && t[i].isNull && (a = h = g), void 0 !== a && (p.push({
                                plotX: s,
                                plotY: null === a ? m : c.getThreshold(a),
                                isNull: o
                            }), d.push({
                                plotX: s,
                                plotY: null === h ? m : c.getThreshold(h),
                                doCurve: !1
                            }))
                        };
                    for (t = t || this.points, l && (t = this.getStackPoints()), e = 0; e < t.length; e++) i = t[e].isNull, s = n(t[e].rectPlotX, t[e].plotX), r = n(t[e].yBottom, m), (!i || h) && (h || v(e, e - 1, "left"), i && !l && h || (p.push(t[e]), d.push({
                        x: e,
                        plotX: s,
                        plotY: r
                    })), h || v(e, e + 1, "right"));
                    return e = a.call(this, p, !0, !0), d.reversed = !0, i = a.call(this, d, !0, !0), i.length && (i[0] = "L"), i = e.concat(i), a = a.call(this, p, !1, h), i.xMap = e.xMap, this.areaPath = i, a
                },
                drawGraph: function() {
                    this.areaPath = [], o.prototype.drawGraph.apply(this);
                    var t = this,
                        s = this.areaPath,
                        r = this.options,
                        a = [
                            ["area", "highcharts-area", this.color, r.fillColor]
                        ];
                    i(this.zones, function(e, i) {
                        a.push(["zone-area-" + i, "highcharts-area highcharts-zone-area-" + i + " " + e.className, e.color || t.color, e.fillColor || r.fillColor])
                    }), i(a, function(i) {
                        var o = i[0],
                            a = t[o];
                        a ? (a.endX = s.xMap, a.animate({
                            d: s
                        })) : (a = t[o] = t.chart.renderer.path(s).addClass(i[1]).attr({
                            fill: n(i[3], e(i[2]).setOpacity(n(r.fillOpacity, .75)).get()),
                            zIndex: 0
                        }).add(t.group), a.isArea = !0), a.startX = s.xMap, a.shiftUnit = r.step ? 2 : 1
                    })
                },
                drawLegendSymbol: t.LegendSymbolMixin.drawRectangle
            })
        }(t),
        function(t) {
            var e = t.pick;
            (t = t.seriesType)("spline", "line", {}, {
                getPointSpline: function(t, i, s) {
                    var n = i.plotX,
                        o = i.plotY,
                        r = t[s - 1];
                    s = t[s + 1];
                    var a, h, l, c;
                    if (r && !r.isNull && !1 !== r.doCurve && s && !s.isNull && !1 !== s.doCurve) {
                        t = r.plotY, l = s.plotX, s = s.plotY;
                        var d = 0;
                        a = (1.5 * n + r.plotX) / 2.5, h = (1.5 * o + t) / 2.5, l = (1.5 * n + l) / 2.5, c = (1.5 * o + s) / 2.5, l !== a && (d = (c - h) * (l - n) / (l - a) + o - c), h += d, c += d, h > t && h > o ? (h = Math.max(t, o), c = 2 * o - h) : t > h && o > h && (h = Math.min(t, o), c = 2 * o - h), c > s && c > o ? (c = Math.max(s, o), h = 2 * o - c) : s > c && o > c && (c = Math.min(s, o), h = 2 * o - c), i.rightContX = l, i.rightContY = c
                    }
                    return i = ["C", e(r.rightContX, r.plotX), e(r.rightContY, r.plotY), e(a, n), e(h, o), n, o], r.rightContX = r.rightContY = null, i
                }
            })
        }(t),
        function(t) {
            var e = t.seriesTypes.area.prototype,
                i = t.seriesType;
            i("areaspline", "spline", t.defaultPlotOptions.area, {
                getStackPoints: e.getStackPoints,
                getGraphPath: e.getGraphPath,
                setStackCliffs: e.setStackCliffs,
                drawGraph: e.drawGraph,
                drawLegendSymbol: t.LegendSymbolMixin.drawRectangle
            })
        }(t),
        function(t) {
            var e = t.animObject,
                i = t.color,
                s = t.each,
                n = t.extend,
                o = t.isNumber,
                r = t.merge,
                a = t.pick,
                h = t.Series,
                l = t.seriesType,
                c = t.svg;
            l("column", "line", {
                borderRadius: 0,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1,
                        shadow: !1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000",
                        shadow: !1
                    }
                },
                dataLabels: {
                    align: null,
                    verticalAlign: null,
                    y: null
                },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function() {
                    h.prototype.init.apply(this, arguments);
                    var t = this,
                        e = t.chart;
                    e.hasRendered && s(e.series, function(e) {
                        e.type === t.type && (e.isDirty = !0)
                    })
                },
                getColumnMetrics: function() {
                    var t, e = this,
                        i = e.options,
                        n = e.xAxis,
                        o = e.yAxis,
                        r = n.reversed,
                        h = {},
                        l = 0;
                    !1 === i.grouping ? l = 1 : s(e.chart.series, function(i) {
                        var s, n = i.options,
                            r = i.yAxis;
                        i.type === e.type && i.visible && o.len === r.len && o.pos === r.pos && (n.stacking ? (t = i.stackKey, void 0 === h[t] && (h[t] = l++), s = h[t]) : !1 !== n.grouping && (s = l++), i.columnIndex = s)
                    });
                    var c = Math.min(Math.abs(n.transA) * (n.ordinalSlope || i.pointRange || n.closestPointRange || n.tickInterval || 1), n.len),
                        d = c * i.groupPadding,
                        p = (c - 2 * d) / l,
                        i = Math.min(i.maxPointWidth || n.len, a(i.pointWidth, p * (1 - 2 * i.pointPadding)));
                    return e.columnMetrics = {
                        width: i,
                        offset: (p - i) / 2 + (d + ((e.columnIndex || 0) + (r ? 1 : 0)) * p - c / 2) * (r ? -1 : 1)
                    }, e.columnMetrics
                },
                crispCol: function(t, e, i, s) {
                    var n = this.chart,
                        o = this.borderWidth,
                        r = -(o % 2 ? .5 : 0),
                        o = o % 2 ? .5 : 1;
                    return n.inverted && n.renderer.isVML && (o += 1), i = Math.round(t + i) + r, t = Math.round(t) + r, s = Math.round(e + s) + o, r = .5 >= Math.abs(e) && s > .5, e = Math.round(e) + o, s -= e, r && s && (--e, s += 1), {
                        x: t,
                        y: e,
                        width: i - t,
                        height: s
                    }
                },
                translate: function() {
                    var t = this,
                        e = t.chart,
                        i = t.options,
                        n = t.dense = 2 > t.closestPointRange * t.xAxis.transA,
                        n = t.borderWidth = a(i.borderWidth, n ? 0 : 1),
                        o = t.yAxis,
                        r = t.translatedThreshold = o.getThreshold(i.threshold),
                        l = a(i.minPointLength, 5),
                        c = t.getColumnMetrics(),
                        d = c.width,
                        p = t.barW = Math.max(d, 1 + 2 * n),
                        u = t.pointXOffset = c.offset;
                    e.inverted && (r -= .5), i.pointPadding && (p = Math.ceil(p)), h.prototype.translate.apply(t), s(t.points, function(i) {
                        var s, n = a(i.yBottom, r),
                            h = 999 + Math.abs(n),
                            h = Math.min(Math.max(-h, i.plotY), o.len + h),
                            c = i.plotX + u,
                            f = p,
                            g = Math.min(h, n),
                            m = Math.max(h, n) - g;
                        Math.abs(m) < l && l && (m = l, s = !o.reversed && !i.negative || o.reversed && i.negative, g = Math.abs(g - r) > l ? n - l : r - (s ? l : 0)), i.barX = c, i.pointWidth = d, i.tooltipPos = e.inverted ? [o.len + o.pos - e.plotLeft - h, t.xAxis.len - c - f / 2, m] : [c + f / 2, h + o.pos - e.plotTop, m], i.shapeType = "rect", i.shapeArgs = t.crispCol.apply(t, i.isNull ? [i.plotX, o.len / 2, 0, 0] : [c, g, f, m])
                    })
                },
                getSymbol: t.noop,
                drawLegendSymbol: t.LegendSymbolMixin.drawRectangle,
                drawGraph: function() {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                },
                pointAttribs: function(t, e) {
                    var s, n = this.options,
                        o = this.pointAttrToOptions || {};
                    s = o.stroke || "borderColor";
                    var r = o["stroke-width"] || "borderWidth",
                        a = t && t.color || this.color,
                        h = t[s] || n[s] || this.color || a,
                        l = t[r] || n[r] || this[r] || 0,
                        o = n.dashStyle;
                    return t && this.zones.length && (a = (a = t.getZone()) && a.color || t.options.color || this.color), e && (t = n.states[e], e = t.brightness, a = t.color || void 0 !== e && i(a).brighten(t.brightness).get() || a, h = t[s] || h, l = t[r] || l, o = t.dashStyle || o), s = {
                        fill: a,
                        stroke: h,
                        "stroke-width": l
                    }, n.borderRadius && (s.r = n.borderRadius), o && (s.dashstyle = o), s
                },
                drawPoints: function() {
                    var t, e = this,
                        i = this.chart,
                        n = e.options,
                        a = i.renderer,
                        h = n.animationLimit || 250;
                    s(e.points, function(s) {
                        var l = s.graphic;
                        o(s.plotY) && null !== s.y ? (t = s.shapeArgs, l ? l[i.pointCount < h ? "animate" : "attr"](r(t)) : s.graphic = l = a[s.shapeType](t).attr({
                            "class": s.getClassName()
                        }).add(s.group || e.group), l.attr(e.pointAttribs(s, s.selected && "select")).shadow(n.shadow, null, n.stacking && !n.borderRadius)) : l && (s.graphic = l.destroy())
                    })
                },
                animate: function(t) {
                    var i = this,
                        s = this.yAxis,
                        o = i.options,
                        r = this.chart.inverted,
                        a = {};
                    c && (t ? (a.scaleY = .001, t = Math.min(s.pos + s.len, Math.max(s.pos, s.toPixels(o.threshold))), r ? a.translateX = t - s.len : a.translateY = t, i.group.attr(a)) : (a[r ? "translateX" : "translateY"] = s.pos, i.group.animate(a, n(e(i.options.animation), {
                        step: function(t, e) {
                            i.group.attr({
                                scaleY: Math.max(.001, e.pos)
                            })
                        }
                    })), i.animate = null))
                },
                remove: function() {
                    var t = this,
                        e = t.chart;
                    e.hasRendered && s(e.series, function(e) {
                        e.type === t.type && (e.isDirty = !0)
                    }), h.prototype.remove.apply(t, arguments)
                }
            })
        }(t),
        function(t) {
            (t = t.seriesType)("bar", "column", null, {
                inverted: !0
            })
        }(t),
        function(t) {
            var e = t.Series;
            (t = t.seriesType)("scatter", "line", {
                lineWidth: 0,
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                kdDimensions: 2,
                drawGraph: function() {
                    this.options.lineWidth && e.prototype.drawGraph.call(this)
                }
            })
        }(t),
        function(t) {
            var e = t.pick,
                i = t.relativeLength;
            t.CenteredSeriesMixin = {
                getCenter: function() {
                    var t, s, n = this.options,
                        o = this.chart,
                        r = 2 * (n.slicedOffset || 0),
                        a = o.plotWidth - 2 * r,
                        o = o.plotHeight - 2 * r,
                        h = n.center,
                        h = [e(h[0], "50%"), e(h[1], "50%"), n.size || "100%", n.innerSize || 0],
                        l = Math.min(a, o);
                    for (t = 0; 4 > t; ++t) s = h[t], n = 2 > t || 2 === t && /%$/.test(s), h[t] = i(s, [a, o, l, h[2]][t]) + (n ? r : 0);
                    return h[3] > h[2] && (h[3] = h[2]), h
                }
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.defined,
                s = t.each,
                n = t.extend,
                o = t.inArray,
                r = t.noop,
                a = t.pick,
                h = t.Point,
                l = t.Series,
                c = t.seriesType,
                d = t.setAnimation;
            c("pie", "line", {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    distance: 30,
                    enabled: !0,
                    formatter: function() {
                        return null === this.y ? void 0 : this.point.name
                    },
                    x: 0
                },
                ignoreHiddenPoint: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: "#ffffff",
                borderWidth: 1,
                states: {
                    hover: {
                        brightness: .1,
                        shadow: !1
                    }
                }
            }, {
                isCartesian: !1,
                requireSorting: !1,
                directTouch: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                axisTypes: [],
                pointAttribs: t.seriesTypes.column.prototype.pointAttribs,
                animate: function(t) {
                    var e = this,
                        i = e.points,
                        n = e.startAngleRad;
                    t || (s(i, function(t) {
                        var i = t.graphic,
                            s = t.shapeArgs;
                        i && (i.attr({
                            r: t.startR || e.center[3] / 2,
                            start: n,
                            end: n
                        }), i.animate({
                            r: s.r,
                            start: s.start,
                            end: s.end
                        }, e.options.animation))
                    }), e.animate = null)
                },
                updateTotals: function() {
                    var t, e, i = 0,
                        s = this.points,
                        n = s.length,
                        o = this.options.ignoreHiddenPoint;
                    for (t = 0; n > t; t++) e = s[t], 0 > e.y && (e.y = null), i += o && !e.visible ? 0 : e.y;
                    for (this.total = i, t = 0; n > t; t++) e = s[t], e.percentage = i > 0 && (e.visible || !o) ? e.y / i * 100 : 0, e.total = i
                },
                generatePoints: function() {
                    l.prototype.generatePoints.call(this), this.updateTotals()
                },
                translate: function(t) {
                    this.generatePoints();
                    var e, i, s, n, o, r = 0,
                        h = this.options,
                        l = h.slicedOffset,
                        c = l + (h.borderWidth || 0),
                        d = h.startAngle || 0,
                        p = this.startAngleRad = Math.PI / 180 * (d - 90),
                        d = (this.endAngleRad = Math.PI / 180 * (a(h.endAngle, d + 360) - 90)) - p,
                        u = this.points,
                        f = h.dataLabels.distance,
                        h = h.ignoreHiddenPoint,
                        g = u.length;
                    for (t || (this.center = t = this.getCenter()), this.getX = function(e, i) {
                            return s = Math.asin(Math.min((e - t[1]) / (t[2] / 2 + f), 1)), t[0] + (i ? -1 : 1) * Math.cos(s) * (t[2] / 2 + f)
                        }, n = 0; g > n; n++) o = u[n], e = p + r * d, (!h || o.visible) && (r += o.percentage / 100), i = p + r * d, o.shapeType = "arc", o.shapeArgs = {
                        x: t[0],
                        y: t[1],
                        r: t[2] / 2,
                        innerR: t[3] / 2,
                        start: Math.round(1e3 * e) / 1e3,
                        end: Math.round(1e3 * i) / 1e3
                    }, s = (i + e) / 2, s > 1.5 * Math.PI ? s -= 2 * Math.PI : s < -Math.PI / 2 && (s += 2 * Math.PI), o.slicedTranslation = {
                        translateX: Math.round(Math.cos(s) * l),
                        translateY: Math.round(Math.sin(s) * l)
                    }, e = Math.cos(s) * t[2] / 2, i = Math.sin(s) * t[2] / 2, o.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i], o.half = s < -Math.PI / 2 || s > Math.PI / 2 ? 1 : 0, o.angle = s, c = Math.min(c, f / 5), o.labelPos = [t[0] + e + Math.cos(s) * f, t[1] + i + Math.sin(s) * f, t[0] + e + Math.cos(s) * c, t[1] + i + Math.sin(s) * c, t[0] + e, t[1] + i, 0 > f ? "center" : o.half ? "right" : "left", s]
                },
                drawGraph: null,
                drawPoints: function() {
                    var t, e, i, o, r = this,
                        a = r.chart.renderer,
                        h = r.options.shadow;
                    h && !r.shadowGroup && (r.shadowGroup = a.g("shadow").add(r.group)), s(r.points, function(s) {
                        if (null !== s.y) {
                            e = s.graphic, o = s.shapeArgs, t = s.sliced ? s.slicedTranslation : {};
                            var l = s.shadowGroup;
                            h && !l && (l = s.shadowGroup = a.g("shadow").add(r.shadowGroup)), l && l.attr(t), i = r.pointAttribs(s, s.selected && "select"), e ? e.setRadialReference(r.center).attr(i).animate(n(o, t)) : (s.graphic = e = a[s.shapeType](o).addClass(s.getClassName()).setRadialReference(r.center).attr(t).add(r.group), s.visible || e.attr({
                                visibility: "hidden"
                            }), e.attr(i).attr({
                                "stroke-linejoin": "round"
                            }).shadow(h, l))
                        }
                    })
                },
                searchPoint: r,
                sortByAngle: function(t, e) {
                    t.sort(function(t, i) {
                        return void 0 !== t.angle && (i.angle - t.angle) * e
                    })
                },
                drawLegendSymbol: t.LegendSymbolMixin.drawRectangle,
                getCenter: t.CenteredSeriesMixin.getCenter,
                getSymbol: r
            }, {
                init: function() {
                    h.prototype.init.apply(this, arguments);
                    var t, i = this;
                    return i.name = a(i.name, "Slice"), t = function(t) {
                        i.slice("select" === t.type)
                    }, e(i, "select", t), e(i, "unselect", t), i
                },
                setVisible: function(t, e) {
                    var i = this,
                        n = i.series,
                        r = n.chart,
                        h = n.options.ignoreHiddenPoint;
                    e = a(e, h), t !== i.visible && (i.visible = i.options.visible = t = void 0 === t ? !i.visible : t, n.options.data[o(i, n.data)] = i.options, s(["graphic", "dataLabel", "connector", "shadowGroup"], function(e) {
                        i[e] && i[e][t ? "show" : "hide"](!0)
                    }), i.legendItem && r.legend.colorizeItem(i, t), t || "hover" !== i.state || i.setState(""), h && (n.isDirty = !0), e && r.redraw())
                },
                slice: function(t, e, s) {
                    var n = this.series;
                    d(s, n.chart), a(e, !0), this.sliced = this.options.sliced = t = i(t) ? t : !this.sliced, n.options.data[o(this, n.data)] = this.options, t = t ? this.slicedTranslation : {
                        translateX: 0,
                        translateY: 0
                    }, this.graphic.animate(t), this.shadowGroup && this.shadowGroup.animate(t)
                },
                haloPath: function(t) {
                    var e = this.shapeArgs;
                    return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, {
                        innerR: this.shapeArgs.r,
                        start: e.start,
                        end: e.end
                    })
                }
            })
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.arrayMax,
                s = t.defined,
                n = t.each,
                o = t.extend,
                r = t.format,
                a = t.map,
                h = t.merge,
                l = t.noop,
                c = t.pick,
                d = t.relativeLength,
                p = t.Series,
                u = t.seriesTypes,
                f = t.stableSort;
            t.distribute = function(t, e) {
                function i(t, e) {
                    return t.target - e.target
                }
                var s, o, r = !0,
                    h = t,
                    l = [];
                for (o = 0, s = t.length; s--;) o += t[s].size;
                if (o > e) {
                    for (f(t, function(t, e) {
                            return (e.rank || 0) - (t.rank || 0)
                        }), o = s = 0; e >= o;) o += t[s].size, s++;
                    l = t.splice(s - 1, t.length)
                }
                for (f(t, i), t = a(t, function(t) {
                        return {
                            size: t.size,
                            targets: [t.target]
                        }
                    }); r;) {
                    for (s = t.length; s--;) r = t[s], o = (Math.min.apply(0, r.targets) + Math.max.apply(0, r.targets)) / 2, r.pos = Math.min(Math.max(0, o - r.size / 2), e - r.size);
                    for (s = t.length, r = !1; s--;) s > 0 && t[s - 1].pos + t[s - 1].size > t[s].pos && (t[s - 1].size += t[s].size, t[s - 1].targets = t[s - 1].targets.concat(t[s].targets), t[s - 1].pos + t[s - 1].size > e && (t[s - 1].pos = e - t[s - 1].size), t.splice(s, 1), r = !0)
                }
                s = 0, n(t, function(t) {
                    var e = 0;
                    n(t.targets, function() {
                        h[s].pos = t.pos + e, e += h[s].size, s++
                    })
                }), h.push.apply(h, l), f(h, i)
            }, p.prototype.drawDataLabels = function() {
                var t, i, a, l, d = this,
                    p = d.options,
                    u = p.dataLabels,
                    f = d.points,
                    g = d.hasRendered || 0,
                    m = c(u.defer, !0),
                    v = d.chart.renderer;
                (u.enabled || d._hasPointLabels) && (d.dlProcessOptions && d.dlProcessOptions(u), l = d.plotGroup("dataLabelsGroup", "data-labels", m && !g ? "hidden" : "visible", u.zIndex || 6), m && (l.attr({
                    opacity: +g
                }), g || e(d, "afterAnimate", function() {
                    d.visible && l.show(!0), l[p.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), i = u, n(f, function(e) {
                    var n, f, g, m, x = e.dataLabel,
                        y = e.connector,
                        b = !0,
                        k = {};
                    if (t = e.dlOptions || e.options && e.options.dataLabels, n = c(t && t.enabled, i.enabled) && null !== e.y, x && !n) e.dataLabel = x.destroy();
                    else if (n) {
                        if (u = h(i, t), m = u.style, n = u.rotation, f = e.getLabelConfig(), a = u.format ? r(u.format, f) : u.formatter.call(f, u), m.color = c(u.color, m.color, d.color, "#000000"), x) s(a) ? (x.attr({
                            text: a
                        }), b = !1) : (e.dataLabel = x = x.destroy(), y && (e.connector = y.destroy()));
                        else if (s(a)) {
                            x = {
                                fill: u.backgroundColor,
                                stroke: u.borderColor,
                                "stroke-width": u.borderWidth,
                                r: u.borderRadius || 0,
                                rotation: n,
                                padding: u.padding,
                                zIndex: 1
                            }, "contrast" === m.color && (k.color = u.inside || 0 > u.distance || p.stacking ? v.getContrast(e.color || d.color) : "#000000"), p.cursor && (k.cursor = p.cursor);
                            for (g in x) void 0 === x[g] && delete x[g];
                            x = e.dataLabel = v[n ? "text" : "label"](a, 0, -9999, u.shape, null, null, u.useHTML, null, "data-label").attr(x), x.addClass("highcharts-data-label-color-" + e.colorIndex + " " + (u.className || "") + (u.useHTML ? "highcharts-tracker" : "")), x.css(o(m, k)), x.add(l), x.shadow(u.shadow)
                        }
                        x && d.alignDataLabel(e, x, u, null, b)
                    }
                }))
            }, p.prototype.alignDataLabel = function(t, e, i, s, n) {
                var r, a = this.chart,
                    h = a.inverted,
                    l = c(t.plotX, -9999),
                    d = c(t.plotY, -9999),
                    p = e.getBBox(),
                    u = i.rotation,
                    f = i.align,
                    g = this.visible && (t.series.forceDL || a.isInsidePlot(l, Math.round(d), h) || s && a.isInsidePlot(l, h ? s.x + 1 : s.y + s.height - 1, h)),
                    m = "justify" === c(i.overflow, "justify");
                g && (r = i.style.fontSize, r = a.renderer.fontMetrics(r, e).b, s = o({
                    x: h ? a.plotWidth - d : l,
                    y: Math.round(h ? a.plotHeight - l : d),
                    width: 0,
                    height: 0
                }, s), o(i, {
                    width: p.width,
                    height: p.height
                }), u ? (m = !1, h = a.renderer.rotCorr(r, u), h = {
                    x: s.x + i.x + s.width / 2 + h.x,
                    y: s.y + i.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[i.verticalAlign] * s.height
                }, e[n ? "attr" : "animate"](h).attr({
                    align: f
                }), l = (u + 720) % 360, l = l > 180 && 360 > l, "left" === f ? h.y -= l ? p.height : 0 : "center" === f ? (h.x -= p.width / 2, h.y -= p.height / 2) : "right" === f && (h.x -= p.width, h.y -= l ? 0 : p.height)) : (e.align(i, null, s), h = e.alignAttr), m ? this.justifyDataLabel(e, i, h, p, s, n) : c(i.crop, !0) && (g = a.isInsidePlot(h.x, h.y) && a.isInsidePlot(h.x + p.width, h.y + p.height)), i.shape && !u && e.attr({
                    anchorX: t.plotX,
                    anchorY: t.plotY
                })), g || (e.attr({
                    y: -9999
                }), e.placed = !1)
            }, p.prototype.justifyDataLabel = function(t, e, i, s, n, o) {
                var r, a, h = this.chart,
                    l = e.align,
                    c = e.verticalAlign,
                    d = t.box ? 0 : t.padding || 0;
                r = i.x + d, 0 > r && ("right" === l ? e.align = "left" : e.x = -r, a = !0), r = i.x + s.width - d, r > h.plotWidth && ("left" === l ? e.align = "right" : e.x = h.plotWidth - r, a = !0), r = i.y + d, 0 > r && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r, a = !0), r = i.y + s.height - d, r > h.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = h.plotHeight - r, a = !0), a && (t.placed = !o, t.align(e, null, n))
            }, u.pie && (u.pie.prototype.drawDataLabels = function() {
                var e, s, o, r, h, l, d, u, f, g, m = this,
                    v = m.data,
                    x = m.chart,
                    y = m.options.dataLabels,
                    b = c(y.connectorPadding, 10),
                    k = c(y.connectorWidth, 1),
                    M = x.plotWidth,
                    w = x.plotHeight,
                    S = y.distance,
                    T = m.center,
                    A = T[2] / 2,
                    C = T[1],
                    P = S > 0,
                    L = [
                        [],
                        []
                    ],
                    O = [0, 0, 0, 0];
                m.visible && (y.enabled || m._hasPointLabels) && (p.prototype.drawDataLabels.apply(m), n(v, function(t) {
                    t.dataLabel && t.visible && (L[t.half].push(t), t.dataLabel._pos = null)
                }), n(L, function(i, s) {
                    var n, c, p, v, k, P = i.length;
                    if (P)
                        for (m.sortByAngle(i, s - .5), S > 0 && (n = Math.max(0, C - A - S), c = Math.min(C + A + S, x.plotHeight), p = a(i, function(t) {
                                return t.dataLabel ? (k = t.dataLabel.getBBox().height || 21, {
                                    target: t.labelPos[1] - n + k / 2,
                                    size: k,
                                    rank: t.y
                                }) : void 0
                            }), t.distribute(p, c + k - n)), g = 0; P > g; g++) e = i[g], h = e.labelPos, o = e.dataLabel, f = !1 === e.visible ? "hidden" : "inherit", v = h[1], p ? void 0 === p[g].pos ? f = "hidden" : (l = p[g].size, u = n + p[g].pos) : u = v, d = y.justify ? T[0] + (s ? -1 : 1) * (A + S) : m.getX(n + 2 > u || u > c - 2 ? v : u, s), o._attr = {
                            visibility: f,
                            align: h[6]
                        }, o._pos = {
                            x: d + y.x + ({
                                left: b,
                                right: -b
                            }[h[6]] || 0),
                            y: u + y.y - 10
                        }, h.x = d, h.y = u, null === m.options.size && (r = o.width, b > d - r ? O[3] = Math.max(Math.round(r - d + b), O[3]) : d + r > M - b && (O[1] = Math.max(Math.round(d + r - M + b), O[1])), 0 > u - l / 2 ? O[0] = Math.max(Math.round(-u + l / 2), O[0]) : u + l / 2 > w && (O[2] = Math.max(Math.round(u + l / 2 - w), O[2])))
                }), 0 === i(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), P && k && n(this.points, function(t) {
                    var e;
                    s = t.connector, (o = t.dataLabel) && o._pos && t.visible ? (f = o._attr.visibility, (e = !s) && (t.connector = s = x.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + t.colorIndex).add(m.dataLabelsGroup), s.attr({
                        "stroke-width": k,
                        stroke: y.connectorColor || t.color || "#666666"
                    })), s[e ? "attr" : "animate"]({
                        d: m.connectorPath(t.labelPos)
                    }), s.attr("visibility", f)) : s && (t.connector = s.destroy())
                }))
            }, u.pie.prototype.connectorPath = function(t) {
                var e = t.x,
                    i = t.y;
                return c(this.options.dataLabels.softConnector, !0) ? ["M", e + ("left" === t[6] ? 5 : -5), i, "C", e, i, 2 * t[2] - t[4], 2 * t[3] - t[5], t[2], t[3], "L", t[4], t[5]] : ["M", e + ("left" === t[6] ? 5 : -5), i, "L", t[2], t[3], "L", t[4], t[5]]
            }, u.pie.prototype.placeDataLabels = function() {
                n(this.points, function(t) {
                    var e = t.dataLabel;
                    e && t.visible && ((t = e._pos) ? (e.attr(e._attr), e[e.moved ? "animate" : "attr"](t), e.moved = !0) : e && e.attr({
                        y: -9999
                    }))
                })
            }, u.pie.prototype.alignDataLabel = l, u.pie.prototype.verifyDataLabelOverflow = function(t) {
                var e, i, s = this.center,
                    n = this.options,
                    o = n.center,
                    r = n.minSize || 80;
                return null !== o[0] ? e = Math.max(s[2] - Math.max(t[1], t[3]), r) : (e = Math.max(s[2] - t[1] - t[3], r), s[0] += (t[3] - t[1]) / 2), null !== o[1] ? e = Math.max(Math.min(e, s[2] - Math.max(t[0], t[2])), r) : (e = Math.max(Math.min(e, s[2] - t[0] - t[2]), r), s[1] += (t[0] - t[2]) / 2), e < s[2] ? (s[2] = e, s[3] = Math.min(d(n.innerSize || 0, e), e), this.translate(s), this.drawDataLabels && this.drawDataLabels()) : i = !0, i
            }), u.column && (u.column.prototype.alignDataLabel = function(t, e, i, s, n) {
                var o = this.chart.inverted,
                    r = t.series,
                    a = t.dlBox || t.shapeArgs,
                    l = c(t.below, t.plotY > c(this.translatedThreshold, r.yAxis.len)),
                    d = c(i.inside, !!this.options.stacking);
                a && (s = h(a), 0 > s.y && (s.height += s.y, s.y = 0), a = s.y + s.height - r.yAxis.len, a > 0 && (s.height -= a), o && (s = {
                    x: r.yAxis.len - s.y - s.height,
                    y: r.xAxis.len - s.x - s.width,
                    width: s.height,
                    height: s.width
                }), d || (o ? (s.x += l ? 0 : s.width, s.width = 0) : (s.y += l ? s.height : 0, s.height = 0))), i.align = c(i.align, !o || d ? "center" : l ? "right" : "left"), i.verticalAlign = c(i.verticalAlign, o || d ? "middle" : l ? "top" : "bottom"), p.prototype.alignDataLabel.call(this, t, e, i, s, n)
            })
        }(t),
        function(t) {
            var e = t.Chart,
                i = t.each,
                s = t.pick,
                n = t.addEvent;
            e.prototype.callbacks.push(function(t) {
                function e() {
                    var e = [];
                    i(t.series, function(t) {
                        var n = t.options.dataLabels,
                            o = t.dataLabelCollections || ["dataLabel"];
                        (n.enabled || t._hasPointLabels) && !n.allowOverlap && t.visible && i(o, function(n) {
                            i(t.points, function(t) {
                                t[n] && (t[n].labelrank = s(t.labelrank, t.shapeArgs && t.shapeArgs.height), e.push(t[n]))
                            })
                        })
                    }), t.hideOverlappingLabels(e)
                }
                e(), n(t, "redraw", e)
            }), e.prototype.hideOverlappingLabels = function(t) {
                var e, s, n, o, r, a, h, l, c, d = t.length,
                    p = function(t, e, i, s, n, o, r, a) {
                        return !(n > t + i || t > n + r || o > e + s || e > o + a)
                    };
                for (s = 0; d > s; s++)(e = t[s]) && (e.oldOpacity = e.opacity, e.newOpacity = 1);
                for (t.sort(function(t, e) {
                        return (e.labelrank || 0) - (t.labelrank || 0)
                    }), s = 0; d > s; s++)
                    for (n = t[s], e = s + 1; d > e; ++e) o = t[e], n && o && n.placed && o.placed && 0 !== n.newOpacity && 0 !== o.newOpacity && (r = n.alignAttr, a = o.alignAttr, h = n.parentGroup, l = o.parentGroup, c = 2 * (n.box ? 0 : n.padding), r = p(r.x + h.translateX, r.y + h.translateY, n.width - c, n.height - c, a.x + l.translateX, a.y + l.translateY, o.width - c, o.height - c)) && ((n.labelrank < o.labelrank ? n : o).newOpacity = 0);
                i(t, function(t) {
                    var e, i;
                    t && (i = t.newOpacity, t.oldOpacity !== i && t.placed && (i ? t.show(!0) : e = function() {
                        t.hide()
                    }, t.alignAttr.opacity = i, t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e)), t.isOld = !0)
                })
            }
        }(t),
        function(t) {
            var e = t.addEvent,
                i = t.Chart,
                s = t.createElement,
                n = t.css,
                o = t.defaultOptions,
                r = t.defaultPlotOptions,
                a = t.each,
                h = t.extend,
                l = t.fireEvent,
                c = t.hasTouch,
                d = t.inArray,
                p = t.isObject,
                u = t.Legend,
                f = t.merge,
                g = t.pick,
                m = t.Point,
                v = t.Series,
                x = t.seriesTypes,
                y = t.svg;
            t = t.TrackerMixin = {
                drawTrackerPoint: function() {
                    var t = this,
                        e = t.chart,
                        i = e.pointer,
                        s = function(t) {
                            for (var i, s = t.target; s && !i;) i = s.point, s = s.parentNode;
                            void 0 !== i && i !== e.hoverPoint && i.onMouseOver(t)
                        };
                    a(t.points, function(t) {
                        t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.div ? t.dataLabel.div.point = t : t.dataLabel.element.point = t)
                    }), t._hasTracking || (a(t.trackerGroups, function(e) {
                        t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", s).on("mouseout", function(t) {
                            i.onTrackerMouseOut(t)
                        }), c && t[e].on("touchstart", s), t.options.cursor && t[e].css(n).css({
                            cursor: t.options.cursor
                        }))
                    }), t._hasTracking = !0)
                },
                drawTrackerGraph: function() {
                    var t, e = this,
                        i = e.options,
                        s = i.trackByArea,
                        n = [].concat(s ? e.areaPath : e.graphPath),
                        o = n.length,
                        r = e.chart,
                        h = r.pointer,
                        l = r.renderer,
                        d = r.options.tooltip.snap,
                        p = e.tracker,
                        u = function() {
                            r.hoverSeries !== e && e.onMouseOver()
                        },
                        f = "rgba(192,192,192," + (y ? 1e-4 : .002) + ")";
                    if (o && !s)
                        for (t = o + 1; t--;) "M" === n[t] && n.splice(t + 1, 0, n[t + 1] - d, n[t + 2], "L"), (t && "M" === n[t] || t === o) && n.splice(t, 0, "L", n[t - 2] + d, n[t - 1]);
                    p ? p.attr({
                        d: n
                    }) : e.graph && (e.tracker = l.path(n).attr({
                        "stroke-linejoin": "round",
                        visibility: e.visible ? "visible" : "hidden",
                        stroke: f,
                        fill: s ? f : "none",
                        "stroke-width": e.graph.strokeWidth() + (s ? 0 : 2 * d),
                        zIndex: 2
                    }).add(e.group), a([e.tracker, e.markerGroup], function(t) {
                        t.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(t) {
                            h.onTrackerMouseOut(t)
                        }), i.cursor && t.css({
                            cursor: i.cursor
                        }), c && t.on("touchstart", u)
                    }))
                }
            }, x.column && (x.column.prototype.drawTracker = t.drawTrackerPoint), x.pie && (x.pie.prototype.drawTracker = t.drawTrackerPoint), x.scatter && (x.scatter.prototype.drawTracker = t.drawTrackerPoint), h(u.prototype, {
                setItemEvents: function(t, e, i) {
                    var s = this,
                        n = s.chart,
                        o = "highcharts-legend-" + (t.series ? "point" : "series") + "-active";
                    (i ? e : t.legendGroup).on("mouseover", function() {
                        t.setState("hover"), n.seriesGroup.addClass(o), e.css(s.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        e.css(t.visible ? s.itemStyle : s.itemHiddenStyle), n.seriesGroup.removeClass(o), t.setState()
                    }).on("click", function(e) {
                        var i = function() {
                            t.setVisible && t.setVisible()
                        };
                        e = {
                            browserEvent: e
                        }, t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : l(t, "legendItemClick", e, i)
                    })
                },
                createCheckboxForItem: function(t) {
                    t.checkbox = s("input", {
                        type: "checkbox",
                        checked: t.selected,
                        defaultChecked: t.selected
                    }, this.options.itemCheckboxStyle, this.chart.container), e(t.checkbox, "click", function(e) {
                        l(t.series || t, "checkboxClick", {
                            checked: e.target.checked,
                            item: t
                        }, function() {
                            t.select()
                        })
                    })
                }
            }), o.legend.itemStyle.cursor = "pointer", h(i.prototype, {
                showResetZoom: function() {
                    var t = this,
                        e = o.lang,
                        i = t.options.chart.resetZoomButton,
                        s = i.theme,
                        n = s.states,
                        r = "chart" === i.relativeTo ? null : "plotBox";
                    this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function() {
                        t.zoomOut()
                    }, s, n && n.hover).attr({
                        align: i.position.align,
                        title: e.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(i.position, !1, r)
                },
                zoomOut: function() {
                    var t = this;
                    l(t, "selection", {
                        resetSelection: !0
                    }, function() {
                        t.zoom()
                    })
                },
                zoom: function(t) {
                    var e, i, s = this.pointer,
                        n = !1;
                    !t || t.resetSelection ? a(this.axes, function(t) {
                        e = t.zoom()
                    }) : a(t.xAxis.concat(t.yAxis), function(t) {
                        var i = t.axis;
                        s[i.isXAxis ? "zoomX" : "zoomY"] && (e = i.zoom(t.min, t.max), i.displayBtn && (n = !0))
                    }), i = this.resetZoomButton, n && !i ? this.showResetZoom() : !n && p(i) && (this.resetZoomButton = i.destroy()), e && this.redraw(g(this.options.chart.animation, t && t.animation, 100 > this.pointCount))
                },
                pan: function(t, e) {
                    var i, s = this,
                        o = s.hoverPoints;
                    o && a(o, function(t) {
                        t.setState()
                    }), a("xy" === e ? [1, 0] : [1], function(e) {
                        e = s[e ? "xAxis" : "yAxis"][0];
                        var n = e.horiz,
                            o = t[n ? "chartX" : "chartY"],
                            n = n ? "mouseDownX" : "mouseDownY",
                            r = s[n],
                            a = (e.pointRange || 0) / 2,
                            h = e.getExtremes(),
                            l = e.toValue(r - o, !0) + a,
                            a = e.toValue(r + e.len - o, !0) - a,
                            c = l > a,
                            r = c ? a : l,
                            l = c ? l : a,
                            a = Math.min(h.dataMin, h.min) - r,
                            h = l - Math.max(h.dataMax, h.max);
                        e.series.length && 0 > a && 0 > h && (e.setExtremes(r, l, !1, !1, {
                            trigger: "pan"
                        }), i = !0), s[n] = o
                    }), i && s.redraw(!1), n(s.container, {
                        cursor: "move"
                    })
                }
            }), h(m.prototype, {
                select: function(t, e) {
                    var i = this,
                        s = i.series,
                        n = s.chart;
                    t = g(t, !i.selected), i.firePointEvent(t ? "select" : "unselect", {
                        accumulate: e
                    }, function() {
                        i.selected = i.options.selected = t, s.options.data[d(i, s.data)] = i.options, i.setState(t && "select"), e || a(n.getSelectedPoints(), function(t) {
                            t.selected && t !== i && (t.selected = t.options.selected = !1, s.options.data[d(t, s.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                        })
                    })
                },
                onMouseOver: function(t, e) {
                    var i = this.series,
                        s = i.chart,
                        n = s.tooltip,
                        o = s.hoverPoint;
                    this.series && (e || (o && o !== this && o.onMouseOut(), s.hoverSeries !== i && i.onMouseOver(), s.hoverPoint = this), !n || n.shared && !i.noSharedTooltip ? n || this.setState("hover") : (this.setState("hover"), n.refresh(this, t)), this.firePointEvent("mouseOver"))
                },
                onMouseOut: function() {
                    var t = this.series.chart,
                        e = t.hoverPoints;
                    this.firePointEvent("mouseOut"), e && -1 !== d(this, e) || (this.setState(), t.hoverPoint = null)
                },
                importEvents: function() {
                    if (!this.hasImportedEvents) {
                        var t, i = f(this.series.options.point, this.options).events;
                        this.events = i;
                        for (t in i) e(this, t, i[t]);
                        this.hasImportedEvents = !0
                    }
                },
                setState: function(t, e) {
                    var i, s = Math.floor(this.plotX),
                        n = this.plotY,
                        o = this.series,
                        a = o.options.states[t] || {},
                        l = r[o.type].marker && o.options.marker,
                        c = l && !1 === l.enabled,
                        d = l && l.states && l.states[t] || {},
                        p = !1 === d.enabled,
                        u = o.stateMarkerGraphic,
                        f = this.marker || {},
                        m = o.chart,
                        v = o.halo,
                        x = l && o.markerAttribs;
                    t = t || "", t === this.state && !e || this.selected && "select" !== t || !1 === a.enabled || t && (p || c && !1 === d.enabled) || t && f.states && f.states[t] && !1 === f.states[t].enabled || (x && (i = o.markerAttribs(this, t)), this.graphic ? (this.state && this.graphic.removeClass("highcharts-point-" + this.state), t && this.graphic.addClass("highcharts-point-" + t), this.graphic.attr(o.pointAttribs(this, t)), i && this.graphic.animate(i, g(m.options.chart.animation, d.animation, l.animation)), u && u.hide()) : (t && d && (l = f.symbol || o.symbol, u && u.currentSymbol !== l && (u = u.destroy()), u ? u[e ? "animate" : "attr"]({
                        x: i.x,
                        y: i.y
                    }) : l && (o.stateMarkerGraphic = u = m.renderer.symbol(l, i.x, i.y, i.width, i.height).add(o.markerGroup), u.currentSymbol = l), u && u.attr(o.pointAttribs(this, t))), u && (u[t && m.isInsidePlot(s, n, m.inverted) ? "show" : "hide"](), u.element.point = this)), (s = a.halo) && s.size ? (v || (o.halo = v = m.renderer.path().add(x ? o.markerGroup : o.group)), v[e ? "animate" : "attr"]({
                        d: this.haloPath(s.size)
                    }), v.attr({
                        "class": "highcharts-halo highcharts-color-" + g(this.colorIndex, o.colorIndex)
                    }), v.point = this, v.attr(h({
                        fill: this.color || o.color,
                        "fill-opacity": s.opacity,
                        zIndex: -1
                    }, s.attributes))) : v && v.point && v.point.haloPath && v.animate({
                        d: v.point.haloPath(0)
                    }), this.state = t)
                },
                haloPath: function(t) {
                    return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - t, this.plotY - t, 2 * t, 2 * t)
                }
            }), h(v.prototype, {
                onMouseOver: function() {
                    var t = this.chart,
                        e = t.hoverSeries;
                    e && e !== this && e.onMouseOut(), this.options.events.mouseOver && l(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
                },
                onMouseOut: function() {
                    var t = this.options,
                        e = this.chart,
                        i = e.tooltip,
                        s = e.hoverPoint;
                    e.hoverSeries = null, s && s.onMouseOut(), this && t.events.mouseOut && l(this, "mouseOut"), !i || t.stickyTracking || i.shared && !this.noSharedTooltip || i.hide(), this.setState()
                },
                setState: function(t) {
                    var e = this,
                        i = e.options,
                        s = e.graph,
                        n = i.states,
                        o = i.lineWidth,
                        i = 0;
                    if (t = t || "", e.state !== t && (a([e.group, e.markerGroup], function(i) {
                            i && (e.state && i.removeClass("highcharts-series-" + e.state), t && i.addClass("highcharts-series-" + t))
                        }), e.state = t, !n[t] || !1 !== n[t].enabled) && (t && (o = n[t].lineWidth || o + (n[t].lineWidthPlus || 0)), s && !s.dashstyle))
                        for (n = {
                                "stroke-width": o
                            }, s.attr(n); e["zone-graph-" + i];) e["zone-graph-" + i].attr(n), i += 1
                },
                setVisible: function(t, e) {
                    var i, s = this,
                        n = s.chart,
                        o = s.legendItem,
                        r = n.options.chart.ignoreHiddenSeries,
                        h = s.visible;
                    i = (s.visible = t = s.options.visible = s.userOptions.visible = void 0 === t ? !h : t) ? "show" : "hide", a(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(t) {
                        s[t] && s[t][i]()
                    }), (n.hoverSeries === s || (n.hoverPoint && n.hoverPoint.series) === s) && s.onMouseOut(), o && n.legend.colorizeItem(s, t), s.isDirty = !0, s.options.stacking && a(n.series, function(t) {
                        t.options.stacking && t.visible && (t.isDirty = !0)
                    }), a(s.linkedSeries, function(e) {
                        e.setVisible(t, !1)
                    }), r && (n.isDirtyBox = !0), !1 !== e && n.redraw(), l(s, i)
                },
                show: function() {
                    this.setVisible(!0)
                },
                hide: function() {
                    this.setVisible(!1)
                },
                select: function(t) {
                    this.selected = t = void 0 === t ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), l(this, t ? "select" : "unselect")
                },
                drawTracker: t.drawTrackerGraph
            })
        }(t),
        function(t) {
            var e = t.Chart,
                i = t.each,
                s = t.inArray,
                n = t.isObject,
                o = t.pick,
                r = t.splat;
            e.prototype.setResponsive = function(t) {
                var e = this.options.responsive;
                e && e.rules && i(e.rules, function(e) {
                    this.matchResponsiveRule(e, t)
                }, this)
            }, e.prototype.matchResponsiveRule = function(e, i) {
                var s, n = this.respRules,
                    r = e.condition;
                s = r.callback || function() {
                    return this.chartWidth <= o(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= o(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= o(r.minWidth, 0) && this.chartHeight >= o(r.minHeight, 0)
                }, void 0 === e._id && (e._id = t.uniqueKey()), s = s.call(this), !n[e._id] && s ? e.chartOptions && (n[e._id] = this.currentOptions(e.chartOptions), this.update(e.chartOptions, i)) : n[e._id] && !s && (this.update(n[e._id], i), delete n[e._id])
            }, e.prototype.currentOptions = function(t) {
                function e(t, i, o) {
                    var a, h;
                    for (a in t)
                        if (-1 < s(a, ["series", "xAxis", "yAxis"]))
                            for (t[a] = r(t[a]), o[a] = [], h = 0; h < t[a].length; h++) o[a][h] = {}, e(t[a][h], i[a][h], o[a][h]);
                        else n(t[a]) ? (o[a] = {}, e(t[a], i[a] || {}, o[a])) : o[a] = i[a] || null
                }
                var i = {};
                return e(t, this.options, i), i
            }
        }(t), t
});
! function(i) {
    "object" == typeof module && module.exports ? module.exports = i : i(Highcharts)
}(function(i) {
    ! function(i) {
        function t(i, t, e) {
            var o;
            return t.rgba.length && i.rgba.length ? (i = i.rgba, t = t.rgba, o = 1 !== t[3] || 1 !== i[3], i = (o ? "rgba(" : "rgb(") + Math.round(t[0] + (i[0] - t[0]) * (1 - e)) + "," + Math.round(t[1] + (i[1] - t[1]) * (1 - e)) + "," + Math.round(t[2] + (i[2] - t[2]) * (1 - e)) + (o ? "," + (t[3] + (i[3] - t[3]) * (1 - e)) : "") + ")") : i = t.input || "none", i
        }
        var e = i.noop,
            o = i.color,
            l = i.defaultOptions,
            r = i.each,
            n = i.extend,
            s = i.format,
            a = i.pick,
            d = i.wrap,
            p = i.Chart,
            h = i.seriesTypes,
            c = h.pie,
            u = h.column,
            g = i.Tick,
            v = i.fireEvent,
            w = i.inArray,
            f = 1;
        r(["fill", "stroke"], function(e) {
            i.Fx.prototype[e + "Setter"] = function() {
                this.elem.attr(e, t(o(this.start), o(this.end), this.pos), null, !0)
            }
        }), n(l.lang, {
            drillUpText: "◁ Back to {series.name}"
        }), l.drilldown = {
            activeAxisLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            activeDataLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            animation: {
                duration: 500
            },
            drillUpButton: {
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        }, i.SVGRenderer.prototype.Element.prototype.fadeIn = function(i) {
            this.attr({
                opacity: .1,
                visibility: "inherit"
            }).animate({
                opacity: a(this.newOpacity, 1)
            }, i || {
                duration: 250
            })
        }, p.prototype.addSeriesAsDrilldown = function(i, t) {
            this.addSingleSeriesAsDrilldown(i, t), this.applyDrilldown()
        }, p.prototype.addSingleSeriesAsDrilldown = function(t, l) {
            var s, a, d, p, h = t.series,
                c = h.xAxis,
                u = h.yAxis,
                g = [],
                v = [];
            p = {
                color: t.color || h.color
            }, this.drilldownLevels || (this.drilldownLevels = []), a = h.options._levelNumber || 0, (d = this.drilldownLevels[this.drilldownLevels.length - 1]) && d.levelNumber !== a && (d = void 0), l = n(n({
                _ddSeriesId: f++
            }, p), l), s = w(t, h.points), r(h.chart.series, function(i) {
                i.xAxis !== c || i.isDrilling || (i.options._ddSeriesId = i.options._ddSeriesId || f++, i.options._colorIndex = i.userOptions._colorIndex, i.options._levelNumber = i.options._levelNumber || a, d ? (g = d.levelSeries, v = d.levelSeriesOptions) : (g.push(i), v.push(i.options)))
            }), t = n({
                levelNumber: a,
                seriesOptions: h.options,
                levelSeriesOptions: v,
                levelSeries: g,
                shapeArgs: t.shapeArgs,
                bBox: t.graphic ? t.graphic.getBBox() : {},
                color: t.isNull ? new i.Color(o).setOpacity(0).get() : o,
                lowerSeriesOptions: l,
                pointOptions: h.options.data[s],
                pointIndex: s,
                oldExtremes: {
                    xMin: c && c.userMin,
                    xMax: c && c.userMax,
                    yMin: u && u.userMin,
                    yMax: u && u.userMax
                }
            }, p), this.drilldownLevels.push(t), l = t.lowerSeries = this.addSeries(l, !1), l.options._levelNumber = a + 1, c && (c.oldPos = c.pos, c.userMin = c.userMax = null, u.userMin = u.userMax = null), h.type === l.type && (l.animate = l.animateDrilldown || e, l.options.animation = !0)
        }, p.prototype.applyDrilldown = function() {
            var i, t = this.drilldownLevels;
            t && 0 < t.length && (i = t[t.length - 1].levelNumber, r(this.drilldownLevels, function(t) {
                t.levelNumber === i && r(t.levelSeries, function(t) {
                    t.options && t.options._levelNumber === i && t.remove(!1)
                })
            })), this.redraw(), this.showDrillUpButton()
        }, p.prototype.getDrilldownBackText = function() {
            var i = this.drilldownLevels;
            return i && 0 < i.length ? (i = i[i.length - 1], i.series = i.seriesOptions, s(this.options.lang.drillUpText, i)) : void 0
        }, p.prototype.showDrillUpButton = function() {
            var i, t, e = this,
                o = this.getDrilldownBackText(),
                l = e.options.drilldown.drillUpButton;
            this.drillUpButton ? this.drillUpButton.attr({
                text: o
            }).align() : (t = (i = l.theme) && i.states, this.drillUpButton = this.renderer.button(o, null, null, function() {
                e.drillUp()
            }, i, t && t.hover, t && t.select).addClass("highcharts-drillup-button").attr({
                align: l.position.align,
                zIndex: 7
            }).add().align(l.position, !1, l.relativeTo || "plotBox"))
        }, p.prototype.drillUp = function() {
            for (var i, t, e, o, l = this, n = l.drilldownLevels, s = n[n.length - 1].levelNumber, a = n.length, d = l.series, p = function(i) {
                    var n;
                    r(d, function(t) {
                        t.options._ddSeriesId === i._ddSeriesId && (n = t)
                    }), n = n || l.addSeries(i, !1), n.type === e.type && n.animateDrillupTo && (n.animate = n.animateDrillupTo), i === t.seriesOptions && (o = n)
                }; a--;)
                if (t = n[a], t.levelNumber === s) {
                    if (n.pop(), e = t.lowerSeries, !e.chart)
                        for (i = d.length; i--;)
                            if (d[i].options.id === t.lowerSeriesOptions.id && d[i].options._levelNumber === s + 1) {
                                e = d[i];
                                break
                            }
                    e.xData = [], r(t.levelSeriesOptions, p), v(l, "drillup", {
                        seriesOptions: t.seriesOptions
                    }), o.type === e.type && (o.drilldownLevel = t, o.options.animation = l.options.drilldown.animation, e.animateDrillupFrom && e.chart && e.animateDrillupFrom(t)), o.options._levelNumber = s, e.remove(!1), o.xAxis && (i = t.oldExtremes, o.xAxis.setExtremes(i.xMin, i.xMax, !1), o.yAxis.setExtremes(i.yMin, i.yMax, !1))
                }
            v(l, "drillupall"), this.redraw(), 0 === this.drilldownLevels.length ? this.drillUpButton = this.drillUpButton.destroy() : this.drillUpButton.attr({
                text: this.getDrilldownBackText()
            }).align(), this.ddDupes.length = []
        }, u.prototype.supportsDrilldown = !0, u.prototype.animateDrillupTo = function(i) {
            if (!i) {
                var t = this,
                    o = t.drilldownLevel;
                r(this.points, function(i) {
                    i.graphic && i.graphic.hide(), i.dataLabel && i.dataLabel.hide(), i.connector && i.connector.hide()
                }), setTimeout(function() {
                    t.points && r(t.points, function(i, t) {
                        t = t === (o && o.pointIndex) ? "show" : "fadeIn";
                        var e = "show" === t ? !0 : void 0;
                        i.graphic && i.graphic[t](e), i.dataLabel && i.dataLabel[t](e), i.connector && i.connector[t](e)
                    })
                }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0)), this.animate = e
            }
        }, u.prototype.animateDrilldown = function(i) {
            var t, e = this,
                o = this.chart.drilldownLevels,
                l = this.chart.options.drilldown.animation,
                s = this.xAxis;
            i || (r(o, function(i) {
                e.options._ddSeriesId === i.lowerSeriesOptions._ddSeriesId && (t = i.shapeArgs, t.fill = i.color)
            }), t.x += a(s.oldPos, s.pos) - s.pos, r(this.points, function(i) {
                i.shapeArgs.fill = i.color, i.graphic && i.graphic.attr(t).animate(n(i.shapeArgs, {
                    fill: i.color || e.color
                }), l), i.dataLabel && i.dataLabel.fadeIn(l)
            }), this.animate = null)
        }, u.prototype.animateDrillupFrom = function(t) {
            var e = this.chart.options.drilldown.animation,
                o = this.group,
                l = this;
            r(l.trackerGroups, function(i) {
                l[i] && l[i].on("mouseover")
            }), delete this.group, r(this.points, function(l) {
                var r = l.graphic,
                    n = t.shapeArgs,
                    s = function() {
                        r.destroy(), o && (o = o.destroy())
                    };
                r && (delete l.graphic, n.fill = t.color, e ? r.animate(n, i.merge(e, {
                    complete: s
                })) : (r.attr(n), s()))
            })
        }, c && n(c.prototype, {
            supportsDrilldown: !0,
            animateDrillupTo: u.prototype.animateDrillupTo,
            animateDrillupFrom: u.prototype.animateDrillupFrom,
            animateDrilldown: function(t) {
                var e = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    o = this.chart.options.drilldown.animation,
                    l = e.shapeArgs,
                    n = l.start,
                    s = (l.end - n) / this.points.length;
                t || (r(this.points, function(t, r) {
                    var a = t.shapeArgs;
                    l.fill = e.color, a.fill = t.color, t.graphic && t.graphic.attr(i.merge(l, {
                        start: n + r * s,
                        end: n + (r + 1) * s
                    }))[o ? "animate" : "attr"](a, o)
                }), this.animate = null)
            }
        }), i.Point.prototype.doDrilldown = function(i, t, e) {
            var o, l = this.series.chart,
                r = l.options.drilldown,
                n = (r.series || []).length;
            for (l.ddDupes || (l.ddDupes = []); n-- && !o;) r.series[n].id === this.drilldown && -1 === w(this.drilldown, l.ddDupes) && (o = r.series[n], l.ddDupes.push(this.drilldown));
            v(l, "drilldown", {
                point: this,
                seriesOptions: o,
                category: t,
                originalEvent: e,
                points: void 0 !== t && this.series.xAxis.getDDPoints(t).slice(0)
            }, function(t) {
                var e = t.point.series && t.point.series.chart,
                    o = t.seriesOptions;
                e && o && (i ? e.addSingleSeriesAsDrilldown(t.point, o) : e.addSeriesAsDrilldown(t.point, o))
            })
        }, i.Axis.prototype.drilldownCategory = function(i, t) {
            var e, o, l = this.getDDPoints(i);
            for (e in l)(o = l[e]) && o.series && o.series.visible && o.doDrilldown && o.doDrilldown(!0, i, t);
            this.chart.applyDrilldown()
        }, i.Axis.prototype.getDDPoints = function(i) {
            var t = [];
            return r(this.series, function(e) {
                var o, l = e.xData,
                    r = e.points;
                for (o = 0; o < l.length; o++)
                    if (l[o] === i && e.options.data[o] && e.options.data[o].drilldown) {
                        t.push(r ? r[o] : !0);
                        break
                    }
            }), t
        }, g.prototype.drillable = function() {
            var t = this.pos,
                e = this.label,
                o = this.axis,
                l = "xAxis" === o.coll && o.getDDPoints,
                r = l && o.getDDPoints(t);
            l && (e && r.length ? (e.drillable = !0, e.basicStyles || (e.basicStyles = i.merge(e.styles)), e.addClass("highcharts-drilldown-axis-label").css(o.chart.options.drilldown.activeAxisLabelStyle).on("click", function(i) {
                o.drilldownCategory(t, i)
            })) : e && e.drillable && (e.styles = {}, e.css(e.basicStyles), e.on("click", null), e.removeClass("highcharts-drilldown-axis-label")))
        }, d(g.prototype, "addLabel", function(i) {
            i.call(this), this.drillable()
        }), d(i.Point.prototype, "init", function(t, e, o, l) {
            var r = t.call(this, e, o, l);
            return l = (t = e.xAxis) && t.ticks[l], r.drilldown && i.addEvent(r, "click", function(i) {
                e.xAxis && !1 === e.chart.options.drilldown.allowPointDrilldown ? e.xAxis.drilldownCategory(r.x, i) : r.doDrilldown(void 0, void 0, i)
            }), l && l.drillable(), r
        }), d(i.Series.prototype, "drawDataLabels", function(i) {
            var t = this.chart.options.drilldown.activeDataLabelStyle,
                e = this.chart.renderer;
            i.call(this), r(this.points, function(i) {
                var o = {};
                i.drilldown && i.dataLabel && ("contrast" === t.color && (o.color = e.getContrast(i.color || this.color)), i.dataLabel.addClass("highcharts-drilldown-data-label"), i.dataLabel.css(t).css(o))
            }, this)
        });
        var x, l = function(i) {
            i.call(this), r(this.points, function(i) {
                i.drilldown && i.graphic && (i.graphic.addClass("highcharts-drilldown-point"), i.graphic.css({
                    cursor: "pointer"
                }))
            })
        };
        for (x in h) h[x].prototype.supportsDrilldown && d(h[x].prototype, "drawTracker", l)
    }(i)
});
! function(t) {
    "object" == typeof module && module.exports ? module.exports = t : t(Highcharts)
}(function(t) {
    ! function(t) {
        var e = t.defaultOptions,
            n = t.doc,
            o = t.Chart,
            i = t.addEvent,
            r = t.removeEvent,
            s = t.fireEvent,
            a = t.createElement,
            l = t.discardElement,
            p = t.css,
            c = t.merge,
            h = t.pick,
            u = t.each,
            d = t.extend,
            g = t.isTouchDevice,
            m = t.win,
            x = t.Renderer.prototype.symbols;
        d(e.lang, {
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu"
        }), e.navigation = {
            buttonOptions: {
                theme: {},
                symbolSize: 14,
                symbolX: 12.5,
                symbolY: 10.5,
                align: "right",
                buttonSpacing: 3,
                height: 22,
                verticalAlign: "top",
                width: 24
            }
        }, c(!0, e.navigation, {
            menuStyle: {
                border: "1px solid #999999",
                background: "#ffffff",
                padding: "5px 0"
            },
            menuItemStyle: {
                padding: "0.5em 1em",
                background: "none",
                color: "#333333",
                fontSize: g ? "14px" : "11px",
                transition: "background 250ms, color 250ms"
            },
            menuItemHoverStyle: {
                background: "#335cad",
                color: "#ffffff"
            },
            buttonOptions: {
                symbolFill: "#666666",
                symbolStroke: "#666666",
                symbolStrokeWidth: 3,
                theme: {
                    fill: "#ffffff",
                    stroke: "none",
                    padding: 5
                }
            }
        }), e.exporting = {
            type: "image/png",
            url: "https://export.highcharts.com/",
            printMaxWidth: 780,
            scale: 2,
            buttons: {
                contextButton: {
                    className: "highcharts-contextbutton",
                    menuClassName: "highcharts-contextmenu",
                    symbol: "menu",
                    _titleKey: "contextButtonTitle",
                    menuItems: [{
                        textKey: "printChart",
                        onclick: function() {
                            this.print()
                        }
                    }, {
                        separator: !0
                    }, {
                        textKey: "downloadPNG",
                        onclick: function() {
                            this.exportChart()
                        }
                    }, {
                        textKey: "downloadJPEG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/jpeg"
                            })
                        }
                    }, {
                        textKey: "downloadPDF",
                        onclick: function() {
                            this.exportChart({
                                type: "application/pdf"
                            })
                        }
                    }, {
                        textKey: "downloadSVG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/svg+xml"
                            })
                        }
                    }]
                }
            }
        }, t.post = function(t, e, o) {
            var i;
            t = a("form", c({
                method: "post",
                action: t,
                enctype: "multipart/form-data"
            }, o), {
                display: "none"
            }, n.body);
            for (i in e) a("input", {
                type: "hidden",
                name: i,
                value: e[i]
            }, null, t);
            t.submit(), l(t)
        }, d(o.prototype, {
            sanitizeSVG: function(t, e) {
                if (e && e.exporting && e.exporting.allowHTML) {
                    var n = t.match(/<\/svg>(.*?$)/);
                    n && (n = '<foreignObject x="0" y="0" width="' + e.chart.width + '" height="' + e.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + n[1] + "</body></foreignObject>", t = t.replace("</svg>", n + "</svg>"))
                }
                return t = t.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, " ").replace(/&shy;/g, "­"), t = t.replace(/<IMG /g, "<image ").replace(/<(\/?)TITLE>/g, "<$1title>").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/ id=([^" >]+)/g, ' id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function(t) {
                    return t.toLowerCase()
                })
            },
            getChartHTML: function() {
                return this.container.innerHTML
            },
            getSVG: function(e) {
                var o, i, r, s, p, h = c(this.options, e);
                return n.createElementNS || (n.createElementNS = function(t, e) {
                    return n.createElement(e)
                }), i = a("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: this.chartWidth + "px",
                    height: this.chartHeight + "px"
                }, n.body), r = this.renderTo.style.width, p = this.renderTo.style.height, r = h.exporting.sourceWidth || h.chart.width || /px$/.test(r) && parseInt(r, 10) || 600, p = h.exporting.sourceHeight || h.chart.height || /px$/.test(p) && parseInt(p, 10) || 400, d(h.chart, {
                    animation: !1,
                    renderTo: i,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: r,
                    height: p
                }), h.exporting.enabled = !1, delete h.data, h.series = [], u(this.series, function(t) {
                    s = c(t.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: t.visible
                    }), s.isInternal || h.series.push(s)
                }), u(this.axes, function(e) {
                    e.userOptions.internalKey = t.uniqueKey()
                }), o = new t.Chart(h, this.callback), e && u(["xAxis", "yAxis", "series"], function(t) {
                    var n = {};
                    e[t] && (n[t] = e[t], o.update(n))
                }), u(this.axes, function(e) {
                    var n = t.find(o.axes, function(t) {
                            return t.options.internalKey === e.userOptions.internalKey
                        }),
                        i = e.getExtremes(),
                        r = i.userMin,
                        i = i.userMax;
                    !n || void 0 === r && void 0 === i || n.setExtremes(r, i, !0, !1)
                }), r = o.getChartHTML(), r = this.sanitizeSVG(r, h), h = null, o.destroy(), l(i), r
            },
            getSVGForExport: function(t, e) {
                var n = this.options.exporting;
                return this.getSVG(c({
                    chart: {
                        borderRadius: 0
                    }
                }, n.chartOptions, e, {
                    exporting: {
                        sourceWidth: t && t.sourceWidth || n.sourceWidth,
                        sourceHeight: t && t.sourceHeight || n.sourceHeight
                    }
                }))
            },
            exportChart: function(e, n) {
                n = this.getSVGForExport(e, n), e = c(this.options.exporting, e), t.post(e.url, {
                    filename: e.filename || "chart",
                    type: e.type,
                    width: e.width || 0,
                    scale: e.scale,
                    svg: n
                }, e.formAttributes)
            },
            print: function() {
                var t, e, o = this,
                    i = o.container,
                    r = [],
                    a = i.parentNode,
                    l = n.body,
                    p = l.childNodes,
                    c = o.options.exporting.printMaxWidth;
                o.isPrinting || (o.isPrinting = !0, o.pointer.reset(null, 0), s(o, "beforePrint"), (e = c && o.chartWidth > c) && (t = [o.options.chart.width, void 0, !1], o.setSize(c, void 0, !1)), u(p, function(t, e) {
                    1 === t.nodeType && (r[e] = t.style.display, t.style.display = "none")
                }), l.appendChild(i), m.focus(), m.print(), setTimeout(function() {
                    a.appendChild(i), u(p, function(t, e) {
                        1 === t.nodeType && (t.style.display = r[e])
                    }), o.isPrinting = !1, e && o.setSize.apply(o, t), s(o, "afterPrint")
                }, 1e3))
            },
            contextMenu: function(t, e, o, r, s, l, c) {
                var h, g, m = this,
                    x = m.options.navigation,
                    f = m.chartWidth,
                    y = m.chartHeight,
                    b = "cache-" + t,
                    v = m[b],
                    w = Math.max(s, l);
                v || (m[b] = v = a("div", {
                    className: t
                }, {
                    position: "absolute",
                    zIndex: 1e3,
                    padding: w + "px"
                }, m.container), h = a("div", {
                    className: "highcharts-menu"
                }, null, v), p(h, d({
                    MozBoxShadow: "3px 3px 10px #888",
                    WebkitBoxShadow: "3px 3px 10px #888",
                    boxShadow: "3px 3px 10px #888"
                }, x.menuStyle)), g = function() {
                    p(v, {
                        display: "none"
                    }), c && c.setState(0), m.openMenu = !1
                }, i(v, "mouseleave", function() {
                    v.hideTimer = setTimeout(g, 500)
                }), i(v, "mouseenter", function() {
                    clearTimeout(v.hideTimer)
                }), b = i(n, "mouseup", function(e) {
                    m.pointer.inClass(e.target, t) || g()
                }), i(m, "destroy", b), u(e, function(t) {
                    if (t) {
                        var e;
                        t.separator ? e = a("hr", null, null, h) : (e = a("div", {
                            className: "highcharts-menu-item",
                            onclick: function(e) {
                                e && e.stopPropagation(), g(), t.onclick && t.onclick.apply(m, arguments)
                            },
                            innerHTML: t.text || m.options.lang[t.textKey]
                        }, null, h), e.onmouseover = function() {
                            p(this, x.menuItemHoverStyle)
                        }, e.onmouseout = function() {
                            p(this, x.menuItemStyle)
                        }, p(e, d({
                            cursor: "pointer"
                        }, x.menuItemStyle))), m.exportDivElements.push(e)
                    }
                }), m.exportDivElements.push(h, v), m.exportMenuWidth = v.offsetWidth, m.exportMenuHeight = v.offsetHeight), e = {
                    display: "block"
                }, o + m.exportMenuWidth > f ? e.right = f - o - s - w + "px" : e.left = o - w + "px", r + l + m.exportMenuHeight > y && "top" !== c.alignOptions.verticalAlign ? e.bottom = y - r - w + "px" : e.top = r + l - w + "px", p(v, e), m.openMenu = !0
            },
            addButton: function(t) {
                var e, n, o = this,
                    i = o.renderer,
                    r = c(o.options.navigation.buttonOptions, t),
                    s = r.onclick,
                    a = r.menuItems,
                    l = r.symbolSize || 12;
                if (o.btnCount || (o.btnCount = 0), o.exportDivElements || (o.exportDivElements = [], o.exportSVGElements = []), !1 !== r.enabled) {
                    var p, u = r.theme,
                        g = u.states,
                        m = g && g.hover,
                        g = g && g.select;
                    delete u.states, s ? p = function(t) {
                        t.stopPropagation(), s.call(o, t)
                    } : a && (p = function() {
                        o.contextMenu(n.menuClassName, a, n.translateX, n.translateY, n.width, n.height, n), n.setState(2)
                    }), r.text && r.symbol ? u.paddingLeft = h(u.paddingLeft, 25) : r.text || d(u, {
                        width: r.width,
                        height: r.height,
                        padding: 0
                    }), n = i.button(r.text, 0, 0, p, u, m, g).addClass(t.className).attr({
                        "stroke-linecap": "round",
                        title: o.options.lang[r._titleKey],
                        zIndex: 3
                    }), n.menuClassName = t.menuClassName || "highcharts-menu-" + o.btnCount++, r.symbol && (e = i.symbol(r.symbol, r.symbolX - l / 2, r.symbolY - l / 2, l, l).addClass("highcharts-button-symbol").attr({
                        zIndex: 1
                    }).add(n), e.attr({
                        stroke: r.symbolStroke,
                        fill: r.symbolFill,
                        "stroke-width": r.symbolStrokeWidth || 1
                    })), n.add().align(d(r, {
                        width: n.width,
                        x: h(r.x, o.buttonOffset)
                    }), !0, "spacingBox"), o.buttonOffset += (n.width + r.buttonSpacing) * ("right" === r.align ? -1 : 1), o.exportSVGElements.push(n, e)
                }
            },
            destroyExport: function(t) {
                var e = t ? t.target : this;
                t = e.exportSVGElements;
                var n = e.exportDivElements;
                t && (u(t, function(t, n) {
                    t && (t.onclick = t.ontouchstart = null, e.exportSVGElements[n] = t.destroy())
                }), t.length = 0), n && (u(n, function(t, n) {
                    clearTimeout(t.hideTimer), r(t, "mouseleave"), e.exportDivElements[n] = t.onmouseout = t.onmouseover = t.ontouchstart = t.onclick = null, l(t)
                }), n.length = 0)
            }
        }), x.menu = function(t, e, n, o) {
            return ["M", t, e + 2.5, "L", t + n, e + 2.5, "M", t, e + o / 2 + .5, "L", t + n, e + o / 2 + .5, "M", t, e + o - 1.5, "L", t + n, e + o - 1.5]
        }, o.prototype.renderExporting = function() {
            var t, e = this.options.exporting,
                n = e.buttons,
                o = this.isDirtyExporting || !this.exportSVGElements;
            if (this.buttonOffset = 0, this.isDirtyExporting && this.destroyExport(), o && !1 !== e.enabled) {
                for (t in n) this.addButton(n[t]);
                this.isDirtyExporting = !1
            }
            i(this, "destroy", this.destroyExport)
        }, o.prototype.callbacks.push(function(t) {
            t.renderExporting(), i(t, "redraw", t.renderExporting), u(["exporting", "navigation"], function(e) {
                t[e] = {
                    update: function(n, o) {
                        t.isDirtyExporting = !0, c(!0, t.options[e], n), h(o, !0) && t.redraw()
                    }
                }
            })
        })
    }(t)
});
console.timeEnd('highcharts');
