const gulp = require('gulp')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const gulpIf = require('gulp-if')
const fileUrl = require('file-url')
const rename = require('gulp-rename')

gulp.task('build', () =>
  gulp.src('src/*.*', {base: __dirname})
    .pipe(sourcemaps.init())
    // uglify javascript file
    .pipe(gulpIf('*.js', uglify()))
    // write .map files, set sourceRoot to the absolute file URL of this folder
    // (this is for example needed for IDEs like VS Code Chrome Debugger)
    .pipe(sourcemaps.write('.', {sourceRoot: fileUrl(__dirname)}))
    // prevent gulp from creating a src subdirectory in build
    .pipe(rename(filePath => {
      filePath.dirname = filePath.dirname.substr('src/'.length)
      return filePath
    }))
    .pipe(gulp.dest('build'))
)
