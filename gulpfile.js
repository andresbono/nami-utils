'use strict';

const gulp = require('gulp');
const commonTasks = require('bitnami-gulp-common-tasks')(gulp);
const runSequence = require('run-sequence');

/* CI tasks*/

const testFiles = './test/*.js';
const srcFiles = ['*.js', './lib/**/*.js', testFiles];
const testArgs = {sources: srcFiles, tests: testFiles};

commonTasks.test(testArgs);
commonTasks.ci(testArgs);

/* Build tasks */

const buildDir = './artifacts/build';

commonTasks.npm({
  buildDir,
  sources: [
    './index.js',
    './test/**/*.js'
  ],
  meta: [
    './COPYING'
  ]
});

/* General tasks */

gulp.task('clean', () => {
  runSequence('test:clean', 'ci-test:clean', 'npm-pack:clean');
});

gulp.task('default', ['test']);
