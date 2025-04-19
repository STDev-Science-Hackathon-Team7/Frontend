import { Button } from "@/components/ui/button";
import { memo, useCallback } from "react";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useWeather } from "@/contexts/WeatherContext";

interface RecordButtonProps {
	onClick: () => void;
}

function getAqiInfo(aqi: number) {
	switch (aqi) {
		case 1:
			return { color: "text-blue-500", text: "좋음" };
		case 2:
			return { color: "text-yellow-500", text: "보통" };
		case 3:
		case 4:
		case 5:
			return { color: "text-red-500", text: "나쁨" }; // 3, 4, 5는 모두 "나쁨"으로 표시
		default:
			return { color: "text-blue-500", text: "보통" };
	}
}

// memo
export const RecordButton = memo(function RecordButton({ onClick }: RecordButtonProps) {
	const location = useRouterLocation();
	const isMapPage = location.pathname === "/map";

	// 날씨 데이터 가져오기
	const { airPollution, isLoading } = useWeather();

	// 미세먼지 정보 가져오기
	const aqiInfo = airPollution ? getAqiInfo(airPollution.aqi) : getAqiInfo(0);

	// 맵 페이지에서는 너비를 90%로 설정
	const containerClassName = `${
		isMapPage ? "w-[90%]" : "w-full"
	} h-[52px] flex items-center justify-between bg-white rounded-full shadow-md`;

	// 버튼 클릭 핸들러 메모이제이션
	const handleClick = useCallback(() => {
		onClick();
	}, [onClick]);

	return (
		<div className={containerClassName}>
			<div className="flex-1 flex items-center justify-center h-[38px]">
				{isLoading ? (
					"로딩 중..."
				) : (
					<>
						<span>오늘의 밤 하늘&nbsp;</span>
						<span className={`font-medium ${aqiInfo.color}`}>"{aqiInfo.text}"</span>
					</>
				)}
			</div>

			<Button className="!bg-[#1B45C9] text-white rounded-full h-[38px] w-[152px] !mr-2" onClick={handleClick}>
				밤 하늘 기록하기
			</Button>
		</div>
	);
});
