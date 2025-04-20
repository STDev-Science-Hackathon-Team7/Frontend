interface WeatherContentProps {
	isLoading: boolean;
	weatherDescription?: string;
	temp?: number;
	airPollution?: {
		aqi: number;
		components: {
			pm2_5: number;
			pm10: number;
		};
	};
}

export function WeatherContent({ isLoading, weatherDescription, temp, airPollution }: WeatherContentProps) {
	if (isLoading) {
		return (
			<div className="animate-pulse flex flex-col">
				<div className="h-6 bg-gray-200 rounded-lg w-20 mb-2"></div>
				<div className="h-10 bg-gray-200 rounded-lg w-24 mb-2"></div>
				<div className="h-4 bg-gray-200 rounded-lg w-40"></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<div className="text-lg font-medium mb-2">{weatherDescription}</div>
			{typeof temp === "number" ? (
				<div className="text-[40px] font-bold">{temp}°C</div>
			) : (
				<div className="animate-pulse h-10 bg-gray-200 rounded-lg w-24 mb-2"></div>
			)}
			{airPollution ? (
				<div className="mt-2 flex items-center">
					<div className={`w-3 h-3 rounded-full ${getAqiInfo(airPollution.aqi).color} mr-1`}></div>
					<span className="text-sm">미세먼지: {airPollution.components.pm10}μg/m³</span>
				</div>
			) : (
				<div className="animate-pulse h-4 bg-gray-200 rounded-lg w-40 mt-2"></div>
			)}
		</div>
	);
}

function getAqiInfo(aqi: number) {
	switch (aqi) {
		case 1:
			return { color: "bg-green-500", text: "좋음" };
		case 2:
			return { color: "bg-blue-500", text: "보통" };
		case 3:
			return { color: "bg-yellow-500", text: "나쁨" };
		case 4:
			return { color: "bg-orange-500", text: "매우 나쁨" };
		case 5:
			return { color: "bg-red-500", text: "위험" };
		default:
			return { color: "bg-gray-500", text: "정보 없음" };
	}
}
