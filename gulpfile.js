const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const del = require("del");
const sync = require("browser-sync").create();
// html
const htmlmin = require("gulp-htmlmin");
// css
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// js
const terser = require("gulp-terser");
// images
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

// styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"))
}

exports.html = html;

// js

const js = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(terser())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
}

exports.js = js;

// images

const images = () => {
  return gulp.src("source/img/**/*")
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
}

exports.images = images;

// webp

const createWebp = () => {
  return gulp.src("build/img/**/*.{jpg, png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// sprite

const sprite = () => {
  return gulp.src("build/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// copy

const copy = () => {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/*.ico"
  ], {
  base: "source"
  })
 .pipe(gulp.dest("build"));
};

exports.copy = copy;

// clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/**/*.js", gulp.series("js")).on("change", sync.reload);
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

// build

const build = (done) => {
  gulp.series(
    clean,
    copy,
    html,
    styles,
    js,
    images,
    sprite,
    createWebp
  )(done)
};

exports.build = build;
