let fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload
baseDir      = '.' // Base directory path without «/» at the end

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const webpack      = require('webpack-stream')
const sass         = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename       = require('gulp-rename')
const imagemin     = require('gulp-imagemin')
const newer        = require('gulp-newer')
const rsync        = require('gulp-rsync')
const del          = require('del')

function browsersync() {
	browserSync.init({
		server: { baseDir: baseDir + '/' },
		notify: false,
		online: true,
		// tunnel: true, tunnel: "dev",
		// socket: {
    //   domain: "localhost:8000"
    // }
	})
}

function scripts() {
	return src(baseDir + '/js/app.js')
	.pipe(webpack({
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(js)$/,
					// exclude: /(node_modules)/,
					exclude: /(libs)/,
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
	.pipe(rename('app.min.js'))
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
	return src(baseDir + '/img/src/**/*')
	.pipe(newer(baseDir + '/img/dest'))
	.pipe(imagemin())
	.pipe(dest(baseDir + '/img/dest'))
}

function cleanimg() {
	return del(baseDir + '/img/dest/**/*', { force: true })
}

function deploy() {
	return src(baseDir + '/')
	.pipe(rsync({
		root: baseDir + '/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		include: [/* '*.htaccess' */], // Included files to deploy,
		exclude: [ '**/Thumbs.db', '**/*.DS_Store' ],
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

exports.assets   = series(cleanimg, scripts, images)
exports.scripts  = scripts
exports.styles   = styles
exports.images   = images
exports.cleanimg = cleanimg
exports.deploy   = deploy
exports.default  = series(scripts, images, styles, parallel(browsersync, startwatch))
