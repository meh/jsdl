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

jsdl.module.Youporn = Class.create({
    constructor: function (url) {
        this._html       = HTTP.Get(url, {requestHeaders: {Cookie: 'age_check=1'}});
        this._attributes = jsdl.module.Youporn.parseAttributes(this._html);
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
            attributes.url = /"(.*\.flv)/.exec(html)[1];
            return attributes;
        },

        directURL: function (html) {
            return jsdl.module.Youporn.parseAttributes(html).url;
        }
    }
});

jsdl.addModule(/youporn.com\/watch/, function (url) {
    return new jsdl.module.Youporn(url);
});

