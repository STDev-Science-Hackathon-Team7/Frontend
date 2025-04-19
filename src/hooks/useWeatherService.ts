import { useState, useEffect } from "react";
import { fetchWeatherAndAirPollution, WeatherData, AirPollutionData } from "@/services/weather";

interface WeatherServiceHookResult {
	weather: WeatherData | null;
	airPollution: AirPollutionData | null;
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export function useWeatherService(lat?: number, lng?: number): WeatherServiceHookResult {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		if (!lat || !lng) {
			setError("위치 정보가 제공되지 않았습니다.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const { weather, airPollution } = await fetchWeatherAndAirPollution(lat, lng);
			setWeather(weather);
			setAirPollution(airPollution);
		} catch (err) {
			setError(err instanceof Error ? err.message : "날씨 정보를 가져오는데 실패했습니다.");
			console.error("날씨 정보를 가져오는데 실패했습니다:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (lat && lng) {
			fetchData();
		}
	}, [lat, lng]);

	return {
		weather,
		airPollution,
		isLoading,
		error,
		refetch: fetchData
	};
}
