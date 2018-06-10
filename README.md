# gulp-svg-gallery

Generates a thumbnail page of your SVG's.

![Screenshot](https://user-images.githubusercontent.com/32252655/41199715-a71ef21a-6cd1-11e8-89e5-15d2f46a3854.png "screenshot")

## Installing

```
npm install git+https://github.com/ykiu/gulp-svg-gallery.git --save-dev
```

## Usage

In your gulpfile,

```js
var gulp = require('gulp');
var svggallery = require('gulp-svg-gallery');

gulp.task('svggallery', function(){
    gulp.src([
        'path/to/your/svg/directory/*'
    ])
    .pipe(svggallery())
    .pipe(gulp.dest('path/to/your/desired/directory/'));
})

gulp.task('default', [
    'svggallery'
]);
```

This will generate a static html named `svg-gallery.html` in the `path/to/your/desired/directory/`.

### Adding descriptions

Optionally, you can add description to each thumbanil.

In the directory that SVG's live in, create a file with the same base name as the SVG file but with the extention `.txt`.
For example, if you have an SVG named `heart.svg`, you create a file named `heart.txt`, where you put description for `heart.svg`.
`gulp-svg-gallery` automatically detects the description file and copies its content to the thumbnail page.

## Contribution

Contributions are welcome:-) Just fork the repo, do your work and make a pull request.
