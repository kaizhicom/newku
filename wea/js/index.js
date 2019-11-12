$(function() {

	var baseUrl = './img/';

	var weatherIcons = {
		yun: {
			title: "多云",
			icon: "yun.png"
		},
		qing: {
			title: "晴",
			icon: "qing.png"
		},
		lei: {
			title: "雷阵雨",
			icon: "lei.png"
		},
		yu: {
			title: "小雨",
			icon: "xiao.png"
		},
		default: {
			title: '未知',
			icon: ''
		}
	}
	getWeatherData();

	function getWeatherData(city) {
		var data = {
			appid: '27479889',
			appsecret: 'x6PbFLNe',
			version: 'v6',
		};

		if (city !== undefined) {
			data.city = city;
		}
		$.ajax({
			type: 'GET',
			url: 'https://www.tianqiapi.com/api',
			data: data,
			dataType: 'jsonp',
			success: function(data) {
				console.log(data);
				$('.location-city').text(data.city);
				var weatherData = ['update_time', 'date', 'week', 'tem', 'wea', 'air_level', 'win', 'win_speed', 'win_meter',
					'humidity'
				];
				for (var i = 0; i < weatherData.length; i++) {
					if (weatherData[i] === 'wea') {
						$('.' + weatherData[i]).css({
							backgroundImage: 'url(' + baseUrl + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default :
								weatherIcons[data.wea_img]).icon + ')',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center center',

						});
					} else if (weatherData[i] === 'tem') {
						$('.' + weatherData[i]).text(data[weatherData[i]] + '℃');
					} else if (weatherData[i] === 'humidity') {
						$('.' + weatherData[i]).text('湿度   : '  + data[weatherData[i]]);

					} else {
						$('.' + weatherData[i]).text(data[weatherData[i]]);
					}
					console.log(data[weatherData[i]])

				}

				var futureData = {
					appid: '27479889',
					appsecret: 'x6PbFLNe',
					version: 'v9'
				};
				if (city !== undefined) {
					futureData.city = city;
				}
      
	        $.ajax({
				type: 'GET',
				url: 'https://www.tianqiapi.com/api',
				data: futureData,
				dataType: 'jsonp',
				success:function(result) {
				 console.log('result ==> ', result);	
			var hoursWeatherData = result.data[0].hours;
				$.each(hoursWeatherData,function(i,v){
					var lis = $( `<li>	  
					<div>${v.hours}</div>
	 		<div class="hours-weather-icon" style = "background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></div>
	 					  <div>${v.tem}℃</div>
	 					    <div>${v.win}</div>
							
					</li>`);
					console.log(v.wea_img)
					  $('#hoursWeatheer').append(lis);
				}) 
				 
				var futureWeatherData = result.data.slice(1);
				
				console.log('futureWeatherData ==> ', futureWeatherData); 
				 
				 $.each(futureWeatherData, function (i, v) {
				   var $li = $(`
				              
				   <li>
						   <div class="day fl">${v.day.replace(/（星期[一二三四五六日]）/, '')}</div> 
						    <div class="tianqi clearfix fl">
						     <i class="fl" style="background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></i>
						     <span class="winds fr">${v.win[1]}</span>
						   </div>
						   	<div class="temp fl">
						   		${v.tem2 + '℃ ~' + v.tem1 + '℃'}
						   	</div>
						   	</li>`);
				   $('#foot').append($li);
				 })
				 
				}
			})
			}
		})

	}

 $('.search-logo').on('click', function () {
    //获取搜索城市
    var city = $('.search-ipt').val();
  console.log(city)
    if (city == undefined || city.trim() == '') {
      return;
    }

    console.log(city);

    $('#hoursWeatheer,#foot').empty();

    getWeatherData(city);

  })


})
