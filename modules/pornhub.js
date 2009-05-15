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

require("System/Network/Protocol/HTTP/Simple");

jsdl.module.Pornhub = Class.create({
    constructor: function (url) {
        this._html       = HTTP.Get(url, {requestHeaders: {Cookie: 'age_verified=1'}});
        this._attributes = jsdl.module.Pornhub.parseAttributes(this._html);
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
            var attributes = new Object;
            var xml        = new XML(XML.clean(HTTP.Get(unescape(/to.addVariable\("options",\s*"(.*?)"/.exec(html)[1]))));
            attributes.url = xml.flv_url.*[0].toXMLString();

            return attributes;
        },

        directURL: function (html) {
            return jsdl.module.Youporn.parseAttributes(html).url;
        }
    }
});

jsdl.addModule(/pornhub.com\/view_video/, function (url) {
    return new jsdl.module.Pornhub(url);
});

