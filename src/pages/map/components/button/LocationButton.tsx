import aimIcon from "@/assets/map/ep_aim.png";

interface LocationButtonProps {
	onClick: () => void;
	className?: string;
	iconSize?: number;
}

export const LocationButton = ({ onClick, className = "", iconSize = 24 }: LocationButtonProps) => {
	return (
		<div
			className={`bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center ${className}`}
			onClick={onClick}
		>
			<img src={aimIcon} alt="현재 위치" width={iconSize} height={iconSize} className="object-contain" />
		</div>
	);
};
