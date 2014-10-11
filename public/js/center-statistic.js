//Undisabled input

$(document).on('click', '.change-table-input', function(){
	$(this).parents('tr').find('input').prop("disabled", false);
	$(this).hide().next().show();
});

//
function howMuch(what){
	var summa = 0;
	what.each(function(){
		summa += parseInt($(this).val());
	})
	.parents('.one-month').find('h4 span').html(summa);
}

//
//
//фУНКЦИИ ОТРИСОВКИ
//
//

//Отрисовка вкладки Статистика
function getJsonGeneralStat(){
	var generalStat = '';
	var monthStat = '';
	var totalMonth = [];
	var thisCity = '';
	$.getJSON( center_stat_general, function( data ) {
		var stat = data.response[0];
		thisCity = stat.city;

		generalStat += '<table class="table"><tbody>';
		for(key in stat.general){
			generalStat += '<tr><td>'+stat.general[key].name+'</td><td>'+stat.general[key].value+'</td></tr><tr>';
		};
		generalStat += '</tbody></table>';

		monthStat += '<table class="table table-hover table-condensed dataTable"><thead><tr><th>Месяц</th><th>Общий оборот</th>';
		for(key in stat.month[0].goods){
			monthStat += '<th>Продано '+stat.month[0].goods[key].name+'</th><th>Потеряно '+stat.month[0].goods[key].name+'</th>';
		};
		monthStat += '<th>Затраты</th><th>Прибыль</th></tr></thead><tbody>';

		for(key in stat.month){
			var td = 0
			monthStat += '<tr><td>'+stat.month[key].name+'</td><td>'+stat.month[key].total+'</td>';
			totalMonth[td] = totalMonth[td] === undefined ? stat.month[key].total : totalMonth[td]+stat.month[key].total; ++td;

			for(keyGood in stat.month[key].goods){
				monthStat += '<td>'+stat.month[key].goods[keyGood].sell+'</td><td>'+stat.month[key].goods[keyGood].lost+'</td>';
				totalMonth[td] = totalMonth[td] === undefined ? stat.month[key].goods[keyGood].sell : totalMonth[td]+stat.month[key].goods[keyGood].sell; ++td;
				totalMonth[td] = totalMonth[td] === undefined ? stat.month[key].goods[keyGood].lost : totalMonth[td]+stat.month[key].goods[keyGood].lost; ++td;
			};
			monthStat += '<td>'+stat.month[key].costs+'</td><td>'+stat.month[key].profit+'</td></tr>';
			totalMonth[td] = totalMonth[td] === undefined ? stat.month[key].costs : totalMonth[td]+stat.month[key].costs; ++td;
			totalMonth[td] = totalMonth[td] === undefined ? stat.month[key].profit : totalMonth[td]+stat.month[key].profit; ++td;
		};

		monthStat += '</tbody><tfoot><tr><td></td>';

		for (var i = 0; totalMonth.length > i; i++) {
			monthStat += '<td>'+totalMonth[i]+'</td>';
		};

		monthStat += '</tr></tfoot></table>';

	}).done(function(){
		$('.center-city-name').html(thisCity);
		$('#general-stat').html(generalStat);
		$('#general-stat-more').html(monthStat);
		$('.dataTable').dataTable( {"bInfo": false,"bLengthChange": false,"bFilter": false,"bJQueryUI": true});
	});
};
//Отрисовка вкладки Статистика
function getJsonSklad(){
	var remains = '';
	var option = '';
	var dataEditRemains = '';
	var history = '';
	$.getJSON( center_stat_sklad, function( data ) {
		for(key in data.response[0].goods){
			var name = data.response[0].goods[key].name;
			var count = data.response[0].goods[key].count;
			var id = data.response[0].goods[key].id;
			remains += '<div class="pull-left"><span class="badge badge-info">'+name+':'+count+'</span></div>';
			option += '<option value='+id+'>'+name+'</option>';
			dataEditRemains += id+'-'+name+'-'+count+',';
		};
		remains += '<div class="col-md-2"><a data-goods="'+dataEditRemains+'" href="#change-type-modal" style="margin-top: 17px;" data-toggle="modal" class="btn btn-primary change-type">Изменить</a></div>';
		for(key in data.response[0].history){
			history += '<tr><td>'+data.response[0].history[key].date+'</td>';
			history += '<td>'+data.response[0].history[key].goods+'</td>';
			history += '<td>'+data.response[0].history[key].price+'</td>';
			history += '<td>Оператор '+data.response[0].history[key].operator+'</td></tr>';
		};
	}).done(function(){
		$('#remains-stat').html(remains);
		$('#add-products select').html(option);
		$('#history tbody').html(history);
	});
};
//Отрисовка вкладки Расходы
function getJsonCosts(){
var oneMonth = '';
	$.getJSON( center_stat_cost, function( data ) {
		for(key in data.response){
			oneMonth += '<div class="one-month"><h4>'+data.response[key].name+' = <span></span></h4><div class="panel panel-default"><table class="table-bordered change-table table table-hover table-condensed"><thead><tr><td>Дата</td><td>Сколько</td><td>Комментарий</td><td>Добавил</td><td></td></tr></thead><tbody>';

			for(keyCost in data.response[key].costs){
				oneMonth += '<tr><td class="data-td">'+data.response[key].costs[keyCost].date+'</td>';
				oneMonth += '<td class="price-td input-cell"><input name="number" type="text" value="'+data.response[key].costs[keyCost].number+'" disabled></td>';
				oneMonth += '<td class="input-cell"><input type="text" name="comment" value="'+data.response[key].costs[keyCost].comment+'" disabled></td>';
				oneMonth += '<td>'+data.response[key].costs[keyCost].who+'</td>';
				oneMonth += '<td class="change-table-inputs"><div class="change-table-input"><i class="fa fa-pencil"></i></div>';
				oneMonth += '<button data-id='+data.response[key].costs[keyCost].id+'><i class="fa fa-check"></i></button></td></tr>';
			}

			oneMonth += '</tbody></table></div></div>';
		};
	}).done(function(){
		$('#all-costs').html(oneMonth);
		$('.one-month').each(function(){
			howMuch($(this).find('input[name=number]'))
		})
	});
};
//Отрисовка вкладки Потерянные
function getJsonLosts(){
var tr = '';
	$.getJSON( center_stat_lost, function( data ) {
		for(key in data.response){
			tr += '<tr><td><a href="#delete" data-status="lost" data-id="'+data.response[key].id+'" data-toggle="modal"><i class="fa fa-times "></i></a></td>';
			tr += '<td>'+data.response[key].date+'</td>';
			tr += '<td>'+data.response[key].goods+'</td>';
			tr += '<td>'+data.response[key].price+'</td>';
			tr += '<td>'+data.response[key].state+'</td>';
			tr += '<td>'+data.response[key].address+'</td>';
			tr += '<td>'+data.response[key].comment+'</td>';
			tr += '<td>'+data.response[key].sale+'</td>';
			tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].manager_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].manager_name+'</a></td>';
			if(data.response[key].operator_id === 0){
				tr += '<td>-</td></tr>';
			}else{
				tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].operator_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].operator_name+'</a></td></tr>';
			}
		};
	}).done(function(){
		$('#lost tbody').html(tr);
	});
};
//Отрисовка вкладки Активные
function getJsonActive(){
var tr = '';
	$.getJSON( center_stat_active, function( data ) {
		for(key in data.response){
			tr += '<tr><td><a href="#delete" data-status="active" data-id="'+data.response[key].id+'" data-toggle="modal"><i class="fa fa-times "></i></a></td>';
			tr += '<td>'+data.response[key].goods+'</td>';
			tr += '<td>'+data.response[key].price+'</td>';
			tr += '<td>'+data.response[key].state+'</td>';
			tr += '<td>'+data.response[key].address+'</td>';
			tr += '<td>'+data.response[key].comment+'</td>';
			tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].manager_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].manager_name+'</a></td>';
			if(data.response[key].operator_id === 0){
				tr += '<td>-</td></tr>';
			}else{
			tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].operator_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].operator_name+'</a></td></tr>';
			}
		};
	}).done(function(){
		$('#active-goods tbody').html(tr);
	});
};
//Отрисовка вкладки Проданные
function getJsonSell(){
var tr = '';
	$.getJSON( center_stat_sold, function( data ) {
		for(key in data.response){
			tr += '<tr><td><a href="#delete" data-status="sell" data-id="'+data.response[key].id+'" data-toggle="modal"><i class="fa fa-times "></i></a></td>';
			tr += '<td>'+data.response[key].date+'</td>';
			tr += '<td>'+data.response[key].goods+'</td>';
			tr += '<td>'+data.response[key].price+'</td>';
			tr += '<td>'+data.response[key].state+'</td>';
			tr += '<td>'+data.response[key].address+'</td>';
			tr += '<td>'+data.response[key].comment+'</td>';
			tr += '<td>'+data.response[key].sale+'</td>';
			tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].manager_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].manager_name+'</a></td>';
			if(data.response[key].operator_id === 0){
				tr += '<td>-</td></tr>';
			}else{
				tr += '<td><a href="#chat-modal" data-toggle="modal" data-id="'+data.response[key].operator_id+'" class="link-mail"><i class="fa fa-envelope"></i> '+data.response[key].operator_name+'</a></td></tr>';
			}
		};
	}).done(function(){
		$('#sell-goods tbody').html(tr);
	});
};

//Клик на удаление
$(document).on('click', 'a[href=#delete]', function(){
	var allInputs = '';
	allInputs += '<input type="hidden" name="id" value="'+$(this).data('id')+'" >';
	allInputs += '<input type="hidden" name="status" value="'+$(this).data('status')+'" >';
	$('#delete form').append(allInputs);
});
//Клик на изменение кол-ва
$(document).on('click', 'a[href=#change-type-modal]', function(){
	var allGoods = '';
	$this = $(this);
	var thisGoods = $this.data('goods');
	thisGoods = thisGoods.split(',');
	for(var i = thisGoods.length - 1; i--;){
		var thisGood = thisGoods[i].split('-');
		allGoods += '<div class="form-group"><label class="col-lg-3 control-label">' + thisGood[1] + '</label><div class="col-lg-9"><input type="text" name="Product[' + thisGood[0] + ']" class="form-control input-sm z-inp" value="' + thisGood[2] + '"></div></div>';
	}
	$('#change-type-modal .col-md-12').html(allGoods);
});


//
//
//ОТПРАВКА
//
//

//Добавление на склад
$('#add-products').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_add_sklad,
		data: allData
	})
	.done(function( msg ) {
		document.getElementById("add-products").reset();
		getJsonSklad();
	});
	return false;
});
//Изменение остатка
$('#change-type-modal form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_change_sklad,
		data: allData
	})
	.done(function( msg ) {
		$('#change-type-modal').modal('hide');
		getJsonSklad();
	});
	return false;
})
//Добавление расходов
$('#center-costs').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: center_stat_cost,
		data: allData
	})
	.done(function( msg ) {
		document.getElementById("center-costs").reset();
		getJsonCosts();
	});
	return false;
});
//Редактирование расходов
$(document).on('click', '.one-month button', function(){
	$this = $(this);
	var tr = $this.parents('tr');
	var thisNumber = tr.find('input[name=number]').val();
	var thisComment = tr.find('input[name=comment]').val();
	var thisId = $this.data('id');

	$.ajax({
		type: "POST",
		url: center_stat_cost,
		data: {id : thisId, number : thisNumber, comment : thisComment}
	})
	.done(function( msg ) {
		$this.hide().prev().show();
		tr.find('input').prop("disabled", true);
		howMuch($this.parents('.one-month').find('input[name=number]'));
	});
	return false;
});


//
//
//Клики в табах
//
//

$('a[href=#stat]').click(function(){
	getJsonGeneralStat();
});
$('a[href=#sklad]').click(function(){
	getJsonSklad();
});
$('a[href=#costs]').click(function(){
	getJsonCosts();
});
$('a[href=#lost]').click(function(){
	getJsonLosts();
});
$('a[href=#active-goods]').click(function(){
	getJsonActive();
});
$('a[href=#sell-goods]').click(function(){
	getJsonSell();
});


//
//
//Удаление
//
//

//Удаление
$('#delete form').submit(function(){
	var allData = $(this).serialize();
	$.ajax({
		type: "POST",
		url: 'some.php',
		data: allData
	})
	.done(function() {
		var modalForm = $('#delete');
		modalForm.modal('hide');

		switch (modalForm.find('input[name=status]').val()){
			case 'lost' : getJsonLosts(); break;
			case 'active' : getJsonActive(); break;
			case 'sell' : getJsonSell(); break;
		}
	});
	return false;
})

//Общее
getJsonGeneralStat();
