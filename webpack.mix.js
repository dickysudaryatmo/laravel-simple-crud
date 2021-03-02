const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.babel([
   		'resources/assets/js/app.js',
	    'resources/assets/js/map.js',
	    'resources/assets/js/other.js',
	    'resources/assets/js/ajax.js',
	    'resources/assets/js/form.js',
	    'resources/assets/js/table.js',
	    'resources/assets/js/ui.js',
	    'resources/assets/js/validation.js',
	    'resources/assets/js/grafik.js',
	    'resources/assets/js/custom.js',
	], 'public/js/all.js')
//    .sass('resources/assets/sass/app.scss', 'public/css')
   .styles([
	    'resources/assets/css/style.css',
	], 'public/css/all.css')
