if(!operator_active_path) var operator_active_path = 'json/operators.json';
if(!operator_sold_path) var operator_sold_path = '';

var soldTbody = $('#sold tbody');
var activeTbody = $('#active tbody');
var xxxPageActive = 1;
var xxxPageSold = 1;

function getJsonActive(currentPage){
	$.getJSON( operator_active_path,{page : currentPage}, function( data ) {
		for(key in data.active){
			var id = data.active[key].id;
			var phone = data.active[key].phone;
			var allGoods = '';
			var dataGoods = '';
			var goodsPrice = '';
			var totalPrice = 0;
			var allGoodsCount = 0;
			var tr = ''
			if(data.active[key].fresh === 1){
				tr += '<tr class="blue-status';
				if(data.active[key].lock === 1){
					tr += 'disabled-status">';
				}else{
					tr += '">';
				}
			}else{
				tr += '<tr';
				if(data.active[key].lock === 1){
					tr += ' class="disabled-status">';
				}else{
					tr += '">';
				}
			}
			tr += '<td class="operator-action"><a data-active-id="'+ id + '" data-phone="' + phone + '" data-goods="';
			for(good in data.active[key].goods){
			allGoods += '<div class="the-listing_products_item"><span class="name">';
			allGoods += data.active[key].goods[good].name;
			allGoods += '</span><span class="number">';
			allGoods += data.active[key].goods[good].count;
			allGoods += '</span></div>';
			var price = data.active[key].goods[good].price === "" ? '-' : data.active[key].goods[good].price;
			switch (price){
			case 0: goodsPrice += '<span class="label">Free</span>'; break;
			case '-' : goodsPrice += '<span class="label price"><i class="fa fa-minus"></i></span>'; break;
			default : goodsPrice+= '<span class="label price">' + price + '</span>'; totalPrice += price;
			}
			++allGoodsCount;
			if(allGoodsCount > 1){
				dataGoods += ','
			}
			dataGoods += data.active[key].goods[good].name + ' ' + data.active[key].goods[good].count + ' ' + price + ' ' + data.active[key].goods[good].id;
			}
			if(data.active[key].status === 'wait'){
			tr += dataGoods + '" data-comments-reserve="' + data.active[key].commentsReserve + '" href="#reserved-modal" data-toggle="modal" class="btn btn-danger">Ждем</a></td><td>';
			}else{
			tr += dataGoods + '" href="#reserve-modal" data-toggle="modal" class="btn btn-primary">Оплата</a></td><td>';
			}
			tr += allGoods;
			tr += '</td><td class="price-td">';
			tr += goodsPrice;
			tr += '</td><td class="rayon">' + data.active[key].state + '</td>';
			tr += '<td class="address">' + data.active[key].address + '</td>';
			tr += '<td>' + data.active[key].comments + '</td>';
			tr += '<td class="sell"><a href="#sell-modal" data-active-id="'+id+'" data-price="'+totalPrice+'" data-phone="'+phone+'" data-comments="'+data.active[key].comments+'" data-address="'+data.active[key].address+'" data-comments-sale="' + data.active[key].commentsSale + '" data-state="'+data.active[key].state+'" data-goods="'+dataGoods+'" data-toggle="modal" class="btn btn-primary">СМС</a></td></tr>';
			activeTbody.append(tr);
		};
		setTimeout(function(){
			$('#active .blue-status').removeClass('blue-status');
		},30000)
	});
}

function getJsonSold(currentPage){
	$.getJSON( operator_sold_path, {page : currentPage} , function( data ) {
		for(key in data.sold){
			var price = data.sold[key].price === "" ? '-' : data.sold[key].price;
			var id = data.sold[key].id;
			var goodsPrice = '';
			var tr = '<tr';
			if(data.sold[key].status === 'lost'){
				tr += ' class="disabled-status"><td>';
			}else{
				tr += '"><td>';
			}
			for(good in data.sold[key].goods){
			tr += '<div class="the-listing_products_item"><span class="name">';
			tr += data.sold[key].goods[good].name;
			tr += '</span><span class="number">';
			tr += data.sold[key].goods[good].count;
			tr += '</span></div>';
			var price = data.sold[key].goods[good].price === "" ? '-' : data.sold[key].goods[good].price;
			switch (price){
			case 0: goodsPrice += '<span class="label">Free</span>'; break;
			case '-' : goodsPrice += '<span class="label price"><i class="fa fa-minus"></i></span>'; break;
			default : goodsPrice+= '<span class="label price">' + price + '</span>';
			}
			}
			tr += '<td class="price-td">';
			tr += goodsPrice;
			tr += '</td><td class="rayon">' + data.sold[key].state + '</td>';
			tr += '<td class="address">' + data.sold[key].address + '</td>';
			tr += '<td>' + data.sold[key].comments;
			tr += data.sold[key].commentsSale ? '<p class="reasons">' + data.sold[key].commentsSale + '</p></td>' : '</td>';
			tr += '<td class="sell"><a href="#lost-modal" data-toggle="modal" class="btn btn-primary" data-sold-id="'+ id + '">Потерян</a></td></tr>';
			soldTbody.append(tr);
		};
	});
}

getJsonActive(xxxPageActive);
getJsonSold(xxxPageSold);

$(document).ready(function(){
	$(window).scroll(function(){

		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		var  scrolltrigger = 0.95;

		if  ((wintop/(docheight-winheight)) > scrolltrigger) {
			if($('.active a[href=#active]').length > 0){
				++xxxPageActive;
				getJsonActive(xxxPageActive);
			}
			if($('.active a[href=#sold]').length > 0){
				++xxxPageSold;
				getJsonSold(xxxPageSold);
			}
		}
	});
});

$(document).on('click', 'a[href=#reserve-modal]', function(){
	$this = $(this);
	var thisPrice = $this.data('price');
	var thisId = $this.data('active-id');
	//$.get( operator_reserve_path, { id : thisId } );
	var modalForm = $('#reserve-modal form');
	var allGoods = '';
	var allPrice = '';

	modalForm.find('.phones').val($this.data('phone'));
	thisGoods = $this.data('goods');
	thisGoods = thisGoods.split(',');

	for(var i = thisGoods.length; i--;){
		var thisGood = thisGoods[i].split(' ');

		allGoods += '<div class="form-group"><label class="col-lg-2 control-label">' + thisGood[0] + '</label>' +
		'<input type="text" name="Order[amount]['+thisGood[3]+']" class="form-control input-sm z-inp" value="' + thisGood[1] + '"></div>';

		modalForm.append('<input type="hidden" name="Order[default_price]['+thisGood[3]+']" value="' + thisGood[2] + '">');

		allPrice += '<input disabled type="text" name="Order[price]['+thisGood[3]+']" class="form-control input-sm item-price" value="'+thisGood[2]+'">' +
		'<button class="btn btn-primary change-price" data-toggle="button"><i class="fa fa-pencil"></i></button>';
	}
	modalForm.find('.price-reserve').append(allPrice);
	modalGoodsDiv = modalForm.find('.goods').html(allGoods);
	modalForm.append('<input type="hidden" name="Order[id]" value="'+thisId+'">')
});

$(document).on('click','#reserved-modal .change-price',function(){
	var input = $('#reserved-modal .item-price');
	input.prop("disabled",!input.prop("disabled"))
	if($(this).prev().val() !== '-'){
		$('#reserved-modal .change-price-comment').toggle();
	}
});

$(document).on('click','#reserve-modal .change-price',function(){
	var input = $('#reserve-modal .item-price');
	input.prop("disabled",!input.prop("disabled"))
	if(input.val() !== '-'){
		$('#reserve-modal .change-price-comment').toggle();
	}
});

function reserveModalClick(){
	$('#reserve-modal .change-price:first').trigger( "click" );
}

function reservedModalClick(){
	$('#reserved-modal .change-price:first').trigger( "click" );
}

$(document).on('click', 'a[href=#reserved-modal]', function(){
	$this = $(this);
	var thisId = $this.data('active-id');
	$.get( operator_reserve_path, { id : thisId } );
	var modalForm = $('#reserved-modal form');
	var allGoods = '';
	var allPrice = '';
	modalForm.find('.phones').val($this.data('phone'));
	thisGoods = $this.data('goods');
	thisGoods = thisGoods.split(',');

	for(var i = thisGoods.length; i--;){
		var thisGood = thisGoods[i].split(' ');

		allGoods += '<div class="form-group"><label class="col-lg-2 control-label">' + thisGood[0] + '</label>' +
		'<input type="text" name="Order[amount]['+thisGood[3]+']" class="form-control input-sm z-inp" value="' + thisGood[1] + '"></div>';

		modalForm.append('<input type="hidden" name="Order[default_price]['+thisGood[3]+']" value="' + thisGood[2] + '">');

		allPrice += '<input disabled type="text" name="Order[price]['+thisGood[3]+']" class="form-control input-sm item-price" value="'+thisGood[2]+'">' +
		'<button class="btn btn-primary change-price" data-toggle="button"><i class="fa fa-pencil"></i></button>';
	}

	modalGoodsDiv = modalForm.find('.goods').html(allGoods);
	modalForm.find('.price-reserved').append(allPrice);
	modalForm.append('<input type="hidden" name="Order[id]" value="'+thisId+'">');

	if($this.data('comments-reserve') !== 'undefined'){
		modalForm.find('textarea').val($this.data('comments-reserve'));
		reservedModalClick();
	}

});


$(document).on('click', 'a[href=#sell-modal]', function(){
	$this = $(this);
	var thisPrice = $this.data('price');
	var thisId = $this.data('active-id');

	$.get( operator_pay_path, { id : thisId } );

	var modalForm = $('#sell-modal form');
	var allGoods = '';
	modalForm.find('.price').val(thisPrice);
	modalForm.find('.phone-sms').val($this.data('phone'));

	thisGoods = $this.data('goods');
	thisGoods = thisGoods.split(',');

	for(var i = thisGoods.length; i--;){
		var thisGood = thisGoods[i].split(' ');
		allGoods += '<p><span class="goods-name">' + thisGood[0] + ' = </span><input disabled name="' + thisGood[0] + '" value="' + thisGood[1] + '" type="text" class="goods-count"><input name="' + thisGood[0] + '" value="' + thisGood[1] + '" type="hidden"></p>';
	}
	modalGoodsDiv = modalForm.find('.goods').html(allGoods);

	modalForm.find('.state').text($this.data('state'));
	modalForm.find('.address').text($this.data('address'));

	modalForm.append('<input type="hidden" name="Order[comments]" value="' + $this.data('comments') + '">');
	modalForm.append('<input type="hidden" name="Order[id]" value="' + thisId + '">');
	modalForm.append('<input type="hidden" name="Order[state]" value="' + $this.data('address') + '">');
	modalForm.append('<input type="hidden" name="Order[address]" value="' + $this.data('state') + '">');
	modalForm.append('<input type="hidden" name="Order[price]" value="' + $this.data('phone') + '">');

	modalForm.find('textarea').val($this.data('comments-sale'));
});

$(document).on('click', 'a[href=#lost-modal]', function(){
	var modalForm = $('#lost-modal form');
	$this = $(this);

	modalForm.append('<input type="hidden" name="id" value="' + $this.data('sold-id') + '">');
});

$('#reserve-modal form').submit(function(){
	debugger;
	if($(this).find('.change-price-comment').css('display') == 'block' && $(this).find('textarea').val() == ''){
		alert('Введите, почему дана скидка?');
		return false;
	}else if($(this).find('.item-price').val() == ''){
		alert('Введите ценну');
		return false;
	}else{
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: operator_reserve_path,
			data: allData
		})
		.done(function( msg ) {
			if(msg === 'lock'){
				alert('Кто то уже взял в обработку этот заказ.');
			}
			$('#reserve-modal').modal('hide');
			xxxPageActive = 1;
			activeTbody.empty();
			getJsonActive(xxxPageActive);
		});
		return false;
	}
});

$('#reserved-modal form').submit(function(){
	debugger;
	if($(this).find('.change-price-comment').css('display') == 'block' && $(this).find('textarea').val() == ''){
		alert('Введите, почему дана скидка?');
		return false;
	}else if($(this).find('.item-price').val() == ''){
		alert('Введите ценну');
		return false;
	}else{
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: operator_reserve_path,
			data: allData
		})
		.done(function( msg ) {
			if(msg === 'lock'){
				alert('Кто то уже взял в обработку этот заказ.');
			}
			$('#reserve-modal').modal('hide');
			xxxPageActive = 1;
			activeTbody.empty();
			getJsonActive(xxxPageActive);
		});
		return false;
	}
});

$('#reserved-modal button[name=remove_reserve]').click(function(){
	var thisId = $('#reserved-modal input[name="Order[id]"]').val();
	$.post(operator_reserve_off_path, {'Order[id]' : thisId }).done(function(){
			$('#reserve-modal').modal('hide');
			xxxPageActive = 1;
			activeTbody.empty();
			getJsonActive(xxxPageActive);
	});
	return false;
});
$('#lost-modal form').submit(function(){
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: operator_lost_path,
			data: allData
		})
		.done(function( msg ) {
			$('#lost-modal').modal('hide');
			xxxPageSold = 1;
			soldTbody.empty();
			getJsonSold(xxxPageSold);
		});
		return false;
});

$('#sell-modal form').submit(function(){
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: operator_pay_path,
			data: allData
		})
		.done(function( msg ) {
				$('#sell-modal').modal('hide');
				xxxPageActive = 1;
				activeTbody.empty();
				getJsonActive(xxxPageActive);
			/*if(msg === 'lock'){
				alert('Кто-то уже взял этот заказ на обработку.');
				$('#reserve-modal').modal('hide');
				xxxPageActive = 1;
				activeTbody.empty();
				getJsonActive(xxxPageActive);
			}else{
				$('#reserve-modal').modal('hide');
				xxxPageActive = 1;
				activeTbody.empty();
				getJsonActive(xxxPageActive);
			}*/
		});
		return false;
});

$('a[href=#active]').click(function(){
	activeTbody.empty();
	xxxPageActive = 1;
	getJsonActive(xxxPageActive);
});
$('a[href=#sold]').click(function(){
	soldTbody.empty();
	xxxPageSold = 1;
	getJsonSold(xxxPageSold);
});

/*
var realplexor = new Dklab_Realplexor(
		rpl_path
);

realplexor.subscribe("Alpha", function(data, id) {
	if(data = 'update-table'){
		$('.notifications').append('<li class="alert alert-dismissable reload">	<i class="fa fa-exclamation-triangle"></i>Обновить таблицу<i class="fa fa-exclamation-triangle"></i></li>')
	}else if(data = 'change-goods'){
		$('.notifications').append('<li class="alert alert-dismissable good"><i class="fa fa-exclamation-triangle"></i> Изменился товар	<i class="fa fa-exclamation-triangle"></i></li>')
	}else if(data = 'new-goods'){
		$('.notifications').append('<li class="alert alert-dismissable address"><i class="fa fa-exclamation-triangle"></i> Новый товар <i class="fa fa-exclamation-triangle"></i></li>');
	}
});
realplexor.execute();
*/

$('#reserved-modal').on('hidden.bs.modal', function () {
	var unlockId = $(this).find('input[name=id]').val();
	//$.get(operator_reserve_path,unlock = unlockId);
	var input = $(this).find('.item-price');
	if(!input.prop("disabled")){
		reservedModalClick();
	}
	$('.price-reserved').empty();
});

$('#reserve-modal').on('hidden.bs.modal', function () {
	var unlockId = $(this).find('input[name=id]').val();
	//$.get(operator_reserve_path,unlock = unlockId);
	var input = $(this).find('.item-price');
	if(!input.prop("disabled")){
		reserveModalClick();
	}
	$('.price-reserve').empty();
});

$('#sell-modal').on('hidden.bs.modal', function () {
	var unlockId = $(this).find('input[name=id]').val();
	$.get(operator_reserve_path,unlock = unlockId);
});