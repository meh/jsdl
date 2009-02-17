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

jsdl         = new Object;
jsdl.modules = new Object;
jsdl.module  = new Object;

jsdl.addModule = function (match, exec) {
    jsdl.modules[match] = exec;
}

require("config.js");
require("download.js")

jsdl.init = function (conf) {
    this.config = new jsdl.Config(conf);

    var directory = this.config.xml.modules.@path;
    for each (let path in this.config.xml.modules.module.@path) {
        include("{0}/{1}".format([directory, path]));
    }
}

