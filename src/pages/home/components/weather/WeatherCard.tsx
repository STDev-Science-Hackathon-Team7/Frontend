import { WeatherIcon } from "./WeatherIcon";
import { WeatherContent } from "./WeatherContent";

interface WeatherCardProps {
	isLoading: boolean;
	weather: {
		temp: number;
		description: string;
		icon: string;
	} | null;
	airPollution: {
		aqi: number;
		components: {
			pm2_5: number;
			pm10: number;
		};
	} | null;
}

export function WeatherCard({ isLoading, weather, airPollution }: WeatherCardProps) {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	const formattedDate = `${year}년 ${month}월 ${day}일`;

	// 날씨 코드에 따른 한글 설명
	const weatherDescription = weather?.icon ? getWeatherDescription(weather.icon) : "";

	// 날씨 데이터가 있으면서 로딩 중이 아닌 경우, 캐시된 데이터를 사용하는 것으로 간주
	const usingCachedData = !isLoading && weather !== null;

	return (
		<div className="rounded-2xl border-2 border-gray-200 p-0 flex flex-col w-full h-[80%]">
			<div className="w-full h-full flex justify-between items-center px-2">
				<div className="flex-1 pl-6 pr-2 flex flex-col justify-center">
					<div className="text-sm font-medium">{formattedDate}</div>
					<div className="text-sm mt-2">
						<WeatherContent
							isLoading={isLoading}
							weatherDescription={weatherDescription}
							temp={weather?.temp}
							airPollution={airPollution || undefined}
						/>
					</div>
				</div>
				<div className="flex items-center pr-2">
					<WeatherIcon isLoading={isLoading} icon={weather?.icon} description={weather?.description} />
				</div>
			</div>
		</div>
	);
}

// 날씨 코드에 따른 한글 설명 매핑 함수
function getWeatherDescription(iconCode: string) {
	if (iconCode.includes("01")) {
		return "맑음";
	} else if (iconCode.includes("02")) {
		return "구름 조금";
	} else if (iconCode.includes("03")) {
		return "구름 많음";
	} else if (iconCode.includes("04")) {
		return "흐림";
	} else if (iconCode.includes("09")) {
		return "소나기";
	} else if (iconCode.includes("10")) {
		return "비";
	} else if (iconCode.includes("11")) {
		return "천둥번개";
	} else if (iconCode.includes("13")) {
		return "눈";
	} else if (iconCode.includes("50")) {
		return "안개";
	} else {
		return "알 수 없음";
	}
}
