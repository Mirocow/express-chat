//if(!admin_account_page_json) admin_account_page_json = 'json/account-page.json';
//if(!admin_centers_page_json) admin_centers_page_json = 'json/centers.json';
var inputCount = 1;
$(function	()	{
	$('.hidden-button').on('click',function(){
		$('body').removeClass('error-404');
		$('.error-404').remove();
		$('#wrapper').removeClass('hidden');
	});
	$('.item-price').attr('disabled', true);
	$('.userid').attr('disabled', true);

	$(document).on('click','.change-input',function(){
		var thisInputs = $(this).parents('.change-wrapper').find('input[type=text]');
		thisInputs.prop("disabled",!thisInputs.prop("disabled"))
	});

	//Adding inputs
	function addButton(button, whereAdd, whatAdd, whereDelete){
		$(document).on('click',button,function(){
			$(whereAdd).append('<div class="new-field">' + whatAdd() + '<div class="clear"></div></div>');
			$(".phone").mask("+7(999) 999-99-99");
			++inputCount;
		});
		$(document).on('click', whereDelete, function(){
			$(this).parents('.new-field').remove();
		});
	}


	var phoneField = function(){return '<div class="col-md-2 col-md-offset-5"><div class="row"><label class="control-label">Телефон</label><div class="controls"><input type="text" class="form-control phone" name="Phone[]"></div></div></div><div class="col-md-1"><div style="display:inline-block;" class="add delete btn btn-primary"><i class="fa fa-minus"></i></div></div>'};
	addButton('#add-phone-center', '#more-phone-center', phoneField, '#more-phone-center .delete');

	var managerCenter = function(){return '<div class="col-md-3"><div class="row"><label class="control-label">Логин</label><div class="controls"><input type="text" name="User[manager][login][]" class="form-control"></div></div></div><div class="col-md-2"><div class="row"><label class="control-label">Пароль</label><div class="controls"><input type="text" name="User[manager][password][]" class="form-control"></div></div></div><div class="col-md-2"><div class="row"><label class="control-label">Имя</label><div class="controls"><input type="text" name="User[manager][name][]" class="form-control"></div></div></div><div class="col-md-1"> <div style="display:inline-block;" class="delete add btn btn-primary"><i class="fa fa-minus"></i></div></div>'};

	addButton('#add-manager-center', '#more-manager-center', managerCenter, '#more-manager-center .delete');

	var operatorCenter = function(){return '<div class="col-md-3"><div class="row"><label class="control-label">Логин</label><div class="controls"><input type="text" name="User[operator][login][]" class="form-control"></div></div></div><div class="col-md-2"><div class="row"><label class="control-label">Пароль</label><div class="controls"><input type="text" name="User[operator][password][]" class="form-control"></div></div></div><div class="col-md-2"><div class="row"><label class="control-label">Имя</label><div class="controls"><input name="User[operator][name][]" type="text" class="form-control"></div></div></div><div class="col-md-1"> <div style="display:inline-block;" class="delete add btn btn-primary"><i class="fa fa-minus"></i></div></div>'};

	addButton('#add-operator-center', '#more-operator-center', operatorCenter, '#more-operator-center .delete');

	var CenterEdit = function(){return '<div class="col-md-3"><label class="control-label">Логин</label><div class="controls"><input name="User[login][][new]" type="text" class="form-control"></div></div><div class="col-md-3"><label class="control-label">Пароль</label><div class="controls"><input name="User[password][]" type="text" class="form-control"></div></div><div class="col-md-3"><label class="control-label">Имя</label><div class="controls"><input name="User[name][]" type="text" class="form-control"></div></div><div class="col-md-2"> <div href="#more-1" style="display:inline-block;" class="delete add btn btn-primary"><i class="fa fa-minus"></i></div></div>'};

	addButton('#add-acount-operator', '#more-acount-operator', CenterEdit, '#more-acount-operator .delete');


	addButton('#add-acount-manager', '#more-acount-manager', CenterEdit, '#more-acount-manager .delete');

	var typeCenter = function(){return '<div class="col-md-2 no-padding"><div class="form-group"><div class="controls"><input name="Product[]" type="text" class="form-control"></div></div></div><div class="col-md-3"><div class="delete btn btn-primary no-margin"><i class="fa fa-minus"></i></div></div>'};

	addButton('.add-type-center', '#more-type-center', typeCenter, '#more-type-center .delete');

	var phoneQiwi = function(){return '<div class="col-md-2 no-padding"><div class="form-group"><div class="controls"><input name="Qiwi[]" type="text" class="form-control phone"></div></div></div><div class="col-md-3"><div class="delete btn btn-primary no-margin"><i class="fa fa-minus"></i></a></div></div>'};
	addButton('#add-phone-qiwi', '#more-phone-qiwi', phoneQiwi, '#more-phone-qiwi .delete');

	var userAcount = function(){return '<div class="col-md-2"><label class="control-label">Логин</label><div class="controls"><input name="User[login][][new]" type="text" class="form-control"></div></div><div class="col-md-3"><label class="control-label">Пароль</label><div class="controls"><input name="User[password][]" type="text" class="form-control"></div></div><div class="col-md-3"><label class="control-label">Имя</label><div class="controls"><input name="User[name][]" type="text" class="form-control"></div></div><div class="col-md-4"> <div style="display:inline-block;" class="delete add btn btn-primary"><i class="fa fa-minus"></i></div></div>'};
	addButton('#add-user-acount', '#more-user-acount', userAcount, '#more-user-acount .delete');
	var phoneMainManager = function(){return '<div class="col-md-5 no-padding"><div class="form-group"><div class="controls"><input name="Phone[]" type="text" class="form-control phone"></div></div></div><div class="col-md-3"><div class="delete btn btn-primary no-margin"><i class="fa fa-minus"></i></a></div></div>'};
	addButton('#add-phone-main-manager', '#more-phone-main-manager', phoneMainManager, '#more-phone-main-manager .delete')

	try{
		$(".phone").mask("+7(999) 999-99-99");
	}catch(e){
	}
			$(function()	{
			$(document).on('click','.friendListToggle',function()	{
				$('.chat-wrapper').toggleClass('sidebar-display');
			});
			try{
			$('.scrollable-div').slimScroll({
				height: '100%',
				size: '5px',
				start: 'bottom'
			});
			}catch(e){
			}
			document.ontouchmove = function(e){
				 if(disableScroll){
				 e.preventDefault();
				 }
			}
		});
	// Cookie validation
	try{
		if(jQuery.type($.cookie('skin_color')) != 'undefined')	{

		$('aside').removeClass('skin-1');
		$('aside').removeClass('skin-2');
		$('aside').removeClass('skin-3');
		$('aside').removeClass('skin-4');
		$('aside').removeClass('skin-5');
		$('aside').removeClass('skin-6');
		$('#top-nav').removeClass('skin-1');
		$('#top-nav').removeClass('skin-2');
		$('#top-nav').removeClass('skin-3');
		$('#top-nav').removeClass('skin-4');
		$('#top-nav').removeClass('skin-5');
		$('#top-nav').removeClass('skin-6');

		$('aside').addClass($.cookie('skin_color'));
		$('#top-nav').addClass($.cookie('skin_color'));
		}
	}catch(e){
	}

	//Skin color
	$('.theme-color').click(function()	{
		//Cookies for storing theme color
		$.cookie('skin_color', $(this).attr('id'));

		$('aside').removeClass('skin-1');
		$('aside').removeClass('skin-2');
		$('aside').removeClass('skin-3');
		$('aside').removeClass('skin-4');
		$('aside').removeClass('skin-5');
		$('aside').removeClass('skin-6');
		$('#top-nav').removeClass('skin-1');
		$('#top-nav').removeClass('skin-2');
		$('#top-nav').removeClass('skin-3');
		$('#top-nav').removeClass('skin-4');
		$('#top-nav').removeClass('skin-5');
		$('#top-nav').removeClass('skin-6');

		$('aside').addClass($(this).attr('id'));
		$('#top-nav').addClass($(this).attr('id'));
	});

	// Delete values stored in cookies
	// uncomment code to activate
	//	$.removeCookie('skin_color');
	//

	//Preloading
	paceOptions = {
		ajax: false, // disabled
		document: false, // disabled
		eventLag: false, // disabled
		elements: false
	};

	//
	$('.login-link').click(function(e) {
		e.preventDefault();
		href = $(this).attr('href');

		$('.login-wrapper').addClass('fadeOutUp');

		setTimeout(function() {
			window.location = href;
		}, 900);

		return false;
	});


	//scroll to top of the page
	$("#scroll-to-top").click(function()	{
		$("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	});

	//scrollable sidebar
	try{
		$('.scrollable-sidebar').slimScroll({
			height: '100%',
			size: '3px'
		});
	}catch(e){

	}


	//Sidebar menu dropdown
	$('aside li').hover(
		function(){ $(this).addClass('open') },
		function(){ $(this).removeClass('open') }
	)

	//Collapsible Sidebar Menu
	$('.openable > a').click(function()	{

		if(!$('#wrapper').hasClass('sidebar-mini'))	{
			if( $(this).parent().children('.submenu').is(':hidden') ) {
				$(this).parent().siblings().removeClass('open').children('.submenu').slideUp();
				$(this).parent().addClass('open').children('.submenu').slideDown();
			}
			else	{
				$(this).parent().removeClass('open').children('.submenu').slideUp();
			}
		}

		return false;
	});

	//Toggle Menu
	$('#sidebarToggle').click(function()	{
		$('#wrapper').toggleClass('sidebar-display');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});

	$('#sizeToggle').click(function()	{

		$('#wrapper').off("resize");

		$('#wrapper').toggleClass('sidebar-mini');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});

	if(!$('#wrapper').hasClass('sidebar-mini'))	{
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if(!$('#wrapper').hasClass('sidebar-mini'))	{
			}
		}
	}

	$(window).resize(function() {
		try{
			if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
				$('#wrapper').addClass('sidebar-mini').addClass('window-resize');
				$('.main-menu').find('.openable').removeClass('open');
				$('.main-menu').find('.submenu').removeAttr('style');
			}
			else if (Modernizr.mq('(min-width: 869px)'))	{
				if($('#wrapper').hasClass('window-resize'))	{
					$('#wrapper').removeClass('sidebar-mini window-resize');
					$('.main-menu').find('.openable').removeClass('open');
					$('.main-menu').find('.submenu').removeAttr('style');
				}
			}
			else	{
				$('#wrapper').removeClass('sidebar-mini window-resize');
				$('.main-menu').find('.openable').removeClass('open');
				$('.main-menu').find('.submenu').removeAttr('style');
			}
		}catch(e){
		}

	});

	//fixed Sidebar
	$('#fixedSidebar').click(function()	{
		if($(this).prop('checked'))	{
			$('aside').addClass('fixed');
		}
		else	{
			$('aside').removeClass('fixed');
		}
	});

	//Inbox sidebar (inbox.html)
	$('#inboxMenuToggle').click(function()	{
		$('#inboxMenu').toggleClass('menu-display');
	});

	//Collapse panel
	$('.collapse-toggle').click(function()	{

		$(this).parent().toggleClass('active');

		var parentElm = $(this).parent().parent().parent().parent();

		var targetElm = parentElm.find('.panel-body');

		targetElm.toggleClass('collapse');
	});

	//Number Animation
	var currentVisitor = $('#currentVisitor').text();

	$({numberValue: 0}).animate({numberValue: currentVisitor}, {
		duration: 2500,
		easing: 'linear',
		step: function() {
			$('#currentVisitor').text(Math.ceil(this.numberValue));
		}
	});

	var currentBalance = $('#currentBalance').text();

	$({numberValue: 0}).animate({numberValue: currentBalance}, {
		duration: 2500,
		easing: 'linear',
		step: function() {
			$('#currentBalance').text(Math.ceil(this.numberValue));
		}
	});

	//Refresh Widget
	$('.refresh-widget').click(function() {
		var _overlayDiv = $(this).parent().parent().parent().parent().find('.loading-overlay');
		_overlayDiv.addClass('active');

		setTimeout(function() {
			_overlayDiv.removeClass('active');
		}, 2000);

		return false;
	});

	//Check all	checkboxes
	$('#chk-all').click(function()	{
		if($(this).is(':checked'))	{
			$('.inbox-panel').find('.chk-item').each(function()	{
				$(this).prop('checked', true);
				$(this).parent().parent().addClass('selected');
			});
		}
		else	{
			$('.inbox-panel').find('.chk-item').each(function()	{
				$(this).prop('checked' , false);
				$(this).parent().parent().removeClass('selected');
			});
		}
	});

	$('.chk-item').click(function()	{
		if($(this).is(':checked'))	{
			$(this).parent().parent().addClass('selected');
		}
		else	{
			$(this).parent().parent().removeClass('selected');
		}
	});

	$('.chk-row').click(function()	{
		if($(this).is(':checked'))	{
			$(this).parent().parent().parent().addClass('selected');
		}
		else	{
			$(this).parent().parent().parent().removeClass('selected');
		}
	});

	//Hover effect on touch device
	$('.image-wrapper').bind('touchstart', function(e) {
		$('.image-wrapper').removeClass('active');
		$(this).addClass('active');
		});

	//Dropdown menu with hover
	$('.hover-dropdown').hover(
			 function(){ $(this).addClass('open') },
			 function(){ $(this).removeClass('open') }
	)

	//upload file
	$('.upload-demo').change(function()	{
		var filename = $(this).val().split('\\').pop();
		$(this).parent().find('span').attr('data-title',filename);
		$(this).parent().find('label').attr('data-title','Change file');
		$(this).parent().find('label').addClass('selected');
	});

	$('.remove-file').click(function()	{
		$(this).parent().find('span').attr('data-title','No file...');
		$(this).parent().find('label').attr('data-title','Select file');
		$(this).parent().find('label').removeClass('selected');

		return false;
	});

	//theme setting
	$("#theme-setting-icon").click(function()	{
		if($('#theme-setting').hasClass('open'))	{
			$('#theme-setting').removeClass('open');
			$('#theme-setting-icon').removeClass('open');
		}
		else	{
			$('#theme-setting').addClass('open');
			$('#theme-setting-icon').addClass('open');
		}

		return false;
	});

	//to do list
	$('.task-finish').click(function()	{
		if($(this).is(':checked'))	{
			$(this).parent().parent().addClass('selected');
		}
		else	{
			$(this).parent().parent().removeClass('selected');
		}
	});

	//Delete to do list
	$('.task-del').click(function()	{
		var activeList = $(this).parent().parent();

		activeList.addClass('removed');

		setTimeout(function() {
			activeList.remove();
		}, 1000);

		return false;
	});

	// Popover
		$("[data-toggle=popover]").popover();

	// Tooltip
		$("[data-toggle=tooltip]").tooltip();

});

$(window).load(function() {
	//Stop preloading animation
	try{
		Pace.stop();
	}
	catch(e){

	}

	// Fade out the overlay div
	$('#overlay').fadeOut(800);

	$('body').removeAttr('class');

	//Enable animation
	$('#wrapper').removeClass('preload');
});

$(window).scroll(function(){

	 var position = $(window).scrollTop();

	 //Display a scroll to top button
	 if(position >= 200)	{
		$('#scroll-to-top').attr('style','bottom:8px;');
	 }
	 else	{
		$('#scroll-to-top').removeAttr('style');
	 }
});
var switchInst = function(){
	$("input[type=checkbox].switch").each(function() {
		var dataId = $(this).data('id');
		$(this).before(
			'<span data-id="' + dataId + '" class="switch">' +
			'<span class="mask" /><span class="background" />' +
			'</span>'
		);
		$(this).hide();
		if (!$(this)[0].checked) {
			$(this).prev().find(".background").css({left: "-56px"});
		}
	});
};
//Для страницы "Аккаунты"
function getJsonAccounts(){
	$.getJSON( admin_account_page_json, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			var list = ''
			var status = '';
			if(data.response[key].status === 'unlock'){
				status = 'checked';
			}
			list += '<div class="row change-wrapper"><div class="col-md-2"><div class="form-group"><label class="control-label">Логин</label><div class="controls"><input disabled name="User[login]['+id+'][old]" type="text" value="'+data.response[key].login+'" class="form-control userid"></div></div></div>';
			list += '<div class="col-md-3"><div class="form-group"><label class="control-label">Пароль</label><div class="controls"><input disabled name="User[password]['+id+']" type="text" value="'+data.response[key].password+'" class="form-control userid"></div></div></div>';
			list += '<div class="col-md-3"><div class="form-group"><label class="control-label">Имя</label><div class="controls"><input disabled name="User[name]['+id+']" type="text" value="'+data.response[key].name+'" class="form-control userid"></div></div></div>';
			list += '<div class="col-md-4"><button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button> <a data-id="'+id+'" href="#delete-user" data-toggle="modal" class="btn btn-warning"><i class="fa fa-times"></i></a> <input '+status+' data-id="'+id+'" type="checkbox" class="switch"></div></div>';
			$('#account-page-list').append(list);
		};
	}).done(function(){
		switchInst();
	});


};
if($('#account-page-list').length > 0){
	getJsonAccounts();
}
$('#account-page-form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: admin_user_add,
		data: allData
	})
	.done(function( msg ) {
		$('#account-page-list').empty();
		$('#more-user-acount').empty();
		document.getElementById("account-page-form").reset();
		setTimeout(getJsonAccounts, 1000);
	}).fail(function(){
		$('#account-page-list').empty();
		$('#more-user-acount').empty();
		document.getElementById("account-page-form").reset();
		setTimeout(getJsonAccounts, 1000);
	});
	return false;
});

$(document).on('click','span.switch',function() {
	var thisId = $(this).data('id');
	if ($(this).next()[0].checked) {
		$.post(accounts_lock, {'change-status': 'lock', 'status-user' : thisId}, function(data){
			if(data == 1){
				//$('#account-page-form').find(".background").animate({left: "-56px"}, 200);
				$('#account-page-list').empty();
				getJsonAccounts();
			}
		})
	} else {
		$.post(accounts_unlock, {'change-status': 'unlock', 'status-user' : thisId}, function(data){
			if(data == 1){
				//$(this).find(".background").animate({left: "0px"}, 200);
				$('#account-page-list').empty();
				getJsonAccounts();
			}
		})
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
});

$(document).on('click', 'a[href=#delete-user]', function(){
	var modalForm = $('#delete-user form');
	$this = $(this);
	modalForm.append('<input type="hidden" name="id" value="' + $this.data('id') + '">');
});

$('#delete-user form').submit(function(){
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: admin_user_delete,
			data: allData
		})
		.done(function( msg ) {
			$('#delete-user').modal('hide');
			if($('#account-page-list').length > 0){
				$('#account-page-list').empty();
				getJsonAccounts();
			}
		});
		return false;
});

var centersPageCity = $('#centers-page-city');
function getJsonCenters(){
	$.getJSON( admin_centers_page_json, function( data ) {
		for(key in data.response){
			var city = '<a href="'+data.response[key].url+'" class="btn btn-default">'+data.response[key].name+'</a> ';
			centersPageCity.append(city);
		};
	});
}
if(centersPageCity.length > 0){
	getJsonCenters();
}
$('#centers-page-form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: admin_centers_add,
		data: allData
	})
	.done(function( msg ) {
		$('#more-phone-center, #more-manager-center, #more-operator-center').empty();
		centersPageCity.empty();
		document.getElementById("centers-page-form").reset();
		getJsonCenters();
	});
	return false;
});

$(document).on('click','#account-page-list .change-input',function(){
	var thisInputs = $(this).parents('.change-wrapper').find('input[name*=password]');
	if(thisInputs.prop("disabled")){
		thisInputs.val('');
	}else{
		thisInputs.val('******');
	}
});