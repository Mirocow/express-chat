if(!manager_path) var manager_path = 'json/manager.json';
var xxxOrderPage = 1;

function getJsonItems(page){
	console.log(1);
	$.getJSON( manager_path,{page : page}, function( data ) {
		for(key in data.response){
			var id = data.response[key].id;
			var allGoods = '';
			var dataGoods = ''
			var allGoodsCount = 0;
			var price = '';
			var tr = '<tr><td class="class="edit""><a data-id="'+ id;
			switch (data.response[key].none_price){
				case 1: price = '<span class="label">Free</span></td><td>'; tr+= '" data-price="0"'; break;
				default : price = '</td><td>'; tr+= '" data-price="1"';
			}
			tr += '" data-goods="';
			for(good in data.response[key].goods){
			allGoods += '<div class="the-listing_products_item"><span class="name">';
			allGoods += data.response[key].goods[good].name;
			allGoods += '</span><span class="number">';
			allGoods += data.response[key].goods[good].count;
			allGoods += '</span></div>';
			++allGoodsCount;
			if(allGoodsCount > 1){
				dataGoods += ','
			}
			dataGoods += data.response[key].goods[good].id + '-' + data.response[key].goods[good].name + '-' + data.response[key].goods[good].count;
			}

			tr += dataGoods + '" data-comments="' + data.response[key].comments + '" data-address="'+data.response[key].address+'" data-price="'+data.response[key].price+'" data-state="'+data.response[key].state+'" href="#item-edit" data-toggle="modal" data-toggle="collapse" data-parent="#items" class="btn btn-primary"><i class="fa fa-pencil"></i></a></td><td>';
			
			tr += price;
			
			tr += allGoods;
			tr += '</td><td class="rayon">' + data.response[key].state + '</td>';
			tr += '<td class="address">' + data.response[key].address + '</td>';
			tr += '<td>' + data.response[key].comments + '</td></tr>';

			$('#items').append(tr);
		};
	});
};
getJsonItems(xxxOrderPage);

$(document).ready(function(){
	$(window).scroll(function(){

		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		var  scrolltrigger = 0.95;

		if  ((wintop/(docheight-winheight)) > scrolltrigger) {
				xxxOrderPage++;
				getJsonItems(xxxOrderPage);
		}
	});
});

$(document).on('click', 'a[href=#item-edit]', function(){
	var modalForm = $('#item-edit form');
	modalForm[0].reset();
	var allGoods = '';
	$this = $(this);

	$this.data('price') === 0 ? modalForm.find('input[type=checkbox]').prop('checked', true) : modalForm.find('input[type=checkbox]').prop('checked', false)

	thisGoods = $this.data('goods');
	thisGoods = thisGoods.split(',');
	for(var i = thisGoods.length; i--;){
		var thisGood = thisGoods[i].split('-');
		allGoods += '<div class="form-group"><label class="col-lg-2 control-label">' + thisGood[1] + '</label><input type="text" name="Product[' + thisGood[0] + ']" class="form-control input-sm z-inp" value="' + thisGood[2] + '"></div>';
	}
	modalGoodsDiv = modalForm.find('.goodsItem').html(allGoods);

	modalForm.find('.state').val($this.data('state'));
	modalForm.find('.address').val($this.data('address'));
	modalForm.find('textarea').val($this.data('comments'));

	modalForm.append('<input type="hidden" name="id" value="' + $this.data('id') + '">')
});

$('#item-edit form').submit(function(){
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: manager_update_path,
			data: allData
		})
		.done(function( msg ) {
			$('#item-edit').modal('hide');
			$('#items').empty();
			xxxOrderPage = 1;
			getJsonItems(xxxOrderPage);
		});
		return false;
});

$('#collapseOne form').submit(function(){
	var allData = $(this).serialize();
		$.ajax({
			type: "POST",
			url: manager_create_path,
			data: allData
		})
		.done(function( msg ) {
			$('a[href=#collapseOne]').trigger('click');
			$('#items').empty();
			xxxOrderPage = 1;
			getJsonItems(xxxOrderPage);
		});
		$(this)[0].reset();
		return false;
});

$('a[href=#active]').click(function(){
	$('#items').empty();
	xxxOrderPage = 1;
	getJsonItems(xxxOrderPage);
});

$('a[href=#collapseOne]').click(function(){
	window.scrollTo(0, 0);
	$.getJSON( manager_create_path, function(data){
		var modalForm = $('#collapseOne');
		var allGoods = '';
		for(key in data.goods){
			allGoods += '<div class="form-group">';
			allGoods += '<label class="col-lg-2 control-label">'+data.goods[key]+'</label>';
			allGoods += '<input type="text" name="Product['+key+']" class="form-control input-sm z-inp" placeholder="0">';
			allGoods += '</div>';
		}
		modalForm.find('.goods').html(allGoods);
	});
});