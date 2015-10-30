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
        // Strings replacement list.
        ["{dirname}", __dirname],
        ["{Foo}", "bar"],
    ]);

*
