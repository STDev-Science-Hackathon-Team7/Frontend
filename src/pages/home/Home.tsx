import React, { useCallback } from "react";
import { RecordButton } from "../map/components/button/RecordButton";
import { TopNav } from "@/layouts/TopNav";
import { useNavigate } from "react-router-dom";

interface CardProps {
	title: string;
	description: string;
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

	const handleRecordClick = useCallback(() => {
		console.log("Navigating to /starWrite");
		navigate("/starWrite");
	}, [navigate]);

	const handleMapClick = useCallback(() => {
		navigate("/map");
	}, [navigate]);

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<TopNav title="대전 유성구 엑스포로 107" />
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
				<div className="flex justify-center ">
					<RecordButton onClick={handleRecordClick} />
				</div>
			</div>
			<div className="flex flex-col gap-4 bg-[#EAEBED] rounded-t-[20px] p-5 h-[60%]">
				<div className="grid grid-cols-2 gap-3 h-[65%]">
					<Card
						title="별 관찰 지도"
						description="좋음 (맑은 밤)"
						height="100%"
						className="bg-[#1B45C9] text-white"
						onClick={handleMapClick}
					/>
					<div className="grid grid-rows-2 gap-3">
						<Card
							title="서울 시간"
							description="20:30"
							height="100%"
							className="bg-white"
							onClick={() => {}}
						/>
						<Card
							title="서울 시간"
							description="20:30"
							height="100%"
							className="bg-white"
							onClick={() => {}}
						/>
					</div>
				</div>

				<Card
					title="전국 TOP 5 별 지역"
					description="경기 1-1"
					height="25%"
					className="bg-white"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}
