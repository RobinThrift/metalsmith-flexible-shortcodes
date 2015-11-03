var ShortcodeParser = require('meta-shortcodes'),
    each      = require('lodash.forEach'),
    merge     = require('lodash.merge'),
    parser    = new ShortcodeParser(),
    plugin;


plugin = function(opts) {
    // loop through all the registered shortcodes
    var generated = false,
        generateShortcodes = (data) => {
            if (!generated) {
                each(opts.shortcodes, (fn, name) => {
                    parser.add(name, (opts, content) => {
                        return fn(content, opts, data);
                    });
                });
                generated = true;
            }
        } 

    return (files, metalsmith, done) => {
        each(files, (file, path) => {
            if (!file.shortcodes) { return; }
            var cnt = file.contents.toString(),
                data = merge({}, file, metalsmith.metadata()); 

            generateShortcodes(data);

            if (opts.clean) {
                // clean possible <p> tags around
                // the shortcodes that the markdown parser creates
                cnt = cnt.replace(/(<p>)(\[.*?\])(<\/p>)/gi, (all, p, code) => {
                    return code;
                });
            }

            file.contents = new Buffer(parser.parse(cnt));
        });
        done();
    };
};  


module.exports = plugin;

