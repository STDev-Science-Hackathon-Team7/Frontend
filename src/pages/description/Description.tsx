import Header from "@/pages/starWrite/ui/Header.tsx";
import DescriptionContent from "@/assets/starWrite/Description.svg?react";

export default function Description() {
	return (
		<div className="px-[22px] pb-4">
			<Header>빛공해 레벨</Header>
			<div className="flex flex-col justify-center items-center mt-4">
				<DescriptionContent className="w-full"/>
			</div>
		</div>
	);
}