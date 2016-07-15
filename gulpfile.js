/* jshint node: true */
'use strict';

var gulp        = require('gulp'),
    g           = require('gulp-load-plugins')({lazy: false}),
    bowerFiles  = require('main-bower-files'),
    bower       = require('./bower'),
    es          = require('event-stream'),
    lazypipe    = require('lazypipe'),
    stylish     = require('jshint-stylish'),
    queue       = require('streamqueue'),
    rimraf      = require('rimraf'),
    noop        = g.util.noop,
    minifyCSS   = require('gulp-minify-css'),
    mobileFirst = require('gulp-mobile-first'),
    s3          = require("gulp-s3"),
    isWatching  = false;

  var htmlminOpts = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: false,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true
  };

  /*
  Publish /dist folder in AWS S3 Bucket
  */
  //var aws = JSON.parse(fs.readFileSync('./aws.json'));
  //var options = {
  //  headers: {'Cache-Control': 'max-age=315360000, no-transform, public'}
  //}
  //
  //gulp.task('upload', function() {
  //  return gulp.src('./dist/**', {read: false})
  //    .pipe(s3(aws, options));
  //});

  /**
   * JS Hint
   */
  gulp.task('jshint', function () {
    return gulp.src([
      './gulpfile.js',
      './apps/**/*.js'
    ])
      .pipe(g.cached('jshint'))
      .pipe(jshint('./.jshintrc'))
      .pipe(livereload());
  });

  /**
   * CSS
   */
  gulp.task('clean-css', function (done) {
    rimraf('./.tmp/css', done);
  });

  gulp.task('styles', ['clean-css'], function () {
    return gulp.src([
      './apps/css/**/*.less'
    ])
      .pipe(g.less())
      .pipe(g.concat('main.css'))
      .pipe(mobileFirst())
      //.pipe(minifyCSS())
      .pipe(gulp.dest('./.tmp/css/main.css'))
      .pipe(gulp.dest('./apps/css/main.css'))
      .pipe(g.cached('built-css'))
      .pipe(livereload());
  });

  gulp.task('styles-dist', ['styles'], function () {
    return cssFiles().pipe(dist('css', bower.name));
  });

  gulp.task('csslint', ['styles'], function () {
    return cssFiles()
      .pipe(g.cached('csslint'))
      .pipe(g.csslint('./.csslintrc'))
      .pipe(g.csslint.reporter());
  });

  /**
   * Scripts
   */
  gulp.task('scripts-dist', function () {
    return appFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
  });

  /**
   * Templates
   */
  gulp.task('templates', function () {
    return templateFiles().pipe(buildTemplates());
  });

  //gulp.task('templates-dist', function () {
  //  return templateFiles({min: true}).pipe(buildTemplates());
  //});

  /**
   * Vendors
   */
  gulp.task('vendors', function () {
    var files = bowerFiles();
    var vendorJs = fileTypeFilter(files, 'js');
    var vendorCss = fileTypeFilter(files, 'css');
    var q = new queue({objectMode: true});
    if (vendorJs.length) {
      q.queue(gulp.src(vendorJs).pipe(dist('js', 'vendors')));
    }
    if (vendorCss.length) {
      q.queue(gulp.src(vendorCss).pipe(dist('css', 'vendors')));
    }
    return q.done();
  });

  /**
   * Index
   */
  gulp.task('index', index);
  gulp.task('build-all', ['styles', 'templates'], index);

  function index () {
    var opt = {read: false};
    return gulp.src('./apps/index.html')
      .pipe(g.inject(gulp.src(bowerFiles(), opt), {ignorePath: 'bower_components', starttag: '<!-- inject:vendor:{{ext}} -->'}))
      .pipe(g.inject(es.merge(appFiles(), cssFiles(opt)), {ignorePath: ['.tmp', 'apps']}))
      .pipe(gulp.dest('./apps'))
      .pipe(g.embedlr())
      .pipe(gulp.dest('./.tmp/'))
      .pipe(livereload());
  }

  /**
   * Assets
   */
  gulp.task('assets', function () {

    var assets = [
      './apps/images/**',
      './apps/common/views/**'
    ];

    assets.map(function(value){
      var kind = value.split('/');
      return gulp.src(value)
        .pipe(gulp.dest('./dist/' + kind[2]));
    })

  });

  gulp.task('modules-dist', function(){
    return gulp.src('./apps/modules/**')
      .pipe(gulp.dest('./dist/modules/'));
  });

  gulp.task('common-dist', function(){
    return gulp.src('./apps/common/**')
      .pipe(gulp.dest('./dist/common/'));
  });

  gulp.task('fonts-images-dist', function(){
    return gulp.src(['./apps/fonts/**', './apps/images/**'], {base: '.'})
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('index-dist', function(){
    return gulp.src('./apps/common/index.html')
      .pipe(gulp.dest('./dist/'));
  });

  /**
   * Dist
   */
  gulp.task('dist', ['vendors', 'assets', 'styles-dist', 'scripts-dist', 'modules-dist', 'common-dist', 'fonts-images-dist', 'index-dist'], function () {
    //return gulp.src('./apps/index.html')
    //  .pipe(g.inject(gulp.src('./dist/{common,css}/vendors.min.{common,css}'), {ignorePath: 'dist', addRootSlash: false, starttag: '<!-- inject:vendor:{{ext}} -->'}))
    //  .pipe(g.inject(gulp.src('./dist/{common,css}/' + bower.name + '.min.{common,css}'), {ignorePath: 'dist/', addRootSlash: false, starttag: '<!-- inject:{{ext}} -->'}))
    //  .pipe(g.inject(gulp.src('./dist/common/' + bower.name + '.annotated.js'), { ignorePath: 'dist', addRootSlash: false }))
    //  //.pipe(g.htmlmin(htmlminOpts))
    //  .pipe(gulp.dest('./dist/'));
  });

  /**
   * Static file server
   */
  gulp.task('statics', g.serve({
    port: 9000,
    root: ['./.tmp', './.tmp/apps', './apps', './bower_components'],
    livereload: true
  }));

  /**
   * Watch
   */
  gulp.task('serve', ['watch']);
  gulp.task('watch', ['statics', 'default'], function () {
    isWatching = true;
    // Initiate livereload server:
    g.livereload.listen();
    gulp.watch('./apps/**/*.js', ['jshint']).on('change', function (evt) {
      if (evt.type !== 'changed') {
        gulp.start('index');
      } else {
        g.livereload.changed(evt);
      }
    });
    gulp.watch('./apps/index.html', ['index']);
    gulp.watch(['./apps/**/*.html', '!./apps/index.html'], ['templates']);
    gulp.watch(['./apps/css/less/*.less'], ['csslint']).on('change', function (evt) {
      if (evt.type !== 'changed') {
        gulp.start('index');
      } else {
        g.livereload.changed(evt);
      }
    });
  });

  /**
   * Default task
   */
  gulp.task('default', ['lint', 'build-all']);

  /**
   * Lint everything
   */
  gulp.task('lint', ['jshint', 'csslint']);

  /**
   * Test
   */
  gulp.task('test', ['templates'], function () {
    return testFiles()
      .pipe(g.karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }));
  });

  /**
   * Inject all files for tests into karma.conf.common
   * to be able to run `karma` without gulp.
   */
  gulp.task('karma-conf', ['templates'], function () {
    return gulp.src('./karma.conf.js')
      .pipe(g.inject(testFiles(), {
        starttag: 'files: [',
        endtag: ']',
        addRootSlash: false,
        transform: function (filepath, file, i, length) {
          return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
        }
      }))
      .pipe(gulp.dest('./'));
  });

  /**
   * Test files
   */
  function testFiles() {
    return new queue({objectMode: true})
      .queue(gulp.src(fileTypeFilter(bowerFiles(), 'js')))
      .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
      .queue(appFiles())
      .queue(gulp.src(['./apps/**/*_test.js', './.tmp/src/app/**/*_test.js']))
      .done();
  }

  /**
   * All CSS files as a stream
   */
  function cssFiles (opt) {
    return gulp.src('./.tmp/css/**/*.css', opt);
  }

  /**
   * All AngularJS application files as a stream
   */
  function appFiles () {
    var files = [
      './.tmp/' + bower.name + '-templates.js',
      './.tmp/apps/**/*.js',
      '!./.tmp/apps/**/*_test.js',
      './apps/**/*.js',
      '!./apps/**/*_test.js'
    ];
    return gulp.src(files)
      .pipe(g.angularFilesort());
  }

  /**
   * All AngularJS templates/partials as a stream
   */
  function templateFiles (opt) {
    return gulp.src(['./apps/**/*.html', '!./apps/index.html'], opt)
      .pipe(opt && opt.min ? g.htmlmin(htmlminOpts) : noop());
  }

  /**
   * Build AngularJS templates/partials
   */
  function buildTemplates () {
    return lazypipe()
      .pipe(g.ngHtml2js, {
        moduleName: bower.name,
        prefix: '/' + bower.name + '/',
        stripPrefix: '/apps'
      })
      .pipe(g.concat, bower.name + '-templates.js')
      .pipe(gulp.dest, './.tmp')
      .pipe(livereload)();
  }

  /**
   * Filter an array of files according to file type
   *
   * @param {Array} files
   * @param {String} extension
   * @return {Array}
   */
  function fileTypeFilter (files, extension) {
    var regExp = new RegExp('\\.' + extension + '$');
    return files.filter(regExp.test.bind(regExp));
  }

  /**
   * Concat, rename, minify
   *
   * @param {String} ext
   * @param {String} name
   * @param {Object} opt
   */
  function dist (ext, name, opt) {
    opt = opt || {};
    return lazypipe()
      .pipe(g.concat, name + '.' + ext)
      .pipe(gulp.dest, './dist/' + ext)
      .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
      .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
      .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist/' + ext)
      .pipe(ext === 'js' ? g.uglify : g.minifyCss)
      .pipe(g.rename, name + '.min.' + ext)
      .pipe(gulp.dest, './dist/' + ext)();
  }

  /**
   * Livereload (or noop if not run by watch)
   */
  function livereload () {
    return lazypipe()
      .pipe(isWatching ? g.livereload : noop)();
  }

  /**
   * Jshint with stylish reporter
   */
  function jshint (jshintfile) {
    return lazypipe()
      .pipe(g.jshint, jshintfile)
      .pipe(g.jshint.reporter, stylish)();
  }
