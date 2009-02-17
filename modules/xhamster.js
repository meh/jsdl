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

jsdl.module.xHamster = Class.create({
    constructor: function (url) {
        this._html           = HTTP.Get(url);
        this._attributes     = jsdl.module.xHamster.parseAttributes(this._html);
        this._attributes.url = jsdl.module.xHamster.directURL(this._html);
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

            attributes.file   = /addVariable\('file','(.+?)'/.exec(html)[1];
            attributes.server = /addVariable\('srv','(.+?)'/.exec(html)[1];

            return attributes;
        },

        directURL: function (html) {
            var attributes = jsdl.module.xHamster.parseAttributes(html);

            return "http://dl{0}.xhamster.com/flv2/{1}".format([
                attributes.server, attributes.file
            ]);
        }
    }
});

jsdl.addModule(/xhamster\.com\/movies/, function (url) {
    return new jsdl.module.xHamster(url);
});

