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

jsdl.module.Redtube = Class.create({
    constructor: function (url) {
        this._attributes = {
            url: jsdl.module.Redtube.directURL(url)
        };
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
        directURL: function (url) {
            var id = /(\d+)$/.exec(url)[1];

            return "http://dl.redtube.com/{0}/{1}".format([
                "_videos_t4vn23s9jc5498tgj49icfj4678",
                jsdl.module.Redtube.decrypt(id)
            ]);
        },

        decrypt: function (id) {
            var s      = id.toInt().toPaddedString(7);
            var pathnr = (id/1000).floor().toPaddedString(7);

            var xc = [
                'R', '1', '5', '3', '4', '2', 'O', '7', 'K', '9', 'H', 'B',
                'C', 'D', 'X', 'F', 'G', 'A', 'I', 'J', '8', 'L', 'M', 'Z',
                '6', 'P', 'Q', '0', 'S', 'T', 'U', 'V', 'W', 'E', 'Y', 'N'
            ];

            var code = new String;

            var qsum = 0;
            for (let i = 0; i <= 6; i++) {
                qsum += s.charAt(i).toInt() * (i+1);
            }

            var s1 = qsum.toString();

            qsum = 0;
            for (let i = 0; i < s1.length; i++) {
                qsum += s1.charAt(i).toInt();
            }

            var qstr = qsum.toPaddedString(2);

            code += xc[s.charCodeAt(3) - 48 + qsum + 3];
            code += qstr.charAt(1);
            code += xc[s.charCodeAt(0) - 48 + qsum + 2];
            code += xc[s.charCodeAt(2) - 48 + qsum + 1];
            code += xc[s.charCodeAt(5) - 48 + qsum + 6];
            code += xc[s.charCodeAt(1) - 48 + qsum + 5];
            code += qstr.charAt(0);
            code += xc[s.charCodeAt(4) - 48 + qsum + 7];
            code += xc[s.charCodeAt(6) - 48 + qsum + 4];
            
            return "{0}/{1}.flv".format([pathnr, code]);
        }
    }
});

jsdl.addModule(/redtube.com/, function (url) {
    return new jsdl.module.Redtube(url);
});

