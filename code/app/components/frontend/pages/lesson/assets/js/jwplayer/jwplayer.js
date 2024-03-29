"undefined" == typeof jwplayer && (jwplayer = function(f) {
  if(jwplayer.api) {
    return jwplayer.api.selectPlayer(f)
  }
}, jwplayer.version = "6.4.3359", jwplayer.vid = document.createElement("video"), jwplayer.audio = document.createElement("audio"), jwplayer.source = document.createElement("source"), function(f) {
  function a(g) {
    return function() {
      return c(g)
    }
  }
  var l = document, e = window, j = navigator, b = f.utils = function() {
  };
  b.exists = function(g) {
    switch(typeof g) {
      case "string":
        return 0 < g.length;
      case "object":
        return null !== g;
      case "undefined":
        return!1
    }
    return!0
  };
  b.styleDimension = function(g) {
    return g + (0 < g.toString().indexOf("%") ? "" : "px")
  };
  b.getAbsolutePath = function(g, a) {
    b.exists(a) || (a = l.location.href);
    if(b.exists(g)) {
      var c;
      if(b.exists(g)) {
        c = g.indexOf("://");
        var j = g.indexOf("?");
        c = 0 < c && (0 > j || j > c)
      }else {
        c = void 0
      }
      if(c) {
        return g
      }
      c = a.substring(0, a.indexOf("://") + 3);
      var j = a.substring(c.length, a.indexOf("/", c.length + 1)), d;
      0 === g.indexOf("/") ? d = g.split("/") : (d = a.split("?")[0], d = d.substring(c.length + j.length + 1, d.lastIndexOf("/")), d = d.split("/").concat(g.split("/")));
      for(var h = [], e = 0;e < d.length;e++) {
        d[e] && b.exists(d[e]) && "." != d[e] && (".." == d[e] ? h.pop() : h.push(d[e]))
      }
      return c + j + "/" + h.join("/")
    }
  };
  b.extend = function() {
    var a = b.extend.arguments;
    if(1 < a.length) {
      for(var c = 1;c < a.length;c++) {
        b.foreach(a[c], function(c, d) {
          try {
            b.exists(d) && (a[0][c] = d)
          }catch(j) {
          }
        })
      }
      return a[0]
    }
    return null
  };
  b.log = function(a, b) {
    "undefined" != typeof console && "undefined" != typeof console.log && (b ? console.log(a, b) : console.log(a))
  };
  var c = b.userAgentMatch = function(a) {
    return null !== j.userAgent.toLowerCase().match(a)
  };
  b.isIE = a(/msie/i);
  b.isFF = a(/firefox/i);
  b.isChrome = a(/chrome/i);
  b.isIOS = a(/iP(hone|ad|od)/i);
  b.isIPod = a(/iP(hone|od)/i);
  b.isIPad = a(/iPad/i);
  b.isSafari602 = a(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
  b.isAndroid = function(a) {
    return a ? c(RegExp("android.*" + a, "i")) : c(/android/i)
  };
  b.isMobile = function() {
    return b.isIOS() || b.isAndroid()
  };
  b.saveCookie = function(a, b) {
    l.cookie = "jwplayer." + a + "=" + b + "; path=/"
  };
  b.getCookies = function() {
    for(var a = {}, b = l.cookie.split("; "), c = 0;c < b.length;c++) {
      var d = b[c].split("=");
      0 == d[0].indexOf("jwplayer.") && (a[d[0].substring(9, d[0].length)] = d[1])
    }
    return a
  };
  b.typeOf = function(a) {
    var b = typeof a;
    return"object" === b ? !a ? "null" : a instanceof Array ? "array" : b : b
  };
  b.translateEventResponse = function(a, c) {
    var d = b.extend({}, c);
    a == f.events.JWPLAYER_FULLSCREEN && !d.fullscreen ? (d.fullscreen = "true" == d.message ? !0 : !1, delete d.message) : "object" == typeof d.data ? (d = b.extend(d, d.data), delete d.data) : "object" == typeof d.metadata && b.deepReplaceKeyName(d.metadata, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]);
    b.foreach(["position", "duration", "offset"], function(a, b) {
      d[b] && (d[b] = Math.round(1E3 * d[b]) / 1E3)
    });
    return d
  };
  b.flashVersion = function() {
    if(b.isAndroid()) {
      return 0
    }
    var a = j.plugins, d;
    try {
      if("undefined" !== a && (d = a["Shockwave Flash"])) {
        return parseInt(d.description.replace(/\D+(\d+)\..*/, "$1"))
      }
    }catch(c) {
    }
    if("undefined" != typeof e.ActiveXObject) {
      try {
        if(d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
          return parseInt(d.GetVariable("$version").split(" ")[1].split(",")[0])
        }
      }catch(f) {
      }
    }
    return 0
  };
  b.getScriptPath = function(a) {
    for(var b = l.getElementsByTagName("script"), d = 0;d < b.length;d++) {
      var c = b[d].src;
      if(c && 0 <= c.indexOf(a)) {
        return c.substr(0, c.indexOf(a))
      }
    }
    return""
  };
  b.deepReplaceKeyName = function(a, d, c) {
    switch(f.utils.typeOf(a)) {
      case "array":
        for(var j = 0;j < a.length;j++) {
          a[j] = f.utils.deepReplaceKeyName(a[j], d, c)
        }
        break;
      case "object":
        b.foreach(a, function(b, h) {
          var j;
          if(d instanceof Array && c instanceof Array) {
            if(d.length != c.length) {
              return
            }
            j = d
          }else {
            j = [d]
          }
          for(var e = b, l = 0;l < j.length;l++) {
            e = e.replace(RegExp(d[l], "g"), c[l])
          }
          a[e] = f.utils.deepReplaceKeyName(h, d, c);
          b != e && delete a[b]
        })
    }
    return a
  };
  var d = b.pluginPathType = {ABSOLUTE:0, RELATIVE:1, CDN:2};
  b.getPluginPathType = function(a) {
    if("string" == typeof a) {
      a = a.split("?")[0];
      var c = a.indexOf("://");
      if(0 < c) {
        return d.ABSOLUTE
      }
      var j = a.indexOf("/");
      a = b.extension(a);
      return 0 > c && 0 > j && (!a || !isNaN(a)) ? d.CDN : d.RELATIVE
    }
  };
  b.getPluginName = function(a) {
    return a.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
  };
  b.getPluginVersion = function(a) {
    return a.replace(/[^-]*-?([^\.]*).*$/, "$1")
  };
  b.isYouTube = function(a) {
    return-1 < a.indexOf("youtube.com") || -1 < a.indexOf("youtu.be")
  };
  b.isRtmp = function(a, b) {
    return 0 == a.indexOf("rtmp") || "rtmp" == b
  };
  b.foreach = function(a, b) {
    var d, c;
    for(d in a) {
      a.hasOwnProperty(d) && (c = a[d], b(d, c))
    }
  };
  b.isHTTPS = function() {
    return 0 == e.location.href.indexOf("https")
  };
  b.repo = function() {
    var a = "http://p.jwpcdn.com/" + f.version.split(/\W/).splice(0, 2).join("/") + "/";
    try {
      b.isHTTPS() && (a = a.replace("http://", "https://ssl."))
    }catch(d) {
    }
    return a
  }
}(jwplayer), function(f) {
  var a = "video/", l = f.foreach, e = {mp4:a + "mp4", vorbis:"audio/ogg", ogg:a + "ogg", webm:a + "webm", aac:"audio/mp4", mp3:"audio/mpeg", hls:"application/vnd.apple.mpegurl"}, j = {mp4:e.mp4, f4v:e.mp4, m4v:e.mp4, mov:e.mp4, m4a:e.aac, f4a:e.aac, aac:e.aac, mp3:e.mp3, ogv:e.ogg, ogg:e.vorbis, oga:e.vorbis, webm:e.webm, m3u8:e.hls, hls:e.hls}, a = "video", a = {flv:a, f4v:a, mov:a, m4a:a, m4v:a, mp4:a, aac:a, f4a:a, mp3:"sound", smil:"rtmp", m3u8:"hls", hls:"hls"}, b = f.extensionmap = {};
  l(j, function(a, d) {
    b[a] = {html5:d}
  });
  l(a, function(a, d) {
    b[a] || (b[a] = {});
    b[a].flash = d
  });
  b.types = e;
  b.mimeType = function(a) {
    var b;
    l(e, function(j, e) {
      !b && e == a && (b = j)
    });
    return b
  };
  b.extType = function(a) {
    return b.mimeType(j[a])
  }
}(jwplayer.utils), function(f) {
  var a = f.loaderstatus = {NEW:0, LOADING:1, ERROR:2, COMPLETE:3}, l = document;
  f.scriptloader = function(e) {
    function j() {
      c = a.ERROR;
      g.sendEvent(d.ERROR)
    }
    function b() {
      c = a.COMPLETE;
      g.sendEvent(d.COMPLETE)
    }
    var c = a.NEW, d = jwplayer.events, g = new d.eventdispatcher;
    f.extend(this, g);
    this.load = function() {
      var g = f.scriptloader.loaders[e];
      if(g && (g.getStatus() == a.NEW || g.getStatus() == a.LOADING)) {
        g.addEventListener(d.ERROR, j), g.addEventListener(d.COMPLETE, b)
      }else {
        if(f.scriptloader.loaders[e] = this, c == a.NEW) {
          c = a.LOADING;
          var m = l.createElement("script");
          m.addEventListener ? (m.onload = b, m.onerror = j) : m.readyState && (m.onreadystatechange = function() {
            ("loaded" == m.readyState || "complete" == m.readyState) && b()
          });
          l.getElementsByTagName("head")[0].appendChild(m);
          m.src = e
        }
      }
    };
    this.getStatus = function() {
      return c
    }
  };
  f.scriptloader.loaders = {}
}(jwplayer.utils), function(f) {
  f.trim = function(a) {
    return a.replace(/^\s*/, "").replace(/\s*$/, "")
  };
  f.pad = function(a, f, e) {
    for(e || (e = "0");a.length < f;) {
      a = e + a
    }
    return a
  };
  f.xmlAttribute = function(a, f) {
    for(var e = 0;e < a.attributes.length;e++) {
      if(a.attributes[e].name && a.attributes[e].name.toLowerCase() == f.toLowerCase()) {
        return a.attributes[e].value.toString()
      }
    }
    return""
  };
  f.extension = function(a) {
    if(!a || "rtmp" == a.substr(0, 4)) {
      return""
    }
    a = a.substring(a.lastIndexOf("/") + 1, a.length).split("?")[0].split("#")[0];
    if(-1 < a.lastIndexOf(".")) {
      return a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase()
    }
  };
  f.stringToColor = function(a) {
    a = a.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
    3 == a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
    return parseInt(a, 16)
  }
}(jwplayer.utils), function(f) {
  f.key = function(a) {
    var l, e, j;
    this.edition = function() {
      return j && j.getTime() < (new Date).getTime() ? "invalid" : l
    };
    this.token = function() {
      return e
    };
    f.exists(a) || (a = "");
    try {
			//alert(f.tea.encrypt("pro/chungxa/1466884419672", "36QXq4W@GSBV^teR")); // [edition]/[token]/[timestamp]
      a = f.tea.decrypt(a, "36QXq4W@GSBV^teR"); 
      var b = a.split("/");
      (l = b[0]) || (l = "free");
      e = b[1];
      b[2] && 0 < parseInt(b[2]) && (j = new Date, j.setTime(String(b[2])))
    }catch(c) {
      l = "invalid"
    }
  }
}(jwplayer.utils), function(f) {
  var a = f.tea = {};
  a.encrypt = function(j, b) {
    if(0 == j.length) {
      return""
    }
    var c = a.strToLongs(e.encode(j));
    1 >= c.length && (c[1] = 0);
    for(var d = a.strToLongs(e.encode(b).slice(0, 16)), g = c.length, f = c[g - 1], m = c[0], n, k = Math.floor(6 + 52 / g), h = 0;0 < k--;) {
      h += 2654435769;
      n = h >>> 2 & 3;
      for(var r = 0;r < g;r++) {
        m = c[(r + 1) % g], f = (f >>> 5 ^ m << 2) + (m >>> 3 ^ f << 4) ^ (h ^ m) + (d[r & 3 ^ n] ^ f), f = c[r] += f
      }
    }
    c = a.longsToStr(c);
    return l.encode(c)
  };
  a.decrypt = function(j, b) {
    if(0 == j.length) {
      return""
    }
    for(var c = a.strToLongs(l.decode(j)), d = a.strToLongs(e.encode(b).slice(0, 16)), g = c.length, f = c[g - 1], m = c[0], n, k = 2654435769 * Math.floor(6 + 52 / g);0 != k;) {
      n = k >>> 2 & 3;
      for(var h = g - 1;0 <= h;h--) {
        f = c[0 < h ? h - 1 : g - 1], f = (f >>> 5 ^ m << 2) + (m >>> 3 ^ f << 4) ^ (k ^ m) + (d[h & 3 ^ n] ^ f), m = c[h] -= f
      }
      k -= 2654435769
    }
    c = a.longsToStr(c);
    c = c.replace(/\0+$/, "");
    return e.decode(c)
  };
  a.strToLongs = function(a) {
    for(var b = Array(Math.ceil(a.length / 4)), c = 0;c < b.length;c++) {
      b[c] = a.charCodeAt(4 * c) + (a.charCodeAt(4 * c + 1) << 8) + (a.charCodeAt(4 * c + 2) << 16) + (a.charCodeAt(4 * c + 3) << 24)
    }
    return b
  };
  a.longsToStr = function(a) {
    for(var b = Array(a.length), c = 0;c < a.length;c++) {
      b[c] = String.fromCharCode(a[c] & 255, a[c] >>> 8 & 255, a[c] >>> 16 & 255, a[c] >>> 24 & 255)
    }
    return b.join("")
  };
  var l = {code:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode:function(a, b) {
    var c, d, g, f, m = [], n = "", k, h, r = l.code;
    h = ("undefined" == typeof b ? 0 : b) ? e.encode(a) : a;
    k = h.length % 3;
    if(0 < k) {
      for(;3 > k++;) {
        n += "=", h += "\x00"
      }
    }
    for(k = 0;k < h.length;k += 3) {
      c = h.charCodeAt(k), d = h.charCodeAt(k + 1), g = h.charCodeAt(k + 2), f = c << 16 | d << 8 | g, c = f >> 18 & 63, d = f >> 12 & 63, g = f >> 6 & 63, f &= 63, m[k / 3] = r.charAt(c) + r.charAt(d) + r.charAt(g) + r.charAt(f)
    }
    m = m.join("");
    return m = m.slice(0, m.length - n.length) + n
  }, decode:function(a, b) {
    b = "undefined" == typeof b ? !1 : b;
    var c, d, g, f, m, n = [], k, h = l.code;
    k = b ? e.decode(a) : a;
    for(var r = 0;r < k.length;r += 4) {
      c = h.indexOf(k.charAt(r)), d = h.indexOf(k.charAt(r + 1)), f = h.indexOf(k.charAt(r + 2)), m = h.indexOf(k.charAt(r + 3)), g = c << 18 | d << 12 | f << 6 | m, c = g >>> 16 & 255, d = g >>> 8 & 255, g &= 255, n[r / 4] = String.fromCharCode(c, d, g), 64 == m && (n[r / 4] = String.fromCharCode(c, d)), 64 == f && (n[r / 4] = String.fromCharCode(c))
    }
    f = n.join("");
    return b ? e.decode(f) : f
  }}, e = {encode:function(a) {
    a = a.replace(/[\u0080-\u07ff]/g, function(a) {
      a = a.charCodeAt(0);
      return String.fromCharCode(192 | a >> 6, 128 | a & 63)
    });
    return a = a.replace(/[\u0800-\uffff]/g, function(a) {
      a = a.charCodeAt(0);
      return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63)
    })
  }, decode:function(a) {
    a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(a) {
      a = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) & 63;
      return String.fromCharCode(a)
    });
    return a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(a) {
      a = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63;
      return String.fromCharCode(a)
    })
  }}
}(jwplayer.utils), function(f) {
  f.events = {COMPLETE:"COMPLETE", ERROR:"ERROR", API_READY:"jwplayerAPIReady", JWPLAYER_READY:"jwplayerReady", JWPLAYER_FULLSCREEN:"jwplayerFullscreen", JWPLAYER_RESIZE:"jwplayerResize", JWPLAYER_ERROR:"jwplayerError", JWPLAYER_MEDIA_BEFOREPLAY:"jwplayerMediaBeforePlay", JWPLAYER_MEDIA_BEFORECOMPLETE:"jwplayerMediaBeforeComplete", JWPLAYER_COMPONENT_SHOW:"jwplayerComponentShow", JWPLAYER_COMPONENT_HIDE:"jwplayerComponentHide", JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer", JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull", 
  JWPLAYER_MEDIA_ERROR:"jwplayerMediaError", JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded", JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete", JWPLAYER_MEDIA_SEEK:"jwplayerMediaSeek", JWPLAYER_MEDIA_TIME:"jwplayerMediaTime", JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume", JWPLAYER_MEDIA_META:"jwplayerMediaMeta", JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute", JWPLAYER_MEDIA_LEVELS:"jwplayerMediaLevels", JWPLAYER_MEDIA_LEVEL_CHANGED:"jwplayerMediaLevelChanged", JWPLAYER_CAPTIONS_CHANGED:"jwplayerCaptionsChanged", 
  JWPLAYER_CAPTIONS_LIST:"jwplayerCaptionsList", JWPLAYER_PLAYER_STATE:"jwplayerPlayerState", state:{BUFFERING:"BUFFERING", IDLE:"IDLE", PAUSED:"PAUSED", PLAYING:"PLAYING"}, JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded", JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem", JWPLAYER_PLAYLIST_COMPLETE:"jwplayerPlaylistComplete", JWPLAYER_DISPLAY_CLICK:"jwplayerViewClick", JWPLAYER_CONTROLS:"jwplayerViewControls", JWPLAYER_INSTREAM_CLICK:"jwplayerInstreamClicked", JWPLAYER_INSTREAM_DESTROYED:"jwplayerInstreamDestroyed"}
}(jwplayer), function(f) {
  var a = jwplayer.utils;
  f.eventdispatcher = function(f, e) {
    var j, b;
    this.resetEventListeners = function() {
      j = {};
      b = []
    };
    this.resetEventListeners();
    this.addEventListener = function(b, d, g) {
      try {
        a.exists(j[b]) || (j[b] = []), "string" == a.typeOf(d) && (d = (new Function("return " + d))()), j[b].push({listener:d, count:g})
      }catch(e) {
        a.log("error", e)
      }
      return!1
    };
    this.removeEventListener = function(b, d) {
      if(j[b]) {
        try {
          for(var g = 0;g < j[b].length;g++) {
            if(j[b][g].listener.toString() == d.toString()) {
              j[b].splice(g, 1);
              break
            }
          }
        }catch(e) {
          a.log("error", e)
        }
        return!1
      }
    };
    this.addGlobalListener = function(c, d) {
      try {
        "string" == a.typeOf(c) && (c = (new Function("return " + c))()), b.push({listener:c, count:d})
      }catch(g) {
        a.log("error", g)
      }
      return!1
    };
    this.removeGlobalListener = function(c) {
      if(c) {
        try {
          for(var d = 0;d < b.length;d++) {
            if(b[d].listener.toString() == c.toString()) {
              b.splice(d, 1);
              break
            }
          }
        }catch(g) {
          a.log("error", g)
        }
        return!1
      }
    };
    this.sendEvent = function(c, d) {
      a.exists(d) || (d = {});
      a.extend(d, {id:f, version:jwplayer.version, type:c});
      e && a.log(c, d);
      if("undefined" != a.typeOf(j[c])) {
        for(var g = 0;g < j[c].length;g++) {
          try {
            j[c][g].listener(d)
          }catch(q) {
            a.log("There was an error while handling a listener: " + q.toString(), j[c][g].listener)
          }
          j[c][g] && (1 === j[c][g].count ? delete j[c][g] : 0 < j[c][g].count && (j[c][g].count -= 1))
        }
      }
      for(g = 0;g < b.length;g++) {
        try {
          b[g].listener(d)
        }catch(m) {
          a.log("There was an error while handling a listener: " + m.toString(), b[g].listener)
        }
        b[g] && (1 === b[g].count ? delete b[g] : 0 < b[g].count && (b[g].count -= 1))
      }
    }
  }
}(jwplayer.events), function(f) {
  var a = {}, l = {};
  f.plugins = function() {
  };
  f.plugins.loadPlugins = function(e, j) {
    l[e] = new f.plugins.pluginloader(new f.plugins.model(a), j);
    return l[e]
  };
  f.plugins.registerPlugin = function(e, j, b, c) {
    var d = f.utils.getPluginName(e);
    a[d] || (a[d] = new f.plugins.plugin(e));
    a[d].registerPlugin(e, j, b, c)
  }
}(jwplayer), function(f) {
  f.plugins.model = function(a) {
    this.addPlugin = function(l) {
      var e = f.utils.getPluginName(l);
      a[e] || (a[e] = new f.plugins.plugin(l));
      return a[e]
    };
    this.getPlugins = function() {
      return a
    }
  }
}(jwplayer), function(f) {
  var a = jwplayer.utils, l = jwplayer.events;
  f.pluginmodes = {FLASH:0, JAVASCRIPT:1, HYBRID:2};
  f.plugin = function(e) {
    function j() {
      switch(a.getPluginPathType(e)) {
        case a.pluginPathType.ABSOLUTE:
          return e;
        case a.pluginPathType.RELATIVE:
          return a.getAbsolutePath(e, window.location.href)
      }
    }
    function b() {
      n = setTimeout(function() {
        d = a.loaderstatus.COMPLETE;
        k.sendEvent(l.COMPLETE)
      }, 1E3)
    }
    function c() {
      d = a.loaderstatus.ERROR;
      k.sendEvent(l.ERROR)
    }
    var d = a.loaderstatus.NEW, g, q, m, n, k = new l.eventdispatcher;
    a.extend(this, k);
    this.load = function() {
      if(d == a.loaderstatus.NEW) {
        if(0 < e.lastIndexOf(".swf")) {
          g = e, d = a.loaderstatus.COMPLETE, k.sendEvent(l.COMPLETE)
        }else {
          if(a.getPluginPathType(e) == a.pluginPathType.CDN) {
            d = a.loaderstatus.COMPLETE, k.sendEvent(l.COMPLETE)
          }else {
            d = a.loaderstatus.LOADING;
            var h = new a.scriptloader(j());
            h.addEventListener(l.COMPLETE, b);
            h.addEventListener(l.ERROR, c);
            h.load()
          }
        }
      }
    };
    this.registerPlugin = function(b, c, e, j) {
      n && (clearTimeout(n), n = void 0);
      m = c;
      e && j ? (g = j, q = e) : "string" == typeof e ? g = e : "function" == typeof e ? q = e : !e && !j && (g = b);
      d = a.loaderstatus.COMPLETE;
      k.sendEvent(l.COMPLETE)
    };
    this.getStatus = function() {
      return d
    };
    this.getPluginName = function() {
      return a.getPluginName(e)
    };
    this.getFlashPath = function() {
      if(g) {
        switch(a.getPluginPathType(g)) {
          case a.pluginPathType.ABSOLUTE:
            return g;
          case a.pluginPathType.RELATIVE:
            return 0 < e.lastIndexOf(".swf") ? a.getAbsolutePath(g, window.location.href) : a.getAbsolutePath(g, j())
        }
      }
      return null
    };
    this.getJS = function() {
      return q
    };
    this.getTarget = function() {
      return m
    };
    this.getPluginmode = function() {
      if("undefined" != typeof g && "undefined" != typeof q) {
        return f.pluginmodes.HYBRID
      }
      if("undefined" != typeof g) {
        return f.pluginmodes.FLASH
      }
      if("undefined" != typeof q) {
        return f.pluginmodes.JAVASCRIPT
      }
    };
    this.getNewInstance = function(a, b, d) {
      return new q(a, b, d)
    };
    this.getURL = function() {
      return e
    }
  }
}(jwplayer.plugins), function(f) {
  var a = f.utils, l = f.events, e = a.foreach;
  f.plugins.pluginloader = function(j, b) {
    function c() {
      m ? h.sendEvent(l.ERROR, {message:n}) : q || (q = !0, g = a.loaderstatus.COMPLETE, h.sendEvent(l.COMPLETE))
    }
    function d() {
      k || c();
      if(!q && !m) {
        var b = 0, d = j.getPlugins();
        a.foreach(k, function(g) {
          g = a.getPluginName(g);
          var e = d[g];
          g = e.getJS();
          var h = e.getTarget(), e = e.getStatus();
          if(e == a.loaderstatus.LOADING || e == a.loaderstatus.NEW) {
            b++
          }else {
            if(g && (!h || parseFloat(h) > parseFloat(f.version))) {
              m = !0, n = "Incompatible player version", c()
            }
          }
        });
        0 == b && c()
      }
    }
    var g = a.loaderstatus.NEW, q = !1, m = !1, n, k = b, h = new l.eventdispatcher;
    a.extend(this, h);
    this.setupPlugins = function(b, d, c) {
      var g = {length:0, plugins:{}}, h = 0, f = {}, r = j.getPlugins();
      e(d.plugins, function(e, j) {
        var k = a.getPluginName(e), l = r[k], m = l.getFlashPath(), n = l.getJS(), q = l.getURL();
        m && (g.plugins[m] = a.extend({}, j), g.plugins[m].pluginmode = l.getPluginmode(), g.length++);
        try {
          if(n && d.plugins && d.plugins[q]) {
            var v = document.createElement("div");
            v.id = b.id + "_" + k;
            v.style.position = "absolute";
            v.style.top = 0;
            v.style.zIndex = h + 10;
            f[k] = l.getNewInstance(b, a.extend({}, d.plugins[q]), v);
            h++;
            b.onReady(c(f[k], v, !0));
            b.onResize(c(f[k], v))
          }
        }catch(B) {
          a.log("ERROR: Failed to load " + k + ".")
        }
      });
      b.plugins = f;
      return g
    };
    this.load = function() {
      if(!(a.exists(b) && "object" != a.typeOf(b))) {
        g = a.loaderstatus.LOADING;
        e(b, function(b) {
          a.exists(b) && (b = j.addPlugin(b), b.addEventListener(l.COMPLETE, d), b.addEventListener(l.ERROR, r))
        });
        var c = j.getPlugins();
        e(c, function(a, b) {
          b.load()
        })
      }
      d()
    };
    var r = this.pluginFailed = function() {
      m || (m = !0, n = "File not found", c())
    };
    this.getStatus = function() {
      return g
    }
  }
}(jwplayer), function(f) {
  f.playlist = function(a) {
    var l = [];
    if("array" == f.utils.typeOf(a)) {
      for(var e = 0;e < a.length;e++) {
        l.push(new f.playlist.item(a[e]))
      }
    }else {
      l.push(new f.playlist.item(a))
    }
    return l
  }
}(jwplayer), function(f) {
  var a = f.item = function(l) {
    var e = jwplayer.utils, j = e.extend({}, a.defaults, l);
    j.tracks = e.exists(l.tracks) ? l.tracks : [];
    0 == j.sources.length && (j.sources = [new f.source(j)]);
    for(var b = 0;b < j.sources.length;b++) {
      var c = j.sources[b]["default"];
      j.sources[b]["default"] = c ? "true" == c.toString() : !1;
      j.sources[b] = new f.source(j.sources[b])
    }
    if(j.captions && !e.exists(l.tracks)) {
      for(l = 0;l < j.captions.length;l++) {

        j.tracks.push(j.captions[l])
      }
      delete j.captions
    }
    for(b = 0;b < j.tracks.length;b++) {
      j.tracks[b] = new f.track(j.tracks[b])
    }
    return j
  };
  a.defaults = {description:"", image:"", mediaid:"", title:"", sources:[], tracks:[]}
}(jwplayer.playlist), function(f) {
  var a = jwplayer.utils, l = {file:void 0, label:void 0, type:void 0, "default":void 0};
  f.source = function(e) {
    var j = a.extend({}, l);
    a.foreach(l, function(b) {
      a.exists(e[b]) && (j[b] = e[b], delete e[b])
    });
    j.type && 0 < j.type.indexOf("/") && (j.type = a.extensionmap.mimeType(j.type));
    "m3u8" == j.type && (j.type = "hls");
    "smil" == j.type && (j.type = "rtmp");
    return j
  }
}(jwplayer.playlist), function(f) {
  var a = jwplayer.utils, l = {file:void 0, label:void 0, kind:"captions", "default":!1};
  f.track = function(e) {
    var j = a.extend({}, l);
    e || (e = {});
    a.foreach(l, function(b) {
      a.exists(e[b]) && (j[b] = e[b], delete e[b])
    });
    return j
  }
}(jwplayer.playlist), function(f) {
  var a = f.utils, l = f.events, e = document, j = f.embed = function(b) {
    function c(b, d) {
      a.foreach(d, function(a, d) {
        "function" == typeof b[a] && b[a].call(b, d)
      })
    }
    function d(a) {
      q(n, t + a.message)
    }
    function g() {
      q(n, t + "No playable sources found")
    }
    function q(b, d) {
      if(m.fallback) {
        var c = b.style;
        c.backgroundColor = "#000";
        c.color = "#FFF";
        c.width = a.styleDimension(m.width);
        c.height = a.styleDimension(m.height);
        c.display = "table";
        c.opacity = 1;
        var c = document.createElement("p"), g = c.style;
        g.verticalAlign = "middle";
        g.textAlign = "center";
        g.display = "table-cell";
        g.font = "15px/20px Arial, Helvetica, sans-serif";
        c.innerHTML = d.replace(":", ":<br>");
        b.innerHTML = "";
        b.appendChild(c)
      }
    }
    var m = new j.config(b.config), n, k, h, r = m.width, p = m.height, t = "Error loading player: ", s = f.plugins.loadPlugins(b.id, m.plugins);
    m.fallbackDiv && (h = m.fallbackDiv, delete m.fallbackDiv);
    m.id = b.id;
    k = e.getElementById(b.id);
    m.aspectratio ? b.config.aspectratio = m.aspectratio : delete b.config.aspectratio;
    n = e.createElement("div");
    n.id = k.id;
    n.style.width = 0 < r.toString().indexOf("%") ? r : r + "px";
    n.style.height = 0 < p.toString().indexOf("%") ? p : p + "px";
    k.parentNode.replaceChild(n, k);
    f.embed.errorScreen = q;
    s.addEventListener(l.COMPLETE, function() {
      if("array" == a.typeOf(m.playlist) && 2 > m.playlist.length && (0 == m.playlist.length || !m.playlist[0].sources || 0 == m.playlist[0].sources.length)) {
        g()
      }else {
        if(s.getStatus() == a.loaderstatus.COMPLETE) {
          for(var e = 0;e < m.modes.length;e++) {
            if(m.modes[e].type && j[m.modes[e].type]) {
              var f = a.extend({}, m), r = new j[m.modes[e].type](n, m.modes[e], f, s, b);
              if(r.supportsConfig()) {
                return r.addEventListener(l.ERROR, d), r.embed(), c(b, f.events), b
              }
            }
          }
          m.fallback ? (a.log("No suitable players found and fallback enabled"), new j.download(n, m, g)) : (a.log("No suitable players found and fallback disabled"), n.parentNode.replaceChild(h, n))
        }
      }
    });
    s.addEventListener(l.ERROR, function(a) {
      q(n, "Could not load plugins: " + a.message)
    });
    s.load();
    return b
  }
}(jwplayer), function(f) {
  function a(a) {
    if(a.playlist) {
      for(var c = 0;c < a.playlist.length;c++) {
        a.playlist[c] = new j(a.playlist[c])
      }
    }else {
      var d = {};
      e.foreach(j.defaults, function(c) {
        l(a, d, c)
      });
      d.sources || (a.levels ? (d.sources = a.levels, delete a.levels) : (c = {}, l(a, c, "file"), l(a, c, "type"), d.sources = c.file ? [c] : []));
      a.playlist = [new j(d)]
    }
  }
  function l(a, c, d) {
    e.exists(a[d]) && (c[d] = a[d], delete a[d])
  }
  var e = f.utils, j = f.playlist.item;
  (f.embed.config = function(b) {
    var c = {fallback:!0, height:270, primary:"html5", width:480, base:b.base ? b.base : e.getScriptPath("jwplayer.js"), aspectratio:""};
    b = e.extend(c, f.defaults, b);
    var c = {type:"html5", src:b.base + "jwplayer.html5.js"}, d = {type:"flash", src:b.base + "jwplayer.flash.swf"};
    b.modes = "flash" == b.primary ? [d, c] : [c, d];
    b.listbar && (b.playlistsize = b.listbar.size, b.playlistposition = b.listbar.position);
    b.flashplayer && (d.src = b.flashplayer);
    b.html5player && (c.src = b.html5player);
    a(b);
    d = b.aspectratio;
    if("string" != typeof d || !e.exists(d)) {
      c = 0
    }else {
      var g = d.indexOf(":");
      -1 == g ? c = 0 : (c = parseFloat(d.substr(0, g)), d = parseFloat(d.substr(g + 1)), c = 0 >= c || 0 >= d ? 0 : 100 * (d / c) + "%")
    }
    -1 == b.width.toString().indexOf("%") ? delete b.aspectratio : c ? b.aspectratio = c : delete b.aspectratio;
    return b
  }).addConfig = function(b, c) {
    a(c);
    return e.extend(b, c)
  }
}(jwplayer), function(f) {
  var a = f.utils, l = document;
  f.embed.download = function(e, f, b) {
    function c(b, d) {
      for(var c = l.querySelectorAll(b), g = 0;g < c.length;g++) {
        a.foreach(d, function(a, b) {
          c[g].style[a] = b
        })
      }
    }
    function d(a, b, d) {
      a = l.createElement(a);
      b && (a.className = "jwdownload" + b);
      d && d.appendChild(a);
      return a
    }
    var g = a.extend({}, f), q = g.width ? g.width : 480, m = g.height ? g.height : 320, n;
    f = f.logo ? f.logo : {prefix:a.repo(), file:"logo.png", margin:10};
    var k, h, r, g = g.playlist, p, t = ["mp4", "aac", "mp3"];
    if(g && g.length) {
      p = g[0];
      n = p.sources;
      for(g = 0;g < n.length;g++) {
        var s = n[g], u = s.type ? s.type : a.extensionmap.extType(a.extension(s.file));
        s.file && a.foreach(t, function(b) {
          u == t[b] ? (k = s.file, h = p.image) : a.isYouTube(s.file) && (r = s.file)
        })
      }
      k ? (n = k, b = h, e && (g = d("a", "display", e), d("div", "icon", g), d("div", "logo", g), n && g.setAttribute("href", a.getAbsolutePath(n))), g = "#" + e.id + " .jwdownload", e.style.width = "", e.style.height = "", c(g + "display", {width:a.styleDimension(Math.max(320, q)), height:a.styleDimension(Math.max(180, m)), background:"black center no-repeat " + (b ? "url(" + b + ")" : ""), backgroundSize:"contain", position:"relative", border:"none", display:"block"}), c(g + "display div", {position:"absolute", 
      width:"100%", height:"100%"}), c(g + "logo", {top:f.margin + "px", right:f.margin + "px", background:"top right no-repeat url(" + f.prefix + f.file + ")"}), c(g + "icon", {background:"center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"})) : 
      r ? (f = r, e = d("embed", "", e), e.src = "http://www.youtube.com/v/" + /v[=\/](\w*)|\/(\w+)$|^(\w+)$/i.exec(f).slice(1).join(""), e.type = "application/x-shockwave-flash", e.width = q, e.height = m) : b()
    }

  }
}(jwplayer), function(f) {
  var a = f.utils, l = f.events, e = {};
  (f.embed.flash = function(j, b, c, d, g) {
    function q(a, b, d) {
      var c = document.createElement("param");
      c.setAttribute("name", b);
      c.setAttribute("value", d);
      a.appendChild(c)
    }
    function m(a, b, d) {
      return function() {
        try {
          d && document.getElementById(g.id + "_wrapper").appendChild(b);
          var c = document.getElementById(g.id).getPluginConfig("display");
          "function" == typeof a.resize && a.resize(c.width, c.height);
          b.style.left = c.x;
          b.style.top = c.h
        }catch(e) {
        }
      }
    }
    function n(b) {
      if(!b) {
        return{}
      }
      var d = {}, c = [];
      a.foreach(b, function(b, g) {
        var e = a.getPluginName(b);
        c.push(b);
        a.foreach(g, function(a, b) {
          d[e + "." + a] = b
        })
      });
      d.plugins = c.join(",");
      return d
    }
    var k = new f.events.eventdispatcher, h = a.flashVersion();
    a.extend(this, k);
    this.embed = function() {
      c.id = g.id;
      if(10 > h) {
        return k.sendEvent(l.ERROR, {message:"Flash version must be 10.0 or greater"}), !1
      }
      var f, p, t = g.config.listbar, s = a.extend({}, c);
      if(j.id + "_wrapper" == j.parentNode.id) {
        f = document.getElementById(j.id + "_wrapper")
      }else {
        f = document.createElement("div");
        p = document.createElement("div");
        p.style.display = "none";
        p.id = j.id + "_aspect";
        f.id = j.id + "_wrapper";
        f.style.position = "relative";
        f.style.display = "block";
        f.style.width = a.styleDimension(s.width);
        f.style.height = a.styleDimension(s.height);
        if(g.config.aspectratio) {
          var u = parseFloat(g.config.aspectratio);
          p.style.display = "block";
          p.style.marginTop = g.config.aspectratio;
          f.style.height = "auto";
          f.style.display = "inline-block";
          t && ("bottom" == t.position ? p.style.paddingBottom = t.size + "px" : "right" == t.position && (p.style.marginBottom = -1 * t.size * (u / 100) + "px"))
        }
        j.parentNode.replaceChild(f, j);
        f.appendChild(j);
        f.appendChild(p)
      }
      f = d.setupPlugins(g, s, m);
      0 < f.length ? a.extend(s, n(f.plugins)) : delete s.plugins;
      "undefined" != typeof s["dock.position"] && "false" == s["dock.position"].toString().toLowerCase() && (s.dock = s["dock.position"], delete s["dock.position"]);
      f = s.wmode ? s.wmode : s.height && 40 >= s.height ? "transparent" : "opaque";
      p = "height width modes events primary base fallback volume".split(" ");
      for(t = 0;t < p.length;t++) {
        delete s[p[t]]
      }
      p = a.getCookies();
      a.foreach(p, function(a, b) {
        "undefined" == typeof s[a] && (s[a] = b)
      });
      p = window.location.href.split("/");
      p.splice(p.length - 1, 1);
      p = p.join("/");
      s.base = p + "/";
      e[j.id] = s;
      a.isIE() ? (p = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%"id="' + j.id + '" name="' + j.id + '" tabindex=0"">', p += '<param name="movie" value="' + b.src + '">', p += '<param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always">', p += '<param name="seamlesstabbing" value="true">', p += '<param name="wmode" value="' + f + '">', p += '<param name="bgcolor" value="#000000">', p += "</object>", j.outerHTML = p, f = 
      document.getElementById(j.id)) : (p = document.createElement("object"), p.setAttribute("type", "application/x-shockwave-flash"), p.setAttribute("data", b.src), p.setAttribute("width", "100%"), p.setAttribute("height", "100%"), p.setAttribute("bgcolor", "#000000"), p.setAttribute("id", j.id), p.setAttribute("name", j.id), p.setAttribute("tabindex", 0), q(p, "allowfullscreen", "true"), q(p, "allowscriptaccess", "always"), q(p, "seamlesstabbing", "true"), q(p, "wmode", f), j.parentNode.replaceChild(p, 
      j), f = p);
      g.config.aspectratio && (f.style.position = "absolute");
      g.container = f;
      g.setPlayer(f, "flash")
    };
    this.supportsConfig = function() {
      if(h) {
        if(c) {
          if("string" == a.typeOf(c.playlist)) {
            return!0
          }
          try {
            var b = c.playlist[0].sources;
            if("undefined" == typeof b) {
              return!0
            }
            for(var d = 0;d < b.length;d++) {
              var g;
              if(g = b[d].file) {
                var e = b[d].file, f = b[d].type;
                if(a.isYouTube(e) || a.isRtmp(e, f) || "hls" == f) {
                  g = !0
                }else {
                  var j = a.extensionmap[f ? f : a.extension(e)];
                  g = !j ? !1 : !!j.flash
                }
              }
              if(g) {
                return!0
              }
            }
          }catch(k) {
          }
        }else {
          return!0
        }
      }
      return!1
    }
  }).getVars = function(a) {
    return e[a]
  }
}(jwplayer), function(f) {
  var a = f.utils, l = a.extensionmap, e = f.events;
  f.embed.html5 = function(j, b, c, d, g) {
    function q(a, b, d) {
      return function() {
        try {
          var c = document.querySelector("#" + j.id + " .jwmain");
          d && c.appendChild(b);
          "function" == typeof a.resize && (a.resize(c.clientWidth, c.clientHeight), setTimeout(function() {
            a.resize(c.clientWidth, c.clientHeight)
          }, 400));
          b.left = c.style.left;
          b.top = c.style.top
        }catch(g) {
        }
      }
    }
    function m(a) {
      n.sendEvent(a.type, {message:"HTML5 player not found"})
    }
    var n = this, k = new e.eventdispatcher;
    a.extend(n, k);
    n.embed = function() {
      if(f.html5) {
        d.setupPlugins(g, c, q);
        j.innerHTML = "";
        var h = f.utils.extend({}, c);
        delete h.volume;
        h = new f.html5.player(h);
        g.container = document.getElementById(g.id);
        g.setPlayer(h, "html5")
      }else {
        h = new a.scriptloader(b.src), h.addEventListener(e.ERROR, m), h.addEventListener(e.COMPLETE, n.embed), h.load()
      }
    };
    n.supportsConfig = function() {
      if(f.vid.canPlayType) {
        try {
          if("string" == a.typeOf(c.playlist)) {
            return!0
          }
          for(var b = c.playlist[0].sources, d = 0;d < b.length;d++) {
            var g;
            var e = b[d].file, j = b[d].type;
            if(null !== navigator.userAgent.match(/BlackBerry/i) || a.isAndroid() && ("m3u" == a.extension(e) || "m3u8" == a.extension(e)) || a.isRtmp(e, j)) {
              g = !1
            }else {
              var k = l[j ? j : a.extension(e)], m;
              if(!k || k.flash && !k.html5) {
                m = !1
              }else {
                var n = k.html5, q = f.vid;
                if(n) {
                  try {
                    m = q.canPlayType(n) ? !0 : !1
                  }catch(z) {
                    m = !1
                  }
                }else {
                  m = !0
                }
              }
              g = m
            }
            if(g) {
              return!0
            }
          }
        }catch(A) {
        }
      }
      return!1
    }
  }
}(jwplayer), function(f) {
  var a = f.embed, l = f.utils, e = l.extend(function(e) {
    var b = l.repo(), c = l.extend({}, f.defaults), d = l.extend({}, c, e.config), g = e.config, q = d.plugins, m = d.analytics, n = b + "jwpsrv.js", k = b + "sharing.js", h = b + "related.js", r = b + "gapro.js", c = f.key ? f.key : c.key, p = (new f.utils.key(c)).edition(), q = q ? q : {};
    "ads" == p && d.advertising && (d.advertising.client.match(".js$|.swf$") ? q[d.advertising.client] = d.advertising : q[b + d.advertising.client + ".js"] = d.advertising);
    delete g.advertising;
    g.key = c;
    d.analytics && d.analytics.client && d.analytics.client.match(".js$|.swf$") && (n = d.analytics.client);
    delete g.analytics;
    if("free" == p || !m || !1 !== m.enabled) {
      q[n] = m ? m : {}
    }
    delete q.sharing;
    delete q.related;
    if("premium" == p || "ads" == p) {
      d.sharing && (d.sharing.client && d.sharing.client.match(".js$|.swf$") && (k = d.sharing.client), q[k] = d.sharing), d.related && (d.related.client && d.related.client.match(".js$|.swf$") && (h = d.related.client), q[h] = d.related), d.ga && (d.ga.client && d.ga.client.match(".js$|.swf$") && (r = d.ga.client), q[r] = d.ga), d.skin && (g.skin = d.skin.replace(/^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i, l.repo() + "skins/$1.xml"))
    }
    g.plugins = q;
    return new a(e)
  }, a);
  f.embed = e
}(jwplayer), function(f) {
  var a = [], l = f.utils, e = f.events, j = e.state, b = document, c = f.api = function(a) {
    function g(a, b) {
      return function(d) {
        return b(a, d)
      }
    }
    function q(a, b) {
      p[a] || (p[a] = [], n(e.JWPLAYER_PLAYER_STATE, function(b) {
        var d = b.newstate;
        b = b.oldstate;
        if(d == a) {
          var c = p[d];
          if(c) {
            for(var g = 0;g < c.length;g++) {
              "function" == typeof c[g] && c[g].call(this, {oldstate:b, newstate:d})
            }
          }
        }
      }));
      p[a].push(b);
      return h
    }
    function m(a, b) {
      try {
        a.jwAddEventListener(b, 'function(dat) { jwplayer("' + h.id + '").dispatchEvent("' + b + '", dat); }')
      }catch(d) {
        l.log("Could not add internal listener")
      }
    }
    function n(a, b) {
      r[a] || (r[a] = [], t && s && m(t, a));
      r[a].push(b);
      return h
    }
    function k() {
      if(s) {
        for(var a = arguments[0], b = [], d = 1;d < arguments.length;d++) {
          b.push(arguments[d])
        }
        if("undefined" != typeof t && "function" == typeof t[a]) {
          switch(b.length) {
            case 4:
              return t[a](b[0], b[1], b[2], b[3]);
            case 3:
              return t[a](b[0], b[1], b[2]);
            case 2:
              return t[a](b[0], b[1]);
            case 1:
              return t[a](b[0]);
            default:
              return t[a]()
          }
        }
        return null
      }
      u.push(arguments)
    }
    var h = this, r = {}, p = {}, t = void 0, s = !1, u = [], w = void 0, x = {}, y = {};
    h.container = a;
    h.id = a.id;
    h.getBuffer = function() {
      return k("jwGetBuffer")
    };
    h.getContainer = function() {
      return h.container
    };
    h.addButton = function(a, b, d, c) {
      try {
        y[c] = d, k("jwDockAddButton", a, b, "jwplayer('" + h.id + "').callback('" + c + "')", c)
      }catch(g) {
        l.log("Could not add dock button" + g.message)
      }
    };
    h.removeButton = function(a) {
      k("jwDockRemoveButton", a)
    };
    h.callback = function(a) {
      if(y[a]) {
        y[a]()
      }
    };
    h.forceState = function(a) {
      k("jwForceState", a);
      return h
    };
    h.releaseState = function() {
      return k("jwReleaseState")
    };
    h.getDuration = function() {
      return k("jwGetDuration")
    };
    h.getFullscreen = function() {
      return k("jwGetFullscreen")
    };
    h.getStretching = function() {
      return k("jwGetStretching")
    };
    h.getHeight = function() {
      return k("jwGetHeight")
    };
    h.getLockState = function() {
      return k("jwGetLockState")
    };
    h.getMeta = function() {
      return h.getItemMeta()
    };
    h.getMute = function() {
      return k("jwGetMute")
    };
    h.getPlaylist = function() {
      var a = k("jwGetPlaylist");
      "flash" == h.renderingMode && l.deepReplaceKeyName(a, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]);
      return a
    };
    h.getPlaylistItem = function(a) {
      l.exists(a) || (a = h.getCurrentItem());
      return h.getPlaylist()[a]
    };
    h.getPosition = function() {
      return k("jwGetPosition")
    };
    h.getRenderingMode = function() {
      return h.renderingMode
    };
    h.getState = function() {
      return k("jwGetState")
    };
    h.getVolume = function() {
      return k("jwGetVolume")
    };
    h.getWidth = function() {
      return k("jwGetWidth")
    };
    h.setFullscreen = function(a) {
      l.exists(a) ? k("jwSetFullscreen", a) : k("jwSetFullscreen", !k("jwGetFullscreen"));
      return h
    };
    h.setStretching = function(a) {
      k("jwSetStretching", a);
      return h
    };
    h.setMute = function(a) {
      l.exists(a) ? k("jwSetMute", a) : k("jwSetMute", !k("jwGetMute"));
      return h
    };
    h.lock = function() {
      return h
    };
    h.unlock = function() {
      return h
    };
    h.load = function(a) {
      k("jwLoad", a);
      return h
    };
    h.playlistItem = function(a) {
      k("jwPlaylistItem", parseInt(a));
      return h
    };
    h.playlistPrev = function() {
      k("jwPlaylistPrev");
      return h
    };
    h.playlistNext = function() {
      k("jwPlaylistNext");
      return h
    };
    h.resize = function(a, d) {
      if("flash" != h.renderingMode) {
        var c = document.getElementById(h.id);
        c.className = c.className.replace(/\s+aspectMode/, "");
        c.style.display = "block";
        k("jwResize", a, d)
      }else {
        var c = b.getElementById(h.id + "_wrapper"), g = b.getElementById(h.id + "_aspect");
        g && (g.style.display = "none");
        c && (c.style.display = "block", c.style.width = l.styleDimension(a), c.style.height = l.styleDimension(d))
      }
      return h
    };
    h.play = function(a) {
      "undefined" == typeof a ? (a = h.getState(), a == j.PLAYING || a == j.BUFFERING ? k("jwPause") : k("jwPlay")) : k("jwPlay", a);
      return h
    };
    h.pause = function(a) {
      "undefined" == typeof a ? (a = h.getState(), a == j.PLAYING || a == j.BUFFERING ? k("jwPause") : k("jwPlay")) : k("jwPause", a);
      return h
    };
    h.stop = function() {
      k("jwStop");
      return h
    };
    h.seek = function(a) {
      k("jwSeek", a);
      return h
    };
    h.setVolume = function(a) {
      k("jwSetVolume", a);
      return h
    };
    h.loadInstream = function(a, b) {
      return w = new c.instream(this, t, a, b)
    };
    h.getQualityLevels = function() {
      return k("jwGetQualityLevels")
    };
    h.getCurrentQuality = function() {
      return k("jwGetCurrentQuality")
    };
    h.setCurrentQuality = function(a) {
      k("jwSetCurrentQuality", a)
    };
    h.getCaptionsList = function() {
      return k("jwGetCaptionsList")
    };
    h.getCurrentCaptions = function() {
      return k("jwGetCurrentCaptions")
    };
    h.setCurrentCaptions = function(a) {
      k("jwSetCurrentCaptions", a)
    };
		h.getCurrentCaption = function() { // caption hack
      return k("jwGetCurrentCaption")
    };
		h.getCaptionList = function() { // caption hack
      return k("jwGetCaptionList")
    };
    h.getControls = function() {
      return k("jwGetControls")
    };
    h.getSafeRegion = function() {
      return k("jwGetSafeRegion")
    };
    h.setControls = function(a) {
      k("jwSetControls", a)
    };
    h.destroyPlayer = function() {
      k("jwPlayerDestroy")
    };
		
    var z = {onBufferChange:e.JWPLAYER_MEDIA_BUFFER, onBufferFull:e.JWPLAYER_MEDIA_BUFFER_FULL, onError:e.JWPLAYER_ERROR, onFullscreen:e.JWPLAYER_FULLSCREEN, onMeta:e.JWPLAYER_MEDIA_META, onMute:e.JWPLAYER_MEDIA_MUTE, onPlaylist:e.JWPLAYER_PLAYLIST_LOADED, onPlaylistItem:e.JWPLAYER_PLAYLIST_ITEM, onPlaylistComplete:e.JWPLAYER_PLAYLIST_COMPLETE, onReady:e.API_READY, onResize:e.JWPLAYER_RESIZE, onComplete:e.JWPLAYER_MEDIA_COMPLETE, onSeek:e.JWPLAYER_MEDIA_SEEK, onTime:e.JWPLAYER_MEDIA_TIME, onVolume:e.JWPLAYER_MEDIA_VOLUME, 
    onBeforePlay:e.JWPLAYER_MEDIA_BEFOREPLAY, onBeforeComplete:e.JWPLAYER_MEDIA_BEFORECOMPLETE, onDisplayClick:e.JWPLAYER_DISPLAY_CLICK, onControls:e.JWPLAYER_CONTROLS, onQualityLevels:e.JWPLAYER_MEDIA_LEVELS, onQualityChange:e.JWPLAYER_MEDIA_LEVEL_CHANGED, onCaptionsList:e.JWPLAYER_CAPTIONS_LIST, onCaptionsChange:e.JWPLAYER_CAPTIONS_CHANGED};
    l.foreach(z, function(a) {
      h[a] = g(z[a], n)
    });
    var A = {onBuffer:j.BUFFERING, onPause:j.PAUSED, onPlay:j.PLAYING, onIdle:j.IDLE};
    l.foreach(A, function(a) {
      h[a] = g(A[a], q)
    });
    h.remove = function() {
      if(!s) {
        throw"Cannot call remove() before player is ready";
      }
      u = [];
      c.destroyPlayer(this.id)
    };
    h.setup = function(a) {
      if(f.embed) {
        var d = b.getElementById(h.id);
        d && (a.fallbackDiv = d);
        d = h;
        u = [];
        c.destroyPlayer(d.id);
        d = f(h.id);
        d.config = a;
        return new f.embed(d)
      }
      return h
    };
    h.registerPlugin = function(a, b, d, c) {
      f.plugins.registerPlugin(a, b, d, c)
    };
    h.setPlayer = function(a, b) {
      t = a;
      h.renderingMode = b
    };
    h.detachMedia = function() {
      if("html5" == h.renderingMode) {
        return k("jwDetachMedia")
      }
    };
    h.attachMedia = function(a) {
      if("html5" == h.renderingMode) {
        return k("jwAttachMedia", a)
      }
    };
    h.dispatchEvent = function(a, b) {
      if(r[a]) {
        for(var d = l.translateEventResponse(a, b), c = 0;c < r[a].length;c++) {
          if("function" == typeof r[a][c]) {
            try {
              a == e.JWPLAYER_PLAYLIST_LOADED && l.deepReplaceKeyName(d.playlist, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"]), r[a][c].call(this, d)
            }catch(g) {
              l.log("There was an error calling back an event handler")
            }
          }
        }
      }
    };
    h.dispatchInstreamEvent = function(a) {
      w && w.dispatchEvent(a, arguments)
    };
    h.callInternal = k;
    h.playerReady = function(a) {
      s = !0;
      t || h.setPlayer(b.getElementById(a.id));
      h.container = b.getElementById(h.id);
      l.foreach(r, function(a) {
        m(t, a)
      });
      n(e.JWPLAYER_PLAYLIST_ITEM, function() {
        x = {}
      });
      n(e.JWPLAYER_MEDIA_META, function(a) {
        l.extend(x, a.metadata)
      });
      for(h.dispatchEvent(e.API_READY);0 < u.length;) {
        k.apply(this, u.shift())
      }
    };
    h.getItemMeta = function() {
      return x
    };
    h.getCurrentItem = function() {
      return k("jwGetPlaylistIndex")
    };
    return h
  };
  c.selectPlayer = function(d) {
    var g;
    l.exists(d) || (d = 0);
    d.nodeType ? g = d : "string" == typeof d && (g = b.getElementById(d));
    return g ? (d = c.playerById(g.id)) ? d : c.addPlayer(new c(g)) : "number" == typeof d ? a[d] : null
  };
  c.playerById = function(b) {
    for(var c = 0;c < a.length;c++) {
      if(a[c].id == b) {
        return a[c]
      }
    }
    return null
  };
  c.addPlayer = function(b) {
    for(var c = 0;c < a.length;c++) {
      if(a[c] == b) {
        return b
      }
    }
    a.push(b);
    return b
  };
  c.destroyPlayer = function(d) {
    for(var c = -1, e, f = 0;f < a.length;f++) {
      a[f].id == d && (c = f, e = a[f])
    }
    0 <= c && (d = e.id, f = b.getElementById(d + ("flash" == e.renderingMode ? "_wrapper" : "")), l.clearCss && l.clearCss("#" + d), f && ("html5" == e.renderingMode && e.destroyPlayer(), e = b.createElement("div"), e.id = d, f.parentNode.replaceChild(e, f)), a.splice(c, 1));
    return null
  };
  f.playerReady = function(a) {
    var b = f.api.playerById(a.id);
    b ? b.playerReady(a) : f.api.selectPlayer(a.id).playerReady(a)
  }
}(jwplayer), function(f) {
  var a = f.events, l = f.utils, e = a.state;
  f.api.instream = function(f, b, c, d) {
    function g(a, b) {
      k[a] || (k[a] = [], n.jwInstreamAddEventListener(a, 'function(dat) { jwplayer("' + m.id + '").dispatchInstreamEvent("' + a + '", dat); }'));
      k[a].push(b);
      return this
    }
    function q(b, c) {
      h[b] || (h[b] = [], g(a.JWPLAYER_PLAYER_STATE, function(a) {
        var c = a.newstate, d = a.oldstate;
        if(c == b) {
          var e = h[c];
          if(e) {
            for(var f = 0;f < e.length;f++) {
              "function" == typeof e[f] && e[f].call(this, {oldstate:d, newstate:c, type:a.type})
            }
          }
        }
      }));
      h[b].push(c);
      return this
    }
    var m = f, n = b, k = {}, h = {};
    this.dispatchEvent = function(a, b) {
      if(k[a]) {
        for(var c = l.translateEventResponse(a, b[1]), d = 0;d < k[a].length;d++) {
          "function" == typeof k[a][d] && k[a][d].call(this, c)
        }
      }
    };
    this.onError = function(b) {
      return g(a.JWPLAYER_ERROR, b)
    };
    this.onFullscreen = function(b) {
      return g(a.JWPLAYER_FULLSCREEN, b)
    };
    this.onMeta = function(b) {
      return g(a.JWPLAYER_MEDIA_META, b)
    };
    this.onMute = function(b) {
      return g(a.JWPLAYER_MEDIA_MUTE, b)
    };
    this.onComplete = function(b) {
      return g(a.JWPLAYER_MEDIA_COMPLETE, b)
    };
    this.onTime = function(b) {
      return g(a.JWPLAYER_MEDIA_TIME, b)
    };
    this.onBuffer = function(a) {
      return q(e.BUFFERING, a)
    };
    this.onPause = function(a) {
      return q(e.PAUSED, a)
    };
    this.onPlay = function(a) {
      return q(e.PLAYING, a)
    };
    this.onIdle = function(a) {
      return q(e.IDLE, a)
    };
    this.onClick = function(b) {
      return g(a.JWPLAYER_INSTREAM_CLICK, b)
    };
    this.onInstreamDestroyed = function(b) {
      return g(a.JWPLAYER_INSTREAM_DESTROYED, b)
    };
    this.play = function(a) {
      n.jwInstreamPlay(a)
    };
    this.pause = function(a) {
      n.jwInstreamPause(a)
    };
    this.destroy = function() {
      n.jwInstreamDestroy()
    };
    m.callInternal("jwLoadInstream", c, d ? d : {})
  }
}(jwplayer), function(f) {
  var a = f.api, l = a.selectPlayer;
  a.selectPlayer = function(a) {
    return(a = l(a)) ? a : {registerPlugin:function(a, b, c) {
      f.plugins.registerPlugin(a, b, c)
    }}
  }
}(jwplayer));
