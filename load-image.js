console.time('load-image');
!function(e) {
    "use strict";
    function t(e, i, o) {
        var a,
        n=document.createElement("img");
        return n.onerror=function(a) {
            return t.onerror(n, a, e, i, o)
        }
        ,
        n.onload=function(a) {
            return t.onload(n, a, e, i, o)
        }
        ,
        "string"==typeof e?(t.fetchBlob(e, function(i) {
            i?(e=i, a=t.createObjectURL(e)): (a=e, o&&o.crossOrigin&&(n.crossOrigin=o.crossOrigin)), n.src=a
        }
        , o), n):t.isInstanceOf("Blob", e)||t.isInstanceOf("File", e)?(a=n._objectURL=t.createObjectURL(e))?(n.src=a, n):t.readFile(e, function(e) {
            var t=e.target;
            t&&t.result?n.src=t.result: i&&i(e)
        }
        ):void 0
    }
    function i(e, i) {
        !e._objectURL||i&&i.noRevoke||(t.revokeObjectURL(e._objectURL), delete e._objectURL)
    }
    var o=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;
    t.fetchBlob=function(e, t, i) {
        t()
    }
    ,
    t.isInstanceOf=function(e, t) {
        return Object.prototype.toString.call(t)==="[object "+e+"]"
    }
    ,
    t.transform=function(e, t, i, o, a) {
        i(e, a)
    }
    ,
    t.onerror=function(e, t, o, a, n) {
        i(e, n),
        a&&a.call(e, t)
    }
    ,
    t.onload=function(e, o, a, n, r) {
        i(e, r),
        n&&t.transform(e, r, n, a, {}
        )
    }
    ,
    t.createObjectURL=function(e) {
        return!!o&&o.createObjectURL(e)
    }
    ,
    t.revokeObjectURL=function(e) {
        return!!o&&o.revokeObjectURL(e)
    }
    ,
    t.readFile=function(e, t, i) {
        if(window.FileReader) {
            var o=new FileReader;
            if(o.onload=o.onerror=t, i=i||"readAsDataURL", o[i])return o[i](e),
            o
        }
        return!1
    }
    ,
    "function"==typeof define&&define.amd?define(function() {
        return t
    }
    ):"object"==typeof module&&module.exports?module.exports=t:e.loadImage=t
}

(window),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image"], e): e("object"==typeof module&&module.exports?require("./load-image"): window.loadImage)
}

(function(e) {
    "use strict";
    var t=e.transform;
    e.transform=function(i, o, a, n, r) {
        t.call(e, e.scale(i, o, r), o, a, n, r)
    }
    , e.transformCoordinates=function() {}
    , e.getTransformedOptions=function(e, t) {
        var i, o, a, n, r=t.aspectRatio;
        if(!r)return t;
        i= {}
        ;
        for(o in t)t.hasOwnProperty(o)&&(i[o]=t[o]);
        return i.crop=!0, a=e.naturalWidth||e.width, n=e.naturalHeight||e.height, a/n>r?(i.maxWidth=n*r, i.maxHeight=n): (i.maxWidth=a, i.maxHeight=a/r), i
    }
    , e.renderImageToCanvas=function(e, t, i, o, a, n, r, s, l, d) {
        return e.getContext("2d").drawImage(t, i, o, a, n, r, s, l, d), e
    }
    , e.hasCanvasOption=function(e) {
        return e.canvas||e.crop||!!e.aspectRatio
    }
    , e.scale=function(t, i, o) {
        function a() {
            var e=Math.max((l||w)/w, (d||v)/v);
            e>1&&(w*=e, v*=e)
        }
        function n() {
            var e=Math.min((r||w)/w, (s||v)/v);
            e<1&&(w*=e, v*=e)
        }
        i=i|| {}
        ;
        var r, s, l, d, c, u, f, g, h, m, p, S=document.createElement("canvas"), b=t.getContext||e.hasCanvasOption(i)&&S.getContext, x=t.naturalWidth||t.width, y=t.naturalHeight||t.height, w=x, v=y;
        if(b&&(f=(i=e.getTransformedOptions(t, i, o)).left||0, g=i.top||0, i.sourceWidth?(c=i.sourceWidth, void 0!==i.right&&void 0===i.left&&(f=x-c-i.right)):c=x-f-(i.right||0), i.sourceHeight?(u=i.sourceHeight, void 0!==i.bottom&&void 0===i.top&&(g=y-u-i.bottom)):u=y-g-(i.bottom||0), w=c, v=u), r=i.maxWidth, s=i.maxHeight, l=i.minWidth, d=i.minHeight, b&&r&&s&&i.crop?(w=r, v=s, (p=c/u-r/s)<0?(u=s*c/r, void 0===i.top&&void 0===i.bottom&&(g=(y-u)/2)):p>0&&(c=r*u/s, void 0===i.left&&void 0===i.right&&(f=(x-c)/2))):((i.contain||i.cover)&&(l=r=r||l, d=s=s||d), i.cover?(n(), a()):(a(), n())), b) {
            if((h=i.pixelRatio)>1&&(S.style.width=w+"px", S.style.height=v+"px", w*=h, v*=h, S.getContext("2d").scale(h, h)), (m=i.downsamplingRatio)>0&&m<1&&w<c&&v<u)for(;
            c*m>w;
            )S.width=c*m, S.height=u*m, e.renderImageToCanvas(S, t, f, g, c, u, 0, 0, S.width, S.height), f=0, g=0, c=S.width, u=S.height, (t=document.createElement("canvas")).width=c, t.height=u, e.renderImageToCanvas(t, S, 0, 0, c, u, 0, 0, c, u);
            return S.width=w, S.height=v, e.transformCoordinates(S, i), e.renderImageToCanvas(S, t, f, g, c, u, 0, 0, w, v)
        }
        return t.width=w, t.height=v, t
    }
}

),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image"], e): e("object"==typeof module&&module.exports?require("./load-image"): window.loadImage)
}

(function(e) {
    "use strict";
    var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);
    e.blobSlice=t&&function() {
        return(this.slice||this.webkitSlice||this.mozSlice).apply(this, arguments)
    }
    , e.metaDataParsers= {
        jpeg: {
            65505: []
        }
    }
    , e.parseMetaData=function(t, i, o, a) {
        o=o|| {}
        , a=a|| {}
        ;
        var n=this, r=o.maxMetaDataSize||262144;
        !!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice)&&e.readFile(e.blobSlice.call(t, 0, r), function(t) {
            if(t.target.error)return console.log(t.target.error), void i(a);
            var r, s, l, d, c=t.target.result, u=new DataView(c), f=2, g=u.byteLength-4, h=f;
            if(65496===u.getUint16(0)) {
                for(;
                f<g&&((r=u.getUint16(f))>=65504&&r<=65519||65534===r);
                ) {
                    if(s=u.getUint16(f+2)+2, f+s>u.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if(l=e.metaDataParsers.jpeg[r])for(d=0;
                    d<l.length;
                    d+=1)l[d].call(n, u, f, s, a, o);
                    h=f+=s
                }
                !o.disableImageHead&&h>6&&(c.slice?a.imageHead=c.slice(0, h):a.imageHead=new Uint8Array(c).subarray(0, h))
            }
            else console.log("Invalid JPEG file: Missing JPEG marker.");
            i(a)
        }
        , "readAsArrayBuffer")||i(a)
    }
    , e.hasMetaOption=function(e) {
        return e&&e.meta
    }
    ;
    var i=e.transform;
    e.transform=function(t, o, a, n, r) {
        e.hasMetaOption(o)?e.parseMetaData(n, function(r) {
            i.call(e, t, o, a, n, r)
        }
        , o, r):i.apply(e, arguments)
    }
}

),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image", "./load-image-scale", "./load-image-meta"], e): "object"==typeof module&&module.exports?e(require("./load-image"), require("./load-image-scale"), require("./load-image-meta")): e(window.loadImage)
}

(function(e) {
    "use strict";
    var t=e.hasCanvasOption, i=e.hasMetaOption, o=e.transformCoordinates, a=e.getTransformedOptions;
    e.hasCanvasOption=function(i) {
        return!!i.orientation||t.call(e, i)
    }
    , e.hasMetaOption=function(t) {
        return t&&!0===t.orientation||i.call(e, t)
    }
    , e.transformCoordinates=function(t, i) {
        o.call(e, t, i);
        var a=t.getContext("2d"), n=t.width, r=t.height, s=t.style.width, l=t.style.height, d=i.orientation;
        if(d&&!(d>8))switch(d>4&&(t.width=r, t.height=n, t.style.width=l, t.style.height=s), d) {
            case 2: a.translate(n, 0), a.scale(-1, 1);
            break;
            case 3: a.translate(n, r), a.rotate(Math.PI);
            break;
            case 4: a.translate(0, r), a.scale(1, -1);
            break;
            case 5: a.rotate(.5*Math.PI), a.scale(1, -1);
            break;
            case 6: a.rotate(.5*Math.PI), a.translate(0, -r);
            break;
            case 7: a.rotate(.5*Math.PI), a.translate(n, -r), a.scale(-1, 1);
            break;
            case 8: a.rotate(-.5*Math.PI), a.translate(-n, 0)
        }
    }
    , e.getTransformedOptions=function(t, i, o) {
        var n, r, s=a.call(e, t, i), l=s.orientation;
        if(!0===l&&o&&o.exif&&(l=o.exif.get("Orientation")), !l||l>8||1===l)return s;
        n= {}
        ;
        for(r in s)s.hasOwnProperty(r)&&(n[r]=s[r]);
        switch(n.orientation=l, l) {
            case 2: n.left=s.right, n.right=s.left;
            break;
            case 3: n.left=s.right, n.top=s.bottom, n.right=s.left, n.bottom=s.top;
            break;
            case 4: n.top=s.bottom, n.bottom=s.top;
            break;
            case 5: n.left=s.top, n.top=s.left, n.right=s.bottom, n.bottom=s.right;
            break;
            case 6: n.left=s.top, n.top=s.right, n.right=s.bottom, n.bottom=s.left;
            break;
            case 7: n.left=s.bottom, n.top=s.right, n.right=s.top, n.bottom=s.left;
            break;
            case 8: n.left=s.bottom, n.top=s.left, n.right=s.top, n.bottom=s.right
        }
        return n.orientation>4&&(n.maxWidth=s.maxHeight, n.maxHeight=s.maxWidth, n.minWidth=s.minHeight, n.minHeight=s.minWidth, n.sourceWidth=s.sourceHeight, n.sourceHeight=s.sourceWidth), n
    }
}

),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image", "./load-image-meta"], e): "object"==typeof module&&module.exports?e(require("./load-image"), require("./load-image-meta")): e(window.loadImage)
}

(function(e) {
    "use strict";
    "fetch"in window&&"Request"in window&&(e.fetchBlob=function(t, i, o) {
        if(e.hasMetaOption(o))return fetch(new Request(t, o)).then(function(e) {
            return e.blob()
        }
        ).then(i).catch(function(e) {
            console.log(e), i()
        }
        );
        i()
    }
    )
}

),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image", "./load-image-meta"], e): "object"==typeof module&&module.exports?e(require("./load-image"), require("./load-image-meta")): e(window.loadImage)
}

(function(e) {
    "use strict";
    e.ExifMap=function() {
        return this
    }
    , e.ExifMap.prototype.map= {
        Orientation: 274
    }
    , e.ExifMap.prototype.get=function(e) {
        return this[e]||this[this.map[e]]
    }
    , e.getExifThumbnail=function(e, t, i) {
        var o, a, n;
        {
            if(i&&!(t+i>e.byteLength)) {
                for(o=[], a=0;
                a<i;
                a+=1)n=e.getUint8(t+a), o.push((n<16?"0": "")+n.toString(16));
                return"data:image/jpeg,%"+o.join("%")
            }
            console.log("Invalid Exif data: Invalid thumbnail data.")
        }
    }
    , e.exifTagTypes= {
        1: {
            getValue:function(e, t) {
                return e.getUint8(t)
            }
            , size:1
        }
        , 2: {
            getValue:function(e, t) {
                return String.fromCharCode(e.getUint8(t))
            }
            , size:1, ascii:!0
        }
        , 3: {
            getValue:function(e, t, i) {
                return e.getUint16(t, i)
            }
            , size:2
        }
        , 4: {
            getValue:function(e, t, i) {
                return e.getUint32(t, i)
            }
            , size:4
        }
        , 5: {
            getValue:function(e, t, i) {
                return e.getUint32(t, i)/e.getUint32(t+4, i)
            }
            , size:8
        }
        , 9: {
            getValue:function(e, t, i) {
                return e.getInt32(t, i)
            }
            , size:4
        }
        , 10: {
            getValue:function(e, t, i) {
                return e.getInt32(t, i)/e.getInt32(t+4, i)
            }
            , size:8
        }
    }
    , e.exifTagTypes[7]=e.exifTagTypes[1], e.getExifValue=function(t, i, o, a, n, r) {
        var s, l, d, c, u, f, g=e.exifTagTypes[a];
        if(g) {
            if(s=g.size*n, !((l=s>4?i+t.getUint32(o+8, r): o+8)+s>t.byteLength)) {
                if(1===n)return g.getValue(t, l, r);
                for(d=[], c=0;
                c<n;
                c+=1)d[c]=g.getValue(t, l+c*g.size, r);
                if(g.ascii) {
                    for(u="", c=0;
                    c<d.length&&"\0"!==(f=d[c]);
                    c+=1)u+=f;
                    return u
                }
                return d
            }
            console.log("Invalid Exif data: Invalid data offset.")
        }
        else console.log("Invalid Exif data: Invalid tag type.")
    }
    , e.parseExifTag=function(t, i, o, a, n) {
        var r=t.getUint16(o, a);
        n.exif[r]=e.getExifValue(t, i, o, t.getUint16(o+2, a), t.getUint32(o+4, a), a)
    }
    , e.parseExifTags=function(e, t, i, o, a) {
        var n, r, s;
        if(i+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");
        else {
            if(n=e.getUint16(i, o), !((r=i+2+12*n)+4>e.byteLength)) {
                for(s=0;
                s<n;
                s+=1)this.parseExifTag(e, t, i+2+12*s, o, a);
                return e.getUint32(r, o)
            }
            console.log("Invalid Exif data: Invalid directory size.")
        }
    }
    , e.parseExifData=function(t, i, o, a, n) {
        if(!n.disableExif) {
            var r, s, l, d=i+10;
            if(1165519206===t.getUint32(i+4))if(d+8>t.byteLength)console.log("Invalid Exif data: Invalid segment size.");
            else if(0===t.getUint16(i+8)) {
                switch(t.getUint16(d)) {
                    case 18761: r=!0;
                    break;
                    case 19789: r=!1;
                    break;
                    default: return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                42===t.getUint16(d+2, r)?(s=t.getUint32(d+4, r), a.exif=new e.ExifMap, (s=e.parseExifTags(t, d, d+s, r, a))&&!n.disableExifThumbnail&&(l= {
                    exif: {}
                }
                , s=e.parseExifTags(t, d, d+s, r, l), l.exif[513]&&(a.exif.Thumbnail=e.getExifThumbnail(t, d+l.exif[513], l.exif[514]))), a.exif[34665]&&!n.disableExifSub&&e.parseExifTags(t, d, d+a.exif[34665], r, a), a.exif[34853]&&!n.disableExifGps&&e.parseExifTags(t, d, d+a.exif[34853], r, a)):console.log("Invalid Exif data: Missing TIFF marker.")
            }
            else console.log("Invalid Exif data: Missing byte alignment offset.")
        }
    }
    , e.metaDataParsers.jpeg[65505].push(e.parseExifData)
}

),
function(e) {
    "use strict";
    "function"==typeof define&&define.amd?define(["./load-image", "./load-image-exif"], e): "object"==typeof module&&module.exports?e(require("./load-image"), require("./load-image-exif")): e(window.loadImage)
}

(function(e) {
    "use strict";
    e.ExifMap.prototype.tags= {
        256: "ImageWidth", 257: "ImageHeight", 34665: "ExifIFDPointer", 34853: "GPSInfoIFDPointer", 40965: "InteroperabilityIFDPointer", 258: "BitsPerSample", 259: "Compression", 262: "PhotometricInterpretation", 274: "Orientation", 277: "SamplesPerPixel", 284: "PlanarConfiguration", 530: "YCbCrSubSampling", 531: "YCbCrPositioning", 282: "XResolution", 283: "YResolution", 296: "ResolutionUnit", 273: "StripOffsets", 278: "RowsPerStrip", 279: "StripByteCounts", 513: "JPEGInterchangeFormat", 514: "JPEGInterchangeFormatLength", 301: "TransferFunction", 318: "WhitePoint", 319: "PrimaryChromaticities", 529: "YCbCrCoefficients", 532: "ReferenceBlackWhite", 306: "DateTime", 270: "ImageDescription", 271: "Make", 272: "Model", 305: "Software", 315: "Artist", 33432: "Copyright", 36864: "ExifVersion", 40960: "FlashpixVersion", 40961: "ColorSpace", 40962: "PixelXDimension", 40963: "PixelYDimension", 42240: "Gamma", 37121: "ComponentsConfiguration", 37122: "CompressedBitsPerPixel", 37500: "MakerNote", 37510: "UserComment", 40964: "RelatedSoundFile", 36867: "DateTimeOriginal", 36868: "DateTimeDigitized", 37520: "SubSecTime", 37521: "SubSecTimeOriginal", 37522: "SubSecTimeDigitized", 33434: "ExposureTime", 33437: "FNumber", 34850: "ExposureProgram", 34852: "SpectralSensitivity", 34855: "PhotographicSensitivity", 34856: "OECF", 34864: "SensitivityType", 34865: "StandardOutputSensitivity", 34866: "RecommendedExposureIndex", 34867: "ISOSpeed", 34868: "ISOSpeedLatitudeyyy", 34869: "ISOSpeedLatitudezzz", 37377: "ShutterSpeedValue", 37378: "ApertureValue", 37379: "BrightnessValue", 37380: "ExposureBias", 37381: "MaxApertureValue", 37382: "SubjectDistance", 37383: "MeteringMode", 37384: "LightSource", 37385: "Flash", 37396: "SubjectArea", 37386: "FocalLength", 41483: "FlashEnergy", 41484: "SpatialFrequencyResponse", 41486: "FocalPlaneXResolution", 41487: "FocalPlaneYResolution", 41488: "FocalPlaneResolutionUnit", 41492: "SubjectLocation", 41493: "ExposureIndex", 41495: "SensingMethod", 41728: "FileSource", 41729: "SceneType", 41730: "CFAPattern", 41985: "CustomRendered", 41986: "ExposureMode", 41987: "WhiteBalance", 41988: "DigitalZoomRatio", 41989: "FocalLengthIn35mmFilm", 41990: "SceneCaptureType", 41991: "GainControl", 41992: "Contrast", 41993: "Saturation", 41994: "Sharpness", 41995: "DeviceSettingDescription", 41996: "SubjectDistanceRange", 42016: "ImageUniqueID", 42032: "CameraOwnerName", 42033: "BodySerialNumber", 42034: "LensSpecification", 42035: "LensMake", 42036: "LensModel", 42037: "LensSerialNumber", 0: "GPSVersionID", 1: "GPSLatitudeRef", 2: "GPSLatitude", 3: "GPSLongitudeRef", 4: "GPSLongitude", 5: "GPSAltitudeRef", 6: "GPSAltitude", 7: "GPSTimeStamp", 8: "GPSSatellites", 9: "GPSStatus", 10: "GPSMeasureMode", 11: "GPSDOP", 12: "GPSSpeedRef", 13: "GPSSpeed", 14: "GPSTrackRef", 15: "GPSTrack", 16: "GPSImgDirectionRef", 17: "GPSImgDirection", 18: "GPSMapDatum", 19: "GPSDestLatitudeRef", 20: "GPSDestLatitude", 21: "GPSDestLongitudeRef", 22: "GPSDestLongitude", 23: "GPSDestBearingRef", 24: "GPSDestBearing", 25: "GPSDestDistanceRef", 26: "GPSDestDistance", 27: "GPSProcessingMethod", 28: "GPSAreaInformation", 29: "GPSDateStamp", 30: "GPSDifferential", 31: "GPSHPositioningError"
    }
    , e.ExifMap.prototype.stringValues= {
        ExposureProgram: {
            0: "Undefined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode"
        }
        , MeteringMode: {
            0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other"
        }
        , LightSource: {
            0: "Unknown", 1: "Daylight", 2: "Fluorescent", 3: "Tungsten (incandescent light)", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 - 5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other"
        }
        , Flash: {
            0: "Flash did not fire", 1: "Flash fired", 5: "Strobe return light not detected", 7: "Strobe return light detected", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        }
        , SensingMethod: {
            1: "Undefined", 2: "One-chip color area sensor", 3: "Two-chip color area sensor", 4: "Three-chip color area sensor", 5: "Color sequential area sensor", 7: "Trilinear sensor", 8: "Color sequential linear sensor"
        }
        , SceneCaptureType: {
            0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"
        }
        , SceneType: {
            1: "Directly photographed"
        }
        , CustomRendered: {
            0: "Normal process", 1: "Custom process"
        }
        , WhiteBalance: {
            0: "Auto white balance", 1: "Manual white balance"
        }
        , GainControl: {
            0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down"
        }
        , Contrast: {
            0: "Normal", 1: "Soft", 2: "Hard"
        }
        , Saturation: {
            0: "Normal", 1: "Low saturation", 2: "High saturation"
        }
        , Sharpness: {
            0: "Normal", 1: "Soft", 2: "Hard"
        }
        , SubjectDistanceRange: {
            0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view"
        }
        , FileSource: {
            3: "DSC"
        }
        , ComponentsConfiguration: {
            0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B"
        }
        , Orientation: {
            1: "top-left", 2: "top-right", 3: "bottom-right", 4: "bottom-left", 5: "left-top", 6: "right-top", 7: "right-bottom", 8: "left-bottom"
        }
    }
    , e.ExifMap.prototype.getText=function(e) {
        var t=this.get(e);
        switch(e) {
            case"LightSource": case"Flash": case"MeteringMode": case"ExposureProgram": case"SensingMethod": case"SceneCaptureType": case"SceneType": case"CustomRendered": case"WhiteBalance": case"GainControl": case"Contrast": case"Saturation": case"Sharpness": case"SubjectDistanceRange": case"FileSource": case"Orientation": return this.stringValues[e][t];
            case"ExifVersion": case"FlashpixVersion": if(!t)return;
            return String.fromCharCode(t[0], t[1], t[2], t[3]);
            case"ComponentsConfiguration": if(!t)return;
            return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];
            case"GPSVersionID": if(!t)return;
            return t[0]+"."+t[1]+"."+t[2]+"."+t[3]
        }
        return String(t)
    }
    , function(e) {
        var t, i=e.tags, o=e.map;
        for(t in i)i.hasOwnProperty(t)&&(o[i[t]]=t)
    }
    (e.ExifMap.prototype), e.ExifMap.prototype.getAll=function() {
        var e, t, i= {}
        ;
        for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e])&&(i[t]=this.getText(t));
        return i
    }
}

);
console.timeEnd('load-image');
