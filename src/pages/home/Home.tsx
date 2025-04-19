import { useCallback, useEffect, useState } from "react";
import { RecordButton } from "../map/components/button/RecordButton";
import { TopNav } from "@/layouts/TopNav";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import { useWeatherService } from "@/hooks/useWeatherService";
import { useGoogleReverseGeocoding } from "@/hooks/useGoogleReverseGeocoding";

import { BottomSection } from "./components/BottomSection";
import { WeatherCard } from "./components/weather/WeatherCard";

export default function Home() {
	const navigate = useNavigate();
	const { userLocation, loading: locationLoading } = useLocation();
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	// 현재 위치의 주소 가져오기
	const { address, isLoading: addressLoading, error: addressError } = useGoogleReverseGeocoding(userLocation);

	// 날씨 및 대기 오염 데이터를 가져오는 훅
	const {
		weather,
		airPollution,
		isLoading: weatherLoading,
		refetch
	} = useWeatherService(userLocation?.lat, userLocation?.lng);

	// 컴포넌트가 마운트될 때 첫 로딩 상태 기록
	useEffect(() => {
		if (isFirstLoad && !weatherLoading && weather) {
			setIsFirstLoad(false);
		}
	}, [weatherLoading, weather, isFirstLoad]);

	// 수동으로 날씨 정보 새로고침
	const handleRefreshWeather = useCallback(() => {
		if (userLocation) {
			refetch();
		}
	}, [userLocation, refetch]);

	const handleRecordClick = useCallback(() => {
		console.log("Navigating to /starWrite");
		navigate("/starWrite");
	}, [navigate]);

	const handleMapClick = useCallback(() => {
		navigate("/map");
	}, [navigate]);

	const handleFormClick = useCallback(() => {
		window.open("https://forms.gle/sKTY4bfynVkEhPea9", "_blank");
	}, []);

	const handleDescriptionClick = useCallback(() => {
		navigate("/description");
	}, []);

	let topNavTitle = address;

	if (locationLoading) {
		topNavTitle = "위치 정보 로딩 중...";
	} else if (addressLoading) {
		topNavTitle = "주소 정보 로딩 중...";
	}
	// 주소 오류가 있으면 기본 주소 표시 (이미 기본값으로 설정되어 있음)

	// 실제 날씨 데이터의 로딩 상태 (캐시 여부 고려)
	const showWeatherLoading = weatherLoading && isFirstLoad;

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<TopNav title={topNavTitle} showBackButton={false} />
			<div className="flex flex-col gap-2 p-4 h-[35%]">
				<WeatherCard isLoading={showWeatherLoading} weather={weather} airPollution={airPollution} />
				<div className="flex justify-center">
					<RecordButton onClick={handleRecordClick} />
				</div>
			</div>

			<BottomSection
				onMapClick={handleMapClick}
				onDescriptionClick={handleDescriptionClick}
				onFormClick={handleFormClick}
			/>
		</div>
	);
}
