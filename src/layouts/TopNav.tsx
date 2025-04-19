import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
	title: string;
	showBackButton?: boolean;
	backPath?: string;
}

export function TopNav({ title, showBackButton = true, backPath }: TopNavProps) {
	const navigate = useNavigate();

	const handleBackClick = () => {
		if (backPath) {
			navigate(backPath);
		} else {
			history.back();
		}
	};

	return (
		<div className="flex items-center h-14 border-none px-4 relative bg-white">
			{showBackButton && (
				<button className="p-0 absolute left-4" onClick={handleBackClick}>
					<ChevronLeft className="h-6 w-6" />
				</button>
			)}
			<h1 className="text-lg font-medium w-full text-center">{title}</h1>
		</div>
	);
}
