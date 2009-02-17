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

jsdl.module.Megaporn = Class.create({
    constructor: function (url) {
        this._id         = /\?v=(.+)$/.exec(url)[1];
        this._xml        = new XML(XML.clean(jsdl.module.Megaporn.getXML(this._id)));
        this._attributes = jsdl.module.Megaporn.parseAttributes(this._xml.ROW);
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
        getXML: function (id) {
            return HTTP.Get("http://www.megaporn.com/video/xml/videolink.php?v={0}&id={1}".format([
                id,
                new Date().getTime().toString().replace(/.{3}$/, '')
            ]));
        },

        parseAttributes: function (xml) {
            var attributes = {
                duration   : xml.@runtimehms.toXMLString(),
                size       : xml.@size.toXMLString(),
                server     : xml.@s.toXMLString(),
                description: xml.@description.toXMLString(),
                added      : xml.@added.toXMLString(),
                username   : xml.@username.toXMLString(),
                category   : xml.@category.toXMLString(),
                views      : xml.@views.toXMLString(),
                comments   : xml.@comments.toXMLString(),
                favorited  : xml.@favorited.toXMLString(),
                rating     : xml.@rating.toXMLString(),
                keys       : [
                    xml.@k1.toXMLString(),
                    xml.@k2.toXMLString()
                ],
                string     : xml.@un.toXMLString()
            };

            attributes.url = "http://www{0}.megaporn.com/files/{1}/".format([
                attributes.server,
                jsdl.module.Megaporn.decrypt(attributes.string, attributes.keys[0], attributes.keys[1])
            ]);

            return attributes;
        },

        decrypt: function (string, key1, key2) {
            var binary = [string.charAt(i).toInt(16).toPaddedString(4,2)
                for each (i in range(0, string.length-1))
            ].join('').toArray();

            var values = new Array;
            for (let i = 0; i < 384; i++) {
                key1 = ((key1 * 11) + 77213) % 81371;
                key2 = ((key2 * 17) + 92717) % 192811;

                values.push((key1 + key2) % 128);
            }

            for (let i = 256; i >= 0; i--) {
                let a = values[i];
                let b = i % 128;

                [binary[a], binary[b]] = [binary[b], binary[a]]
            }

            for (let i = 0; i < 128; i++) {
                binary[i] ^= values[i+256] & 1;
            }

            binary = binary.join('');

            var result = new Array;
            for (let i = 0; i < binary.length; i += 4) {
                result.push(binary.substr(i, 4));
            }

            return [result[i].toInt(2).toString(16) for each (i in range(0, result.length-1))].join('');
        }
    }
});

jsdl.addModule(/megaporn\.com\/video\/\?v=.+$/, function (url) {
    return new jsdl.module.Megaporn(url);
});

