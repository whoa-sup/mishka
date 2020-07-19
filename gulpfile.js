'use strict'

const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const del = require('del');
const sync = require('browser-sync');

//  Директории

const dirs = {
  src: 'source',
  dest: 'build'
};

// Пути к файлам

const path = {
  // html: {
  //   root: `${dirs.src}/pug/`,
  //   compile: `${dirs.src}/pug/pages/`,
  //   save: `${dirs.dest}`
  // }
};

// Задачи

// const html = () => {
//   return gulp.src(`${path.html.compile}*.pug`)
//   .pipe(plumber())
//   .pipe(pug({
//     pretty: true
//   }))
//   .pipe(gulp.dest(path.html.save));
// };

// exports.html = html;

const server = () => {
  sync.init({
      ui: false,
      notify: false,
      server: {
          baseDir: `${dirs.src}`
      }
  });
};

exports.server = server;
