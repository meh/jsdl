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

jsdl.module.Pornzapp = Class.create({
    constructor: function (url) {
        this._html           = HTTP.Get(url);
        this._attributes     = new Object;
        this._attributes.url = jsdl.module.Pornzapp.directURL(this._html);
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
        directURL: function (html) {
            var js   = HTTP.Get("http://www.pornzapp.com"+(/<script.*?src="(.*?interface.*?)"/.exec(html)[1]));

            return /videoFile: '(.*?)'/.exec(js)[1];
        }
    }
});

jsdl.addModule(/pornzapp.com/, function (url) {
    return new jsdl.module.Pornzapp(url);
});

