(function(f) {
  f.html5 = {};
  f.html5.version = "6.4.3359"
})(jwplayer);
(function(f) {
  function h(a) {
    return function() {
      a("Error loading file")
    }
  }
  function e(a, b, c, e) {
    return function() {
      try {
        var g = a.responseXML;
        if(g && g.firstChild) {
          return c(a)
        }
      }catch(d) {
      }
      (g = f.parseXML(a.responseText)) && g.firstChild ? (a = f.extend({}, a, {responseXML:g}), c(a)) : e && e(a.responseText ? "Invalid XML" : b)
    }
  }
  var d = window;
  f.serialize = function(a) {
    return null == a ? null : "true" == a.toString().toLowerCase() ? !0 : "false" == a.toString().toLowerCase() ? !1 : isNaN(Number(a)) || 5 < a.length || 0 == a.length ? a : Number(a)
  };
  f.filterSources = function(a) {
    var b, c, e = f.extensionmap;
    if(a) {
      c = [];
      for(var g = 0;g < a.length;g++) {
        var d = a[g].type, j = a[g].file;
        d || (d = e.extType(f.extension(j)), a[g].type = d);
        f.canPlayHTML5(d) && (b || (b = d), d == b && c.push(f.extend({}, a[g])))
      }
    }
    return c
  };
  f.canPlayHTML5 = function(a) {
    a = f.extensionmap.types[a];
    return!!a && jwplayer.vid.canPlayType(a)
  };
  f.ajax = function(a, b, c) {
    var k;
    0 < a.indexOf("#") && (a = a.replace(/#.*$/, ""));
    var g;
    g = (g = a) && 0 <= g.indexOf("://") && g.split("/")[2] != d.location.href.split("/")[2] ? !0 : !1;
    if(g && f.exists(d.XDomainRequest)) {
      k = new XDomainRequest, k.onload = e(k, a, b, c), k.onerror = h(c, a, k)
    }else {
      if(f.exists(d.XMLHttpRequest)) {
        var p = k = new XMLHttpRequest, j = a;
        k.onreadystatechange = function() {
          if(4 === p.readyState) {
            switch(p.status) {
              case 200:
                e(p, j, b, c)();
                break;
              case 404:
                c("File not found")
            }
          }
        };
        k.onerror = h(c, a)
      }else {
        c && c()
      }
    }
    try {
      k.open("GET", a, !0), k.send(null)
    }catch(l) {
      c && c(a)
    }
    return k
  };
  f.parseXML = function(a) {
    try {
      var b;
      if(d.DOMParser) {
        b = (new DOMParser).parseFromString(a, "text/xml");
        try {
          if("parsererror" == b.childNodes[0].firstChild.nodeName) {
            return
          }
        }catch(c) {
        }
      }else {
        b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)
      }
      return b
    }catch(e) {
    }
  };
  f.parseDimension = function(a) {
    if("string" == typeof a) {
      if("" === a) {
        return 0
      }
      if(!(-1 < a.lastIndexOf("%"))) {
        return parseInt(a.replace("px", ""), 10)
      }
    }
    return a
  };
  f.timeFormat = function(a) {
    if(0 < a) {
      var b = Math.floor(a / 3600), c = Math.floor((a - 3600 * b) / 60);
      a = Math.floor(a % 60);
      return(b ? b + ":" : "") + (10 > c ? "0" : "") + c + ":" + (10 > a ? "0" : "") + a
    }
    return"00:00"
  };
  f.seconds = function(a) {
    a = a.replace(",", ".");
    var b = a.split(":"), c = 0;
    "s" == a.substr(-1) ? c = Number(a.substr(0, a.length - 1)) : "m" == a.substr(-1) ? c = 60 * Number(a.substr(0, a.length - 1)) : "h" == a.substr(-1) ? c = 3600 * Number(a.substr(0, a.length - 1)) : 1 < b.length ? (c = Number(b[b.length - 1]), c += 60 * Number(b[b.length - 2]), 3 == b.length && (c += 3600 * Number(b[b.length - 3]))) : c = Number(a);
    return c
  };
  f.bounds = function(a) {
    if(!a) {
      return{left:0, right:0, width:0, height:0, top:0, bottom:0}
    }
    var b = a, c = 0, e = 0, g = isNaN(a.offsetWidth) ? 0 : a.offsetWidth;
    a = isNaN(a.offsetHeight) ? 0 : a.offsetHeight;
    do {
      c += isNaN(b.offsetLeft) ? 0 : b.offsetLeft, e += isNaN(b.offsetTop) ? 0 : b.offsetTop
    }while(b = b.offsetParent);
    return{left:c, top:e, width:g, height:a, right:c + g, bottom:e + a}
  };
  f.empty = function(a) {
    if(a) {
      for(;0 < a.childElementCount;) {
        a.removeChild(a.children[0])
      }
    }
  }
})(jwplayer.utils);
(function(f) {
  function h() {
    var a = document.createElement("style");
    a.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(a);
    return a
  }
  function e(b) {
    if(l) {
      a[b].innerHTML = d(b)
    }else {
      var c = a[b].sheet, g = j[b];
      if(c) {
        var e = c.cssRules;
        f.exists(g) && g < e.length && e[g].selectorText == b ? c.deleteRule(g) : j[b] = e.length;
        c.insertRule(d(b), j[b])
      }
    }
  }
  function d(a) {
    var b = a + "{\n";
    p(c[a], function(a, c) {
      b += "  " + a + ": " + c + ";\n"
    });
    return b += "}\n"
  }
  var a = {}, b, c = {}, k = 0, g = f.exists, p = f.foreach, j = {}, l = !1, q = f.css = function(d, j, s) {
    if(!a[d]) {
      if(l) {
        a[d] = h()
      }else {
        if(!b || 5E4 < b.sheet.cssRules.length) {
          b = h()
        }
        a[d] = b
      }
    }
    g(s) || (s = !1);
    c[d] || (c[d] = {});
    p(j, function(a, b) {
      a: {
        var e = b;
        if("undefined" === typeof e) {
          b = void 0
        }else {
          var k = s ? " !important" : "";
          if(isNaN(e)) {
            b = e.match(/png|gif|jpe?g/i) && 0 > e.indexOf("url") ? "url(" + e + ")" : e + k
          }else {
            switch(a) {
              case "z-index":
              ;
              case "opacity":
                b = e + k;
                break a;
              default:
                b = a.match(/color/i) ? "#" + f.pad(e.toString(16).replace(/^0x/i, ""), 6) + k : 0 === e ? 0 + k : Math.ceil(e) + "px" + k
            }
          }
        }
      }
      g(c[d][a]) && !g(b) ? delete c[d][a] : g(b) && (c[d][a] = b)
    });
    0 < k || e(d)
  };
  q.block = function() {
    k++
  };
  q.unblock = function() {
    k = Math.max(k - 1, 0);
    0 == k && p(a, function(a) {
      e(a)
    })
  };
  f.clearCss = function(b) {
    p(c, function(a) {
      0 <= a.indexOf(b) && delete c[a]
    });
    p(a, function(a) {
      0 <= a.indexOf(b) && e(a)
    })
  };
  f.transform = function(a, b) {
    var c = "-transform", e;
    b = b ? b : "";
    "string" == typeof a ? (e = {}, e["-webkit" + c] = b, e["-ms" + c] = b, e["-moz" + c] = b, e["-o" + c] = b, f.css(a, e)) : (c = "Transform", e = a.style, e["webkit" + c] = b, e["Moz" + c] = b, e["ms" + c] = b, e["O" + c] = b)
  };
  f.dragStyle = function(a, b) {
    f.css(a, {"-webkit-user-select":b, "-moz-user-select":b, "-ms-user-select":b, "-webkit-user-drag":b, "user-select":b, "user-drag":b})
  };
  f.transitionStyle = function(a, b) {
    navigator.userAgent.match(/5\.\d(\.\d)? safari/i) || f.css(a, {"-webkit-transition":b, "-moz-transition":b, "-o-transition":b})
  };
  f.rotate = function(a, b) {
    f.transform(a, "rotate(" + b + "deg)")
  };
  q(".jwplayer " + " div span a img ul li video".split(" ").join(",.jwplayer ") + ", .jwclick", {margin:0, padding:0, border:0, color:"#000000", "font-size":"100%", font:"inherit", "vertical-align":"baseline", "background-color":"transparent", "text-align":"left"});
  q(".jwplayer ul", {"list-style":"none"})
})(jwplayer.utils);
(function(f) {
  f.scale = function(e, d, a, b, c) {
    var k = f.exists;
    k(d) || (d = 1);
    k(a) || (a = 1);
    k(b) || (b = 0);
    k(c) || (c = 0);
    f.transform(e, 1 == d && 1 == a && 0 == b && 0 == c ? "" : "scale(" + d + "," + a + ") translate(" + b + "px," + c + "px)")
  };
  f.stretch = function(e, d, a, b, c, k) {
    if(d && (e || (e = h.UNIFORM), a && b && c && k)) {
      var g = a / c, p = b / k, j = "video" == d.tagName.toLowerCase(), l = !1, q;
      j && f.transform(d);
      q = "jw" + e.toLowerCase();
      switch(e.toLowerCase()) {
        case h.FILL:
          g > p ? (c *= g, k *= g) : (c *= p, k *= p);
        case h.NONE:
          g = p = 1;
        case h.EXACTFIT:
          l = !0;
          break;
        default:
          g > p ? 0.95 < c * p / a ? (l = !0, q = "jwexactfit") : (c *= p, k *= p) : 0.95 < k * g / b ? (l = !0, q = "jwexactfit") : (c *= g, k *= g), l && (p = Math.ceil(100 * b / k) / 100, g = Math.ceil(100 * a / c) / 100)
      }
      j ? l ? (d.style.width = c + "px", d.style.height = k + "px", f.scale(d, g, p, (a - c) / 2 / g, (b - k) / 2 / p)) : (d.style.width = "", d.style.height = "") : (d.className = d.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, ""), d.className += " " + q)
    }
  };
  var h = f.stretching = {NONE:"none", FILL:"fill", UNIFORM:"uniform", EXACTFIT:"exactfit"}
})(jwplayer.utils);
(function(f) {
  f.parsers = {localName:function(h) {
    return h ? h.localName ? h.localName : h.baseName ? h.baseName : "" : ""
  }, textContent:function(h) {
    return h ? h.textContent ? h.textContent : h.text ? h.text : "" : ""
  }, getChildNode:function(h, e) {
    return h.childNodes[e]
  }, numChildren:function(h) {
    return h.childNodes ? h.childNodes.length : 0
  }}
})(jwplayer.html5);
(function(f) {
  f.dfxp = function(h, e) {
    var d, a, b = jwplayer.utils.seconds;
    this.load = function(b) {
      a = b;
      try {
        d.open("GET", b, !0), d.send(null)
      }catch(k) {
        e("Error loading DFXP File: " + b)
      }
    };
    d = new XMLHttpRequest;
    d.onreadystatechange = function() {
      if(4 === d.readyState) {
        if(200 === d.status) {
          for(var c = d.responseText, k = [{begin:0, text:""}], c = c.replace(/^\s+/, "").replace(/\s+$/, ""), c = c.split("</p>"), g = [], f = 0;f < c.length;f++) {
            0 <= c[f].indexOf("<p") && (c[f] = c[f].substr(c[f].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, ""), g.push(c[f]))
          }
          c = g;
          for(f = 0;f < c.length;f++) {
            var g = c[f], j = {};
            try {
              var l = g.indexOf('begin="'), g = g.substr(l + 7), l = g.indexOf('" end="');
              j.begin = b(g.substr(0, l));
              g = g.substr(l + 7);
              l = g.indexOf('">');
              j.end = b(g.substr(0, l));
              g = g.substr(l + 2);
              j.text = g
            }catch(q) {
            }
            g = j;
            g.text && (k.push(g), g.end && (k.push({begin:g.end, text:""}), delete g.end))
          }
          1 < k.length ? h(k) : e("Invalid DFXP file: " + a)
        }else {
          k = d.status, 0 == k ? e("Crossdomain loading denied: " + a) : 404 == k ? e("DFXP File not found: " + a) : e("Error " + k + " loading DFXP file: " + a)
        }
      }
    }
  }
})(jwplayer.html5.parsers);
(function(f) {
  var h = f.html5.parsers;
  (h.jwparser = function() {
  }).parseEntry = function(e, d) {
    for(var a = [], b = [], c = f.utils.xmlAttribute, k = 0;k < e.childNodes.length;k++) {
      var g = e.childNodes[k];
      if("jwplayer" == g.prefix) {
        var p = h.localName(g);
        "source" == p ? (delete d.sources, a.push({file:c(g, "file"), "default":c(g, "default"), label:c(g, "label"), type:c(g, "type")})) : "track" == p ? (delete d.tracks, b.push({file:c(g, "file"), "default":c(g, "default"), kind:c(g, "kind"), label:c(g, "label")})) : (d[p] = f.utils.serialize(h.textContent(g)), "file" == p && d.sources && delete d.sources)
      }
      d.file || (d.file = d.link)
    }
    if(a.length) {
      d.sources = [];
      for(k = 0;k < a.length;k++) {
        0 < a[k].file.length && (a[k]["default"] = "true" == a[k]["default"] ? !0 : !1, a[k].label.length || delete a[k].label, d.sources.push(a[k]))
      }
    }
    if(b.length) {
      d.tracks = [];
      for(k = 0;k < b.length;k++) {
        0 < b[k].file.length && (b[k]["default"] = "true" == b[k]["default"] ? !0 : !1, b[k].kind = !b[k].kind.length ? "captions" : b[k].kind, b[k].label.length || delete b[k].label, d.tracks.push(b[k]))
      }
    }
    return d
  }
})(jwplayer);
(function(f) {
  var h = jwplayer.utils, e = h.xmlAttribute, d = f.localName, a = f.textContent, b = f.numChildren, c = f.mediaparser = function() {
  };
  c.parseGroup = function(k, g) {
    var f, j, l = [];
    for(j = 0;j < b(k);j++) {
      if(f = k.childNodes[j], "media" == f.prefix && d(f)) {
        switch(d(f).toLowerCase()) {
          case "content":
            e(f, "duration") && (g.duration = h.seconds(e(f, "duration")));
            0 < b(f) && (g = c.parseGroup(f, g));
            e(f, "url") && (g.sources || (g.sources = []), g.sources.push({file:e(f, "url"), type:e(f, "type"), width:e(f, "width"), label:e(f, "label")}));
            break;
          case "title":
            g.title = a(f);
            break;
          case "description":
            g.description = a(f);
            break;
          case "guid":
            g.mediaid = a(f);
            break;
          case "thumbnail":
            g.image = e(f, "url");
            break;
          case "group":
            c.parseGroup(f, g);
            break;
          case "subtitle":
            var q = {};
            q.file = e(f, "url");
            q.kind = "captions";
            if(0 < e(f, "lang").length) {
              var n = q;
              f = e(f, "lang");
              var r = {zh:"Chinese", nl:"Dutch", en:"English", fr:"French", de:"German", it:"Italian", ja:"Japanese", pt:"Portuguese", ru:"Russian", es:"Spanish"};
              f = r[f] ? r[f] : f;
              n.label = f
            }
            l.push(q)
        }
      }
    }
    g.hasOwnProperty("tracks") || (g.tracks = []);
    for(j = 0;j < l.length;j++) {
      g.tracks.push(l[j])
    }
    return g
  }
})(jwplayer.html5.parsers);
(function(f) {
  function h(b) {
    for(var a = {}, h = 0;h < b.childNodes.length;h++) {
      var j = b.childNodes[h], l = c(j);
      if(l) {
        switch(l.toLowerCase()) {
          case "enclosure":
            a.file = e.xmlAttribute(j, "url");
            break;
          case "title":
            a.title = d(j);
            break;
          case "guid":
            a.mediaid = d(j);
            break;
          case "pubdate":
            a.date = d(j);
            break;
          case "description":
            a.description = d(j);
            break;
          case "link":
            a.link = d(j);
            break;
          case "category":
            a.tags = a.tags ? a.tags + d(j) : d(j)
        }
      }
    }
    a = f.mediaparser.parseGroup(b, a);
    a = f.jwparser.parseEntry(b, a);
    return new jwplayer.playlist.item(a)
  }
  var e = jwplayer.utils, d = f.textContent, a = f.getChildNode, b = f.numChildren, c = f.localName;
  f.rssparser = {};
  f.rssparser.parse = function(e) {
    for(var g = [], d = 0;d < b(e);d++) {
      var f = a(e, d);
      if("channel" == c(f).toLowerCase()) {
        for(var l = 0;l < b(f);l++) {
          var q = a(f, l);
          "item" == c(q).toLowerCase() && g.push(h(q))
        }
      }
    }
    return g
  }
})(jwplayer.html5.parsers);
(function(f) {
  f.srt = function(f, e, d) {
    function a(a) {
      0 == a ? e("Crossdomain loading denied: " + k) : 404 == a ? e("SRT File not found: " + k) : e("Error " + a + " loading SRT file: " + k)
    }
    function b(a) {
      var b = d ? [] : [{begin:0, text:""}];
      a = a.replace(/^\s+/, "").replace(/\s+$/, "");
      var c = a.split("\r\n\r\n");
      1 == c.length && (c = a.split("\n\n"));
      for(a = 0;a < c.length;a++) {
        if("WEBVTT" != c[a]) {
          var g, r = c[a];
          g = {};
          var s = r.split("\r\n");
          1 == s.length && (s = r.split("\n"));
          try {
            r = 1;
            0 < s[0].indexOf(" --\x3e ") && (r = 0);
            var v = s[r].indexOf(" --\x3e ");
            0 < v && (g.begin = p(s[r].substr(0, v)), g.end = p(s[r].substr(v + 5)));
            if(s[r + 1]) {
              g.text = s[r + 1];
              for(r += 2;r < s.length;r++) {
                g.text += "<br/>" + s[r]
              }
            }
          }catch(u) {
          }
          g.text && (b.push(g), g.end && !d && (b.push({begin:g.end, text:""}), delete g.end))
        }
      }
      1 < b.length ? f(b) : e("Invalid SRT file: " + k)
    }
    var c, k, g = jwplayer.utils, p = g.seconds;
    this.load = function(d) {
      k = d;
      try {
        var f;
        f = d && 0 <= d.indexOf("://") && d.split("/")[2] != window.location.href.split("/")[2] ? !0 : !1;
        f && g.exists(window.XDomainRequest) && (c = new XDomainRequest, c.onload = function() {
          b(c.responseText)
        }, c.onerror = function() {
          a(c.status)
        });
        c.open("GET", d, !0);
        c.send(null)
      }catch(h) {
        e("Error loading SRT File: " + d)
      }
    };
    c = new XMLHttpRequest;
    c.onreadystatechange = function() {
      4 === c.readyState && (200 === c.status ? b(c.responseText) : a(c.status))
    }
  }
})(jwplayer.html5.parsers);
(function(f) {
  var h = jwplayer.utils, e = jwplayer.events, d = e.state, a = h.css, b = "playing", c = document;
  f.captions = function(a, g) {
    function p(a) {
      h.log("CAPTIONS(" + a + ")")
    }
    function j(a) {
      (E = a.fullscreen) ? (l(), setTimeout(l, 500)) : s(!0)
    }
    function l() {
      var a = m.offsetHeight, b = m.offsetWidth;
      0 != a && 0 != b && w.resize(b, Math.round(0.94 * a))
    }
    function q(a) {
      ("tt" == f.parsers.localName(a.responseXML.firstChild) ? new jwplayer.html5.parsers.dfxp(r, p) : new jwplayer.html5.parsers.srt(r, p)).load(H)
    }
    function n() {
      (new jwplayer.html5.parsers.srt(r, p)).load(H)
    }
    function r(a) {
      w.populate(a);
      x < B.length && (B[x].data = a);
      s(!1)
    }
    function s(a) {
      h.isMobile() || !B.length ? w.hide() : z == b && 0 < C ? (w.show(), E ? j({fullscreen:!0}) : (v(), a && setTimeout(v, 500))) : w.hide()
    }
    function v() {
      w.resize()
    }
    function u(a) {
      0 < a ? (x = a - 1, C = a) : C = 0;
      x >= B.length || (B[x].data ? w.populate(B[x].data) : (H = a = B[x].file, h.ajax(a, q, n)), s(!1))
    }
    function A() {
      var a = [];
      a.push({label:"Off"});
      for(var b = 0;b < B.length;b++) {
        a.push({label:B[b].label})
      }
      return a
    }
    var m, y = {back:!0, color:"#FFFFFF", fontSize:15}, t = {fontFamily:"Arial,sans-serif", fontStyle:"normal", fontWeight:"normal", textDecoration:"none"}, w, z, x, B = [], C = 0, E = !1, H, D = new e.eventdispatcher;
    h.extend(this, D);
    this.element = function() {
      return m
    };
    this.getCaptionsList = function() {
      return A()
    };
		this.getCurrentCaption = function() { // caption hack
      return w.getCurrentCaption()
    };
		this.getCaptionList = function() { // caption hack
      return C ? w.getCaptionList() : []
    };
    this.getCurrentCaptions = function() {
      return C
    };
    this.setCurrentCaptions = function(a) {
      if(0 <= a && C != a && a <= B.length) {
        u(a);
        a = A();
        h.saveCookie("captionLabel", a[C].label);
        var b = e.JWPLAYER_CAPTIONS_CHANGED;
        D.sendEvent(b, {type:b, tracks:a, track:C})
      }
    };
    m = c.createElement("div");
    m.id = a.id + "_caption";
    m.className = "jwcaptions";
    a.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, function(a) {
      switch(a.newstate) {
        case d.IDLE:
          z = "idle";
          s(!1);
          break;
        case d.PLAYING:
          z = b, s(!1)
      }
    });
    a.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, function() {
      x = 0;
      B = [];
      w.update(0);
      for(var b = a.jwGetPlaylist()[a.jwGetPlaylistIndex()].tracks, c = [], g = 0, d = "", f = 0, d = "", g = 0;g < b.length;g++) {
        d = b[g].kind.toLowerCase(), ("captions" == d || "subtitles" == d) && c.push(b[g])
      }
      for(g = C = 0;g < c.length;g++) {
        if(d = c[g].file) {
          c[g].label || (c[g].label = g.toString()), B.push(c[g])
        }
      }
      for(g = 0;g < B.length;g++) {
        if(B[g]["default"]) {
          f = g + 1;
          break
        }
      }
      if(d = h.getCookies().captionLabel) {
        b = A();
        for(g = 0;g < b.length;g++) {
          if(d == b[g].label) {
            f = g;
            break
          }
        }
      }
      u(f);
      s(!1);
      b = e.JWPLAYER_CAPTIONS_LIST;
      c = A();
      D.sendEvent(b, {type:b, tracks:c, track:C})
    });
    a.jwAddEventListener(e.JWPLAYER_MEDIA_ERROR, p);
    a.jwAddEventListener(e.JWPLAYER_ERROR, p);
    a.jwAddEventListener(e.JWPLAYER_READY, function() {
      h.foreach(y, function(a, b) {
        g && void 0 != g[a.toLowerCase()] ? "color" == a ? t.color = "#" + String(g.color).substr(-6) : t[a] = g[a.toLowerCase()] : t[a] = b
      });
      w = new jwplayer.html5.captions.renderer(t, m);
      s(!1)
    });
    a.jwAddEventListener(e.JWPLAYER_MEDIA_TIME, function(a) {
      w.update(a.position)
    });
    a.jwAddEventListener(e.JWPLAYER_FULLSCREEN, j);
    a.jwAddEventListener(e.JWPLAYER_RESIZE, function() {
      s(!1)
    })
  };
  a(".jwcaptions", {position:"absolute", cursor:"pointer", width:"100%", height:"100%", overflow:"hidden"})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils.foreach;
  f.captions.renderer = function(e, d) {
    function a(a) {
      f(p, {visibility:"hidden"});
      j.innerHTML = a;
      n = "" == a ? "hidden" : "visible";
      setTimeout(b, 20)
    }
    function b() {
      var a = p.clientWidth, b = Math.round(e.fontSize * Math.pow(a / 400, 0.6)), c = Math.round(1.4 * b);
      f(j, {maxWidth:a + "px", fontSize:b + "px", lineHeight:c + "px", visibility:n})
    }		
    function c() {
      for(var b = -1, c = 0;c < g.length;c++) {
        if(g[c].begin <= q && (c == g.length - 1 || g[c + 1].begin >= q)) {
          b = c;
          break
        }
      }
      -1 == b ? a("") : b != l && (l = b, a(g[c].text))
    }
    function f(a, b) {
      h(b, function(b, c) {
        a.style[b] = c
      })
    }
    var g, p, j, l, q, n = "visible", r;
    this.hide = function() {
      f(p, {display:"none"});
      r && (clearInterval(r), r = null)
    };
    this.populate = function(a) {
      l = -1;
      g = a;
      c()
    };
    this.resize = function() {
      b()
    };	
		this.getCurrentCaption = function() { // caption hack
      return [l, g[l]]
    };
		this.getCaptionList = function() { // caption hack
      return g
    };
    p = document.createElement("div");
    j = document.createElement("span");
    p.appendChild(j);
    d.appendChild(p);
    f(p, {display:"block", height:"auto", position:"absolute", bottom:"20px", textAlign:"center", width:"100%"});
    f(j, {color:"#" + e.color.substr(-6), display:"inline-block", fontFamily:e.fontFamily, fontStyle:e.fontStyle, fontWeight:e.fontWeight, height:"auto", margin:"auto", position:"relative", textAlign:"center", textDecoration:e.textDecoration, wordWrap:"break-word", width:"auto"});
    e.back ? f(j, {background:"#000"}) : f(j, {textShadow:"-2px 0px 1px #000,2px 0px 1px #000,0px -2px 1px #000,0px 2px 1px #000,-1px 1px 1px #000,1px 1px 1px #000,1px -1px 1px #000,1px 1px 1px #000"});
    this.show = function() {
      f(p, {display:"block"});
      r || (r = setInterval(b, 250));
      b()
    };
    this.update = function(a) {
      q = a;
      g && c()
    }
  }
})(jwplayer.html5);
(function(f) {
  var h = f.html5, e = f.utils, d = f.events, a = d.state, b = e.css;
  f = e.transitionStyle;
  var c = "button", k = "text", g = "divider", p = "slider", j = "100%", l = {display:"none"}, q = {display:v}, n = !1, r = !0, s = null, v = void 0, u = window, A = document;
  h.controlbar = function(f, y) {
    function t(a, b, c) {
      return{name:a, type:b, className:c}
    }
    function w(a) {
      var b = n, c;
      K.elapsed && (c = e.timeFormat(a.position), K.elapsed.innerHTML = c, b = c.length != e.timeFormat(va).length);
      K.duration && (c = e.timeFormat(a.duration), K.duration.innerHTML = c, b = b || c.length != e.timeFormat(ia).length);
      0 < a.duration ? qa(a.position / a.duration) : qa(0);
      ia = a.duration;
      va = a.position;
      b && ya()
    }
    function z() {
      var a = G.jwGetMute();
      Z("mute", a);
      ja(a ? 0 : Ja)
    }
    function x() {
      Ja = G.jwGetVolume() / 100;
      ja(Ja)
    }
    function B() {
      b(D(".jwhd"), l);
      b(D(".jwcc"), l);
      za();
      ya()
    }
    function C(a) {
      Aa = a.currentQuality;
      la && 0 <= Aa && la.setActive(a.currentQuality)
    }
    function E(a) {
      ca && (Ba = a.track, ma && 0 <= Ba && ma.setActive(a.track))
    }
    function H() {
      da = e.extend({}, W, R.getComponentSettings("controlbar"), y);
      U = O("background").height;
      b("#" + $, {height:U, bottom:wa ? 0 : da.margin});
      b(D(".jwtext"), {font:da.fontsize + "px/" + O("background").height + "px " + da.font, color:da.fontcolor, "font-weight":da.fontweight});
      b(D(".jwoverlay"), {bottom:U});
      0 < da.maxwidth && b(D(), {"max-width":da.maxwidth})
    }
    function D(a) {
      return"#" + $ + (a ? " " + a : "")
    }
    function L() {
      return A.createElement("span")
    }
    function F(a) {
      switch(a.type) {
        case g:
          var e;
          a.width ? (e = L(), e.className = "jwblankDivider", b(e, {width:parseInt(a.width)})) : a.element ? e = I(a.element) : (e = I(a.name), e || (e = L(), e.className = "jwblankDivider"));
          a.className && (e.className += " " + a.className);
          return e;
        case k:
          a = a.name;
          e = {};
          var d = O(a + "Background");
          if(d.src) {
            var f = L();
            f.id = $ + "_" + a;
            f.className = "jwtext jw" + a;
            e.background = "url(" + d.src + ") no-repeat center";
            e["background-size"] = "100% " + O("background").height + "px";
            b(D(".jw" + a), e);
            f.innerHTML = "00:00";
            a = K[a] = f
          }else {
            a = null
          }
          return a;
        case c:
          if("blank" != a.name) {
            return a = a.name, O(a + "Button").src ? (e = L(), e.className = "jw" + a + " jwbuttoncontainer", d = A.createElement("button"), d.addEventListener("click", V(a), n), d.innerHTML = "&nbsp;", e.appendChild(d), d = O(a + "Button"), f = O(a + "ButtonOver"), Q(D(".jw" + a + " button"), d, f), (d = bb[a]) && Q(D(".jw" + a + ".jwtoggle button"), O(d + "Button"), O(d + "ButtonOver")), a = K[a] = e) : a = s, a
          }
          break;
        case p:
          d = a.name;
          a = L();
          var E = d + ("time" == d ? "Slider" : "") + "Cap", r = (f = "volume" == d) ? "Top" : "Left", l = f ? "Bottom" : "Right", q = I(E + r, s, n, n, f), t = I(E + l, s, n, n, f);
          e = L();
          var w = ["Rail", "Buffer", "Progress"], m;
          e.className = "jwrail jwsmooth";
          for(var C = 0;C < w.length;C++) {
            var aa = "time" == d ? "Slider" : "", y = d + aa + w[C], x = I(y, s, !f, "volume" == d), u = I(y + "Cap" + r, s, n, n, f), H = I(y + "Cap" + l, s, n, n, f), B = O(y + "Cap" + r), z = O(y + "Cap" + l);
            if(x) {
              var F = L();
              F.className = "jwrailgroup " + w[C];
              u && F.appendChild(u);
              F.appendChild(x);
              H && (F.appendChild(H), H.className += " jwcap" + (f ? "Bottom" : "Right"));
              b(D(".jwrailgroup." + w[C]), {"min-width":f ? v : B.width + z.width});
              F.capSize = f ? B.height + z.height : B.width + z.width;
              b(D("." + x.className), {left:f ? v : B.width, right:f ? v : z.width, top:f ? B.height : v, bottom:f ? z.height : v, height:f ? "auto" : v});
              2 == C && (m = F);
              K[y] = F;
              e.appendChild(F)
            }
          }
          if(aa = I(d + aa + "Thumb", s, n, n, f)) {
            b(D("." + aa.className), {opacity:"time" == d ? 0 : 1, "margin-top":f ? aa.skin.height / -2 : v}), aa.className += " jwthumb", (f && m ? m : e).appendChild(aa)
          }
          e.addEventListener("mousedown", Pa(d), n);
          "time" == d && (e.addEventListener("mousemove", Ca, n), e.addEventListener("mouseout", S, n));
          K[d + "Rail"] = e;
          m = O(E + r);
          E = O(E + r);
          O(d + "SliderRail");
          a.className = "jwslider jw" + d;
          q && a.appendChild(q);
          a.appendChild(e);
          t && (f && (t.className += " jwcapBottom"), a.appendChild(t));
          b(D(".jw" + d + " .jwrail"), {left:f ? v : m.width, right:f ? v : E.width, top:f ? m.height : v, bottom:f ? E.height : v, width:f ? j : v, height:f ? "auto" : v});
          K[d] = a;
          a.vertical = f;
          "time" == d ? (na = new h.overlay($ + "_timetooltip", R), Ka = new h.thumbs($ + "_thumb"), Qa = A.createElement("div"), Qa.className = "jwoverlaytext", La = A.createElement("div"), d = Ka.element(), La.appendChild(d), La.appendChild(Qa), na.setContents(La), Va = e, J(0), d = na.element(), e.appendChild(d), K.timeSliderThumb && b(D(".jwtimeSliderThumb"), {"margin-left":O("timeSliderThumb").width / -2}), Da(0), qa(0), qa(0), Da(0)) : "volume" == d && (b(D(".jwvolume"), {width:O("volumeRail").width + 
          (f ? 0 : O("volumeCap" + r).width + O("volumeCap" + l).width), height:f ? O("volumeCap" + r).height + O("volumeRail").height + O("volumeRailCap" + r).height + O("volumeRailCap" + l).height + O("volumeCap" + l).height : v}), f && (a.className += " jwvertical"));
          return a
      }
    }
    function I(a, c, d, g, f) {
      var h = L();
      h.className = "jw" + a;
      var k = g ? " left center" : " center";
      g = O(a);
      h.innerHTML = "&nbsp;";
      if(g && "" != g.src) {
        return d = d ? {background:"url('" + g.src + "') repeat-x " + k, height:f ? g.height : v} : {background:"url('" + g.src + "') no-repeat" + k, width:g.width, height:f ? g.height : v}, h.skin = g, b(D(".jw" + a), e.extend(d, c)), K[a] = h
      }
    }
    function Q(a, e, c) {
      e.src && (b(a, {width:e.width, background:"url(" + e.src + ") center no-repeat"}), c.src && b(a + ":hover", {background:"url(" + c.src + ") center no-repeat"}))
    }
    function V(a) {
      return function() {
        if(Wa[a]) {
          Wa[a]()
        }
      }
    }
    function M(a) {
      e.foreach(Ea, function(b, e) {
        b != a && e.hide()
      })
    }
    function X() {
      wa || (ra.show(), M("volume"))
    }
    function ea() {
      wa || (Ma.show(), M("fullscreen"))
    }
    function Z(a, b) {
      e.exists(b) || (b = !Na[a]);
      K[a] && (K[a].className = "jw" + a + (b ? " jwtoggle jwtoggling" : " jwtoggling"), setTimeout(function() {
        K[a].className = K[a].className.replace(" jwtoggling", "")
      }, 100));
      Na[a] = b
    }
    function oa() {
      sa && 1 < sa.length && (Ra && (clearTimeout(Ra), Ra = void 0), la.show(), M("hd"))
    }
    function aa() {
      ca && 1 < ca.length && (Sa && (clearTimeout(Sa), Sa = void 0), ma.show(), M("cc"))
    }
    function Ta(a) {
      0 <= a && a < sa.length && (G.jwSetCurrentQuality(a), la.hide())
    }
    function Ua(a) {
      0 <= a && a < ca.length && (G.jwSetCurrentCaptions(a), ma.hide())
    }
    function Fa(a) {
      a.preventDefault();
      A.onselectstart = function() {
        return n
      }
    }
    function Pa(b) {
      return function(e) {
        0 == e.button && (K[b + "Rail"].className = "jwrail", "time" == b ? G.jwGetState() != a.IDLE && (G.jwSeekDrag(r), ta = b) : ta = b)
      }
    }
    function fa(a) {
      var b = (new Date).getTime();
      if(50 < b - Xa) {
        if((Oa = e.bounds(Va)) && 0 != Oa.width) {
          var c = na.element(), d = a.pageX - Oa.left - u.pageXOffset;
          0 <= d && d <= Oa.width && (c.style.left = Math.round(d) + "px", J(ia * d / Oa.width), ka = e.bounds(N))
        }
        Xa = b
      }
      if(ta && 0 == a.button) {
        return c = K[ta].getElementsByClassName("jwrail")[0], d = e.bounds(c), c = ta, d = K[c].vertical ? (d.bottom - a.pageY) / d.height : (a.pageX - d.left) / d.width, "mouseup" == a.type ? ("time" == c && G.jwSeekDrag(n), K[c + "Rail"].className = "jwrail jwsmooth", ta = s, Ya[c](d)) : ("time" == ta ? qa(d) : ja(d), 500 < b - Za && (Za = b, Ya[ta](d))), !1
      }
    }
    function Ca() {
      na && ia && !wa && (pa(na), na.show())
    }
    function S() {
      na && na.hide()
    }
    function J(a) {
      Qa.innerHTML = e.timeFormat(a);
      Ka.updateTimeline(a);
      na.setContents(La);
      ka = e.bounds(N);
      pa(na)
    }
    function P() {
      Sa = setTimeout(ma.hide, 500)
    }
    function ua() {
      Ra = setTimeout(la.hide, 500)
    }
    function ba(a, c, e, d) {
      var g = a.element();
      c.appendChild(g);
      c.addEventListener("mousemove", e, n);
      d ? c.addEventListener("mouseout", d, n) : c.addEventListener("mouseout", a.hide, n);
      b("#" + g.id, {left:"50%"})
    }
    function Ga(a) {
      var b = L();
      b.className = "jwgroup jw" + a;
      xa[a] = b;
      if(ga[a] && (b = ga[a], a = xa[a], b && 0 < b.elements.length)) {
        for(var c = 0;c < b.elements.length;c++) {
          var e = F(b.elements[c]);
          e && ("volume" == b.elements[c].name && e.vertical ? (ra = new h.overlay($ + "_volumeOverlay", R), ra.setContents(e)) : a.appendChild(e))
        }
      }
    }
    function za() {
      1 < G.jwGetPlaylist().length && (!A.querySelector("#" + G.id + " .jwplaylist") || G.jwGetFullscreen()) ? (b(D(".jwnext"), q), b(D(".jwprev"), q), b(D(".nextdiv"), q)) : (b(D(".jwnext"), l), b(D(".jwprev"), l), b(D(".nextdiv"), l))
    }
    function pa(a) {
      ka || (ka = e.bounds(N));
      a.offsetX(0);
      var b = e.bounds(a.element());
      b.right > ka.right ? a.offsetX(ka.right - b.right) : b.left < ka.left && a.offsetX(ka.left - b.left)
    }
    function Da(a) {
      a = Math.min(Math.max(0, a), 1);
      K.timeSliderBuffer && (K.timeSliderBuffer.style.width = 100 * a + "%", K.timeSliderBuffer.style.opacity = 0 < a ? 1 : 0)
    }
    function Y(a, b) {
      var c = K[a].vertical, e = a + ("time" == a ? "Slider" : ""), d = 100 * Math.min(Math.max(0, b), 1) + "%", g = K[e + "Progress"], e = K[e + "Thumb"], f = n;
      g && (c ? (g.style.height = d, g.style.bottom = 0, g.clientHeight <= g.capSize && (f = r)) : (g.style.width = d, g.clientWidth <= g.capSize && (f = r)), g.style.opacity = !f && 0 < b || ta ? 1 : 0);
      e && (c ? e.style.top = 0 : e.style.left = d)
    }
    function ja(a) {
      Y("volume", a)
    }
    function qa(a) {
      Y("time", a)
    }
    function O(a) {
      return(a = R.getSkinElement(0 == a.indexOf("volume") ? "tooltip" : "controlbar", a)) ? a : {width:0, height:0, src:"", image:v, ready:n}
    }
    var G, R, T = t("divider", g), W = {margin:8, maxwidth:800, font:"Arial,sans-serif", fontsize:11, fontcolor:15658734, fontweight:"bold", layout:{left:{position:"left", elements:[t("play", c), T, t("prev", c), t("next", c), t("divider", g, "nextdiv"), t("elapsed", k)]}, center:{position:"center", elements:[t("time", p)]}, right:{position:"right", elements:[t("duration", k), T, t("hd", c), t("cc", c), T, t("mute", c), t("volume", p), T, t("fullscreen", c)]}}}, da, ga, K, U, N, $, ia, va, sa, Aa, 
    ca, Ba, Ja, ra, ka, Va, Oa, na, La, Ka, Qa, Ra, la, Sa, ma, Ma, $a, Ha, wa = n, ta = n, Za = 0, Xa = 0, bb = {play:"pause", mute:"unmute", fullscreen:"normalscreen"}, Na = {play:n, mute:n, fullscreen:n}, Wa = {play:function() {
      Na.play ? G.jwPause() : G.jwPlay()
    }, mute:function() {
      G.jwSetMute(!Na.mute);
      z({mute:Na.mute})
    }, fullscreen:function() {
      G.jwSetFullscreen()
    }, next:function() {
      G.jwPlaylistNext()
    }, prev:function() {
      G.jwPlaylistPrev()
    }}, Ya = {time:function(a) {
      G.jwSeek(a * ia)
    }, volume:function(a) {
      ja(a);
      0.1 > a && (a = 0);
      0.9 < a && (a = 1);
      G.jwSetVolume(100 * a)
    }}, Ea = {}, ha = this, xa = {}, ya = function() {
      clearTimeout($a);
      $a = setTimeout(ha.redraw, 0)
    };
    ha.redraw = function() {
      H();
      var a = O("capLeft"), c = O("capRight");
      b(D(".jwgroup.jwcenter"), {left:Math.round(e.parseDimension(xa.left.offsetWidth) + a.width), right:Math.round(e.parseDimension(xa.right.offsetWidth) + c.width)});
      a = N.parentNode.clientWidth > da.maxwidth;
      c = wa ? 0 : da.margin;
      b(D(), {left:a ? "50%" : c, right:a ? v : c, "margin-left":a ? N.clientWidth / -2 : v, width:a ? j : v});
      ka = e.bounds(N);
      e.foreach(Ea, function(a, b) {
        pa(b)
      })
    };
    ha.audioMode = function(a) {
      a != wa && (wa = a, b(D(".jwfullscreen"), {display:a ? "none" : v}), b(D(".jwhd"), {display:a ? "none" : v}), b(D(".jwcc"), {display:a ? "none" : v}), ya())
    };
    ha.element = function() {
      return N
    };
    ha.margin = function() {
      return parseInt(da.margin)
    };
    ha.height = function() {
      return U
    };
    ha.show = function() {
      ha.visible || (clearTimeout(Ha), Ha = v, ha.visible = !0, N.style.display = "inline-block", ya(), z(), Ha = setTimeout(function() {
        N.style.opacity = 1
      }, 10))
    };
    ha.hide = function() {
      ha.visible && (ha.visible = !1, N.style.opacity = 0, clearTimeout(Ha), Ha = v, Ha = setTimeout(function() {
        N.style.display = "none"
      }, 150))
    };
    K = {};
    G = f;
    $ = G.id + "_controlbar";
    ia = va = 0;
    N = L();
    N.id = $;
    N.className = "jwcontrolbar";
    R = G.skin;
    ga = R.getComponentLayout("controlbar");
    ga || (ga = W.layout);
    e.clearCss("#" + $);
    H();
    var Ia = I("capLeft"), T = I("capRight"), ab = I("background", {position:"absolute", left:O("capLeft").width, right:O("capRight").width, "background-repeat":"repeat-x"}, r);
    ab && N.appendChild(ab);
    Ia && N.appendChild(Ia);
    Ga("left");
    Ga("center");
    Ga("right");
    N.appendChild(xa.left);
    N.appendChild(xa.center);
    N.appendChild(xa.right);
    K.hd && (la = new h.menu("hd", $ + "_hd", R, Ta), ba(la, K.hd, oa, ua), Ea.hd = la);
    K.cc && (ma = new h.menu("cc", $ + "_cc", R, Ua), ba(ma, K.cc, aa, P), Ea.cc = ma);
    K.mute && K.volume && K.volume.vertical && (ra = new h.overlay($ + "_volumeoverlay", R), ra.setContents(K.volume), ba(ra, K.mute, X), Ea.volume = ra);
    K.fullscreen && (Ma = new h.overlay($ + "_fullscreenoverlay", R), Ia = A.createElement("div"), Ia.className = "jwoverlaytext", Ia.innerHTML = "Fullscreen", Ma.setContents(Ia), ba(Ma, K.fullscreen, ea), Ea.fullscreen = Ma);
    b(D(".jwright"), {right:O("capRight").width});
    T && N.appendChild(T);
    G.jwAddEventListener(d.JWPLAYER_MEDIA_TIME, w);
    G.jwAddEventListener(d.JWPLAYER_PLAYER_STATE, function(c) {
      switch(c.newstate) {
        case a.BUFFERING:
        ;
        case a.PLAYING:
          b(D(".jwtimeSliderThumb"), {opacity:1});
          Z("play", r);
          break;
        case a.PAUSED:
          ta || Z("play", n);
          break;
        case a.IDLE:
          Z("play", n), b(D(".jwtimeSliderThumb"), {opacity:0}), K.timeRail && (K.timeRail.className = "jwrail", setTimeout(function() {
            K.timeRail.className += " jwsmooth"
          }, 100)), Da(0), w({position:0, duration:0})
      }
    });
    G.jwAddEventListener(d.JWPLAYER_PLAYLIST_ITEM, function(a) {
      a = G.jwGetPlaylist()[a.index].tracks;
      if("array" == e.typeOf(a)) {
        for(var b = 0;b < a.length;b++) {
          if(a[b].file && a[b].kind && "thumbnails" == a[b].kind.toLowerCase()) {
            Ka.load(a[b].file);
            return
          }
        }
      }
      Ka.load()
    });
    G.jwAddEventListener(d.JWPLAYER_MEDIA_MUTE, z);
    G.jwAddEventListener(d.JWPLAYER_MEDIA_VOLUME, x);
    G.jwAddEventListener(d.JWPLAYER_MEDIA_BUFFER, function(a) {
      Da(a.bufferPercent / 100)
    });
    G.jwAddEventListener(d.JWPLAYER_FULLSCREEN, function(a) {
      Z("fullscreen", a.fullscreen);
      za()
    });
    G.jwAddEventListener(d.JWPLAYER_PLAYLIST_LOADED, B);
    G.jwAddEventListener(d.JWPLAYER_MEDIA_LEVELS, function(a) {
      if((sa = a.levels) && 1 < sa.length && la) {
        b(D(".jwhd"), {display:v});
        la.clearOptions();
        for(var c = 0;c < sa.length;c++) {
          la.addOption(sa[c].label, c)
        }
        C(a)
      }else {
        b(D(".jwhd"), {display:"none"})
      }
      ya()
    });
    G.jwAddEventListener(d.JWPLAYER_MEDIA_LEVEL_CHANGED, C);
    G.jwAddEventListener(d.JWPLAYER_CAPTIONS_LIST, function(a) {
      if((ca = a.tracks) && 1 < ca.length && ma) {
        b(D(".jwcc"), {display:v});
        ma.clearOptions();
        for(var c = 0;c < ca.length;c++) {
          ma.addOption(ca[c].label, c)
        }
        E(a)
      }else {
        b(D(".jwcc"), {display:"none"})
      }
      ya()
    });
    G.jwAddEventListener(d.JWPLAYER_CAPTIONS_CHANGED, E);
    N.addEventListener("mouseover", function() {
      u.addEventListener("mousemove", fa, n);
      u.addEventListener("mouseup", fa, n);
      u.addEventListener("mousedown", Fa, n)
    }, !1);
    N.addEventListener("mouseout", function() {
      u.removeEventListener("mousemove", fa);
      u.removeEventListener("mouseup", fa);
      u.removeEventListener("mousedown", Fa);
      A.onselectstart = null
    }, !1);
    setTimeout(function() {
      x();
      z()
    }, 0);
    B();
    ha.visible = !1
  };
  b(".jwcontrolbar", {position:"absolute", opacity:0, display:"none"});
  b(".jwcontrolbar span", {height:j});
  e.dragStyle(".jwcontrolbar span", "none");
  b(".jwcontrolbar .jwgroup", {display:"inline"});
  b(".jwcontrolbar span, .jwcontrolbar .jwgroup button,.jwcontrolbar .jwleft", {position:"relative", "float":"left"});
  b(".jwcontrolbar .jwright", {position:"absolute"});
  b(".jwcontrolbar .jwcenter", {position:"absolute"});
  b(".jwcontrolbar buttoncontainer,.jwcontrolbar button", {display:"inline-block", height:j, border:"none", cursor:"pointer"});
  b(".jwcontrolbar .jwcapRight,.jwcontrolbar .jwtimeSliderCapRight,.jwcontrolbar .jwvolumeCapRight", {right:0, position:"absolute"});
  b(".jwcontrolbar .jwcapBottom", {bottom:0, position:"absolute"});
  b(".jwcontrolbar .jwtime", {position:"absolute", height:j, width:j, left:0});
  b(".jwcontrolbar .jwthumb", {position:"absolute", height:j, cursor:"pointer"});
  b(".jwcontrolbar .jwrail", {position:"absolute", cursor:"pointer"});
  b(".jwcontrolbar .jwrailgroup", {position:"absolute", width:j});
  b(".jwcontrolbar .jwrailgroup span", {position:"absolute"});
  b(".jwcontrolbar .jwdivider+.jwdivider", {display:"none"});
  b(".jwcontrolbar .jwtext", {padding:"0 5px", "text-align":"center"});
  b(".jwcontrolbar .jwoverlaytext", {padding:3, "text-align":"center"});
  b(".jwcontrolbar .jwvertical *", {display:"block"});
  f(".jwcontrolbar", "opacity .15s, background .15s, visibility .15s");
  f(".jwcontrolbar button", "opacity .15s, background .15s, visibility .15s");
  f(".jwcontrolbar .jwtime .jwsmooth span", "opacity .15s, background .15s, visibility .15s, width .15s linear, left .05s linear");
  f(".jwcontrolbar .jwtoggling", "none")
})(jwplayer);
(function(f) {
  var h = f.html5, e = f.utils, d = f.events, a = d.state;
  h.controller = function(b, c) {
    function k(a) {
      m.sendEvent(a.type, a)
    }
    function g(a) {
      j(!0);
      switch(e.typeOf(a)) {
        case "string":
          var b = new h.playlistloader;
          b.addEventListener(d.JWPLAYER_PLAYLIST_LOADED, function(a) {
            g(a.playlist)
          });
          b.addEventListener(d.JWPLAYER_ERROR, function(a) {
            g([]);
            a.message = "Could not load playlist: " + a.message;
            k(a)
          });
          b.load(a);
          break;
        case "object":
        ;
        case "array":
          u.setPlaylist(new f.playlist(a));
          break;
        case "number":
          u.setItem(a)
      }
    }
    function p(b) {
      e.exists(b) || (b = !0);
      if(!b) {
        return l()
      }
      try {
        0 <= t && (g(t), t = -1);
        if(!w && (w = !0, m.sendEvent(d.JWPLAYER_MEDIA_BEFOREPLAY), w = !1, B)) {
          B = !1;
          z = null;
          return
        }
        if(u.state == a.IDLE) {
          if(0 == u.playlist.length) {
            return!1
          }
          A.load(u.playlist[u.item])
        }else {
          u.state == a.PAUSED && A.play()
        }
        return!0
      }catch(c) {
        m.sendEvent(d.JWPLAYER_ERROR, c), z = null
      }
      return!1
    }
    function j(b) {
      z = null;
      try {
        return u.state != a.IDLE ? A.stop() : b || (x = !0), w && (B = !0), !0
      }catch(c) {
        m.sendEvent(d.JWPLAYER_ERROR, c)
      }
      return!1
    }
    function l(b) {
      z = null;
      e.exists(b) || (b = !0);
      if(!b) {
        return p()
      }
      try {
        switch(u.state) {
          case a.PLAYING:
          ;
          case a.BUFFERING:
            A.pause();
            break;
          default:
            w && (B = !0)
        }
        return!0
      }catch(c) {
        m.sendEvent(d.JWPLAYER_ERROR, c)
      }
      return!1
    }
    function q(a) {
      g(a);
      p()
    }
    function n() {
      q(u.item + 1)
    }
    function r() {
      u.state == a.IDLE && (x ? x = !1 : (z = r, u.repeat ? n() : u.item == u.playlist.length - 1 ? (t = 0, j(!0), setTimeout(function() {
        m.sendEvent(d.JWPLAYER_PLAYLIST_COMPLETE)
      }, 0)) : n()))
    }
    function s(a) {
      return function() {
        y ? v(a, arguments) : C.push({method:a, arguments:arguments})
      }
    }
    function v(a, b) {
      var c = [], e;
      for(e = 0;e < b.length;e++) {
        c.push(b[e])
      }
      a.apply(this, c)
    }
    var u = b, A = b.getVideo(), m = new d.eventdispatcher(u.id, u.config.debug), y = !1, t = -1, w, z, x = !1, B, C = [];
    e.extend(this, m);
    this.play = s(p);
    this.pause = s(l);
    this.seek = s(function(b) {
      u.state != a.PLAYING && p(!0);
      A.seek(b)
    });
    this.stop = function() {
      x = !0;
      s(j)()
    };
    this.load = s(g);
    this.next = s(n);
    this.prev = s(function() {
      q(u.item - 1)
    });
    this.item = s(q);
    this.setVolume = s(u.setVolume);
    this.setMute = s(u.setMute);
    this.setFullscreen = s(function(a) {
      c.fullscreen(a)
    });
    this.setStretching = s(function(a) {
      u.stretching = a;
      c.resize()
    });
    this.detachMedia = function() {
      try {
        return u.getVideo().detachMedia()
      }catch(a) {
        return null
      }
    };
    this.attachMedia = function(a) {
      try {
        u.getVideo().attachMedia(a), "function" == typeof z && z()
      }catch(b) {
        return null
      }
    };
    this.setCurrentQuality = s(function(a) {
      A.setCurrentQuality(a)
    });
    this.getCurrentQuality = function() {
      return A ? A.getCurrentQuality() : -1
    };
    this.getQualityLevels = function() {
      return A ? A.getQualityLevels() : null
    };
    this.setCurrentCaptions = s(function(a) {
      c.setCurrentCaptions(a)
    });
    this.getCurrentCaptions = function() {
      return c.getCurrentCaptions()
    };
		this.getCurrentCaption = function() { // caption hack
      return c.getCurrentCaption()
    };
		this.getCaptionList = function() { // caption hack
      return c.getCaptionList()
    };
    this.getCaptionsList = function() {
      return c.getCaptionsList()
    };
    this.checkBeforePlay = function() {
      return w
    };
    this.playerReady = function(a) {
      if(!y) {
        c.completeSetup();
        m.sendEvent(a.type, a);
        f.utils.exists(window.jwplayer.playerReady) && f.playerReady(a);
        u.addGlobalListener(k);
        c.addGlobalListener(k);
        m.sendEvent(f.events.JWPLAYER_PLAYLIST_LOADED, {playlist:f(u.id).getPlaylist()});
        m.sendEvent(f.events.JWPLAYER_PLAYLIST_ITEM, {index:u.item});
        g();
        u.autostart && !e.isMobile() && p();
        for(y = !0;0 < C.length;) {
          a = C.shift(), v(a.method, a.arguments)
        }
      }
    };
    u.addEventListener(d.JWPLAYER_MEDIA_BUFFER_FULL, function() {
      A.play()
    });
    u.addEventListener(d.JWPLAYER_MEDIA_COMPLETE, function() {
      setTimeout(r, 25)
    });
    u.addEventListener(d.JWPLAYER_MEDIA_ERROR, function(a) {
      a = e.extend({}, a);
      a.type = d.JWPLAYER_ERROR;
      m.sendEvent(a.type, a)
    })
  }
})(jwplayer);
(function(f) {
  f.html5.defaultskin = function() {
    this.text = '<?xml version="1.0" ?><skin author="LongTail Video" name="Six" version="2.0" target="6.0"><components><component name="controlbar"><settings><setting name="margin" value="8"/><setting name="fontcolor" value="eeeeee"/><setting name="fontsize" value="11"/><setting name="fontweight" value="bold"/><setting name="maxwidth" value="800"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAIAAAD5ZqGGAAAAJklEQVR42mNKSUlhevToEdPXr1+Z/v37RxH+//8/htjv379BZgMA4j5LOzqaqAsAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAh0lEQVR42t2RywnDMAxAhSbJRukGPtgDdJSO0k7U4IOPBhuM8b9SIAG3p0JPFTwETxJICIFCSrkqpZ7EYFAIsbbW7s65RWsNDJK4ee/BGAMhhB2stS7WWui9n7CEGOMsaXwSZ+d/yR+cOcaY+HL8vcByyzl/7HllyX8qpexgSulBhQvl7XjxCydafIt3Z4BrAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAaCAYAAAB/75arAAAAjUlEQVR42tWRywnDMAxAhSbJRukGPtgDdJSO0k7U4INPvthgjP+VSlsSkkvpqYKH4EnCFkKl1Hhxl1LOQIFaa2Ccc1Nr7SqEmDGEAIwxBrz3QIUL9t7hjbUWaq3TRqaUWMJGMjS+l4edfy2/XHOMAWt+eJ3FTuacWS5YSgEmxviU9M/z58R0tIXEifLtATSUfIsSwhegAAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAdUlEQVR42u2TsQ3AIAwE2YARMkJGyCiMwiiMwgjUFMAIjOC8lMJdiIjd+aSrr3i9MwzjHXoYMOgFmAIvvQCT4aEXYNLvEK2ZMEKvFODQVqC1Rl/sve8Faq20cMIIvUYgQR5ZMJDh6RixQIF8NMHAgMEZhrHNDU+1T3s3o0CaAAAAAElFTkSuQmCC"/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABhUlEQVR42uXVzUoCYRTGcXNGR3HSDPtASyIhrIjaFJlBRBRUdAUGQQurdVfSrl2LuhEvYxR1IYroRhCEWU1/4R2Yxcz4MUlQB34bGc6D58y8r+/vl2EYczNpKvitzN9/orEEGUEoQhAyJDNs2gAJCiKIYVGIQUUIAWvQNM2jWMEGtoRNpJBAFOGJgsRDAahYRRbHuMAVznGEHaSxZBNkvyPLQhXEkUEew+riE88o4AYn2BVBCcxDgWz+G6fxhLGMPdzBWh184RUPuEUOWaSwgBBkpwAZESRxiALsqoV3EXSPSxwgLUIUc1xOAWvI4RFupeENRVxjH0moCMBvF6BiHXkUMap0lPCCM2QQh2LuwingFE8Ytwa4wTYSCEEaGVCtVo1x1Gq1CQPEiDRNM9yUy2W92WyWdF13HJHrkt2aNxoNbTAYuC555Gtq17her7f6/f7HmK+p+4dmbcysO71ez8OHZnNUDBtXKpVuu932clTM/rCb/XHt/cL5/SvT+6XvKcz3r+sbpPMfjCOvfIMAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAN0lEQVR42u3NoQ0AMAwDwe6/YYBncWlUyQFBBX+SickfADM/0k+AQCbJffHfqir3hZ/ADwEAowtQ1mmQzb8rQgAAAABJRU5ErkJggg=="/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAABdUlEQVR42t2WzWrCQBSFq1FSaSjaFi1iF6UFtdBdF6WhC0Hoym3BlSAu+wbddSF9xfyTJ7k9gRMJuY2Oi2w88BG5zLlHZiYzOTttiUijyP768Y2bxCKVv0nD+B/T2AY2OAcdPnOKNZtjrdx/KMCi6QJ0wTW44fOKFGtdjrXzEJPml2AA7sEEPIExeCRj1iYcM6CnOoTz2AYOuAVT8Arm4APMwDuZsTbnmCk9Dns0qxbVBj3wAFzR+iRlufT02IOLrqenA/rgGSxE64uUtaCnzx7WfwEtLtYQvIClaH2Tspb0DNmjtS9gxHldidYPKWtFz+hQgAPuwBtYi9aWlLXOPPQ6JgEu2IjWLylrQ89xAVEUSRzHkiSJpGm6C8jqBVSA8RR5nie+70sQBHmjbUZWL6CmyHiRVQAXWQfoRTbapiqA21QH6G1q9KJl5jwkDMPdi6YCzF40fVSoAB4VKqDiqKj1sKv9uK71wqn9yqzt0q/vs+Wk9QeSkdKwXIKzCgAAAABJRU5ErkJggg=="/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAfUlEQVR42u2MwQnAIAxFu4EjOIIjOFJH6EiCF8fw7BQZwf5AegkU2tje8uGR5Afe5vH8mTHGZG5+EXSzSPoMCEyzCPd+9SYRZgCFb7MIJNB5XxURT7OotTYFkql5Jqq1TiGBzrvinUj2AMqSSHXHikj3GZBVpH8R9M3j+Tgn8lcGnlSSd08AAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABhUlEQVR42uXUz0oCURTH8VKz/BNFmZJ/iMAoEmohlRRI7Yp2Qa0igyJc9Qot2vUGbnwB3yJXPYKaCi5m62LQzSymr3KE09hAi1nVgQ93hnv4wZ259878o7Jte/YXfADPcAvwIeDgFwHMKYFJoDPILw0hREQYCyKMKBZlDCEIvzMkiAhWEEdCxlURRwoZJBGTwOA4SC0nLJMb2MGujFlsIYc8DrCPrIRHZtR3mccSMtI0qTMUcYoLXKGMTxxiE8t6WSHEsI2iCirhDg94RgVDmTtHDmvjILWsBPZwqYJe8Io3vEPXDfJY10ERJGXiWjVXUYMBZ5VQQMoZlMIRblVzHSZ+qkccI62DokijgHvVbMGtnnCCjGtQu922R7rdriXPU3SQ69IajYY9MhgM6p1Ox5R3zbE0l4+tmquWZdV6vZ7hDNIf2/X3T5r17zcM40MH6d/vuiGleWpD9vv9SrPZHDLn2JAuR0QFTR0R0zTLrVbr2xHx7NB6do14drF5dtV6c/n/7foCpva8IJ04vWUAAAAASUVORK5CYII="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAdklEQVR42u3OwQnAIAyF4WzgCB3BERypI3QkwYtjeHaKjGBfIeClFmvaWx58KAg/ks329WqtBbbBW7vMhhowBH2o2/WhLoJTh0QBrw4JfhXKObcBlnMulFJqNwp4uS+HIjjCNKGDZKshhkCYJlRge/ot2Ww/7gSJGQaejWvrvwAAAABJRU5ErkJggg=="/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAABjElEQVR42uXUPUvDQBwGcNvUatOK4kuKfUEERVGwg/iCguimuAk6iQqKOPkVHLr5DVz8An4LO/kR2jQtZMjaIbRLhvOpPOHOJMahnfQPP5IcyXO5S+5G/ngJIRKUpMRvwiEyIAWjPl5rlApIhgJ5YxoykIMJHnUYJx2ylGFHWjAozQdnoQBlKIIBM2RAnsdpBqa/hbHRgCWowBZswjoss30V1nhcYKe6P0w/aAoWYRua8ABncAKHcABHQlaFbz0JY/589YPm2Psxb+zBCzzCLVzBtWAxeIVvlQHND5rnUC5ArXd4hio8Ke2nsAF5OTwEcWJ32WuwHHiDV6XtnB0XIKsGlWAP7iCqXKgp15ewA8VgUBn24R5+Kk85v+EISpCLDLIsS0Rpt9sez+OC5NDq9boIarVabrfbrfE6bmhysoMhtm07nud9TTbb4iZbfn41xHGcD/Xzsz3u88sfsn9jo9HodTqd0A/JoLgfUi4R0zSbrutGLhEGxS2RwRftMLeRwTe2oW21g2/+/6c+AdO5vCABA1zBAAAAAElFTkSuQmCC"/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAcCAYAAABCgc61AAAAD0lEQVQoFWNgGAWjYGgCAAK8AAEb3eOQAAAAAElFTkSuQmCC"/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALElEQVQY02NkQAOMg1aAmZn5P4oALy8vqoCYmBiqgIKCAqqAmpoaxQJDJsQA+54Krz/ExkoAAAAASUVORK5CYII="/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAWklEQVR42tWLsQlAIQwFBcVKGyEGK61cJ/tXGeVptPjwN/DgQnIQ9xYxRgkhqPceLqUkW5g5Z7g91BYiQq31BDAzxhjmDb13zDnN+/IP0lr7glFKkX3oCc+wAHpnIpi5hlqoAAAAAElFTkSuQmCC"/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAVklEQVR42tXJMQ4AIQhEURKMFZZCrLDyOty/4ijsYuJWewEn+c0buGeIGKUUr7XahtZaENHJgJmj9x7vkTnMOSMTkY2w1opMVX/BPxhjJNgBFxGDq/YAy/oipxG/oRoAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAE0lEQVQYV2NgGErgPxoeKIGhAQB1/x/hLROY4wAAAABJRU5ErkJggg=="/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQYlWNgGGrAH4jvA/F/GOc/EobLwAX+ExTA0IJhKIa1QwMAAIX5GqOIS3lSAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAJ0lEQVQY02NgGErgPxDfB2J/ZAEY9kcXuI8u8J+gwH2chqJYOzQAALXhGqOFxXzUAAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAALUlEQVQYV2NgGCqA8T8QIAuwoPEZWD58+IAq8Pr1a1IF3r59iyrw9+9fhqEJABv9F+gP7YohAAAAAElFTkSuQmCC"/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAASklEQVR42tXDQQ0AIAwDwDqcPhLQgAlM8JqDORilnyVY4JLDX0iaOgWZaeccVkSEKyv23nxjrcU35pyurBhjWO+dFZDWmqkr8Y0Lr65i67XRzKcAAAAASUVORK5CYII="/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAcCAYAAABGdB6IAAAAS0lEQVQY09XDQQ0AIRAEwXa4+iYBDZjABC8c4ADmHheStUAlBc/wb9oOAM45vvfewVrL6WSM4Zzeu3Naa04npRTftdZAkiVNScFTPhkFYuvY2zeUAAAAAElFTkSuQmCC"/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAcCAYAAABYvS47AAAAwElEQVR42tWTPQrCQBCF84OsYJCIYEQrsZAU6QKx9xheyG4L6zTZs3iInGZ9Tx4iAWHaDHwwvPlgyWY2mVvFGNNf/gmZyEUm0q+kwQI4sBROWf6R2ShcgRJsRanM0UnUrEEFTuBC1FeaOYoF2IMaXMGNqK81KyhuwDmEcB/H8RVV7JlxRofiDjTe+0eclLKGDsUDaPu+91NRWUuH4hF0wzA8p6Kyjo5ZNB9t/hjz9Zgv3PwLzUthXjPT4hqewrzqDfMnQ2tu8Pr1AAAAAElFTkSuQmCC"/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAEElEQVR42mP4//8/A8NAEgDiqk2zfDlcXgAAAABJRU5ErkJggg=="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAMAAACu5JSlAAAAZlBMVEUAAACysrLZ2dkmJiYuLi4xMTE3Nzc8PDxAQEBJSUlRUVFSUlJaWlpdXV1jY2NpaWlsbGx0dHR3d3d4eHh9fX2KioqPj4+SkpKVlZWXl5ehoaGpqamsrKyysrK3t7fCwsLNzc3Z2dkN+/dcAAAAA3RSTlMAf3+Sa81KAAAAh0lEQVQoU+3J0RpCQBCA0dW/i02KpEIzzPu/ZJc+7CM4t8e5k3PuYgmX9VNttv2W2iww9gDhe/iK3mZYHhRVIBwe+l9PYQWjzbB/BYB6gdl096ra4WP0PD/kqh25qq4vIjfuIvBuuMrkaURk8yUvGUAiefSU0/5hkJZSPECcZP8J62epztzpDzcuFrDsGN7pAAAAAElFTkSuQmCC"/><element name="hdButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAcCAYAAACZOmSXAAACFUlEQVR42u2WsWoCQRCGE42I5AikkSBaGSwsAiIpQi4BK0vF+qwEjb1gaWMlaGfvA5xYWvgCNraChY0+gU+wmR3+DcPGC0lQrnHg43bvbv5/d25v764uYYdS6voc/MY0AqLEzYmICt3roJlGiRgRJxLELXD+g8hPQDPGHnIAwjiOpHsiSaSINMj8CeRBIwlNBx7RY8Z3xAORJZ6IZ+KFeCXcP/KK3GdoZbU2POLGPIJyOLiYJ96ICuERDaJJtIiPX9JCTgMaFWjm4eHIBRZHWR6Jd8JXpw8f2o/aS5Y8QSRRnqo6X1ThkTTmN1iRKTwfz87o9/sql8updrutTBSLRT63WCzUZDLhtoCvT6dTW8qDR8o2T2OBNL5leJ4WZBMd+/3+y+RwOKhut8vtUqnE92JgfLSiAY+0NHeIDFZo085gI5gvl0s+GjMKPpoq2IOzogmPzDFzl1eriPV6zSI2eAw8c/TZ1M6RAW33R/PtdqsMo9GIRQqFgqrVagy1+dxwOFSz2YzbrutaOeIckOaBZd9sNgro2bFQp9Mx575m5fu+6vV63K7X63xttVqZwfE1qSXLHrjgZEK5XGah8XjM/fl8bsx1nyuBWcqq6DweiNSSCy7wVZMJMNKm3B8MBkac+zCT8CBgLLFetYBNBjefHLnJBG6vu93OP7Wx1pTba6gfllA/qaH+TIT6GxXaD2Q4v86XoPgE1h55oNE1QD4AAAAASUVORK5CYII="/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAMAAACqEUSYAAAAXVBMVEUAAACysrLZ2dkmJiYuLi4xMTFAQEBHR0dJSUlKSkpRUVFSUlJaWlpdXV1jY2N0dHR9fX1/f3+Pj4+SkpKVlZWXl5ehoaGpqamsrKytra2ysrK3t7fCwsLNzc3Z2dky1qB2AAAAA3RSTlMAf3+Sa81KAAAAe0lEQVR42uXNQRKCMBAAQWCCIgGCGEU3sv9/JpXykCLxB8y1D1OdsEaLmqT6p6M6wKn6FuyWaUQL9zdcW2yuLV49dmTUL2S6gcYsr+IbwgdC7MYj/EoqIoZFHF1PL08QkYNO0MG8wMUw5LoOwCQyG+jWTMuS1iXW1SnbAaDLE32SOX+lAAAAAElFTkSuQmCC"/><element name="ccButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAB8UlEQVR42uWWsWoCQRCGEzUcEhFsQpCzUiwsBBGLoElrp0HbsxI09j6ClaXgW5xYWvgCNhaWFjb6BD7BZmb5HWSXXAw5rnHg43bd3f/fG+f27uE+Qyn1GCa3mMVAnEj8k7jowdwyxKQnwiGSxDNI/Qmsg4YDzbh15/jRwaIM8UJkCRfkbsQFWWhkoOmwh2nqEGnilcgTZaJGvBF1onEjdaypQSMPzbRlzLvBYIl4J9qER/SJATEkvn5hiLl9rG1DqwTtFFId06ZIQ4H4IHwVXvjQLMDDkcJC/svEpwo5oFmGR1JSjD++ptNixGQyUcViUeD+JRaLhapWqzLmeZ46n8+mhAftLKo6cTF1UQB921AEpT2bzdRms5F+q9Vic5lnRB/armmaI+ooBAkI6TvCnYnwaDTitr5ynE4n2YQRA9aGR8o0baAKOXSaRMQOufP1eq2CApqNQNPD4aCY3W4nptS36Ha7emy5XHL/R4JNkd79fq8uVCoVLez7vu5Pp1Pd73Q6qtfrcZuvemy1WskmrzQC0yuFdL1gPB5rERhJez6f80ak32w29QbxHxumdiFZj8z1gu12KwUD9EYwzuYwk43xGsPUfmSswwGTwyLwcJBj8Hg8+mEZklbgMRj9gR/9qy36l3j0nyuRfphF+wl69/ENcVv6gzz3ulwAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAA30lEQVR42u2UzQmEMBCFtwNLsARLSAkpwVJSwpZgCQEv6skS5iieLCElzL6FJwxCDlllT3nwkb8hXxLQV01Nzc/Z9739l8gBBRE0j94AiBk3oAceJCCPCM2GauY6zh3AsR/vit5AT8zzBbZCoWdNWypQS0YmQM2tekpDkWzbNs1xqRMQwGraMtk8z5rD1k3TJJgLYF2WZfi2oEw2jqPm4HoHhHMOJNCDAxTLnGHIyALXhRLPmnsfOU+dTpkRJooc+/F1N/bpzLjhITxFAp77i1w3440UxALRzQPU1NTk8gF0y3zyjAvd3AAAAABJRU5ErkJggg=="/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAC2UlEQVR42u3WPUwTYRzHcWmBFnqKBYpAHVSQoEB8QTQaiMSILhgDiiFxUBMSlUETnYiDg9GJmDA44OCgo8bF18EFibq5MEBpeUsDIaVAm6P02qTUb5N/k5P2oNg46ZN88tz1yT2//p9e77lt/1u6Fo/Hc9L5GwEmmJGrY4bpz0JlcoOAPFhRCAU2FMAi46YtBa4LyEM+LBKwHSUoh1OUYaeM5yUDtxpSAAVFKJZJd6MGh9GEY6jHXjigpAQaBskySQWlcMpE+3FQJj+DDtxBN9pxCjUogw25yEkJEWbkw4ZiqaBWJm9GK86jEz0YRKKNok9Cm1El11th/i1QF2TBDuxCtYS0oQv3MIObuI+nGMIwIljAQ1xGI5xQINWlBhXBiTqclgtv4xXCUsUTDOADotAwIsce9OIsqmFHPkzJsORvpKACDVLNNfThJ/TtBb7ADRfCEjQm4/3okHkcyaXU3xAW2FEtFW3U3uAbVDn3IQYvQhjGVTSiHIX6MDMK4EA9LsRisbgR2jt8wg/OtbW1NZU+Qu+nX6T/zth1nEBl8q5cH1aGQ+icmpqKG9GHeb1ebWlpSZ2bm4v4fL7A7OzsIn1GYQ7Uod3lcsWN0N6GQqGhyclJNXG+srLic7vdseXlZa/H4wkRnLKMRr9ZFVr8fv8jLh4MBAKv+fbudWEvCfs8Pz/vUVXVRbXaxMRENBgMjiXGV1dX094g6e7GcqmuFVfQiwcszfvx8fGwhPXjGYEf+SxKNRqhI4nj6elpw1vf6A9dgRo0yUWXcINv/piJvRzfRV80Gh1gBb6yAsMERahugc82/FOnC1RQonvYHkELzoXD4S76i+jGLYKeJ6qlolGCtvC4gv5Jr9tGKrEPB9CAoziJNnRqmtaz2YM40+3FCgV2OHT71x7UStXH0ZTJFpNpqEWqtUnFRShFxWabZ1bvHLpd2yrhijB4LcjyXSSLF56sw4WE/HPtFwoiecfnKRGcAAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAk0lEQVR42u2NwQnDMAxFtUFH6AgdISN0hI6UEf4Oxgdvkas9RUZQ/yEBYdChgoZC9eCBLBs/SZLkjxlj3Ol2RehJd6rfDq1UT81eKcwZVCMB9Zw/p7CzfErvXT2ndzB3kAitNfUUQ60V555zLFZKUU/zBscOdo7EFiOcmFLMcQli4y+6Bz4LBx90E3JV8CZJkvwsb8qa9F25tXYIAAAAAElFTkSuQmCC"/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAACOUlEQVR42u3WS2sTURjG8ZqJuTSJTW1T26YqrWmN1jt2ISpWTb1ABS3iRkS84WUndlNQFN34Fdy5d+U36MJVQVroKgnmvgqBZBV3Gf8DTyQMzMggRZC+8CNnJsn75CRnzqRvu/6/Mk1zRw8fwBhbEeSDAT92ih+cU7D8dYiahxFFTPoR1HOG+Fxm7h6kRiE1H8Y49iKJEcQRRRghhQegmTuFKkQMBBDBbkwgjVOY0+Mh7McoEhjSa+OIIawehluYgSB2YQ9SOI0MbuEFfuCizs8ijYOYwRSSCo8g0J2hU9AAkmp0AbfxDJ/RhlV3sYgFZPR4GedwApMKDMNvD+v+RlGM4aga3McKvqO3XuKhxt/wFI+xClOBScTU12dfEEEMIqUZudU7vMKajjewrvGqZjiFOAL2MANhJHAENzqdjumE+ojXeMvxJkyxAh/hEqYxiKBT2AiOY6lQKJhOesNqtdpm93y1WvUUlsAsFrPZrOmEeo/lcrm8Zh1XKpUNxuvWuFgsun6N9t/sAM43Go0PzWbzU6vV+sInztvClvHEGpdKpd8LxArinPMCsa9GjGp287iD51ip1+tfc7ncTzV7gJu4igVc8bL07Rf0GGYwhwyWcI9Zvsnn80XG13EGx3AYafzxonYKjOoNE2pyEmcx3263r2nLmu7ZJ4e9b1ew7fQxhY5jUgEp7FPIAPq9bcTut5cQoohjSOKIIKjGhrjeYryEBhWMnnuZ9+buoaJgUcjW/xeRvu36F/ULlStUoyVtQSYAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2R0QnAIAxEu1lWc5/+ZYKs4TTWjwS0qIFrP+/BkYMLOdCLELKn1tpG5TleYF2yyMUzvCAOZDtwgU85PJGE/+NPyuTJG1Uts/9+sI0+y6GCrtunLHKJHbjAZYcd8x28IJTmhJAtD4gEt9ueDIktAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACFUlEQVR42t2W324SURCHhS67VCoFbYhRkbQsaCwVSwgUaZP2yia9Mb6MN41vYfpIfYIm5QIegJfA3yTfSU52c1i98KabfGGYmd+cPX+Gw7On+2w2m5JPUfxfC5dhB8pQKooXvjGCiohFFRJ8EVTwVSHGtxOckSuOsCb2xUsDe0/swl42jiZxg2wr/kK0REf0DOzX4hXIzsVbaPODsH4VUSOxL8biwsD+SCEhOx/vo61Rq5zd1JipdhBkn6k4hmk2iKZDjdhtuj9Awnqm4twTPopf4lKM4BLfo0tCk1IjCQ3QFF0xR+QK/BBXYgxX+PycOdpmaAC3RG1xiui7uMWeic8ww3dLzgZNO7tEoU1OxYhpX7Dmd+KDgT0ldk5umt/k/DGtioZ4y/E7EUMx4JQcQR/fkJwemgY1OKbhAd6wnscU+ESRQ+jhOyGniyY4QFlE4rk4sCKIJyzFaLVa/XaNhT0iNiH30LTUiEJ9UGeqg8ViYRv3TVxjj80PY3zXloM9QFvf1gcN3mRiIr3pvX2u1+ufHMMvMDefn2MatI2iPjgSZyYylsvlg77fiK/umGLfWMzlmQbt3/UBQoc7530IxLf3QeT3AYIZbzbE9w5SfGfknGb6IAr1Qez9XL8XXabdxtc0sNvEuuS20MZFd0LsXThNqOOrQg0fcS6cXPHiKzOB2L8yg3GKG4WXfoBSUfz//W15ss8fvEcYMYnLr+AAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAbElEQVR42u2Q0QnAMAhEu5kD588JXMNpbIUEpCBpe5+9B4JczF3MQQjpcfeBz+4vxpMe2ULSIF9YjaqWM+hXWRrdA2YZah61Wv2/qGrU6nQkQK6yLmCeCbzFCmk02FxWX/WyYXw1H69mCSEtJ16St50Fqd0HAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAACDUlEQVR42u2Vy0ojURCGZ9Kmk4A63cYLMhdE28tCECUgxCuzGBDc6AgO7uYizKAP4NKNb6S+g08gSZO8QZ7h+Bd8ScDDIZmsLfhIpc7/V53uPnS/e4uRwjn3vsto2sHiggdrw2iGaT4miiKGEhShBDEU8YSH9Jr3G4yLSZGID+Q9qCXk0rIBhoSaj4kyxlnxUXyBz+ITKKcuDdoEb+9KQrufEHPiXqyLLVETmwDUpEE7h7cYGhBxmQk72xAWR+KY/Bs4akfkG3gSekTebaJYFlWxKLbFDQ2e+P0BvRqabTxVekT+M+gPmBKZ2BWn4tn146czCNa+o83wlkNXUGAxRVx3fvyC11HHk9KjQFtvQIxoSeyIE/Fb/BWX5EK5auQnaJfwxsMMyMSeOKPZVX8IzVUjP0Ob+QP8Y1rhPq6Kg2az6Yw8z12j0XCKf4blVuuum9Y8eCvBY8ritFgTXzudzl273c4VzlBcG93/tmYa05oHb2XQMZ0RK2JfnFujVquVs9M/huVWY+g52hXzDjqmJe7jgqhZI+3wVvkFA04N8gtbI6/hSekRhV4VMS+vee3uAeOeOOSs1w3yQ9Zq0j6aB2/sPwP/ZTeFYUEsc/mZWISM2jKaeTzeyy50FWV2k/LgquQJpNSmySfxeLsPfnAQlzCC1dgAoInxDP9Vg8gAauG1//82I/ZM1DztW4wSL9xQTRdfTNL0AAAAAElFTkSuQmCC"/></elements></component><component name="display"><settings><setting name="bufferinterval" value="100"/><setting name="bufferrotation" value="45"/><setting name="fontcolor" value="cccccc"/><setting name="overcolor" value="ffffff"/><setting name="fontsize" value="15"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA8CAIAAAAok0etAAAAJUlEQVR42mNKTU1lunnzJtP///+ZGBgYwDQ6xiVOrhw1zSNRPQBu5Zagca3K1AAAAABJRU5ErkJggg=="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAnElEQVR42u2WvQ2DMBCFv8I1M3gjMoTpMwqjkI1S0RnJEhaiuZcFEuyCBCnyqz+9+9XpHMAwDD0wAp4PciGEXtK0risxRvZ9fw+a2ZhzZp5njuTMzC/LQklOEtu21YGSyqCZ1YHfcazR1Tle6FjVnr+q+vz2XJxjW4p2Utr2tFn/OvT5s5b0BHwJdmZ2Bybg0NmllB5d190kHb5cL8J5WhbWZJeBAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA8CAYAAABfESsNAAAAmklEQVR42mNKTU39jwffB2J/BiBgunnzJgM2/PjxY4bPnz8r/P//f0NKSoo/E5DBgA1//fqV4enTpyDFDP/+/ZvAxEAAvHnzBqRQAaeJMPzz508wTVAhDBOlEGg1LUxkIAIMtBsH0ERigmf4+XpggodGbhxNFKNFymiRMhrXA1Gk0D+uoQH+gIkIRSCrC5gIeOIBkA74+PHjRgDhswBcaL43lQAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,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"/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACL0lEQVR42u2T64nCUBCF7SAlpIQtISVYQkrYElKCJaSElHBL8LfPKD7wyUXxgYrOzkCyHC6b3LgasywOfBDuOTNzcklq73rXfygiqjMxk1YsZ38lXIOyq1F1OI/s5VUZsAlBNOMlaDhvVhXOZ7B80D4ztNeV+VNY9VdUzg3VM/5srM9XhXOMb0zleJXxjTqlB7xer8HtdiPAy/KKhl7pLTXc5XJxGc1QggJNIXgOfs24pQU8nU4hQynn89kFjZD0XDyGFpYS7nA4uMfjkYAQddQEQwtRk1lPD7jb7SKGUvb7vWvoTdCbqIkXNCF6arjNZuNtt1sCAtPDZwp09YMe4AyZ+bSAWmvFUILm4Y7Fo0xderQUep5Rq9XKW6/XBAQ/+fi8AZ5GhicwZj1+i4vFIl4ul5QQZ/lYC8AX5Pi+58nsh8LNZjOfoZT5fO7neAPwZgaUGeIB/F+Fm0wmznQ6jRlKyH1b1uvgred5zbmy6+6Ao9EoGI/HBHh5ftF/6SXZdVe44XDoMJqhBFWgxwO/V8CvwK+Z4rfY7/eDOI4JsC4cDAYO4yVYl8lM3CE7C4XrdrsuQym9Xi+qlVQyW3YArrWp3W6HDKV0Oh1usler1fLTHnku0iOzxQ+EtiUfDAHYYOsl5I6+0Oj9yDNHYNSM84KADqOhNyq65K5fX/wP9tpfznrV9kWu7dbtn1bxgCHj1sorfKmwaEDFUMUo21XrCsNpyVD4yl8GflLvetcfqy+dCCa6ODMoXAAAAABJRU5ErkJggg=="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAArElEQVR42u3YywnAIBBFUTtJaSnFUqzLhVjKZDZmI8HfGx3CPLj7AyKIjoic5pwBDWhAA+oBei5wlxMYClgGh6KBcKgUEAaVBi5DdwGnobuBw9BTwG7oaWATqgX4CdUGrKBagWX3MjCl5DmSKOe8Dowxeo7ABQ5zxGDgC4NdEhCwgmkBfsJOA5uwU8Bu2G7gMGwXcBomDVyGSQFhMDQQDkO+ZuxnwYAGNOAfgQ8LTbXBn1RvGQAAAABJRU5ErkJggg=="/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACJElEQVR42u2YS0sCURTHNc3sTWEPelMQUQQtKnptIojosWgdFLTIFu2qdZ8i6Cv0BVq3KUi3IqgI4hN0rS5v/xtnahh1Gqd7Z0bowA/EWcyPM/ece+9xMcZcTsbVcoJ6gedul4VhSJBLEW0a3LKFdQVVYh7gBT7QQfjoP48ia5egh4S6QT8YJPjvHuAH7bJEGwpq5PrACJgB88QsGAcBet4pQ1RPsI1eyLM0ChbABtgD+2AXrINFMAWGZIg2ajNKQfDsDYA5sA2ewRt4ANfgDByCLbAEpkWL6gl66CXDYBmcgBf2E1HwCG7BBTiWIaon6KXCGANrlK1XVhtx8ATuZYgaEZwAm+ASvLPGkZAh+psgL5BJWn9X4IP9HkJFjQrugCAIMeMhRLQZQV61YdZ86Ikq7amXGr5XK2mFYCPRI1rbi/QOvjt1UTa/Ja0U1IregXNwAFZpZwpoJe0QVLcn3kdvwCntUrOUST+tSVsFlYjQzsQ3ghXquz2URUcIKvFEa3Kaqlv5zMYFi8ViOJlMMhmUSqW/CxYKhXAsFmMiSafTkXK5LOYTixTMZDLxSqUitkhECEIsUa1W5bSZvwiqxOQ1ajOCdcSkbXVBCIYEiQk/LHwdt/L5/IdVYqYOrBB8t0rM1JE/l8u91msXMsRMXZqy2eyLqsFGqY/ZdmmquXZC6jmVSr1R57fv2un4i3tLjD4cPzxqifGb4weYjh0B/0/5m+QT3Dh1BNFdpj4AAAAASUVORK5CYII="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABxUlEQVR42u2XwY3CMBBF0wElpARKcAkpISWkhJRACS5hS3AJnOHAwoEDB2QOHJCQmP2DcrBGycZ2BtiVMtKTEGLe/NixJYq55prrxUVEBjSgBStgu88NMJ8KVXZBPI2XBxaU7wi2AJbyy7LjVeGWwNP08uzSDlcDPzLUCcZ+X79j5RyofumtgNNeSfnO+QG5SfCYIc+kd3LgQKxzpNzT9cqy2VfJ4BPr70iptXpG42JXWcXH4+EBBbhCqdgl3D5JcL/fDSBBpRWQXT3++N253W4NoABfKBc7xYwmuvl6vbaAApx2QHaKGW108+VysYAC1AOyU8yID3g+n1eAAtQDslPMiA94Op1aQAHqAdkpZsQHPB6PDaAA9UPCTjEj/pAcDgcDSJB1zez3e9Pjr3r8Jkm82+08oADe5lSH6Xqt+N4Jd/oObbdbCyhks9mYREcd9D9DskN6gU0OCFEJSODBIsGxEv22c5Ag7/9KJyTBV0K/AzSCLXKLV6vnieuEftkr+RY7khVyGQyqJ74iEp0/TxBVTGKPedX2aj1UC+jPhuTDBEgvpH7AdUJA/4GAw2GAAy2oNQ7KlEt+DWwXxoBFMddc/6x+ACbEv+zn5grUAAAAAElFTkSuQmCC"/><element name="replayIconOver" src="data:image/png;base64,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"/></elements></component><component name="dock"><settings><setting name="iconalpha" value="0.75"/><setting name="iconalphaactive" value="0.5"/><setting name="iconalphaover" value="1"/><setting name="margin" value="8"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA80lEQVR42u2WQQqDMBBFQ4pQeoVueiN7BtG9R+lR7IlaAllnIZaCxHR+KWLpou7mCxE+Jm7m8b+TiTXy1HVdim5N0yQNoTYYwGKrqiqnaer6vj865x4aQm0wgMXGGC/yYfTeP4dhiBpCbTCAxQrZKYQwppSMpsAAFgAZJiGy90LbITCAhc8hBneWLs2RMegrMgZ3ZodYIuP8qSnbfpmhln66jO5gpOsyhsh4HaI7qfMs29Qsy5H9iyxfYddMe8r7EFWX5cg2FVkeritO6rtsCoILWgEWONRiY4zZy3unoU9tmNLaEMJVFmeRl48HDaE2GMDyAjEWKwKFLBqcAAAAAElFTkSuQmCC"/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABD0lEQVR42u2XQQ6CMBREm97BeCnjIQjcxLt4KVckrKuphYIC/jEtKRu3fxaSDGlh0ZeZ/2mxRq66rs+iW9M0bw1hbTCAxVZVdVqW5eq9P7Rte9cQ1gYDWOw8zxd5ELque4QQeg1hbTCAxQrZ0Tn3XNd11BQYwAKgkUmI7DsQyklTYAALn0Nyi4lyVBZciltkDNpFpu3QrqizZcoiLeqi7dUj2xxKFa6q/C3idIiyywgiI3ZIBi9th8BQdhmFdl3GuJepn4fy8eMf2c/IEtBEENnEu9uz1BBvlzFGRvHXwRmZUMU0icpCUUfL4E7pEhwayvOIllLbD3DIY2KMUSvsvDZYrHPuLYM+v9BQgunB8gFJekgEq5c0PwAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4//8/AzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="activecolor" value="bfbfbf"/><setting name="backgroundcolor" value="262626"/><setting name="fontcolor" value="999999"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="overcolor" value="cccccc"/><setting name="titlecolor" value="cccccc"/><setting name="titleactivecolor" value="ffffff"/><setting name="titleovercolor" value="ffffff"/><setting name="titlesize" value="13"/><setting name="titleweight" value="normal"/></settings><elements><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAACCAIAAABANcwGAAAAKElEQVR42mNhGPqAmZmZiYkJQsIZuLgsvr6+Q9q3/2Dg79+/yAxcXADiODDtLQ68BAAAAABJRU5ErkJggg=="/><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR42u3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEB5C4HAAAAAElFTkSuQmCC"/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAkklEQVR42u3QsQkAIAxFQQsHy/4LqYWohYW9IAj34ENIeTkiRvq7vlb3ynHXB/+Wk64CCBAgQIACCBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQAEECBAgQAEECBCgAAIECFAAAQIEKIAAAQIUQIAAAQogQIAABRAgQIACCBAgQJ1NmcoiAdM9H4IAAAAASUVORK5CYII="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe/deku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3/6TARgA1wJNszqw3XsAAAAASUVORK5CYII="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAEElEQVR42mNiIA78J4AJAgCXsgf7Men2/QAAAABJRU5ErkJggg=="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAJklEQVR42mNgIA78J4CpBu7jseQ+NS3yx2ORPwOVgT+az+6TYgkAKMIaoyp3CGoAAAAASUVORK5CYII="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAALElEQVR42mNgIB74A/F9IP4PxfehYlQF/kgWoGOqWnYfj0X3qWnRfwKYIAAAPu0ao3yGmCgAAAAASUVORK5CYII="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAAMElEQVR42mP+//8/Q0NDA16sqqr6Pycnp6G0tLShqqqqoba2tgEEGhsbG6CgkZAZAEhcK/uBtK2eAAAAAElFTkSuQmCC"/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUElEQVR42q3NoREAIQwEwHSYJjOo1IBIDfEx+EgEDMfLVwyCbWDphoig1gp3R2sNmYneO+acWGuBXimlxCEKekVV+RAxvWRm/EXxi2KMcZ1sxLJpnEUZrv0AAAAASUVORK5CYII="/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAUklEQVR42q3NoREAIQwFUTpMk0wUNSBSAz4mPhIBk8/JUwwiW8C+8pqI0BhDzQzujjmnrrWoZNZao947Pgg/CHtvREQexsx6gTQNqrXiAuHlcQDl9mmceNYnwwAAAABJRU5ErkJggg=="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="cccccc"/><setting name="fontsize" value="12"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="cccccc"/><setting name="overcolor" value="ffffff"/></settings><elements><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAASklEQVR42p3KQQ2AMAAEwXOAi/lWSqUgpZIqASmVAN+GNECYZH8bHDhfOoLyYSxJEuwP054Z+mLqucOGMU0DW1ZQp7HmCRpa/roABHU6b1RN/woAAAAASUVORK5CYII="/><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAADklEQVR42mNQQwIMxHEAuXQHISaBGr0AAAAASUVORK5CYII="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVR42mNgAAI1NTV/IL4PxP9hnP8wzACTQRb4j4wBSrYUAF5mO7QAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVR42mNQU1P7D8T3gdifAQSgAjDsjy5wH13gPwBoAhQA/dBvkQAAAABJRU5ErkJggg=="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHUlEQVR42mNQU1P7j4wZgMR9dAF/FAEQgAqCVQIAxzkUAKo9yiMAAAAASUVORK5CYII="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAHElEQVR42mNQU1P7j4wZ0ATuowv4wwTugzlAAADkhRQAhODqdgAAAABJRU5ErkJggg=="/><element name="menuTopHD" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAYAAABtGnqsAAABKUlEQVR42u2WYQ2DMBSEcYCESuAHAioBCZOAhOFgEiahEpCAhEpAQtcu1+TSwSDbfrDtvuQFWtpHe7lXqCohhBAPDMPQxBhjhBhzjDM9O3MbfWmspfYVc82zeegPlCMUkfpc8f4aa2qOKl5eYI+2iTHlTewU0Mc4bQnPAq6No/UYtN1SniMJmDbuFhzp9wgYr11yIO6ndwWknPd3cM6jCrhValsCJod0VMrduwJS3nDY0qWF9tlB1Gf2OBDlVp5j7kMCpvzjN3xATD6kIYjjcwclPi6dUXhWiu/x7D8EJJFmOMvDSX3hOI/rTOJOuWRp7CWLQnPGLMZPCkjOsuTEtLG6+LDY4lfFruRp4ELLsTQH48xaHv1kCiGEECLStm1QvB5ykBBCiJe5AX69621Fd8YvAAAAAElFTkSuQmCC"/><element name="menuTopCC" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAABjklEQVR42u1X3c2DMAzsBhmBEXhggIzACIzACGUDRmCEjsAIGSEjMAIfkS7oegr0oQ/9IvkkC2HH+fHZDjweBoPBYDAIpmlqD1kP2Q/ZDhnEPsA2kM5Dt5PfWNBnSfpnEpojvUfYwyE92ZJulPXWi/3ONQff5eDhvcG7pzGvFJwcAA2I+DUcRFnrJABkhTwe8yX/lgiIYl9pP0/af9CkqYmAlN0v0TV08HTASAdvSgRAF4S4OwJiDjbZEykLVwAFnQlYMJfT/dZIwFtbKNjHXOIga6aAxOyPoATxvSNgL6zFQd7xXLEu2xzmCpCTjBoJOLNOKqClrH7r9RcEjBqEDwRsmrVcjURAbm09V4O00EXPUBMBDfde7rGwRRm/aEbezH1HwMxBo17eqy9d1iu1r/6ujdZ4D2wo94inQ5BmGdvD/i0BDkTn9d6+Zgq+Qb6CNmpBm94ntX4NeamEttRbMc59OjS3iqvLEjpfaF/+qi3KPrz9SBgMBoPBYDD8a3Rdt5v8TiwDDQaDwWD4Ef4AO4h4lB2vwSEAAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAuElEQVR42u2SQQqGIBCF/wOU1UYUMjAiQdSTeI4O2DnmUL9PatVq3AUNPBhEPt6bmd9XL6u+77uiXHRAV9+1wvais4iEEFXor7e9xdkJiJSSjDG0LAsppWgYhgplOb2iVdi2bRRCqHLOkdb6dpo5wAPu4AyglFJVjJGstTSOI+EPF4iYD+C6rjRNExuIyJgZYgJU5b2neZ7vBWX2UrAAzAwx4QwwuLuX0no2mBlAcMY4G85hf/Wu+gNm+kvWRCvtuQAAAABJRU5ErkJggg=="/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfklEQVR42r2VTWqDUBSFG6v5KcVJsWTWaUZdRLuNbsNxt5CZ4/xsIJhAkGQJ3UBCcCA6UhBJQDDk9h04giREKQkVPpD37j3cc+/z+dD0iEirSn10s4hGHokG/iReEdIVbUVH0SMdrumlcKMYKzEUTwpT8aKwAN9N7hmMbdWKsYJnCrwpBop3MuCaxZh2KXrNpsHAPpK32+2H4zjfw+HQAXjHGoX7jDUu7FNQpxULCa7rftm2/TMajeLZbJaB8XgcYw17FLWYo58LaizfhCVVxScSl8vlYbPZSBiGEkWR7HY78TzvgD3E0L7JXO3cbpdNH8AaqoFYmqZSFIUcj0fZ7/fi+75MJpMYMYhlTre0XR1GT/GK5qNfsIjKIFY+p9NJ4jiW1Wp1QAximdODRqMgbKKyqmCSJLJYLLJrgrWW0TPYhBDI81yCIJDpdHrVcu1QMAD0DDZRGcTW63XdUJqPDSqdz+cZ+oZhNB6b+x/s+396t18Od72+/vuCvf0X8At7J48fIgP61QAAAABJRU5ErkJggg=="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAAFUlEQVR42mP4//8/AzUxw6iBg89AACt1ZqjY29nMAAAAAElFTkSuQmCC"/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAAPklEQVR42u3MoREAIAwDQDpI95+xVwG2AjziY3IR+ViPZOaeu7tXVc2O2y+AQCAQCAQCgUAgEAgEAoHAP8ADVGLAaqN7TdUAAAAASUVORK5CYII="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAXklEQVR42pXOMQrAIAyFYUGSIeqQuLh4Ju8/eZRXIhQ6WMHhhxDIRwKAsKv3jm+tNagqcs4gIvzdhQM4d2BKCcw8r8FSyqi1Lsgzs/WdgzHGcQ2+qIhMhzyffXe6eQBmfbZnUQ+tqAAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAX0lEQVR42p2OsQrAIAxEhRAHoxB1cfGb/P/JTzkboVsttMODcOEe5wC4EymlEUKYMUYYdlv21jk+VHXUWtFa25RStlREQETjs7D3Pi9wY9Kc8xZ67+cfIZ6EtpKZceot+LS2cEn/XGYAAAAASUVORK5CYII="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAASUlEQVR42u3MQQ0AUQjE0CFYgARQjGvWwBewh/beZ3enV7t77q7MVFWpuzUzigiZmSTZ6zNAQEBAQEBAQEBAQEBAQEBAQMB/gB8nJqOYNsUfIAAAAABJRU5ErkJggg=="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVUlEQVR42pXMwQkAIQxE0XSYshQtImXYhh3kKFiD+L3s3iTgwBz/E0BuTylRSsHMaK3Re2fOyd6bb9dOAtAD0J/BnLMGoD6DgNRa1cz8B8cYvtbSqDn4F/TaDHcq1wAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAVElEQVR42mP5//8/Ay7Q09PjLyIiMkFCQkJBUlKSQVxc/IGoqGgBMzPzRlx6WHBJdHZ2+jMxMW1AFgMapAAVCwDijSQZCHT5BAbcYALJBgKBAjlyAHZIEpxZZYn/AAAAAElFTkSuQmCC"/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAnklEQVR42mP4//8/AxbMBMTsQMwHxMJALALFwlAxdqgaDL24DOMGYoVly5ZFVldXz6ysrFwOwiA2SAwkB1XDRMhARqjtigcPHsw/d+7c9Z9A8B8KQGyQGEgOpAaqlpGQgSAv2Vy7du38fxwAKmcDVYvXQCZoOHkjuwwdQOW8oWqZCBkICvyA/4RBAFQt/Q2kqpepHilUTzZUT9gUZz0ACDf945eBHBQAAAAASUVORK5CYII="/></elements></component></components></skin>';
    this.xml = f.utils.parseXML(this.text);
    return this
  }
})(jwplayer);
(function(f) {
  var h = jwplayer.utils, e = jwplayer.events, d = e.state, a = h.css, b = document, c = ".jwpreview", k = !0, g = !1;
  f.display = function(p, j) {
    function l(a) {
      if(ea) {
        ea(a)
      }else {
        switch(y.jwGetState()) {
          case d.PLAYING:
          ;
          case d.BUFFERING:
            y.jwPause();
            break;
          default:
            y.jwPlay()
        }
        X.sendEvent(e.JWPLAYER_DISPLAY_CLICK)
      }
    }
    function q(a, b) {
      M.showicons && (a || b ? (I.setRotation("buffer" == a ? parseInt(M.bufferrotation) : 0, parseInt(M.bufferinterval)), I.setIcon(a), I.setText(b)) : I.hide())
    }
    function n(b) {
      x != b ? (x && m(c, g), (x = b) ? (b = new Image, b.addEventListener("load", v, g), b.src = x) : (a("#" + t.id + " " + c, {"background-image":void 0}), m(c, g), B = C = 0)) : x && m(c, k);
      s(y.jwGetState())
    }
    function r(a) {
      clearTimeout(Z);
      Z = setTimeout(function() {
        s(a.newstate)
      }, 100)
    }
    function s(a) {
      a = Q ? Q : y ? y.jwGetState() : d.IDLE;
      if(a != V) {
        switch(V = a, I && I.setRotation(0), a) {
          case d.IDLE:
            !D && !L && (x && !E && m(c, k), q("play", z ? z.title : ""));
            break;
          case d.BUFFERING:
            D = g;
            H.error && H.error.setText();
            L = g;
            q("buffer");
            break;
          case d.PLAYING:
            q();
            break;
          case d.PAUSED:
            q("play")
        }
      }
    }
    function v() {
      B = this.width;
      C = this.height;
      s(y.jwGetState());
      A();
      x && a("#" + t.id + " " + c, {"background-image":"url(" + x + ")"})
    }
    function u(a) {
      D = k;
      q("error", a.message)
    }
    function A() {
      0 < t.clientWidth * t.clientHeight && h.stretch(y.jwGetStretching(), w, t.clientWidth, t.clientHeight, B, C)
    }
    function m(b, c) {
      h.exists(F[b]) || (F[b] = !1);
      F[b] != c && (F[b] = c, a("#" + t.id + " " + b, {opacity:c ? 1 : 0, visibility:c ? "visible" : "hidden"}))
    }
    var y = p, t, w, z, x, B, C, E = g, H = {}, D = g, L = g, F = {}, I, Q, V, M = h.extend({showicons:k, bufferrotation:45, bufferinterval:100, fontcolor:"#ccc", overcolor:"#fff", fontsize:15, fontweight:""}, p.skin.getComponentSettings("display"), j), X = new e.eventdispatcher, ea;
    h.extend(this, X);
    this.clickHandler = l;
    var Z;
    this.forceState = function(a) {
      Q = a;
      s(a);
      this.show()
    };
    this.releaseState = function(a) {
      Q = null;
      s(a);
      this.show()
    };
    this.hidePreview = function(a) {
      E = a;
      m(c, !a)
    };
    this.element = function() {
      return t
    };
    this.redraw = A;
    this.show = function() {
      I && (Q ? Q : y ? y.jwGetState() : d.IDLE) != d.PLAYING && I.show()
    };
    this.hide = function() {
      I && I.hide()
    };
    this.setAlternateClickHandler = function(a) {
      ea = a
    };
    this.revertAlternateClickHandler = function() {
      ea = void 0
    };
    t = b.createElement("div");
    t.id = y.id + "_display";
    t.className = "jwdisplay";
    w = b.createElement("div");
    w.className = "jwpreview jw" + y.jwGetStretching();
    t.appendChild(w);
    y.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, r);
    y.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, function() {
      D = g;
      H.error && H.error.setText();
      var a = (z = y.jwGetPlaylist()[y.jwGetPlaylistIndex()]) ? z.image : "";
      V = void 0;
      n(a)
    });
    y.jwAddEventListener(e.JWPLAYER_PLAYLIST_COMPLETE, function() {
      L = k;
      q("replay");
      var a = y.jwGetPlaylist()[0];
      n(a.image)
    });
    y.jwAddEventListener(e.JWPLAYER_MEDIA_ERROR, u);
    y.jwAddEventListener(e.JWPLAYER_ERROR, u);
    t.addEventListener("click", l, g);
    var oa = {font:M.fontweight + " " + M.fontsize + "px/" + (parseInt(M.fontsize) + 3) + "px Arial,Helvetica,sans-serif", color:M.fontcolor};
    I = new f.displayicon(t.id + "_button", y, oa, {color:M.overcolor});
    t.appendChild(I.element());
    r({newstate:d.IDLE})
  };
  a(".jwdisplay", {position:"absolute", cursor:"pointer", width:"100%", height:"100%", overflow:"hidden"});
  a(".jwdisplay .jwpreview", {position:"absolute", width:"100%", height:"100%", background:"no-repeat center", overflow:"hidden", opacity:0});
  a(".jwdisplay, .jwdisplay *", {"-webkit-transition":"opacity .25s, background-image .25s, color .25s", "-moz-transition":"opacity .25s, background-image .25s, color .25s", "-o-transition":"opacity .25s, background-image .25s, color .25s"})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils, e = h.css, d = void 0, a = document, b = "none", c = "100%";
  f.displayicon = function(f, g, p, j) {
    function l(a, b) {
      return"#" + m + (b ? ":hover" : "") + " " + (a ? a : "")
    }
    function q(b, c, e, d) {
      var g = a.createElement("div");
      g.className = b;
      c && c.appendChild(g);
      n(b, "." + b, e, d);
      return g
    }
    function n(a, b, c, d) {
      var g = r(a);
      "replayIcon" == a && !g.src && (g = r("playIcon"));
      c = h.extend({}, c);
      0 < a.indexOf("Icon") && (E = g.width);
      g.src && (c["background-image"] = "url(" + g.src + ")", c.width = g.width);
      e(l(b), c);
      d = h.extend({}, d);
      g.overSrc && (d["background-image"] = "url(" + g.overSrc + ")");
      C = g;
      e("#" + u.id + " .jwdisplay:hover " + (b ? b : l()), d)
    }
    function r(a) {
      var b = A.getSkinElement("display", a);
      a = A.getSkinElement("display", a + "Over");
      return b ? (b.overSrc = a && a.src ? a.src : "", b) : {src:"", overSrc:"", width:0, height:0}
    }
    function s() {
      var a = z || 0 == E, g = "px " + c, f;
      e(l(".jwtext"), {display:x.innerHTML && a ? d : b});
      setTimeout(function() {
        f = Math.max(C.width, h.bounds(y).width - w.width - t.width);
        (h.isFF() || h.isIE()) && f++;
        h.isChrome() && 1 == y.parentNode.clientWidth % 2 && f++;
        e(l(), {"background-size":[t.width + g, f + g, w.width + g].join()}, !0)
      }, 0)
    }
    function v() {
      L = (L + D) % 360;
      h.rotate(B, L)
    }
    var u = g, A = u.skin, m = f, y, t, w, z, x, B, C, E = 0;
    this.element = function() {
      return y
    };
    this.setText = function(b) {
      var c = x.style;
      x.innerHTML = b ? b.replace(":", ":<br>") : "";
      c.height = "0";
      c.display = "block";
      if(b) {
        for(;2 < Math.floor(x.scrollHeight / a.defaultView.getComputedStyle(x, null).lineHeight.replace("px", ""));) {
          x.innerHTML = x.innerHTML.replace(/(.*) .*$/, "$1...")
        }
      }
      c.height = "";
      c.display = "";
      s()
    };
    this.setIcon = function(a) {
      var b = q("icon");
      b.id = y.id + "_" + a;
      n(a + "Icon", "#" + b.id);
      y.contains(B) ? y.replaceChild(b, B) : y.appendChild(b);
      B = b
    };
    var H, D = 0, L;
    this.setRotation = function(a, b) {
      clearInterval(H);
      L = 0;
      D = a;
      0 == a ? v() : H = setInterval(v, b)
    };
    g = this.hide = function() {
      y.style.opacity = 0
    };
    this.show = function() {
      y.style.opacity = 1
    };
    y = q("jwdisplayIcon");
    y.id = m;
    f = r("background");
    t = r("capLeft");
    w = r("capRight");
    z = 0 < t.width * w.width;
    var F = {"background-image":"url(" + t.src + "), url(" + f.src + "), url(" + w.src + ")", "background-position":"left,center,right", "background-repeat":"no-repeat", padding:"0 " + w.width + "px 0 " + t.width + "px", height:f.height, "margin-top":f.height / -2};
    e(l(), F);
    f.overSrc && (F["background-image"] = "url(" + t.overSrc + "), url(" + f.overSrc + "), url(" + w.overSrc + ")");
    e("#" + u.id + " .jwdisplay:hover " + l(), F);
    x = q("jwtext", y, p, j);
    B = q("icon", y);
    g();
    s()
  };
  e(".jwdisplayIcon", {display:"table", cursor:"pointer", position:"relative", "margin-left":"auto", "margin-right":"auto", top:"50%"}, !0);
  e(".jwdisplayIcon div", {position:"relative", display:"table-cell", "vertical-align":"middle", "background-repeat":"no-repeat", "background-position":"center"});
  e(".jwdisplayIcon div", {"vertical-align":"middle"}, !0);
  e(".jwdisplayIcon .jwtext", {color:"#fff", padding:"0 1px", "max-width":"300px", "overflow-y":"hidden", "text-align":"center", "-webkit-user-select":b, "-moz-user-select":b, "-ms-user-select":b, "user-select":b})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils, e = h.css, d = h.bounds, a = ".jwdockbuttons", b = document, c = "none", k = "block";
  f.dock = function(g, p) {
    function j(a, b) {
      var c = n(a);
      e(l("." + a), {width:c.width, background:c.src});
      return q("div", a, b)
    }
    function l(a) {
      return"#" + v + " " + (a ? a : "")
    }
    function q(a, c, e) {
      a = b.createElement(a);
      c && (a.className = c);
      e && e.appendChild(a);
      return a
    }
    function n(a) {
      return(a = u.getSkinElement("dock", a)) ? a : {width:0, height:0, src:""}
    }
    function r() {
      e(a + " .capLeft, " + a + " .capRight", {display:A ? k : c})
    }
    var s = h.extend({}, {iconalpha:0.75, iconalphaactive:0.5, iconalphaover:1, margin:8}, p), v = g.id + "_dock", u = g.skin, A = 0, m = {}, y = {}, t, w, z = this;
    z.redraw = function() {
      d(t)
    };
    z.element = function() {
      return t
    };
    z.offset = function(a) {
      e(l(), {"margin-left":a})
    };
    z.hide = function() {
      z.visible && (z.visible = !1, t.style.opacity = 0, setTimeout(function() {
        t.style.display = c
      }, 150))
    };
    z.show = function() {
      !z.visible && A && (z.visible = !0, t.style.display = k, setTimeout(function() {
        t.style.opacity = 1
      }, 0))
    };
    z.addButton = function(a, b, c, g) {
      if(!m[g]) {
        var k = q("div", "divider", w), j = q("button", null, w), l = q("div", null, j);
        l.id = v + "_" + g;
        l.innerHTML = "&nbsp;";
        e("#" + l.id, {"background-image":a});
        "string" == typeof c && (c = new Function(c));
        j.addEventListener("click", c);
        m[g] = {element:j, label:b, divider:k, icon:l};
        if(b) {
          var n = new f.overlay(l.id + "_tooltip", u, !0);
          a = q("div");
          a.id = l.id + "_label";
          a.innerHTML = b;
          e("#" + a.id, {padding:3});
          n.setContents(a);
          var s;
          j.addEventListener("mouseover", function() {
            clearTimeout(s);
            var a = y[g], b, c;
            b = d(m[g].icon);
            a.offsetX(0);
            c = d(t);
            e("#" + a.element().id, {left:b.left - c.left + b.width / 2});
            b = d(a.element());
            c.left > b.left && a.offsetX(c.left - b.left + 8);
            n.show();
            h.foreach(y, function(a, b) {
              a != g && b.hide()
            })
          }, !1);
          j.addEventListener("mouseout", function() {
            s = setTimeout(n.hide, 100)
          }, !1);
          t.appendChild(n.element());
          y[g] = n
        }
        A++;
        r()
      }
    };
    z.removeButton = function(a) {
      m[a] && (w.removeChild(m[a].element), w.removeChild(m[a].divider), delete m[a], A--, r())
    };
    z.numButtons = function() {
      return A
    };
    z.visible = !1;
    t = q("div", "jwdock");
    w = q("div", "jwdockbuttons");
    t.appendChild(w);
    t.id = v;
    var x = n("button"), B = n("buttonOver"), C = n("buttonActive");
    x && (e(l(), {height:x.height, padding:s.margin}), e(a, {height:x.height}), e(l("button"), {width:x.width, cursor:"pointer", border:c, background:x.src}), B.src && e(l("button:hover"), {background:B.src}), C.src && e(l("button:active"), {background:C.src}), e(l("button>div"), {opacity:s.iconalpha}), e(l("button:hover>div"), {opacity:s.iconalphaover}), e(l("button:active>div"), {opacity:s.iconalphaactive}), e(l(".jwoverlay"), {top:s.margin + x.height}), j("capLeft", w), j("capRight", w), j("divider"));
    setTimeout(function() {
      d(t)
    })
  };
  e(".jwdock", {opacity:0, display:c});
  e(".jwdock > *", {height:"100%", "float":"left"});
  e(".jwdock > .jwoverlay", {height:"auto", "float":c, "z-index":99});
  e(a + " button", {position:"relative"});
  e(a + " > *", {height:"100%", "float":"left"});
  e(a + " .divider", {display:c});
  e(a + " button ~ .divider", {display:k});
  e(a + " .capLeft, " + a + " .capRight", {display:c});
  e(a + " .capRight", {"float":"right"});
  e(a + " button > div", {left:0, right:0, top:0, bottom:0, margin:5, position:"absolute", "background-position":"center", "background-repeat":"no-repeat"});
  h.transitionStyle(".jwdock", "background .15s, opacity .15s");
  h.transitionStyle(".jwdock .jwoverlay", "opacity .15s");
  h.transitionStyle(a + " button div", "opacity .15s")
})(jwplayer.html5);
(function(f) {
  var h = jwplayer, e = h.utils, d = h.events, a = d.state, b = h.playlist;
  f.instream = function(c, h, g, p) {
    function j(a) {
      E && H.sendEvent(a.type, a);
      I = !0;
      F.jwInstreamDestroy(!1)
    }
    function l(a) {
      E && E && H.sendEvent(a.type, a)
    }
    function q() {
      E && x.play()
    }
    function n() {
      E && setTimeout(function() {
        F.jwInstreamDestroy(!0)
      }, 10)
    }
    function r(a) {
      a.width && a.height && m.resizeMedia()
    }
    function s() {
      B && B.redraw();
      C && C.redraw()
    }
    var v = {controlbarseekable:"never", controlbarpausable:!0, controlbarstoppable:!0, playlistclickable:!0}, u, A, m = g, y, t, w, z, x, B, C, E = !1, H, D, L, F = this, I = !1, Q = !0;
    this.load = function(g, M) {
      e.isAndroid(2.3) ? j({type:d.JWPLAYER_ERROR, message:"Error loading instream: Cannot play instream on Android 2.3"}) : (E = !0, A = e.extend(v, M), u = new b.item(g), D = document.createElement("div"), D.id = F.id + "_instream_container", y = p.detachMedia(), x = new f.video(y), x.addGlobalListener(l), x.addEventListener(d.JWPLAYER_MEDIA_META, r), x.addEventListener(d.JWPLAYER_MEDIA_COMPLETE, n), x.addEventListener(d.JWPLAYER_MEDIA_BUFFER_FULL, q), x.attachMedia(), x.mute(h.mute), x.volume(h.volume), 
      L = new f.model({}, x), L.setVolume(h.volume), L.setMute(h.mute), L.addEventListener(d.JWPLAYER_ERROR, j), z = h.playlist[h.item], w = h.getVideo().checkComplete() ? a.IDLE : c.jwGetState(), p.checkBeforePlay() && (w = a.PLAYING, Q = !1), t = y.currentTime, L.setPlaylist([g]), I || ((w == a.BUFFERING || w == a.PLAYING) && y.pause(), C = new f.display(F), C.setAlternateClickHandler(function(b) {
        L.state == a.PAUSED ? F.jwInstreamPlay() : (F.jwInstreamPause(), E && H.sendEvent(d.JWPLAYER_INSTREAM_CLICK, b))
      }), D.appendChild(C.element()), e.isMobile() || (B = new f.controlbar(F), D.appendChild(B.element()), B.show()), m.setupInstream(D, y), s(), x.load(L.playlist[0])))
    };
    this.jwInstreamDestroy = function(b) {
      if(E) {
        E = !1;
        w != a.IDLE ? x.load(z, !1) : x.stop();
        H.resetEventListeners();
        I || C.revertAlternateClickHandler();
        x.detachMedia();
        m.destroyInstream();
        if(B) {
          try {
            B.element().parentNode.removeChild(B.getDisplayElement())
          }catch(c) {
          }
        }
        H.sendEvent(d.JWPLAYER_INSTREAM_DESTROYED, {reason:b ? "complete" : "destroyed"});
        p.attachMedia();
        if(w == a.BUFFERING || w == a.PLAYING) {
          y.play(), h.playlist[h.item] == z && Q && h.getVideo().seek(t)
        }
      }
    };
    this.jwInstreamAddEventListener = function(a, b) {
      H.addEventListener(a, b)
    };
    this.jwInstreamRemoveEventListener = function(a, b) {
      H.removeEventListener(a, b)
    };
    this.jwInstreamPlay = function() {
      E && (x.play(!0), h.state = jwplayer.events.state.PLAYING, C.show())
    };
    this.jwInstreamPause = function() {
      E && (x.pause(!0), h.state = jwplayer.events.state.PAUSED, C.show())
    };
    this.jwInstreamSeek = function(a) {
      E && x.seek(a)
    };
    this.jwPlay = function() {
      "true" == A.controlbarpausable.toString().toLowerCase() && this.jwInstreamPlay()
    };
    this.jwPause = function() {
      "true" == A.controlbarpausable.toString().toLowerCase() && this.jwInstreamPause()
    };
    this.jwStop = function() {
      "true" == A.controlbarstoppable.toString().toLowerCase() && (this.jwInstreamDestroy(), c.jwStop())
    };
    this.jwSeek = function(a) {
      switch(A.controlbarseekable.toLowerCase()) {
        case "always":
          this.jwInstreamSeek(a);
          break;
        case "backwards":
          L.position > a && this.jwInstreamSeek(a)
      }
    };
    this.jwSeekDrag = function(a) {
      L.seekDrag(a)
    };
    this.jwGetPosition = function() {
    };
    this.jwGetDuration = function() {
    };
    this.jwGetWidth = c.jwGetWidth;
    this.jwGetHeight = c.jwGetHeight;
    this.jwGetFullscreen = c.jwGetFullscreen;
    this.jwSetFullscreen = c.jwSetFullscreen;
    this.jwGetVolume = function() {
      return h.volume
    };
    this.jwSetVolume = function(a) {
      L.setVolume(a);
      c.jwSetVolume(a)
    };
    this.jwGetMute = function() {
      return h.mute
    };
    this.jwSetMute = function(a) {
      L.setMute(a);
      c.jwSetMute(a)
    };
    this.jwGetState = function() {
      return h.state
    };
    this.jwGetPlaylist = function() {
      return[u]
    };
    this.jwGetPlaylistIndex = function() {
      return 0
    };
    this.jwGetStretching = function() {
      return h.config.stretching
    };
    this.jwAddEventListener = function(a, b) {
      H.addEventListener(a, b)
    };
    this.jwRemoveEventListener = function(a, b) {
      H.removeEventListener(a, b)
    };
    this.jwSetCurrentQuality = function() {
    };
    this.jwGetQualityLevels = function() {
      return[]
    };
    this.skin = c.skin;
    this.id = c.id + "_instream";
    H = new d.eventdispatcher;
    c.jwAddEventListener(d.JWPLAYER_RESIZE, s);
    c.jwAddEventListener(d.JWPLAYER_FULLSCREEN, function(a) {
      l(a);
      s()
    });
    return this
  }
})(jwplayer.html5);
(function(f) {
  var h = f.utils, e = h.css, d = f.events.state, a = f.html5.logo = function(b, c) {
    function k(a) {
      h.exists(a) && a.stopPropagation();
      if(!n || !j.link) {
        g.jwGetState() == d.IDLE || g.jwGetState() == d.PAUSED ? g.jwPlay() : g.jwPause()
      }
      n && j.link && (g.jwPause(), g.jwSetFullscreen(!1), window.open(j.link, j.linktarget))
    }
    var g = b, p = g.id + "_logo", j, l, q = a.defaults, n = !1;
    this.resize = function() {
    };
    this.element = function() {
      return l
    };
    this.offset = function(a) {
      e("#" + p + " ", {"margin-bottom":a})
    };
    this.position = function() {
      return j.position
    };
    this.margin = function() {
      return parseInt(j.margin)
    };
    this.hide = function(a) {
      if(j.hide || a) {
        n = !1, l.style.visibility = "hidden", l.style.opacity = 0
      }
    };
    this.show = function() {
      n = !0;
      l.style.visibility = "visible";
      l.style.opacity = 1
    };
    var r = "o";
    g.edition && (r = g.edition(), r = "pro" == r ? "p" : "premium" == r ? "r" : "ads" == r ? "a" : "free" == r ? "f" : "o");
    if("o" == r || "f" == r) {
      q.link = "http://www.longtailvideo.com/jwpabout/?a=l&v=" + f.version + "&m=h&e=" + r
    }
    j = h.extend({}, q, c);
    j.hide = "true" == j.hide.toString();
    l = document.createElement("img");
    l.className = "jwlogo";
    l.id = p;
    if(j.file) {
      var q = /(\w+)-(\w+)/.exec(j.position), r = {}, s = j.margin;
      3 == q.length ? (r[q[1]] = s, r[q[2]] = s) : r.top = r.right = s;
      e("#" + p + " ", r);
      l.src = (j.prefix ? j.prefix : "") + j.file;
      l.onclick = k
    }else {
      l.style.display = "none"
    }
    return this
  };
  a.defaults = {prefix:h.repo(), file:"logo.png", linktarget:"_top", margin:8, hide:!1, position:"top-right"};
  e(".jwlogo", {cursor:"pointer", position:"absolute", "z-index":100, opacity:0});
  h.transitionStyle(".jwlogo", "visibility .15s, opacity .15s")
})(jwplayer);
(function(f) {
  var h = f.html5, e = f.utils, d = e.css, a = void 0;
  h.menu = function(b, c, f, g) {
    function p(a, b) {
      return function() {
        v(a);
        q && q(b)
      }
    }
    function j(a, b) {
      var c = document.createElement("div");
      a && (c.className = a);
      b && b.appendChild(c);
      return c
    }
    function l(b) {
      return(b = f.getSkinElement("tooltip", b)) ? b : {width:0, height:0, src:a}
    }
    var q = g, n = new h.overlay(c + "_overlay", f);
    g = e.extend({fontcase:a, fontcolor:"#cccccc", fontsize:11, fontweight:a, activecolor:"#ffffff", overcolor:"#ffffff"}, f.getComponentSettings("tooltip"));
    var r, s = [];
    this.element = function() {
      return n.element()
    };
    this.addOption = function(a, b) {
      var e = j("jwoption", r);
      e.id = c + "_option_" + b;
      e.innerHTML = a;
      e.addEventListener("click", p(s.length, b));
      s.push(e)
    };
    this.clearOptions = function() {
      for(;0 < s.length;) {
        r.removeChild(s.pop())
      }
    };
    var v = this.setActive = function(a) {
      for(var b = 0;b < s.length;b++) {
        var c = s[b];
        c.className = c.className.replace(" active", "");
        b == a && (c.className += " active")
      }
    };
    this.show = n.show;
    this.hide = n.hide;
    this.offsetX = n.offsetX;
    r = j("jwmenu");
    r.id = c;
    var u = l("menuTop" + b);
    b = l("menuOption");
    var A = l("menuOptionOver"), m = l("menuOptionActive");
    u && r.appendChild(u.image);
    b && (u = "#" + c + " .jwoption", d(u, {"background-image":b.src, height:b.height, color:g.fontcolor, "padding-left":b.width, font:g.fontweight + " " + g.fontsize + "px Arial,Helvetica,sans-serif", "line-height":b.height, "text-transform":"upper" == g.fontcase ? "uppercase" : a}), d(u + ":hover", {"background-image":A.src ? A.src : a, color:g.overcolor}), d(u + ".active", {"background-image":m.src ? m.src : a, color:g.activecolor}));
    n.setContents(r)
  };
  d("." + "jwmenu jwoption".replace(/ /g, " ."), {"background-repeat":"no-repeat", cursor:"pointer", position:"relative"})
})(jwplayer);
(function(f) {
  var h = jwplayer.utils, e = jwplayer.events;
  f.model = function(d, a) {
    function b(a) {
      var b = l[a.type] ? l[a.type].split(",") : [], e, g;
      if(0 < b.length) {
        for(e = 0;e < b.length;e++) {
          var d = b[e].split("->"), f = d[0], d = d[1] ? d[1] : f;
          c[d] != a[f] && (c[d] = a[f], g = !0)
        }
        g && c.sendEvent(a.type, a)
      }else {
        c.sendEvent(a.type, a)
      }
    }
    var c = this, k, g;
    g = h.getCookies();
    var p = {controlbar:{}, display:{}}, j = {autostart:!1, controls:!0, debug:void 0, fullscreen:!1, height:320, mobilecontrols:!1, mute:!1, playlist:[], playlistposition:"none", playlistsize:180, repeat:!1, skin:void 0, stretching:h.stretching.UNIFORM, width:480, volume:90}, l = {};
    l[e.JWPLAYER_MEDIA_MUTE] = "mute";
    l[e.JWPLAYER_MEDIA_VOLUME] = "volume";
    l[e.JWPLAYER_PLAYER_STATE] = "newstate->state";
    l[e.JWPLAYER_MEDIA_BUFFER] = "bufferPercent->buffer";
    l[e.JWPLAYER_MEDIA_TIME] = "position,duration";
    c.getVideo = function() {
      return k
    };
    c.seekDrag = function(a) {
      k.seekDrag(a)
    };
    c.setFullscreen = function(a) {
      a != c.fullscreen && (c.fullscreen = a, c.sendEvent(e.JWPLAYER_FULLSCREEN, {fullscreen:a}))
    };
    c.setPlaylist = function(a) {
      for(var b = c, g = [], d = 0;d < a.length;d++) {
        var f = h.extend({}, a[d]);
        f.sources = h.filterSources(f.sources);
        if(0 < f.sources.length) {
          for(var j = 0;j < f.sources.length;j++) {
            var l = f.sources[j];
            l.label || (l.label = j.toString())
          }
          g.push(f)
        }
      }
      b.playlist = g;
      0 == c.playlist.length ? c.sendEvent(e.JWPLAYER_ERROR, {message:"Error loading playlist: No playable sources found"}) : (c.sendEvent(e.JWPLAYER_PLAYLIST_LOADED, {playlist:jwplayer(c.id).getPlaylist()}), c.item = -1, c.setItem(0))
    };
    c.setItem = function(a) {
      var b = !1;
      a == c.playlist.length || -1 > a ? (a = 0, b = !0) : a = -1 == a || a > c.playlist.length ? c.playlist.length - 1 : a;
      if(b || a != c.item) {
        c.item = a, c.sendEvent(e.JWPLAYER_PLAYLIST_ITEM, {index:c.item})
      }
    };
    c.setVolume = function(a) {
      c.mute && 0 < a && c.setMute(!1);
      a = Math.round(a);
      c.mute || h.saveCookie("volume", a);
      b({type:e.JWPLAYER_MEDIA_VOLUME, volume:a});
      k.volume(a)
    };
    c.setMute = function(a) {
      h.exists(a) || (a = !c.mute);
      h.saveCookie("mute", a);
      b({type:e.JWPLAYER_MEDIA_MUTE, mute:a});
      k.mute(a)
    };
    c.componentConfig = function(a) {
      return p[a]
    };
    h.extend(c, new e.eventdispatcher);
    var q = c, n = h.extend({}, j, g, d);
    h.foreach(n, function(a, b) {
      n[a] = h.serialize(b)
    });
    q.config = n;
    h.extend(c, {id:d.id, state:e.state.IDLE, duration:-1, position:0, buffer:0}, c.config);
    c.playlist = [];
    c.setItem(0);
    a ? (k = a, g = k.getTag()) : (g = document.createElement("video"), k = new f.video(g));
    k.volume(c.volume);
    k.mute(c.mute);
    k.addGlobalListener(b)
  }
})(jwplayer.html5);
(function(f) {
  var h = f.utils, e = h.css, d = h.transitionStyle, a = "top", b = "bottom", c = "right", k = "left", g = void 0, p = document, j = {fontcase:g, fontcolor:"#ffffff", fontsize:12, fontweight:g, activecolor:"#ffffff", overcolor:"#ffffff"};
  f.html5.overlay = function(d, f, n) {
    function r(a) {
      return"#" + y + (a ? " ." + a : "")
    }
    function s(a, b) {
      var c = p.createElement("div");
      a && (c.className = a);
      b && b.appendChild(c);
      return c
    }
    function v(a, b) {
      var c;
      c = (c = m.getSkinElement("tooltip", a)) ? c : {width:0, height:0, src:"", image:g, ready:!1};
      var d = s(b, t);
      e(r(b.replace(" ", ".")), {"background-image":c.src});
      return[d, c]
    }
    function u(d, f) {
      f || (f = "");
      var h = v("cap" + d + f, "jwborder jw" + d + (f ? f : "")), j = h[0], h = h[1], l = {"background-image":h.src, width:d == k || f == k || d == c || f == c ? h.width : g, height:d == a || f == a || d == b || f == b ? h.height : g};
      l[d] = d == b && !C || d == a && C ? B : 0;
      f && (l[f] = 0);
      e(r(j.className.replace(/ /g, ".")), l);
      j = {};
      l = {};
      h = {left:h.width, right:h.width, top:(C ? B : 0) + h.height, bottom:(C ? 0 : B) + h.height};
      f && (j[f] = h[f], j[d] = 0, l[d] = h[d], l[f] = 0, e(r("jw" + d), j), e(r("jw" + f), l), E[d] = h[d], E[f] = h[f])
    }
    function A() {
      0 != t.clientWidth && (e(r(), {"margin-left":Math.round(z - t.clientWidth / 2)}), e(r("jwarrow"), {"margin-left":Math.round(x.width / -2 - z)}))
    }
    var m = f, y = d, t, w, z = 0, x, B, C = n;
    d = h.extend({}, j, m.getComponentSettings("tooltip"));
    var E = {}, H = this;
    H.element = function() {
      return t
    };
    var D;
    H.setContents = function(a) {
      h.empty(w);
      w.appendChild(a);
      clearTimeout(D);
      D = setTimeout(A, 0)
    };
    H.offsetX = function(a) {
      z = a;
      clearTimeout(D);
      A()
    };
    H.borderWidth = function() {
      return E.left
    };
    H.show = function() {
      H.showing = !0;
      t.style.opacity = 1;
      t.style.visibility = "visible"
    };
    H.hide = function() {
      H.showing = !1;
      t.style.opacity = 0;
      t.style.visibility = "hidden"
    };
    t = s(".jwoverlay".replace(".", ""));
    t.id = y;
    x = v("arrow", "jwarrow")[1];
    B = x.height;
    e(r("jwarrow"), {position:"absolute", bottom:C ? g : 0, top:C ? 0 : g, width:x.width, height:B, left:"50%"});
    u(a, k);
    u(b, k);
    u(a, c);
    u(b, c);
    u(k);
    u(c);
    u(a);
    u(b);
    v("background", "jwback");
    e(r("jwback"), {left:E.left, right:E.right, top:E.top, bottom:E.bottom});
    w = s("jwcontents", t);
    e(r("jwcontents") + " *", {color:d.fontcolor, font:d.fontweight + " " + d.fontsize + "px Arial,Helvetica,sans-serif", "text-transform":"upper" == d.fontcase ? "uppercase" : g});
    C && h.transform(r("jwarrow"), "rotate(180deg)");
    e(r(), {padding:E.top + 1 + "px " + E.right + "px " + (E.bottom + 1) + "px " + E.left + "px"});
    H.showing = !1
  };
  e(".jwoverlay", {position:"absolute", visibility:"hidden", opacity:0});
  e(".jwoverlay .jwcontents", {position:"relative", "z-index":1});
  e(".jwoverlay .jwborder", {position:"absolute", "background-size":"100% 100%"}, !0);
  e(".jwoverlay .jwback", {position:"absolute", "background-size":"100% 100%"});
  d(".jwoverlay", "opacity .15s, visibility .15s, left .01s linear")
})(jwplayer);
(function(f) {
  var h = jwplayer.utils;
  f.player = function(e) {
    function d(a) {
      var b = {description:a.description, file:a.file, image:a.image, mediaid:a.mediaid, title:a.title};
      h.foreach(a, function(a, c) {
        b[a] = c
      });
      b.sources = [];
      b.tracks = [];
      0 < a.sources.length && h.foreach(a.sources, function(a, c) {
        b.sources.push({file:c.file, type:c.type ? c.type : void 0, label:c.label, "default":c["default"] ? !0 : !1})
      });
      0 < a.tracks.length && h.foreach(a.tracks, function(a, c) {
        b.tracks.push({file:c.file, kind:c.kind ? c.kind : void 0, label:c.label, "default":c["default"] ? !0 : !1})
      });
      !a.file && 0 < a.sources.length && (b.file = a.sources[0].file);
      return b
    }
    function a(a) {
      return function() {
        return c[a]
      }
    }
    var b = this, c, k, g, p;
    c = new f.model(e);
    b.id = c.id;
    k = new f.view(b, c);
    g = new f.controller(c, k);
    b._model = c;
    jwplayer.utils.css.block();
    b.jwPlay = g.play;
    b.jwPause = g.pause;
    b.jwStop = g.stop;
    b.jwSeek = g.seek;
    b.jwSetVolume = g.setVolume;
    b.jwSetMute = g.setMute;
    b.jwLoad = g.load;
    b.jwPlaylistNext = g.next;
    b.jwPlaylistPrev = g.prev;
    b.jwPlaylistItem = g.item;
    b.jwSetFullscreen = g.setFullscreen;
    b.jwResize = k.resize;
    b.jwSeekDrag = c.seekDrag;
    b.jwSetStretching = g.setStretching;
    b.jwGetQualityLevels = g.getQualityLevels;
    b.jwGetCurrentQuality = g.getCurrentQuality;
    b.jwSetCurrentQuality = g.setCurrentQuality;
    b.jwGetCaptionsList = g.getCaptionsList;
    b.jwGetCurrentCaptions = g.getCurrentCaptions;
    b.jwSetCurrentCaptions = g.setCurrentCaptions;
		b.jwGetCurrentCaption = g.getCurrentCaption; // caption hack
		b.jwGetCaptionList = g.getCaptionList; // caption hack
    b.jwSetControls = k.setControls;
    b.jwGetSafeRegion = k.getSafeRegion;
    b.jwForceState = k.forceState;
    b.jwReleaseState = k.releaseState;
    b.jwGetPlaylistIndex = a("item");
    b.jwGetPosition = a("position");
    b.jwGetDuration = a("duration");
    b.jwGetBuffer = a("buffer");
    b.jwGetWidth = a("width");
    b.jwGetHeight = a("height");
    b.jwGetFullscreen = a("fullscreen");
    b.jwGetVolume = a("volume");
    b.jwGetMute = a("mute");
    b.jwGetState = a("state");
    b.jwGetStretching = a("stretching");
    b.jwGetPlaylist = function() {
      for(var a = c.playlist, b = [], e = 0;e < a.length;e++) {
        b.push(d(a[e]))
      }
      return b
    };
    b.jwGetControls = a("controls");
    b.jwDetachMedia = g.detachMedia;
    b.jwAttachMedia = g.attachMedia;
    b.jwLoadInstream = function(a, d) {
      p || (p = new f.instream(b, c, k, g));
      p.load(a, d)
    };
    b.jwInstreamPlay = function() {
      p && p.jwInstreamPlay()
    };
    b.jwInstreamPause = function() {
      p && p.jwInstreamPause()
    };
    b.jwInstreamDestroy = function() {
      p && p.jwInstreamDestroy();
      p = void 0
    };
    b.jwInstreamAddEventListener = function(a, b) {
      p && p.jwInstreamAddEventListener(a, b)
    };
    b.jwInstreamRemoveEventListener = function(a, b) {
      p && p.jwInstreamRemoveEventListener(a, b)
    };
    b.jwPlayerDestroy = function() {
      k && k.destroy()
    };
    b.jwAddEventListener = g.addEventListener;
    b.jwRemoveEventListener = g.removeEventListener;
    b.jwDockAddButton = k.addButton;
    b.jwDockRemoveButton = k.removeButton;
    e = new f.setup(c, k, g);
    e.addEventListener(jwplayer.events.JWPLAYER_READY, function(a) {
      g.playerReady(a);
      h.css.unblock()
    });
    e.addEventListener(jwplayer.events.JWPLAYER_ERROR, function(a) {
      h.log("There was a problem setting up the player: ", a);
      h.css.unblock()
    });
    e.start()
  }
})(jwplayer.html5);
(function(f) {
  var h = {size:180, backgroundcolor:"#333333", fontcolor:"#999999", overcolor:"#CCCCCC", activecolor:"#CCCCCC", titlecolor:"#CCCCCC", titleovercolor:"#FFFFFF", titleactivecolor:"#FFFFFF", fontweight:"normal", titleweight:"normal", fontsize:11, titlesize:13}, e = jwplayer.events, d = jwplayer.utils, a = d.css, b = document;
  f.playlistcomponent = function(c, k) {
    function g(a) {
      return"#" + r.id + (a ? " ." + a : "")
    }
    function p(a, c) {
      var d = b.createElement(a);
      c && (d.className = c);
      return d
    }
    function j(a) {
      return function() {
        m = a;
        l.jwPlaylistItem(a);
        l.jwPlay(!0)
      }
    }
    var l = c, q = l.skin, n = d.extend({}, h, l.skin.getComponentSettings("playlist"), k), r, s, v, u, A = -1, m, y, t = 60, w = {background:void 0, divider:void 0, item:void 0, itemOver:void 0, itemImage:void 0, itemActive:void 0};
    this.element = function() {
      return r
    };
    this.redraw = function() {
      y && y.redraw()
    };
    this.show = function() {
      d.show(r)
    };
    this.hide = function() {
      d.hide(r)
    };
    r = p("div", "jwplaylist");
    r.id = l.id + "_jwplayer_playlistcomponent";
    s = p("div", "jwlistcontainer");
    r.appendChild(s);
    d.foreach(w, function(a) {
      w[a] = q.getSkinElement("playlist", a)
    });
    w.item && (t = w.item.height);
    var z = 0, x = 0, B = 0;
    d.clearCss(g());
    a(g(), {"background-color":n.backgroundcolor});
    a(g("jwlist"), {"background-image":w.background ? " url(" + w.background.src + ")" : ""});
    a(g("jwlist *"), {color:n.fontcolor, font:n.fontweight + " " + n.fontsize + "px Arial, Helvetica, sans-serif"});
    w.itemImage ? (z = (t - w.itemImage.height) / 2 + "px ", x = w.itemImage.width, B = w.itemImage.height) : (x = 4 * t / 3, B = t);
    w.divider && a(g("jwplaylistdivider"), {"background-image":"url(" + w.divider.src + ")", "background-size":"100% " + w.divider.height + "px", width:"100%", height:w.divider.height});
    a(g("jwplaylistimg"), {height:B, width:x, margin:z ? z + z + z + z : "0 5px 0 0"});
    a(g("jwlist li"), {"background-image":w.item ? "url(" + w.item.src + ")" : "", height:t, "background-size":"100% " + t + "px", cursor:"pointer"});
    x = {overflow:"hidden"};
    "" !== n.activecolor && (x.color = n.activecolor);
    w.itemActive && (x["background-image"] = "url(" + w.itemActive.src + ")");
    a(g("jwlist li.active"), x);
    a(g("jwlist li.active .jwtitle"), {color:n.titleactivecolor});
    x = {overflow:"hidden"};
    "" !== n.overcolor && (x.color = n.overcolor);
    w.itemOver && (x["background-image"] = "url(" + w.itemOver.src + ")");
    a(g("jwlist li:hover"), x);
    a(g("jwlist li:hover .jwtitle"), {color:n.titleovercolor});
    a(g("jwtextwrapper"), {height:t - 5, position:"relative"});
    a(g("jwtitle"), {height:15, overflow:"hidden", display:"inline-block", width:"100%", color:n.titlecolor, "margin-top":z ? z : 7, "line-height":13, "font-size":n.titlesize, "font-weight":n.titleweight});
    a(g("jwdescription"), {display:"block", "font-size":n.fontsize, "line-height":19, "margin-top":5, overflow:"hidden", height:t, position:"relative"});
    l.jwAddEventListener(e.JWPLAYER_PLAYLIST_LOADED, function() {
      s.innerHTML = "";
      for(var b = l.jwGetPlaylist(), c = [], e = 0;e < b.length;e++) {
        b[e]["ova.hidden"] || c.push(b[e])
      }
      if(v = c) {
        b = p("ul", "jwlist");
        b.id = r.id + "_ul" + Math.round(1E7 * Math.random());
        u = b;
        for(b = 0;b < v.length;b++) {
          var g = b, c = v[g], e = p("li", "jwitem"), h = void 0;
          e.id = u.id + "_item_" + g;
          0 < g && (h = p("div", "jwplaylistdivider"), e.appendChild(h));
          g = p("div", "jwplaylistimg jwfill");
          if(c.image || c["playlist.image"] || w.itemImage) {
            h = void 0, c["playlist.image"] ? h = c["playlist.image"] : c.image ? h = c.image : w.itemImage && (h = w.itemImage.src), a("#" + e.id + " .jwplaylistimg", {"background-image":h ? "url(" + h + ")" : null}), e.appendChild(g)
          }
          g = p("div", "jwtextwrapper");
          h = p("span", "jwtitle");
          h.innerHTML = c && c.title ? c.title : "";
          g.appendChild(h);
          c.description && (h = p("span", "jwdescription"), h.innerHTML = c.description, g.appendChild(h));
          e.appendChild(g);
          c = e;
          c.onclick = j(b);
          u.appendChild(c)
        }
        A = l.jwGetPlaylistIndex();
        d.isIOS() && window.iScroll ? (r.innerHTML = "", r.appendChild(u), u.style.height = t * v.length + "px", new iScroll(r.id)) : (s.appendChild(u), y = new f.playlistslider(r.id + "_slider", l.skin, r, u))
      }
    });
    l.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, function(a) {
      0 <= A && (b.getElementById(u.id + "_item_" + A).className = "jwitem", A = a.index);
      b.getElementById(u.id + "_item_" + a.index).className = "jwitem active";
      a = l.jwGetPlaylistIndex();
      a != m && (m = -1, d.isIOS() && window.iScroll ? u.scrollTop = a * t : y && y.visible() && y.thumbPosition(a / (l.jwGetPlaylist().length - 1)))
    });
    return this
  };
  a(".jwplaylist", {position:"absolute", width:"100%", height:"100%"});
  d.dragStyle(".jwplaylist", "none");
  a(".jwplaylist .jwplaylistimg", {position:"relative", width:"100%", "float":"left", margin:"0 5px 0 0", background:"#000", overflow:"hidden"});
  a(".jwplaylist .jwlist", {position:"absolute", width:"100%", "list-style":"none", margin:0, padding:0});
  a(".jwplaylist .jwlistcontainer", {position:"absolute", overflow:"hidden", width:"100%", height:"100%"});
  a(".jwplaylist .jwlist li", {width:"100%"});
  a(".jwplaylist .jwtextwrapper", {overflow:"hidden"});
  a(".jwplaylist .jwplaylistdivider", {position:"absolute"})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer, e = h.utils, d = h.events;
  f.playlistloader = function() {
    function a(a) {
      try {
        var b = a.responseXML.firstChild;
        "xml" == f.parsers.localName(b) && (b = b.nextSibling);
        if("rss" != f.parsers.localName(b)) {
          c("Not a valid RSS feed")
        }else {
          var j = new h.playlist(f.parsers.rssparser.parse(b));
          if(a = j) {
            var b = [], l, q, n;
            for(l = 0;l < a.length;l++) {
              if(q = a[l], (n = e.filterSources(q.sources)) && n.length) {
                q.sources = n, b.push(q)
              }
            }
            j = b
          }else {
            j = void 0
          }
          j && j.length && j[0].sources && j[0].sources.length && j[0].sources[0].file ? k.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {playlist:j}) : c("No playable sources found")
        }
      }catch(r) {
        c()
      }
    }
    function b(a) {
      c(a.match(/invalid/i) ? "Not a valid RSS feed" : "")
    }
    function c(a) {
      k.sendEvent(d.JWPLAYER_ERROR, {message:a ? a : "Error loading file"})
    }
    var k = new d.eventdispatcher;
    e.extend(this, k);
    this.load = function(c) {
      e.ajax(c, a, b)
    }
  }
})(jwplayer.html5);
(function(f) {
  function h() {
    var a = [], b;
    for(b = 0;b < arguments.length;b++) {
      a.push(".jwplaylist ." + arguments[b])
    }
    return a.join(",")
  }
  var e = jwplayer.utils, d = e.css, a = document, b = window, c = void 0;
  f.playlistslider = function(f, g, h, j) {
    function l(a) {
      return"#" + m.id + (a ? " ." + a : "")
    }
    function q(b, e, g, f) {
      var h = a.createElement("div");
      b && (h.className = b, e && d(l(b), {"background-image":e.src ? e.src : c, "background-repeat":f ? "repeat-y" : "no-repeat", height:f ? c : e.height}));
      g && g.appendChild(h);
      return h
    }
    function n(a) {
      return(a = A.getSkinElement("playlist", a)) ? a : {width:0, height:0, src:c}
    }
    function r(a) {
      if(C) {
        return a = a ? a : b.event, X(z - (a.detail ? -1 * a.detail : a.wheelDelta / 40) / 10), a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.cancel = !0, a.returnValue = !1
      }
    }
    function s(a) {
      if(w || "click" == a.type) {
        var b = e.bounds(y), c = t.clientHeight / 2;
        X((a.pageY - b.top - c) / (b.height - c - c))
      }
    }
    function v(a) {
      return function(b) {
        0 < b.button || (X(z + 0.05 * a), x = setTimeout(function() {
          B = setInterval(function() {
            X(z + 0.05 * a)
          }, 50)
        }, 500))
      }
    }
    function u() {
      w = !1;
      b.removeEventListener("mousemove", s);
      b.removeEventListener("mouseup", u);
      a.onselectstart = c;
      clearTimeout(x);
      clearInterval(B)
    }
    var A = g, m, y, t, w, z = 0, x, B, C = !0, E, H, D, L, F, I, Q, V;
    this.element = function() {
      return m
    };
    this.visible = function() {
      return C
    };
    var M = this.redraw = function() {
      clearTimeout(V);
      V = setTimeout(function() {
        if(j && j.clientHeight) {
          var a = j.parentNode.clientHeight / j.clientHeight;
          0 > a && (a = 0);
          1 < a ? C = !1 : (C = !0, d(l("jwthumb"), {height:Math.max(y.clientHeight * a, L.height + F.height)}));
          d(l(), {visibility:C ? "visible" : "hidden"});
          j && (j.style.width = C ? j.parentElement.clientWidth - D.width + "px" : "")
        }else {
          V = setTimeout(M, 10)
        }
      }, 0)
    }, X = this.thumbPosition = function(a) {
      isNaN(a) && (a = 0);
      z = Math.max(0, Math.min(1, a));
      d(l("jwthumb"), {top:I + (y.clientHeight - t.clientHeight) * z});
      j && (j.style.top = (m.clientHeight - j.scrollHeight) * z + "px")
    };
    m = q("jwslider", null, h);
    m.id = f;
    m.addEventListener("mousedown", function(c) {
      0 == c.button && (w = !0);
      a.onselectstart = function() {
        return!1
      };
      b.addEventListener("mousemove", s, !1);
      b.addEventListener("mouseup", u, !1)
    }, !1);
    m.addEventListener("click", s, !1);
    E = n("sliderCapTop");
    H = n("sliderCapBottom");
    D = n("sliderRail");
    f = n("sliderRailCapTop");
    g = n("sliderRailCapBottom");
    h = n("sliderThumb");
    L = n("sliderThumbCapTop");
    F = n("sliderThumbCapBottom");
    I = E.height;
    Q = H.height;
    d(l(), {width:D.width});
    d(l("jwrail"), {top:I, bottom:Q});
    d(l("jwthumb"), {top:I});
    E = q("jwslidertop", E, m);
    H = q("jwsliderbottom", H, m);
    y = q("jwrail", null, m);
    t = q("jwthumb", null, m);
    E.addEventListener("mousedown", v(-1), !1);
    H.addEventListener("mousedown", v(1), !1);
    q("jwrailtop", f, y);
    q("jwrailback", D, y, !0);
    q("jwrailbottom", g, y);
    d(l("jwrailback"), {top:f.height, bottom:g.height});
    q("jwthumbtop", L, t);
    q("jwthumbback", h, t, !0);
    q("jwthumbbottom", F, t);
    d(l("jwthumbback"), {top:L.height, bottom:F.height});
    M();
    j && (j.addEventListener("mousewheel", r, !1), j.addEventListener("DOMMouseScroll", r, !1));
    return this
  };
  d(h("jwslider"), {position:"absolute", height:"100%", visibility:"hidden", right:0, top:0, cursor:"pointer", "z-index":1});
  d(h("jwslider") + " *", {position:"absolute", width:"100%", "background-position":"center", "background-size":"100% 100%"});
  d(h("jwslidertop", "jwrailtop", "jwthumbtop"), {top:0});
  d(h("jwsliderbottom", "jwrailbottom", "jwthumbbottom"), {bottom:0})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils, e = h.css, d = document, a = "none";
  f.rightclick = function(b, c) {
    function e(a) {
      var b = d.createElement("div");
      b.className = a.replace(".", "");
      return b
    }
    function g() {
      l || (q.style.display = a)
    }
    var p, j = h.extend({aboutlink:"http://www.longtailvideo.com/jwpabout/?a=r&v=" + f.version + "&m=h&e=o", abouttext:"About JW Player " + f.version + "..."}, c), l = !1, q, n;
    this.element = function() {
      return q
    };
    this.destroy = function() {
      d.removeEventListener("mousedown", g, !1)
    };
    p = d.getElementById(b.id);
    q = e(".jwclick");
    q.id = b.id + "_menu";
    q.style.display = a;
    p.oncontextmenu = function(b) {
      if(!l) {
        null == b && (b = window.event);
        var c = h.bounds(p), e = c.top, c = c.left;
        q.style.display = a;
        q.style.left = b.pageX - c + "px";
        q.style.top = b.pageY - e + "px";
        q.style.display = "block";
        b.preventDefault()
      }
    };
    q.onmouseover = function() {
      l = !0
    };
    q.onmouseout = function() {
      l = !1
    };
    d.addEventListener("mousedown", g, !1);
    n = e(".jwclick_item");
    n.innerHTML = j.abouttext;
    n.onclick = function() {
      window.location.href = j.aboutlink
    };
    q.appendChild(n);
    //p.appendChild(q) // no context menu hack
  };
  e(".jwclick", {"background-color":"#FFF", "-webkit-border-radius":5, "-moz-border-radius":5, "border-radius":5, height:"auto", border:"1px solid #bcbcbc", "font-family":'"MS Sans Serif", "Geneva", sans-serif', "font-size":10, width:320, "-webkit-box-shadow":"5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset", "-moz-box-shadow":"5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset", "box-shadow":"5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset", 
  position:"absolute", "z-index":999}, !0);
  e(".jwclick div", {padding:"8px 21px", margin:"0px", "background-color":"#FFF", border:"none", "font-family":'"MS Sans Serif", "Geneva", sans-serif', "font-size":10, color:"inherit"}, !0);
  e(".jwclick_item", {padding:"8px 21px", "text-align":"left", cursor:"pointer"}, !0);
  e(".jwclick_item:hover", {"background-color":"#595959", color:"#FFF"}, !0);
  e(".jwclick_item a", {"text-decoration":a, color:"#000"}, !0);
  e(".jwclick hr", {width:"100%", padding:0, margin:0, border:"1px #e9e9e9 solid"}, !0)
})(jwplayer.html5);
(function(f) {
  var h = jwplayer, e = h.utils, d = h.events, a = h.playlist, b = 2, c = 3, k = 4;
  f.setup = function(g, h) {
    function j(a, b, c) {
      B.push({name:a, method:b, depends:c})
    }
    function l() {
      for(var a = 0;a < B.length;a++) {
        var b = B[a], c;
        a: {
          if(c = b.depends) {
            c = c.toString().split(",");
            for(var e = 0;e < c.length;e++) {
              if(!t[c[e]]) {
                c = !1;
                break a
              }
            }
          }
          c = !0
        }
        if(c) {
          B.splice(a, 1);
          try {
            b.method(), l()
          }catch(d) {
            A(d.message)
          }
          return
        }
      }
      0 < B.length && !x && setTimeout(l, 500)
    }
    function q() {
      t[b] = !0
    }
    function n(a) {
      A("Error loading skin: " + a)
    }
    function r(a) {
      s(a.playlist)
    }
    function s(a) {
      m.setPlaylist(a);
      0 == m.playlist[0].sources.length ? A("Error loading playlist: No playable sources found") : t[c] = !0
    }
    function v(a) {
      A("Error loading playlist: " + a.message)
    }
    function u() {
      t[k] = !0
    }
    function A(a) {
      x = !0;
      z.sendEvent(d.JWPLAYER_ERROR, {message:a});
      y.setupError(a)
    }
    var m = g, y = h, t = {}, w, z = new d.eventdispatcher, x = !1, B = [];
    e.extend(this, z);
    this.start = l;
    j(1, function() {
      g.edition && "invalid" == g.edition() ? A("Error setting up player: Invalid license key") : t[1] = !0
    });
    j(b, function() {
      w = new f.skin;
      w.load(m.config.skin, q, n)
    }, 1);
    j(c, function() {
      switch(e.typeOf(m.config.playlist)) {
        case "string":
          var b = new f.playlistloader;
          b.addEventListener(d.JWPLAYER_PLAYLIST_LOADED, r);
          b.addEventListener(d.JWPLAYER_ERROR, v);
          b.load(m.config.playlist);
          break;
        case "array":
          s(new a(m.config.playlist))
      }
    }, 1);
    j(k, function() {
      var a = m.playlist[m.item].image;
      if(a) {
        var b = new Image;
        b.addEventListener("load", u, !1);
        b.addEventListener("error", u, !1);
        b.src = a;
        setTimeout(u, 500)
      }else {
        t[k] = !0
      }
    }, c);
    j(5, function() {
      y.setup(w);
      t[5] = !0
    }, k + "," + b);
    j(6, function() {
      t[6] = !0
    }, "5," + c);
    j(7, function() {
      z.sendEvent(d.JWPLAYER_READY);
      t[7] = !0
    }, 6)
  }
})(jwplayer.html5);
(function(f) {
  f.skin = function() {
    var h = {}, e = !1;
    this.load = function(d, a, b) {
      new f.skinloader(d, function(b) {
        e = !0;
        h = b;
        "function" == typeof a && a()
      }, function(a) {
        "function" == typeof b && b(a)
      })
    };
    this.getSkinElement = function(d, a) {
      d = d.toLowerCase();
      a = a.toLowerCase();
      if(e) {
        try {
          return h[d].elements[a]
        }catch(b) {
          jwplayer.utils.log("No such skin component / element: ", [d, a])
        }
      }
      return null
    };
    this.getComponentSettings = function(d) {
      d = d.toLowerCase();
      return e && h && h[d] ? h[d].settings : null
    };
    this.getComponentLayout = function(d) {
      d = d.toLowerCase();
      if(e) {
        var a = h[d].layout;
        if(a && (a.left || a.right || a.center)) {
          return h[d].layout
        }
      }
      return null
    }
  }
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils, e = h.foreach, d = "Skin formatting error";
  f.skinloader = function(a, b, c) {
    function k(a) {
      n = a;
      h.ajax(h.getAbsolutePath(A), function(a) {
        try {
          h.exists(a.responseXML) && p(a.responseXML)
        }catch(b) {
          s(d)
        }
      }, function(a) {
        s(a)
      })
    }
    function g(a, b) {
      return a ? a.getElementsByTagName(b) : null
    }
    function p(a) {
      var b = g(a, "skin")[0];
      a = g(b, "component");
      b = b.getAttribute("target");
      (!b || parseFloat(b) > parseFloat(jwplayer.version)) && s("Incompatible player version");
      if(0 === a.length) {
        r(n)
      }else {
        for(b = 0;b < a.length;b++) {
          var c = q(a[b].getAttribute("name")), e = {settings:{}, elements:{}, layout:{}}, d = g(g(a[b], "elements")[0], "element");
          n[c] = e;
          for(var f = 0;f < d.length;f++) {
            l(d[f], c)
          }
          if((c = g(a[b], "settings")[0]) && 0 < c.childNodes.length) {
            c = g(c, "setting");
            for(d = 0;d < c.length;d++) {
              var f = c[d].getAttribute("name"), k = c[d].getAttribute("value");
              /color$/.test(f) && (k = h.stringToColor(k));
              e.settings[q(f)] = k
            }
          }
          if((c = g(a[b], "layout")[0]) && 0 < c.childNodes.length) {
            c = g(c, "group");
            for(d = 0;d < c.length;d++) {
              k = c[d];
              f = {elements:[]};
              e.layout[q(k.getAttribute("position"))] = f;
              for(var m = 0;m < k.attributes.length;m++) {
                var p = k.attributes[m];
                f[p.name] = p.value
              }
              k = g(k, "*");
              for(m = 0;m < k.length;m++) {

                p = k[m];
                f.elements.push({type:p.tagName});
                for(var u = 0;u < p.attributes.length;u++) {
                  var A = p.attributes[u];
                  f.elements[m][q(A.name)] = A.value
                }
                h.exists(f.elements[m].name) || (f.elements[m].name = p.tagName)
              }
            }
          }
          v = !1;
          j()
        }
      }
    }
    function j() {
      clearInterval(u);
      m || (u = setInterval(function() {
        var a = !0;
        e(n, function(b, c) {
          "properties" != b && e(c.elements, function(c) {
            (n[q(b)] ? n[q(b)].elements[q(c)] : null).ready || (a = !1)
          })
        });
        a && !1 == v && (clearInterval(u), r(n))
      }, 100))
    }
    function l(a, b) {
      b = q(b);
      var c = new Image, e = q(a.getAttribute("name")), d = a.getAttribute("src");
      if(0 !== d.indexOf("data:image/png;base64,")) {
        var f = h.getAbsolutePath(A), d = [f.substr(0, f.lastIndexOf("/")), b, d].join("/")
      }
      n[b].elements[e] = {height:0, width:0, src:"", ready:!1, image:c};
      c.onload = function() {
        var a = b, d = n[q(a)] ? n[q(a)].elements[q(e)] : null;
        d ? (d.height = c.height, d.width = c.width, d.src = c.src, d.ready = !0, j()) : h.log("Loaded an image for a missing element: " + a + "." + e)
      };
      c.onerror = function() {
        m = !0;
        j();
        s("Skin image not found: " + this.src)
      };
      c.src = d
    }
    function q(a) {
      return a ? a.toLowerCase() : ""
    }
    var n = {}, r = b, s = c, v = !0, u, A = a, m = !1;
    "string" != typeof A || "" === A ? p(f.defaultskin().xml) : "xml" != h.extension(A) ? s("Skin not a valid file type") : new f.skinloader("", k, s)
  }
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils, e = jwplayer.events, d = h.css;
  f.thumbs = function(a) {
    function b(a) {
      if("array" == !h.typeOf(a)) {
        return c("Invalid data")
      }
      p = a;
      d("#" + l, {display:"block"})
    }
    function c(a) {
      h.log("Thumbnails could not be loaded: " + a)
    }
    function k(a) {
      a = a.target;
      d("#" + l, {"background-image":a.src, "background-position":"0 0", width:a.width, height:a.height})
    }
    var g, p, j, l = a;
    a = new e.eventdispatcher;
    h.extend(this, a);
    this.load = function(a) {
      d("#" + l, {display:"none"});
      a && (j = a.split("?")[0].split("/").slice(0, -1).join("/"), (new f.parsers.srt(b, c, !0)).load(a))
    };
    this.element = function() {
      return g
    };
    this.updateTimeline = function(a) {
      var b = 0;
      if(p) {
        for(;b < p.length && a > p[b].end;) {
          b++
        }
        b == p.length && b--;
        if(p[b].text) {
          if(a = p[b].text, 0 > a.indexOf("://") && (a = j ? j + "/" + a : a), 0 < a.indexOf("#xywh")) {
            try {
              var e = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(a), f = e[1];
              d("#" + l, {"background-image":f, "background-position":-1 * e[2] + "px " + -1 * e[3] + "px", width:e[4], height:e[5]})
            }catch(g) {
              c("Could not parse thumbnail")
            }
          }else {
            f = new Image, f.addEventListener("load", k, !1), f.src = a
          }
        }
      }
    };
    g = document.createElement("div");
    g.id = l
  }
})(jwplayer.html5);
(function(f) {
  var h = f.utils, e = f.events, d = e.state;
  f.html5.video = function(a) {
    function b(a, b) {
      F && L.sendEvent(a, b)
    }
    function c() {
    }
    function f() {
      F && C == d.PLAYING && !B && (t = Number(m.currentTime.toFixed(1)), b(e.JWPLAYER_MEDIA_TIME, {position:t, duration:y}))
    }
    function g(a) {
      F && (w || (w = !0, z || (z = !0, b(e.JWPLAYER_MEDIA_BUFFER_FULL))), "loadedmetadata" == a.type && (m.muted && (m.muted = !1, m.muted = !0), b(e.JWPLAYER_MEDIA_META, {duration:m.duration, height:m.videoHeight, width:m.videoWidth})))
    }
    function p(a) {
      F && !B && (m.paused ? m.currentTime == m.duration && 3 < m.duration || ea() : (!h.isFF() || !("play" == a.type && C == d.BUFFERING)) && n(d.PLAYING))
    }
    function j() {
      F && (B || n(d.BUFFERING))
    }
    function l(a) {
      var b;
      if("array" == h.typeOf(a) && 0 < a.length) {
        b = [];
        for(var c = 0;c < a.length;c++) {
          var e = a[c], d = {};
          d.label = e.label && e.label ? e.label ? e.label : 0 : c;
          b[c] = d
        }
      }
      return b
    }
    function q() {
      z = w = !1;
      A = I[Q];
      n(d.BUFFERING);
      m.src = A.file;
      m.load();
      H = setInterval(r, 100);
      if((h.isIPod() || h.isAndroid(2.3)) && !z) {
        z = !0, b(e.JWPLAYER_MEDIA_BUFFER_FULL)
      }
    }
    function n(a) {
      if(!(a == d.PAUSED && C == d.IDLE) && !B && C != a) {
        var c = C;
        C = a;
        b(e.JWPLAYER_PLAYER_STATE, {oldstate:c, newstate:a})
      }
    }
    function r() {
      if(F) {
        var a;
        a = 0 == m.buffered.length || 0 == m.duration ? 0 : m.buffered.end(m.buffered.length - 1) / m.duration;
        a != D && (D = a, b(e.JWPLAYER_MEDIA_BUFFER, {bufferPercent:Math.round(100 * D)}));
        1 <= a && clearInterval(H)
      }
    }
    var s = h.isIE(), v = {abort:c, canplay:g, canplaythrough:c, durationchange:function() {
      if(F) {
        var a = Number(m.duration.toFixed(1));
        y != a && (y = a);
        V && 0 < x && a > x && Z(x);
        f()
      }
    }, emptied:c, ended:function() {
      F && C != d.IDLE && (Q = -1, X = !0, b(e.JWPLAYER_MEDIA_BEFORECOMPLETE), F && (n(d.IDLE), b(e.JWPLAYER_MEDIA_COMPLETE), X = !1))
    }, error:function() {
      F && (h.log("Error playing media: %o", m.error), L.sendEvent(e.JWPLAYER_MEDIA_ERROR, {message:"Error loading media: File could not be played"}), n(d.IDLE))
    }, loadeddata:c, loadedmetadata:g, loadstart:c, pause:p, play:p, playing:p, progress:function() {
      w && 0 < x && !V && (s ? setTimeout(Z, 200, x) : Z(x))
    }, ratechange:c, readystatechange:c, seeked:function() {
      B || (b(e.JWPLAYER_MEDIA_SEEK, {position:t, offset:m.currentTime}), C != d.PAUSED && n(d.PLAYING))
    }, seeking:s ? j : c, stalled:c, suspend:c, timeupdate:f, volumechange:function() {
      b(e.JWPLAYER_MEDIA_VOLUME, {volume:Math.round(100 * m.volume)});
      b(e.JWPLAYER_MEDIA_MUTE, {mute:m.muted})
    }, waiting:j}, u, A, m, y, t, w, z, x, B, C = d.IDLE, E, H = -1, D = -1, L = new e.eventdispatcher, F = !1, I, Q = -1, V = h.isAndroid(), M = this, X = !1;
    h.extend(M, L);
    M.load = function(a) {
      if(F) {
        u = a;
        x = 0;
        y = a.duration ? a.duration : -1;
        t = 0;
        I = u.sources;
        0 > Q && (Q = 0);
        for(a = 0;a < I.length;a++) {
          if(I[a]["default"]) {
            Q = a;
            break
          }
        }
        var b = h.getCookies().qualityLabel;
        if(b) {
          for(a = 0;a < I.length;a++) {
            if(I[a].label == b) {
              Q = a;
              break
            }
          }
        }
        (a = l(I)) && L.sendEvent(e.JWPLAYER_MEDIA_LEVELS, {levels:a, currentQuality:Q});
        q()
      }
    };
    M.stop = function() {
      F && (m.removeAttribute("src"), s || m.load(), Q = -1, clearInterval(H), n(d.IDLE))
    };
    M.play = function() {
      F && !B && m.play()
    };
    var ea = M.pause = function() {
      F && (m.pause(), n(d.PAUSED))
    };
    M.seekDrag = function(a) {
      F && ((B = a) ? m.pause() : m.play())
    };
    var Z = M.seek = function(a) {
      F && (w ? (x = 0, m.currentTime = a) : x = a)
    }, oa = M.volume = function(a) {
      h.exists(a) && (m.volume = Math.min(Math.max(0, a / 100), 1), E = 100 * m.volume)
    };
    M.mute = function(a) {
      h.exists(a) || (a = !m.muted);
      a ? (E = 100 * m.volume, m.muted = !0) : (oa(E), m.muted = !1)
    };
    this.checkComplete = function() {
      return X
    };
    M.detachMedia = function() {
      F = !1;
      return m
    };
    M.attachMedia = function(a) {
      F = !0;
      a || (w = !1);
      X && (n(d.IDLE), b(e.JWPLAYER_MEDIA_COMPLETE), X = !1)
    };
    M.getTag = function() {
      return m
    };
    M.audioMode = function() {
      if(!I) {
        return!1
      }
      var a = I[0].type;
      return"aac" == a || "mp3" == a || "vorbis" == a
    };
    M.setCurrentQuality = function(a) {
      Q != a && (a = parseInt(a), 0 <= a && I && I.length > a && (Q = a, h.saveCookie("qualityLabel", I[a].label), b(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {currentQuality:a, levels:l(I)}), a = m.currentTime, q(), M.seek(a)))
    };
    M.getCurrentQuality = function() {
      return Q
    };
    M.getQualityLevels = function() {
      return l(I)
    };
    m = a;
    h.foreach(v, function(a, b) {
      m.addEventListener(a, b, !1)
    });
    m.controls = !0;
    m.controls = !1;
    m.setAttribute("x-webkit-airplay", "allow");
    F = !0
  }
})(jwplayer);
(function(f) {
  var h = jwplayer.utils, e = jwplayer.events, d = e.state, a = h.css, b = h.isMobile(), c = h.isIPad(), k = h.isIPod(), g = h.isAndroid(), p = h.isIOS(), j = document, l = "aspectMode", q = "jwmain", n = "jwvideo", r = "jwplaylistcontainer", s = !0, v = !1, u = "hidden", A = "none", m = "block";
  f.view = function(y, t) {
    function w(a) {
      a && (a.element().addEventListener("mousemove", B, v), a.element().addEventListener("mouseout", C, v))
    }
    function z(a, b) {
      var c = j.createElement(a);
      b && (c.className = b);
      return c
    }
    function x() {
      clearTimeout(pa);
      if(S.jwGetState() == d.PLAYING || S.jwGetState() == d.PAUSED) {
        oa(), Aa || (pa = setTimeout(E, Da))
      }
    }
    function B() {
      clearTimeout(pa);
      Aa = s
    }
    function C() {
      Aa = v
    }
    function E() {
      S.jwGetState() != d.BUFFERING && (G && !U && !N && G.hide(), T && !ia && !N && T.hide(), X());
      clearTimeout(pa);
      pa = 0
    }
    function H(a) {
      ca.sendEvent(a.type, a)
    }
    function D(b, c) {
      h.exists(b) && h.exists(c) && (J.width = b, J.height = c);
      P.style.width = isNaN(b) ? b : b + "px";
      -1 == P.className.indexOf(l) && (P.style.height = isNaN(c) ? c : c + "px");
      R && R.redraw();
      G && G.redraw();
      W && (W.offset(G && 0 <= W.position().indexOf("bottom") ? G.height() + G.margin() : 0), setTimeout(function() {
        T && T.offset("top-left" == W.position() ? W.element().clientWidth + W.margin() : 0)
      }, 500));
      var d = J.playlistsize, f = J.playlistposition;
      if(K && d && ("right" == f || "bottom" == f)) {
        K.redraw();
        var g = {display:m}, j = {};
        g[f] = 0;
        j[f] = d;
        "right" == f ? g.width = d : g.height = d;
        a(fa(r), g);
        a(fa(q), j)
      }
      L(c);
      F();
      ca.sendEvent(e.JWPLAYER_RESIZE)
    }
    function L(a) {
      U = (!b || N) && 40 >= a && 0 > a.toString().indexOf("%");
      G && (U ? (G.audioMode(s), oa(), R.hidePreview(s), Z(), aa(v)) : (G.audioMode(v), Pa(S.jwGetState())));
      W && U && X();
      P.style.backgroundColor = U ? "transparent" : "#000"
    }
    function F() {
      Y && h.stretch(J.stretching, Y, ja.clientWidth, ja.clientHeight, Y.videoWidth, Y.videoHeight)
    }
    function I(a) {
      if(J.fullscreen) {
        switch(a.keyCode) {
          case 27:
            Ba(v)
        }
      }
    }
    function Q(a) {
      p || (a ? (P.className += " jwfullscreen", j.getElementsByTagName("body")[0].style["overflow-y"] = u) : (P.className = P.className.replace(/\s+jwfullscreen/, ""), j.getElementsByTagName("body")[0].style["overflow-y"] = ""))
    }
    function V() {
      var a;
      a: {
        a = [j.mozFullScreenElement, j.webkitCurrentFullScreenElement, Y.webkitDisplayingFullscreen];
        for(var b = 0;b < a.length;b++) {
          if(a[b] && (!a[b].id || a[b].id == S.id)) {
            a = s;
            break a
          }
        }
        a = v
      }
      J.fullscreen != a && Ba(a)
    }
    function M() {
      T && !U && (!b || ia) && T.show()
    }
    function X() {
      W && (!N || U) && W.hide(U)
    }
    function ea() {
      R && J.controls && !U && (!k || S.jwGetState() == d.IDLE) && R.show();
      if(b && !N && (g && (ba.style.display = m), !b || !J.fullscreen)) {
        Y.controls = !1
      }
    }
    function Z() {
      R && (b && !N && (g && J.controls && (ba.style.display = A), Y.controls = J.controls), R.hide())
    }
    function oa() {
      if(J.controls || U) {
        G && G.show(), M()
      }
      W && !U && W.show()
    }
    function aa(b) {
      b = b && !U;
      a(fa(n), {visibility:b ? "visible" : u, opacity:b ? 1 : 0})
    }
    function Ta() {
      ia = s;
      Ba(!1);
      J.controls && M()
    }
    function Ua() {
    }
    function Fa(a) {
      ia = v;
      clearTimeout(ra);
      ra = setTimeout(function() {
        Pa(a.newstate)
      }, 100)
    }
    function Pa(a) {
      switch(a) {
        case d.PLAYING:
          !J.getVideo().audioMode() || b ? (aa(s), F(), R.hidePreview(s), b && (!c || !N) && Z()) : (aa(v), R.hidePreview(U));
          x();
          break;
        case d.IDLE:
          aa(v);
          E();
          U || (R.hidePreview(v), ea(), da.hide || W && !U && W.show());
          break;
        case d.BUFFERING:
          ea();
          b ? aa(s) : oa();
          break;
        case d.PAUSED:
          ea(), (!b || N) && oa()
      }
    }
    function fa(a) {
      return"#" + S.id + (a ? " ." + a : "")
    }
    function Ca(b, c) {
      a(b, {display:c ? m : A})
    }
    var S = y, J = t, P, ua, ba, Ga, za, pa = 0, Da = 2E3, Y, ja, qa, O, G, R, T, W, da = h.extend({}, J.componentConfig("logo")), ga, K, U, N = J.mobilecontrols, $ = v, ia, va, sa, Aa = v, ca = new e.eventdispatcher;
    h.extend(this, ca);
    this.getCurrentCaptions = function() {
      return ga.getCurrentCaptions()
    };
    this.setCurrentCaptions = function(a) {
      ga.setCurrentCaptions(a)
    };
		this.getCurrentCaption = function() { // caption hack
      return ga.getCurrentCaption()
    };
		this.getCaptionList = function() { // caption hack
      return ga.getCaptionList()
    };
    this.getCaptionsList = function() {
      return ga.getCaptionsList()
    };
    this.setup = function(c) {
      if(!$) {
        S.skin = c;
        ua = z("span", q);
        ja = z("span", n);
        Y = J.getVideo().getTag();
        ja.appendChild(Y);
        ba = z("span", "jwcontrols");
        qa = z("span", "jwinstream");
        za = z("span", r);
        Ga = z("span", "jwaspect");
        c = J.height;
        var g = J.componentConfig("controlbar"), k = J.componentConfig("display");
        L(c);
        ga = new f.captions(S, J.captions);
        ga.addEventListener(e.JWPLAYER_CAPTIONS_LIST, H);
        ga.addEventListener(e.JWPLAYER_CAPTIONS_CHANGED, H);
        ba.appendChild(ga.element());
        R = new f.display(S, k);
        R.addEventListener(e.JWPLAYER_DISPLAY_CLICK, H);
        U && R.hidePreview(s);
        ba.appendChild(R.element());
        W = new f.logo(S, da);
        ba.appendChild(W.element());
        T = new f.dock(S, J.componentConfig("dock"));
        ba.appendChild(T.element());
        va = S.edition ? new f.rightclick(S, {abouttext:J.abouttext, aboutlink:J.aboutlink}) : new f.rightclick(S, {});
        J.playlistsize && J.playlistposition && J.playlistposition != A && (K = new f.playlistcomponent(S, {}), za.appendChild(K.element()));
        if(!b || N) {
          G = new f.controlbar(S, g), ba.appendChild(G.element()), N && oa()
        }
        setTimeout(function() {
          D(J.width, J.height)
        }, 0);
        ua.appendChild(ja);
        ua.appendChild(ba);
        ua.appendChild(qa);
        P.appendChild(ua);
        P.appendChild(Ga);
        P.appendChild(za);
        j.addEventListener("webkitfullscreenchange", V, v);
        Y.addEventListener("webkitbeginfullscreen", V, v);
        Y.addEventListener("webkitendfullscreen", V, v);
        j.addEventListener("mozfullscreenchange", V, v);
        j.addEventListener("keydown", I, v);
        S.jwAddEventListener(e.JWPLAYER_PLAYER_READY, Ua);
        S.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, Fa);
        S.jwAddEventListener(e.JWPLAYER_PLAYLIST_COMPLETE, Ta);
        Fa({newstate:d.IDLE});
        ba.addEventListener("mouseout", function() {
          clearTimeout(pa);
          pa = setTimeout(E, 10)
        }, v);
        ba.addEventListener("mousemove", x, v);
        h.isIE() && (ja.addEventListener("mousemove", x, v), ja.addEventListener("click", R.clickHandler));
        w(G);
        w(T);
        w(W);
        a("#" + P.id + "." + l + " .jwaspect", {"margin-top":J.aspectratio, display:m});
        c = h.exists(J.aspectratio) ? parseFloat(J.aspectratio) : 100;
        g = J.playlistsize;
        a("#" + P.id + ".playlist-right .jwaspect", {"margin-bottom":-1 * g * (c / 100) + "px"});
        a("#" + P.id + ".playlist-right ." + r, {width:g + "px", right:0, top:0, height:"100%"});
        a("#" + P.id + ".playlist-bottom .jwaspect", {"padding-bottom":g + "px"});
        a("#" + P.id + ".playlist-bottom ." + r, {width:"100%", height:g + "px", bottom:0});
        a("#" + P.id + ".playlist-right ." + q, {right:g + "px"});
        a("#" + P.id + ".playlist-bottom ." + q, {bottom:g + "px"})
      }
    };
    var Ba = this.fullscreen = function(a) {
      h.exists(a) || (a = !J.fullscreen);
      a ? J.fullscreen || (Q(s), P.requestFullScreen ? P.requestFullScreen() : P.mozRequestFullScreen ? P.mozRequestFullScreen() : P.webkitRequestFullScreen && P.webkitRequestFullScreen(), J.setFullscreen(s)) : (Q(v), J.fullscreen && (J.setFullscreen(v), j.cancelFullScreen ? j.cancelFullScreen() : j.mozCancelFullScreen ? j.mozCancelFullScreen() : j.webkitCancelFullScreen ? j.webkitCancelFullScreen() : Y.webkitExitFullScreen && Y.webkitExitFullScreen()), c && S.jwGetState() == d.PAUSED && setTimeout(ea, 
      500));
      G && G.redraw();
      R && R.redraw();
      T && T.redraw();
      F();
      J.fullscreen ? sa = setInterval(F, 200) : clearInterval(sa);
      setTimeout(function() {
        var a = h.bounds(ua);
        J.width = a.width;
        J.height = a.height;
        ca.sendEvent(e.JWPLAYER_RESIZE)
      }, 0)
    };
    this.resize = D;
    this.resizeMedia = F;
    var Ja = this.completeSetup = function() {
      a(fa(), {opacity:1})
    }, ra;
    this.setupInstream = function(a, c) {
      Ca(fa("jwinstream"), s);
      Ca(fa("jwcontrols"), v);
      qa.appendChild(a);
      _instreamVideo = c;
      Fa({newstate:d.PLAYING});
      b && (O = S.jwGetControls(), console.log(O), S.jwSetControls(v))
    };
    this.destroyInstream = function() {
      Ca(fa("jwinstream"), v);
      Ca(fa("jwcontrols"), s);
      qa.innerHTML = "";
      _instreamVideo = null;
      b && S.jwSetControls(O)
    };
    this.setupError = function(a) {
      $ = !0;
      jwplayer.embed.errorScreen(P, a);
      Ja()
    };
    this.addButton = function(a, b, c, d) {
      T && T.addButton(a, b, c, d)
    };
    this.removeButton = function(a) {
      T && T.removeButton(a)
    };
    this.setControls = function(a) {
      var b = J.controls;
      a = a ? s : v;
      J.controls = a;
      a != b && (a ? ea() : (G && !U && !N && G.hide(), T && !ia && !N && T.hide(), X(), Z()), ca.sendEvent(e.JWPLAYER_CONTROLS, {controls:a}))
    };
    this.forceState = function(a) {
      R.forceState(a)
    };
    this.releaseState = function() {
      R.releaseState(S.jwGetState())
    };
    this.getSafeRegion = function() {
      var a = J.controls, b = h.bounds(ua), c = b.top, d = h.bounds(G ? G.element() : null), e = 0 < T.numButtons(), f = h.bounds(T.element()), g = h.bounds(W.element()), j = 0 == W.position().indexOf("top"), e = Math.max(e ? f.top + f.height - c : 0, j ? g.top + g.height - c : 0), f = b.width, b = d.height ? (j ? d.top : g.top) - e - c : b.height - e;
      return{x:0, y:a ? e : 0, width:a ? f : 0, height:a ? b : 0}
    };
    this.destroy = function() {
      j.removeEventListener("webkitfullscreenchange", V, v);
      j.removeEventListener("mozfullscreenchange", V, v);
      Y.removeEventListener("webkitbeginfullscreen", V, v);
      Y.removeEventListener("webkitendfullscreen", V, v);
      j.removeEventListener("keydown", I, v);
      va && va.destroy()
    };
    P = z("div", "jwplayer playlist-" + J.playlistposition);
    P.id = S.id;
    J.aspectratio && (a(".jwplayer", {display:"inline-block"}), P.className = P.className.replace("jwplayer", "jwplayer " + l));
    D(J.width, J.height);
    var ka = document.getElementById(S.id);
    ka.parentNode.replaceChild(P, ka)
  };
  a(".jwplayer", {position:"relative", display:"block", opacity:0, "min-height":h.isMobile() ? 200 : 0, "-webkit-transition":"opacity .5s ease", "-moz-transition":"opacity .5s ease", "-o-transition":"opacity .5s ease"});
  a("." + q, {position:"absolute", left:0, right:0, top:0, bottom:0, "-webkit-transition":"opacity .5s ease", "-moz-transition":"opacity .5s ease", "-o-transition":"opacity .5s ease"});
  a("." + n + " ,.jwcontrols", {position:"absolute", height:"100%", width:"100%", "-webkit-transition":"opacity .5s ease", "-moz-transition":"opacity .5s ease", "-o-transition":"opacity .5s ease"});
  a("." + n, {overflow:u, visibility:u, opacity:0, cursor:"pointer"});
  a("." + n + " video", {background:"transparent", width:"100%", height:"100%"});
  a("." + r, {position:"absolute", height:"100%", width:"100%", display:A});
  a(".jwinstream", {position:"absolute", top:0, left:0, bottom:0, right:0, display:"none"});
  a(".jwaspect", {display:"none"});
  a(".jwplayer." + l, {height:"auto"});
  a(".jwplayer.jwfullscreen", {width:"100%", height:"100%", left:0, right:0, top:0, bottom:0, "z-index":1E3, position:"fixed"}, s);
  a(".jwplayer.jwfullscreen ." + q, {left:0, right:0, top:0, bottom:0}, s);
  a(".jwplayer.jwfullscreen ." + r, {display:A}, s);
  a(".jwplayer .jwuniform", {"background-size":"contain !important"});
  a(".jwplayer .jwfill", {"background-size":"cover !important", "background-position":"center"});
  a(".jwplayer .jwexactfit", {"background-size":"100% 100% !important"})
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils.extend, e = f.logo, d;
  d = function(a, b) {
    "free" == a.edition() ? b = null : (e.defaults.file = "", e.defaults.prefix = "");
    h(this, new e(a, b))
  };
  d.defaults = {prefix:"", file:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAATCAYAAACa0IPnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUVGQjQ0N0ZEOThDMTFFMUFDMUZCMzY5RkYyQkY5NDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUVGQjQ0ODBEOThDMTFFMUFDMUZCMzY5RkYyQkY5NDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUZCNDQ3REQ5OEMxMUUxQUMxRkIzNjlGRjJCRjk0NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUZCNDQ3RUQ5OEMxMUUxQUMxRkIzNjlGRjJCRjk0NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr5HQqEAAArQSURBVHja3JkJUNT3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%3D%3D"};
  h(d.defaults, e.defaults);
  f.logo = d
})(jwplayer.html5);
(function(f) {
  var h = f.model;
  f.model = function(e, d) {
    var a = new jwplayer.utils.key(e.key), b = new h(e, d), c = b.componentConfig;
    b.edition = function() {
      return a.edition()
    };
    b.componentConfig = function(a) {
      return"logo" == a ? b.logo : c(a)
    };
    return b
  }
})(jwplayer.html5);
(function(f) {
  f.player.prototype.edition = function() {
    return this._model.edition()
  }
})(jwplayer.html5);
(function(f) {
  var h = jwplayer.utils.extend, e = f.rightclick;
  f.rightclick = function(d, a) {
    if("free" == d.edition()) {
      a.aboutlink = "http://www.longtailvideo.com/jwpabout/?a=r&v=" + f.version + "&m=h&e=f", delete a.abouttext
    }else {
      if(!a.aboutlink) {
        var b = "http://www.longtailvideo.com/jwpabout/?a=r&v=" + f.version + "&m=h&e=", c = d.edition();
        a.aboutlink = b + ("pro" == c ? "p" : "premium" == c ? "r" : "ads" == c ? "a" : "f")
      }
      a.abouttext ? a.abouttext = "About " + a.abouttext + " ..." : (b = d.edition(), b = b.charAt(0).toUpperCase() + b.substr(1), a.abouttext = "About JW Player " + f.version + " (" + b + " edition)")
    }
    h(this, new e(d, a))
  }
})(jwplayer.html5);
(function(f) {
  var h = f.view;
  f.view = function(e, d) {
    var a = new h(e, d);
    "invalid" == d.edition() && a.setupError("Error setting up player: Invalid license key");
    return a
  }
})(jwplayer.html5);
