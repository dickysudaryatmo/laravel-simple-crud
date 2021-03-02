var ui = {
	popup:{
		show:function(type, message, url) {
			if (type == 'error') {
				Swal.fire({
					title: message,
				  	type: type,
					confirmButtonText: 'OK',
					allowOutsideClick: false
				})
				// $('#massage_notif_error').html(message)
				// $('#modalNotifError').modal('show')
			} else if(type == 'success'){
				if (url == 'close') {
					Swal.fire({
						title: message,
					  	type: type,
						confirmButtonText: 'OK',
						allowOutsideClick: false
					})
					// $('#massage_notif_success').html(message)
					// $('#btn-url-notif').empty();
					// $('#btn-url-notif').append('<button class="btn btn-submit-filter mx-auto" data-dismiss="modal" type="button">Okay</button>')
					// $('#modalNotifSuccess').modal('show')
				} else {
					Swal.fire({
						title: message,
					  	type: type,
						confirmButtonText: 'OK',
						allowOutsideClick: false
						}).then(function() {
							window.location = url;
					});
					// console.log(message, url)
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
				})
			} else if (type == 'warning') {
				if (url == 'close') {
					Swal.fire({
						title: message,
					  	type: type,
						confirmButtonText: 'OK',
						allowOutsideClick: false
					})
				}else{
					Swal.fire({
						title: message,
					  	type: type,
						confirmButtonText: 'OK',
						allowOutsideClick: false
						}).then(function() {
							window.location = url;
					});
				}
			} else {
				Swal.fire({
					title: message,
				  	type: type,
					confirmButtonText: 'OK',
					allowOutsideClick: false
				})
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
	slide:{
		init:function(){
			$('.carousel-control').on('click',function(e){
				e.preventDefault();
				var control = $(this);

				var item = control.parent();

				if(control.hasClass('right')){
					ui.slide.next(item);
				}else{
					ui.slide.prev(item);
				}

			});
			$('.slideBtn').on('click',function(e){
				e.preventDefault();
				var control = $(this);
				var item = $("#"+control.attr('for'));
				if(control.hasClass('btn-next')){
					ui.slide.next(item);
				}else{
					ui.slide.prev(item);
				}
			})
		},
		next:function(item){
			var nextItem = item.next();
			item.toggle({'slide':{
				direction:'left'
			}})
			nextItem.toggle({'slide':{
				direction:'right'
			}})
			
		},
		prev:function(item){
			var prevItem = item.prev();
			item.toggle({'slide':{
				direction:'right'
			}});
			prevItem.toggle({'slide':{
				direction:'left'
			}});
		}
	}
}

