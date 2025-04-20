import Header from "@/pages/starWrite/ui/Header.tsx";
import Footer from "@/pages/starWrite/ui/Footer.tsx";
import Button from "@/pages/starWrite/components/Button.tsx";
import StarLevelIcon1 from "@/assets/starWrite/StarLevelIcon1.svg?react";
import StarLevelIcon2 from "@/assets/starWrite/StarLevelIcon2.svg?react";
import StarLevelIcon3 from "@/assets/starWrite/StarLevelIcon3.svg?react";
import StarLevelIcon4 from "@/assets/starWrite/StarLevelIcon4.svg?react";
import { useLocation, useNavigate } from "react-router-dom";

export default function StarWriteUpload() {
	const navigate = useNavigate();
	const location = useLocation();
	const { uploadedData, form } = location.state ?? {};

	console.log("업로드 결과:", uploadedData);

	const levelPositionMap = {
		1: { position: "left-[20%]", Component: StarLevelIcon1 },
		2: { position: "left-[40%]", Component: StarLevelIcon2 },
		3: { position: "left-[60%]", Component: StarLevelIcon3 },
		4: { position: "left-[80%]", Component: StarLevelIcon4 }
	} as const;

	const currentLevel = levelPositionMap[uploadedData.image_analysis.star_category as 1 | 2 | 3 | 4];

	const handleSubmit = () => {
		navigate("/map");
	};

	return (
		<div className="px-[22px] pb-20 relative">
			<Header backTo="map">
				밤 하늘 기록
			</Header>
			<main className="mt-4">
				<div>
					<h3 className="text-sm font-semibold">분석 결과</h3>
					<h4 className="text-xs text-gray-sub">
						밤 하늘에 별 개수는 <span className="text-[#1B45C9]">{uploadedData.image_analysis.star_count}</span>개이고,
						빛공해 수준은
						<span className="text-[#1B45C9]"> {uploadedData.image_analysis.star_category}레벨 </span>입니다.
					</h4>
				</div>
				<div className="mt-11 mb-4 flex gap-3 items-center justify-center">
					<span className="text-gray-sub text-[0.625rem] min-w-7">레벨 1</span>
					<div className="relative rounded-3xl h-1.5 w-full bg-gradient-to-r from-white to-[#0A1454]">
						<currentLevel.Component
							className={`absolute bottom-0 -translate-x-1/2 ${currentLevel.position}`}
						/>
					</div>
					<span className="text-gray-sub text-[0.625rem] min-w-7">레벨 4</span>
				</div>
				<img src={form.img} className="rounded-xl max-h-[346px] w-full" />
				<div className="mt-4">
					<h3 className="text-sm font-semibold mb-2">글 제목</h3>
					<div
						className="font-medium px-4 py-3 text-xs/5 border-border flex w-full min-h-22 rounded-xl border-[2px]">
						{form.title}
					</div>
				</div>
			</main>
			<Footer>
				<Button onClick={handleSubmit}>
					업로드
				</Button>
			</Footer>
		</div>
	);
}