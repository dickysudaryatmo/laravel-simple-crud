$(document).ready(function() {
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
        $('#tahunBuatKendaraan').datetimepicker();

		// $('#tahunBuatKendaraan').val('')
		
		$('#tahunRakitKendaraan').datetimepicker();

        // $('#tahunRakitKendaraan').val('')
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
	})

	var mobilemenu = document.querySelector("#btn-mobile");

	mobilemenu.addEventListener("click", function (e) {
		logo.classList.toggle("mbl");
		mobilemenu.classList.toggle("mbl");
		side.classList.toggle("mbl");
	})

})


function readURLuploadBukti(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			var htmlPreview = '<img width="200" src="' + e.target.result + '" />'+'<p>' + input.files[0].name + '</p>';
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

$('.show-password').on('click', function(e) {
	e.preventDefault();
	var label = $(this).parent().attr('for');
	console.log(label)
	var type = $('#'+label).attr('type')
	if (type === 'password') {
		$('#'+label).attr('type', 'text')
	} else {
		$('#'+label).attr('type', 'password')
	}
});