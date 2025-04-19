import React, { useCallback } from "react";
import { RecordButton } from "../map/components/button/RecordButton";
import { TopNav } from "@/layouts/TopNav";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";

interface CardProps {
	title: string;
	description?: string;
	image?: React.ReactNode;
	width?: string;
	height?: string;
	className?: string;
	onClick?: () => void;
}

const Card = ({ title, description, image, width, height, className = "", onClick }: CardProps) => {
	return (
		<div
			className={`rounded-2xl border-2 border-gray-200 p-3 flex flex-col ${className} ${
				onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""
			}`}
			style={{ width, height }}
			onClick={onClick}
		>
			<div className="w-full h-full flex flex-col justify-between">
				<div>
					<div className="text-sm font-medium mt-1 ml-2">{title}</div>
					<div className="text-sm mt-1 ml-2">{description}</div>
				</div>
				{image && <div className="ml-65 mt-2">{image}</div>}
			</div>
		</div>
	);
};

export default function Home() {
	const navigate = useNavigate();
	const { userLocation } = useLocation();
	console.log(userLocation);

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
	//좌표값

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<TopNav title="대전 유성구 엑스포로 107" showBackButton={false} />
			<div className="flex flex-col gap-4 p-4 h-[35%]">
				<Card
					title="현재 기온"
					description="18°C"
					image={
						<div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
							<span className="text-yellow-100 font-bold">맑음</span>
						</div>
					}
					width="100%"
					height="70%"
					className="mt-2"
				/>
				<div className="flex justify-center">
					<RecordButton onClick={handleRecordClick} />
				</div>
			</div>
			<div className="flex flex-col gap-4 bg-[#EAEBED] rounded-t-[20px] p-5 h-[60%]">
				<div className="grid grid-cols-2 gap-3 h-[65%]">
					<Card
						title="밤 하늘 지도"
						description="등록 및 히트맵"
						height="100%"
						className="bg-[#1B45C9] text-white"
						onClick={handleMapClick}
					/>
					<div className="grid grid-rows-2 gap-3">
						<Card
							title="빛공해 레벨"
							description="빛공해가 뭐에요?"
							height="100%"
							className="bg-white"
							onClick={handleDescriptionClick}
						/>
						<Card title="빛공해 건의하기" height="100%" className="bg-white" onClick={handleFormClick} />
					</div>
				</div>

				<Card
					title="밤 하늘 명소"
					description="별 볼일 있는 지도가 추천하는 별 구경 명소⭐"
					height="25%"
					className="bg-white"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}
