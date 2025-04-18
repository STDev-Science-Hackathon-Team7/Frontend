import { useState, useEffect } from "react";
import { Badge, BadgeGroup } from "../Badge";
import sampleImage from "@/assets/map/sample.png";
import { MarkerData } from "@/types";

interface MarkerInfoCardProps {
	markerData: MarkerData;
	onClose: () => void;
}

export const MarkerInfoCard = ({ markerData, onClose }: MarkerInfoCardProps) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsOpen(true), 10);
		return () => clearTimeout(timer);
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0" onClick={handleClose} />

			<div
				className={`absolute bottom-0 left-0 right-0 flex justify-center transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<div className="w-full max-w-[500px]">
					<div className="bg-white rounded-t-2xl shadow-lg !px-8 !py-5">
						<div className="flex !mb-10">
							<div className="flex-1">
								<BadgeGroup>
									<Badge>별 3개</Badge>
									<Badge>빛 공해 3레벨</Badge>
								</BadgeGroup>
								<div className="!mt-4 !ml-1">
									<p className="text-sm font-bold">밤 하늘 기록!</p>
									<p className="text-gray-500 text-xs">오늘 미세먼지 없더니 별 보기 좋네~</p>
								</div>
							</div>

							<div>
								<img
									src={sampleImage}
									alt="밤하늘 사진"
									className="w-[90px] h-[90px] rounded-2xl object-cover"
									onError={(e) => {
										(e.target as HTMLImageElement).src = "/assets/map/sample.png";
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
