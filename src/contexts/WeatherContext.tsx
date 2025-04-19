import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { useWeatherService } from "@/hooks/useWeatherService";
import { WeatherData, AirPollutionData } from "@/types/weather";

interface WeatherContextType {
	weather: WeatherData | null;
	airPollution: AirPollutionData | null;
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

// 기본 컨텍스트 값 생성
const WeatherContext = createContext<WeatherContextType>({
	weather: null,
	airPollution: null,
	isLoading: true,
	error: null,
	refetch: async () => {}
});

// 컨텍스트 훅
export const useWeather = () => {
	return useContext(WeatherContext);
};

interface WeatherProviderProps {
	children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
	const { userLocation } = useLocation();
	const { weather, airPollution, isLoading, error, refetch } = useWeatherService(
		userLocation?.lat,
		userLocation?.lng
	);

	return (
		<WeatherContext.Provider
			value={{
				weather,
				airPollution,
				isLoading,
				error,
				refetch
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};
