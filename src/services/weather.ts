import { WeatherData, AirPollutionData } from "@/types/weather";

export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
		import.meta.env.VITE_WEATHER_API_KEY
	}&units=metric&lang=kr`;

	const response = await fetch(weatherUrl);

	if (!response.ok) {
		throw new Error("날씨 데이터를 가져오는데 실패했습니다.");
	}

	const data = await response.json();

	return {
		temp: Math.round(data.main.temp),
		description: data.weather[0].description,
		icon: data.weather[0].icon,
		humidity: data.main.humidity,
		windSpeed: data.wind.speed
	};
}

export async function fetchAirPollutionData(lat: number, lng: number): Promise<AirPollutionData> {
	const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${
		import.meta.env.VITE_WEATHER_API_KEY
	}`;

	const response = await fetch(airPollutionUrl);

	if (!response.ok) {
		throw new Error("대기 오염 데이터를 가져오는데 실패했습니다.");
	}

	const data = await response.json();

	return {
		aqi: data.list[0].main.aqi,
		components: {
			pm2_5: data.list[0].components.pm2_5,
			pm10: data.list[0].components.pm10
		}
	};
}

export async function fetchWeatherAndAirPollution(
	lat: number,
	lng: number
): Promise<{ weather: WeatherData; airPollution: AirPollutionData }> {
	const [weather, airPollution] = await Promise.all([fetchWeatherData(lat, lng), fetchAirPollutionData(lat, lng)]);

	return { weather, airPollution };
}
