var table = {
	init:function(){
		var imageDetail = '../image/icon/main/eye-solid.png';
		var imageEdit = '../image/icon/main/pen-square-solid.png';
		var imageDeactive = '../image/icon/main/deactive.png';
		var imageActive = '../image/icon/main/activae.png';
		var ops ={};

		if ($('#tableProduk').length) {
			// console.log('produk')
			var column = [
				{'data':null},
				{'data':'brand_id'},
				{'data':'name'},
				{'data':'price'},
				{'data':'description'},
				{'data':null},
			];
			columnDefs = [
				{
					"targets": 0,
					"data": null,
					"render": function(data, type, full, meta){
						return meta.row + meta.settings._iDisplayStart + 1;
					}
				},
				{
					"targets": 5,
					"data": "id",
					"render": function(data, type, full, meta){
						// console.log(full.id)
						var id = encodeURIComponent(window.btoa(full.id));

						var data = '<div class="action-table">'+
										'<a href="/edit-produk/' + id + '">' +
											'<div class="glyphicon glyphicon-pencil">'+
												'<i class="fas fa-pen-square"></i>'+
											'</div>'+
										'</a>'+
									'</div>'+
									'<div class="action-table">'+
										'<a href="/delete-produk/' + id + '">' +
												'<i class="fa fa-trash"></i>'+
										'</a>'+
									'</div>';
							return data;
					}
				}
			];
			table.serverSide('tableProduk',column,'produk',null,columnDefs);
		}

		if ($('#tableManajemenKilometer').length) {
			$('#filterStatusKm').on('change', function() {
				// table.draw();
				var data = $("#filterStatusKm option:selected").val();
				$('#dataFilterStatus').val(data)
				var custParam = data
				// console.log(data)
				var column = [
					{'data':'tanggal_kilometer'},
					{'data':'nama_cust'},
					{'data':'tipe_mobil'},
					{'data':'km_sebelum'},
					{'data':'km_terbaru'},
					{'data':'status_penawaran'},
				];
	
				columnDefs = [
					{
						"targets": 5,
						"data": "status_penawaran",
						"render": function(data, type, full, meta){
							var data = ''
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
					},
					{
						"targets": 6,
						"data": "id",
						"orderable": false,
						"render": function(data, type, full, meta){
							console.log(full)
							var id = encodeURIComponent(window.btoa(full.kilometer_id));
							
							var data = '<div class="action-table">'+
											'<a href="/kilometer/detail-manajemen-km/'+id+'" title="Lihat" class="detailKilometer">'+
												'<div class="icon-dropdown-menu">'+
													'<i class="fas fa-eye"></i>'+
												'</div>'+
											'</a>'+
										'</div>';
							   return data;
						}
					}
				];
				table.serverSide('tableManajemenKilometer',column,'kilometer/get-kilometer',custParam,columnDefs);
				var tbody = $('#tableManajemenKilometer').find('tbody');
				tbody.html('');
			})
			var column = [
				{'data':'tanggal_kilometer'},
				{'data':'nama_cust'},
				{'data':'tipe_mobil'},
				{'data':'km_sebelum'},
				{'data':'km_terbaru'},
				{'data':'status_penawaran'},
			];

			columnDefs = [
				{
					"targets": 5,
					"data": "status_penawaran",
					"render": function(data, type, full, meta){
						var data = ''
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
				},
				{
					"targets": 6,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.kilometer_id));
						
						var data = '<div class="action-table">'+
										'<a href="/kilometer/detail-manajemen-km/'+id+'" title="Lihat" class="detailKilometer">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenKilometer',column,'kilometer/get-kilometer',null,columnDefs);
		}
		
		if ($('#tableKendaraan').length) {
			var custParam = $('#kendaraanPelangganId').val();

			var column = [
				{'data': null},
				{'data':'nopol'},
				{'data':'merk_mobil'},
				{'data':'tipe_mobil'},
				{'data':'jenis_mobil'}
			];

			columnDefs = [
				{
					"targets": 0,
					"data": null,
					"render": function(data, type, full, meta){
						return meta.row + meta.settings._iDisplayStart + 1;
					}
				},
				{
					"targets": 5,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.id));

						var data = '<div class="action-table">'+
										'<a href="#" title="Lihat" class="detailKendaraan">'+
											'<i class="fas fa-eye margin-right-10"></i>'+
										'</a>'+
										'<a href="#" title="Hapus" class="deleteKendaraan">'+
											'<i class="fas fa-trash"></i>'+
										'</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableKendaraan',column,'kilometer/get-kendaraan',custParam,columnDefs);
		}
		if ($('#tablePenawaran').length) {
			var custParam = $('#kilometerIdValue').val();

			var column = [
				{'data':'tanggal_dibuat'},
				{'data':'no_penawaran'},
				{'data':'tanggal_servis'},
				{'data':'km_sebelum'},
				{'data':'status_penawaran'}
			];

			columnDefs = [
				{
					"targets": 4,
					"data": "status_penawaran",
					"render": function(data, type, full, meta){
						var data = ''
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
				},

				{
					"targets": 5,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						// var id = encodeURIComponent(window.btoa(full.penawaran_id));
						// var tgl_servis = encodeURIComponent(window.btoa(full.tanggal_servis));
						var data = [full.penawaran_id, full.tanggal_servis, full.spk_id];
						var data = encodeURIComponent(window.btoa(data));

						if (full.status_penawaran == 3) {
							var data = '<div class="action-table">'+
											'<a href="/kilometer/get-detail-penawaran/'+data+'" title="Lihat" class="detailPenawaran disabled">'+
												'<div class="icon-dropdown-menu">'+
													'<i class="fas fa-eye"></i>'+
												'</div>'+
											'</a>'+
										'</div>';
						} else {
							var data = '<div class="action-table">'+
											'<a href="/kilometer/get-detail-penawaran/'+data+'" title="Lihat" class="detailPenawaran">'+
												'<div class="icon-dropdown-menu">'+
													'<i class="fas fa-eye"></i>'+
												'</div>'+
											'</a>'+
										'</div>';
						}

		               	return data;
					}
				}
			];
		 	table.serverSide('tablePenawaran',column,'kilometer/get-penawaran',custParam,columnDefs);
		}
		if ($('#tableManajemenSpk').length) {
			$('#filterSpkStatus').on('change', function() {
				// table.draw();
				var data = $("#filterSpkStatus option:selected").val();
				$('#dataFilterStatus').val(data)
				var custParam = data
				// console.log(data)
				var column = [
					{'data':'tanggal_spk'},
					{'data':'nama_cust'},
					{'data':'tipe_mobil'},
					{'data':'tanggal_servis'},
					{'data':'mekanik'},
					{'data':'status'},
				];
	
				columnDefs = [
					{
						"targets": 5,
						"data": "id",
						"orderable": false,
						"render": function(data, type, full, meta){
							var data = ''
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
					},
					{
						"targets": 6,
						"data": "id",
						"orderable": false,
						"render": function(data, type, full, meta){
							var data = [full.id, full.tanggal_servis, full.nama_cust, full.tipe_mobil, full.no_spk, full.mekanik];
							var data = encodeURIComponent(window.btoa(data));
	
							// var id = encodeURIComponent(window.btoa(full.id));
	
							var data = '<div class="action-table">'+
											'<a href="/spk/detail-spk/'+data+'" title="Lihat" class="detailPenawaran">'+
												'<div class="icon-dropdown-menu">'+
													'<i class="fas fa-eye"></i>'+
												'</div>'+
											'</a>'+
										'</div>';
							   return data;
						}
					}
				];
				table.serverSide('tableManajemenSpk',column,'spk/get-spk',custParam,columnDefs);
				var tbody = $('#tableManajemenSpk').find('tbody');
				tbody.html('');
			})
			var column = [
				{'data':'tanggal_spk'},
				{'data':'nama_cust'},
				{'data':'tipe_mobil'},
				{'data':'tanggal_servis'},
				{'data':'mekanik'},
				{'data':'status'},
			];

			columnDefs = [
				{
					"targets": 5,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var data = ''
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
				},
				{
					"targets": 6,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var data = [full.id, full.tanggal_servis, full.nama_cust, full.tipe_mobil, full.no_spk, full.mekanik];
						var data = encodeURIComponent(window.btoa(data));

						// var id = encodeURIComponent(window.btoa(full.id));

						var data = '<div class="action-table">'+
										'<a href="/spk/detail-spk/'+data+'" title="Lihat" class="detailPenawaran">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenSpk',column,'spk/get-spk',null,columnDefs);
		}
		if ($('#tableManajemenPelanggan').length) {
			var column = [
				{'data':null,"orderable": false},
				{'data':'nama_cust',"orderable": false},
				{'data':'alamat_cust',"orderable": false},
				{'data':'notelp_cust',"orderable": false},
				{'data':'nama_group',"orderable": false},
			];

			columnDefs = [
				{
					"targets": 0,
					"data": null,
       				render: function (data, type, row, meta) {
                 		return meta.row + meta.settings._iDisplayStart + 1;
                	}
				},
				{
					"targets": 5,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.id));
						
						var data = '<div class="action-table">'+
										'<a href="#" title="Lihat" class="detailPelanggan">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
										'<a href="/pelanggan/hapus-pelanggan/'+encodeURIComponent(window.btoa(full.pelanggan_id))+'" title="Hapus" class="deletePelanggan">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eraser"></i>'+
											'</div>'+
										'</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenPelanggan',column,'pelanggan/get-pelanggan',null,columnDefs);
		}
		if ($('#tableManajemenUser').length) {
			var column = [
				{'data':null, "orderable": false},
				{'data':'name', "orderable": false},
				{'data':'email', "orderable": false},
				{'data':'role', "orderable": false},
			];

			columnDefs = [
				{
					"targets": 0,
					"data": null,
       				render: function (data, type, row, meta) {
                 		return meta.row + meta.settings._iDisplayStart + 1;
                	}
				},
				{
					"targets": 3,
					"data": "role",
					"orderable": false,
					"render": function(data, type, full, meta){
						if (full.role == 0) {
							var data = '<span class="bg-green rounded-pill py-2 px-4">Admin</span>';
						} else if (full.role == 1) {
							var data = '<span class="bg-blue rounded-pill py-2 px-4">Pelanggan</span>';
						}
						
		               	return data;
					}
				},
				{
					"targets": 4,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.id));
						
						var data = '<div class="action-table">'+
										'<a href="#" title="Lihat" class="detailUser">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
										'<a href="/user/hapus-user/'+id+'" title="Hapus" class="deleteUser">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eraser"></i>'+
											'</div>'+
										'</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenUser',column,'user/get-user',null,columnDefs);
		}
		if ($('#tableManajemenItemService').length) {
			var column = [
				{'data':null, "orderable": false},
				{'data':'merk_mobil', "orderable": false},
				{'data':'tipe_mobil', "orderable": false},
				{'data':'jenis_transmisi', "orderable": false},
				{'data':'kelas_tuneup', "orderable": false},
				{'data':'kelas_spooring', "orderable": false},
			];

			columnDefs = [
				{
					"targets": 0,
					"data": null,
       				render: function (data, type, row, meta) {
                 		return meta.row + meta.settings._iDisplayStart + 1;
                	}
				},
				{
					"targets": 3,
					"data": "jenis_transmisi",
					"orderable": false,
					"render": function(data, type, full, meta){
						var transmisi = ['nol', 'Manual', 'Automatic'];
						var data = transmisi[full.jenis_transmisi];
						
		               	return data;
					}
				},
				{
					"targets": 4,
					"data": "kelas_tuneup",
					"orderable": false,
					"render": function(data, type, full, meta){
						var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
						var data = tuneup[full.kelas_tuneup];
						
		               	return data;
					}
				},
				{
					"targets": 5,
					"data": "kelas_spooring",
					"orderable": false,
					"render": function(data, type, full, meta){
						var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
						var data = spooring[full.kelas_spooring];
						
		               	return data;
					}
				},
				{
					"targets": 6,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.id));
						
						var data = '<div class="action-table">'+
										'<a href="/service/view-edit-service/'+id+'" title="Lihat" class="detailService">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
										// '<a href="#" title="Generate Password" class="generatePassword">'+
										// 	'<div class="icon-dropdown-menu">'+
										// 		'<i class="fas fa-unlock-alt"></i>'+
										// 	'</div>'+
										// '</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenItemService',column,'service/get-service',null,columnDefs);
		}
	},
	filter:function(id,value){
		var imageDetail = '../image/icon/main/eye-solid.png';
		var imageEdit = '../image/icon/main/pen-square-solid.png';
		var imageDeactive = '../image/icon/main/deactive.png';
		var imageActive = '../image/icon/main/activae.png';

		$('.modal').modal('hide');
		if (id == 'filterItemService') {
			var column = [
				{'data':null, "orderable": false},
				{'data':'merk_mobil', "orderable": false},
				{'data':'tipe_mobil', "orderable": false},
				{'data':'jenis_transmisi', "orderable": false},
				{'data':'kelas_tuneup', "orderable": false},
				{'data':'kelas_spooring', "orderable": false},
			];

			columnDefs = [
				{
					"targets": 0,
					"data": null,
       				render: function (data, type, row, meta) {
                 		return meta.row + meta.settings._iDisplayStart + 1;
                	}
				},
				{
					"targets": 3,
					"data": "jenis_transmisi",
					"orderable": false,
					"render": function(data, type, full, meta){
						var transmisi = ['nol', 'Manual', 'Automatic'];
						var data = transmisi[full.jenis_transmisi];
						
		               	return data;
					}
				},
				{
					"targets": 4,
					"data": "kelas_tuneup",
					"orderable": false,
					"render": function(data, type, full, meta){
						var tuneup = ['nol', 'Gasoline Small', 'Gasoline Large', 'Diesel'];
						var data = tuneup[full.kelas_tuneup];
						
		               	return data;
					}
				},
				{
					"targets": 5,
					"data": "kelas_spooring",
					"orderable": false,
					"render": function(data, type, full, meta){
						var spooring = ['nol', 'Kecil (&lt; 1300CC)', 'Sedang (&lt; 1300CC - 1500CC)', 'Besar (&gt; 1500CC)'];
						var data = spooring[full.kelas_spooring];
						
		               	return data;
					}
				},
				{
					"targets": 6,
					"data": "id",
					"orderable": false,
					"render": function(data, type, full, meta){
						var id = encodeURIComponent(window.btoa(full.id));
						
						var data = '<div class="action-table">'+
										'<a href="/service/view-edit-service/'+id+'" title="Lihat" class="detailService">'+
											'<div class="icon-dropdown-menu">'+
												'<i class="fas fa-eye"></i>'+
											'</div>'+
										'</a>'+
										// '<a href="#" title="Generate Password" class="generatePassword">'+
										// 	'<div class="icon-dropdown-menu">'+
										// 		'<i class="fas fa-unlock-alt"></i>'+
										// 	'</div>'+
										// '</a>'+
									'</div>';
		               	return data;
					}
				}
			];
		 	table.serverSide('tableManajemenItemService',column,'service/get-service',value,columnDefs);
		}
	},
	getData:function(url,params,callback){
		$.ajax({
			url:url,
			type:'post',
			data:params,
			success:function(result){
				if(!result.error){
					callback(null,result.data);
				}else{
					callback(data);
				}
			}
		})
	},
	clear:function(id){
		var tbody = $('#'+id).find('tbody');
		tbody.html('');
		if($('#total').length){
			$('#total').html('');
		}
		if($('#order_id').length){
			$('#order_id').val('');
		}
		if($('input[name=jumlah_pembayaran]').length){
			$('input[name=jumlah_pembayaran]').val('');
		}
	},
	serverSide:function(id,columns,url,custParam=null,columnDefs=null){
		var urutan = [0, 'asc'];
		if (id == 'tableProduct') {
			urutan = [1, 'asc'];
		}

		var search = true;
		if (id == 'tableRekapPoint' || id == 'tableRekapSaldo' || id == 'tableSlider') {
			search = false;
		}

		var svrTable = $("#"+id).DataTable({
			processing:true,
			serverSide:true,
			columnDefs:columnDefs,
			columns:columns,
			// responsive: true,
			scrollX: true,
			// scrollY: true,
			// pageLength:10,
			ajax:function(data, callback, settings){
				data.param = custParam
				ajax.getData(url,'post',data,function(result){
					// console.log(result)
					if(result.status=='reload'){
						ui.popup.show('confirm',result.messages.title,result.messages.message,'refresh');
					}else if(result.status=='logout'){
	        			ui.popup.alert(result.messages.title,result.messages.message,'logout');
	        		}else{
	        			if (id == 'tableEndUserReport') {
	        				$('#totalAmountDate').html('Rp '+result.total_amount)
						}
						
						callback(result);
					}
				})
			},
			bDestroy: true,
			searching:search,
			order:urutan,
			ordering:true,
		})
		
		console.log($('#tableProduk_paginate').val());
		$('div.dataTables_filter input').unbind();
        $('div.dataTables_filter input').bind('keyup', function (e) {
            if (e.keyCode == 13){
	          svrTable.search(this.value).draw();
            }
        });
	},
	setAndPopulate:function(id,columns,data,columnDefs,ops,order){

		var orderby = order? order:[0,"asc"];
		var option = {
			"data": data,
			"drawCallback": function( settings ) {

			},
			tableTools: {
				"sSwfPath": "assets/plugins/datatables/TableTools/swf/copy_csv_xls_pdf.swf",
					"aButtons": [ "xls", "csv", "pdf" ]
			},
			"columns": columns,
			"pageLength": 10,
			"order": [orderby],
			"bDestroy": true,
			"lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
			"aoColumnDefs": columnDefs,
			"scrollX": true,
			"scrollY": true,
			"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	        "buttons": [
	            'csv','pdf'
	        ],
			"rowCallback": function( row, data ) {
				if(id == "tbl_notification") {
					if(data.read == "1") {
						$(row).css('background-color', '#D4D4D4');
					}
				}
				if(id == "tbl_mitra" || id == "tbl_user" || id == "tbl_agent_approved") {
					if(data.status == "0") {
						$(row).css('background-color', '#FF7A7A');
					}
				}
			}
		};
		if(ops!=null){
			$.extend(option,ops);
		}
		var tbody = $('#'+id).find('tbody');

		var t = $('#' + id).DataTable(option);
		t.on( 'order.dt search.dt', function () {
			if (id == 'tableFitur') {

			}else{
		        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
		            cell.innerHTML = i+1;
		        } );
			}
	    } )
	    .draw();
	}
}
/* Detail Kendaraan */
$('#tableKendaraan tbody').on('click', 'a.detailKendaraan', function (e) {
	var table = $('#tableKendaraan').DataTable();
	var dataRow = table.row($(this).closest('tr')).data();
	// console.log(dataRow)
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

function showDetailPesananModal (param) {
	ajax.getData('/pesanan/get-detail-pesanan/'+param, 'get', null, function(data){
		// console.log(data)
		var day = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		var order = new Date(data.created_at)
		var orderDay = order.getDay()
		var orderDate = order.getDate()
		var orderMonth = order.getMonth()+1
		var orderYear = order.getFullYear()
		var orderHour = order.getHours()
		var orderMinute = order.getMinutes()
		var orderSecond = order.getSeconds()
		var orderAt = day[orderDay]+' '+orderDate+' '+month[orderMonth]+' '+orderYear+' '+orderHour+':'+orderMinute+':'+orderSecond

		$('#invoiceOrder').text(data.invoice)
		$('#orderAt').text(orderAt)
		$('#resiOrder').text(data.no_resi)
		// bukti transfer belum berupa gambar
		$('#namaUserOrder').text('dummy saber')
		$('#alamatOrder').text(data.alamat)
		$('#kodeposOrder').text(data.kodepos)
		$('#kelurahanOrder').text(data.kelurahan)
		$('#kecamatanOrder').text(data.kecamatan)
		$('#kotaOrder').text(data.kota)
		$('#provinsiOrder').text(data.provinsi)
		$('#noTelpUserOrder').text('dummy 123456789')

		$('#jasaPengiriman').text(data.jasa_pengiriman)
		$('#ongkosPengiriman').text('Rp. '+format(data.ongkir_pengiriman))
		$('#ongkosPengirimanSub').text('Rp. '+format(data.ongkir_pengiriman))
		$('#totalPembayaran').text('Rp. '+format(data.total+data.ongkir_pengiriman))

		var dataOrder = [];
		for (var i = 0; i < data.keranjang.length; i++) {
			var option = '<tr>'+
							'<td><img src="'+data.keranjang[i].produk_market.img+'" width="100" /></td>'+
							'<td>'+data.keranjang[i].produk_market.nama_product+'</td>'+
							'<td>'+data.keranjang[i].count+' item</td>'+
							'<td>Rp. '+format(data.keranjang[i].produk_market.harga)+'</td>'+
							'<td>Rp. '+format(data.keranjang[i].produk_market.harga*data.keranjang[i].count)+'</td>'+
							'</tr>';
			dataOrder.push(option);
		}
		// console.log(dataOrder)
		$("#tableProdukPesanan.table tbody").append(dataOrder);

		function format(data){
			var rupiah = '';		
			var angkarev = data.toString().split('').reverse().join('');
			for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
			return rupiah.split('',rupiah.length-1).reverse().join('');
		}

		if (data.status == 0) {
			$('.div-action-approve').show();

			$('#invoiceApprove').val(data.invoice);
			$('#invoiceReject').val(data.invoice);

			if (data.bukti_transfer != null) {
				$('.div-action-bukti-pembayaran').show();

				$('#imgBuktiTransferAdmin').attr('src', baseUrl+'storage/'+data.bukti_transfer)
			}
		} else if(data.status == 1) {
			$('.div-action-bukti-pembayaran').show();
			$('.div-action-input-resi').show();

			$('#invoiceResi').val(data.invoice);
		} else if(data.status == 6) {
			$('.div-request-pembatalan').show();

			$('#invoiceApproveReq').val(data.invoice);
			$('#invoiceRejectReq').val(data.invoice);

			if (data.bukti_transfer != null) {
				$('.div-action-bukti-pembayaran').show();

				$('#imgBuktiTransferAdmin').attr('src', baseUrl+'storage/'+data.bukti_transfer)
			}
		}

		$('#modalDetailPesananAdmin').modal('show');
	})
}
$('#tableManajemenPelanggan tbody').on('click', 'a.detailPelanggan', function (e) {
	$('#pilihanMobilEdit').hide();
	var table = $('#tableManajemenPelanggan').DataTable();
	var dataRow = table.row($(this).closest('tr')).data();
	// console.log(dataRow)
	$("#jenisPelangganEdit").empty();
	
	ajax.getData('pelanggan/get-group','get', null, function(data){
		// console.log(data)
		var dataGroup = ['<option value="">-- Pilih Jenis --</option>'];
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === dataRow.group_cust) {
				var option = '<option value="'+data[i].id+'" selected>' + data[i].jenis + '</option>'
			} else {
				var option = '<option value="'+data[i].id+'">' + data[i].jenis + '</option>'
			}
			
			dataGroup.push(option);
		}

		$("#jenisPelangganEdit").append(dataGroup);
	})
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
	var dataRow = table.row($(this).closest('tr')).data();
	// console.log(dataRow)
	
	$('#idUser').val(dataRow.id);
	$('#namaUserEdit').val(dataRow.name);
	$('#emailUserEdit').val(dataRow.email);

	$('#modalEditUser').modal('show');
});