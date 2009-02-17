/*********************************************************************
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE             *
 *                   Version 2, December 2004                        *
 *                                                                   *
 *  Copyleft meh.                                                    *
 *                                                                   *
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE             *
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION  *
 *                                                                   *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.                        *
 *********************************************************************/

require("System/Net/Protocol/HTTP/Simple");

var Youtube = Class.create({
    constructor: function (url) {
        this._html           = HTTP.Get(url);
        this._attributes     = Youtube.parseAttributes(this._html);
        this._attributes.url = Youtube.directURL(this._html);
    },

    methods: {
        toString: function () {
            return this.attribute("url");
        },

        attribute: function (name) {
            return this._attributes[name];
        }
    },

    static: {
        parseAttributes: function (html) {
            var attributes   = /swfArgs\s*=\s*(\{.*?);\n/.exec(html)[1].evalJSON();
            attributes.title = /<meta name="title" content="(.*?)"/.exec(html)[1];
            return attributes;
        },

        directURL: function (html) {
            var attributes = Youtube.parseAttributes(html);

            return "http://www.youtube.com/get_video?video_id={0}&t={1}".format([
                attributes.video_id, attributes.t
            ]);
        }
    }
});

jsdl.addModule(/youtube\.com\/watch\?/, function (url) {
    return new Youtube(url);
});

