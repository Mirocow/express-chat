//
//
//фУНКЦИИ ОТРИСОВКИ
//
//

//Функции и глобальные переменные
function graphColor(color){
	switch (color){
		case 'navy': return '#001f3f'; break;
		case 'blue': return '#0074d9'; break;
		case 'aqua': return '#7fdbff'; break;
		case 'teal': return '#39cccc'; break;
		case 'olive': return '#3d9970'; break;
		case 'green': return '#2ecc40'; break;
		case 'lime': return '#01ff70'; break;
		case 'yellow': return '#ffdc00'; break;
		case 'orange': return '#ff851b'; break;
		case 'red': return '#ff4136'; break;
		case 'fuchsia': return '#f012be'; break;
		case 'purple': return '#b10dc9'; break;
		case 'maroon': return '#85144b'; break;
		case 'silver': return '#dddddd'; break;
		case 'gray': return '#aaaaaa'; break;
		case 'black': return '#111111'; break;
	}
};
var timeForReset = 6000; // Для перезагрузки месяцев

//Отрисовка вкладки Статистика
function getJson(){
var statDaysData = []; // 
var labelsGraph = [];  //
var yKeysGraph = [];   //это для графиков
var colorGraph = [];   //

var dayTotal = 0;
var daySell = 0;

var trGoods = '';

var allMean = '';





var allTopManager = [];
var allTopOperator = [];
	$.getJSON( 'json/statistic.json', function( data ) {
		for(k in data.city){
			//Кешируем данные с города
			var idCity = data.city[k].id;
			var keysForTable = 'city' + idCity;
			var nameCity = data.city[k].name;
			var color = data.city[k].color;
			var statDays = data.city[k].statDays;
			var activeGoods = data.city[k].activeGoods;
			var remainsGoods = data.city[k].remainsGoods;
			var topManager = data.city[k].topManager;
			var topOperator = data.city[k].topOperator;
			var mean = data.city[k].mean;

			labelsGraph.push(nameCity);
			yKeysGraph.push(keysForTable);
			colorGraph.push( graphColor(color) );

			//Добавление данных для графика по дням
			for(key in statDays){
				if(!statDaysData.some(function(e){return e.day === statDays[key].date}) || statDaysData.length === 0){
					statDaysData.push({day : statDays[key].date})
				}
				statDaysData.forEach(function(element, index, array){
					if(element[keysForTable] === undefined){
						array[index][keysForTable] = statDays[key].value;
						dayTotal += statDays[key].value;
					}
				})
			};

			//Активные товары по городам
			trGoods += '<tr><td class="text-center"><i class="fa ';
			if(data.city[k].status){
				trGoods += 'fa-check"></i></td>';
			}else{
				trGoods += 'fa-ban"></i></td>';
			}
			trGoods += '<td class="'+color+'"><span class="conversation pull-left"></span>'+nameCity+'</td><td>';

			for(key in activeGoods){
				trGoods += '<span class="badge badge-info">'+activeGoods[key].value+'</span>';
			}
			trGoods += '</td><td>';
			for(key in remainsGoods){
				trGoods += '<span class="badge badge-danger">'+remainsGoods[key].value+'</span>';
			}
			trGoods += '</td></tr>';

			//Добавление среднего по центрам
			for(key in mean){
				allMean += '<div class="panel panel-success"><div class="panel-heading"><h4 class="panel-title">';
				allMean += '<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-'+idCity+'">'+nameCity+'</a></h4></div>';
				allMean += '<div id="collapse-'+idCity+'" class="panel-collapse collapse"><div class="panel-body"><table class="table table-hover table-striped"><tbody>';
				allMean += '<tr><td>Оборот в месяц</td><td>'+mean[key].generalMonth+'</td></tr>';
				allMean += '<tr><td>Оборот в день</td><td>'+mean[key].generalDay+'</td></tr>';
				allMean += '<tr><td>Продажи в месяц</td><td>'+mean[key].sellMonth+'</td></tr>';
				allMean += '<tr><td>Продажи в день</td><td>'+mean[key].sellDay+'</td></tr>';
				allMean += '<tr><td>Потери в месяц</td><td>'+mean[key].lostMonth+'</td></tr>';
				allMean += '<tr><td>Прибыль в месяц</td><td>'+mean[key].profitMonth+'</td></tr>';
				allMean += '<tr><td>Затраты в месяц</td><td>'+mean[key].costMonth+'</td></tr>';
				allMean += '</tbody></table></div></div></div>'
			}
			//Добавление проебов менеджеров
			for(key in topManager){
				var val = topManager[key].value;
				var topTr = '<tr><td class="'+color+'"><span class="conversation pull-left"></span>'+nameCity+'</td><td>'+topManager[key].name+'</td><td>'+val+' руб</td><td class="text-center"><a href="#chat" data-id="'+topManager[key].id+'" data-toggle="modal"><i class="fa fa-envelope"></i></a></td></tr>';
				allTopManager.push({tr : topTr,value : val});
			}
			//Добавление проебов операторов
			for(key in topOperator){
				var val = topOperator[key].value;
				var topTr = '<tr><td class="'+color+'"><span class="conversation pull-left"></span>'+nameCity+'</td><td>'+topOperator[key].name+'</td><td>'+val+' руб</td><td class="text-center"><a href="#chat" data-id="'+topOperator[key].id+'" data-toggle="modal"><i class="fa fa-envelope"></i></a></td></tr>';
				allTopOperator.push({tr : topTr,value : val});
			}
		};
		daySell = data.daySell;
	}).done(function(){
		var lineChart = Morris.Line({
			element: 'lineChart',
			data: statDaysData,
			xkey: 'day',
			xLabels: 'day',
			ykeys: yKeysGraph,
			labels: labelsGraph,
			lineColors: colorGraph,
			//dateFormat : function (x) {
			//	var date = new Date(x);
			//	console.log(x)
			//	date = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
			//	return date;
			//},
			xLabelFormat : function (x) { 
				switch (x.getDay()){
					case 0 : return 'Пн'; break;
					case 1 : return 'Вт'; break;
					case 2 : return 'Ср'; break;
					case 3 : return 'Чт'; break;
					case 4 : return 'Пт'; break;
					case 5 : return 'Сб'; break;
					case 6 : return 'Вс';
				}
			},
			gridTextColor : '#fff'
		});
		
		$('#dayTotal').html(dayTotal);
		$('#daySell').html(daySell);
		$('#active-product-in-city tbody').html(trGoods);

		$('#accordion').html(allMean);
		allTopOperator.sort(function(obj1, obj2) { return obj2.value-obj1.value; })
		allTopManager.sort(function(obj1, obj2) { return obj2.value-obj1.value; })

		var topManager = '';
		var topOperator = '';
		for (var i = 0; i < 5; i++) {
			if(allTopManager[i] !== undefined) topManager += allTopManager[i].tr;
		};
		for (var i = 0; i < 5; i++) {
			if(allTopOperator[i] !== undefined) topOperator += allTopOperator[i].tr;
		};

		$('#top-5-managers tbody').html(topManager);
		$('#top-5-operators tbody').html(topOperator);
	});
};

//Добавление по месяцам
function getMonth(){
	var statMonthData = [];
	var monthStat = '';
	var totalMonth = [];
	var allMonth = [];
	var labelsGraph = [];
	var yKeysGraph = [];
	var colorGraph = [];
	$.getJSON( 'json/statistic-month.json', function( data ) {
		for(k in data.city){
			var keysForTable = 'city' + idCity;
			var idCity = data.city[k].id;
			var statMonth = data.city[k].statMonth;
			var nameCity = data.city[k].name;
			var color = data.city[k].color;
			labelsGraph.push(nameCity);
			yKeysGraph.push(keysForTable);
			colorGraph.push( graphColor(color) );
			for(key in statMonth){
				var thisMonth = statMonth[key].date;
				if(!statMonthData.some(function(e){return e.month === thisMonth}) || statMonthData.length === 0){
					statMonthData.push({month : thisMonth});
					allMonth.push({month : thisMonth, data : '', total : []});
				}
				statMonthData.forEach(function(element, index, array){
					if(element[keysForTable] === undefined){
						array[index][keysForTable] = statMonth[key].total;
					}
				})
				allMonth.forEach(function(element, index, array){
					if(element.month === thisMonth){
						var tr = ''
						if(array[index].data === ''){
							tr += '<table class="table table-hover table-condensed dataTable"><thead><tr><th>Месяц</th><th>Общий оборот</th>';
							for(keyThead in statMonth[key].goods){
								tr += '<th>Продано '+statMonth[key].goods[keyThead].name+'</th><th>Потеряно '+statMonth[key].goods[keyThead].name+'</th>';
							};
							tr += '<th>Затраты</th><th>Прибыль</th></tr></thead><tbody>';
						}
						var td = 0;
						tr += '<tr><td class="'+color+'">'+nameCity+'</td><td>'+statMonth[key].total+'</td>';
						element.total[td] = element.total[td] === undefined ? statMonth[key].total : element.total[td]+statMonth[key].total; ++td;

						for(keyGood in statMonth[key].goods){
							tr += '<td>'+statMonth[key].goods[keyGood].sell+'</td><td>'+statMonth[key].goods[keyGood].lost+'</td>';
							element.total[td] = element.total[td] === undefined ? statMonth[key].goods[keyGood].sell : element.total[td]+statMonth[key].goods[keyGood].sell; ++td;
							element.total[td] = element.total[td] === undefined ? statMonth[key].goods[keyGood].lost : element.total[td]+statMonth[key].goods[keyGood].lost; ++td;
						};
						tr += '<td>'+statMonth[key].cost+'</td><td>'+statMonth[key].profit+'</td></tr>';
						element.total[td] = element.total[td] === undefined ? statMonth[key].cost : element.total[td]+statMonth[key].cost; ++td;
						element.total[td] = element.total[td] === undefined ? statMonth[key].profit : element.total[td]+statMonth[key].profit; ++td;
						array[index].data += tr;
					};
				});
			};
		};
	}).done(function(){
	$('#barChart').empty();
		var barChart = Morris.Line({
			element: 'barChart',
			data: statMonthData,
			xkey: 'month',
			xLabels: 'month',
			ykeys: yKeysGraph,
			labels: labelsGraph,
			lineColors: colorGraph,
			gridTextColor : '#fff'
		});
		var monthCounts = 0;
		var monthNav = '';
		var monthTables = '';
		for(key in allMonth){
			++monthCounts;
			var monthName = ''
			switch (allMonth[key].month.substring(5)){
				case '01' : monthName = 'Январь'; break;
				case '02' : monthName = 'Февраль'; break;
				case '03' : monthName = 'Март'; break;
				case '04' : monthName = 'Апрель'; break;
				case '05' : monthName = 'Май'; break;
				case '06' : monthName = 'Июнь'; break;
				case '07' : monthName = 'Июль'; break;
				case '08' : monthName = 'Август'; break;
				case '09' : monthName = 'Сентябрь'; break;
				case '10' : monthName = 'Октябрь'; break;
				case '11' : monthName = 'Ноябрь'; break;
				case '12' : monthName = 'Декабрь'; break;
			}
			
			monthTables += '<div id="monthTable-'+monthCounts+'" class="'
			if(monthCounts === 1){
				monthTables += 'active ';
				monthNav += '<a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown"><span class="hidden-xs">'+monthName+'</span> <span class="fa fa-bar-chart-o"></span></a><ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1"><li class="active';
			}else{
				monthNav += '<li class="';
			}
			monthTables += 'panel panel-default table-responsive tab-pane">';
			monthTables += allMonth[key].data;
			monthTables += '</tbody><tfoot><tr><td></td>';
			var total = allMonth[key].total;
			for (var i = 0; total.length > i; i++) {
				monthTables += '<td>'+total[i]+'</td>';
			};
			monthTables += '</tr></tfoot></table></div>';

			monthNav += '"><a href="#monthTable-'+monthCounts+'" tabindex="-1" data-toggle="tab">'+monthName+'</a></li>'
		}
		monthNav += '</ul>';
		$('#monthTableNav').html(monthNav);
		$('#monthTable').html(monthTables);
		$('.dataTable').dataTable( {"bInfo": false,"bLengthChange": false,"bFilter": false,"bJQueryUI": true});
	});
};

//Общее
getJson();
getMonth();

setInterval(getMonth, timeForReset);
$(document).on('click', '#monthTableNav li a', function(){
	$('#myTabDrop1 .hidden-xs').html($(this).html());
});