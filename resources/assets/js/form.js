var form = {
	init:function(){
		$('form').attr('autocomplete', 'off');
		$.validator.addMethod("lettersonly", function(value, element) {
		 	return this.optional(element) || /^[a-z]+$/i.test(value);
		}, "Letters only please");

		$.validator.addMethod("regexp", function(value, element, regexpr) {
		 	return regexpr.test(value);
		}, "");
		$.each($('form'),function(key,val){
			$(this).validate(formrules[$(this).attr('id')]);
		});
		$('form').submit(function(e){
			e.preventDefault();
			// console.log('masuk sini')
			var form_id = $(this).attr('id');
			// console.log(form_id)
			form.validate(form_id);
		});

	},
	validate:function(form_id){

		var formVal = $('#'+form_id);
		// console.log(formVal, form_id)
		var message = formVal.attr('message');
		var agreement = formVal.attr('agreement');
		var defaultOptions = {
			errorPlacement: function(error, element) {
				if (element.parent().hasClass('input-group')) {
					error.appendTo(element.parent().parent());
				} else {
					var help = element.parents('.form-group').find('.help-block');
					if(help.length){
						error.appendTo(help);
					}else{
						error.appendTo(element.parents('.form-group'))
					}
				}
			},
			highlight:function(element, errorClass, validClass){
				alert('test')
				$(element).parents('.form-group').addClass('has-error');
			},
			unhighlight:function(element, errorClass, validClass){

				$(element).parents('.form-group').removeClass('has-error');
			},
		}
		var ops = Object.assign(defaultOptions,formrules[form_id]);

		var myform = formVal.validate(ops);
		$('button[type=reset]').click(function(){
			myform.resetForm();
		});
		if(formVal.valid()){
			// console.log(form_id)
			if(message!=null && message!=''){
				if(message.indexOf('|') > -1){
					var m_data = message.split('|');
					var m_text = m_data[0];
					var m_val = m_data[1];


					var t_data = m_val.split(';');
					var table = '<table class="table">';
					$.each(t_data,function(key,val){
						var c1 = val.split(':')[0];
						var c2 = form.find('input[name='+val.split(':')[1]+'],select[name='+val.split(':')[1]+']').val();
						table += '<tr><td>'+c1+'</td><td>'+c2+'</td></tr>';
					});
					table +='</table>';


					message = m_text+table;
				}
				ui.popup.confirm('Konfirmasi',message,'form.submit("'+form_id+'")');
			}
			else if(agreement != null && agreement != '') {
				message = $("#"+agreement).html();
				ui.popup.agreement('Persetujuan Agen Baru', message, 'form.submit("'+form_id+'")');
			}
			else{
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
		}else{
			ui.popup.show('error','Harap cek isian','Form Tidak Valid');
		}
	},
	submit:function(form_id){
		var form = $('#'+form_id);
		var url = form.attr('action');
		var ops = formrules[form_id];
		if(ops==null){
			ops={};
		}
		var i =1;
		var input = $('.form-control');
		var data = form.serialize();
		var isajax = form.attr('ajax');
		var isFilter = form.attr('filter');
		if(isajax=='true'){
			if(form_id=='payform'){
				form_id = $('#'+form_id).attr('for');
			}
			ajax.submitData(url,data,form_id);
		}else if(isFilter=='true'){
			table.filter(form_id,data);
		}else{
			other.encrypt(data,function(err,encData){
				if(err){
					callback(err);
				}else{
					var encryptedElement = $('<input type="hidden" name="data" />');
					$(encryptedElement).val(encData['data']);
					form.find('select,input:not("input[type=file],input[type=hidden][name=_token],input[name=captcha]")')
						.attr('disabled','true')
						.end()
						.append(encryptedElement)
						.unbind('submit')
						.submit();
				}
			});
		}

	}
}
if ($('.select-provinsi').length) {
	$('.select-provinsi').empty();
	$('.select-provinsi').append('<label>Provinsi</label>' +
		'<select name="provinsi" id="provinsi" class="form-control upgrade-input">' +
		'<option></option>' +
		'</select>'
	);

	$('.select-kota').empty();
	$('.select-kota').append('<label>Kota/Kabupaten</label>' +
		'<select name="kota" id="kota" class="form-control upgrade-input">' +
		'<option></option>' +
		'</select>'
	);

	ajax.getData('get-provinsi', 'get', null, function (data) {
		// console.log(data)
		var dataProvinsi = [];
		for (var i = 0; i < data.length; i++) {
			var option = '<option value="' + data[i].province_id + '_' + data[i].province + '">' + data[i].province + '</option>'
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
			var province = getProvince.split("_")
			$("#mdl_msg").css('display', 'block');
			$('#kurir').empty();
			ajax.getData('get-kota', 'get', {
				province_id: province[0],
				province: province[1]
			}, function (data) {

				var dataKota = [];

				$('.select-kota').empty();
				$('.select-kota').append('<label>Kota/Kabupaten</label>' +
					'<select name="kota" id="kota" class="form-control upgrade-input">' +
					'<option></option>' +
					'</select>'
				);

				$("#kota").select2({
					placeholder: 'Pilih Kota'
				});

				for (var i = 0; i < data.length; i++) {
					var option = '<option value="' + data[i].city_id + '">' + data[i].type + ' ' + data[i].city_name + '</option>'

					dataKota.push(option);
				}


				$("#kota").append(dataKota).val("").trigger("change");
				$('#kota').change(function () {
					$(".shp__checkout__loader").css('display', 'flex');
					$("#mdl_msg").css('display', 'none');
					
					var getCityId = $('#kota').val();
					ajax.getData('get-ongkir', 'post', {
						city_id: getCityId,
					}, function (data) {
						var count= 1;
						$.each(data['jne'], function (key, val) {
							$.each(val['costs'], function (key1, val1) {
								$('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/jne-'+count+'/" value="' + val1['cost'][0]['value'] + '"  service="'+ val['code'] + " " + val1['service'] + '" ><img src="/shop/logo/jne.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">'+ val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">'+ val1['cost'][0]['etd'] + ' Hari</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/jne-'+count+'/)">Pilih</button></div>');
								count++
							});
						});
						$.each(data['tiki'], function (key, val) {
							$.each(val['costs'], function (key1, val1) {
								$('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/tiki-'+count+'/" value="' +val1['cost'][0]['value']+ '" service="'+ val['code'] + " " + val1['service'] + '"><img src="/shop/logo/tiki.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">'+ val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">'+ val1['cost'][0]['etd'] + ' Hari</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/tiki-'+count+'/)">Pilih</button></div>');
								count++
							});
						});
						$.each(data['pos'], function (key, val) {
							$.each(val['costs'], function (key1, val1) {
								$('#kurir').append('<div class="col-6"><div><input class="form-check-input" type="hidden" name="exampleRadios" id="/pos-'+count+'/" value="' +val1['cost'][0]['value']+ '"  service="'+ val['code'] + " " + val1['service'] + '"><img src="/shop/logo/pos.jpg" alt="" width="50px"><br><label class="form-check-label" for="exampleRadios2">'+ val['code'] + " " + val1['service'] + '</label><br><span class="estimasi">'+ val1['cost'][0]['etd'] + '</span></div></div><div class="col-4"><p>' + 'Rp ' + format(val1['cost'][0]['value']) + '</p></div><div class="col-2"><button onClick="selectShipping(/pos-'+count+'/)">Pilih</button></div>');
								count++
							});
						});
						$(".shp__checkout__loader").css('display', 'none');
					});
					
				});
			});
		});

		
	});
		
	
}

function format(data){
	var rupiah = '';		
	var angkarev = data.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return rupiah.split('',rupiah.length-1).reverse().join('');
}   

function selectShipping(id) {
	// console.log(id)
	$('#selected-shipping').empty();
	var fee = document.getElementById(id).value;
	var total = document.getElementById('total').value;
	var service = document.getElementById(id).getAttribute('service');
	$('#selected-shipping').append('<div class="row"><div class="col-12"><p>Opsi Pengiriman</p></div></div><div class="row"><div class="col-6">'+service+'</div><div class="col-6">Rp.'+format(fee)+'</div></div>');
	var total_checkout = parseFloat(total)+parseFloat(fee);
	
	// console.log(total_checkout)
	// console.log(format(total_checkout))
	// console.log(format(total))
	$('#fee-shipping').html('Rp'+format(fee));
	$('#total-all').html('Rp'+format(total_checkout));
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
	var data = form.serialize();
	// console.log(url + ' ' + data + '' + form)
	ajax.submitData(url, data, form_id);
	$('#detailPenjualan').modal('hide');
});
$('#submitApprove').on('click', function (e) {
	// console.log('submit modal')
	var form = $('#formApprovePenjualan');
	var url = form.attr('action');
	var form_id = form.attr('id');
	var data = form.serialize();
	// console.log(url, data, form_id)
	// console.log(url + ' ' + data + '' + form)
	ajax.submitData(url, data, form_id);
	$('#detailPenjualan').modal('hide');
});
$("input[type=radio][name=pembatalan]").change(function () {
	// console.log($(this).val())
	if ($(this).val() == 'lainnya') {
		$("#inputLainnya").css("display", "block")
	} else {
		$("#inputLainnya").css("display", "none")
		$('#lainnya').val('')
	}
});

$('.add-to-cart').on('click', function (e) {
	// console.log($('input[name="id_produk"]').val())
	// console.log($(this).parent().find('input[name="id_produk"]').val())
	var id = $(this).parent().find('input[name="id_produk"]').val();
	var form = '#addToChart' + '_' + id;
	var form = $(form)
	var url = form.attr('action');
	var form_id = form.attr('id');
	var data = form.serialize();
	// console.log(url, data, form_id)
	// console.log(url + ' ' + data + '' + form)
	ajax.submitData(url, data, form_id);
	// $('#detailPenjualan').modal('hide');
});

$('.add-wishlist').on('click', function (e) {
	var id = $(this).parent().find('input[name="id_produk"]').val();
	var form = '#addToWishlist' + '_' + id;
	var form = $(form)
	var url = form.attr('action');
	var form_id = form.attr('id');
	var data = form.serialize();
	ajax.submitData(url, data, form_id);
});

// $('.timbel-ganti').click(function() {
// 	console.log($(this).val() + ' ' + (this.checked ? 'checked' : 'unchecked'));
// });
// console.log('masuk tye')
if ($('#tableBuatPenawaran').length) {
	ajax.getData('/kilometer/get-data-penawaran', 'post', {
	}, function (data) {
		$.each(data, function (key, value) {
			$('#checklist_periksa_'+key).click(function () {
				if (this.checked) {
					$('#checklist_periksa_'+key).val("1");
					// console.log($('#checklist_periksa_'+key).val())
					document.getElementById('checklist_periksa_'+key+'_hidden').disabled = true;
				} else {
					$('#checklist_periksa_'+key).val("0");
					// console.log($('#checklist_periksa_'+key).val())
					document.getElementById('checklist_periksa_'+key+'_hidden').disabled = false;
				}
			})
			$('#checklist_ganti_'+key).click(function () {
				if (this.checked) {
					$('#checklist_ganti_'+key).val("1");
					// console.log($('#checklist_ganti_'+key).val())
					document.getElementById('checklist_ganti_'+key+'_hidden').disabled = true;
				} else {
					$('#checklist_ganti_'+key).val("0");
					// console.log($('#checklist_ganti_'+key).val())
					document.getElementById('checklist_ganti_'+key+'_hidden').disabled = false;
				}
			})
		})
	});
}

if ($('#tableBuatSpk').length) {
	var penawaran_id = $('#penawaran_id').val();
	var penawaran_id = encodeURIComponent(window.btoa(penawaran_id));
	var jumlah = [];

	ajax.getData('/kilometer/get-data-detail-penawaran/'+penawaran_id, 'post', {
	}, function (data) {
		console.log(data)
		$.each(data, function (key, value) {
			// console.log(value.)
			$('#status_acc_'+key).click(function () {
				if (this.checked) {
					$('#status_acc_'+key).val("1");
					// console.log($('#status_acc_'+key).val())
					document.getElementById('status_acc_'+key+'_hidden').disabled = true;
				} else {
					$('#status_acc_'+key).val("0");
					// console.log($('#status_acc_'+key).val())
					document.getElementById('status_acc_'+key+'_hidden').disabled = false;
				}
			})
			if (value.acc == 1) {
				jumlah.push = (value.ganti_biaya, value.periksa_biaya)
				// jumlah.push = (value.periksa_biaya)
			}
		})
		console.log(jumlah)
		var total = jumlah.reduce(myFunc);

		function myFunc(total, num) {
			return total + num;
		}

		$('totalPenawaran').val(total)
	});
}

if ($('#tableEditSpk').length) {
	var spk_id = $('#spk_id').val();
	var spk_id = encodeURIComponent(window.btoa(spk_id));

	var jumlah = [];

	// ajax.getData('/spk/get-data-detail-spk/'+spk_id, 'post', {
	// }, function (data) {
	// 	var jumlah = data.length;

	// });
}

$('#btnInquryKendaraan').on('click', function () {
	$('#pilihanMobil').hide();
	$('#listPilihanMobil').empty();

	var merk = $('#merkKendaraan').val();
	// console.log(merk);
	if (!!merk) {
		var data = {value: merk};
		ajax.getData('pelanggan/get-master-kendaraan', 'post', data, function(data){
			// console.log(data)
			if (data.length > 0) {
				$('#pilihanMobil').show();
				var dataRadio = []
				var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
				var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
				var transmisi = ['nol', 'Manual', 'Automatic'];
				for (let i = 0; i < data.length; i++) {
					var option = '<tr>'+
									'<th scope="row"><div class="form-check"><input class="form-check-input" type="radio" name="kendaraanMaster" id="kendaraanMaster" value="'+data[i]['id']+'"></div></th>'+
									'<td>'+data[i]['merk_mobil']+'</td>'+
									'<td>'+data[i]['tipe_mobil']+'</td>'+
									'<td>'+data[i]['jenis_mobil']+'</td>'+
									'<td>'+data[i]['silinder']+' silinder</td>'+
									'<td>'+transmisi[data[i]['jenis_transmisi']]+'</td>'+
									'<td>'+spooring[data[i]['kelas_spooring']]+'</td>'+
									'<td>'+tuneup[data[i]['kelas_tuneup']]+'</td>'+
								'</tr>';
					dataRadio.push(option);
				}
				var table = '<div style="overflow:auto">'+
								'<table class="table table-bordered" style="white-space:nowrap">'+
									'<thead>'+
										'<tr>'+
											'<th scope="col">#</th>'+
											'<th scope="col">Merk</th>'+
											'<th scope="col">Tipe</th>'+
											'<th scope="col">Jenis</th>'+
											'<th scope="col">Silinder</th>'+
											'<th scope="col">Transmisi</th>'+
											'<th scope="col">Spooring</th>'+
											'<th scope="col">Tune up</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
										dataRadio.join("")+
									'</tbody>'+
								'</table>'+
							'</div>';
				// console.log(table)
				$("#listPilihanMobil").append(table);
			}
		});	
	} else {
		$('#pilihanMobil').hide();
		$('#listPilihanMobil').empty();
	}
})

$('#btnInquryKendaraanEdit').on('click', function () {
	$('#pilihanMobilEdit').hide();
	$('#listPilihanMobilEdit').empty();

	var merk = $('#merkKendaraanEdit').val();
	// console.log(merk);
	if (!!merk) {
		var data = {value: merk};
		ajax.getData('pelanggan/get-master-kendaraan', 'post', data, function(data){
			// console.log(data)
			if (data.length > 0) {
				$('#pilihanMobilEdit').show();
				var dataRadio = []
				var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
				var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
				var transmisi = ['nol', 'Manual', 'Automatic'];
				for (let i = 0; i < data.length; i++) {
					var option = '<tr>'+
									'<th scope="row"><div class="form-check"><input class="form-check-input" type="radio" name="kendaraanMaster" id="kendaraanMaster" value="'+data[i]['id']+'"></div></th>'+
									'<td>'+data[i]['merk_mobil']+'</td>'+
									'<td>'+data[i]['tipe_mobil']+'</td>'+
									'<td>'+data[i]['jenis_mobil']+'</td>'+
									'<td>'+data[i]['silinder']+' silinder</td>'+
									'<td>'+transmisi[data[i]['jenis_transmisi']]+'</td>'+
									'<td>'+spooring[data[i]['kelas_spooring']]+'</td>'+
									'<td>'+tuneup[data[i]['kelas_tuneup']]+'</td>'+
								'</tr>';
					dataRadio.push(option);
				}
				var table = '<div style="overflow:auto">'+
								'<table class="table table-bordered" style="white-space:nowrap">'+
									'<thead>'+
										'<tr>'+
											'<th scope="col">#</th>'+
											'<th scope="col">Merk</th>'+
											'<th scope="col">Tipe</th>'+
											'<th scope="col">Jenis</th>'+
											'<th scope="col">Silinder</th>'+
											'<th scope="col">Transmisi</th>'+
											'<th scope="col">Spooring</th>'+
											'<th scope="col">Tune up</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
										dataRadio.join("")+
									'</tbody>'+
								'</table>'+
							'</div>';
				// console.log(table)
				$("#listPilihanMobilEdit").append(table);
			}
		});	
	} else {
		$('#pilihanMobilEdit').hide();
		$('#listPilihanMobilEdit').empty();
	}
})

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

$('#20_cekGanti').change(function(){
	if (this.checked) {
		$('.tuneUpBG').css("background-color", "yellow");
		ajax.getData('service/get-tuneup', 'get', null, function (data) {
			console.log(data)
			for (let i = 0; i < data.length; i++) {
				if (data[i]['periksa_check'] == 1) {
					$('#'+data[i]['item_service_id']+'_cekPeriksa').prop('checked', true);
					$('.'+data[i]['item_service_id']+'_cekPeriksaBG').css("background-color", "yellow");
				} else if (data[i]['ganti_check'] == 1) {
					$('#'+data[i]['item_service_id']+'_cekGanti').prop('checked', true);
					$('.'+data[i]['item_service_id']+'_cekGantiBG').css("background-color", "yellow");
				}
			}
		})
	} else {
		$('.tuneUpBG').css("background-color", "white");
		ajax.getData('service/get-tuneup', 'get', null, function (data) {
			console.log(data)
			for (let i = 0; i < data.length; i++) {
				if (data[i]['periksa_check'] == 1) {
					$('#'+data[i]['item_service_id']+'_cekPeriksa').prop('checked', false);
					$('.'+data[i]['item_service_id']+'_cekPeriksaBG').css("background-color", "#ffc75e");
				} else if (data[i]['ganti_check'] == 1) {
					$('#'+data[i]['item_service_id']+'_cekGanti').prop('checked', false);
					$('.'+data[i]['item_service_id']+'_cekGantiBG').css("background-color", "#fa7070");
				}
			}
		})
	}
})