var { watch, src, dest, parallel, series } = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var twig = require('gulp-twig');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');

// Девсервер
function devServer(cb) {
  var params = {
    watch: true,
    reloadDebounce: 150,
    notify: false,
    server: { baseDir: './build' },
  };

  browserSync.create().init(params);
  cb();
}

// Сборка
function buildPages() {
    return src(['src/pages/*.twig', 'src/pages/*.html'])
      .pipe(twig())
      .pipe(dest('build/'));
  }

function buildStyles() {
    return src(['src/styles/**/*.scss', 'src/styles/**/*.css'])
      .pipe(sass())
      .pipe(postcss([
        autoprefixer(),
        cssnano()
      ]))
      .pipe(dest('build/styles/'));
}

function buildVendorScripts() {
  return src('src/scripts/vendor/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('build/scripts/vendor/'));
}

function buildScripts() {
  return src('src/scripts/index.js')
  .pipe(webpack({
    output:       {filename: 'bundle.js'},
    optimization: {minimize: true}
  }))
  .pipe(babel({presets: ['@babel/preset-env']}))
  .pipe(uglify())
  .pipe(dest('build/scripts/'));
}

function copyAPI() {
  return src('src/scripts/api.js')
    .pipe(dest('build/scripts/'));
}

function buildAssets(cb) {
    // Уберём пока картинки из общего потока
    src(['src/assets/**/*.*', '!src/assets/img/**/*.*'])
      .pipe(dest('build/assets/'));
  
    src('src/assets/img/**/*.*')
      .pipe(imagemin())
      .pipe(dest('build/assets/img'));
  
    // Раньше функция что-то вовзращала, теперь добавляем вместо этого искусственый колбэк
    // Это нужно, чтобы Галп понимал, когда функция отработала и мог запустить следующие задачи
    cb();
  }

// Отслеживание
function watchFiles() {
    watch(['src/pages/*.twig', 'src/pages/*.html'], buildPages);
    watch(['src/styles/*.css','src/styles/*.scss'], buildStyles);
    watch('src/scripts/**/*.js', buildScripts);
    watch('src/assets/**/*.*', buildAssets);

  }

// Очистка билда
function clearBuild() {
    return del('build/');
  }

exports.default =
  series(
    clearBuild,
    parallel(
      devServer,
      series(
        parallel(buildPages, buildStyles, buildScripts, buildVendorScripts, copyAPI, buildAssets),
        watchFiles
      )
    )
  );