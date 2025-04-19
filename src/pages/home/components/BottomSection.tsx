import { Card } from "./Card";
import streetlightsIcon from "@/assets/icons/Streetlights.png";
import reportIcon from "@/assets/icons/Report.png";

interface BottomSectionProps {
	onMapClick: () => void;
	onDescriptionClick: () => void;
	onFormClick: () => void;
}

export function BottomSection({ onMapClick, onDescriptionClick, onFormClick }: BottomSectionProps) {
	return (
		<div className="flex flex-col gap-4 bg-[#EAEBED] rounded-t-[20px] p-4 h-[60%] mt-1">
			<div className="grid grid-cols-2 gap-4 h-[65%]">
				<Card
					title="밤 하늘 지도"
					description="등록 및 히트맵"
					height="100%"
					className="bg-[#1B45C9] text-white"
					onClick={onMapClick}
				/>
				<div className="grid grid-rows-2 gap-4">
					<Card
						title="빛공해 레벨"
						description="빛공해가 뭐에요?"
						height="100%"
						className="bg-white relative"
						onClick={onDescriptionClick}
						image={
							<div className="absolute right-2 bottom-2 p-1">
								<img src={streetlightsIcon} alt="빛공해 레벨" width={48} height={48} />
							</div>
						}
					/>
					<Card
						title="빛공해 건의하기"
						height="100%"
						className="bg-white relative"
						onClick={onFormClick}
						image={
							<div className="absolute right-2 bottom-2 p-1">
								<img src={reportIcon} alt="빛공해 건의하기" width={48} height={48} />
							</div>
						}
					/>
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
	);
}
