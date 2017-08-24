(function() {

    'use strict';
    var concat = require('gulp-concat');
    var gulp = require('gulp');
    var gulpClean = require('gulp-clean');
    var gulpConcat = require('gulp-concat');
    var gulpJshint = require('gulp-jshint');
    var gulpRename = require('gulp-rename');
    var gulpLess = require('gulp-less');
    var gulpUglify = require('gulp-uglify');
    var gulpVersionAppend = require('gulp-version-append');
    var gulpWatch = require('gulp-watch');
    var browserSync = require('browser-sync');
    var modRewrite = require('connect-modrewrite');
    var gulpSequence = require('gulp-sequence');
    var gulpPlumber = require('gulp-plumber');
    var gulpCssmin = require('gulp-cssmin');

    var settings = {
        less_compress: false,
        js_compress: false
    };

    var srcVendorCss = [
        './assets/bootstrap.css',
        './assets/paper.css',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        './bower_components/rdash-ui/dist/css/rdash.css',
        './bower_components/angular-loading-bar/build/loading-bar.css',
        './bower_components/angucomplete-alt/angucomplete-alt.css',
        './bower_components/angular-ui-switch/angular-ui-switch.css',
        './assets/additionalStyle.css',
    ];

    var srcFonts = [
        './bower_components/bootstrap-css/fonts/*',
    ];

    var src_vendor = [
        './bower_components/angular/angular.min.js',
        './bower_components/angular-cookies/angular-cookies.min.js',
        './bower_components/a0-angular-storage/dist/angular-storage.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/angular-permission/dist/angular-permission.min.js',
        './bower_components/angular-permission/dist/angular-permission-ui.min.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        './bower_components/angular-messages/angular-messages.js',
        './bower_components/angular-base64/angular-base64.js',
        './bower_components/underscore/underscore.js',
        './bower_components/angular-loading-bar/build/loading-bar.js',
        './bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
        './bower_components/angucomplete-alt/dist/angucomplete-alt.min.js',
        './bower_components/angular-ui-switch/angular-ui-switch.min.js',
        './bower_components/angular-file-upload/dist/angular-file-upload.min.js',
        './bower_components/pusher-js/dist/web/pusher.js',
        './bower_components/pusher-angular/lib/pusher-angular.min.js'
    ];

    var src_appjs = [
        './app/*.js',
        './app/**/*.js',
        './app/**/**/*.js',
    ];

    var srcAssets = [
        './assets/**/*'
    ];

    var srcHtml = [
        './app/*.html',
        './app/**/*.html',
        './app/**/**/*.html',
    ];

    var pipes = {};
    pipes.appjs = function() {
        var nice = gulp.src(src_appjs)
            .pipe(concat('app.js'));
        if (settings.js_compress) {
            return nice
                .pipe(uglify())
                .pipe(gulp.dest('./dest'));
        } else {
            return nice
                .pipe(gulp.dest('./dest'));
        }
    };

    pipes.appjsProduction = function() {
        var nice = gulp.src(src_appjs)
            .pipe(concat('app.js'));
        return nice
            .pipe(gulpUglify())
            //.pipe(stripDebug())
            .pipe(gulp.dest('./dest'));
    };

    pipes.appCss = function() {
        return gulp.src(srcVendorCss)
            .pipe(gulpCssmin())
            .pipe(gulpConcat('ewtk.css'))
            .pipe(gulp.dest('./dest'));
    };

    pipes.vendorjs = function() {
        var nice = gulp.src(src_vendor)
            //.pipe(order(order_vendor))
            .pipe(concat('vendor.js'));
        return nice
            .pipe(gulpUglify())
            .pipe(gulp.dest('./dest'));
    };

    gulp.task('browser-sync', function() {
        var cors = function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
            _modRewrite = modRewrite([
                '!\\.\\w+$ /index.html [L]',
            ]);
        //browserSync.init(['app/*.html', "assets/styles/css/*.css", "app/**/*.js"], {
        browserSync.init([
            './dest/*.css',
            './app/*.js',
            './app/**/*.js',
            './app/**/**/*.js',
            './app/*.html',
            './app/**/*.html',
            './app/**/**/*.html',
            './assets/**/*'
        ], {
            logLevel: "debug",

            server: {
                baseDir: "./",
                index: "index.html",
                middleware: [
                    cors,
                    _modRewrite
                ]
            }
        });
    });

    gulp.task('appCss', pipes.appCss);
    gulp.task('appjs', pipes.appjs);
    gulp.task('appjsProduction', pipes.appjsProduction);
    gulp.task('vendorjs', pipes.vendorjs);
    gulp.task('watch-appjs', function() {
        gulp.watch(src_appjs, pipes.appjs);
    });
    gulp.task('watch-vendorjs', function() {
        gulp.watch(src_vendor, pipes.vendorjs);
    });

    gulp.task('default', gulpSequence('appjs', 'vendorjs', 'appCss'));
    gulp.task('build', gulpSequence('appjsProduction', 'vendorjs', 'appCss'));
    gulp.task('watch', ['default', 'watch-appjs', 'browser-sync']);

})();
