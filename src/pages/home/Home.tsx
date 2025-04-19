import React from "react";
import { RecordButton } from "../map/components/button/RecordButton";
import { TopNav } from "@/layouts/TopNav";

interface CardProps {
	title: string;
	description: string;
	image?: React.ReactNode;
	width?: string;
	height?: string;
	className?: string;
}

const Card = ({ title, description, image, width, height, className = "" }: CardProps) => {
	return (
		<div className={`rounded-2xl shadow-md p-3 flex flex-col ${className}`} style={{ width, height }}>
			<div>
				<div className="text-sm font-medium">{title}</div>
				<div className="text-sm mt-1">{description}</div>
			</div>
			{image && <div className="mt-3">{image}</div>}
		</div>
	);
};

export default function Home() {
	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<TopNav title="대전 유성구 엑스포로 107" />
			<div className="flex flex-col gap-4 p-4 h-[35%]">
				<Card
					title="현재 기온"
					description="18°C"
					image={
						<div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
							<span className="text-yellow-100 font-bold">맑음</span>
						</div>
					}
					width="100%"
					height="80%"
					className="mt-2"
				/>
				<RecordButton onClick={() => {}} />
			</div>
			<div className="flex flex-col gap-4 bg-[#EAEBED] rounded-t-[20px] p-5 h-[60%]">
				<div className="grid grid-cols-2 gap-3 h-[65%]">
					<Card title="별 관찰 지도" description="좋음 (맑은 밤)" height="100%" className="bg-[#1B45C9]" />
					<div className="grid grid-rows-2 gap-3">
						<Card title="서울 시간" description="20:30" height="100%" className="bg-white" />
						<Card title="서울 시간" description="20:30" height="100% " className="bg-white" />
					</div>
				</div>

				<Card title="전국 TOP 5 별 지역" description="경기 1-1" height="25%" className="bg-white" />
			</div>
		</div>
	);
}
