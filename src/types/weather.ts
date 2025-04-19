// 날씨
export interface WeatherData {
	temp: number;
	description: string;
	icon: string;
	humidity: number;
	windSpeed: number;
}

// 대기 오염
export interface AirPollutionData {
	aqi: number;
	components: {
		pm2_5: number;
		pm10: number;
	};
}

// 날씨 및 대기 오염 데이터 통합 결과 인터페이스
export interface WeatherServiceResult {
	weather: WeatherData | null;
	airPollution: AirPollutionData | null;
	isLoading: boolean;
	error: string | null;
}
