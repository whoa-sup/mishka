const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const del = require("del");
const sync = require("browser-sync").create();

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

// images

const images = () => {
  return gulp.src("source/img/**/*.{jpg, png, svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
}

exports.images = images;

// webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg, png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"))
}

exports.createWebp = createWebp;

// sprite

const sprite = () => {
  return gulp.src("source/img/icon*.svg")
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
  "source/img/**",
  "source/js/**",
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
    sprite
  )(done)
};

exports.build = build;
