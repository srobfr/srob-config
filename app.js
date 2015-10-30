var yaml = require('js-yaml');
var fs = require('fs');
var Q = require('q');
var _ = require('underscore');
var extend = require('extend');
var traverse = require('traverse');

/**
 * Charge des fichiers de configuration (js, yaml)
 * @constructor
 */
function SrobConfig() {
    var that = this;
    var includeKey = "include";

    /**
     * Charge une liste de fichiers.
     *
     * @param files
     * @param replacements
     */
    that.load = function (files, replacements) {
        var config = {};
        if (typeof files === "string") {
            files = [files];
        }

        var promises = [];
        _.each(files, function (file) {
            var p;

            if(typeof file === "string") {
                if (file.match(/\.js$/)) {
                    // Fichier js
                    p = Q(require(file));

                } else {
                    // Fichier Yaml
                    p = Q.nfcall(fs.readFile, file, "utf-8")
                        .then(function (data) {
                            return yaml.safeLoad(data);
                        });
                }
            } else {
                p = Q(file);
            }

            p = p.then(function (config) {
                if (replacements) {
                    traverse(config).forEach(function (obj) {
                        if (!this.isLeaf || typeof obj !== "string") return;
                        _.each(replacements, function (replacement) {
                            obj = obj.replace(new RegExp(replacement[0], "g"), replacement[1]);
                        });
                        this.update(obj);
                    });
                }

                if (config[includeKey] !== undefined) {
                    return that.load(config[includeKey])
                        .then(function (includedConfig) {
                            delete config[includeKey];
                            return extend(true, config, includedConfig);
                        });
                }

                return config;
            });

            promises.push(p);
        });

        return Q.all(promises)
            .then(function (configs) {
                return extend.apply(this, [true, {}].concat(configs));
            });
    };
}

var srobConfig = new SrobConfig();
module.exports = srobConfig.load;
