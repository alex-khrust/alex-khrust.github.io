let fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload
baseDir      = '.' // Base directory path without «/» at the end

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const ssi          = require('browsersync-ssi')
const webpack      = require('webpack-stream')
const sass         = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename       = require('gulp-rename')
const imagemin     = require('gulp-imagemin')
const newer        = require('gulp-newer')
const rsync        = require('gulp-rsync')

function browsersync() {
	browserSync.init({
		server: { 
			baseDir: baseDir + '/',
			middleware: ssi({ 
				baseDir: baseDir + '/', 
				ext: '.html' 
			}),
			// index: 'index.htm',
			// proxy: 'http://local.dev/',
		},
		// host: 'local.dev',
		open: 'external',
		// tunnel: 'alex-khrust',
		notify: false,
		online: true,
		ghostMode: false,
		// port: 8080
	})
}

function scripts() {
	return src(baseDir + '/js/libs.js')
	.pipe(webpack({
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					// exclude: /(libs)/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/env']
					}
				}
			]
		}
	})).on('error', function handleError() {
		this.emit('end')
	})
	.pipe(rename('libs.min.js'))
	.pipe(dest(baseDir + '/js'))
	.pipe(browserSync.stream())
}

function styles() {
	return src(baseDir + '/sass/app.sass')
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(rename('app.min.css'))
	.pipe(dest(baseDir + '/css'))
	.pipe(browserSync.stream())
}

function images() {
	return src([baseDir + '/img/src/**/*'])
	.pipe(newer(baseDir + '/img/dest'))
	.pipe(imagemin([
		imagemin.svgo({plugins: [{removeViewBox: true}]}),
		imagemin.mozjpeg({quality: 75, progressive: true})
	], {
		verbose: true
	}))
	.pipe(dest(baseDir + '/img/dest'))
	.pipe(browserSync.stream())
}

function deploy() {
	return src(baseDir + '/')
	.pipe(rsync({
		root: baseDir + '/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		include: [/* '*.htaccess' */], // Included files to deploy,
		exclude: [
			'**/Thumbs.db',
			'**/*.DS_Store',
			'js/app.js',
			'sass',
		],
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

function startwatch() {
	watch(baseDir + '/sass/**/*', { usePolling: true }, styles)
	watch([baseDir + '/js/**/*.js','!' + baseDir + '/js/**/*.min.js'], { usePolling: true }, scripts)
	watch(baseDir + '/img/src/**/*.{jpg,jpeg,png,webp,svg,gif}', { usePolling: true }, images)
	watch(baseDir + `/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

exports.scripts  = scripts
exports.styles   = styles
exports.images   = images
exports.deploy   = deploy
exports.assets   = series(scripts, styles, images)
exports.default  = series(scripts, styles, images, parallel(browsersync, startwatch))