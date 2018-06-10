var expect = require('chai').expect;
var gallery = require('../index');
var gutil = require('gulp-util');

describe('gulp-svg-gallery', () => {

    it('renders the gallery page appropriately', () => {
        var stream = gallery({renderer: JSON.stringify});

        stream.on('data', data => {
            expect(String(data.contents)).eq(JSON.stringify({
                'main': {
                    'svg-icon-1': {
                        'svg': '<svg/>',
                        'desc': 'svg-icon-1 is a fake svg icon for testing.'
                    },
                    'svg-icon-2': {
                        'svg': '<svg/>',
                        'desc': 'svg-icon-2 is a fake svg icon for testing.'
                    }
                }
            }));
        });

        stream.write(new gutil.File({
            path: 'svg-icon-1.svg',
            contents: new Buffer('<svg></svg>'),
        }));
        stream.write(new gutil.File({
            path: 'svg-icon-1.txt',
            contents: new Buffer('svg-icon-1 is a fake svg icon for testing.'),
        }));
        stream.write(new gutil.File({
            path: 'svg-icon-2.svg',
            contents: new Buffer('<svg></svg>'),
        }));
        stream.write(new gutil.File({
            path: 'svg-icon-2.txt',
            contents: new Buffer('svg-icon-2 is a fake svg icon for testing.'),
        }));
        stream.end();

    });


    it('removes the useless parts of the input svg', () => {
        var stream = gallery({renderer: JSON.stringify});

        stream.on('data', data => {
            expect(String(data.contents)).eq(JSON.stringify({
                'main': {
                    'svg-icon-1': {
                        'svg': '<svg/>',
                        'desc': 'svg-icon-1 is a fake svg icon for testing.'
                    }
                }
            }));
        });

        stream.write(new gutil.File({
            path: 'svg-icon-1.svg',
            contents: new Buffer(
                // the XML declaration is removed.
                '<?xml version="1.0" encoding="iso-8859-1"?>' +
                // the id is removed.
                '<svg id="foo">' +
                '</svg>'
            ),
        }));
        stream.write(new gutil.File({
            path: 'svg-icon-1.txt',
            contents: new Buffer('svg-icon-1 is a fake svg icon for testing.'),
        }));

    });

    it('leaves the contents of <svg></svg> as is.', () => {
        var stream = gallery({renderer: JSON.stringify});

        var svgstring = (
            '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="100" cy="100" r="100"/>' +
            '</svg>'
        );

        stream.on('data', data => {
            expect(String(data.contents)).eq(JSON.stringify({
                'main': {
                    'svg-icon-1': {
                        'svg': svgstring,
                        'desc': 'svg-icon-1 is a fake svg icon for testing.'
                    }
                }
            }));
        });

        stream.write(new gutil.File({
            path: 'svg-icon-1.svg',
            contents: new Buffer(svgstring),
        }));
        stream.write(new gutil.File({
            path: 'svg-icon-1.txt',
            contents: new Buffer('svg-icon-1 is a fake svg icon for testing.'),
        }));

    });

});

