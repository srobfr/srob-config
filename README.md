# srob-config
Configuration loader

## Installation

    npm install srob-config

## Usage

    var configLoad = require('srob-config');

    configLoad.load([
            // Files list.
            __dirname + "/path/to/foo.js", // JS file imported using a require().
            "bar.yml", // Yaml file
            { // Plain old config object
                foo: "Bar",
                plop: "Hello, world !", // Will be "Hello, WORLD !" in the result due to a string replacement (see below).
            }
        ], 
        [
            // Load-time strings replacement list.
            // Every occurrence of the first string will be replaced in the config leaf strings
            ["{dirname}", __dirname],
            ["{Foo}", "bar"],
            ["world", "WORLD"],
        ])
        .done(function(config) {
            // Here your full config object is ready.
        });
