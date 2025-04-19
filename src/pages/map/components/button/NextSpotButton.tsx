import React from "react";

interface NextSpotButtonProps {
	onClick: () => void;
}

export const NextSpotButton: React.FC<NextSpotButtonProps> = ({ onClick }) => {
	return (
		<button
			className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
			onClick={onClick}
			aria-label="다음 명소"
		>
			<img src="/icons/32x32.png" alt="다음 명소" width={24} height={24} className="object-contain" />
		</button>
	);
};
