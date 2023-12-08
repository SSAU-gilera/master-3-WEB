class WeatherApp {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.city = {
			lat: 0,
			lon: 0,
			name: ""
		};
		this.loadWeather();
	}

	makeWeatherRequest(url) {
		// return fetch(url)
		// 	.then(response => {
		// 		if (!response.ok) {
		// 			throw new Error('Weather data not available');
		// 		}
		// 		return response.json();
		// 	})
		// 	.catch(error => {
		// 		console.error('Error fetching weather:', error);
		// 	});
		// return new Promise((resolve, reject) => {
		// 	const xhr = new XMLHttpRequest();
		// 	xhr.open('GET', url);
		// 	xhr.onload = function () {
		// 		if (xhr.status === 200) {
		// 			resolve(JSON.parse(xhr.responseText));
		// 		} else {
		// 			reject('Weather data not available');
		// 		}
		// 	};
		// 	xhr.onerror = function () {
		// 		reject('Error fetching weather');
		// 	};
		// 	xhr.send();
		// });
		if (window.fetch) {
			return fetch(url)
				.then(response => {
					if (!response.ok) {
						throw new Error('Weather data not available');
					}
					return response.json();
				})
				.catch(error => {
					console.error('Error fetching weather:', error);
				});
		} else {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onload = function () {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject('Weather data not available');
					}
				};
				xhr.onerror = function () {
					reject('Error fetching weather');
				};
				xhr.send();
			});
		}
	}

	async getCoordinates(cityName) {
		try {
			const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`);
			const data = await response.json();
			if (data.length === 0) {
				throw new Error('City not found');
			}
			this.city.lat = data[0].lat;
			this.city.lon = data[0].lon;
			this.city.name = data[0].local_names.ru;
			localStorage.setItem("city", JSON.stringify(this.city));
			this.loadWeather();
		} catch (error) {
			console.error('Error getting coordinates:', error);
			alert("City not found!");
		}
	}

	async loadWeather() {
		try {
			const weatherData = await this.makeWeatherRequest(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.city.lat}&lon=${this.city.lon}&appid=${this.apiKey}`);
			this.displayCurrentWeather(weatherData);

			const hourlyForecastData = await this.makeWeatherRequest(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${this.city.lat}&lon=${this.city.lon}&appid=${this.apiKey}`);
			this.displayHourlyForecast(hourlyForecastData);
		} catch (error) {
			console.error('Error loading weather:', error);
		}
	}

	displayCurrentWeather(data) {
		document.getElementById("temperature").innerHTML = data.main.temp + "&#8451;";
		document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
		document.getElementById("wind").innerHTML = data.wind.speed + " m/s";
		this.loadIcon(data.weather[0].icon);
		this.loadWeatherImage(data.weather[0].description);
	}

	displayHourlyForecast(data) {
		const hourlyForecastContainer = document.getElementById("hourly-forecast-container");
		hourlyForecastContainer.innerHTML = "";

		const hourlyForecast = data.list;

		hourlyForecast.forEach(forecast => {
			const date = new Date(forecast.dt * 1000);
			const hour = date.getHours();
			const temperature = forecast.main.temp;
			const icon = forecast.weather[0].icon;

			const forecastElement = document.createElement("div");
			forecastElement.classList.add("hourly-forecast-element");
			forecastElement.innerHTML = `
					<div>${hour}:00</div>
					<img src="https://openweathermap.org/img/wn/${icon}.png" />
					<div>${temperature}&#8451;</div>
			  `;

			hourlyForecastContainer.appendChild(forecastElement);
		});
	}

	async loadIcon(icon) {
		document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
	}

	async loadWeatherImage(description) {
		try {
			const response = await fetch(`https://www.splashbase.co/api/v1/images/search?query=${description}`);
			const data = await response.json();
			if (data.images.length > 0) {
				document.getElementById("weather-image").src = data.images[0].url;
			} else {
				console.error('Image not found');
			}
		} catch (error) {
			console.error('Error loading weather image:', error);
		}
	}
}

const apiKey = '577b3bd2eec54e5a84a1ae825e746783';
const weatherApp = new WeatherApp(apiKey);

function getWeather() {
	const cityName = document.getElementById("city").value.trim();
	if (cityName) {
		weatherApp.getCoordinates(cityName);
	} else {
		alert("Please enter a city name!");
	}
}

const currentDate = new Date();
const options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};
document.getElementById("date").innerHTML = currentDate.toLocaleDateString("en", options);
