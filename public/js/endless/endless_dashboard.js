$(function	()	{
	$('.dataTable').dataTable( {
			"bInfo": false,
			"bLengthChange": false,
			"bFilter": false,
			"bJQueryUI": true
		});
	$('.dataTable1').dataTable( {
			"bInfo": false,
			"bLengthChange": false,
			"bFilter": true,
			"bJQueryUI": true
		});
	


	
	try{
	//Resize graph when toggle side menu
	$('.navbar-toggle').click(function()	{
		
		setTimeout(function() {
			try{
			donutChart.redraw();
			lineChart.redraw();
			barChart.redraw();			
			}catch(e){}
		},500);
		
	});
	
	$('.size-toggle').click(function()	{
		//resize morris chart
		setTimeout(function() {
			donutChart.redraw();
			lineChart.redraw();
			barChart.redraw();	

						
		},500);
	});
	}catch(e){
		
	}
	//Refresh statistic widget
	$('.refresh-button').click(function() {
		var _overlayDiv = $(this).parent().children('.loading-overlay');
		_overlayDiv.addClass('active');
		
		setTimeout(function() {
			_overlayDiv.removeClass('active');
		}, 2000);
		
		return false;
	});
	$(window).resize(function(e)	{
		

		
		//resize morris chart
		setTimeout(function() {
			try{
			lineChart.redraw();
			barChart.redraw();			
			}catch(e){
		}
			
		},500);
		
	});
	
	$(window).load(function(e)	{
	
		//Number Animation
		var currentUser = $('#userCount').text();
		$({numberValue: 0}).animate({numberValue: currentUser}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#userCount').text(Math.ceil(this.numberValue)); 
			}
		});
				
		var currentServerload = $('#serverloadCount').text();
		$({numberValue: 0}).animate({numberValue: currentServerload}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#serverloadCount').text(Math.ceil(this.numberValue)); 
			}
		});
			
		var currentOrder = $('#orderCount').text();
		$({numberValue: 0}).animate({numberValue: currentOrder}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#orderCount').text(Math.ceil(this.numberValue)); 
			}
		});
			
		var currentVisitor = $('#visitorCount').text();
		$({numberValue: 0}).animate({numberValue: currentVisitor}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#visitorCount').text(Math.ceil(this.numberValue)); 
			}
		});
	
		setInterval(function() {
			var currentNumber = $('#userCount').text();
			var randomNumber = Math.floor(Math.random()*20) + 1;
			var newNumber = parseInt(currentNumber, 10) + parseInt(randomNumber, 10); 
		
			$({numberValue: currentNumber}).animate({numberValue: newNumber}, {
				duration: 500,
				easing: 'linear',
				step: function() { 
					$('#userCount').text(Math.ceil(this.numberValue)); 
				}
			});
		}, 3000);
			
		setInterval(function() {
			var currentNumber = $('#visitorCount').text();
			var randomNumber = Math.floor(Math.random()*50) + 1;
			var newNumber = parseInt(currentNumber, 10) + parseInt(randomNumber, 10); 
		
			$({numberValue: currentNumber}).animate({numberValue: newNumber}, {
				duration: 500,
				easing: 'linear',
				step: function() { 
					$('#visitorCount').text(Math.ceil(this.numberValue)); 
				}
			});
		}, 5000);
	});
});
