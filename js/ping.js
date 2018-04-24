// var head = document.getElementsByTagName('head').item(0);
//             css = document.createElement('link');
//             css.href = "//imgcache.qq.com/bossweb/service/touch/css/mod/iphoneX.css";
//             css.rel = 'stylesheet';
//             css.type = 'text/css';
//             addMeta = document.createElement('meta');
//             addMeta.name = 'viewport';
//             addMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover';
//             head.appendChild(addMeta);
//             head.appendChild(css);
var loadScript = function (url, callback) {
    var script,
        head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    script = document.createElement("script");
    script.async = "async";
    script.src = url;
    script.onload = script.onreadystatechange = function (_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode) {
                head.removeChild(script);
            }
            script = undefined;
            if (!isAbort) {
                callback && callback();
            }
        }
    };
    head.insertBefore(script, head.firstChild);
}
    // $("head").append('<meta http-equiv="content-type" content="text/html;charset=gbk" />');
    ; (function ($, win, undefined) {
        try {
            if (window.sessionStorage) {
                var storage = window.sessionStorage;
                if (!window.sessionStorage.scene_id) {
                    var scene_id = Touch.Util.getUrlParam("scene_id");
                    if (scene_id) {
                        storage.scene_id = scene_id;
                    } else {
                        storage.scene_id = "";
                    }
                }
                if (!window.sessionStorage.asyncid) {
                    var asyncid = Touch.Util.getUrlParam("asyncid");
                    if (asyncid) {
                        storage.asyncid = asyncid;
                    } else {
                        storage.asyncid = "";
                    }
                }
                if (!window.sessionStorage.ssid) {
                    var ssid = Touch.Util.getUrlParam("ssid");
                    if (ssid) {
                        storage.ssid = ssid;
                    } else {
                        storage.ssid = "";
                    }
                }
                var kf_pass_ticket = Touch.Util.getUrlParam("pass_ticket");
                if (kf_pass_ticket != '') {
                    storage.kf_pass_ticket = encodeURIComponent(kf_pass_ticket)
                }
            }
            return;
        } catch (e) {
            window.console && console.debug && console.debug(e);
        }


    })(Zepto, window);
; (function ($, win, undefined) {
    //获取uin
    var ping = {};
    function GetCookie(b) {
        var filterXSS = function (e) {
            if (!e) return e;
            for (; e != unescape(e);) e = unescape(e);
            for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
            return e
        };
        var a;
        return filterXSS((a = document.cookie.match(RegExp("(^|;\\s*)" + b + "=([^;]*)(;|$)"))) ? unescape(a[2]) : null);
    }
    function filteruin(uin) {
        if (uin == null || uin == '') {
            return '';
        }
        var regUin = /o+\d{5,12}$/;
        if (regUin.test(uin)) {
            var regReplace = /o0+|^o/;
            uin = uin.replace(regReplace, "");
        }
        else {
            uin = '';
        }
        return uin;
    }
    var localurl = window.location.href;
    var localstorage = local_kf_openid = localcode = localcode_m = localopenid_m = localsessioncode = localopenid_q = localsessionid = localcommond = uuid = "";
    /*
     判断是否是在wechat环境
     是返回wx否返回-1
     */
    var is_weixin = function () {
        var ua = navigator.userAgent.toLowerCase();
        var isMobileQq = "",
            isApp = 0;
        var urlparameters = window.location.search;
        urlparameters = urlparameters.replace("?", "");
        urlparameters = encodeURIComponent(urlparameters);
        var msdkUrlParam = '';
        if (window.localStorage) {
            msdkUrlParam = localStorage.getItem('msdkUrlParam');
            if (msdkUrlParam) {
                if (urlparameters.indexOf('msdkEncodeParam') !== -1 && msdkUrlParam != urlparameters) {
                    localStorage.setItem('msdkUrlParam', urlparameters);
                    localStorage.setItem('local_app_uuid', '');
                }
                isApp = 1;
            } else {
                if (urlparameters.indexOf('msdkEncodeParam') !== -1) {
                    if (msdkUrlParam != urlparameters) {
                        localStorage.setItem('msdkUrlParam', urlparameters);
                        localStorage.setItem('local_app_uuid', '');
                    }
                    isApp = 1;
                }
            }
        }
        if (typeof (mqq) !== "undefined" && mqq.QQVersion) {
            isMobileQq = mqq.QQVersion;
        }
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return "wx";
        } else if (isMobileQq != 0) {
            return "qq";
        } else if (isApp == 1) {
            return "app";
        } else {
            return -1;
        }
    };
    ping.weixin_qq = is_weixin();
    /*
     获取微信版本信息
     */
    var getVersion = function () {
        var re = /MicroMessenger\/(\d(\.\d+)*)/,
            ua = navigator.userAgent,
            ret = re.exec(ua);
        if (ret === null) {
            return 'not weixin';
        } else {
            return ret[1];
        }
    };
    /*
     获取openid
     先跳转wxapi获取code
     */
    var wechatGetOpenid = function () {
        localstorage = window.sessionStorage;
        local_kf_openid = window.localStorage.local_kf_sid;
        local_uuid = window.localStorage.local_uuid;
        if (local_kf_openid !== undefined && local_uuid !== undefined) {
            return false;
        }
        localcode = Touch.Util.getUrlParam("code");
        var wechatVersion = "";
        if (ping.weixin_qq == "wx") {
            wechatVersion = getVersion();
        }
        localcode_m = localstorage.localcode_m;
        localopenid_m = localstorage.localopenid_m;
        if (localcode == "" && localcode_m == undefined) {//wx6da3cf171a65b0f8 测试环境//现网 ： wxc8cfdff818e686b9
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc8cfdff818e686b9&redirect_uri=" + encodeURIComponent(localurl) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            localstorage.localcode_m = 1;
        } else if (localcode != "" && localopenid_m === undefined) {
            if (typeof (window.__wxjs_is_wkwebview) !== "undefined" && window.__wxjs_is_wkwebview) {
                history.go(0);
            }
            else {
                history.go(-1);
            }
            localstorage.localopenid_m = 1;
            localcommond = "command=F10159&type=GetOpenId&code=" + localcode + "&version=" + wechatVersion;
            $.ajax({
                type: "POST",
                url: "/cgi-bin/commonNew",
                data: "rand=" + Math.random() + "&channel=flow&command=" + encodeURIComponent(localcommond),
                dataType: "json",
                timeout: 3000,
                async: false, //非异步
                success: function (msg) {
                    if (msg.resultinfo.list[0].result == 0 && msg.resultinfo.list[0].openid != "") {
                        window.localStorage.local_kf_sid = msg.resultinfo.list[0].openid;
                        if (typeof (msg.resultinfo.list[0].uuid) !== "undefined") {
                            window.localStorage.local_uuid = msg.resultinfo.list[0].uuid;
                        }
                    }
                },
                error: function (err) {
                    console.debug(err);
                }
            });
        }
    };
    /*
     获取openid
     先跳转wxapi获取code
     */
    var AppGetOpenid = function () {
        window.localStorage.local_app_uuid = 'app_uuid';
        var urlparameters = window.location.search;
        urlparameters = urlparameters.replace("?", "");
        urlparameters = encodeURIComponent(urlparameters);
        var command = 'command=F10226&async=1';
        $.ajax({
            type: "POST",
            url: "/cgi-bin/commonNew",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: 'rand=' + Math.random() + '&channel=flow&command=' + encodeURIComponent(command) + "&urlParam=" + urlparameters,
            dataType: "json",
            timeout: 5000,
            async: true, //异步
            success: function (msg) {
            },
            error: function (err) {
            }
        });
    };
    /*
     获取上报参数
     */
    var getParameters = function () {
        //访问时间-毫秒
        var oper_time = -1;
        if (typeof _speedMark !== "undefined") {
            oper_time = new Date - _speedMark;
        }
        //来源URL
        var sourceurl = document.referrer,
            uuid = '',//UUID
            uin = '',
            msdkUrlParam = '';
        if (ping.weixin_qq == "wx" && window.localStorage.local_kf_sid) {
            uin = window.localStorage.local_kf_sid;
            if (window.localStorage.local_uuid) {
                uuid = window.localStorage.local_uuid;
            }
        } else if (is_weixin() == 'app') {
            if (window.localStorage) {
                msdkUrlParam = localStorage.getItem('msdkUrlParam');
                if (window.localStorage.local_app_uuid) {
                    uin = window.localStorage.local_app_uuid;
                    uuid = window.localStorage.local_app_uuid;
                }
            }
        }
        else if (ping.weixin_qq != "wx" && ping.weixin_qq != "app") {
            uin = GetCookie('uin');
            uin = filteruin(uin);
        }

        if (uin == '') {
            //return '';
        }
        if (!window.sessionStorage.scene_id) {
            var sence_id = window.sessionStorage.scene_id;
        }
        else {
            var sence_id = Touch.Util.getUrlParam("scene_id");
        }
        if (!window.sessionStorage.asyncid) {
            var callid = window.sessionStorage.asyncid;
        }
        else {
            var callid = Touch.Util.getUrlParam("asyncid");
        }
        var logparameters = "uin=" + encodeURIComponent(uin) + "&uuid=" + uuid + "&source_url=" + encodeURIComponent(sourceurl) + "&oper_time=" + encodeURIComponent(oper_time) + "&sence_id=" + encodeURIComponent(sence_id) + "&callid=" + encodeURIComponent(callid) + "&msdk_urlparam=" + msdkUrlParam + '&rand=' + Math.random();
        return logparameters;
    };
    //上报场景id和openid
    function reportpgv() {
        try {
            var report = {};
            report.scene_id = "";
            report.asyncid = "";
            report.ssid = "";
            var urlparameters = "";
            urlparameters = window.location.search;
            urlparameters = urlparameters.replace("?", "");
            if (window.sessionStorage) {
                if (window.sessionStorage.scene_id) {
                    report.scene_id = window.sessionStorage.scene_id;
                }
                if (window.sessionStorage.asyncid) {
                    report.asyncid = window.sessionStorage.asyncid;
                }
            }
            if (ping.weixin_qq == "wx") {
                if (window.sessionStorage && window.localStorage) {
                    if (!window.localStorage.local_kf_sid || !window.localStorage.local_uuid) {
                        if (window.sessionStorage.openid && window.sessionStorage.uuid) {
                            window.localStorage.local_kf_sid = window.sessionStorage.openid;
                            window.localStorage.local_uuid = window.sessionStorage.uuid;
                        } else {
                            wechatGetOpenid();
                            return '';
                        }
                    }
                }
            } else if (ping.weixin_qq == "app") {
                if (window.localStorage) {
                    if (window.localStorage.local_app_uuid != 'app_uuid') {
                        AppGetOpenid();
                    }
                }
            }
            if (report.scene_id == "") {
                report.scene_id = Touch.Util.getUrlParam("scene_id");
            }
            if (report.scene_id || report.asyncid) {
                clicSceneid({ extParam: report.scene_id, pgUserType: report.asyncid });
            }
            else {
                clicSceneid({ pgUserType: urlparameters });
            }
        } catch (e) {
            window.console && console.debug && console.debug(e);
        }
    }
    function clicSceneid(obj) {
        if (typeof pgvMain === 'function') {
            pgvMain(obj);

        }
        var logparameters = getParameters();
        if (logparameters == '') {
            return '';
        }
        var reporturl = "/touch/ping.html?" + logparameters;
        $.ajax({
            type: "GET",
            url: reporturl,
            dataType: "json",
            timeout: 5000,
            success: function (msg) {
            }
        });
    }
    function initping() {
        if (window.location.protocol == 'https:') {
            loadScript("https://pingjs.qq.com/tcss.ping.https.js", reportpgv);
        }
        else {
            loadScript("http://pingjs.qq.com/tcss.ping.js", reportpgv);
        }
    }
    ping.kf_tagClick = function (hot) {
        var tagsend = "tag_name=" + encodeURIComponent(hot);
        var logparameters = getParameters();
        if (logparameters == '') {
            return '';
        }
        var reporturl = "/touch/ping.html?" + tagsend + "&" + logparameters;
        $.ajax({
            type: "GET",
            url: reporturl,
            dataType: "json",
            timeout: 5000,
            success: function (msg) {
            }
        });
    }
    ping.faq_feedback = function (faqid, c) {
        var tagsend = "type=faqfeedback&faqid=" + faqid + "&fv=" + c;
        var logparameters = getParameters();
        if (logparameters == '') {
            return '';
        }
        var reporturl = "/touch/ping.html?" + tagsend + "&" + logparameters;
        $.ajax({
            type: "GET",
            url: reporturl,
            dataType: "json",
            timeout: 5000,
            success: function (msg) {
            }
        });
    }
    $(document).ready(function () {
        setTimeout(initping, 0)
    })
    win.g_ping = ping;
})(Zepto, window);

function kf_pgvSendClick(hot) {
    if (typeof pgvSendClick === 'function') {
        pgvSendClick({ hottag: hot });
    }
    else {
        setTimeout("ping_pgvSendClick('" + hot + "')", 100);
    }
    g_ping.kf_tagClick(hot);
}
function ping_pgvSendClick(hot) {
    try {
        if (typeof pgvSendClick === 'function') {
            pgvSendClick({ hottag: hot });
        }
    } catch (e) {
        window.console && console.debug && console.debug(e);
    }
}