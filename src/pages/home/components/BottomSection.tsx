import { Card } from "./Card";

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
						className="bg-white"
						onClick={onDescriptionClick}
					/>
					<Card title="빛공해 건의하기" height="100%" className="bg-white" onClick={onFormClick} />
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
