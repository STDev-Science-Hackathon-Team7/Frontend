import { useState, useEffect } from "react";
import { fetchWeatherAndAirPollution } from "@/services/weather";
import { WeatherData, AirPollutionData } from "@/types/weather";
import { CacheStorage } from "@/utils/cacheStorage";

interface WeatherServiceHookResult {
	weather: WeatherData | null;
	airPollution: AirPollutionData | null;
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

interface CachedWeatherData {
	weather: WeatherData;
	airPollution: AirPollutionData;
	timestamp: number;
}

export function useWeatherService(lat?: number, lng?: number): WeatherServiceHookResult {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// 캐시 키 생성 함수
	const getCacheKey = (latitude?: number, longitude?: number): string => {
		if (!latitude || !longitude) return "";
		// 소수점 4자리까지만 사용하여 약간의 위치 변화에도 동일한 캐시 키 사용
		return `weather_${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
	};

	const fetchData = async (forceRefresh: boolean = false) => {
		if (!lat || !lng) {
			setError("위치 정보가 제공되지 않았습니다.");
			return;
		}

		const cacheKey = getCacheKey(lat, lng);
		const cacheStorage = CacheStorage.getInstance();

		// 캐시된 데이터 확인 (강제 새로고침이 아닌 경우)
		if (!forceRefresh && cacheKey) {
			const cachedData = cacheStorage.get<CachedWeatherData>(cacheKey);
			if (cachedData) {
				console.log("캐시된 날씨 데이터 사용:", new Date(cachedData.timestamp));
				setWeather(cachedData.weather);
				setAirPollution(cachedData.airPollution);
				return;
			}
		}

		setIsLoading(true);
		setError(null);

		try {
			const { weather: newWeather, airPollution: newAirPollution } = await fetchWeatherAndAirPollution(lat, lng);

			setWeather(newWeather);
			setAirPollution(newAirPollution);

			// 캐시에 저장 (60분 유효)
			if (cacheKey) {
				cacheStorage.set(
					cacheKey,
					{
						weather: newWeather,
						airPollution: newAirPollution,
						timestamp: Date.now()
					},
					60
				); // 60분 캐시
				console.log("날씨 데이터 캐시 저장:", new Date());
			}
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
		refetch: () => fetchData(true) // 강제 새로고침 옵션 추가
	};
}
