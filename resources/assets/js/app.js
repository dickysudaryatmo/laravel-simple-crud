/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));

// const app = new Vue({
//     el: '#app'
// });

/**
 * Init Section
 */
$(document).ready(function () {
    console.log('js masuk')
    if ($('#tableKendaraan').length) {
        console.log('masuk penawaran')
    }
    grafik.init();
    ajax.init();
    table.init();
    form.init();
    ui.slide.init();
    validation.addMethods();
    // if ($('#main-wrapper').length) {
    //     other.checkSession.init();
    // }
    // $(document).ajaxError(function (event, jqxhr, settings, exception) {
    //     console.log('exception = ' + exception)
    // });

    // moveOnMax = function (field, nextFieldID) {
    //     if (field.value.length == 1) {
    //         document.getElementById(nextFieldID).focus();
    //     }
    // }

    // if ($('.select2').length) {
    //     $(".select2").select2({
    //         theme: 'bootstrap',
    //         width: '100%'
    //     });
    // }
    if ($('#notif').length) {
        const status = $('#notif').data('status')
        const message = $('#notif').data('message')
        const url = $('#notif').data('url')

        ui.popup.show(status, message, url)
    }
    function readFileImageProduk(input) {
        console.log(input.files, input.files[0])
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                var imgPreview = '<img width="144" src="' + e.target.result + '" />';
                var labelPreview = $(input).parent().find('.label-preview')
                var imgPreviewZone = $(input).parent().parent().find('#imgProdukPreview');

                imgPreviewZone.empty();
                labelPreview.text(input.files[0].name)
                imgPreviewZone.append(imgPreview);
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageProduk").change(function(){
        readFileImageProduk(this);
    });

	$("#addMore").click(function(e) {
		console.log('tes')
		e.preventDefault();
		$("#varian").append("<div class='row'><div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Stock</label><input type='text' class='form-control' name='stokProduk[]' id='stokProduk'></div></div>"+"<div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Ukuran</label><br><input type='text' class='form-control' name='ukuran[]' id='ukuran'></div></div>"+"<div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Warna</label><br><input type='text' class='form-control' name='warna[]' id='warna'></div></div></div><br>");
	});
})
