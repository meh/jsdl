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

jsdl.Download = Class.create({
    constructor: function (url) {
        for (let re in jsdl.modules) {
            if (url.match(re)) {
                this._url = jsdl.modules[re](url);
                break;
            }
        }
    },

    static: {
        url: function (url) {
            for (let re in jsdl.modules) {
                if (url.match(eval(re))) {
                    return jsdl.modules[re](url);
                }
            }

            return null;
        }
    }
});
