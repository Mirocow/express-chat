//
//
//фУНКЦИИ ОТРИСОВКИ
//
//

//Отрисовка вкладки Общее
function getJsonGeneral(){
	$.getJSON( center_edit_general, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			$('#general input[name=name-center]').val(data.response[key].name);
			$('#general textarea[name=comment-center]').val(data.response[key].comment);
			$('#general .btn-success,#general .btn-danger,#general input[type=hidden]').data('id', id);
		};
	});
};
//Отрисовка вкладки Типы товаров
function getJsonSklad(){
$('#more-type-center').empty();
	var goods = '';
	$.getJSON( center_edit_sklad, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			goods += '<div class="change-wrapper"><div class="col-md-2 no-padding"><div class="form-group"><div class="controls">';
			goods += '<input disabled name="Product['+id+']" type="text" value="'+data.response[key].name+'" class="form-control">';
			goods += '</div></div></div><div class="col-md-3">';
			goods += '<button data-toggle="button" class="btn btn-primary no-margin change-input"><i class="fa fa-pencil"></i></button>';
			goods += ' <a href="#delete-goods" data-id="'+id+'" data data-toggle="modal" class="no-margin btn btn-warning"><i class="fa fa-times"></i></a>';
			goods += ' </div></div><div class="clear"></div>';
		};
	}).done(function(){
		$('#old-type-center').html(goods);
	});
};
//Отрисовка вкладки Менеджеры и операторы
function getJsonAccounts(){
	$('#more-acount-operator, #more-acount-manager').empty();
	var managers = '';
	var operators = '';
	$.getJSON( center_edit_accounts, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			var status = '';
			if(data.response[key].status === 'unlock'){
				status = 'checked';
			}
			if(data.response[key].role === 'operator'){
				operators += '<div class="row change-wrapper"><div class="col-md-3"><div class="form-group"><label class="control-label">Логин</label><div class="controls">';
				operators += '<input disabled name="User[login]['+id+'][old]" type="text" value="'+data.response[key].login+'" class="form-control userid">';
				operators += '</div></div></div><div class="col-md-3"><div class="form-group"><label class="control-label">Пароль</label><div class="controls">';
				operators += '<input disabled name="User[password]['+id+']" type="text" value="******" class="form-control userid">';
				operators += '</div></div></div><div class="col-md-3"><div class="form-group"><label class="control-label">Имя</label><div class="controls">';
				operators += '<input disabled name="User[name]['+id+']" type="text" value="'+data.response[key].name+'" class="form-control userid">';
				operators += '</div></div></div><div class="col-md-3"><button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button>';
				operators += ' <a href="#delete-user" data-role="manager" data-id="'+id+'" data-toggle="modal" class="btn btn-warning"><i class="fa fa-times"></i></a>';
				operators += ' <input '+status+' type="checkbox" data-id="'+id+'" data-user="44" class="switch"></div></div>';
			}else if(data.response[key].role === 'manager'){
				managers += '<div class="row change-wrapper"><div class="col-md-3"><div class="form-group"><label class="control-label">Логин</label><div class="controls">';
				managers += '<input disabled name="User[login]['+id+'][old]" type="text" value="'+data.response[key].login+'" class="form-control userid">';
				managers += '</div></div></div><div class="col-md-3"><div class="form-group"><label class="control-label">Пароль</label><div class="controls">';
				managers += '<input disabled name="User[password]['+id+']" type="text" value="******" class="form-control userid">';
				managers += '</div></div></div><div class="col-md-3"><div class="form-group"><label class="control-label">Имя</label><div class="controls">';
				managers += '<input disabled name="User[name]['+id+']" type="text" value="'+data.response[key].name+'" class="form-control userid">';
				managers += '</div></div></div><div class="col-md-3"><button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button>';
				managers += ' <a href="#delete-user" data-role="manager" data-id="'+id+'" data-toggle="modal" class="btn btn-warning"><i class="fa fa-times"></i></a>';
				managers += ' <input '+status+' type="checkbox" data-id="'+id+'" data-user="44" class="switch"></div></div>';
			};
		}
	}).done(function(){
		$('#old-operator').html(operators);
		$('#old-manager').html(managers);
		switchInst();
	});
};
//Отрисовка вкладки Qiwi
function getJsonQiwi(){
$('#more-phone-qiwi').empty();
	var phones = '';
	$.getJSON( center_edit_phone, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			phones += '<div class="change-wrapper"><div class="col-md-2 no-padding"><div class="form-group"><div class="controls">';
			phones += '<input disabled name="Qiwi['+id+']" type="text" value="'+data.response[key].phone+'" class="form-control">';
			phones += '</div></div></div><div class="col-md-3">';
			phones += '<button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button>';
			phones += ' <a href="#delete-phone" data-id="'+id+'" data data-toggle="modal" class="btn btn-warning"><i class="fa fa-times"></i></a>';
			phones += ' </div></div><div class="clear"></div>';
		};
	}).done(function(){
		$('#old-phone').html(phones);
	});
};
//Отрисовка вкладки Цены
function getJsonPrice(){
	var prices = '';
	$.getJSON( center_edit_price, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			//var solutions = 0;
			prices += '<div  class="price-goods"><h4>Цены на товар: '+data.response[key].name+'</h4>';
			prices += '<form action=""><div class="table-responsive col-md-4 table-prices"><table class="table table-bordered"><thead><tr><td>Колличество</td><td>Стоимость</td></tr></thead><tbody>';
			for(keyPr in data.response[key].prices){
				prices += '<tr><td><input name="Price[quntity]['+keyPr+']" type="text" value="'+data.response[key].prices[keyPr].count+'" class="prices" disabled></td>';
				prices += '<td><input name="Price[price]['+keyPr+']" type="text" value="'+data.response[key].prices[keyPr].price+'" class="prices" disabled></td></tr>'
			}
			prices += '</tbody></table></div><div class="clear"></div><button data-toggle="button" class="btn btn-primary change-prices"><i class="fa fa-pencil"></i></button> <button type="submit" class="btn btn-success" disabled>Сохранить</button>';
			prices += '</form></div>';

		};
	}).done(function(){
		$('#price .panel-body').html(prices);
	});
};
//Отрисовка вкладки SMS
function getJsonSms(){
	$('#more-phone-main-manager').empty();
	var phones = '';
	$.getJSON( center_edit_sms, function( data ) {
		$('#sms textarea').val(data.response[0].sms);
		var sales_center_id = '<input type="hidden" name="Sales_center_id" vallue="'+data.response[0].sales_center_id+'">';
		$('#text-sms').append(sales_center_id);
		//phones += '<div class="change-wrapper"><div class="col-md-5 no-padding"><div class="form-group"><div class="controls">';
		//phones += '<input disabled name="Phone[]" type="text" value="'+data.response[0].phone+'" class="form-control">';
		////phones += '<input disabled name="Phone[]'+id+'" type="text" value="'+data.response[0].phones[key].number+'" class="form-control">';
		//phones += '</div></div></div><div class="col-md-5">';
		//phones += '<button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button>';
		//phones += sales_center_id;
		//phones += '</div></div><div class="clear"></div>';
		for(key in data.response[0].phones){
			var id = data.response[0].phones[key].id;
			phones += '<div class="change-wrapper"><div class="col-md-5 no-padding"><div class="form-group"><div class="controls">';
			//phones += '<input disabled name="Phone[]" type="text" value="'+data.response[0].phones[key].number+'" class="form-control">';
			phones += '<input disabled name="Phone['+id+']" type="text" value="'+data.response[0].phones[key].phone+'" class="form-control">';
			phones += '</div></div></div><div class="col-md-5">';
			phones += '<button data-toggle="button" class="btn btn-primary change-input"><i class="fa fa-pencil"></i></button>';
			//phones += '</div></div><div class="clear"></div>';
			phones += ' <a href="#delete-phone-main-manager" data-id="'+id+'" data data-toggle="modal" class="btn btn-warning"><i class="fa fa-times"></i></a>';
			phones += ' </div></div><div class="clear"></div>';
		};
	}).done(function(){
		$('#old-phone-main-manager').html(phones);
	});
};

//Клик на удаление товара
$(document).on('click', 'a[href=#delete-goods]', function(){
	var hiddenInput = '<input name="delete-goods" type="hidden" value="'+ $(this).data('id') +'">';
	$('#delete-goods form').append(hiddenInput);
});
//Клик на удаление центра
$(document).on('click', 'a[href=#delete-center]', function(){
	var hiddenInput = '<input name="delete-center" type="hidden" value="'+ $(this).data('id') +'">';
	$('#delete-center form').append(hiddenInput);
});
//Клик на удаление аккаунта
$(document).on('click', 'a[href=#delete-user]', function(){
	var hiddenInput = '<input name="delete-user" type="hidden" value="'+ $(this).data('id') +'">';
	hiddenInput += '<input name="user-role" type="hidden" value="'+ $(this).data('role') +'">';
	$('#delete-user form').append(hiddenInput);
});
//Клик на удаление телефона
$(document).on('click', 'a[href=#delete-phone]', function(){
	var hiddenInput = '<input name="delete-phone" type="hidden" value="'+ $(this).data('id') +'">';
	$('#delete-phone form').append(hiddenInput);
});
//Клик на удаление телефона гл. менеджера
$(document).on('click', 'a[href=#delete-phone-main-manager]', function(){
	var hiddenInput = '<input name="delete-phone" type="hidden" value="'+ $(this).data('id') +'">';
	$('#delete-phone-main-manager form').append(hiddenInput);
});


//
//
//ОТПРАВКА
//
//

//Отправка Общее
$('#general form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_general,
		data: allData
	})
	.done(function( msg ) {
		getJsonGeneral();
	});
	return false;
});
//Отправка Типы товаров
$('#sklad form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_sklad,
		data: allData
	})
	.done(function( msg ) {
		getJsonSklad();
	});
	return false;
});
//Отправка Операторов
$('#center-edit-operator').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_accounts,
		data: allData
	})
	.done(function( msg ) {
		document.getElementById("center-edit-operator").reset();
		getJsonAccounts();
	});
	return false;
});
//Отправка Менеджеров
$('#center-edit-manager').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_accounts,
		data: allData
	})
	.done(function( msg ) {
		document.getElementById("center-edit-manager").reset();
		getJsonAccounts();
	});
	return false;
});
//Отправка Цены
$(document).on("submit", ".price-goods form", function(event){
 var allData = $(this).serialize();
 $.ajax({
	type: "POST",
	url: center_edit_price,
	data: allData
 })
 .done(function( msg ) {
	getJsonPrice();
 });
 return false;
});
//Отправка Sms
$('#text-sms').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_sms,
		data: allData
	})
	.done(function( msg ) {
		getJsonSms();
	});
	return false;
});
//Отправка телефонв гл. менеджера
$('#phone-main-manager').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_sms,
		data: allData
	})
	.done(function( msg ) {
		getJsonSms();
	});
	return false;
});
//Отправка QIWI
$('#center-edit-phone').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_phone,
		data: allData
	})
	.done(function( msg ) {
		getJsonQiwi();
	});
	return false;
});

//
//
//Клики в табах
//
//

$('a[href=#general]').click(function(){
	getJsonGeneral();
});
$('a[href=#sklad]').click(function(){
	getJsonSklad();
});
$('a[href=#accounts]').click(function(){
	getJsonAccounts();
});
$('a[href=#qiwi]').click(function(){
	getJsonQiwi();
});
$('a[href=#price]').click(function(){
	getJsonPrice();
});
$('a[href=#sms]').click(function(){
	getJsonSms();
});


//
//
//Удаление
//
//

//Удаление центра
$('#delete-center a').click(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_general,
		data: allData
	})
	.done(function(msg) {
		if(msg.successful === true){
			return true;
		}
	});
	return false;
});
//Удаление товара
$('#delete-goods form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_sklad,
		data: allData
	})
	.done(function() {
		$('#delete-goods').modal('hide');
		getJsonSklad();
	});
	return false;
})
//Удаление аккаунта
$('#delete-user form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_accounts,
		data: allData
	})
	.done(function() {
		$('#delete-user').modal('hide');
		getJsonAccounts();
	});
	return false;
})
//Удаление телефона
$('#delete-phone form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_phone,
		data: allData
	})
	.done(function() {
		$('#delete-phone').modal('hide');
		getJsonQiwi();
	});
	return false;
})
//Удаление sms
$('#delete-phone-main-manager form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_edit_sms,
		data: allData
	})
	.done(function() {
		$('#delete-phone-main-manager').modal('hide');
		getJsonSms();
	});
	return false;
})

//Общее
$(document).on('click', '.change-prices',function(){
	$(this).siblings('.table-prices').find('input').prop("disabled",!$(this).siblings('.table-prices').find('input').prop("disabled"));
	$(this).siblings('.btn-success').prop("disabled",!$(this).siblings('.btn-success').prop("disabled"));
});

getJsonGeneral();

$(document).on('click','#old-operator .change-input, #old-manager .change-input',function(){
	var thisInputs = $(this).parents('.change-wrapper').find('input[name*=password]');
	if(thisInputs.prop("disabled")){
		thisInputs.val('');
	}else{
		thisInputs.val('******');
	}
});