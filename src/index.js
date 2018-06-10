var through = require('through2');
var gutil = require('gulp-util');
var render = require('./renderer');
var path = require('path');
var cheerio = require('cheerio');

module.exports = function(options){

    var defaultOptions = {
        'renderer': render
    };
    Object.assign(defaultOptions, options);

    var ctx = {main: {}};

    function transform(file, encoding, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }
    
        if (file.isStream()) {
            this.emit(
                'error', 
                new gutil.PluginError('gulp-svg-gallery', 'Streaming not supported')
            );
            return callback();
        }

        var basename = path.basename(file.path, path.extname(file.path));

        if (file.path.endsWith('.svg')) {
            if (ctx.main[basename] === undefined) {
                ctx.main[basename] = {}
            }
            var $ = cheerio.load(file.contents.toString(), { xmlMode: true });
            ctx.main[basename]['svg'] = $.xml($('svg').attr('id', null));
        }

        if (file.path.endsWith('.txt')) {
            if (ctx.main[basename] === undefined) {
                ctx.main[basename] = {}
            }
            ctx.main[basename]['desc'] = String(file.contents);
        }

        return callback();
    }

    function flush(callback) {

        var innerHTML = '';

        var output = new gutil.File({
            path: 'svg-gallery.html',
            contents: new Buffer(defaultOptions.renderer(ctx)),
        });
        
        this.push(output);

        return callback();
    }

    return through.obj(transform, flush)
}