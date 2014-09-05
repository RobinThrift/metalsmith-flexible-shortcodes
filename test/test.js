var should     = require('should'),
    dirEqual   = require('assert-dir-equal'),
    rm         = require('rimraf').sync,
    path       = require('path'),
    Metalsmith = require('metalsmith'),
    each       = require('lodash.forEach');

require('mocha');


function msFactory(dir, plugins, done) {

    var ms = Metalsmith(path.join(__dirname, 'fixtures/src'));

    ms.source(dir);

    ms.clean(false);


    each(plugins, function(plugin) {
        ms.use(plugin.fn(plugin.opts));
    });
    
    ms.destination('../../tmp');

    ms.build(function(err) {
        if (err) { throw err; }
        done();
    });
}

describe('metalsmith flexible shortcodes', function() {

    beforeEach(function() {
        rm(path.join(__dirname, 'tmp'));
    });

    it('simple self closing shortcodes', function(done) {
        msFactory('simple-self-closing', [{
            opts: {
                shortcodes: {
                    makro: function() {
                        return 'I\'m replaced :)';
                    }
                }
            },
            fn: require('..')
        }, 
        {
            opts: {},
            fn: require('metalsmith-markdown')
        }], function() {
            dirEqual(path.join(__dirname, 'tmp'), path.join(__dirname, 'fixtures/expected/simple-self-closing'));
            done();
        });
    });

    it('simple enclosing shortcodes', function(done) {
        msFactory('simple-enclosing', [{
            opts: {
                gfm: true
            },
            fn: require('metalsmith-markdown')
        },
        {
            opts: {
                shortcodes: {
                    div: function(str) {
                        return '<div>\n' + str + '\n</div>';
                    }
                },
                clean: true
            },
            fn: require('..')
        }], function() {
            dirEqual(path.join(__dirname, 'tmp'), path.join(__dirname, 'fixtures/expected/simple-enclosing'));
            done();
        });
    });

});
