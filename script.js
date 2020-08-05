//fetch data from server
const api = {
	key: "5e9298618799455ab2b60427200508",
	base: "http://api.weatherapi.com/v1/current.json?"
}

//get weather report
const search = document.querySelector('#search');
search.addEventListener('submit',function(e){
	e.preventDefault();
	const city = search.querySelector('input[type="text"]').value;
	const location = document.querySelector('.timezone #city');
	const temp = document.querySelector('.weather-report #temp');
	const icon = document.querySelector('.weather-report #weather-icon');
	const summary = document.querySelector('.weather-report #summary');
	const humidity = document.querySelector('#humidity');
	const wind = document.querySelector('#wind');
	const uv = document.querySelector('#uv-index');
	fetch(`${api.base}key=${api.key}&q=${city}`)
		.then(res => res.json()).then(data =>{
			location.innerText = `${data.location.name} - ${data.location.region}, ${data.location.country}`;
			temp.innerText = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
			icon.style.visibility = "visible";
			icon.src = `http:${data.current.condition.icon}`;
			summary.innerText = data.current.condition.text;
			humidity.innerText = data.current.humidity+"%";
			wind.innerText = data.current.wind_kph+" km/h";
			uv.innerText = data.current.uv;
		}).catch(data =>{
			location.innerText = "Sorry, location unavailable";
			temp.innerText = "";
			icon.style.visibility = "hidden";
			summary.innerText = "Sorry, weather report unavailable for this location.";
			humidity.innerText = "-";
			wind.innerText = "-";
			uv.innerText = "-";
		});
})

//current date and time

//get date
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let getCurrentDate = function() {
   const todayDate = document.getElementById('date');
   let currentDate = new Date();
   let day = currentDate.getDay();
   let date = currentDate.getDate()
   let month = currentDate.getMonth();
   let year = currentDate.getFullYear();
   const today = `${days[day]}, ${date} ${months[month]} ${year}`;
   todayDate.innerText = today;
}
getCurrentDate();

//get time
let get12hrClock = function(hour,minute,getCurrentTime) {
	if(minute<10) {
			minute = "0"+minute;
		}
	if(hour>11) {
		if(hour == 12) {
			let pm = hour;
			time = `${pm}:${minute}PM`;
			getCurrentTime.innerText = time;
		}
		else {
			let pm = hour - 12;
			time = `${pm}:${minute}PM`;
			getCurrentTime.innerText = time;
		}
	}
	else {
		time = `${hour}:${minute}AM`;
		getCurrentTime.innerText = time;
	}
}

let getTime = function() {
	const getCurrentTime = document.getElementById('time');
	let currentTime = new Date();
	let hour = currentTime.getHours();
	let minute = currentTime.getMinutes();
	get12hrClock(hour,minute,getCurrentTime)
}
getTime();


//background image - switch 
let backgroundSwitch = function() {
	const background = document.getElementById('body');
	let dayNightChange = new Date();
	let hour = dayNightChange.getHours();
	if(hour>18) {
		background.style.backgroundImage = "url(night.png)";
	}
	else {
		background.style.backgroundImage = "url(day.png)";
	}
}

backgroundSwitch();