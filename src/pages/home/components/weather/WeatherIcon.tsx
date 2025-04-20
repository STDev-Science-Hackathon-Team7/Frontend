interface WeatherIconProps {
	isLoading: boolean;
	icon?: string;
	description?: string;
}

export function WeatherIcon({ isLoading, icon, description }: WeatherIconProps) {
	if (isLoading || !icon) {
		return (
			<div className="w-[160px] h-[160px] flex items-center justify-center">
				<div className="animate-pulse rounded-lg bg-gray-200 w-[130px] h-[130px]"></div>
			</div>
		);
	}

	let iconPath;
	const iconCode = icon;

	if (iconCode.includes("01")) {
		iconPath = "/assets/icons/Sunny.png";
	} else if (iconCode.includes("02")) {
		iconPath = "/assets/icons/PartlyCloudy.png";
	} else if (iconCode.includes("03") || iconCode.includes("04")) {
		iconPath = "/assets/icons/PartlyCloudy-Bulk.png";
	} else if (iconCode.includes("09") || iconCode.includes("10") || iconCode.includes("11")) {
		iconPath = "/assets/icons/Rainy.png";
	} else {
		iconPath = "/assets/icons/PartlyCloudy-Bulk.png";
	}

	return (
		<div className="w-[160px] h-[160px] flex items-center justify-center">
			<img
				src={iconPath}
				alt={description}
				className="w-[160px] h-[160px] object-contain"
				onError={(e) => {
					console.error("이미지 로딩 오류:", e);
					e.currentTarget.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
				}}
			/>
		</div>
	);
}
