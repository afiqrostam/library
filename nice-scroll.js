console.time('nice-scroll');/*
! function(e) {
    var o = !1,
        t = !1,
        r = 5e3,
        i = 2e3,
        n = 0,
        s = function() {
            var e = document.getElementsByTagName("script"),
                e = e[e.length - 1].src.split("?")[0];
            return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : ""
        }(),
        l = ["ms", "moz", "webkit", "o"],
        c = window.requestAnimationFrame || !1,
        d = window.cancelAnimationFrame || !1;
    if (!c)
        for (var u in l) {
            var h = l[u];
            c || (c = window[h + "RequestAnimationFrame"]), d || (d = window[h + "CancelAnimationFrame"] || window[h + "CancelRequestAnimationFrame"])
        }
    var p = window.MutationObserver || window.WebKitMutationObserver || !1,
        m = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "5px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: .3,
            rtlmode: !1,
            cursordragontouch: !1,
            oneaxismousemode: "auto"
        },
        f = !1,
        g = function() {
            if (f) return f;
            var e = document.createElement("DIV"),
                o = {
                    haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
                };
            o.isopera = "opera" in window, o.isopera12 = o.isopera && "getUserMedia" in navigator, o.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini), o.isie = "all" in document && "attachEvent" in e && !o.isopera, o.isieold = o.isie && !("msInterpolationMode" in e.style), o.isie7 = o.isie && !o.isieold && (!("documentMode" in document) || 7 == document.documentMode), o.isie8 = o.isie && "documentMode" in document && 8 == document.documentMode, o.isie9 = o.isie && "performance" in window && 9 <= document.documentMode, o.isie10 = o.isie && "performance" in window && 10 <= document.documentMode, o.isie9mobile = /iemobile.9/i.test(navigator.userAgent), o.isie9mobile && (o.isie9 = !1), o.isie7mobile = !o.isie9mobile && o.isie7 && /iemobile/i.test(navigator.userAgent), o.ismozilla = "MozAppearance" in e.style, o.iswebkit = "WebkitAppearance" in e.style, o.ischrome = "chrome" in window, o.ischrome22 = o.ischrome && o.haspointerlock, o.ischrome26 = o.ischrome && "transition" in e.style, o.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window, o.hasmstouch = window.navigator.msPointerEnabled || !1, o.ismac = /^mac$/i.test(navigator.platform), o.isios = o.cantouch && /iphone|ipad|ipod/i.test(navigator.platform), o.isios4 = o.isios && !("seal" in Object), o.isandroid = /android/i.test(navigator.userAgent), o.trstyle = !1, o.hastransform = !1, o.hastranslate3d = !1, o.transitionstyle = !1, o.hastransition = !1, o.transitionend = !1;
            for (var t = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"], r = 0; r < t.length; r++)
                if ("undefined" != typeof e.style[t[r]]) {
                    o.trstyle = t[r];
                    break
                }
            o.hastransform = 0 != o.trstyle, o.hastransform && (e.style[o.trstyle] = "translate3d(1px,2px,3px)", o.hastranslate3d = /translate3d/.test(e.style[o.trstyle])), o.transitionstyle = !1, o.prefixstyle = "", o.transitionend = !1;
            for (var t = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), i = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), n = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), r = 0; r < t.length; r++)
                if (t[r] in e.style) {
                    o.transitionstyle = t[r], o.prefixstyle = i[r], o.transitionend = n[r];
                    break
                }
            o.ischrome26 && (o.prefixstyle = i[1]), o.hastransition = o.transitionstyle;
            e: {
                for (t = ["-moz-grab", "-webkit-grab", "grab"], (o.ischrome && !o.ischrome22 || o.isie) && (t = []), r = 0; r < t.length; r++)
                    if (i = t[r], e.style.cursor = i, e.style.cursor == i) {
                        t = i;
                        break e
                    }
                t = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
            }
            return o.cursorgrabvalue = t, o.hasmousecapture = "setCapture" in e, o.hasMutationObserver = !1 !== p, f = o
        },
        w = function(l, a) {
            function u() {
                var e = y.win;
                if ("zIndex" in e) return e.zIndex();
                for (; 0 < e.length && 9 != e[0].nodeType;) {
                    var o = e.css("zIndex");
                    if (!isNaN(o) && 0 != o) return parseInt(o);
                    e = e.parent()
                }
                return !1
            }

            function h(e, o, t) {
                return o = e.css(o), e = parseFloat(o), isNaN(e) ? (e = z[o] || 0, t = 3 == e ? t ? y.win.outerHeight() - y.win.innerHeight() : y.win.outerWidth() - y.win.innerWidth() : 1, y.isie8 && e && (e += 1), t ? e : 0) : e
            }

            function f(e, o, t, r) {
                y._bind(e, o, function(r) {
                    r = r ? r : window.event;
                    var i = {
                        original: r,
                        target: r.target || r.srcElement,
                        type: "wheel",
                        deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function() {
                            return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1
                        },
                        stopImmediatePropagation: function() {
                            r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
                        }
                    };
                    return "mousewheel" == o ? (i.deltaY = -.025 * r.wheelDelta, r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX)) : i.deltaY = r.detail, t.call(e, i)
                }, r)
            }

            function w(e, o, t) {
                var r, i;
                if (0 == e.deltaMode ? (r = -Math.floor(e.deltaX * (y.opt.mousescrollstep / 54)), i = -Math.floor(e.deltaY * (y.opt.mousescrollstep / 54))) : 1 == e.deltaMode && (r = -Math.floor(e.deltaX * y.opt.mousescrollstep), i = -Math.floor(e.deltaY * y.opt.mousescrollstep)), o && y.opt.oneaxismousemode && 0 == r && i && (r = i, i = 0), r && (y.scrollmom && y.scrollmom.stop(), y.lastdeltax += r, y.debounced("mousewheelx", function() {
                        var e = y.lastdeltax;
                        y.lastdeltax = 0, y.rail.drag || y.doScrollLeftBy(e)
                    }, 120)), i) {
                    if (y.opt.nativeparentscrolling && t && !y.ispage && !y.zoomactive)
                        if (0 > i) {
                            if (y.getScrollTop() >= y.page.maxh) return !0
                        } else if (0 >= y.getScrollTop()) return !0;
                    y.scrollmom && y.scrollmom.stop(), y.lastdeltay += i, y.debounced("mousewheely", function() {
                        var e = y.lastdeltay;
                        y.lastdeltay = 0, y.rail.drag || y.doScrollBy(e)
                    }, 120)
                }
                return e.stopImmediatePropagation(), e.preventDefault()
            }
            var y = this;
            if (this.version = "3.5.0", this.name = "nicescroll", this.me = a, this.opt = {
                    doc: e("body"),
                    win: !1
                }, e.extend(this.opt, m), this.opt.snapbackspeed = 80, l)
                for (var b in y.opt) "undefined" != typeof l[b] && (y.opt[b] = l[b]);
            this.iddoc = (this.doc = y.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /BODY|HTML/.test(y.opt.win ? y.opt.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== y.opt.win, this.win = y.opt.win || (this.ispage ? e(window) : this.doc), this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win, this.body = e("body"), this.iframe = this.isfixed = this.viewport = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != y.opt.autohidemode, this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1, this.scroll = {
                x: 0,
                y: 0
            }, this.scrollratio = {
                x: 0,
                y: 0
            }, this.cursorheight = 20, this.scrollvaluemax = 0, this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.checkrtlmode = !1;
            do this.id = "ascrail" + i++; while (document.getElementById(this.id));
            this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1, this.visibility = !0, this.hidden = this.locked = !1, this.cursoractive = !0, this.overflowx = y.opt.overflowx, this.overflowy = y.opt.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltay = this.lastdeltax = 0, this.detected = g();
            var x = e.extend({}, this.detected);
            if (this.ishwscroll = (this.canhwscroll = x.hastransform && y.opt.hwacceleration) && y.haswrapper, this.istouchcapable = !1, x.cantouch && x.ischrome && !x.isios && !x.isandroid && (this.istouchcapable = !0, x.cantouch = !1), x.cantouch && x.ismozilla && !x.isios && !x.isandroid && (this.istouchcapable = !0, x.cantouch = !1), y.opt.enablemouselockapi || (x.hasmousecapture = !1, x.haspointerlock = !1), this.delayed = function(e, o, t, r) {
                    var i = y.delaylist[e],
                        n = (new Date).getTime();
                    return !r && i && i.tt ? !1 : (i && i.tt && clearTimeout(i.tt), void(i && i.last + t > n && !i.tt ? y.delaylist[e] = {
                        last: n + t,
                        tt: setTimeout(function() {
                            y.delaylist[e].tt = 0, o.call()
                        }, t)
                    } : i && i.tt || (y.delaylist[e] = {
                        last: n,
                        tt: 0
                    }, setTimeout(function() {
                        o.call()
                    }, 0))))
                }, this.debounced = function(e, o, t) {
                    var r = y.delaylist[e];
                    (new Date).getTime(), y.delaylist[e] = o, r || setTimeout(function() {
                        var o = y.delaylist[e];
                        y.delaylist[e] = !1, o.call()
                    }, t)
                }, this.synched = function(e, o) {
                    return y.synclist[e] = o,
                        function() {
                            y.onsync || (c(function() {
                                y.onsync = !1;
                                for (e in y.synclist) {
                                    var o = y.synclist[e];
                                    o && o.call(y), y.synclist[e] = !1
                                }
                            }), y.onsync = !0)
                        }(), e
                }, this.unsynched = function(e) {
                    y.synclist[e] && (y.synclist[e] = !1)
                }, this.css = function(e, o) {
                    for (var t in o) y.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
                }, this.scrollTop = function(e) {
                    return "undefined" == typeof e ? y.getScrollTop() : y.setScrollTop(e)
                }, this.scrollLeft = function(e) {
                    return "undefined" == typeof e ? y.getScrollLeft() : y.setScrollLeft(e)
                }, BezierClass = function(e, o, t, r, i, n, s) {
                    this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = n || 0, this.p4 = s || 1, this.ts = (new Date).getTime(), this.df = this.ed - this.st
                }, BezierClass.prototype = {
                    B2: function(e) {
                        return 3 * e * e * (1 - e)
                    },
                    B3: function(e) {
                        return 3 * e * (1 - e) * (1 - e)
                    },
                    B4: function(e) {
                        return (1 - e) * (1 - e) * (1 - e)
                    },
                    getNow: function() {
                        var e = 1 - ((new Date).getTime() - this.ts) / this.spd,
                            o = this.B2(e) + this.B3(e) + this.B4(e);
                        return 0 > e ? this.ed : this.st + Math.round(this.df * o)
                    },
                    update: function(e, o) {
                        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = (new Date).getTime(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                }, x.hastranslate3d && x.isios && this.doc.css("-webkit-backface-visibility", "hidden");
                var S = function() {
                    var e = y.doc.css(x.trstyle);
                    return e && "matrix" == e.substr(0, 6) ? e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
                };
                this.getScrollTop = function(e) {
                    if (!e) {
                        if (e = S()) return 16 == e.length ? -e[13] : -e[5];
                        if (y.timerscroll && y.timerscroll.bz) return y.timerscroll.bz.getNow()
                    }
                    return y.doc.translate.y
                }, this.getScrollLeft = function(e) {
                    if (!e) {
                        if (e = S()) return 16 == e.length ? -e[12] : -e[4];
                        if (y.timerscroll && y.timerscroll.bh) return y.timerscroll.bh.getNow()
                    }
                    return y.doc.translate.x
                }, this.notifyScrollEvent = document.createEvent ? function(e) {
                    var o = document.createEvent("UIEvents");
                    o.initUIEvent("scroll", !1, !0, window, 1), e.dispatchEvent(o)
                } : document.fireEvent ? function(e) {
                    var o = document.createEventObject();
                    e.fireEvent("onscroll"), o.cancelBubble = !0
                } : function(e, o) {}, x.hastranslate3d && y.opt.enabletranslate3d ? (this.setScrollTop = function(e, o) {
                    y.doc.translate.y = e, y.doc.translate.ty = -1 * e + "px", y.doc.css(x.trstyle, "translate3d(" + y.doc.translate.tx + "," + y.doc.translate.ty + ",0px)"), o || y.notifyScrollEvent(y.win[0])
                }, this.setScrollLeft = function(e, o) {
                    y.doc.translate.x = e, y.doc.translate.tx = -1 * e + "px", y.doc.css(x.trstyle, "translate3d(" + y.doc.translate.tx + "," + y.doc.translate.ty + ",0px)"), o || y.notifyScrollEvent(y.win[0])
                }) : (this.setScrollTop = function(e, o) {
                    y.doc.translate.y = e, y.doc.translate.ty = -1 * e + "px", y.doc.css(x.trstyle, "translate(" + y.doc.translate.tx + "," + y.doc.translate.ty + ")"), o || y.notifyScrollEvent(y.win[0])
                }, this.setScrollLeft = function(e, o) {
                    y.doc.translate.x = e, y.doc.translate.tx = -1 * e + "px", y.doc.css(x.trstyle, "translate(" + y.doc.translate.tx + "," + y.doc.translate.ty + ")"), o || y.notifyScrollEvent(y.win[0])
                })
            } else this.getScrollTop = function() {
                return y.docscroll.scrollTop()
            }, this.setScrollTop = function(e) {
                return y.docscroll.scrollTop(e)
            }, this.getScrollLeft = function() {
                return y.docscroll.scrollLeft()
            }, this.setScrollLeft = function(e) {
                return y.docscroll.scrollLeft(e)
            };
            this.getTarget = function(e) {
                return e ? e.target ? e.target : e.srcElement ? e.srcElement : !1 : !1
            }, this.hasParent = function(e, o) {
                if (!e) return !1;
                for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
                return !1 !== t
            };
            var z = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getOffset = function() {
                if (y.isfixed) return {
                    top: parseFloat(y.win.css("top")),
                    left: parseFloat(y.win.css("left"))
                };
                if (!y.viewport) return y.win.offset();
                var e = y.win.offset(),
                    o = y.viewport.offset();
                return {
                    top: e.top - o.top + y.viewport.scrollTop(),
                    left: e.left - o.left + y.viewport.scrollLeft()
                }
            }, this.updateScrollBar = function(e) {
                if (y.ishwscroll) y.rail.css({
                    height: y.win.innerHeight()
                }), y.railh && y.railh.css({
                    width: y.win.innerWidth()
                });
                else {
                    var o = y.getOffset(),
                        t = o.top,
                        r = o.left,
                        t = t + h(y.win, "border-top-width", !0);
                    y.win.outerWidth(), y.win.innerWidth();
                    var r = r + (y.rail.align ? y.win.outerWidth() - h(y.win, "border-right-width") - y.rail.width : h(y.win, "border-left-width")),
                        i = y.opt.railoffset;
                    i && (i.top && (t += i.top), y.rail.align && i.left && (r += i.left)), y.locked || y.rail.css({
                        top: t,
                        left: r,
                        height: e ? e.h : y.win.innerHeight()
                    }), y.zoom && y.zoom.css({
                        top: t + 1,
                        left: 1 == y.rail.align ? r - 20 : r + y.rail.width + 4
                    }), y.railh && !y.locked && (t = o.top, r = o.left, e = y.railh.align ? t + h(y.win, "border-top-width", !0) + y.win.innerHeight() - y.railh.height : t + h(y.win, "border-top-width", !0), r += h(y.win, "border-left-width"), y.railh.css({
                        top: e,
                        left: r,
                        width: y.railh.width
                    }))
                }
            }, this.doRailClick = function(e, o, t) {
                var r;
                y.locked || (y.cancelEvent(e), o ? (o = t ? y.doScrollLeft : y.doScrollTop, r = t ? (e.pageX - y.railh.offset().left - y.cursorwidth / 2) * y.scrollratio.x : (e.pageY - y.rail.offset().top - y.cursorheight / 2) * y.scrollratio.y, o(r)) : (o = t ? y.doScrollLeftBy : y.doScrollBy, r = t ? y.scroll.x : y.scroll.y, e = t ? e.pageX - y.railh.offset().left : e.pageY - y.rail.offset().top, t = t ? y.view.w : y.view.h, o(r >= e ? t : -t)))
            }, y.hasanimationframe = c, y.hascancelanimationframe = d, y.hasanimationframe ? y.hascancelanimationframe || (d = function() {
                y.cancelAnimationFrame = !0
            }) : (c = function(e) {
                return setTimeout(e, 15 - Math.floor(+new Date / 1e3) % 16)
            }, d = clearInterval), this.init = function() {
                if (y.saved.css = [], x.isie7mobile || x.isoperamini) return !0;
                if (x.hasmstouch && y.css(y.ispage ? e("html") : y.win, {
                        "-ms-touch-action": "none"
                    }), y.zindex = "auto", y.zindex = y.ispage || "auto" != y.opt.zindex ? y.opt.zindex : u() || "auto", !y.ispage && "auto" != y.zindex && y.zindex > n && (n = y.zindex), y.isie && 0 == y.zindex && "auto" == y.opt.zindex && (y.zindex = "auto"), !y.ispage || !x.cantouch && !x.isieold && !x.isie9mobile) {
                    var i = y.docscroll;
                    y.ispage && (i = y.haswrapper ? y.win : y.doc), x.isie9mobile || y.css(i, {
                        "overflow-y": "hidden"
                    }), y.ispage && x.isie7 && ("BODY" == y.doc[0].nodeName ? y.css(e("html"), {
                        "overflow-y": "hidden"
                    }) : "HTML" == y.doc[0].nodeName && y.css(e("body"), {
                        "overflow-y": "hidden"
                    })), x.isios && !y.ispage && !y.haswrapper && y.css(e("body"), {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var l = e(document.createElement("div"));
                    l.css({
                        position: "relative",
                        top: 0,
                        "float": "right",
                        width: y.opt.cursorwidth,
                        height: "0px",
                        "background-color": y.opt.cursorcolor,
                        border: y.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": y.opt.cursorborderradius,
                        "-moz-border-radius": y.opt.cursorborderradius,
                        "border-radius": y.opt.cursorborderradius
                    }), l.hborder = parseFloat(l.outerHeight() - l.innerHeight()), y.cursor = l;
                    var a = e(document.createElement("div"));
                    a.attr("id", y.id), a.addClass("nicescroll-rails");
                    var c, d, h, m = ["left", "right"];
                    for (h in m) d = m[h], (c = y.opt.railpadding[d]) ? a.css("padding-" + d, c + "px") : y.opt.railpadding[d] = 0;
                    if (a.append(l), a.width = Math.max(parseFloat(y.opt.cursorwidth), l.outerWidth()) + y.opt.railpadding.left + y.opt.railpadding.right, a.css({
                            width: a.width + "px",
                            zIndex: y.zindex,
                            background: y.opt.background,
                            cursor: "default"
                        }), a.visibility = !0, a.scrollable = !0, a.align = "left" == y.opt.railalign ? 0 : 1, y.rail = a, l = y.rail.drag = !1, y.opt.boxzoom && !y.ispage && !x.isieold && (l = document.createElement("div"), y.bind(l, "click", y.doZoom), y.zoom = e(l), y.zoom.css({
                            cursor: "pointer",
                            "z-index": y.zindex,
                            backgroundImage: "url(" + s + "zoomico.png)",
                            height: 18,
                            width: 18,
                            backgroundPosition: "0px 0px"
                        }), y.opt.dblclickzoom && y.bind(y.win, "dblclick", y.doZoom), x.cantouch && y.opt.gesturezoom && (y.ongesturezoom = function(e) {
                            return 1.5 < e.scale && y.doZoomIn(e), .8 > e.scale && y.doZoomOut(e), y.cancelEvent(e)
                        }, y.bind(y.win, "gestureend", y.ongesturezoom))), y.railh = !1, y.opt.horizrailenabled) {
                        y.css(i, {
                            "overflow-x": "hidden"
                        }), l = e(document.createElement("div")), l.css({
                            position: "relative",
                            top: 0,
                            height: y.opt.cursorwidth,
                            width: "0px",
                            "background-color": y.opt.cursorcolor,
                            border: y.opt.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": y.opt.cursorborderradius,
                            "-moz-border-radius": y.opt.cursorborderradius,
                            "border-radius": y.opt.cursorborderradius
                        }), l.wborder = parseFloat(l.outerWidth() - l.innerWidth()), y.cursorh = l;
                        var f = e(document.createElement("div"));
                        f.attr("id", y.id + "-hr"), f.addClass("nicescroll-rails"), f.height = Math.max(parseFloat(y.opt.cursorwidth), l.outerHeight()), f.css({
                            height: f.height + "px",
                            zIndex: y.zindex,
                            background: y.opt.background
                        }), f.append(l), f.visibility = !0, f.scrollable = !0, f.align = "top" == y.opt.railvalign ? 0 : 1, y.railh = f, y.railh.drag = !1
                    }
                    if (y.ispage ? (a.css({
                            position: "fixed",
                            top: "0px",
                            height: "100%"
                        }), a.align ? a.css({
                            right: "0px"
                        }) : a.css({
                            left: "0px"
                        }), y.body.append(a), y.railh && (f.css({
                            position: "fixed",
                            left: "0px",
                            width: "100%"
                        }), f.align ? f.css({
                            bottom: "0px"
                        }) : f.css({
                            top: "0px"
                        }), y.body.append(f))) : (y.ishwscroll ? ("static" == y.win.css("position") && y.css(y.win, {
                            position: "relative"
                        }), i = "HTML" == y.win[0].nodeName ? y.body : y.win, y.zoom && (y.zoom.css({
                            position: "absolute",
                            top: 1,
                            right: 0,
                            "margin-right": a.width + 4
                        }), i.append(y.zoom)), a.css({
                            position: "absolute",
                            top: 0
                        }), a.align ? a.css({
                            right: 0
                        }) : a.css({
                            left: 0
                        }), i.append(a), f && (f.css({
                            position: "absolute",
                            left: 0,
                            bottom: 0
                        }), f.align ? f.css({
                            bottom: 0
                        }) : f.css({
                            top: 0
                        }), i.append(f))) : (y.isfixed = "fixed" == y.win.css("position"), i = y.isfixed ? "fixed" : "absolute", y.isfixed || (y.viewport = y.getViewport(y.win[0])), y.viewport && (y.body = y.viewport, 0 == /fixed|relative|absolute/.test(y.viewport.css("position")) && y.css(y.viewport, {
                            position: "relative"
                        })), a.css({
                            position: i
                        }), y.zoom && y.zoom.css({
                            position: i
                        }), y.updateScrollBar(), y.body.append(a), y.zoom && y.body.append(y.zoom), y.railh && (f.css({
                            position: i
                        }), y.body.append(f))), x.isios && y.css(y.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), x.isie && y.opt.disableoutline && y.win.attr("hideFocus", "true"), x.iswebkit && y.opt.disableoutline && y.win.css({
                            outline: "none"
                        })), !1 === y.opt.autohidemode ? (y.autohidedom = !1, y.rail.css({
                            opacity: y.opt.cursoropacitymax
                        }), y.railh && y.railh.css({
                            opacity: y.opt.cursoropacitymax
                        })) : !0 === y.opt.autohidemode || "leave" === y.opt.autohidemode ? (y.autohidedom = e().add(y.rail), x.isie8 && (y.autohidedom = y.autohidedom.add(y.cursor)), y.railh && (y.autohidedom = y.autohidedom.add(y.railh)), y.railh && x.isie8 && (y.autohidedom = y.autohidedom.add(y.cursorh))) : "scroll" == y.opt.autohidemode ? (y.autohidedom = e().add(y.rail), y.railh && (y.autohidedom = y.autohidedom.add(y.railh))) : "cursor" == y.opt.autohidemode ? (y.autohidedom = e().add(y.cursor), y.railh && (y.autohidedom = y.autohidedom.add(y.cursorh))) : "hidden" == y.opt.autohidemode && (y.autohidedom = !1, y.hide(), y.locked = !1), x.isie9mobile) y.scrollmom = new v(y), y.onmangotouch = function(e) {
                        e = y.getScrollTop();
                        var o = y.getScrollLeft();
                        if (e == y.scrollmom.lastscrolly && o == y.scrollmom.lastscrollx) return !0;
                        var t = e - y.mangotouch.sy,
                            r = o - y.mangotouch.sx;
                        if (0 != Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(t, 2)))) {
                            var i = 0 > t ? -1 : 1,
                                n = 0 > r ? -1 : 1,
                                s = +new Date;
                            y.mangotouch.lazy && clearTimeout(y.mangotouch.lazy), 80 < s - y.mangotouch.tm || y.mangotouch.dry != i || y.mangotouch.drx != n ? (y.scrollmom.stop(), y.scrollmom.reset(o, e), y.mangotouch.sy = e, y.mangotouch.ly = e, y.mangotouch.sx = o, y.mangotouch.lx = o, y.mangotouch.dry = i, y.mangotouch.drx = n, y.mangotouch.tm = s) : (y.scrollmom.stop(), y.scrollmom.update(y.mangotouch.sx - r, y.mangotouch.sy - t), y.mangotouch.tm = s, t = Math.max(Math.abs(y.mangotouch.ly - e), Math.abs(y.mangotouch.lx - o)), y.mangotouch.ly = e, y.mangotouch.lx = o, t > 2 && (y.mangotouch.lazy = setTimeout(function() {
                                y.mangotouch.lazy = !1, y.mangotouch.dry = 0, y.mangotouch.drx = 0, y.mangotouch.tm = 0, y.scrollmom.doMomentum(30)
                            }, 100)))
                        }
                    }, a = y.getScrollTop(), f = y.getScrollLeft(), y.mangotouch = {
                        sy: a,
                        ly: a,
                        dry: 0,
                        sx: f,
                        lx: f,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, y.bind(y.docscroll, "scroll", y.onmangotouch);
                    else {
                        if (x.cantouch || y.istouchcapable || y.opt.touchbehavior || x.hasmstouch) {
                            y.scrollmom = new v(y), y.ontouchstart = function(o) {
                                if (o.pointerType && 2 != o.pointerType) return !1;
                                if (!y.locked) {
                                    if (x.hasmstouch)
                                        for (var t = o.target ? o.target : !1; t;) {
                                            var r = e(t).getNiceScroll();
                                            if (0 < r.length && r[0].me == y.me) break;
                                            if (0 < r.length) return !1;
                                            if ("DIV" == t.nodeName && t.id == y.id) break;
                                            t = t.parentNode ? t.parentNode : !1
                                        }
                                    if (y.cancelScroll(), (t = y.getTarget(o)) && /INPUT/i.test(t.nodeName) && /range/i.test(t.type)) return y.stopPropagation(o);
                                    if (!("clientX" in o) && "changedTouches" in o && (o.clientX = o.changedTouches[0].clientX, o.clientY = o.changedTouches[0].clientY), y.forcescreen && (r = o, o = {
                                            original: o.original ? o.original : o
                                        }, o.clientX = r.screenX, o.clientY = r.screenY), y.rail.drag = {
                                            x: o.clientX,
                                            y: o.clientY,
                                            sx: y.scroll.x,
                                            sy: y.scroll.y,
                                            st: y.getScrollTop(),
                                            sl: y.getScrollLeft(),
                                            pt: 2,
                                            dl: !1
                                        }, y.ispage || !y.opt.directionlockdeadzone) y.rail.drag.dl = "f";
                                    else {
                                        var r = e(window).width(),
                                            i = e(window).height(),
                                            n = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                            s = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                                            i = Math.max(0, s - i),
                                            r = Math.max(0, n - r);
                                        y.rail.drag.ck = !y.rail.scrollable && y.railh.scrollable ? i > 0 ? "v" : !1 : y.rail.scrollable && !y.railh.scrollable && r > 0 ? "h" : !1, y.rail.drag.ck || (y.rail.drag.dl = "f")
                                    }
                                    if (y.opt.touchbehavior && y.isiframe && x.isie && (r = y.win.position(), y.rail.drag.x += r.left, y.rail.drag.y += r.top), y.hasmoving = !1, y.lastmouseup = !1, y.scrollmom.reset(o.clientX, o.clientY), !x.cantouch && !this.istouchcapable && !x.hasmstouch) {
                                        if (!t || !/INPUT|SELECT|TEXTAREA/i.test(t.nodeName)) return !y.ispage && x.hasmousecapture && t.setCapture(), y.opt.touchbehavior ? y.cancelEvent(o) : y.stopPropagation(o);
                                        /SUBMIT|CANCEL|BUTTON/i.test(e(t).attr("type")) && (pc = {
                                            tg: t,
                                            click: !1
                                        }, y.preventclick = pc)
                                    }
                                }
                            }, y.ontouchend = function(e) {
                                return e.pointerType && 2 != e.pointerType ? !1 : y.rail.drag && 2 == y.rail.drag.pt && (y.scrollmom.doMomentum(), y.rail.drag = !1, y.hasmoving && (y.hasmoving = !1, y.lastmouseup = !0, y.hideCursor(), x.hasmousecapture && document.releaseCapture(), !x.cantouch)) ? y.cancelEvent(e) : void 0
                            };
                            var g = y.opt.touchbehavior && y.isiframe && !x.hasmousecapture;
                            y.ontouchmove = function(o, t) {
                                if (o.pointerType && 2 != o.pointerType) return !1;
                                if (y.rail.drag && 2 == y.rail.drag.pt) {
                                    if (x.cantouch && "undefined" == typeof o.original) return !0;
                                    if (y.hasmoving = !0, y.preventclick && !y.preventclick.click && (y.preventclick.click = y.preventclick.tg.onclick || !1, y.preventclick.tg.onclick = y.onpreventclick), o = e.extend({
                                            original: o
                                        }, o), "changedTouches" in o && (o.clientX = o.changedTouches[0].clientX, o.clientY = o.changedTouches[0].clientY), y.forcescreen) {
                                        var r = o;
                                        o = {
                                            original: o.original ? o.original : o
                                        }, o.clientX = r.screenX, o.clientY = r.screenY
                                    }
                                    if (r = ofy = 0, g && !t) {
                                        var i = y.win.position(),
                                            r = -i.left;
                                        ofy = -i.top
                                    }
                                    var n = o.clientY + ofy,
                                        i = n - y.rail.drag.y,
                                        s = o.clientX + r,
                                        l = s - y.rail.drag.x,
                                        a = y.rail.drag.st - i;
                                    if (y.ishwscroll && y.opt.bouncescroll ? 0 > a ? a = Math.round(a / 2) : a > y.page.maxh && (a = y.page.maxh + Math.round((a - y.page.maxh) / 2)) : (0 > a && (n = a = 0), a > y.page.maxh && (a = y.page.maxh, n = 0)), y.railh && y.railh.scrollable) {
                                        var c = y.rail.drag.sl - l;
                                        y.ishwscroll && y.opt.bouncescroll ? 0 > c ? c = Math.round(c / 2) : c > y.page.maxw && (c = y.page.maxw + Math.round((c - y.page.maxw) / 2)) : (0 > c && (s = c = 0), c > y.page.maxw && (c = y.page.maxw, s = 0))
                                    }
                                    if (r = !1, y.rail.drag.dl) r = !0, "v" == y.rail.drag.dl ? c = y.rail.drag.sl : "h" == y.rail.drag.dl && (a = y.rail.drag.st);
                                    else {
                                        var i = Math.abs(i),
                                            l = Math.abs(l),
                                            d = y.opt.directionlockdeadzone;
                                        if ("v" == y.rail.drag.ck) {
                                            if (i > d && .3 * i >= l) return y.rail.drag = !1, !0;
                                            l > d && (y.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()))
                                        } else if ("h" == y.rail.drag.ck) {
                                            if (l > d && .3 * l >= i) return y.rail.drag = !1, !0;
                                            i > d && (y.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()))
                                        }
                                    }
                                    if (y.synched("touchmove", function() {
                                            y.rail.drag && 2 == y.rail.drag.pt && (y.prepareTransition && y.prepareTransition(0), y.rail.scrollable && y.setScrollTop(a), y.scrollmom.update(s, n), y.railh && y.railh.scrollable ? (y.setScrollLeft(c), y.showCursor(a, c)) : y.showCursor(a), x.isie10 && document.selection.clear())
                                        }), x.ischrome && y.istouchcapable && (r = !1), r) return y.cancelEvent(o)
                                }
                            }
                        }
                        if (y.onmousedown = function(e, o) {
                                if (!y.rail.drag || 1 == y.rail.drag.pt) {
                                    if (y.locked) return y.cancelEvent(e);
                                    y.cancelScroll(), y.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: y.scroll.x,
                                        sy: y.scroll.y,
                                        pt: 1,
                                        hr: !!o
                                    };
                                    var t = y.getTarget(e);
                                    return !y.ispage && x.hasmousecapture && t.setCapture(), y.isiframe && !x.hasmousecapture && (y.saved.csspointerevents = y.doc.css("pointer-events"), y.css(y.doc, {
                                        "pointer-events": "none"
                                    })), y.cancelEvent(e)
                                }
                            }, y.onmouseup = function(e) {
                                return y.rail.drag && (x.hasmousecapture && document.releaseCapture(), y.isiframe && !x.hasmousecapture && y.doc.css("pointer-events", y.saved.csspointerevents), 1 == y.rail.drag.pt) ? (y.rail.drag = !1, y.cancelEvent(e)) : void 0
                            }, y.onmousemove = function(e) {
                                if (y.rail.drag && 1 == y.rail.drag.pt) {
                                    if (x.ischrome && 0 == e.which) return y.onmouseup(e);
                                    if (y.cursorfreezed = !0, y.rail.drag.hr) {
                                        y.scroll.x = y.rail.drag.sx + (e.clientX - y.rail.drag.x), 0 > y.scroll.x && (y.scroll.x = 0);
                                        var o = y.scrollvaluemaxw;
                                        y.scroll.x > o && (y.scroll.x = o)
                                    } else y.scroll.y = y.rail.drag.sy + (e.clientY - y.rail.drag.y), 0 > y.scroll.y && (y.scroll.y = 0), o = y.scrollvaluemax, y.scroll.y > o && (y.scroll.y = o);
                                    return y.synched("mousemove", function() {
                                        y.rail.drag && 1 == y.rail.drag.pt && (y.showCursor(), y.rail.drag.hr ? y.doScrollLeft(Math.round(y.scroll.x * y.scrollratio.x), y.opt.cursordragspeed) : y.doScrollTop(Math.round(y.scroll.y * y.scrollratio.y), y.opt.cursordragspeed))
                                    }), y.cancelEvent(e)
                                }
                            }, x.cantouch || y.opt.touchbehavior) y.onpreventclick = function(e) {
                            return y.preventclick ? (y.preventclick.tg.onclick = y.preventclick.click, y.preventclick = !1, y.cancelEvent(e)) : void 0
                        }, y.bind(y.win, "mousedown", y.ontouchstart), y.onclick = x.isios ? !1 : function(e) {
                            return y.lastmouseup ? (y.lastmouseup = !1, y.cancelEvent(e)) : !0
                        }, y.opt.grabcursorenabled && x.cursorgrabvalue && (y.css(y.ispage ? y.doc : y.win, {
                            cursor: x.cursorgrabvalue
                        }), y.css(y.rail, {
                            cursor: x.cursorgrabvalue
                        }));
                        else {
                            var w = function(e) {
                                if (y.selectiondrag) {
                                    if (e) {
                                        var o = y.win.outerHeight();
                                        e = e.pageY - y.selectiondrag.top, e > 0 && o > e && (e = 0), e >= o && (e -= o), y.selectiondrag.df = e
                                    }
                                    0 != y.selectiondrag.df && (y.doScrollBy(2 * -Math.floor(y.selectiondrag.df / 6)), y.debounced("doselectionscroll", function() {
                                        w()
                                    }, 50))
                                }
                            };
                            y.hasTextSelected = "getSelection" in document ? function() {
                                return 0 < document.getSelection().rangeCount
                            } : "selection" in document ? function() {
                                return "None" != document.selection.type
                            } : function() {
                                return !1
                            }, y.onselectionstart = function(e) {
                                y.ispage || (y.selectiondrag = y.win.offset())
                            }, y.onselectionend = function(e) {
                                y.selectiondrag = !1
                            }, y.onselectiondrag = function(e) {
                                y.selectiondrag && y.hasTextSelected() && y.debounced("selectionscroll", function() {
                                    w(e)
                                }, 250)
                            }
                        }
                        x.hasmstouch && (y.css(y.rail, {
                            "-ms-touch-action": "none"
                        }), y.css(y.cursor, {
                            "-ms-touch-action": "none"
                        }), y.bind(y.win, "MSPointerDown", y.ontouchstart), y.bind(document, "MSPointerUp", y.ontouchend), y.bind(document, "MSPointerMove", y.ontouchmove), y.bind(y.cursor, "MSGestureHold", function(e) {
                            e.preventDefault()
                        }), y.bind(y.cursor, "contextmenu", function(e) {
                            e.preventDefault()
                        })), this.istouchcapable && (y.bind(y.win, "touchstart", y.ontouchstart), y.bind(document, "touchend", y.ontouchend), y.bind(document, "touchcancel", y.ontouchend), y.bind(document, "touchmove", y.ontouchmove)), y.bind(y.cursor, "mousedown", y.onmousedown), y.bind(y.cursor, "mouseup", y.onmouseup), y.railh && (y.bind(y.cursorh, "mousedown", function(e) {
                            y.onmousedown(e, !0)
                        }), y.bind(y.cursorh, "mouseup", function(e) {
                            return y.rail.drag && 2 == y.rail.drag.pt ? void 0 : (y.rail.drag = !1, y.hasmoving = !1, y.hideCursor(), x.hasmousecapture && document.releaseCapture(), y.cancelEvent(e))
                        })), (y.opt.cursordragontouch || !x.cantouch && !y.opt.touchbehavior) && (y.rail.css({
                            cursor: "default"
                        }), y.railh && y.railh.css({
                            cursor: "default"
                        }), y.jqbind(y.rail, "mouseenter", function() {
                            y.canshowonmouseevent && y.showCursor(), y.rail.active = !0
                        }), y.jqbind(y.rail, "mouseleave", function() {
                            y.rail.active = !1, y.rail.drag || y.hideCursor()
                        }), y.opt.sensitiverail && (y.bind(y.rail, "click", function(e) {
                            y.doRailClick(e, !1, !1)
                        }), y.bind(y.rail, "dblclick", function(e) {
                            y.doRailClick(e, !0, !1)
                        }), y.bind(y.cursor, "click", function(e) {
                            y.cancelEvent(e)
                        }), y.bind(y.cursor, "dblclick", function(e) {
                            y.cancelEvent(e)
                        })), y.railh && (y.jqbind(y.railh, "mouseenter", function() {
                            y.canshowonmouseevent && y.showCursor(), y.rail.active = !0
                        }), y.jqbind(y.railh, "mouseleave", function() {
                            y.rail.active = !1, y.rail.drag || y.hideCursor()
                        }), y.opt.sensitiverail && (y.bind(y.railh, "click", function(e) {
                            y.doRailClick(e, !1, !0)
                        }), y.bind(y.railh, "dblclick", function(e) {
                            y.doRailClick(e, !0, !0)
                        }), y.bind(y.cursorh, "click", function(e) {
                            y.cancelEvent(e)
                        }), y.bind(y.cursorh, "dblclick", function(e) {
                            y.cancelEvent(e)
                        })))), x.cantouch || y.opt.touchbehavior ? (y.bind(x.hasmousecapture ? y.win : document, "mouseup", y.ontouchend), y.bind(document, "mousemove", y.ontouchmove), y.onclick && y.bind(document, "click", y.onclick), y.opt.cursordragontouch && (y.bind(y.cursor, "mousedown", y.onmousedown), y.bind(y.cursor, "mousemove", y.onmousemove), y.cursorh && y.bind(y.cursorh, "mousedown", function(e) {
                            y.onmousedown(e, !0)
                        }), y.cursorh && y.bind(y.cursorh, "mousemove", y.onmousemove))) : (y.bind(x.hasmousecapture ? y.win : document, "mouseup", y.onmouseup), y.bind(document, "mousemove", y.onmousemove), y.onclick && y.bind(document, "click", y.onclick), !y.ispage && y.opt.enablescrollonselection && (y.bind(y.win[0], "mousedown", y.onselectionstart), y.bind(document, "mouseup", y.onselectionend), y.bind(y.cursor, "mouseup", y.onselectionend), y.cursorh && y.bind(y.cursorh, "mouseup", y.onselectionend), y.bind(document, "mousemove", y.onselectiondrag)), y.zoom && (y.jqbind(y.zoom, "mouseenter", function() {
                            y.canshowonmouseevent && y.showCursor(), y.rail.active = !0
                        }), y.jqbind(y.zoom, "mouseleave", function() {
                            y.rail.active = !1, y.rail.drag || y.hideCursor()
                        }))), y.opt.enablemousewheel && (y.isiframe || y.bind(x.isie && y.ispage ? document : y.win, "mousewheel", y.onmousewheel), y.bind(y.rail, "mousewheel", y.onmousewheel), y.railh && y.bind(y.railh, "mousewheel", y.onmousewheelhr)), !y.ispage && !x.cantouch && !/HTML|BODY/.test(y.win[0].nodeName) && (y.win.attr("tabindex") || y.win.attr({
                            tabindex: r++
                        }), y.jqbind(y.win, "focus", function(e) {
                            o = y.getTarget(e).id || !0, y.hasfocus = !0, y.canshowonmouseevent && y.noticeCursor()
                        }), y.jqbind(y.win, "blur", function(e) {
                            o = !1, y.hasfocus = !1
                        }), y.jqbind(y.win, "mouseenter", function(e) {
                            t = y.getTarget(e).id || !0, y.hasmousefocus = !0, y.canshowonmouseevent && y.noticeCursor()
                        }), y.jqbind(y.win, "mouseleave", function() {
                            t = !1, y.hasmousefocus = !1, y.rail.drag || y.hideCursor()
                        }))
                    }
                    if (y.onkeypress = function(e) {
                            if (y.locked && 0 == y.page.maxh) return !0;
                            e = e ? e : window.e;
                            var r = y.getTarget(e);
                            if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!r.getAttribute("type") && !r.type || !/submit|button|cancel/i.tp)) return !0;
                            if (y.hasfocus || y.hasmousefocus && !o || y.ispage && !o && !t) {
                                if (r = e.keyCode, y.locked && 27 != r) return y.cancelEvent(e);
                                var i = e.ctrlKey || !1,
                                    n = e.shiftKey || !1,
                                    s = !1;
                                switch (r) {
                                    case 38:
                                    case 63233:
                                        y.doScrollBy(72), s = !0;
                                        break;
                                    case 40:
                                    case 63235:
                                        y.doScrollBy(-72), s = !0;
                                        break;
                                    case 37:
                                    case 63232:
                                        y.railh && (i ? y.doScrollLeft(0) : y.doScrollLeftBy(72), s = !0);
                                        break;
                                    case 39:
                                    case 63234:
                                        y.railh && (i ? y.doScrollLeft(y.page.maxw) : y.doScrollLeftBy(-72), s = !0);
                                        break;
                                    case 33:
                                    case 63276:
                                        y.doScrollBy(y.view.h), s = !0;
                                        break;
                                    case 34:
                                    case 63277:
                                        y.doScrollBy(-y.view.h), s = !0;
                                        break;
                                    case 36:
                                    case 63273:
                                        y.railh && i ? y.doScrollPos(0, 0) : y.doScrollTo(0), s = !0;
                                        break;
                                    case 35:
                                    case 63275:
                                        y.railh && i ? y.doScrollPos(y.page.maxw, y.page.maxh) : y.doScrollTo(y.page.maxh), s = !0;
                                        break;
                                    case 32:
                                        y.opt.spacebarenabled && (n ? y.doScrollBy(y.view.h) : y.doScrollBy(-y.view.h), s = !0);
                                        break;
                                    case 27:
                                        y.zoomactive && (y.doZoom(), s = !0)
                                }
                                if (s) return y.cancelEvent(e)
                            }
                        }, y.opt.enablekeyboard && y.bind(document, x.isopera && !x.isopera12 ? "keypress" : "keydown", y.onkeypress), y.bind(window, "resize", y.lazyResize), y.bind(window, "orientationchange", y.lazyResize), y.bind(window, "load", y.lazyResize), x.ischrome && !y.ispage && !y.haswrapper) {
                        var b = y.win.attr("style"),
                            a = parseFloat(y.win.css("width")) + 1;
                        y.win.css("width", a), y.synched("chromefix", function() {
                            y.win.attr("style", b)
                        })
                    }
                    y.onAttributeChange = function(e) {
                        y.lazyResize(250)
                    }, !y.ispage && !y.haswrapper && (!1 !== p ? (y.observer = new p(function(e) {
                        e.forEach(y.onAttributeChange)
                    }), y.observer.observe(y.win[0], {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }), y.observerremover = new p(function(e) {
                        e.forEach(function(e) {
                            if (0 < e.removedNodes.length)
                                for (var o in e.removedNodes)
                                    if (e.removedNodes[o] == y.win[0]) return y.remove()
                        })
                    }), y.observerremover.observe(y.win[0].parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (y.bind(y.win, x.isie && !x.isie9 ? "propertychange" : "DOMAttrModified", y.onAttributeChange), x.isie9 && y.win[0].attachEvent("onpropertychange", y.onAttributeChange),
                        y.bind(y.win, "DOMNodeRemoved", function(e) {
                            e.target == y.win[0] && y.remove()
                        }))), !y.ispage && y.opt.boxzoom && y.bind(window, "resize", y.resizeZoom), y.istextarea && y.bind(y.win, "mouseup", y.lazyResize), y.checkrtlmode = !0, y.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var S = function(o) {
                        y.iframexd = !1;
                        try {
                            var t = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                        } catch (r) {
                            y.iframexd = !0, t = !1
                        }
                        return y.iframexd ? ("console" in window && console.log("NiceScroll error: policy restriced iframe"), !0) : (y.forcescreen = !0, y.isiframe && (y.iframe = {
                            doc: e(t),
                            html: y.doc.contents().find("html")[0],
                            body: y.doc.contents().find("body")[0]
                        }, y.getContentSize = function() {
                            return {
                                w: Math.max(y.iframe.html.scrollWidth, y.iframe.body.scrollWidth),
                                h: Math.max(y.iframe.html.scrollHeight, y.iframe.body.scrollHeight)
                            }
                        }, y.docscroll = e(y.iframe.body)), !x.isios && y.opt.iframeautoresize && !y.isiframe && (y.win.scrollTop(0), y.doc.height(""), o = Math.max(t.getElementsByTagName("html")[0].scrollHeight, t.body.scrollHeight), y.doc.height(o)), y.lazyResize(30), x.isie7 && y.css(e(y.iframe.html), {
                            "overflow-y": "hidden"
                        }), y.css(e(y.iframe.body), {
                            "overflow-y": "hidden"
                        }), x.isios && y.haswrapper && y.css(e(t.body), {
                            "-webkit-transform": "translate3d(0,0,0)"
                        }), "contentWindow" in this ? y.bind(this.contentWindow, "scroll", y.onscroll) : y.bind(t, "scroll", y.onscroll), y.opt.enablemousewheel && y.bind(t, "mousewheel", y.onmousewheel), y.opt.enablekeyboard && y.bind(t, x.isopera ? "keypress" : "keydown", y.onkeypress), (x.cantouch || y.opt.touchbehavior) && (y.bind(t, "mousedown", y.ontouchstart), y.bind(t, "mousemove", function(e) {
                            y.ontouchmove(e, !0)
                        }), y.opt.grabcursorenabled && x.cursorgrabvalue && y.css(e(t.body), {
                            cursor: x.cursorgrabvalue
                        })), y.bind(t, "mouseup", y.ontouchend), void(y.zoom && (y.opt.dblclickzoom && y.bind(t, "dblclick", y.doZoom), y.ongesturezoom && y.bind(t, "gestureend", y.ongesturezoom))))
                    };
                    this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                        S.call(y.doc[0], !1)
                    }, 500), y.bind(this.doc, "load", S)
                }
            }, this.showCursor = function(e, o) {
                y.cursortimeout && (clearTimeout(y.cursortimeout), y.cursortimeout = 0), y.rail && (y.autohidedom && (y.autohidedom.stop().css({
                    opacity: y.opt.cursoropacitymax
                }), y.cursoractive = !0), y.rail.drag && 1 == y.rail.drag.pt || ("undefined" != typeof e && !1 !== e && (y.scroll.y = Math.round(1 * e / y.scrollratio.y)), "undefined" != typeof o && (y.scroll.x = Math.round(1 * o / y.scrollratio.x))), y.cursor.css({
                    height: y.cursorheight,
                    top: y.scroll.y
                }), y.cursorh && (!y.rail.align && y.rail.visibility ? y.cursorh.css({
                    width: y.cursorwidth,
                    left: y.scroll.x + y.rail.width
                }) : y.cursorh.css({
                    width: y.cursorwidth,
                    left: y.scroll.x
                }), y.cursoractive = !0), y.zoom && y.zoom.stop().css({
                    opacity: y.opt.cursoropacitymax
                }))
            }, this.hideCursor = function(e) {
                !y.cursortimeout && y.rail && y.autohidedom && !(y.hasmousefocus && "leave" == y.opt.autohidemode) && (y.cursortimeout = setTimeout(function() {
                    y.rail.active && y.showonmouseevent || (y.autohidedom.stop().animate({
                        opacity: y.opt.cursoropacitymin
                    }), y.zoom && y.zoom.stop().animate({
                        opacity: y.opt.cursoropacitymin
                    }), y.cursoractive = !1), y.cursortimeout = 0
                }, e || y.opt.hidecursordelay))
            }, this.noticeCursor = function(e, o, t) {
                y.showCursor(o, t), y.rail.active || y.hideCursor(e)
            }, this.getContentSize = y.ispage ? function() {
                return {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
            } : y.haswrapper ? function() {
                return {
                    w: y.doc.outerWidth() + parseInt(y.win.css("paddingLeft")) + parseInt(y.win.css("paddingRight")),
                    h: y.doc.outerHeight() + parseInt(y.win.css("paddingTop")) + parseInt(y.win.css("paddingBottom"))
                }
            } : function() {
                return {
                    w: y.docscroll[0].scrollWidth,
                    h: y.docscroll[0].scrollHeight
                }
            }, this.onResize = function(e, o) {
                if (!y.win) return !1;
                if (!y.haswrapper && !y.ispage) {
                    if ("none" == y.win.css("display")) return y.visibility && y.hideRail().hideRailHr(), !1;
                    !y.hidden && !y.visibility && y.showRail().showRailHr()
                }
                var t = y.page.maxh,
                    r = y.page.maxw,
                    i = y.view.w;
                if (y.view = {
                        w: y.ispage ? y.win.width() : parseInt(y.win[0].clientWidth),
                        h: y.ispage ? y.win.height() : parseInt(y.win[0].clientHeight)
                    }, y.page = o ? o : y.getContentSize(), y.page.maxh = Math.max(0, y.page.h - y.view.h), y.page.maxw = Math.max(0, y.page.w - y.view.w), y.page.maxh == t && y.page.maxw == r && y.view.w == i) {
                    if (y.ispage) return y;
                    if (t = y.win.offset(), y.lastposition && (r = y.lastposition, r.top == t.top && r.left == t.left)) return y;
                    y.lastposition = t
                }
                return 0 == y.page.maxh ? (y.hideRail(), y.scrollvaluemax = 0, y.scroll.y = 0, y.scrollratio.y = 0, y.cursorheight = 0, y.setScrollTop(0), y.rail.scrollable = !1) : y.rail.scrollable = !0, 0 == y.page.maxw ? (y.hideRailHr(), y.scrollvaluemaxw = 0, y.scroll.x = 0, y.scrollratio.x = 0, y.cursorwidth = 0, y.setScrollLeft(0), y.railh.scrollable = !1) : y.railh.scrollable = !0, y.locked = 0 == y.page.maxh && 0 == y.page.maxw, y.locked ? (y.ispage || y.updateScrollBar(y.view), !1) : (y.hidden || y.visibility ? !y.hidden && !y.railh.visibility && y.showRailHr() : y.showRail().showRailHr(), y.istextarea && y.win.css("resize") && "none" != y.win.css("resize") && (y.view.h -= 20), y.cursorheight = Math.min(y.view.h, Math.round(y.view.h * (y.view.h / y.page.h))), y.cursorheight = y.opt.cursorfixedheight ? y.opt.cursorfixedheight : Math.max(y.opt.cursorminheight, y.cursorheight), y.cursorwidth = Math.min(y.view.w, Math.round(y.view.w * (y.view.w / y.page.w))), y.cursorwidth = y.opt.cursorfixedheight ? y.opt.cursorfixedheight : Math.max(y.opt.cursorminheight, y.cursorwidth), y.scrollvaluemax = y.view.h - y.cursorheight - y.cursor.hborder, y.railh && (y.railh.width = 0 < y.page.maxh ? y.view.w - y.rail.width : y.view.w, y.scrollvaluemaxw = y.railh.width - y.cursorwidth - y.cursorh.wborder), y.checkrtlmode && y.railh && (y.checkrtlmode = !1, y.opt.rtlmode && 0 == y.scroll.x && y.setScrollLeft(y.page.maxw)), y.ispage || y.updateScrollBar(y.view), y.scrollratio = {
                    x: y.page.maxw / y.scrollvaluemaxw,
                    y: y.page.maxh / y.scrollvaluemax
                }, y.getScrollTop() > y.page.maxh ? y.doScrollTop(y.page.maxh) : (y.scroll.y = Math.round(y.getScrollTop() * (1 / y.scrollratio.y)), y.scroll.x = Math.round(y.getScrollLeft() * (1 / y.scrollratio.x)), y.cursoractive && y.noticeCursor()), y.scroll.y && 0 == y.getScrollTop() && y.doScrollTo(Math.floor(y.scroll.y * y.scrollratio.y)), y)
            }, this.resize = y.onResize, this.lazyResize = function(e) {
                return e = isNaN(e) ? 30 : e, y.delayed("resize", y.resize, e), y
            }, this._bind = function(e, o, t, r) {
                y.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: r,
                    q: !1
                }), e.addEventListener ? e.addEventListener(o, t, r || !1) : e.attachEvent ? e.attachEvent("on" + o, t) : e["on" + o] = t
            }, this.jqbind = function(o, t, r) {
                y.events.push({
                    e: o,
                    n: t,
                    f: r,
                    q: !0
                }), e(o).bind(t, r)
            }, this.bind = function(e, o, t, r) {
                var i = "jquery" in e ? e[0] : e;
                "mousewheel" == o ? "onwheel" in y.win ? y._bind(i, "wheel", t, r || !1) : (e = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", f(i, e, t, r || !1), "DOMMouseScroll" == e && f(i, "MozMousePixelScroll", t, r || !1)) : i.addEventListener ? (x.cantouch && /mouseup|mousedown|mousemove/.test(o) && y._bind(i, "mousedown" == o ? "touchstart" : "mouseup" == o ? "touchend" : "touchmove", function(e) {
                    if (e.touches) {
                        if (2 > e.touches.length) {
                            var o = e.touches.length ? e.touches[0] : e;
                            o.original = e, t.call(this, o)
                        }
                    } else e.changedTouches && (o = e.changedTouches[0], o.original = e, t.call(this, o))
                }, r || !1), y._bind(i, o, t, r || !1), x.cantouch && "mouseup" == o && y._bind(i, "touchcancel", t, r || !1)) : y._bind(i, o, function(e) {
                    return (e = e || window.event || !1) && e.srcElement && (e.target = e.srcElement), "pageY" in e || (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop), !1 === t.call(i, e) || !1 === r ? y.cancelEvent(e) : !0
                })
            }, this._unbind = function(e, o, t, r) {
                e.removeEventListener ? e.removeEventListener(o, t, r) : e.detachEvent ? e.detachEvent("on" + o, t) : e["on" + o] = !1
            }, this.unbindAll = function() {
                for (var e = 0; e < y.events.length; e++) {
                    var o = y.events[e];
                    o.q ? o.e.unbind(o.n, o.f) : y._unbind(o.e, o.n, o.f, o.b)
                }
            }, this.cancelEvent = function(e) {
                return (e = e.original ? e.original : e ? e : window.event || !1) ? (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.preventManipulation && e.preventManipulation(), e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1) : !1
            }, this.stopPropagation = function(e) {
                return (e = e.original ? e.original : e ? e : window.event || !1) ? e.stopPropagation ? e.stopPropagation() : (e.cancelBubble && (e.cancelBubble = !0), !1) : !1
            }, this.showRail = function() {
                return 0 == y.page.maxh || !y.ispage && "none" == y.win.css("display") || (y.visibility = !0, y.rail.visibility = !0, y.rail.css("display", "block")), y
            }, this.showRailHr = function() {
                return y.railh ? (0 == y.page.maxw || !y.ispage && "none" == y.win.css("display") || (y.railh.visibility = !0, y.railh.css("display", "block")), y) : y
            }, this.hideRail = function() {
                return y.visibility = !1, y.rail.visibility = !1, y.rail.css("display", "none"), y
            }, this.hideRailHr = function() {
                return y.railh ? (y.railh.visibility = !1, y.railh.css("display", "none"), y) : y
            }, this.show = function() {
                return y.hidden = !1, y.locked = !1, y.showRail().showRailHr()
            }, this.hide = function() {
                return y.hidden = !0, y.locked = !0, y.hideRail().hideRailHr()
            }, this.toggle = function() {
                return y.hidden ? y.show() : y.hide()
            }, this.remove = function() {
                y.stop(), y.cursortimeout && clearTimeout(y.cursortimeout), y.doZoomOut(), y.unbindAll(), x.isie9 && y.win[0].detachEvent("onpropertychange", y.onAttributeChange), !1 !== y.observer && y.observer.disconnect(), !1 !== y.observerremover && y.observerremover.disconnect(), y.events = null, y.cursor && y.cursor.remove(), y.cursorh && y.cursorh.remove(), y.rail && y.rail.remove(), y.railh && y.railh.remove(), y.zoom && y.zoom.remove();
                for (var o = 0; o < y.saved.css.length; o++) {
                    var t = y.saved.css[o];
                    t[0].css(t[1], "undefined" == typeof t[2] ? "" : t[2])
                }
                y.saved = !1, y.me.data("__nicescroll", "");
                var r = e.nicescroll;
                r.each(function(e) {
                    if (this && this.id === y.id) {
                        delete r[e];
                        for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
                        r.length--, r.length && delete r[r.length]
                    }
                });
                for (var i in y) y[i] = null, delete y[i];
                y = null
            }, this.scrollstart = function(e) {
                return this.onscrollstart = e, y
            }, this.scrollend = function(e) {
                return this.onscrollend = e, y
            }, this.scrollcancel = function(e) {
                return this.onscrollcancel = e, y
            }, this.zoomin = function(e) {
                return this.onzoomin = e, y
            }, this.zoomout = function(e) {
                return this.onzoomout = e, y
            }, this.isScrollable = function(o) {
                if (o = o.target ? o.target : o, "OPTION" == o.nodeName) return !0;
                for (; o && 1 == o.nodeType && !/BODY|HTML/.test(o.nodeName);) {
                    var t = e(o),
                        t = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(t)) return o.clientHeight != o.scrollHeight;
                    o = o.parentNode ? o.parentNode : !1
                }
                return !1
            }, this.getViewport = function(o) {
                for (o = o && o.parentNode ? o.parentNode : !1; o && 1 == o.nodeType && !/BODY|HTML/.test(o.nodeName);) {
                    var t = e(o);
                    if (/fixed|absolute/.test(t.css("position"))) return t;
                    var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight || 0 < t.getNiceScroll().length) return t;
                    o = o.parentNode ? o.parentNode : !1
                }
                return !1
            }, this.onmousewheel = function(e) {
                if (y.locked) return y.debounced("checkunlock", y.resize, 250), !0;
                if (y.rail.drag) return y.cancelEvent(e);
                if ("auto" == y.opt.oneaxismousemode && 0 != e.deltaX && (y.opt.oneaxismousemode = !1), y.opt.oneaxismousemode && 0 == e.deltaX && !y.rail.scrollable) return y.railh && y.railh.scrollable ? y.onmousewheelhr(e) : !0;
                var o = +new Date,
                    t = !1;
                return y.opt.preservenativescrolling && y.checkarea + 600 < o && (y.nativescrollingarea = y.isScrollable(e), t = !0), y.checkarea = o, y.nativescrollingarea ? !0 : ((e = w(e, !1, t)) && (y.checkarea = 0), e)
            }, this.onmousewheelhr = function(e) {
                if (y.locked || !y.railh.scrollable) return !0;
                if (y.rail.drag) return y.cancelEvent(e);
                var o = +new Date,
                    t = !1;
                return y.opt.preservenativescrolling && y.checkarea + 600 < o && (y.nativescrollingarea = y.isScrollable(e), t = !0), y.checkarea = o, y.nativescrollingarea ? !0 : y.locked ? y.cancelEvent(e) : w(e, !0, t)
            }, this.stop = function() {
                return y.cancelScroll(), y.scrollmon && y.scrollmon.stop(), y.cursorfreezed = !1, y.scroll.y = Math.round(y.getScrollTop() * (1 / y.scrollratio.y)), y.noticeCursor(), y
            }, this.getTransitionSpeed = function(e) {
                var o = Math.round(10 * y.opt.scrollspeed);
                return e = Math.min(o, Math.round(e / 20 * y.opt.scrollspeed)), e > 20 ? e : 0
            }, y.opt.smoothscroll ? y.ishwscroll && x.hastransition && y.opt.usetransition ? (this.prepareTransition = function(e, o) {
                var t = o ? e > 20 ? e : 0 : y.getTransitionSpeed(e),
                    r = t ? x.prefixstyle + "transform " + t + "ms ease-out" : "";
                return y.lasttransitionstyle && y.lasttransitionstyle == r || (y.lasttransitionstyle = r, y.doc.css(x.transitionstyle, r)), t
            }, this.doScrollLeft = function(e, o) {
                var t = y.scrollrunning ? y.newscrolly : y.getScrollTop();
                y.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = y.scrollrunning ? y.newscrollx : y.getScrollLeft();
                y.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = y.getScrollTop(),
                    i = y.getScrollLeft();
                return (0 > (y.newscrolly - r) * (o - r) || 0 > (y.newscrollx - i) * (e - i)) && y.cancelScroll(), 0 == y.opt.bouncescroll && (0 > o ? o = 0 : o > y.page.maxh && (o = y.page.maxh), 0 > e ? e = 0 : e > y.page.maxw && (e = y.page.maxw)), y.scrollrunning && e == y.newscrollx && o == y.newscrolly ? !1 : (y.newscrolly = o, y.newscrollx = e, y.newscrollspeed = t || !1, y.timer ? !1 : void(y.timer = setTimeout(function() {
                    var t, r, i = y.getScrollTop(),
                        n = y.getScrollLeft();
                    t = e - n, r = o - i, t = Math.round(Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2))), t = y.newscrollspeed && 1 < y.newscrollspeed ? y.newscrollspeed : y.getTransitionSpeed(t), y.newscrollspeed && 1 >= y.newscrollspeed && (t *= y.newscrollspeed), y.prepareTransition(t, !0), y.timerscroll && y.timerscroll.tm && clearInterval(y.timerscroll.tm), t > 0 && (!y.scrollrunning && y.onscrollstart && y.onscrollstart.call(y, {
                        type: "scrollstart",
                        current: {
                            x: n,
                            y: i
                        },
                        request: {
                            x: e,
                            y: o
                        },
                        end: {
                            x: y.newscrollx,
                            y: y.newscrolly
                        },
                        speed: t
                    }), x.transitionend ? y.scrollendtrapped || (y.scrollendtrapped = !0, y.bind(y.doc, x.transitionend, y.onScrollEnd, !1)) : (y.scrollendtrapped && clearTimeout(y.scrollendtrapped), y.scrollendtrapped = setTimeout(y.onScrollEnd, t)), y.timerscroll = {
                        bz: new BezierClass(i, y.newscrolly, t, 0, 0, .58, 1),
                        bh: new BezierClass(n, y.newscrollx, t, 0, 0, .58, 1)
                    }, y.cursorfreezed || (y.timerscroll.tm = setInterval(function() {
                        y.showCursor(y.getScrollTop(), y.getScrollLeft())
                    }, 60))), y.synched("doScroll-set", function() {
                        y.timer = 0, y.scrollendtrapped && (y.scrollrunning = !0), y.setScrollTop(y.newscrolly), y.setScrollLeft(y.newscrollx), y.scrollendtrapped || y.onScrollEnd()
                    })
                }, 50)))
            }, this.cancelScroll = function() {
                if (!y.scrollendtrapped) return !0;
                var e = y.getScrollTop(),
                    o = y.getScrollLeft();
                return y.scrollrunning = !1, x.transitionend || clearTimeout(x.transitionend), y.scrollendtrapped = !1, y._unbind(y.doc, x.transitionend, y.onScrollEnd), y.prepareTransition(0), y.setScrollTop(e), y.railh && y.setScrollLeft(o), y.timerscroll && y.timerscroll.tm && clearInterval(y.timerscroll.tm), y.timerscroll = !1, y.cursorfreezed = !1, y.showCursor(e, o), y
            }, this.onScrollEnd = function() {
                y.scrollendtrapped && y._unbind(y.doc, x.transitionend, y.onScrollEnd), y.scrollendtrapped = !1, y.prepareTransition(0), y.timerscroll && y.timerscroll.tm && clearInterval(y.timerscroll.tm), y.timerscroll = !1;
                var e = y.getScrollTop(),
                    o = y.getScrollLeft();
                return y.setScrollTop(e), y.railh && y.setScrollLeft(o), y.noticeCursor(!1, e, o), y.cursorfreezed = !1, 0 > e ? e = 0 : e > y.page.maxh && (e = y.page.maxh), 0 > o ? o = 0 : o > y.page.maxw && (o = y.page.maxw), e != y.newscrolly || o != y.newscrollx ? y.doScrollPos(o, e, y.opt.snapbackspeed) : (y.onscrollend && y.scrollrunning && y.onscrollend.call(y, {
                    type: "scrollend",
                    current: {
                        x: o,
                        y: e
                    },
                    end: {
                        x: y.newscrollx,
                        y: y.newscrolly
                    }
                }), void(y.scrollrunning = !1))
            }) : (this.doScrollLeft = function(e, o) {
                var t = y.scrollrunning ? y.newscrolly : y.getScrollTop();
                y.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = y.scrollrunning ? y.newscrollx : y.getScrollLeft();
                y.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                function r() {
                    if (y.cancelAnimationFrame) return !0;
                    if (y.scrollrunning = !0, u = 1 - u) return y.timer = c(r) || 1;
                    var e = 0,
                        o = sy = y.getScrollTop();
                    if (y.dst.ay) {
                        var o = y.bzscroll ? y.dst.py + y.bzscroll.getNow() * y.dst.ay : y.newscrolly,
                            t = o - sy;
                        (0 > t && o < y.newscrolly || t > 0 && o > y.newscrolly) && (o = y.newscrolly), y.setScrollTop(o), o == y.newscrolly && (e = 1)
                    } else e = 1;
                    var i = sx = y.getScrollLeft();
                    y.dst.ax ? (i = y.bzscroll ? y.dst.px + y.bzscroll.getNow() * y.dst.ax : y.newscrollx, t = i - sx, (0 > t && i < y.newscrollx || t > 0 && i > y.newscrollx) && (i = y.newscrollx), y.setScrollLeft(i), i == y.newscrollx && (e += 1)) : e += 1, 2 == e ? (y.timer = 0, y.cursorfreezed = !1, y.bzscroll = !1, y.scrollrunning = !1, 0 > o ? o = 0 : o > y.page.maxh && (o = y.page.maxh), 0 > i ? i = 0 : i > y.page.maxw && (i = y.page.maxw), i != y.newscrollx || o != y.newscrolly ? y.doScrollPos(i, o) : y.onscrollend && y.onscrollend.call(y, {
                        type: "scrollend",
                        current: {
                            x: sx,
                            y: sy
                        },
                        end: {
                            x: y.newscrollx,
                            y: y.newscrolly
                        }
                    })) : y.timer = c(r) || 1
                }
                if (o = "undefined" == typeof o || !1 === o ? y.getScrollTop(!0) : o, y.timer && y.newscrolly == o && y.newscrollx == e) return !0;
                y.timer && d(y.timer), y.timer = 0;
                var i = y.getScrollTop(),
                    n = y.getScrollLeft();
                (0 > (y.newscrolly - i) * (o - i) || 0 > (y.newscrollx - n) * (e - n)) && y.cancelScroll(), y.newscrolly = o, y.newscrollx = e, y.bouncescroll && y.rail.visibility || (0 > y.newscrolly ? y.newscrolly = 0 : y.newscrolly > y.page.maxh && (y.newscrolly = y.page.maxh)), y.bouncescroll && y.railh.visibility || (0 > y.newscrollx ? y.newscrollx = 0 : y.newscrollx > y.page.maxw && (y.newscrollx = y.page.maxw)), y.dst = {}, y.dst.x = e - n, y.dst.y = o - i, y.dst.px = n, y.dst.py = i;
                var s = Math.round(Math.sqrt(Math.pow(y.dst.x, 2) + Math.pow(y.dst.y, 2)));
                y.dst.ax = y.dst.x / s, y.dst.ay = y.dst.y / s;
                var l = 0,
                    a = s;
                if (0 == y.dst.x ? (l = i, a = o, y.dst.ay = 1, y.dst.py = 0) : 0 == y.dst.y && (l = n, a = e, y.dst.ax = 1, y.dst.px = 0), s = y.getTransitionSpeed(s), t && 1 >= t && (s *= t), y.bzscroll = s > 0 ? y.bzscroll ? y.bzscroll.update(a, s) : new BezierClass(l, a, s, 0, 1, 0, 1) : !1, !y.timer) {
                    (i == y.page.maxh && o >= y.page.maxh || n == y.page.maxw && e >= y.page.maxw) && y.checkContentSize();
                    var u = 1;
                    y.cancelAnimationFrame = !1, y.timer = 1, y.onscrollstart && !y.scrollrunning && y.onscrollstart.call(y, {
                        type: "scrollstart",
                        current: {
                            x: n,
                            y: i
                        },
                        request: {
                            x: e,
                            y: o
                        },
                        end: {
                            x: y.newscrollx,
                            y: y.newscrolly
                        },
                        speed: s
                    }), r(), (i == y.page.maxh && o >= i || n == y.page.maxw && e >= n) && y.checkContentSize(), y.noticeCursor()
                }
            }, this.cancelScroll = function() {
                return y.timer && d(y.timer), y.timer = 0, y.bzscroll = !1, y.scrollrunning = !1, y
            }) : (this.doScrollLeft = function(e, o) {
                var t = y.getScrollTop();
                y.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = y.getScrollLeft();
                y.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = e > y.page.maxw ? y.page.maxw : e;
                0 > r && (r = 0);
                var i = o > y.page.maxh ? y.page.maxh : o;
                0 > i && (i = 0), y.synched("scroll", function() {
                    y.setScrollTop(i), y.setScrollLeft(r)
                })
            }, this.cancelScroll = function() {}), this.doScrollBy = function(e, o) {
                var t = 0,
                    t = o ? Math.floor((y.scroll.y - e) * y.scrollratio.y) : (y.timer ? y.newscrolly : y.getScrollTop(!0)) - e;
                if (y.bouncescroll) {
                    var r = Math.round(y.view.h / 2); - r > t ? t = -r : t > y.page.maxh + r && (t = y.page.maxh + r)
                }
                return y.cursorfreezed = !1, py = y.getScrollTop(!0), 0 > t && 0 >= py ? y.noticeCursor() : t > y.page.maxh && py >= y.page.maxh ? (y.checkContentSize(), y.noticeCursor()) : void y.doScrollTop(t)
            }, this.doScrollLeftBy = function(e, o) {
                var t = 0,
                    t = o ? Math.floor((y.scroll.x - e) * y.scrollratio.x) : (y.timer ? y.newscrollx : y.getScrollLeft(!0)) - e;
                if (y.bouncescroll) {
                    var r = Math.round(y.view.w / 2); - r > t ? t = -r : t > y.page.maxw + r && (t = y.page.maxw + r)
                }
                return y.cursorfreezed = !1, px = y.getScrollLeft(!0), 0 > t && 0 >= px || t > y.page.maxw && px >= y.page.maxw ? y.noticeCursor() : void y.doScrollLeft(t)
            }, this.doScrollTo = function(e, o) {
                o && Math.round(e * y.scrollratio.y), y.cursorfreezed = !1, y.doScrollTop(e)
            }, this.checkContentSize = function() {
                var e = y.getContentSize();
                (e.h != y.page.h || e.w != y.page.w) && y.resize(!1, e)
            }, y.onscroll = function(e) {
                y.rail.drag || y.cursorfreezed || y.synched("scroll", function() {
                    y.scroll.y = Math.round(y.getScrollTop() * (1 / y.scrollratio.y)), y.railh && (y.scroll.x = Math.round(y.getScrollLeft() * (1 / y.scrollratio.x))), y.noticeCursor()
                })
            }, y.bind(y.docscroll, "scroll", y.onscroll), this.doZoomIn = function(o) {
                if (!y.zoomactive) {
                    y.zoomactive = !0, y.zoomrestore = {
                        style: {}
                    };
                    var t, r = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                        i = y.win[0].style;
                    for (t in r) {
                        var s = r[t];
                        y.zoomrestore.style[s] = "undefined" != typeof i[s] ? i[s] : ""
                    }
                    return y.zoomrestore.style.width = y.win.css("width"), y.zoomrestore.style.height = y.win.css("height"), y.zoomrestore.padding = {
                        w: y.win.outerWidth() - y.win.width(),
                        h: y.win.outerHeight() - y.win.height()
                    }, x.isios4 && (y.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0)), y.win.css({
                        position: x.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        "z-index": n + 100,
                        margin: "0px"
                    }), r = y.win.css("backgroundColor"), ("" == r || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(r)) && y.win.css("backgroundColor", "#fff"), y.rail.css({
                        "z-index": n + 101
                    }), y.zoom.css({
                        "z-index": n + 102
                    }), y.zoom.css("backgroundPosition", "0px -18px"), y.resizeZoom(), y.onzoomin && y.onzoomin.call(y), y.cancelEvent(o)
                }
            }, this.doZoomOut = function(o) {
                return y.zoomactive ? (y.zoomactive = !1, y.win.css("margin", ""), y.win.css(y.zoomrestore.style), x.isios4 && e(window).scrollTop(y.zoomrestore.scrollTop), y.rail.css({
                    "z-index": y.zindex
                }), y.zoom.css({
                    "z-index": y.zindex
                }), y.zoomrestore = !1, y.zoom.css("backgroundPosition", "0px 0px"), y.onResize(), y.onzoomout && y.onzoomout.call(y), y.cancelEvent(o)) : void 0
            }, this.doZoom = function(e) {
                return y.zoomactive ? y.doZoomOut(e) : y.doZoomIn(e)
            }, this.resizeZoom = function() {
                if (y.zoomactive) {
                    var o = y.getScrollTop();
                    y.win.css({
                        width: e(window).width() - y.zoomrestore.padding.w + "px",
                        height: e(window).height() - y.zoomrestore.padding.h + "px"
                    }), y.onResize(), y.setScrollTop(Math.min(y.page.maxh, o))
                }
            }, this.init(), e.nicescroll.push(this)
        },
        v = function(e) {
            var o = this;
            this.nc = e, this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0, this.snapy = this.snapx = !1, this.demuly = this.demulx = 0, this.lastscrolly = this.lastscrollx = -1, this.timer = this.chky = this.chkx = 0, this.time = function() {
                return +new Date
            }, this.reset = function(e, t) {
                o.stop();
                var r = o.time();
                o.steptime = 0, o.lasttime = r, o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.update = function(e, t) {
                var r = o.time();
                o.steptime = r - o.lasttime, o.lasttime = r;
                var r = t - o.lasty,
                    i = e - o.lastx,
                    n = o.nc.getScrollTop(),
                    s = o.nc.getScrollLeft(),
                    n = n + r,
                    s = s + i;
                o.snapx = 0 > s || s > o.nc.page.maxw, o.snapy = 0 > n || n > o.nc.page.maxh, o.speedx = i, o.speedy = r, o.lastx = e, o.lasty = t
            }, this.stop = function() {
                o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.doSnapy = function(e, t) {
                var r = !1;
                0 > t ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), 0 > e ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r && o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed)
            }, this.doMomentum = function(e) {
                var t = o.time(),
                    r = e ? t + e : o.lasttime;
                e = o.nc.getScrollLeft();
                var i = o.nc.getScrollTop(),
                    n = o.nc.page.maxh,
                    s = o.nc.page.maxw;
                if (o.speedx = s > 0 ? Math.min(60, o.speedx) : 0, o.speedy = n > 0 ? Math.min(60, o.speedy) : 0, r = r && 60 >= t - r, (0 > i || i > n || 0 > e || e > s) && (r = !1), e = o.speedx && r ? o.speedx : !1, o.speedy && r && o.speedy || e) {
                    var l = Math.max(16, o.steptime);
                    l > 50 && (e = l / 50, o.speedx *= e, o.speedy *= e, l = 50), o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
                    var a = o.lastscrollx,
                        c = o.lastscrolly,
                        d = function() {
                            var e = 600 < o.time() - t ? .04 : .02;
                            o.speedx && (a = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = a, 0 > a || a > s) && (e = .1), o.speedy && (c = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = c, 0 > c || c > n) && (e = .1), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function() {
                                o.speedx && (o.nc.getScrollLeft() != o.chkx && o.stop(), o.chkx = a, o.nc.setScrollLeft(a)), o.speedy && (o.nc.getScrollTop() != o.chky && o.stop(), o.chky = c, o.nc.setScrollTop(c)), o.timer || (o.nc.hideCursor(), o.doSnapy(a, c))
                            }), 1 > o.demulxy ? o.timer = setTimeout(d, l) : (o.stop(), o.nc.hideCursor(), o.doSnapy(a, c))
                        };
                    d()
                } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
            }
        },
        y = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(o, t, r) {
            return (t = e.data(o, "__nicescroll") || !1) && t.ishwscroll ? t.getScrollTop() : y.call(o)
        },
        set: function(o, t) {
            var r = e.data(o, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.setScrollTop(parseInt(t)) : y.call(o, t), this
        }
    }, e.fn.scrollTop = function(o) {
        if ("undefined" == typeof o) {
            var t = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return t && t.ishwscroll ? t.getScrollTop() : y.call(this)
        }
        return this.each(function() {
            var t = e.data(this, "__nicescroll") || !1;
            t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : y.call(e(this), o)
        })
    };
    var b = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(o, t, r) {
            return (t = e.data(o, "__nicescroll") || !1) && t.ishwscroll ? t.getScrollLeft() : b.call(o)
        },
        set: function(o, t) {
            var r = e.data(o, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.setScrollLeft(parseInt(t)) : b.call(o, t), this
        }
    }, e.fn.scrollLeft = function(o) {
        if ("undefined" == typeof o) {
            var t = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return t && t.ishwscroll ? t.getScrollLeft() : b.call(this)
        }
        return this.each(function() {
            var t = e.data(this, "__nicescroll") || !1;
            t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : b.call(e(this), o)
        })
    };
    var x = function(o) {
        var t = this;
        if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
                for (var o = 0, r = 0; o < t.length; o++) e.call(t[o], r++);
                return t
            }, this.push = function(e) {
                t[t.length] = e, t.length++
            }, this.eq = function(e) {
                return t[e]
            }, o)
            for (a = 0; a < o.length; a++) {
                var r = e.data(o[a], "__nicescroll") || !1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    };
    ! function(e, o, t) {
        for (var r = 0; r < o.length; r++) t(e, o[r])
    }(x.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, o) {
        e[o] = function() {
            var e = arguments;
            return this.each(function() {
                this[o].apply(this, e)
            })
        }
    }), e.fn.getNiceScroll = function(o) {
        return "undefined" == typeof o ? new x(this) : this[o] && e.data(this[o], "__nicescroll") || !1
    }, e.extend(e.expr[":"], {
        nicescroll: function(o) {
            return e.data(o, "__nicescroll") ? !0 : !1
        }
    }), e.fn.niceScroll = function(o, t) {
        "undefined" == typeof t && "object" == typeof o && !("jquery" in o) && (t = o, o = !1);
        var r = new x;
        "undefined" == typeof t && (t = {}), o && (t.doc = e(o), t.win = e(this));
        var i = !("doc" in t);
        return !i && !("win" in t) && (t.win = e(this)), this.each(function() {
            var o = e(this).data("__nicescroll") || !1;
            o || (t.doc = i ? e(this) : t.doc, o = new w(t, e(this)), e(this).data("__nicescroll", o)), r.push(o)
        }), 1 == r.length ? r[0] : r
    }, window.NiceScroll = {
        getjQuery: function() {
            return e
        }
    }, e.nicescroll || (e.nicescroll = new x, e.nicescroll.options = m)
}(jQuery);*/
! function(e) {
    e.fn.dcAccordion = function(s) {
        var i = {
                classParent: "dcjq-parent",
                classActive: "active",
                classArrow: "dcjq-icon",
                classCount: "dcjq-count",
                classExpand: "dcjq-current-parent",
                eventType: "click",
                hoverDelay: 300,
                menuClose: !0,
                autoClose: !0,
                autoExpand: !1,
                speed: "slow",
                saveState: !0,
                disableLink: !0,
                showCount: !1
            },
            s = e.extend(i, s);
        this.each(function(s) {
            function a() {
                $arrow = '<span class="' + i.classArrow + '"></span>';
                var s = i.classParent + "-li";
                e("> ul", v).show(), e("li", v).each(function() {
                    e("> ul", this).length > 0 && (e(this).addClass(s), e("> a", this).addClass(i.classParent).append($arrow))
                }), e("> ul", v).hide(), 1 == i.showCount && e("li." + s, v).each(function() {
                    if (1 == i.disableLink) var s = parseInt(e("ul a:not(." + i.classParent + ")", this).length);
                    else var s = parseInt(e("ul a", this).length);
                    e("> a", this).append(' <span class="' + i.classCount + '">' + s + "</span>")
                })
            }

            function t() {
                $activeLi = e(this).parent("li"), $parentsLi = $activeLi.parents("li"), $parentsUl = $activeLi.parents("ul"), 1 == i.autoClose && o($parentsLi, $parentsUl), e("> ul", $activeLi).is(":visible") ? (e("ul", $activeLi).slideUp(i.speed), e("a", $activeLi).removeClass(i.classActive)) : (e(this).siblings("ul").slideToggle(i.speed), e("> a", $activeLi).addClass(i.classActive)), 1 == i.saveState && createCookie(i.cookie, v)
            }

            function l() {}

            function n() {}

            function c() {
                1 == i.menuClose && (e("ul", v).slideUp(i.speed), e("a", v).removeClass(i.classActive), createCookie(i.cookie, v))
            }

            function o(s, a) {
                e("ul", v).not(a).slideUp(i.speed), e("a", v).removeClass(i.classActive), e("> a", s).addClass(i.classActive)
            }

            function r() {
                e("ul", v).hide(), $allActiveLi = e("a." + i.classActive, v), $allActiveLi.siblings("ul").show()
            }
            var v = this;
            if (a(), 1 == i.autoExpand && e("li." + i.classExpand + " > a").addClass(i.classActive), r(), "hover" == i.eventType) {
                var u = {
                    sensitivity: 2,
                    interval: i.hoverDelay,
                    over: t,
                    timeout: i.hoverDelay,
                    out: l
                };
                e("li a", v).hoverIntent(u);
                var p = {
                    sensitivity: 2,
                    interval: 1e3,
                    over: n,
                    timeout: 1e3,
                    out: c
                };
                e(v).hoverIntent(p), 1 == i.disableLink && e("li a", v).click(function(s) {
                    e(this).siblings("ul").length > 0 && s.preventDefault()
                })
            } else e("li a", v).click(function(s) {
                $activeLi = e(this).parent("li"), $parentsLi = $activeLi.parents("li"), $parentsUl = $activeLi.parents("ul"), 1 == i.disableLink && e(this).siblings("ul").length > 0 && s.preventDefault(), 1 == i.autoClose && o($parentsLi, $parentsUl), e("> ul", $activeLi).is(":visible") ? (e("ul", $activeLi).slideUp(i.speed), e("a", $activeLi).removeClass(i.classActive)) : (e(this).siblings("ul").slideToggle(i.speed), e("> a", $activeLi).addClass(i.classActive))
            })
        })
    }
}(jQuery);/*
! function(e) {
    function t(e) {
        return "object" == typeof e ? e : {
            top: e,
            left: e
        }
    }
    var n = e.scrollTo = function(t, n, o) {
        e(window).scrollTo(t, n, o)
    };
    n.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    }, n.window = function(t) {
        return e(window)._scrollable()
    }, e.fn._scrollable = function() {
        return this.map(function() {
            var t = this,
                n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
            if (!n) return t;
            var o = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || "BackCompat" == o.compatMode ? o.body : o.documentElement
        })
    }, e.fn.scrollTo = function(o, r, i) {
        return "object" == typeof r && (i = r, r = 0), "function" == typeof i && (i = {
            onAfter: i
        }), "max" == o && (o = 9e9), i = e.extend({}, n.defaults, i), r = r || i.duration, i.queue = i.queue && i.axis.length > 1, i.queue && (r /= 2), i.offset = t(i.offset), i.over = t(i.over), this._scrollable().each(function() {
            function a(e) {
                u.animate(l, r, i.easing, e && function() {
                    e.call(this, f, i)
                })
            }
            if (null != o) {
                var s, c = this,
                    u = e(c),
                    f = o,
                    l = {},
                    d = u.is("html,body");
                switch (typeof f) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                            f = t(f);
                            break
                        }
                        if (f = e(f, this), !f.length) return;
                    case "object":
                        (f.is || f.style) && (s = (f = e(f)).offset())
                }
                e.each(i.axis.split(""), function(e, t) {
                    var o = "x" == t ? "Left" : "Top",
                        r = o.toLowerCase(),
                        m = "scroll" + o,
                        h = c[m],
                        w = n.max(c, t);
                    if (s) l[m] = s[r] + (d ? 0 : h - u.offset()[r]), i.margin && (l[m] -= parseInt(f.css("margin" + o)) || 0, l[m] -= parseInt(f.css("border" + o + "Width")) || 0), l[m] += i.offset[r] || 0, i.over[r] && (l[m] += f["x" == t ? "width" : "height"]() * i.over[r]);
                    else {
                        var b = f[r];
                        l[m] = b.slice && "%" == b.slice(-1) ? parseFloat(b) / 100 * w : b
                    }
                    i.limit && /^\d+$/.test(l[m]) && (l[m] = l[m] <= 0 ? 0 : Math.min(l[m], w)), !e && i.queue && (h != l[m] && a(i.onAfterFirst), delete l[m])
                }), a(i.onAfter)
            }
        }).end()
    }, n.max = function(t, n) {
        var o = "x" == n ? "Width" : "Height",
            r = "scroll" + o;
        if (!e(t).is("html,body")) return t[r] - e(t)[o.toLowerCase()]();
        var i = "client" + o,
            a = t.ownerDocument.documentElement,
            s = t.ownerDocument.body;
        return Math.max(a[r], s[r]) - Math.min(a[i], s[i])
    }
}(jQuery);*/
console.timeEnd('nice-scroll');
