var
  gulp = require('gulp'), // Подключаем Gulp
  sass = require('gulp-sass'), //Подключаем Sass пакет,
  cleanCSS = require('gulp-clean-css'), // Подключаем пакет для минификации CSS
  cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del = require('del'), // Подключаем библиотеку для удаления файлов и папок
  imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
  pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
  cache = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
  notify = require('gulp-notify'), // Подключаем плагин оповещения при ошибке комприляции
  combiner = require('stream-combiner2').obj;

gulp.task('sass', function () { // Создаем таск Sass
  return combiner(
    gulp.src('sass/**/*.sass'),// Берем источник
    sass(), // Преобразуем Sass в CSS посредством gulp-sass
    autoprefixer({ // Создаем префиксы
      browsers: ['last 2 versions'],
      cascade: false
    }),
    gulp.dest('css'), // Выгружаем результата в папку src/css
    browserSync.reload({stream: true}),
  ).on('error', notify.onError()); // Обновляем CSS на странице при изменении, и в случае ошибки выводим оповещение.
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: '.' // Директория для сервера - src
    },
    // tunnel: true,
    notify: false // Отключаем уведомления
  });
});

gulp.task('scripts', function () {
  return gulp.src([ // Берем все необходимые библиотеки
    'libs/jquery/dist/jquery.min.js', // Берем jQuery
    // 'libs/slick/slick.min.js',
    // 'libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'libs/gsap/src/minified/TweenMax.min.js',
    'libs/wow/dist/wow.min.js',
    'libs/paroller.js/dist/jquery.paroller.js',
    'libs/fullPage/jquery.fullpage.extensions.min.js',
    'libs/fullPage/scrolloverflow.min.js',
    'libs/fullPage/fullPage.js'
  ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest('js')); // Выгружаем в папку src/js
});

gulp.task('css-libs', ['sass'], function () {
  return gulp.src([ // Выбираем файл для минификации
    'libs/normalize.css/normalize.css',
    'libs/wow/css/libs/animate.css',
    'libs/fullPage/jquery.fullpage.css',
    // 'libs/magnific-popup/dist/magnific-popup.css',
    // 'libs/slick/slick.css',
    // 'libs/slick/slick-theme.css'
  ])
    .pipe(concat('libs.css'))
    .pipe(cleanCSS({ // Сжимаем
      level: 2
    }))
    // .pipe(cssnano()) // Сжимаем
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('css')); // Выгружаем в папку src/css
});

gulp.task('gulp-clean-css', ['sass'], function () {
  return gulp.src([ // Выбираем файл для минификации
    'css/main.css',
  ])
    .pipe(cleanCSS({ // Сжимаем
      level: 2
    }))
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('dist/css')); // Выгружаем в папку src/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
  gulp.watch('sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('html/**/*.html', browserSync.reload); // Наблюдение за всеми HTML файлами
  gulp.watch('js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function () {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function () {
  return gulp.src('img/**/*') // Берем все изображения из src
    .pipe(cache(imagemin({ // С кешированием
      // .pipe(imagemin({ // Сжимаем изображения без кеширования
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {
  
  var buildCss = gulp.src([ // Переносим библиотеки в продакшен
    'css/main.css',
    'css/libs.min.css'
  ])
    .pipe(gulp.dest('dist/css'));
  
  var buildFonts = gulp.src('fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));
  
  var buildJs = gulp.src('js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'));
  
  var buildHtml = gulp.src('*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
  
  var buildHtml = gulp.src('html/**/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist/html'));
  
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
