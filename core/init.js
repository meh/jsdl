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

require("System/FileSystem/Directory");
require("config.js");
require("download.js")

jsdl.init = function (conf) {
    this.config = new jsdl.Config(conf);

    var directory = new Directory(this.config.xml.modulesDirectory.@path);
    directory.select(function (file) file.name.test(/\.js$/)).each(function (module) {
        include(module.path);
    });
}

