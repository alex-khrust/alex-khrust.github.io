const { src, dest, parallel } = require('gulp'); // Подключаем Gulp
const sass = require('gulp-sass'); //Подключаем Sass пакет,
const browsersync = require('browser-sync').create(); // Подключаем Browser Sync
const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const uglify = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
const cssnano = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
const rename = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
const del = require('del'); // Подключаем библиотеку для удаления файлов и папок
const imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const pngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const cache = require('gulp-cache'); // Подключаем библиотеку кеширования
const autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
const notify = require('gulp-notify'); // Подключаем плагин оповещения при ошибке комприляции
const combiner = require('stream-combiner2').obj;

// BrowserSync
function browserSync(done) { // Создаем таск browser-sync
  browsersync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: '.' // Директория для сервера - src
    },
    notify: false // Отключаем уведомления
  });
}
// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// sass task
// function css() {
//   return src('sass/**/.sass')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(autoprefixer({ // Создаем префиксы
//       browser: ['> 0,1%'],
//       cascade: true
//     }))
//     .pipe(gulp.dest('css'))
//     .pipe(browsersync.stream()).on('error', notify.onError());
// }

// function sass() { // Создаем таск Sass
//   return combiner(
//     gulp.src('sass/**/*.sass'),// Берем источник
//     sass(), // Преобразуем Sass в CSS посредством gulp-sass
//     autoprefixer(['last 15 versions', '> 1%', 'ie 9'], {cascade: true}), // Создаем префиксы
//     gulp.dest('css'), // Выгружаем результата в папку src/css
//     browsersync.reload({stream: true}),
//   ).on('error', notify.onError()); // Обновляем CSS на странице при изменении, и в случае ошибки выводим оповещение.
// }

// function scripts() {
//   return src([ // Берем все необходимые библиотеки
//     'libs/jquery/dist/jquery.min.js', // Берем jQuery
//     // 'libs/Easy-Customizable-Sliding-Menu-Indicator-Plugin-SlidingMenu/SlidingMenu.js',
//     // 'libs/TweenMax/TweenMax.min.js',
//     // 'libs/slick/slick.min.js',
//     // 'libs/magnific-popup/dist/jquery.magnific-popup.min.js',
//     'libs/gsap/src/minified/TweenMax.min.js',
//     'libs/wow/dist/wow.min.js'
//   ])
//     .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
//     .pipe(uglify({ // Сжимаем JS файл
//           toplevel: true
//     }))
//     .pipe(gulp.dest('js')); // Выгружаем в папку src/js
// });
//
// gulp.task('css-libs', gulp.parallel('sass'), function () {
//   return gulp.src([ // Выбираем файл для минификации
//     'libs/normalize.css/normalize.css',
//     // 'libs/fullpage.js/dist/fullpage.min.css',
//     // 'libs/magnific-popup/dist/magnific-popup.css',
//     // 'libs/slick/slick.css',
//     // 'libs/slick/slick-theme.css'
//   ])
//     .pipe(concat('libs.css'))
//     .pipe(cssnano()) // Сжимаем
//     .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//     .pipe(gulp.dest('css')); // Выгружаем в папку src/css
// });
//
// gulp.task('css-main-nano', gulp.parallel('sass'), function () {
//   return gulp.src([ // Выбираем файл для минификации
//     'css/main.css',
//   ])
//     .pipe(cssnano()) // Сжимаем
//     .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//     .pipe(gulp.dest('css')); // Выгружаем в папку src/css
// });
//
// Watch files
// gulp.parallel('browser-sync', 'css-libs', 'scripts')
// function watch() {
//   parallel.watch('css/**/*.css', sass) // Наблюдение за sass файлами в папке sass
//   parallel.watch('*.html', browserSync.reload) // Наблюдение за HTML файлами в корне проекта
//   parallel.watch('html/**/*.html', browserSync.reload) // Наблюдение за всеми HTML файлами
//   parallel.watch('js/**/*.js', browserSync.reload) // Наблюдение за JS файлами в папке js
// }
//
// gulp.task('clean', function () {
//   return del.sync('dist'); // Удаляем папку dist перед сборкой
// });
//
// gulp.task('img', function () {
//   return gulp.src('img/**/*') // Берем все изображения из src
//     .pipe(cache(imagemin({ // С кешированием
//       // .pipe(imagemin({ // Сжимаем изображения без кеширования
//       interlaced: true,
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       use: [pngquant()]
//     }))/**/)
//     .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
// });
//
// gulp.task('build', gulp.parallel('clean', 'img', 'sass', 'scripts'), function () {
//
//   var buildCss = gulp.src([ // Переносим библиотеки в продакшен
//     'css/main.css',
//     'css/libs.min.css'
//   ])
//     .pipe(gulp.dest('dist/css'));
//
//   var buildFonts = gulp.src('fonts/**/*') // Переносим шрифты в продакшен
//     .pipe(gulp.dest('dist/fonts'));
//
//   var buildJs = gulp.src('js/**/*') // Переносим скрипты в продакшен
//     .pipe(gulp.dest('dist/js'));
//
//   var buildHtml = gulp.src('*.html') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist'));
//
//   var buildHtml = gulp.src('html/**/*.html') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist/html'));
//
// });
//
// gulp.task('clear', function (callback) {
//   return cache.clearAll();
// });
//
// gulp.task('default', gulp.parallel('watch'));


// gulp.tasks
// exports.css = css;
// exports.watch = watch;
// exports.browserSync = browserSync;

// exports.default = watch;
