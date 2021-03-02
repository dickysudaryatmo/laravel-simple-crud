function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  console.log('js masuk');

  if ($('#tableKendaraan').length) {
    console.log('masuk penawaran');
  }

  grafik.init();

  _ajax.init();

  table.init();
  form.init();
  ui.slide.init();
  validation.addMethods(); // if ($('#main-wrapper').length) {
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
    var status = $('#notif').data('status');
    var message = $('#notif').data('message');
    var url = $('#notif').data('url');
    ui.popup.show(status, message, url);
  }

  function readFileImageProduk(input) {
    console.log(input.files, input.files[0]);

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var imgPreview = '<img width="144" src="' + e.target.result + '" />';
        var labelPreview = $(input).parent().find('.label-preview');
        var imgPreviewZone = $(input).parent().parent().find('#imgProdukPreview');
        imgPreviewZone.empty();
        labelPreview.text(input.files[0].name);
        imgPreviewZone.append(imgPreview);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageProduk").change(function () {
    readFileImageProduk(this);
  });
  $("#addMore").click(function (e) {
    console.log('tes');
    e.preventDefault();
    $("#varian").append("<div class='row'><div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Stock</label><input type='text' class='form-control' name='stokProduk[]' id='stokProduk'></div></div>" + "<div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Ukuran</label><br><input type='text' class='form-control' name='ukuran[]' id='ukuran'></div></div>" + "<div class='col-lg-4'><div class='form-group'><label for='stokProduk'>Warna</label><br><input type='text' class='form-control' name='warna[]' id='warna'></div></div></div><br>");
  });
});

if ($('#enterAlamat').length) {
  var initAutocomplete = function initAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
      types: ['geocode']
    });
    autocomplete.addListener('place_changed', fillInAddress);
    var geolocation = {
      lat: -6.227688623331213,
      lng: 106.83252453804016
    };
    var valueLat = $("#latitude").val();
    var valueLong = $("#longitude").val();

    if (valueLat != '') {
      geolocation = {
        lat: parseFloat(valueLat),
        lng: parseFloat(valueLong)
      };
    }

    var radius = 10000;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (valueLat != '') {
          geolocation = {
            lat: parseFloat(valueLat),
            lng: parseFloat(valueLong)
          };
        } else {
          geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        }

        radius = position.coords.accuracy;
      });
    }

    console.log(geolocation);
    var circle = new google.maps.Circle({
      center: geolocation,
      radius: radius
    });
    autocomplete.setBounds(circle.getBounds());
    var geocoder = new google.maps.Geocoder();
    document.getElementById('enterAlamat').addEventListener('click', function () {
      geocodeAddress(geocoder, map);
    });
    var marker;

    function taruhMarker(map, latLng) {
      if (marker) {
        // pindahkan marker
        marker.setPosition(latLng);
      } else {
        // buat marker baru
        marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      }
    }

    var map = new google.maps.Map(document.getElementById('lokasiMap'), {
      zoom: 18,
      center: geolocation
    });
    google.maps.event.addListener(map, 'click', function (event) {
      taruhMarker(this, event.latLng);
      $("#longitude").val(event.latLng.lat());
      $("#latitude").val(event.latLng.lng());
      $("#labelLongitude").addClass('focused');
      $("#labelLatitude").addClass('focused');
    });
  }; //menampilkan pencarian otomatis


  var fillInAddress = function fillInAddress() {
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];

      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }; //menentukan latitude dan longitude


  var geocodeAddress = function geocodeAddress(geocoder, resultsMap) {
    var lokasi = $("input[name=lokasi]").val();
    geocoder.geocode({
      'address': lokasi
    }, function (results, status) {
      if (status === 'OK') {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        Swal.fire({
          title: 'Geocode was not successful for the following reason: ' + status,
          type: 'error',
          confirmButtonText: 'OK'
        });
      }

      $("#longitude").val(longitude);
      $("#labelLongitude").addClass('focused');
      $("#latitude").val(latitude);
      $("#labelLatitude").addClass('focused');
    });
  };

  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
}

var baseUrl = $('meta[name=base]').attr('content') + '/';
var baseImage = $('meta[name=baseImage]').attr('content') + '/';
var cdn = $('meta[name=cdn]').attr('content');
var other = {
  encrypt: function encrypt(formdata, callback) {
    $.ajax({
      url: baseUrl + 's',
      type: 'post',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function success(data) {
        var pass = data;

        if (pass.status !== "error" && pass.status !== "reload") {
          var password = pass.password;
          var salt = CryptoJS.lib.WordArray.random(128 / 8);
          var key256Bits500Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, {
            keySize: 256 / 32,
            iterations: 500
          });
          var iv = CryptoJS.enc.Hex.parse(password[2]);

          if (formdata.indexOf("&captcha=")) {
            var form = formdata.split("&captcha=");
            var captcha = form[1];
            formdata = form[0];
          }

          var encrypted = CryptoJS.AES.encrypt(formdata + '&safer=', key256Bits500Iterations, {
            iv: iv
          });
          var data_base64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
          var iv_base64 = encrypted.iv.toString(CryptoJS.enc.Base64);
          var key_base64 = encrypted.key.toString(CryptoJS.enc.Base64);
          var encData = data_base64 + password[0] + iv_base64 + password[1] + key_base64 + password[2];
          var data = {
            data: encData
          };

          if (captcha != 'undefined') {
            data["captcha"] = captcha;
          }

          callback(null, data);
        } else {
          swal({
            title: pass.messages.title,
            text: pass.messages.message,
            type: "error",
            html: true,
            showCancelButton: true,
            confirmButtonColor: "green",
            confirmButtonText: "Refresh"
          }, function () {
            location.reload();
          });
        }
      }
    });
  },
  notification: {
    init: function init() {
      if ($('#buttonNotif').length) {
        $.ajax({
          url: baseUrl + "notif/check",
          type: "POST",
          cache: false,
          beforeSend: function beforeSend(jxqhr) {},
          success: function success(result) {
            var resultCount = 0;
            var i;

            for (i in result) {
              if (result.hasOwnProperty(i)) {
                resultCount++;
              }
            }

            if (resultCount > 0) {
              var link = '';
              var div_element = $('.drop-content-notif');
              div_element.empty();
              $.each(result.notif, function (index, data) {
                var li_element = null;

                if (data.status_notif == '1') {
                  li_element = $('<li>');
                } else {
                  li_element = $('<li>').addClass("unread");
                }

                li_element.append('<a href="' + baseUrl + 'notif/get/' + data.id_notif + '" class="aNotif">' + '<b class="font-notif">' + data.message_notif + '</b> </br>' + '<span class="font-notif">' + data.created_at + '</span>' + '</a>');
                div_element.append(li_element);
              });
            } else {
              li_element.append('<li class="dropdown-item-notif">' + '<span>Belum ada notifikasi</span>' + '</li>');
              div_element.append(li_element);
            }

            if (result.countNotif > 0) {
              $("#total-notif").show();
              $("#totalNotif").html(result.countNotif);
            } else {
              $("#total-notif").hide();
            }
          }
        });
      }
    }
  },
  checkSession: {
    stat: false,
    init: function init() {
      var time = 905;

      function timerCheck() {
        if (time == 0) {
          other.checkSession.action();
        } else {
          time--;
        }
      }

      function reset() {
        time = 905;
      }

      $(document).on('mousemove keypress', function () {
        reset();
      });
      setInterval(function () {
        timerCheck();
      }, 1000);
    },
    action: function action() {
      if (!other.checkSession.stat) {
        other.checkSession.stat = true;
        $.ajax({
          url: baseUrl + 'checkSession',
          global: false,
          type: 'get',
          beforeSend: function beforeSend(jxqhr) {},
          success: function success(data) {
            if (data == '1') {
              other.checkSession.idler = 0;
              other.checkSession.stat = false;
            } else {
              ui.popup.show('warning', 'Anda sudah tidak aktif dalam waktu 15 menit', '/logout');
            }
          }
        });
      }
    }
  }
};

function reload() {
  location.reload();
}

var _ajax = {
  init: function init() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function beforeSend(jxqhr) {
        ui.popup.showLoader();
      },
      timeout: 30000,
      error: function error(event, jxqhr, status, _error) {
        ui.popup.show('error', 'Sedang Gangguan Jaringan', 'Error');
        ui.popup.hideLoader();
      },
      complete: function complete() {},
      global: true
    });
  },
  getData: function getData(url, method, params, callback) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    if (params == null) {
      params = {};
    }

    $.ajax({
      type: method,
      url: baseUrl + url,
      data: params,
      success: function success(result) {
        ui.popup.hideLoader();

        if (result.status == 'success') {
          ui.popup.hideLoader();

          if (result.callback == 'redirect') {
            ui.popup.show(result.status, result.message, result.url);
          }
        }

        if (result.status == 'error') {
          ui.popup.show('error', result.messages.message, result.messages.title);
        } else if (result.status == 'reload') {
          ui.popup.alert(result.messages.title, result.messages.message, 'refresh');
        } else if (result.status == 'logout') {
          ui.popup.alert(result.messages.title, result.messages.message, 'logout');
        } else if (result == 401) {
          ui.popup.show('warning', 'Sesi Anda telah habis, harap login kembali', 'Session Expired');

          if ($('.toast-warning').length == 2) {
            $('.toast-warning')[1].remove();
          }

          setInterval(function () {
            window.location = '/logout';
          }, 3000);
        } else {
          if (result instanceof Array || result instanceof Object) {
            callback(result);
          } else {
            callback(JSON.parse(result));
          }
        }
      }
    });
  },
  submitData: function submitData(url, data, form_id) {
    other.encrypt(data, function (err, encData) {
      if (err) {
        callback(err);
      } else {
        $.ajax({
          url: url,
          type: 'post',
          data: encData,
          error: function error(jxqhr, status, _error2) {
            ui.popup.hideLoader();
            ui.popup.show('error', _error2, 'Error');
          },
          success: function success(result, status) {
            if (result == null) {
              ui.popup.show(result.status, 'Error');
              ui.popup.hideLoader();
            } else if (result == 401) {
              ui.popup.show('warning', 'Sesi anda habis, mohon login kembali', 'Session Expired');
              ui.popup.hideLoader();
              setInterval(function () {
                window.location = '/logout';
              }, 3000);
            } else {
              if (result.status == 'success') {
                $('.modal').modal('hide');
                ui.popup.hideLoader();

                if (result.callback == 'redirect') {
                  console.log(result.url);
                  ui.popup.show(result.status, result.message, result.url);
                } else if (result.callback == 'download') {
                  $('.modal').modal('hide');
                  $('#otorisasiBackup').val('');
                  location.reload();
                } else if (result.callback == 'login') {
                  // ui.toast.show();
                  setInterval(function () {
                    window.location = result.url;
                  }, 2000);
                } else if (result.callback == 'editProfil') {
                  ui.popup.show(result.status, result.message);
                  setInterval(function () {
                    location.reload();
                  }, 2000);
                } else if (result.callback == 'forget-password') {
                  $("#modalForgetPassword").modal('hide');
                  $("#modalSuccessForgetPassword").modal('show');
                } else if (result.callback == 'change-password') {
                  $("#newPassChange").val(result.data.newPass);
                  $("#emailChange").val(result.data.email);
                  $("#modalOtpChange").modal('show');
                } else if (result.callback == 'change-telfon') {
                  $("#modalEditHp").modal('hide');
                  ui.popup.show(result.status, result.message);
                } else if (result.callback == 'success-create-password') {
                  // ui.popup.show(result.status, result.message);
                  setInterval(function () {
                    window.location = result.url;
                  }, 2000);
                }
              } else if (result.status == 'info') {
                ui.popup.hideLoader();

                if (result.callback == "inqSales") {
                  $('#inqTotalBeli').empty();
                  $('#detailSales').removeClass('hidden');
                  ui.popup.show(result.status, result.message);
                  var total = '';
                  var angkarevTotal = result.data.toString().split('').reverse().join('');

                  for (var i = 0; i < angkarevTotal.length; i++) {
                    if (i % 3 == 0) total += angkarevTotal.substr(i, 3) + '.';
                  }

                  $('#inqTotalBeli').html(total.split('', total.length - 1).reverse().join(''));
                  $('#metodePembayaran').change(function () {
                    var valueMetode = $('#metodePembayaran').val();

                    if (valueMetode == '2') {
                      $('#labelBuktTransfer').removeClass('hidden');
                      $('#imageBukti').prop("disabled", false);
                    } else {
                      $('#labelBuktTransfer').addClass('hidden');
                      $('#gambarBukti').addClass('hidden');
                      $('#imageBukti').prop("disabled", true);
                    }
                  });
                }
              } else if (result.status == 'warning') {
                ui.popup.hideLoader();

                if (result.callback == 'redirect') {
                  ui.popup.show(result.status, result.message, result.url);
                }
              } else {
                if (result.messages == '<p>Error: Validation</p>') {
                  ui.popup.hideLoader();
                  $("#" + form_id).validate().showErrors(result.errors);
                  ui.popup.show(result.status, "Harap cek isian");
                } else if (result.callback == 'errorInq') {
                  ui.popup.show(result.status, result.message);
                  ui.popup.hideLoader();
                  $('#divInq').addClass('hidden');
                } else {
                  ui.popup.show(result.status, result.message);
                  ui.popup.hideLoader();
                }
              }
            }
          }
        });
      }
    });
  },
  submitImage: function submitImage(url, form_id, path, to_id) {}
};
var form = {
  init: function init() {
    $('form').attr('autocomplete', 'off');
    $.validator.addMethod("lettersonly", function (value, element) {
      return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");
    $.validator.addMethod("regexp", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "");
    $.each($('form'), function (key, val) {
      $(this).validate(formrules[$(this).attr('id')]);
    });
    $('form').submit(function (e) {
      e.preventDefault(); // console.log('masuk sini')

      var form_id = $(this).attr('id'); // console.log(form_id)

      form.validate(form_id);
    });
  },
  validate: function validate(form_id) {
    var formVal = $('#' + form_id); // console.log(formVal, form_id)

    var message = formVal.attr('message');
    var agreement = formVal.attr('agreement');
    var defaultOptions = {
      errorPlacement: function errorPlacement(error, element) {
        if (element.parent().hasClass('input-group')) {
          error.appendTo(element.parent().parent());
        } else {
          var help = element.parents('.form-group').find('.help-block');

          if (help.length) {
            error.appendTo(help);
          } else {
            error.appendTo(element.parents('.form-group'));
          }
        }
      },
      highlight: function highlight(element, errorClass, validClass) {
        alert('test');
        $(element).parents('.form-group').addClass('has-error');
      },
      unhighlight: function unhighlight(element, errorClass, validClass) {
        $(element).parents('.form-group').removeClass('has-error');
      }
    };
    var ops = Object.assign(defaultOptions, formrules[form_id]);
    var myform = formVal.validate(ops);
    $('button[type=reset]').click(function () {
      myform.resetForm();
    });

    if (formVal.valid()) {
      // console.log(form_id)
      if (message != null && message != '') {
        if (message.indexOf('|') > -1) {
          var m_data = message.split('|');
          var m_text = m_data[0];
          var m_val = m_data[1];
          var t_data = m_val.split(';');
          var table = '<table class="table">';
          $.each(t_data, function (key, val) {
            var c1 = val.split(':')[0];
            var c2 = form.find('input[name=' + val.split(':')[1] + '],select[name=' + val.split(':')[1] + ']').val();
            table += '<tr><td>' + c1 + '</td><td>' + c2 + '</td></tr>';
          });
          table += '</table>';
          message = m_text + table;
        }

        ui.popup.confirm('Konfirmasi', message, 'form.submit("' + form_id + '")');
      } else if (agreement != null && agreement != '') {
        message = $("#" + agreement).html();
        ui.popup.agreement('Persetujuan Agen Baru', message, 'form.submit("' + form_id + '")');
      } else {
        if (form_id == 'formEditAyat') {
          if ($('#btnConfirmEditAyat').hasClass("open")) {
            $('#modalConfirmEditAyat').modal('show');
            $("#submitEditAyat").click(function (e) {
              e.preventDefault();
              form.submit(form_id);
            });
          } else {
            form.submit(form_id);
          }
        } else {
          form.submit(form_id);
        }
      }
    } else {
      ui.popup.show('error', 'Harap cek isian', 'Form Tidak Valid');
    }
  },
  submit: function submit(form_id) {
    var form = $('#' + form_id);
    var url = form.attr('action');
    var ops = formrules[form_id];

    if (ops == null) {
      ops = {};
    }

    var i = 1;
    var input = $('.form-control');
    var data = form.serialize();
    var isajax = form.attr('ajax');
    var isFilter = form.attr('filter');

    if (isajax == 'true') {
      if (form_id == 'payform') {
        form_id = $('#' + form_id).attr('for');
      }

      _ajax.submitData(url, data, form_id);
    } else if (isFilter == 'true') {
      table.filter(form_id, data);
    } else {
      other.encrypt(data, function (err, encData) {
        if (err) {
          callback(err);
        } else {
          var encryptedElement = $('<input type="hidden" name="data" />');
          $(encryptedElement).val(encData['data']);
          form.find('select,input:not("input[type=file],input[type=hidden][name=_token],input[name=captcha]")').attr('disabled', 'true').end().append(encryptedElement).unbind('submit').submit();
        }
      });
    }
  }
};

if ($('.select-provinsi').length) {
  $('.select-provinsi').empty();
  $('.select-provinsi').append('<label>Provinsi</label>' + '<select name="provinsi" id="provinsi" class="form-control upgrade-input">' + '<option></option>' + '</select>');
  $('.select-kota').empty();
  $('.select-kota').append('<label>Kota/Kabupaten</label>' + '<select name="kota" id="kota" class="form-control upgrade-input">' + '<option></option>' + '</select>');

  _ajax.getData('get-provinsi', 'get', null, function (data) {
    // console.log(data)
    var dataProvinsi = [];

    for (var i = 0; i < data.length; i++) {
      var option = '<option value="' + data[i].province_id + '_' + data[i].province + '">' + data[i].province + '</option>';
      dataProvinsi.push(option);
    }

    $("#provinsi").append(dataProvinsi);
    $("#provinsi").select2({
      placeholder: 'Pilih Provinsi'
    });
    $("#kota").select2({
      placeholder: 'Pilih Kota'
    });
    $('#provinsi').change(function () {
      var getProvince = $('#provinsi').val();
      var province = getProvince.split("_");
      $("#mdl_msg").css('display', 'block');
      $('#kurir').empty();

      _ajax.getData('get-kota', 'get', {
        province_id: province[0],
        province: province[1]
      }, function (data) {
        var dataKota = [];
        $('.select-kota').empty();
        $('.select-kota').append('<label>Kota/Kabupaten</label>' + '<select name="kota" id="kota" class="form-control upgrade-input">' + '<option></option>' + '</select>');
        $("#kota").select2({
          placeholder: 'Pilih Kota'
        });

        for (var i = 0; i < data.length; i++) {
          var option = '<option value="' + data[i].city_id + '">' + data[i].type + ' ' + data[i].city_name + '</option>';
          dataKota.push(option);
        }

        $("#kota").append(dataKota).val("").trigger("change");
        $('#kota').change(function () {
          $(".shp__checkout__loader").css('display', 'flex');
          $("#mdl_msg").css('display', 'none');
          var getCityId = $('#kota').val();

          _ajax.getData('get-ongkir', 'post', {
            city_id: getCityId
          }, function (data) {
            var count = 1;
            $.each(data['jne'], function (key, val) {
              $.each(val['costs'], function (key1, val1) {
                $('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/jne-' + count + '/" value="' + val1['cost'][0]['value'] + '"  service="' + val['code'] + " " + val1['service'] + '" ><img src="/shop/logo/jne.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">' + val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">' + val1['cost'][0]['etd'] + ' Hari</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/jne-' + count + '/)">Pilih</button></div>');
                count++;
              });
            });
            $.each(data['tiki'], function (key, val) {
              $.each(val['costs'], function (key1, val1) {
                $('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/tiki-' + count + '/" value="' + val1['cost'][0]['value'] + '" service="' + val['code'] + " " + val1['service'] + '"><img src="/shop/logo/tiki.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">' + val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">' + val1['cost'][0]['etd'] + ' Hari</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/tiki-' + count + '/)">Pilih</button></div>');
                count++;
              });
            });
            $.each(data['pos'], function (key, val) {
              $.each(val['costs'], function (key1, val1) {
                $('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/pos-' + count + '/" value="' + val1['cost'][0]['value'] + '"  service="' + val['code'] + " " + val1['service'] + '"><img src="/shop/logo/pos.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">' + val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">' + val1['cost'][0]['etd'] + '</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/pos-' + count + '/)">Pilih</button></div>');
                count++;
              });
            });
            $(".shp__checkout__loader").css('display', 'none');
          });
        });
      });
    });
  });
}

function format(data) {
  var rupiah = '';
  var angkarev = data.toString().split('').reverse().join('');

  for (var i = 0; i < angkarev.length; i++) {
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  }

  return rupiah.split('', rupiah.length - 1).reverse().join('');
}

function selectShipping(id) {
  // console.log(id)
  $('#selected-shipping').empty();
  var fee = document.getElementById(id).value;
  var total = document.getElementById('total').value;
  var service = document.getElementById(id).getAttribute('service');
  $('#selected-shipping').append('<div class="row"><div class="col-12"><p>Opsi Pengiriman</p></div></div><div class="row"><div class="col-6">' + service + '</div><div class="col-6">Rp.' + format(fee) + '</div></div>');
  var total_checkout = parseFloat(total) + parseFloat(fee); // console.log(total_checkout)
  // console.log(format(total_checkout))
  // console.log(format(total))

  $('#fee-shipping').html('Rp' + format(fee));
  $('#total-all').html('Rp' + format(total_checkout));
  $('#shippingFee').val(fee);
  $('#shipping').val(service);
  document.getElementById("btn-bayar").disabled = false;
  $('#exampleModal').modal('hide');
}

$('#submitReject').on('click', function (e) {
  // console.log('tes')
  // console.log('submit modal')
  var form = $('#formRejectPenjualan');
  var url = form.attr('action');
  var form_id = form.attr('id');
  var data = form.serialize(); // console.log(url + ' ' + data + '' + form)

  _ajax.submitData(url, data, form_id);

  $('#detailPenjualan').modal('hide');
});
$('#submitApprove').on('click', function (e) {
  // console.log('submit modal')
  var form = $('#formApprovePenjualan');
  var url = form.attr('action');
  var form_id = form.attr('id');
  var data = form.serialize(); // console.log(url, data, form_id)
  // console.log(url + ' ' + data + '' + form)

  _ajax.submitData(url, data, form_id);

  $('#detailPenjualan').modal('hide');
});
$("input[type=radio][name=pembatalan]").change(function () {
  // console.log($(this).val())
  if ($(this).val() == 'lainnya') {
    $("#inputLainnya").css("display", "block");
  } else {
    $("#inputLainnya").css("display", "none");
    $('#lainnya').val('');
  }
});
$('.add-to-cart').on('click', function (e) {
  // console.log($('input[name="id_produk"]').val())
  // console.log($(this).parent().find('input[name="id_produk"]').val())
  var id = $(this).parent().find('input[name="id_produk"]').val();
  var form = '#addToChart' + '_' + id;
  var form = $(form);
  var url = form.attr('action');
  var form_id = form.attr('id');
  var data = form.serialize(); // console.log(url, data, form_id)
  // console.log(url + ' ' + data + '' + form)

  _ajax.submitData(url, data, form_id); // $('#detailPenjualan').modal('hide');

});
$('.add-wishlist').on('click', function (e) {
  var id = $(this).parent().find('input[name="id_produk"]').val();
  var form = '#addToWishlist' + '_' + id;
  var form = $(form);
  var url = form.attr('action');
  var form_id = form.attr('id');
  var data = form.serialize();

  _ajax.submitData(url, data, form_id);
}); // $('.timbel-ganti').click(function() {
// 	console.log($(this).val() + ' ' + (this.checked ? 'checked' : 'unchecked'));
// });
// console.log('masuk tye')

if ($('#tableBuatPenawaran').length) {
  _ajax.getData('/kilometer/get-data-penawaran', 'post', {}, function (data) {
    $.each(data, function (key, value) {
      $('#checklist_periksa_' + key).click(function () {
        if (this.checked) {
          $('#checklist_periksa_' + key).val("1"); // console.log($('#checklist_periksa_'+key).val())

          document.getElementById('checklist_periksa_' + key + '_hidden').disabled = true;
        } else {
          $('#checklist_periksa_' + key).val("0"); // console.log($('#checklist_periksa_'+key).val())

          document.getElementById('checklist_periksa_' + key + '_hidden').disabled = false;
        }
      });
      $('#checklist_ganti_' + key).click(function () {
        if (this.checked) {
          $('#checklist_ganti_' + key).val("1"); // console.log($('#checklist_ganti_'+key).val())

          document.getElementById('checklist_ganti_' + key + '_hidden').disabled = true;
        } else {
          $('#checklist_ganti_' + key).val("0"); // console.log($('#checklist_ganti_'+key).val())

          document.getElementById('checklist_ganti_' + key + '_hidden').disabled = false;
        }
      });
    });
  });
}

if ($('#tableBuatSpk').length) {
  var penawaran_id = $('#penawaran_id').val();
  var penawaran_id = encodeURIComponent(window.btoa(penawaran_id));
  var jumlah = [];

  _ajax.getData('/kilometer/get-data-detail-penawaran/' + penawaran_id, 'post', {}, function (data) {
    console.log(data);
    $.each(data, function (key, value) {
      // console.log(value.)
      $('#status_acc_' + key).click(function () {
        if (this.checked) {
          $('#status_acc_' + key).val("1"); // console.log($('#status_acc_'+key).val())

          document.getElementById('status_acc_' + key + '_hidden').disabled = true;
        } else {
          $('#status_acc_' + key).val("0"); // console.log($('#status_acc_'+key).val())

          document.getElementById('status_acc_' + key + '_hidden').disabled = false;
        }
      });

      if (value.acc == 1) {
        jumlah.push = (value.ganti_biaya, value.periksa_biaya); // jumlah.push = (value.periksa_biaya)
      }
    });
    console.log(jumlah);
    var total = jumlah.reduce(myFunc);

    function myFunc(total, num) {
      return total + num;
    }

    $('totalPenawaran').val(total);
  });
}

if ($('#tableEditSpk').length) {
  var spk_id = $('#spk_id').val();
  var spk_id = encodeURIComponent(window.btoa(spk_id));
  var jumlah = []; // ajax.getData('/spk/get-data-detail-spk/'+spk_id, 'post', {
  // }, function (data) {
  // 	var jumlah = data.length;
  // });
}

$('#btnInquryKendaraan').on('click', function () {
  $('#pilihanMobil').hide();
  $('#listPilihanMobil').empty();
  var merk = $('#merkKendaraan').val(); // console.log(merk);

  if (!!merk) {
    var data = {
      value: merk
    };

    _ajax.getData('pelanggan/get-master-kendaraan', 'post', data, function (data) {
      // console.log(data)
      if (data.length > 0) {
        $('#pilihanMobil').show();
        var dataRadio = [];
        var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
        var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
        var transmisi = ['nol', 'Manual', 'Automatic'];

        for (var i = 0; i < data.length; i++) {
          var option = '<tr>' + '<th scope="row"><div class="form-check"><input class="form-check-input" type="radio" name="kendaraanMaster" id="kendaraanMaster" value="' + data[i]['id'] + '"></div></th>' + '<td>' + data[i]['merk_mobil'] + '</td>' + '<td>' + data[i]['tipe_mobil'] + '</td>' + '<td>' + data[i]['jenis_mobil'] + '</td>' + '<td>' + data[i]['silinder'] + ' silinder</td>' + '<td>' + transmisi[data[i]['jenis_transmisi']] + '</td>' + '<td>' + spooring[data[i]['kelas_spooring']] + '</td>' + '<td>' + tuneup[data[i]['kelas_tuneup']] + '</td>' + '</tr>';
          dataRadio.push(option);
        }

        var table = '<div style="overflow:auto">' + '<table class="table table-bordered" style="white-space:nowrap">' + '<thead>' + '<tr>' + '<th scope="col">#</th>' + '<th scope="col">Merk</th>' + '<th scope="col">Tipe</th>' + '<th scope="col">Jenis</th>' + '<th scope="col">Silinder</th>' + '<th scope="col">Transmisi</th>' + '<th scope="col">Spooring</th>' + '<th scope="col">Tune up</th>' + '</tr>' + '</thead>' + '<tbody>' + dataRadio.join("") + '</tbody>' + '</table>' + '</div>'; // console.log(table)

        $("#listPilihanMobil").append(table);
      }
    });
  } else {
    $('#pilihanMobil').hide();
    $('#listPilihanMobil').empty();
  }
});
$('#btnInquryKendaraanEdit').on('click', function () {
  $('#pilihanMobilEdit').hide();
  $('#listPilihanMobilEdit').empty();
  var merk = $('#merkKendaraanEdit').val(); // console.log(merk);

  if (!!merk) {
    var data = {
      value: merk
    };

    _ajax.getData('pelanggan/get-master-kendaraan', 'post', data, function (data) {
      // console.log(data)
      if (data.length > 0) {
        $('#pilihanMobilEdit').show();
        var dataRadio = [];
        var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
        var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
        var transmisi = ['nol', 'Manual', 'Automatic'];

        for (var i = 0; i < data.length; i++) {
          var option = '<tr>' + '<th scope="row"><div class="form-check"><input class="form-check-input" type="radio" name="kendaraanMaster" id="kendaraanMaster" value="' + data[i]['id'] + '"></div></th>' + '<td>' + data[i]['merk_mobil'] + '</td>' + '<td>' + data[i]['tipe_mobil'] + '</td>' + '<td>' + data[i]['jenis_mobil'] + '</td>' + '<td>' + data[i]['silinder'] + ' silinder</td>' + '<td>' + transmisi[data[i]['jenis_transmisi']] + '</td>' + '<td>' + spooring[data[i]['kelas_spooring']] + '</td>' + '<td>' + tuneup[data[i]['kelas_tuneup']] + '</td>' + '</tr>';
          dataRadio.push(option);
        }

        var table = '<div style="overflow:auto">' + '<table class="table table-bordered" style="white-space:nowrap">' + '<thead>' + '<tr>' + '<th scope="col">#</th>' + '<th scope="col">Merk</th>' + '<th scope="col">Tipe</th>' + '<th scope="col">Jenis</th>' + '<th scope="col">Silinder</th>' + '<th scope="col">Transmisi</th>' + '<th scope="col">Spooring</th>' + '<th scope="col">Tune up</th>' + '</tr>' + '</thead>' + '<tbody>' + dataRadio.join("") + '</tbody>' + '</table>' + '</div>'; // console.log(table)

        $("#listPilihanMobilEdit").append(table);
      }
    });
  } else {
    $('#pilihanMobilEdit').hide();
    $('#listPilihanMobilEdit').empty();
  }
});
$('#timepicker').datetimepicker({
  format: 'YYYY-MM-DD HH:mm:ss',
  useCurrent: false,
  showTodayButton: true,
  showClear: true,
  toolbarPlacement: 'bottom',
  sideBySide: true,
  icons: {
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    up: "fa fa-arrow-up",
    down: "fa fa-arrow-down",
    previous: "fa fa-chevron-left",
    next: "fa fa-chevron-right",
    today: "fa fa-clock-o",
    clear: "fa fa-trash-o"
  }
});
$('#20_cekGanti').change(function () {
  if (this.checked) {
    $('.tuneUpBG').css("background-color", "yellow");

    _ajax.getData('service/get-tuneup', 'get', null, function (data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        if (data[i]['periksa_check'] == 1) {
          $('#' + data[i]['item_service_id'] + '_cekPeriksa').prop('checked', true);
          $('.' + data[i]['item_service_id'] + '_cekPeriksaBG').css("background-color", "yellow");
        } else if (data[i]['ganti_check'] == 1) {
          $('#' + data[i]['item_service_id'] + '_cekGanti').prop('checked', true);
          $('.' + data[i]['item_service_id'] + '_cekGantiBG').css("background-color", "yellow");
        }
      }
    });
  } else {
    $('.tuneUpBG').css("background-color", "white");

    _ajax.getData('service/get-tuneup', 'get', null, function (data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        if (data[i]['periksa_check'] == 1) {
          $('#' + data[i]['item_service_id'] + '_cekPeriksa').prop('checked', false);
          $('.' + data[i]['item_service_id'] + '_cekPeriksaBG').css("background-color", "#ffc75e");
        } else if (data[i]['ganti_check'] == 1) {
          $('#' + data[i]['item_service_id'] + '_cekGanti').prop('checked', false);
          $('.' + data[i]['item_service_id'] + '_cekGantiBG').css("background-color", "#fa7070");
        }
      }
    });
  }
});
var table = {
  init: function init() {
    var imageDetail = '../image/icon/main/eye-solid.png';
    var imageEdit = '../image/icon/main/pen-square-solid.png';
    var imageDeactive = '../image/icon/main/deactive.png';
    var imageActive = '../image/icon/main/activae.png';
    var ops = {};

    if ($('#tableProduk').length) {
      // console.log('produk')
      var column = [{
        'data': null
      }, {
        'data': 'brand_id'
      }, {
        'data': 'name'
      }, {
        'data': 'price'
      }, {
        'data': 'description'
      }, {
        'data': null
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        "render": function render(data, type, full, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 5,
        "data": "id",
        "render": function render(data, type, full, meta) {
          // console.log(full.id)
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="/edit-produk/' + id + '">' + '<div class="glyphicon glyphicon-pencil">' + '<i class="fas fa-pen-square"></i>' + '</div>' + '</a>' + '</div>' + '<div class="action-table">' + '<a href="/delete-produk/' + id + '">' + '<i class="fa fa-trash"></i>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableProduk', column, 'produk', null, columnDefs);
    }

    if ($('#tableManajemenKilometer').length) {
      $('#filterStatusKm').on('change', function () {
        // table.draw();
        var data = $("#filterStatusKm option:selected").val();
        $('#dataFilterStatus').val(data);
        var custParam = data; // console.log(data)

        var column = [{
          'data': 'tanggal_kilometer'
        }, {
          'data': 'nama_cust'
        }, {
          'data': 'tipe_mobil'
        }, {
          'data': 'km_sebelum'
        }, {
          'data': 'km_terbaru'
        }, {
          'data': 'status_penawaran'
        }];
        columnDefs = [{
          "targets": 5,
          "data": "status_penawaran",
          "render": function render(data, type, full, meta) {
            var data = '';

            if (full.status_penawaran == 0) {
              data = '<span class="badge badge-primary">Kirim Penawaran</span>';
            } else if (full.status_penawaran == 1) {
              data = '<span class="badge badge-info">Menunggu Persetujuan</span>';
            } else if (full.status_penawaran == 2) {
              data = '<span class="badge badge-warning">Disetujui belum SPK</span>';
            } else if (full.status_penawaran == 3) {
              data = '<span class="badge badge-success">Disetujui sudah SPK</span>';
            }

            return data;
          }
        }, {
          "targets": 6,
          "data": "id",
          "orderable": false,
          "render": function render(data, type, full, meta) {
            console.log(full);
            var id = encodeURIComponent(window.btoa(full.kilometer_id));
            var data = '<div class="action-table">' + '<a href="/kilometer/detail-manajemen-km/' + id + '" title="Lihat" class="detailKilometer">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
            return data;
          }
        }];
        table.serverSide('tableManajemenKilometer', column, 'kilometer/get-kilometer', custParam, columnDefs);
        var tbody = $('#tableManajemenKilometer').find('tbody');
        tbody.html('');
      });
      var column = [{
        'data': 'tanggal_kilometer'
      }, {
        'data': 'nama_cust'
      }, {
        'data': 'tipe_mobil'
      }, {
        'data': 'km_sebelum'
      }, {
        'data': 'km_terbaru'
      }, {
        'data': 'status_penawaran'
      }];
      columnDefs = [{
        "targets": 5,
        "data": "status_penawaran",
        "render": function render(data, type, full, meta) {
          var data = '';

          if (full.status_penawaran == 0) {
            data = '<span class="badge badge-primary">Kirim Penawaran</span>';
          } else if (full.status_penawaran == 1) {
            data = '<span class="badge badge-info">Menunggu Persetujuan</span>';
          } else if (full.status_penawaran == 2) {
            data = '<span class="badge badge-warning">Disetujui belum SPK</span>';
          } else if (full.status_penawaran == 3) {
            data = '<span class="badge badge-success">Disetujui sudah SPK</span>';
          }

          return data;
        }
      }, {
        "targets": 6,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.kilometer_id));
          var data = '<div class="action-table">' + '<a href="/kilometer/detail-manajemen-km/' + id + '" title="Lihat" class="detailKilometer">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenKilometer', column, 'kilometer/get-kilometer', null, columnDefs);
    }

    if ($('#tableKendaraan').length) {
      var custParam = $('#kendaraanPelangganId').val();
      var column = [{
        'data': null
      }, {
        'data': 'nopol'
      }, {
        'data': 'merk_mobil'
      }, {
        'data': 'tipe_mobil'
      }, {
        'data': 'jenis_mobil'
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        "render": function render(data, type, full, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 5,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="#" title="Lihat" class="detailKendaraan">' + '<i class="fas fa-eye margin-right-10"></i>' + '</a>' + '<a href="#" title="Hapus" class="deleteKendaraan">' + '<i class="fas fa-trash"></i>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableKendaraan', column, 'kilometer/get-kendaraan', custParam, columnDefs);
    }

    if ($('#tablePenawaran').length) {
      var custParam = $('#kilometerIdValue').val();
      var column = [{
        'data': 'tanggal_dibuat'
      }, {
        'data': 'no_penawaran'
      }, {
        'data': 'tanggal_servis'
      }, {
        'data': 'km_sebelum'
      }, {
        'data': 'status_penawaran'
      }];
      columnDefs = [{
        "targets": 4,
        "data": "status_penawaran",
        "render": function render(data, type, full, meta) {
          var data = '';

          if (full.status_penawaran == 0) {
            data = '<span class="badge badge-primary">Kirim Penawaran</span>';
          } else if (full.status_penawaran == 1) {
            data = '<span class="badge badge-info">Menunggu Persetujuan</span>';
          } else if (full.status_penawaran == 2) {
            data = '<span class="badge badge-warning">Disetujui belum SPK</span>';
          } else if (full.status_penawaran == 3) {
            data = '<span class="badge badge-success">Disetujui sudah SPK</span>';
          }

          return data;
        }
      }, {
        "targets": 5,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          // var id = encodeURIComponent(window.btoa(full.penawaran_id));
          // var tgl_servis = encodeURIComponent(window.btoa(full.tanggal_servis));
          var data = [full.penawaran_id, full.tanggal_servis, full.spk_id];
          var data = encodeURIComponent(window.btoa(data));

          if (full.status_penawaran == 3) {
            var data = '<div class="action-table">' + '<a href="/kilometer/get-detail-penawaran/' + data + '" title="Lihat" class="detailPenawaran disabled">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
          } else {
            var data = '<div class="action-table">' + '<a href="/kilometer/get-detail-penawaran/' + data + '" title="Lihat" class="detailPenawaran">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
          }

          return data;
        }
      }];
      table.serverSide('tablePenawaran', column, 'kilometer/get-penawaran', custParam, columnDefs);
    }

    if ($('#tableManajemenSpk').length) {
      $('#filterSpkStatus').on('change', function () {
        // table.draw();
        var data = $("#filterSpkStatus option:selected").val();
        $('#dataFilterStatus').val(data);
        var custParam = data; // console.log(data)

        var column = [{
          'data': 'tanggal_spk'
        }, {
          'data': 'nama_cust'
        }, {
          'data': 'tipe_mobil'
        }, {
          'data': 'tanggal_servis'
        }, {
          'data': 'mekanik'
        }, {
          'data': 'status'
        }];
        columnDefs = [{
          "targets": 5,
          "data": "id",
          "orderable": false,
          "render": function render(data, type, full, meta) {
            var data = '';

            if (full.status == 0) {
              data = '<span class="badge badge-primary">Disetujui</span>';
            } else if (full.status == 1) {
              data = '<span class="badge badge-warning">Dikerjakan</span>';
            } else if (full.status == 2) {
              data = '<span class="badge badge-success">Selesai</span>';
            } else if (full.status == 3) {
              data = '<span class="badge badge-danger">Dibatalkan</span>';
            }

            return data;
          }
        }, {
          "targets": 6,
          "data": "id",
          "orderable": false,
          "render": function render(data, type, full, meta) {
            var data = [full.id, full.tanggal_servis, full.nama_cust, full.tipe_mobil, full.no_spk, full.mekanik];
            var data = encodeURIComponent(window.btoa(data)); // var id = encodeURIComponent(window.btoa(full.id));

            var data = '<div class="action-table">' + '<a href="/spk/detail-spk/' + data + '" title="Lihat" class="detailPenawaran">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
            return data;
          }
        }];
        table.serverSide('tableManajemenSpk', column, 'spk/get-spk', custParam, columnDefs);
        var tbody = $('#tableManajemenSpk').find('tbody');
        tbody.html('');
      });
      var column = [{
        'data': 'tanggal_spk'
      }, {
        'data': 'nama_cust'
      }, {
        'data': 'tipe_mobil'
      }, {
        'data': 'tanggal_servis'
      }, {
        'data': 'mekanik'
      }, {
        'data': 'status'
      }];
      columnDefs = [{
        "targets": 5,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var data = '';

          if (full.status == 0) {
            data = '<span class="badge badge-primary">Disetujui</span>';
          } else if (full.status == 1) {
            data = '<span class="badge badge-warning">Dikerjakan</span>';
          } else if (full.status == 2) {
            data = '<span class="badge badge-success">Selesai</span>';
          } else if (full.status == 3) {
            data = '<span class="badge badge-danger">Dibatalkan</span>';
          }

          return data;
        }
      }, {
        "targets": 6,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var data = [full.id, full.tanggal_servis, full.nama_cust, full.tipe_mobil, full.no_spk, full.mekanik];
          var data = encodeURIComponent(window.btoa(data)); // var id = encodeURIComponent(window.btoa(full.id));

          var data = '<div class="action-table">' + '<a href="/spk/detail-spk/' + data + '" title="Lihat" class="detailPenawaran">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenSpk', column, 'spk/get-spk', null, columnDefs);
    }

    if ($('#tableManajemenPelanggan').length) {
      var column = [{
        'data': null,
        "orderable": false
      }, {
        'data': 'nama_cust',
        "orderable": false
      }, {
        'data': 'alamat_cust',
        "orderable": false
      }, {
        'data': 'notelp_cust',
        "orderable": false
      }, {
        'data': 'nama_group',
        "orderable": false
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        render: function render(data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 5,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="#" title="Lihat" class="detailPelanggan">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '<a href="/pelanggan/hapus-pelanggan/' + encodeURIComponent(window.btoa(full.pelanggan_id)) + '" title="Hapus" class="deletePelanggan">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eraser"></i>' + '</div>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenPelanggan', column, 'pelanggan/get-pelanggan', null, columnDefs);
    }

    if ($('#tableManajemenUser').length) {
      var column = [{
        'data': null,
        "orderable": false
      }, {
        'data': 'name',
        "orderable": false
      }, {
        'data': 'email',
        "orderable": false
      }, {
        'data': 'role',
        "orderable": false
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        render: function render(data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 3,
        "data": "role",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          if (full.role == 0) {
            var data = '<span class="bg-green rounded-pill py-2 px-4">Admin</span>';
          } else if (full.role == 1) {
            var data = '<span class="bg-blue rounded-pill py-2 px-4">Pelanggan</span>';
          }

          return data;
        }
      }, {
        "targets": 4,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="#" title="Lihat" class="detailUser">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + '<a href="/user/hapus-user/' + id + '" title="Hapus" class="deleteUser">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eraser"></i>' + '</div>' + '</a>' + '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenUser', column, 'user/get-user', null, columnDefs);
    }

    if ($('#tableManajemenItemService').length) {
      var column = [{
        'data': null,
        "orderable": false
      }, {
        'data': 'merk_mobil',
        "orderable": false
      }, {
        'data': 'tipe_mobil',
        "orderable": false
      }, {
        'data': 'jenis_transmisi',
        "orderable": false
      }, {
        'data': 'kelas_tuneup',
        "orderable": false
      }, {
        'data': 'kelas_spooring',
        "orderable": false
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        render: function render(data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 3,
        "data": "jenis_transmisi",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var transmisi = ['nol', 'Manual', 'Automatic'];
          var data = transmisi[full.jenis_transmisi];
          return data;
        }
      }, {
        "targets": 4,
        "data": "kelas_tuneup",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
          var data = tuneup[full.kelas_tuneup];
          return data;
        }
      }, {
        "targets": 5,
        "data": "kelas_spooring",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
          var data = spooring[full.kelas_spooring];
          return data;
        }
      }, {
        "targets": 6,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="/service/view-edit-service/' + id + '" title="Lihat" class="detailService">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + // '<a href="#" title="Generate Password" class="generatePassword">'+
          // 	'<div class="icon-dropdown-menu">'+
          // 		'<i class="fas fa-unlock-alt"></i>'+
          // 	'</div>'+
          // '</a>'+
          '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenItemService', column, 'service/get-service', null, columnDefs);
    }
  },
  filter: function filter(id, value) {
    var imageDetail = '../image/icon/main/eye-solid.png';
    var imageEdit = '../image/icon/main/pen-square-solid.png';
    var imageDeactive = '../image/icon/main/deactive.png';
    var imageActive = '../image/icon/main/activae.png';
    $('.modal').modal('hide');

    if (id == 'filterItemService') {
      var column = [{
        'data': null,
        "orderable": false
      }, {
        'data': 'merk_mobil',
        "orderable": false
      }, {
        'data': 'tipe_mobil',
        "orderable": false
      }, {
        'data': 'jenis_transmisi',
        "orderable": false
      }, {
        'data': 'kelas_tuneup',
        "orderable": false
      }, {
        'data': 'kelas_spooring',
        "orderable": false
      }];
      columnDefs = [{
        "targets": 0,
        "data": null,
        render: function render(data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      }, {
        "targets": 3,
        "data": "jenis_transmisi",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var transmisi = ['nol', 'Manual', 'Automatic'];
          var data = transmisi[full.jenis_transmisi];
          return data;
        }
      }, {
        "targets": 4,
        "data": "kelas_tuneup",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
          var data = tuneup[full.kelas_tuneup];
          return data;
        }
      }, {
        "targets": 5,
        "data": "kelas_spooring",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
          var data = spooring[full.kelas_spooring];
          return data;
        }
      }, {
        "targets": 6,
        "data": "id",
        "orderable": false,
        "render": function render(data, type, full, meta) {
          var id = encodeURIComponent(window.btoa(full.id));
          var data = '<div class="action-table">' + '<a href="/service/view-edit-service/' + id + '" title="Lihat" class="detailService">' + '<div class="icon-dropdown-menu">' + '<i class="fas fa-eye"></i>' + '</div>' + '</a>' + // '<a href="#" title="Generate Password" class="generatePassword">'+
          // 	'<div class="icon-dropdown-menu">'+
          // 		'<i class="fas fa-unlock-alt"></i>'+
          // 	'</div>'+
          // '</a>'+
          '</div>';
          return data;
        }
      }];
      table.serverSide('tableManajemenItemService', column, 'service/get-service', value, columnDefs);
    }
  },
  getData: function getData(url, params, callback) {
    $.ajax({
      url: url,
      type: 'post',
      data: params,
      success: function success(result) {
        if (!result.error) {
          callback(null, result.data);
        } else {
          callback(data);
        }
      }
    });
  },
  clear: function clear(id) {
    var tbody = $('#' + id).find('tbody');
    tbody.html('');

    if ($('#total').length) {
      $('#total').html('');
    }

    if ($('#order_id').length) {
      $('#order_id').val('');
    }

    if ($('input[name=jumlah_pembayaran]').length) {
      $('input[name=jumlah_pembayaran]').val('');
    }
  },
  serverSide: function serverSide(id, columns, url) {
    var custParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var columnDefs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var urutan = [0, 'asc'];

    if (id == 'tableProduct') {
      urutan = [1, 'asc'];
    }

    var search = true;

    if (id == 'tableRekapPoint' || id == 'tableRekapSaldo' || id == 'tableSlider') {
      search = false;
    }

    var svrTable = $("#" + id).DataTable({
      processing: true,
      serverSide: true,
      columnDefs: columnDefs,
      columns: columns,
      // responsive: true,
      scrollX: true,
      // scrollY: true,
      // pageLength:10,
      ajax: function ajax(data, callback, settings) {
        data.param = custParam;

        _ajax.getData(url, 'post', data, function (result) {
          // console.log(result)
          if (result.status == 'reload') {
            ui.popup.show('confirm', result.messages.title, result.messages.message, 'refresh');
          } else if (result.status == 'logout') {
            ui.popup.alert(result.messages.title, result.messages.message, 'logout');
          } else {
            if (id == 'tableEndUserReport') {
              $('#totalAmountDate').html('Rp ' + result.total_amount);
            }

            callback(result);
          }
        });
      },
      bDestroy: true,
      searching: search,
      order: urutan,
      ordering: true
    });
    console.log($('#tableProduk_paginate').val());
    $('div.dataTables_filter input').unbind();
    $('div.dataTables_filter input').bind('keyup', function (e) {
      if (e.keyCode == 13) {
        svrTable.search(this.value).draw();
      }
    });
  },
  setAndPopulate: function setAndPopulate(id, columns, data, columnDefs, ops, order) {
    var _option;

    var orderby = order ? order : [0, "asc"];
    var option = (_option = {
      "data": data,
      "drawCallback": function drawCallback(settings) {},
      tableTools: {
        "sSwfPath": "assets/plugins/datatables/TableTools/swf/copy_csv_xls_pdf.swf",
        "aButtons": ["xls", "csv", "pdf"]
      },
      "columns": columns,
      "pageLength": 10,
      "order": [orderby],
      "bDestroy": true,
      "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      "aoColumnDefs": columnDefs,
      "scrollX": true,
      "scrollY": true
    }, _defineProperty(_option, "lengthMenu", [[10, 25, 50, -1], [10, 25, 50, "All"]]), _defineProperty(_option, "buttons", ['csv', 'pdf']), _defineProperty(_option, "rowCallback", function rowCallback(row, data) {
      if (id == "tbl_notification") {
        if (data.read == "1") {
          $(row).css('background-color', '#D4D4D4');
        }
      }

      if (id == "tbl_mitra" || id == "tbl_user" || id == "tbl_agent_approved") {
        if (data.status == "0") {
          $(row).css('background-color', '#FF7A7A');
        }
      }
    }), _option);

    if (ops != null) {
      $.extend(option, ops);
    }

    var tbody = $('#' + id).find('tbody');
    var t = $('#' + id).DataTable(option);
    t.on('order.dt search.dt', function () {
      if (id == 'tableFitur') {} else {
        t.column(0, {
          search: 'applied',
          order: 'applied'
        }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
      }
    }).draw();
  }
};
/* Detail Kendaraan */

$('#tableKendaraan tbody').on('click', 'a.detailKendaraan', function (e) {
  var table = $('#tableKendaraan').DataTable();
  var dataRow = table.row($(this).closest('tr')).data(); // console.log(dataRow)
  // var id = encodeURIComponent(window.btoa([dataRow.id]));
  // var masterId = encodeURIComponent(window.btoa([dataRow.kendaraan_master_id]));
  // ajax.getData('/get-detail-kendaraan/'+id+'/'+masterId, 'get', null, function(data){
  // 	console.log(data)
  // })

  $('#nopol').val(dataRow.nopol);
  $('#merk').val(dataRow.merk_mobil);
  $('#tipe').val(dataRow.tipe_mobil);
  $('#jenis').val(dataRow.jenis_mobil);
  $('#tahun_rakit').val(dataRow.tahun_rakit);
  $('#tahun_buat').val(dataRow.tahun_buat);
  $('#warna_mobil').val(dataRow.warna_mobil);
  $('#no_rangka').val(dataRow.no_rangka);
  $('#no_mesin').val(dataRow.no_mesin);
  $('#km_terakhir').val(dataRow.km_terakhir);
  $('#modalDetailKendaraan').modal('show');
});

function showDetailPesananModal(param) {
  _ajax.getData('/pesanan/get-detail-pesanan/' + param, 'get', null, function (data) {
    // console.log(data)
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var order = new Date(data.created_at);
    var orderDay = order.getDay();
    var orderDate = order.getDate();
    var orderMonth = order.getMonth() + 1;
    var orderYear = order.getFullYear();
    var orderHour = order.getHours();
    var orderMinute = order.getMinutes();
    var orderSecond = order.getSeconds();
    var orderAt = day[orderDay] + ' ' + orderDate + ' ' + month[orderMonth] + ' ' + orderYear + ' ' + orderHour + ':' + orderMinute + ':' + orderSecond;
    $('#invoiceOrder').text(data.invoice);
    $('#orderAt').text(orderAt);
    $('#resiOrder').text(data.no_resi); // bukti transfer belum berupa gambar

    $('#namaUserOrder').text('dummy saber');
    $('#alamatOrder').text(data.alamat);
    $('#kodeposOrder').text(data.kodepos);
    $('#kelurahanOrder').text(data.kelurahan);
    $('#kecamatanOrder').text(data.kecamatan);
    $('#kotaOrder').text(data.kota);
    $('#provinsiOrder').text(data.provinsi);
    $('#noTelpUserOrder').text('dummy 123456789');
    $('#jasaPengiriman').text(data.jasa_pengiriman);
    $('#ongkosPengiriman').text('Rp. ' + format(data.ongkir_pengiriman));
    $('#ongkosPengirimanSub').text('Rp. ' + format(data.ongkir_pengiriman));
    $('#totalPembayaran').text('Rp. ' + format(data.total + data.ongkir_pengiriman));
    var dataOrder = [];

    for (var i = 0; i < data.keranjang.length; i++) {
      var option = '<tr>' + '<td><img src="' + data.keranjang[i].produk_market.img + '" width="100" /></td>' + '<td>' + data.keranjang[i].produk_market.nama_product + '</td>' + '<td>' + data.keranjang[i].count + ' item</td>' + '<td>Rp. ' + format(data.keranjang[i].produk_market.harga) + '</td>' + '<td>Rp. ' + format(data.keranjang[i].produk_market.harga * data.keranjang[i].count) + '</td>' + '</tr>';
      dataOrder.push(option);
    } // console.log(dataOrder)


    $("#tableProdukPesanan.table tbody").append(dataOrder);

    function format(data) {
      var rupiah = '';
      var angkarev = data.toString().split('').reverse().join('');

      for (var i = 0; i < angkarev.length; i++) {
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      }

      return rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    if (data.status == 0) {
      $('.div-action-approve').show();
      $('#invoiceApprove').val(data.invoice);
      $('#invoiceReject').val(data.invoice);

      if (data.bukti_transfer != null) {
        $('.div-action-bukti-pembayaran').show();
        $('#imgBuktiTransferAdmin').attr('src', baseUrl + 'storage/' + data.bukti_transfer);
      }
    } else if (data.status == 1) {
      $('.div-action-bukti-pembayaran').show();
      $('.div-action-input-resi').show();
      $('#invoiceResi').val(data.invoice);
    } else if (data.status == 6) {
      $('.div-request-pembatalan').show();
      $('#invoiceApproveReq').val(data.invoice);
      $('#invoiceRejectReq').val(data.invoice);

      if (data.bukti_transfer != null) {
        $('.div-action-bukti-pembayaran').show();
        $('#imgBuktiTransferAdmin').attr('src', baseUrl + 'storage/' + data.bukti_transfer);
      }
    }

    $('#modalDetailPesananAdmin').modal('show');
  });
}

$('#tableManajemenPelanggan tbody').on('click', 'a.detailPelanggan', function (e) {
  $('#pilihanMobilEdit').hide();
  var table = $('#tableManajemenPelanggan').DataTable();
  var dataRow = table.row($(this).closest('tr')).data(); // console.log(dataRow)

  $("#jenisPelangganEdit").empty();

  _ajax.getData('pelanggan/get-group', 'get', null, function (data) {
    // console.log(data)
    var dataGroup = ['<option value="">-- Pilih Jenis --</option>'];

    for (var i = 0; i < data.length; i++) {
      if (data[i].id === dataRow.group_cust) {
        var option = '<option value="' + data[i].id + '" selected>' + data[i].jenis + '</option>';
      } else {
        var option = '<option value="' + data[i].id + '">' + data[i].jenis + '</option>';
      }

      dataGroup.push(option);
    }

    $("#jenisPelangganEdit").append(dataGroup);
  });

  $('#idPelanggan').val(dataRow.id);
  $('#namaPelangganEdit').val(dataRow.nama_cust);
  $('#noTelpPelangganEdit').val(dataRow.notelp_cust);
  $('#alamatPelangganEdit').val(dataRow.alamat_cust);
  $('#provinsiPelangganEdit').val(dataRow.propinsi_cust);
  $('#kotaPelangganEdit').val(dataRow.kota_cust);
  $('#merkKendaraanEdit').val(dataRow.merk_mobil);
  $('#tipeKendaraanEdit').val(dataRow.tipe_mobil);
  $('#jenisKendaraanEdit').val(dataRow.jenis_mobil);
  $('#tahunBuatKendaraanEdit').val(dataRow.tahun_buat);
  $('#tahunRakitKendaraanEdit').val(dataRow.tahun_rakit);
  $('#warnaKendaraanEdit').val(dataRow.warna_mobil);
  $('#noRangkaKendaraanEdit').val(dataRow.no_rangka);
  $('#noMesinKendaraanEdit').val(dataRow.no_mesin);
  $('#kmTerakhirKendaraanEdit').val(dataRow.km_terakhir);
  $('#modalEditPelanggan').modal('show');
});
$('#tableManajemenUser tbody').on('click', 'a.detailUser', function (e) {
  var table = $('#tableManajemenUser').DataTable();
  var dataRow = table.row($(this).closest('tr')).data(); // console.log(dataRow)

  $('#idUser').val(dataRow.id);
  $('#namaUserEdit').val(dataRow.name);
  $('#emailUserEdit').val(dataRow.email);
  $('#modalEditUser').modal('show');
});
var ui = {
  popup: {
    show: function show(type, message, url) {
      if (type == 'error') {
        Swal.fire({
          title: message,
          type: type,
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }); // $('#massage_notif_error').html(message)
        // $('#modalNotifError').modal('show')
      } else if (type == 'success') {
        if (url == 'close') {
          Swal.fire({
            title: message,
            type: type,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }); // $('#massage_notif_success').html(message)
          // $('#btn-url-notif').empty();
          // $('#btn-url-notif').append('<button class="btn btn-submit-filter mx-auto" data-dismiss="modal" type="button">Okay</button>')
          // $('#modalNotifSuccess').modal('show')
        } else {
          Swal.fire({
            title: message,
            type: type,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then(function () {
            window.location = url;
          }); // console.log(message, url)
          // $('#massage_notif_success').html(message)
          // $('#btn-url-notif').empty();
          // $('#btn-url-notif').append('<a href="'+url+'" id="link_notif_success" class="btn btn-submit-filter mx-auto">Okay</a>')
          // $('#modalNotifSuccess').modal('show')
        }
      } else if (type == 'initActivation') {
        Swal.fire({
          html: message,
          showConfirmButton: true,
          confirmButtonText: 'Submit',
          showCancelButton: true,
          cancelButtonText: 'Tutup',
          allowOutsideClick: false
        });
      } else if (type == 'warning') {
        if (url == 'close') {
          Swal.fire({
            title: message,
            type: type,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          });
        } else {
          Swal.fire({
            title: message,
            type: type,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then(function () {
            window.location = url;
          });
        }
      } else {
        Swal.fire({
          title: message,
          type: type,
          confirmButtonText: 'OK',
          allowOutsideClick: false
        });
      }
    },
    showLoader: function showLoader() {
      $("#loading-overlay").addClass("active");
      $("body").addClass("modal-open");
    },
    hideLoader: function hideLoader() {
      $("#loading-overlay").removeClass("active");
      $("body").removeClass("modal-open");
    },
    hide: function hide(id) {
      $('.' + id).toggleClass('submitted');
    }
  },
  slide: {
    init: function init() {
      $('.carousel-control').on('click', function (e) {
        e.preventDefault();
        var control = $(this);
        var item = control.parent();

        if (control.hasClass('right')) {
          ui.slide.next(item);
        } else {
          ui.slide.prev(item);
        }
      });
      $('.slideBtn').on('click', function (e) {
        e.preventDefault();
        var control = $(this);
        var item = $("#" + control.attr('for'));

        if (control.hasClass('btn-next')) {
          ui.slide.next(item);
        } else {
          ui.slide.prev(item);
        }
      });
    },
    next: function next(item) {
      var nextItem = item.next();
      item.toggle({
        'slide': {
          direction: 'left'
        }
      });
      nextItem.toggle({
        'slide': {
          direction: 'right'
        }
      });
    },
    prev: function prev(item) {
      var prevItem = item.prev();
      item.toggle({
        'slide': {
          direction: 'right'
        }
      });
      prevItem.toggle({
        'slide': {
          direction: 'left'
        }
      });
    }
  }
};
var formrules = {
  'formResetPassword': {
    ignore: null,
    rules: {
      'otpReset': {
        digits: true,
        required: true
      },
      'passwordReset': {
        required: true,
        maxlength: 12,
        minlength: 8,
        pwcheck3: true
      },
      "confPasswordReset": {
        required: true,
        equalTo: '#passwordReset'
      }
    },
    submitHandler: false
  },
  'formRegister': {
    ignore: null,
    rules: {
      'username': {
        required: true,
        maxlength: 10,
        STD_VAL_WEB_1: true
      },
      'email': {
        required: true,
        emailType: true,
        STD_VAL_WEB_5: true
      },
      'phone': {
        required: true,
        digits: true,
        STD_VAL_WEB_8: true
      },
      'password': {
        required: true,
        maxlength: 12,
        minlength: 8,
        pwcheck3: true,
        STD_VAL_WEB_2: true
      },
      'confirm-password': {
        required: true,
        equalTo: '#password'
      }
    },
    submitHandler: false,
    messages: {
      phone: {
        required: 'Mohon isi nomor handphone',
        digits: 'Nomor HP yang Anda masukkan salah',
        maxlength: 'Nomor HP yang Anda masukkan salah',
        minlength: 'Nomor HP yang Anda masukkan salah'
      }
    }
  },
  'checkout': {
    ignore: null,
    rules: {
      'alamat': {
        required: true,
        STD_VAL_WEB_10: true
      },
      'kelurahan': {
        required: true
      },
      'kecamatan': {
        required: true
      },
      'kodepos': {
        required: true,
        digits: true
      },
      'provinsi': {
        required: true
      },
      'kota': {
        required: true
      }
    },
    submitHandler: false
  },
  'formAddUser': {
    ignore: null,
    rules: {
      'nama': {
        required: true,
        nameCheck: true,
        maxlength: 64
      },
      'email': {
        required: true,
        emailType: true
      },
      'nomor_handphone': {
        required: true,
        digits: true,
        maxlength: 13,
        minlength: 11
      },
      'jabatan': {
        required: true
      },
      'divisi': {
        required: true
      },
      'role': {
        required: true
      }
    },
    submitHandler: false,
    messages: {
      nomor_handphone: {
        required: 'Mohon isi nomor handphone',
        digits: 'Nomor HP yang Anda masukkan salah',
        maxlength: 'Nomor HP yang Anda masukkan salah',
        minlength: 'Nomor HP yang Anda masukkan salah'
      }
    }
  },
  'formEditUser': {
    ignore: null,
    rules: {
      'nama': {
        required: true,
        nameCheck: true,
        maxlength: 64
      },
      'email': {
        required: true,
        emailType: true
      },
      'nomor_handphone': {
        required: true,
        digits: true,
        maxlength: 13,
        minlength: 11
      },
      'jabatan': {
        required: true
      },
      'divisi': {
        required: true
      },
      'role': {
        required: true
      }
    },
    submitHandler: false,
    messages: {
      nomor_handphone: {
        required: 'Mohon isi nomor handphone',
        digits: 'Nomor HP yang Anda masukkan salah',
        maxlength: 'Nomor HP yang Anda masukkan salah',
        minlength: 'Nomor HP yang Anda masukkan salah'
      }
    }
  },
  'formAddKategori': {
    ignore: null,
    rules: {
      'kodeKategori': {
        required: true,
        number: true
      },
      'namaKategori': {
        required: true,
        nameCheck: true
      }
    },
    submitHandler: false,
    messages: {
      kodeKategori: {
        required: 'Mohon isi kode kategori',
        number: 'Mohon isi kode kategori dengan angka'
      },
      namaKategori: {
        required: 'Mohon isi nama kategori'
      }
    }
  },
  'formLogin': {
    ignore: null,
    rules: {
      'email': {
        required: true
      },
      'password': {
        required: true
      }
    },
    submitHandler: false
  }
};
var validation = {
  messages: {
    required: function required() {
      return '<i class="fa fa-exclamation-circle"></i> Mohon isi kolom ini';
    },
    minlength: function minlength(length) {
      return '<i class="fa fa-exclamation-circle"></i> Isi dengan minimum ' + length;
    },
    maxlength: function maxlength(length) {
      return '<i class="fa fa-exclamation-circle"></i> Isi dengan maximum ' + length;
    },
    max: function max(message, length) {
      return '<i class="fa fa-exclamation-circle"></i> ' + message + length;
    },
    email: function email() {
      return '<i class="fa fa-exclamation-circle"></i> Email Anda salah. Email harus terdiri dari @ dan domain';
    },
    digits: function digits() {
      return '<i class="fa fa-exclamation-circle"></i> Mohon isi hanya dengan nomor';
    },
    numbers2: function numbers2() {
      return '<i class="fa fa-exclamation-circle"></i> Mohon isi hanya dengan nomor';
    },
    nameCheck: function nameCheck() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung A-Z dan \'';
    },
    numericsSlash: function numericsSlash() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung 0-9 dan /';
    },
    alphaNumeric: function alphaNumeric() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung 0-9, A-Z dan spasi';
    },
    alphaNumericNS: function alphaNumericNS() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung 0-9 dan A-Z';
    },
    alpha: function alpha() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung A-Z dan spasi';
    },
    alphaNS: function alphaNS() {
      return '<i class="fa fa-exclamation-circle"></i> Nama hanya boleh mengandung A-Z';
    },
    equalTo: function equalTo() {
      return '<i class="fa fa-exclamation-circle"></i> Mohon mengisi dengan isian yang sama';
    },
    addresscheck: function addresscheck() {
      return '<i class="fa fa-exclamation-circle"></i> Input harus mengandung satu nomor, satu huruf kecil dan satu huruf besar';
    },
    pwcheck: function pwcheck() {
      return '<i class="fa fa-exclamation-circle"></i> Input minimum 8 dan mengandung satu nomor, satu huruf kecil dan satu huruf besar';
    },
    pwcheck_alfanum: function pwcheck_alfanum() {
      return '<i class="fa fa-exclamation-circle"></i> Input antara 8-14 karakter dan harus merupakan kombinasi antara angka dan huruf';
    },
    pwcheck2: function pwcheck2() {
      return '<i class="fa fa-exclamation-circle"></i> Input antara 8-14 karakter dan harus mengandung nomor, huruf kecil, huruf besar dan simbol kecuali ("#<>\/\\=\')';
    },
    notEqual: function notEqual(message) {
      return '<i class="fa fa-exclamation-circle"></i> ' + message;
    },
    checkDate: function checkDate() {
      return '<i class="fa fa-exclamation-circle"></i> Format tanggal salah';
    },
    checkTime: function checkTime() {
      return '<i class="fa fa-exclamation-circle"></i> Format time (HH:mm) salah';
    },
    formatSeparator: function formatSeparator() {
      return '<i class="fa fa-exclamation-circle"></i> Contoh format: Ibu rumah tangga, pedagang, tukang jahit';
    },
    acceptImage: function acceptImage() {
      return '<i class="fa fa-exclamation-circle"></i> Mohon upload hanya gambar';
    },
    filesize: function filesize(size) {
      return '<i class="fa fa-exclamation-circle"></i> Max file size: ' + size;
    },
    extension: function extension(format) {
      return '<i class="fa fa-exclamation-circle"></i> Format yang Anda pilih tidak sesuai';
    },
    minValue: function minValue(_minValue) {
      return '<i class="fa fa-exclamation-circle"></i> Minimal Amount: ' + _minValue;
    },
    ageCheck: function ageCheck(age) {
      return '<i class="fa fa-exclamation-circle"></i> Minimal Age ' + age;
    },
    checkDateyyyymmdd: function checkDateyyyymmdd() {
      return '<i class="fa fa-exclamation-circle></i> Format tanggal YYYY-MM-DD, contoh: 2016-01-30';
    },
    checkDateddmmyyyy: function checkDateddmmyyyy() {
      return '<i class="fa fa-exclamation-circle></i> Format tanggal DD/MM/YYYY, contoh: 17/08/1945';
    }
  },
  addMethods: function addMethods() {
    // alert('method')
    // jQuery.validator.addMethod("maxDateRange",
    jQuery.extend(jQuery.validator.messages, {
      required: "Mohon isi kolom ini.",
      remote: "Please fix this field.",
      email: "Email Anda salah. Email harus terdiri dari @ dan domain.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Mohon isi hanya dengan angka.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Mohon isi dengan value yang sama.",
      accept: "Format yang Anda pilih tidak sesuai.",
      maxlength: jQuery.validator.format("Mohon isi dengan tidak melebihi {0} karakter."),
      minlength: jQuery.validator.format("Mohon isi dengan minimal {0} karakter."),
      rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
      range: jQuery.validator.format("Please enter a value between {0} and {1}."),
      max: jQuery.validator.format("Mohon isi tidak melebihi {0}."),
      min: jQuery.validator.format("Mohon isi minimal {0}."),
      extension: "Format yang Anda pilih tidak sesuai.",
      alphaNumeric: "Hanya boleh mengandung 0-9, A-Z dan spasi" // addresscheck:"Input harus mengandung satu nomor, satu huruf kecil dan satu huruf besar"

    });
    $.validator.addMethod("maxDateRange", function (value, element, params) {
      var end = new Date(value);
      var start = new Date($(params[0]).val());
      var range = (end - start) / 86400000;

      if (!/Invalid|NaN/.test(new Date(value))) {
        return range <= params[1];
      }

      return isNaN(value) && isNaN($(params[0]).val()) || range <= params[1];
    }, 'Melebihi maksimal range {1} hari.');
    jQuery.validator.addMethod("greaterThan", function (value, element, params) {
      console.log(value, element, params);

      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
      }

      return isNaN(value) && isNaN($(params).val()) || Number(value) > Number($(params).val());
    }, 'Must be greater than {0}.');
    $.validator.addMethod("ageCheck", function (value, element, param) {
      var now = moment(); //return now;

      function parseNewDate(date) {
        var split = date.split('-');
        var b = moment([split[2], split[1] - 1, split[0]]);
        return b;
      }

      var difference = now.diff(parseNewDate(value), 'years');
      return difference >= param;
    }, "Check Umur");
    jQuery.validator.addMethod("numbers2", function (value, element) {
      return this.optional(element) || /^-?(?!0)(?:\d+|\d{1,3}(?:\.\d{3})+)$/.test(value);
    }, "Mohon isi hanya dengan nomor");
    jQuery.validator.addMethod("nameCheck", function (value, element) {
      return this.optional(element) || /^([a-zA-Z' ]+)$/.test(value);
    }, "Nama hanya boleh mengandung A-Z dan '");
    jQuery.validator.addMethod("numericsSlash", function (value, element) {
      return this.optional(element) || /^([0-9/]+)$/.test(value);
    }, "Nama hanya boleh mengandung 0-9 dan /");
    jQuery.validator.addMethod("numericDot", function (value, element) {
      return this.optional(element) || /^([0-9.]+)$/.test(value);
    }, "Nama hanya boleh mengandung 0-9 dan .");
    jQuery.validator.addMethod("numericKoma", function (value, element) {
      return this.optional(element) || /^([0-9,]+)$/.test(value);
    }, "Nama hanya boleh mengandung 0-9 dan ,");
    jQuery.validator.addMethod("alphaNumeric", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9. ]*$/.test(value);
    }, "Hanya boleh mengandung 0-9, A-Z, Titik dan spasi");
    jQuery.validator.addMethod("alphaNumericNS", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]*$/.test(value);
    }, "Nama hanya boleh mengandung 0-9 dan A-Z");
    jQuery.validator.addMethod("alamatFormat", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9 .,-/]*$/.test(value);
    }, "Nama hanya boleh mengandung A-Z, 0-9, titik, koma, dan strip");
    jQuery.validator.addMethod("defaultText", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9 ',-.:/?!&%()+=_\n]*$/.test(value);
    }, "Inputan hanya boleh mengandung A-Z, 0-9, spasi dan simbol .,:'/?!&%()-+=_");
    jQuery.validator.addMethod("defaultName", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9 .']*$/.test(value);
    }, "Inputan hanya boleh mengandung A-Z, 0-9, spasi dan simbol .'");
    jQuery.validator.addMethod("arabic", function (value, element) {
      return this.optional(element) || /^[\u0600-\u06FF\u0750-\u077F ]*$/.test(value);
    }, "Inputan hanya boleh bahasa Arab.");
    jQuery.validator.addMethod("defaultPhone", function (value, element) {
      return this.optional(element) || /^[0-9-/']*$/.test(value);
    }, "Inputan hanya boleh mengandung 0-9, spasi, dan simbol-/'");
    jQuery.validator.addMethod("alpha", function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    }, "Nama hanya boleh mengandung A-Z dan spasi");
    jQuery.validator.addMethod("alphaNS", function (value, element) {
      return this.optional(element) || /^[a-zA-Z]*$/.test(value);
    }, "Nama hanya boleh mengandung A-Z");
    jQuery.validator.addMethod("addresscheck", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\s).{8,}$/.test(value);
    }, "Input harus mengandung satu nomor, satu huruf kecil dan satu huruf besar");
    jQuery.validator.addMethod("pwcheck", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(value);
    }, "Input harus mengandung satu nomor, satu huruf kecil dan satu huruf besar");
    jQuery.validator.addMethod("pwcheck_alfanum", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*\D)(?!.*\s).{8,14}$/.test(value);
    }, "Input harus merupakan kombinasi antara angka dan huruf");
    jQuery.validator.addMethod("pwcheck2", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w])(?!.*[#<>\/\\=”’"'])(?!.*\s).{8,14}$/.test(value);
    }, "Input harus mengandung satu nomor, satu huruf kecil, satu huruf besar, simbol kecuali \"#<>\/\\=\"'");
    jQuery.validator.addMethod("pwcheck3", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w])(?!.*\s).{8,12}$/.test(value);
    }, "Input harus mengandung satu nomor, satu huruf kecil, satu huruf besar, simbol");
    jQuery.validator.addMethod("max", function (value, element, param) {
      var val = parseFloat(value.replace(/\./g, ""));
      return this.optional(element) || val <= param;
    }, jQuery.validator.format("Maksimal {0}"));
    jQuery.validator.addMethod("maxDec", function (value, element, param) {
      var data = value.replace(',', '.');
      return this.optional(element) || data <= param;
    }, jQuery.validator.format("Maksimal {0}"));
    jQuery.validator.addMethod("maxDecMargin", function (value, element, param) {
      var data = value.replace(',', '.');
      return this.optional(element) || data <= param;
    }, jQuery.validator.format("Margin tidak valid"));
    jQuery.validator.addMethod("notEqual", function (value, element, param) {
      return this.optional(element) || value != $(param).val();
    }, "This has to be different...");
    jQuery.validator.addMethod("notZero", function (value, element, param) {
      var val = parseFloat(value.replace(/\./g, ""));
      var nol = value.substr(0, 1);
      return this.optional(element) || val != param;
    }, jQuery.validator.format("Value Tidak Boleh 0"));
    jQuery.validator.addMethod("zeroValid", function (value, element, param) {
      var nol = value.substr(0, 1);
      var val = parseFloat(value.replace(/\./g, ""));

      if (value.length == 1) {
        return this.optional(element) || val == nol;
      } else {
        return this.optional(element) || nol != param;
      }
    }, jQuery.validator.format("Angka pertama tidak boleh 0"));
    jQuery.validator.addMethod("minValue", function (value, element, param) {
      return value >= param;
    }, "Min Value needed");
    jQuery.validator.addMethod("checkDate", function (value, element) {
      return this.optional(element) || /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(value);
    }, "Format tanggal salah");
    jQuery.validator.addMethod("checkTime", function (value, element) {
      return this.optional(element) || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }, "Format time (HH:mm) salah");
    jQuery.validator.addMethod("formatSeparator", function (value, element) {
      return this.optional(element) || /^[A-Za-z ]+(,[A-Za-z ]+){0,2}$/.test(value);
    }, "Contoh format: Ibu rumah tangga,pedagang,tukang jahit");
    jQuery.validator.addMethod("checkDateyyyymmdd", function (value, element) {
      return this.optional(element) || /^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/.test(value);
    }, "Format tanggal YYYY-MM-DD, contoh: 2016-01-30");
    jQuery.validator.addMethod("checkDateddmmyyyy", function (value, element) {
      return this.optional(element) || /^\d{2}\/\d{2}\/\d{4}$/.test(value);
    }, "Format tanggal Bulan/Tanggal/Tahun, contoh: 06/08/1945");
    jQuery.validator.addMethod("emailType", function (value, element) {
      value = value.toLowerCase();
      return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }, "Email Anda salah. Email harus terdiri dari @ dan domain");
    jQuery.validator.addMethod("symbol", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9!@#$%^&()]*$/.test(value);
    }, "Password hanya boleh mengandung A-Z, a-z, 0-9 dan simbol dari 0-9");
    jQuery.validator.addMethod('filesize', function (value, element, param) {
      return this.optional(element) || element.files[0].size <= param;
    }, "Ukuran Maksimal Gambar 1 MB");
    jQuery.validator.addMethod("STD_VAL_WEB_1", function (value, element) {
      return this.optional(element) || /^(?=.*\d)([a-zA-Z0-9]+)(?!.*[ #<>\/\\=”’"'!@#$%^&()]).{6,10}$/.test(value);
    }, "Username yang Anda masukkan harus terdiri dari 6-10 karakter alfanumerik tanpa spasi");
    jQuery.validator.addMethod("STD_VAL_WEB_2", function (value, element) {
      // 3x salah blokir
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w])(?!.*\s).{8,12}$/.test(value);
    }, "Password kombinasi huruf kapital, huruf kecil, angka, dan karakter non-alphabetic");
    jQuery.validator.addMethod("STD_VAL_WEB_3", function (value, element) {
      return this.optional(element) || /^[a-zA-Z.' ]*$/.test(value);
    }, "Nama harus terdiri dari alfabet, titik (.) dan single quote (')"); // STD_VAL_WEB_4 Jenis Kelamin (kemungkinan select option)

    jQuery.validator.addMethod("STD_VAL_WEB_5", function (value, element) {
      value = value.toLowerCase();
      return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }, "Email Anda salah. Email harus terdiri dari @ dan domain");
    jQuery.validator.addMethod("STD_VAL_WEB_6", function (value, element) {
      return this.optional(element) || /^\d{16}$/.test(value);
    }, "Nomor KTP yang Anda masukkan salah. Harus terdiri dari 16 karakter");
    jQuery.validator.addMethod("STD_VAL_WEB_7", function (value, element) {
      return this.optional(element) || /^\d{15}$/.test(value);
    }, "NPWP yang Anda masukkan salah. Harus terdiri dari 15 karakter tanpa spasi dan symbol");
    jQuery.validator.addMethod("STD_VAL_WEB_8", function (value, element) {
      return this.optional(element) || /^\d{11,13}$/.test(value);
    }, "Nomor HP yang Anda masukkan salah");
    jQuery.validator.addMethod("STD_VAL_WEB_9", function (value, element) {
      // 3x salah blokir
      return this.optional(element) || /^\d{6}$/.test(value);
    }, "Pin yang anda masukkan salah. Jika salah hingga 3x akan otomatis terblokir");
    jQuery.validator.addMethod("STD_VAL_WEB_10", function (value, element) {
      return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\s).{6,255}$/.test(value);
    }, "Alamat yang anda masukkan salah");
    jQuery.validator.addMethod("STD_VAL_WEB_11", function (value, element) {
      return this.optional(element) || /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(value);
    }, "Masukkan format tanggal yang sesuai");
    jQuery.validator.addMethod("STD_VAL_WEB_12", function (value, element) {
      return this.optional(element) || /^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]:[0-6][0-9]$/.test(value);
    }, "Masukkan format tanggal yang sesuai");
    jQuery.validator.addMethod("STD_VAL_WEB_13", function (value, element) {
      // 3x salah blokir, expired 3 menit, 1 menit untuk retry
      return this.optional(element) || /^\d{6}$/.test(value);
    }, "OTP yang Anda masukkan salah");
    jQuery.validator.addMethod("STD_VAL_WEB_14", function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9]{8,12}$/.test(value);
    }, "MPIN yang Anda masukkan salah");
    jQuery.validator.addMethod("STD_VAL_WEB_15", function (value, element) {
      // setelah 4 input angka otomatis spasi (tambahkan pada masking)
      return this.optional(element) || /^[0-9 ]{19}$/.test(value);
    }, "Nomor kartu yang Anda masukkan tidak valid/salah");
    jQuery.validator.addMethod("STD_VAL_WEB_16", function (value, element) {
      // Saat input otomatis masking
      return this.optional(element) || /^\d{3}$/.test(value);
    }, "CVV yang Anda masukkan tidak valid/salah");
    jQuery.validator.addMethod("STD_VAL_WEB_17", function (value, element) {
      // Maxlength sesuai kebutuhan
      return this.optional(element) || /^\d$/.test(value);
    }, "Virtual Account Number yang anda masukkan tidak valid");
    jQuery.validator.addMethod('STD_VAL_WEB_18', function (value, element) {
      return this.optional(element) || element.files[0].size <= 1000000;
    }, "Upload gambar maksimal 1MB");
    jQuery.validator.addMethod('STD_VAL_WEB_19', function (value, element) {
      return this.optional(element) || element.files[0].size <= 5000000;
    }, "Upload gambar maksimal 5MB");
    jQuery.validator.addMethod("STD_VAL_WEB_20", function (value, element) {
      return this.optional(element) || /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value);
    }, "URL yang Anda masukkan tidak valid");
  },
  validateMe: function validateMe(id, valRules, valMessages) {
    validation.addMethods();
    $("#" + id).validate({
      rules: valRules,
      messages: valMessages,
      errorPlacement: function errorPlacement(error, element) {
        var ele = element.parents('.input');
        element.parents('.inputGroup').children('.alert.error').remove();
        error.insertAfter(ele);
        error.addClass('alert error');
      },
      success: function success(error) {
        error.parents('span.alert.error').remove();
      },
      wrapper: 'span'
    });
  },

  /* CR17682 OTP START */
  validateMultiple: function validateMultiple(id, valRules, valMessages) {
    validation.addMethods();
    $("#" + id).removeData("validator");
    $("#" + id).removeData("check");
    $("#" + id).removeData("confirm");
    $("#" + id).find('input').removeClass('error');
    var validator = $("#" + id).validate({
      rules: valRules,
      messages: valMessages,
      errorPlacement: function errorPlacement(error, element) {
        var ele = element.parents('.input');
        element.parents('.inputGroup').children('.alert.error').remove();
        error.insertAfter(ele);
        error.addClass('alert error');
      },
      success: function success(error) {
        error.parents('span.alert.error').remove();
      },
      wrapper: 'span'
    });
    validator.resetForm();
  },

  /* CR17682 OTP END*/
  submitTry: function submitTry(id) {
    if ($('.nio_select').length) {
      $('.nio_select').show();
    }

    if ($('.added_photo').length && !$('.imageAttachmentWrap.noApi').length) {
      $('.added_photo').show();
    }

    if ($('.tinymce').length) {
      $('.tinymce').show();
    }

    if ($('.stepForm').length) {
      var curr = $('.stepForm.active').index() + 1;
      $('.stepForm').addClass('active');
    } //after valid (have to make fn if not working)


    if ($('#' + id).valid()) {
      $('.nio_select').hide();
      $('.tinymce').hide();

      if (validation.FileApiSupported()) {
        $('.added_photo').hide();
      }

      return 'vPassed';
    } else {
      $('.nio_select').hide();
      $('.tinymce').hide();

      if (validation.FileApiSupported()) {
        $('.added_photo').hide();
      }

      return 'vError';
    }
  },
  FileApiSupported: function FileApiSupported() {
    return !!(window.File && window.FileReader && window.FileList && window.Blob);
  }
};
var grafik = {
  init: function init() {
    if ($('#grafikTransaksiUser').length) {
      $('#grafikTransaksiUser').empty();

      _ajax.getData('grafik-trx-institusi', 'post', null, function (data) {
        var total = 0;
        var dataLabel = [];
        var dataGraph = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraph.push(data.data[key]);
          total = total + data.data[key];
        });
        $('#legendTotalTrx').html(total);
        $('#grafikTransaksiUser').append('<canvas id="chart-transaksi-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-transaksi-user'), {
          type: 'bar',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraph,
              backgroundColor: '#CBCBCB',
              borderColor: '#CBCBCB',
              hoverBackgroundColor: '#0472B9'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            }
          }
        });
      });

      $('#grafikTransaksiUser').show();
    }

    if ($('#grafikStatusTrxUser').length) {
      $('#grafikStatusTrxUser').empty();

      _ajax.getData('grafik-status-trx-institusi', 'post', null, function (data) {
        var totalSuccess = 0;
        var totalGagal = 0;
        var dataLabel = [];
        var dataGraphPaid = [];
        var dataGraphExpired = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraphPaid.push(data.data[key]['paid']);
          dataGraphExpired.push(data.data[key]['expired']);
          totalSuccess = totalSuccess + data.data[key]['paid'];
          totalGagal = totalGagal + data.data[key]['expired'];
        });
        $('#legendTotalSuccess').html(totalSuccess);
        $('#legendTotalGagal').html(totalGagal);
        $('#grafikStatusTrxUser').append('<canvas id="chart-status-transaksi-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-status-transaksi-user'), {
          type: 'line',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraphPaid,
              fill: false,
              backgroundColor: '#0472B9',
              borderColor: '#0472B9'
            }, {
              label: '',
              data: dataGraphExpired,
              fill: false,
              backgroundColor: '#EB5757',
              borderColor: '#EB5757'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          }
        });
      });

      $('#grafikStatusTrxUser').show();
    }

    if ($('#grafikPemasukanUser').length) {
      $('#grafikPemasukanUser').empty();

      _ajax.getData('grafik-income-institusi', 'post', null, function (data) {
        var total = 0;
        var dataLabel = [];
        var dataGraph = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraph.push(data.data[key]);
          total = total + data.data[key];
        });
        var rupiah = '';
        var angkarev = total.toString().split('').reverse().join('');

        for (var i = 0; i < angkarev.length; i++) {
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        }

        $('#legendTotalIncome').html(rupiah.split('', rupiah.length - 1).reverse().join(''));
        $('#grafikPemasukanUser').append('<canvas id="chart-pemasukan-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-pemasukan-user'), {
          type: 'bar',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraph,
              backgroundColor: '#CBCBCB',
              borderColor: '#CBCBCB',
              hoverBackgroundColor: '#0472B9'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            }
          }
        });
      });

      $('#grafikPemasukanUser').show();
    }

    $("#dropdownMenuTransaksiUser a").click(function () {
      var selected = $(this).text();
      $('#dropdownMenuTransaksiUserValue').text(selected);
      $('#grafikTransaksiUser').hide();
      $('#grafikTransaksiUser').empty();
      var period = encodeURIComponent(window.btoa(selected));

      _ajax.getData('grafik-trx-institusi', 'post', {
        period: period
      }, function (data) {
        var total = 0;
        var dataLabel = [];
        var dataGraph = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraph.push(data.data[key]);
          total = total + data.data[key];
        });
        $('#legendTotalTrx').html(total);
        $('#grafikTransaksiUser').append('<canvas id="chart-transaksi-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-transaksi-user'), {
          type: 'bar',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraph,
              backgroundColor: '#CBCBCB',
              borderColor: '#CBCBCB',
              hoverBackgroundColor: '#0472B9'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            }
          }
        });
      });

      $('#grafikTransaksiUser').show();
    });
    $("#dropdownMenuStatusTransaksiUser a").click(function () {
      var selected = $(this).text();
      $('#dropdownMenuStatusTransaksiUserValue').text(selected);
      $('#grafikStatusTrxUser').hide();
      $('#grafikStatusTrxUser').empty();
      var period = encodeURIComponent(window.btoa(selected));

      _ajax.getData('grafik-status-trx-institusi', 'post', {
        period: period
      }, function (data) {
        var totalSuccess = 0;
        var totalGagal = 0;
        var dataLabel = [];
        var dataGraphPaid = [];
        var dataGraphExpired = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraphPaid.push(data.data[key]['paid']);
          dataGraphExpired.push(data.data[key]['expired']);
          totalSuccess = totalSuccess + data.data[key]['paid'];
          totalGagal = totalGagal + data.data[key]['expired'];
        });
        $('#legendTotalSuccess').html(totalSuccess);
        $('#legendTotalGagal').html(totalGagal);
        $('#grafikStatusTrxUser').append('<canvas id="chart-status-transaksi-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-status-transaksi-user'), {
          type: 'line',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraphPaid,
              fill: false,
              backgroundColor: '#0472B9',
              borderColor: '#0472B9'
            }, {
              label: '',
              data: dataGraphExpired,
              fill: false,
              backgroundColor: '#EB5757',
              borderColor: '#EB5757'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          }
        });
      });

      $('#grafikStatusTrxUser').show();
    });
    $("#dropdownMenuPemasukanUser a").click(function () {
      var selected = $(this).text();
      $('#dropdownMenuPemasukanUserValue').text(selected);
      $('#grafikPemasukanUser').hide();
      $('#grafikPemasukanUser').empty();
      var period = encodeURIComponent(window.btoa(selected));

      _ajax.getData('grafik-income-institusi', 'post', {
        period: period
      }, function (data) {
        var total = 0;
        var dataLabel = [];
        var dataGraph = [];
        Object.keys(data.data).forEach(function (key, index) {
          dataLabel.push(key);
          dataGraph.push(data.data[key]);
          total = total + data.data[key];
        });
        var rupiah = '';
        var angkarev = total.toString().split('').reverse().join('');

        for (var i = 0; i < angkarev.length; i++) {
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        }

        $('#legendTotalIncome').html(rupiah.split('', rupiah.length - 1).reverse().join(''));
        $('#grafikPemasukanUser').append('<canvas id="chart-pemasukan-user" width="400" height="400"></canvas>');
        new Chart(document.getElementById('chart-pemasukan-user'), {
          type: 'bar',
          data: {
            labels: dataLabel,
            datasets: [{
              label: '',
              data: dataGraph,
              backgroundColor: '#CBCBCB',
              borderColor: '#CBCBCB',
              hoverBackgroundColor: '#0472B9'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                  display: false
                }
              }]
            },
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                usePointStyle: true
              },
              display: false
            }
          }
        });
      });

      $('#grafikPemasukanUser').show();
    });
  },
  randomColor: function randomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';

    while (length--) {
      hex += chars[Math.random() * 16 | 0];
    }

    return hex;
  }
}; // Chart dashboard admin

if ($('#dashboard_admin').length) {
  Highcharts.chart('chart-pengajuan-upgrade-account', {
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series: [{
      name: '',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
          maxHeight: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
  Highcharts.chart('chart-income', {
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series: [{
      name: '',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500,
          maxHeight: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
  Highcharts.chart('chart-register-baru', {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });
  Highcharts.chart('chart-transaksi', {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });
  Highcharts.chart('chart-transaksi-institusi', {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });
  Highcharts.chart('chart-income-institusi', {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });
} // Chart dashboard user
// if($('#dashboard_user').length) {
//     new Chart(document.getElementById('chart-transaksi-user'),{
//         type: 'bar',
//         data: {
//             labels: ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6'],
//             datasets: [{
//                 label: '',
//                 data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB',
//                     '#CBCBCB'
//                 ],
//                 borderWidth: 1,
//                 hoverBackgroundColor: [
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9',
//                     '#0472B9'
//                 ],
//             }]
//         },
//         options: {
//             scales: {
//                 xAxes: [{
//                     gridLines: {
//                         color: "rgba(0, 0, 0, 0)",
//                     },
//                     ticks: {
//                         display: false
//                     }
//                 }],
//                 yAxes: [{
//                     gridLines: {
//                         color: "rgba(0, 0, 0, 0)",
//                     },
//                     ticks: {
//                         display: false
//                     }
//                 }],
//             },
//             responsive: true,
//             legend: {
//                 position : 'bottom',
//                 labels: {
//                     boxWidth: 10,
//                     usePointStyle: true,
//                 }
//             },
//         }
//     })
// }


$(document).ready(function () {
  $('.toggle').click(function (e) {
    e.preventDefault();
    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.parent().removeClass('active');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('.active').removeClass('active');
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.parent().toggleClass('active');
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });
  $('.toggle-acd-arrow').click(function (e) {
    e.preventDefault();
    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.parent().removeClass('active');
      $this.next('span a i').removeClass('pull-down');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('.active').removeClass('active');
      $this.parent().parent().find('li a span i .pull-down').removeClass('pull-down');
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.parent().toggleClass('active');
      $this.next().toggleClass('show');
      $this.next().next().toggleClass('pull-down');
      $this.next().slideToggle(350);
    }
  });
  $('.toggle-sidebar').click(function (e) {
    e.preventDefault();
    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.find('.pull-right').removeClass('fa fa-angle-down');
      $this.find('.pull-right').addClass('fa fa-angle-right');
      $this.next().removeClass('show');
      $this.parent().removeClass('active');
      $this.next('span a i').removeClass('pull-down');
      $this.next().slideUp(350);
    } else {
      $this.find('.pull-right').removeClass('fa fa-angle-right');
      $this.find('.pull-right').addClass('fa fa-angle-down');
      $this.parent().parent().find('li a span i .pull-down').removeClass('pull-down');
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.parent().toggleClass('active');
      $this.next().toggleClass('show');
      $this.next().next().toggleClass('pull-down');
      $this.next().slideToggle(350);
    }
  });

  if ($('.js-example-basic-single').length) {
    $('.js-example-basic-single').select2();
  }

  if ($('#tahunBuatKendaraan').length) {
    var today = new Date();
    $('#tahunBuatKendaraan').datetimepicker(); // $('#tahunBuatKendaraan').val('')

    $('#tahunRakitKendaraan').datetimepicker(); // $('#tahunRakitKendaraan').val('')
  }

  var logo = document.querySelector(".logo");
  var side = document.querySelector(".main-sidebar");
  var menutoggle = document.querySelector("#menu-toggle");
  var main = document.querySelector(".content-wrapper");
  var footer = document.querySelector(".content-footer");
  var pullright = document.querySelector(".pull-right");
  var user = document.querySelector(".user");
  menutoggle.addEventListener("click", function (e) {
    logo.classList.toggle("mini");
    side.classList.toggle("mini");
    main.classList.toggle("mini");
    footer.classList.toggle("mini");
    user.classList.toggle("mini");
  });
  var mobilemenu = document.querySelector("#btn-mobile");
  mobilemenu.addEventListener("click", function (e) {
    logo.classList.toggle("mbl");
    mobilemenu.classList.toggle("mbl");
    side.classList.toggle("mbl");
  });
});

function readURLuploadBukti(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var htmlPreview = '<img width="200" src="' + e.target.result + '" />' + '<p>' + input.files[0].name + '</p>';
      var wrapperZone = $(input).parent();
      var previewZone = $(input).parent().parent().find('.preview-zone');
      var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');
      wrapperZone.removeClass('dragover');
      previewZone.removeClass('hidden');
      boxZone.empty();
      boxZone.append(htmlPreview);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$('.show-password').on('click', function (e) {
  e.preventDefault();
  var label = $(this).parent().attr('for');
  console.log(label);
  var type = $('#' + label).attr('type');

  if (type === 'password') {
    $('#' + label).attr('type', 'text');
  } else {
    $('#' + label).attr('type', 'password');
  }
});
