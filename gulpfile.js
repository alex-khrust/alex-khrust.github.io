var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    combiner = require('stream-combiner2').obj;

gulp.task('sass', function () {
    return combiner(
         gulp.src('sass/**/*'),
         sass(),
         autoprefixer(['last 15 version', '> 1%', 'ie 8'], {cascade: true}),
         gulp.dest('css'),
         browserSync.reload({stream: true}) // Обновляем CSS на странице при изменении
    ).on('error', notify.onError());
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: '.' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function () {
    return gulp.src([
        'libs/jquery/dist/jquery.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify('js'));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

gulp.task('clean', function () {
    return del.sync('img');
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('img', function () {
    return gulp.src('img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progrssive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('sass/**/*', ['sass']);
});

// gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {
//
//     var buildCss = gulp.src([
//         'src/css/main.css',
//         'src/css/libs.min.css'
//     ])
//         .pipe(gulp.dest('dist/css'));
//
//     var buildFonts = gulp.src('app/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//     var buildJs = gulp.src('src/js/**/*')
//         .pipe(gulp.dest('dist/js'));
//
//     var buildHtml = gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
//
// });

gulp.task('default', ['watch']);
