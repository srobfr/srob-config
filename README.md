# srob-config
Configuration loader

## Installation

    npm install srob-config

## Usage

    var configLoad = require('srob-config');

    configLoad.load([
            // Files list. JS or yml.
            __dirname + "/path/to/foo.js",
            "bar.yml",
        ], [
            // Load-time strings replacement list.
            // Every occurrence of the first string will be replaced in the config leaf strings
            ["{dirname}", __dirname],
            ["{Foo}", "bar"],
        ])
        .done(function(config) {
            // Here your full config object is ready.
        });
