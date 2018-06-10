# gulp-svg-gallery

Generates a thumbnail page of your SVG's.

## Installing

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

### Adding descriptions

You can add description to each thumbanil.

Create a file with the same base name but with the extention `.txt` in the same directory that SVG's live in.
For example, if you have an SVG named `heart.svg`, you create a file named `heart.txt`, where you put description for `heart.svg`.
`gulp-svg-gallery` automatically detects the description file and copies its content to the thumbnail page.

## Contribution

Contributions are welcome:-) Just fork the repo, do your work and make a pull request.
