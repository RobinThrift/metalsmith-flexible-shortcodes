var shortcode = require('shortcode-parser'),
    each       = require('lodash.forEach'),
    plugin;


plugin = function(opts) {
    // loop through all the registered shortcodes
    each(opts.shortcodes, (fn, name) => {
        shortcode.add(name, fn);
    });

    return (files, metalsmith, done) => {
        each(files, (file, path) => {
            if (!file.shortcodes) { return; }
            var cnt = file.contents.toString();

            if (opts.clean) {
                // clean possible <p> tags around
                // the shortcodes that the markdown parser creates
                cnt = cnt.replace(/(<p>)(\[.*?\])(<\/p>)/gi, (all, p, code) => {
                    return code;
                });
            }

            file.contents = new Buffer(shortcode.parse(cnt));
        });
        done();
    };
};  


module.exports = plugin;

