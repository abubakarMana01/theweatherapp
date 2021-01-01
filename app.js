window.addEventListener("load", () => {
	let long;
	let lat;
	const temperatureDescription = document.querySelector(".temperature-desc");
	const temperatureDegree = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature-span");
	const weatherPressure = document.querySelector(".pressure");
	const weatherHumidity = document.querySelector(".humidity");
	const weatherWindSpeed = document.querySelector(".wind-speed");
	const location = document.querySelector(".location");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			// console.log(lon, lat);

			const proxy = "https://cors-anywhere.herokuapp.com/";
			// const api = `https://api.openweathermap.org/data/2.5/weather?lat=9.0646830&lon=7.4383678&appid=21dff02f8d8c86b95ded1bed4a9ad0e2&units=metric`;
			const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=21dff02f8d8c86b95ded1bed4a9ad0e2&units=metric`;

			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					const description = data.weather[0].description;
					const temperature = data.main.temp;
					const humidity = data.main.humidity;
					const pressure = data.main.pressure;
					const timezone = data.timezone;
					const city = data.name;
					const country = data.sys.country;
					const windSpeed = data.wind.speed;
					const iconCode = data.weather[0].icon;
					const icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
					console.log(iconCode);
					// console.log(city, country, timezone, pressure, humidity, temperature, description);

					// Set DOM for API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = description.toUpperCase();
					weatherPressure.textContent = pressure + "hPa";
					weatherHumidity.textContent = humidity + "%";
					location.textContent = city + ", " + country;
					weatherWindSpeed.textContent = windSpeed + "mph";
					// date.textContent = currentDate;

					// Formula for fahrenheit
					let fahrenheit = temperature * (9 / 5) + 32;

					document.querySelector(
						".weather-icon"
					).innerHTML = `<img src="${icon} " width="150" height="150"></img>`;

					temperatureDegree.addEventListener("click", () => {
						if (temperatureSpan.textContent === "°C") {
							temperatureSpan.textContent = "°F";
							temperatureDegree.textContent = Math.floor(fahrenheit);
						} else {
							temperatureSpan.textContent = "°C";
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	}
});
