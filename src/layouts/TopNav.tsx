import { ChevronLeft } from "lucide-react";

interface TopNavProps {
	title: string;
}

export function TopNav({ title }: TopNavProps) {
	const handleBackClick = () => {
		history.back();
	};

	return (
		<div className="flex items-center h-14 border-none px-4 relative bg-red-400">
			<button className="p-0 absolute left-4" onClick={handleBackClick}>
				{/* 조건부 렌더링  추가 하기*/}
				<ChevronLeft className="h-6 w-6" />
			</button>
			<h1 className="text-lg font-medium w-full text-center">{title}</h1>
		</div>
	);
}
